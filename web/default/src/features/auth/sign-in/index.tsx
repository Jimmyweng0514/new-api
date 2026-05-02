import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { t } = useTranslation()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-2xl font-semibold tracking-tight sm:text-left'>
            {t('欢迎回到 BlueFuture')}
          </h2>
          <p className='text-muted-foreground text-center text-sm leading-relaxed sm:text-left'>
            {t('继续你的灵感、创作和 AI 自动化工作流。')}
          </p>
          {!status?.self_use_mode_enabled && (
            <p className='text-muted-foreground text-left text-sm sm:text-base'>
              {t('还没有账号？')}{' '}
              <Link
                to='/sign-up'
                className='hover:text-primary font-medium underline underline-offset-4'
              >
                {t('立即注册')}
              </Link>
              .
            </p>
          )}
        </div>

        <UserAuthForm redirectTo={redirect} />

        <TermsFooter
          variant='sign-in'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}
