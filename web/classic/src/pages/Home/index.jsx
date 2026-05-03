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
import { Button, Input, ScrollList, ScrollItem } from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');
  const heroTags = ['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Qwen'];
  const productSteps = [
    {
      title: t('找模型'),
      desc: t('先看模型、价格和分组，少比较半天。'),
    },
    {
      title: t('管入口'),
      desc: t('密钥、额度和用量放在一起，不来回找。'),
    },
    {
      title: t('开始调用'),
      desc: t('把 API 地址接到你的工具里，马上开始用。'),
    },
  ];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='bluefuture-home w-full overflow-x-hidden'>
          <section className='bluefuture-hero w-full min-h-[620px] md:min-h-[720px] relative overflow-hidden'>
            <div className='flex items-center justify-center h-full px-4 py-24 md:py-28 lg:py-36 mt-10'>
              <div className='flex flex-col items-center justify-center text-center max-w-5xl mx-auto'>
                <div className='bf-badge mb-5'>{t('Less is More')}</div>
                <div className='flex flex-col items-center justify-center mb-6 md:mb-8'>
                  <h1
                    className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-semi-color-text-0 leading-tight ${isChinese ? 'tracking-wide md:tracking-wider' : ''}`}
                  >
                    <>
                      {t('一个入口，')}
                      <br />
                      <span className='bluefuture-gradient-text'>
                        {t('用好所有 AI')}
                      </span>
                    </>
                  </h1>
                  <p className='text-base md:text-lg lg:text-xl text-semi-color-text-1 mt-5 md:mt-6 max-w-2xl leading-relaxed'>
                    {t(
                      '把选模型、管额度、接 API 变成三个清楚动作。复杂留在后台，页面只保留你下一步要做的事。',
                    )}
                  </p>
                  <div className='flex flex-wrap items-center justify-center gap-2 mt-5'>
                    {heroTags.map((tag) => (
                      <span key={tag} className='bf-model-pill'>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className='bf-endpoint-box flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-7 md:mt-8 max-w-xl'>
                    <Input
                      readonly
                      value={serverAddress}
                      className='flex-1 !rounded-full'
                      size={isMobile ? 'default' : 'large'}
                      suffix={
                        <div className='flex items-center gap-2'>
                          <ScrollList
                            bodyHeight={32}
                            style={{ border: 'unset', boxShadow: 'unset' }}
                          >
                            <ScrollItem
                              mode='wheel'
                              cycled={true}
                              list={endpointItems}
                              selectedIndex={endpointIndex}
                              onSelect={({ index }) => setEndpointIndex(index)}
                            />
                          </ScrollList>
                          <Button
                            type='primary'
                            onClick={handleCopyBaseURL}
                            icon={<IconCopy />}
                            className='!rounded-full'
                          />
                        </div>
                      }
                    />
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
                  <Link to='/console'>
                    <Button
                      theme='solid'
                      type='primary'
                      size={isMobile ? 'default' : 'large'}
                      className='bf-primary-button !rounded-3xl px-8 py-2'
                      icon={<IconPlay />}
                    >
                      {t('开始使用')}
                    </Button>
                  </Link>
                  {isDemoSiteMode && statusState?.status?.version ? (
                    <Button
                      size={isMobile ? 'default' : 'large'}
                      className='flex items-center !rounded-3xl px-6 py-2'
                      icon={<IconGithubLogo />}
                      onClick={() =>
                        window.open(
                          'https://github.com/QuantumNous/new-api',
                          '_blank',
                        )
                      }
                    >
                      {statusState.status.version}
                    </Button>
                  ) : (
                    docsLink && (
                      <Button
                        size={isMobile ? 'default' : 'large'}
                        className='bf-ghost-button flex items-center !rounded-3xl px-6 py-2'
                        icon={<IconFile />}
                        onClick={() => window.open(docsLink, '_blank')}
                      >
                        {t('文档')}
                      </Button>
                    )
                  )}
                </div>

                <div className='bf-path-list mt-12 md:mt-14 w-full max-w-3xl'>
                  {productSteps.map((card, index) => (
                    <div key={card.title} className='bf-path-row'>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  ))}
                </div>

                <div className='bf-model-strip mt-10 w-full max-w-3xl'>
                  <span>{t('OpenAI')}</span>
                  <span>{t('Claude')}</span>
                  <span>{t('Gemini')}</span>
                  <span>{t('DeepSeek')}</span>
                  <span>{t('Qwen')}</span>
                  <span>{t('更多模型')}</span>
                </div>
              </div>
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
