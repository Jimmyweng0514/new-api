import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-70 dark:opacity-50'
        style={{
          background:
            'linear-gradient(110deg, rgba(37,99,235,0.16), transparent 44%, rgba(20,184,166,0.14))',
          clipPath: 'polygon(0 0, 100% 0, 100% 42%, 0 100%)',
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(37,99,235,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.10)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_86%)] bg-[size:4rem_4rem] opacity-80 dark:opacity-35'
      />

      <div className='flex max-w-3xl flex-col items-center text-center'>
        <div
          className='landing-animate-fade-up border-sky-200/70 bg-white/70 text-sky-700 mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur dark:border-sky-300/15 dark:bg-slate-900/70 dark:text-sky-200'
          style={{ animationDelay: '0ms' }}
        >
          <Sparkles className='size-3.5' />
          {t('BlueFuture Studio · 年轻人的 AI 能力入口')}
        </div>
        <h1
          className='landing-animate-fade-up text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.15] font-bold tracking-tight'
          style={{ animationDelay: '40ms' }}
        >
          {t('BlueFuture Studio')}
          <br />
          <span className='bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-300 dark:via-sky-300 dark:to-teal-200'>
            {t('把 AI 能力接到未来生活')}
          </span>
        </h1>
        <p
          className='landing-animate-fade-up text-muted-foreground/80 mt-5 max-w-lg text-base leading-relaxed opacity-0 md:text-lg'
          style={{ animationDelay: '120ms' }}
        >
          {systemName || 'BlueFuture Studio'}{' '}
          {t(
            '把 OpenAI、Claude、Gemini、DeepSeek 等热门模型放进一个账号。写作、学习、代码和自动化，从这里更快开始。'
          )}
        </p>
        <div
          className='landing-animate-fade-up mt-5 flex flex-wrap items-center justify-center gap-2 opacity-0'
          style={{ animationDelay: '160ms' }}
        >
          {['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Qwen'].map((item) => (
            <span
              key={item}
              className='border-border/60 bg-background/70 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur'
            >
              {item}
            </span>
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
              <Button className='group rounded-lg bg-blue-600 text-white hover:bg-blue-700' asChild>
                <Link to='/sign-up'>
                  {t('开始使用')}
                  <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                asChild
              >
                <Link to='/pricing'>{t('查看模型')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className='landing-animate-fade-up w-full opacity-0'
        style={{ animationDelay: '300ms' }}
      >
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
