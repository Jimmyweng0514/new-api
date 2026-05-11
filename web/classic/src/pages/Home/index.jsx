/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Tag,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import { Activity, Gauge, KeyRound, Layers3, ReceiptText, ShieldCheck } from 'lucide-react';
import {
  BLUE_FUTURE_BRAND,
  BLUE_FUTURE_CAPABILITIES,
  BLUE_FUTURE_CODE_SAMPLE,
  BLUE_FUTURE_FEATURES,
  BLUE_FUTURE_STEPS,
} from '../../constants/brand';

const { Text } = Typography;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='bluefuture-shell bluefuture-fade-up w-full overflow-x-hidden pt-16'>
          <section className='mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 md:grid-cols-[1.02fr_0.98fr] md:px-8 lg:px-10'>
            <div>
              <div className='mb-8 inline-flex items-center gap-3 rounded-md border border-[rgba(127,205,255,0.18)] bg-[rgba(13,32,51,0.64)] px-3 py-2 text-sm text-[#9FB4C7]'>
                <span className='bluefuture-status-dot' />
                <span>{BLUE_FUTURE_BRAND.statusText}</span>
              </div>

              <div className='mb-6 flex items-center gap-3'>
                <img
                  src={BLUE_FUTURE_BRAND.icon}
                  alt='Blue Future'
                  className='bluefuture-brand-icon h-14 w-14'
                />
                <div>
                  <Text className='!text-sm !text-[#9FB4C7]'>
                    {BLUE_FUTURE_BRAND.domain}
                  </Text>
                  <h1 className='m-0 text-4xl font-semibold leading-tight text-[#F7FBFF] md:text-6xl'>
                    {BLUE_FUTURE_BRAND.name}
                  </h1>
                </div>
              </div>

              <h2 className='mb-5 max-w-2xl text-2xl font-medium leading-snug text-[#F7FBFF] md:text-4xl'>
                {BLUE_FUTURE_BRAND.tagline}
              </h2>
              <p className='mb-8 max-w-2xl text-base leading-8 text-[#9FB4C7] md:text-lg'>
                {BLUE_FUTURE_BRAND.description}
              </p>

              <div className='mb-7 flex flex-col gap-3 sm:flex-row'>
                <Link to='/console'>
                  <Button
                    theme='solid'
                    type='primary'
                    size={isMobile ? 'default' : 'large'}
                    icon={<IconPlay />}
                    className='w-full sm:w-auto'
                  >
                    开始接入
                  </Button>
                </Link>
                <Button
                  size={isMobile ? 'default' : 'large'}
                  icon={<IconFile />}
                  className='w-full border-[rgba(127,205,255,0.22)] !bg-transparent !text-[#F7FBFF] sm:w-auto'
                  onClick={() =>
                    window.open(docsLink || BLUE_FUTURE_BRAND.docsUrl, '_blank')
                  }
                >
                  查看文档
                </Button>
              </div>

              <div className='mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                {BLUE_FUTURE_FEATURES.map((item) => (
                  <div
                    key={item}
                    className='bluefuture-card flex items-center gap-2 px-3 py-2 text-sm text-[#DFF8FF]'
                  >
                    <ShieldCheck size={15} className='text-[#16D9F5]' />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className='flex flex-col gap-2 text-sm text-[#9FB4C7] sm:flex-row sm:items-center'>
                <span>Base URL</span>
                <button
                  type='button'
                  onClick={handleCopyBaseURL}
                  className='inline-flex items-center gap-2 rounded-md border border-[rgba(127,205,255,0.18)] bg-[rgba(13,32,51,0.72)] px-3 py-2 text-left font-mono text-[#F7FBFF] transition hover:border-[rgba(22,217,245,0.52)]'
                >
                  <span>{serverAddress}</span>
                  <IconCopy />
                </button>
              </div>
            </div>

            <div className='bluefuture-panel rounded-lg p-4 md:p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <div>
                  <Text className='!text-xs uppercase tracking-[0.18em] !text-[#9FB4C7]'>
                    OpenAI SDK Compatible
                  </Text>
                  <h3 className='m-0 mt-1 text-xl font-semibold text-[#F7FBFF]'>
                    替换 Base URL 即可调用
                  </h3>
                </div>
                <Tag color='green' shape='circle'>
                  在线
                </Tag>
              </div>
              <pre className='bluefuture-code overflow-x-auto p-4 text-xs leading-6 md:text-sm'>
                <code>{BLUE_FUTURE_CODE_SAMPLE}</code>
              </pre>
              <div className='mt-5 grid grid-cols-3 gap-3 text-center'>
                {[
                  ['99.9%', '服务可用'],
                  ['OpenAI', '格式兼容'],
                  ['Real-time', '用量统计'],
                ].map(([value, label]) => (
                  <div key={label} className='bluefuture-card p-3'>
                    <div className='text-lg font-semibold text-[#16D9F5]'>
                      {value}
                    </div>
                    <div className='mt-1 text-xs text-[#9FB4C7]'>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className='md:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-3'>
              {BLUE_FUTURE_STEPS.map((step, index) => (
                <div key={step.title} className='bluefuture-card p-5'>
                  <div className='mb-4 flex h-8 w-8 items-center justify-center rounded-md bg-[rgba(22,217,245,0.14)] text-sm font-semibold text-[#16D9F5]'>
                    {index + 1}
                  </div>
                  <h3 className='mb-2 text-lg font-semibold text-[#F7FBFF]'>
                    {step.title}
                  </h3>
                  <p className='m-0 text-sm leading-6 text-[#9FB4C7]'>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className='mx-auto max-w-7xl px-5 pb-16 md:px-8 lg:px-10'>
            <div className='mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end'>
              <div>
                <Text className='!text-sm uppercase tracking-[0.18em] !text-[#16D9F5]'>
                  Capabilities
                </Text>
                <h2 className='m-0 mt-2 text-3xl font-semibold text-[#F7FBFF]'>
                  为长期运行的 API 服务而设计
                </h2>
              </div>
              <p className='m-0 max-w-xl text-sm leading-6 text-[#9FB4C7]'>
                请求内容默认不展示，敏感信息可隐藏；用量、模型状态和计费明细实时可查。
              </p>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {BLUE_FUTURE_CAPABILITIES.map((item, index) => {
                const icons = [Layers3, Activity, Gauge, KeyRound, ReceiptText, ShieldCheck];
                const Icon = icons[index % icons.length];
                return (
                  <div key={item.title} className='bluefuture-card p-5'>
                    <Icon className='mb-4 text-[#16D9F5]' size={22} />
                    <h3 className='mb-2 text-lg font-semibold text-[#F7FBFF]'>
                      {item.title}
                    </h3>
                    <p className='m-0 text-sm leading-6 text-[#9FB4C7]'>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
