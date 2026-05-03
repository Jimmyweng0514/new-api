import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-20 md:py-28'>
      <AnimateInView
        className='mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center'
        animation='scale-in'
      >
        <div>
          <h2 className='text-2xl leading-tight font-semibold tracking-tight md:text-4xl'>
            {t('开始前，只做一个选择')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed md:text-base'>
            {t('先看模型，再决定怎么用。页面不打扰你，功能随时跟上。')}
          </p>
        </div>
        <div className='flex shrink-0 items-center gap-3'>
          <Button className='group rounded-lg' asChild>
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
        </div>
      </AnimateInView>
    </section>
  )
}
