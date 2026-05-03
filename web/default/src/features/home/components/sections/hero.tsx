import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()

  return (
    <section className='relative z-10 flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
      />

      <div className='flex max-w-3xl flex-col items-center text-center'>
        <h1
          className='landing-animate-fade-up text-[clamp(2.4rem,7vw,4.8rem)] leading-[1.05] font-semibold tracking-tight'
          style={{ animationDelay: '40ms' }}
        >
          {t('一个入口，')}
          <br />
          <span className='bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-300 dark:via-sky-300 dark:to-teal-200'>
            {t('用好所有 AI')}
          </span>
        </h1>
        <p
          className='landing-animate-fade-up text-muted-foreground/80 mt-6 max-w-xl text-base leading-relaxed opacity-0 md:text-lg'
          style={{ animationDelay: '120ms' }}
        >
          <span className='text-foreground font-medium'>
            {systemName || 'BlueFuture Studio'}
          </span>{' '}
          {t(
            '把选模型、管额度、接 API 变成三个清楚动作。复杂留在后台，页面只保留你下一步要做的事。'
          )}
        </p>
        <div
          className='landing-animate-fade-up text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm opacity-0'
          style={{ animationDelay: '160ms' }}
        >
          {[t('找模型'), t('管额度'), t('开始调用')].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div
          className='landing-animate-fade-up mt-8 flex items-center gap-3 opacity-0'
          style={{ animationDelay: '220ms' }}
        >
          {props.isAuthenticated ? (
            <Button className='group rounded-lg' asChild>
              <Link to='/dashboard'>
                {t('进入工作台')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                className='group rounded-lg bg-blue-600 text-white hover:bg-blue-700'
                asChild
              >
                <Link to='/sign-up'>
                  {t('开始使用')}
                  <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg bg-background'
                asChild
              >
                <Link to='/pricing'>{t('查看模型')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
