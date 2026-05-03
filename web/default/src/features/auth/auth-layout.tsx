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
    <div className='bg-background relative grid min-h-svh max-w-none overflow-hidden'>
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
      <div className='container relative z-10 grid items-center gap-10 pt-20 lg:grid-cols-[1fr_480px] lg:pt-0'>
        <div className='hidden max-w-xl flex-col justify-center lg:flex'>
          <h1 className='mb-5 text-5xl leading-tight font-semibold tracking-tight'>
            {t('继续上次的')}
            <br />
            <span className='bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent dark:from-blue-300 dark:via-sky-300 dark:to-teal-200'>
              {t('AI 工作流')}
            </span>
          </h1>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            {t(
              '登录后直接回到模型、密钥、额度和用量。页面不制造噪音，只保留完成任务需要的入口。'
            )}
          </p>
        </div>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 rounded-lg border border-border/70 bg-card px-4 py-8 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:w-[480px] sm:p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
