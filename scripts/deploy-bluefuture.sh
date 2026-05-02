#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/new-api"
SRC_DIR="/opt/new-api-src"
REPO_URL="https://github.com/Jimmyweng0514/new-api.git"
IMAGE_NAME="bluefuture-new-api:custom"
RUNTIME_DOCKERFILE="Dockerfile.runtime"

echo "==> Pull source"
if [ ! -d "$SRC_DIR/.git" ]; then
  sudo rm -rf "$SRC_DIR"
  sudo git clone "$REPO_URL" "$SRC_DIR"
fi
sudo chown -R "$(id -un):$(id -gn)" "$SRC_DIR"
cd "$SRC_DIR"
git pull --ff-only origin main

echo "==> Build Docker image"
if [ -f "$RUNTIME_DOCKERFILE" ]; then
  sudo docker build -f "$RUNTIME_DOCKERFILE" -t "$IMAGE_NAME" .
else
  sudo docker build -t "$IMAGE_NAME" .
fi

echo "==> Switch compose image"
cd "$APP_DIR"
sudo cp docker-compose.yml "docker-compose.yml.bak.$(date +%Y%m%d%H%M%S)"
if sudo grep -q "calciumion/new-api" docker-compose.yml; then
  sudo sed -i 's#image: calciumion/new-api:[^[:space:]]*#image: bluefuture-new-api:custom#' docker-compose.yml
fi
if ! sudo grep -q "image: bluefuture-new-api:custom" docker-compose.yml; then
  echo "请手动检查 docker-compose.yml 里的 new-api image 是否已经是 bluefuture-new-api:custom"
  exit 1
fi

echo "==> Restart app"
sudo docker compose up -d --force-recreate new-api

echo "==> Apply BlueFuture system options"
if sudo docker ps --format '{{.Names}}' | grep -qx postgres; then
  sudo docker exec -i postgres psql -U root -d new-api <<'SQL'
INSERT INTO options (key, value) VALUES ('SystemName', 'BlueFuture Studio')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO options (key, value) VALUES ('Logo', '/bluefuture-logo.svg')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
INSERT INTO options (key, value) VALUES ('HomePageContent', '')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
SQL
elif sudo docker ps --format '{{.Names}}' | grep -qx mysql; then
  sudo docker exec -i mysql mysql -uroot -p123456 new-api <<'SQL'
INSERT INTO options (`key`, `value`) VALUES ('SystemName', 'BlueFuture Studio')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
INSERT INTO options (`key`, `value`) VALUES ('Logo', '/bluefuture-logo.svg')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
INSERT INTO options (`key`, `value`) VALUES ('HomePageContent', '')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
SQL
else
  SQLITE_DB=""
  for candidate in \
    "$APP_DIR/data/new-api/new-api.db" \
    "$APP_DIR/data/new-api/one-api.db" \
    "$APP_DIR/data/one-api.db" \
    "$APP_DIR/data/new-api.db"
  do
    if sudo test -f "$candidate"; then
      SQLITE_DB="$candidate"
      break
    fi
  done

  if [ -n "$SQLITE_DB" ]; then
    sudo docker run --rm -i -v "$SQLITE_DB:/data/one-api.db" alpine:3.20 sh <<'SH'
set -e
apk add --no-cache sqlite >/dev/null
sqlite3 /data/one-api.db <<'SQL'
INSERT INTO options (key, value) VALUES ('SystemName', 'BlueFuture Studio')
ON CONFLICT(key) DO UPDATE SET value = excluded.value;
INSERT INTO options (key, value) VALUES ('Logo', '/bluefuture-logo.svg')
ON CONFLICT(key) DO UPDATE SET value = excluded.value;
INSERT INTO options (key, value) VALUES ('HomePageContent', '')
ON CONFLICT(key) DO UPDATE SET value = excluded.value;
SQL
SH
  else
    echo "未发现 postgres/mysql 容器或 SQLite 数据库，跳过数据库选项更新。"
  fi
fi

sudo docker compose up -d --force-recreate new-api

echo "==> Status"
sudo docker compose ps
echo "==> Recent app logs"
sudo docker logs new-api --tail 80
echo "==> Done. Open https://bluefuture.studio and hard refresh."
