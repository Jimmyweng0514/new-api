import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative grid min-h-svh max-w-none overflow-hidden bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_52%,#ecfeff_100%)] dark:bg-[linear-gradient(135deg,#020617_0%,#081225_56%,#06262f_100%)]'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70 dark:opacity-50'
        style={{
          background:
            'linear-gradient(110deg, rgba(37,99,235,0.16), transparent 44%, rgba(20,184,166,0.14))',
          clipPath: 'polygon(0 0, 100% 0, 100% 42%, 0 100%)',
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.08)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_86%)] bg-[size:4rem_4rem] dark:opacity-35'
      />
      <Link
        to='/'
        className='absolute top-4 left-4 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative h-8 w-8'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-8 w-8 rounded-lg object-cover shadow-sm'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <h1 className='text-xl font-medium'>{systemName}</h1>
        )}
      </Link>
      <div className='container relative z-10 grid items-center gap-10 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0'>
        <div className='hidden max-w-xl flex-col justify-center lg:flex'>
          <div className='border-sky-200/70 bg-white/70 text-sky-700 mb-5 inline-flex w-fit rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur dark:border-sky-300/15 dark:bg-slate-900/70 dark:text-sky-200'>
            {t('BlueFuture Account')}
          </div>
          <h1 className='mb-5 text-5xl leading-tight font-bold tracking-tight'>
            {t('让每次登录，')}
            <br />
            <span className='bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-300 dark:via-sky-300 dark:to-teal-200'>
              {t('都直接进入创作状态')}
            </span>
          </h1>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            {t(
              '为创作者、学生、开发者和 AI 重度用户准备：少一点配置，多一点产出。'
            )}
          </p>
          <div className='mt-8 grid grid-cols-3 gap-3'>
            {[t('模型统一'), t('额度清晰'), t('随用随开')].map((item) => (
              <div
                key={item}
                className='border-border/60 bg-background/70 rounded-lg border px-4 py-4 text-center shadow-sm backdrop-blur'
              >
                <div className='text-sm font-bold text-sky-700 dark:text-sky-200'>
                  {item}
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  BlueFuture
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 rounded-lg border border-sky-200/50 bg-white/80 px-4 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:w-[480px] sm:p-8 dark:border-sky-300/10 dark:bg-slate-950/75'>
          {children}
        </div>
      </div>
    </div>
  )
}
