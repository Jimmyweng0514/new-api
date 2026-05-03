import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  const { t } = useTranslation()
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-center text-2xl font-semibold tracking-tight sm:text-left'>
            {t('创建账号')}
          </h2>
          <p className='text-muted-foreground text-center text-sm leading-relaxed sm:text-left'>
            {t('一个账号，管理模型、密钥和额度。')}
          </p>
          <p className='text-muted-foreground text-left text-sm sm:text-base'>
            {t('已有账号？')}{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary font-medium underline underline-offset-4'
            >
              {t('直接登录')}
            </Link>
            .
          </p>
        </div>

        <SignUpForm />

        <TermsFooter
          variant='sign-up'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}
