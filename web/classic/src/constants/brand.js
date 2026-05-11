export const BLUE_FUTURE_BRAND = {
  name: 'Blue Future',
  domain: 'bluefuture.studio',
  icon: '/bluefuture-icon.png',
  fallbackIcon: '/logo.png',
  docsUrl: 'https://docs.newapi.pro',
  statusText: '今天的 API 服务运行稳定',
  tagline: '稳定、透明、可信的 AI API 中转站',
  description:
    '一个 API Key 接入 OpenAI、Claude、Gemini、DeepSeek 等主流模型，兼容 OpenAI SDK，支持国内高速访问、实时用量统计、团队管理与透明计费。',
  loginTitle: '欢迎回到 Blue Future',
  loginSubtitle: '继续管理你的 AI API、模型路由、用量与账单。',
  registerTitle: '创建 Blue Future 账户',
  registerSubtitle: '几分钟内接入全球主流 AI 模型。',
};

export const BLUE_FUTURE_NAV_LABELS = {
  home: '总览',
  console: '控制台',
  pricing: '模型',
  docs: '文档',
  about: '状态',
};

export const BLUE_FUTURE_FEATURES = [
  '国内高速访问',
  'OpenAI SDK 兼容',
  '实时用量统计',
  '透明计费',
  '服务状态监控',
];

export const BLUE_FUTURE_STEPS = [
  {
    title: '创建账户',
    desc: '用邮箱或第三方登录进入控制台，团队成员可按角色协作。',
  },
  {
    title: '生成 API Key',
    desc: '按项目创建密钥，限制额度、模型和权限，调用边界清晰。',
  },
  {
    title: '替换 Base URL',
    desc: '兼容 OpenAI SDK，只需替换 base_url 即可开始请求模型。',
  },
];

export const BLUE_FUTURE_CAPABILITIES = [
  {
    title: '智能路由',
    desc: '统一管理上游渠道，根据可用性和模型能力稳定分发请求。',
  },
  {
    title: '故障切换',
    desc: '渠道异常时快速切换，减少单点波动对业务调用的影响。',
  },
  {
    title: '模型状态',
    desc: '模型、价格、上下文和可用状态集中展示，接入前先看清楚。',
  },
  {
    title: '团队管理',
    desc: '用户、分组、额度、邀请与权限统一配置，适合团队长期使用。',
  },
  {
    title: '账单明细',
    desc: '余额、充值、扣费和倍率透明可查，按量使用更容易控制成本。',
  },
  {
    title: '请求日志',
    desc: '追踪状态、模型、Token、费用与延迟，定位问题更直接。',
  },
];

export const BLUE_FUTURE_CODE_SAMPLE = `curl https://api.bluefuture.studio/v1/chat/completions \\
  -H "Authorization: Bearer $BLUE_FUTURE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4.1",
    "messages": [
      {"role": "user", "content": "Hello Blue Future"}
    ]
  }'`;
