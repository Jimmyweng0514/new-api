import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('打开模型广场'),
      desc: t('先搜索模型，再看价格和适用场景。'),
    },
    {
      num: '2',
      title: t('创建一个密钥'),
      desc: t('把调用入口、额度和权限放在同一处管理。'),
    },
    {
      num: '3',
      title: t('接入你的工具'),
      desc: t('复制地址，接到写作、代码、Bot 或自动化流程里。'),
    },
  ]

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-5xl'>
        <AnimateInView className='mb-10 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
            {t('三步开始')}
          </p>
          <h2 className='text-2xl font-semibold tracking-tight md:text-4xl'>
            {t('把 AI 接进日常，不需要多余步骤')}
          </h2>
        </AnimateInView>

        <div className='grid gap-3 md:grid-cols-3'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 100}
              animation='fade-up'
              className='border-border/60 bg-background rounded-lg border p-5'
            >
              <div className='text-muted-foreground mb-8 font-mono text-sm'>
                {step.num}
              </div>
              <h3 className='text-base font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
