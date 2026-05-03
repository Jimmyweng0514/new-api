import { BarChart3, KeyRound, Search, Waypoints } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const principles = [
    {
      icon: Search,
      title: t('先找到合适模型'),
      desc: t('模型广场只保留搜索、价格、分组和详情。信息够用，不抢注意力。'),
    },
    {
      icon: KeyRound,
      title: t('再管理使用入口'),
      desc: t('密钥、额度、用量放在同一条路径里，减少来回切换。'),
    },
    {
      icon: Waypoints,
      title: t('最后接入工作流'),
      desc: t('兼容常见 AI 接口，个人工具、Bot、自动化都从一个地址开始。'),
    },
    {
      icon: BarChart3,
      title: t('只看关键结果'),
      desc: t('状态、花费、调用记录用更少层级呈现，用户能马上判断下一步。'),
    },
  ]

  return (
    <section className='border-border/40 relative z-10 border-t px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-5xl'>
        <AnimateInView className='mb-12 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
            {t('Less is More')}
          </p>
          <h2 className='text-2xl leading-tight font-semibold tracking-tight md:text-4xl'>
            {t('把复杂能力，收进清楚的路径里')}
          </h2>
          <p className='text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed md:text-base'>
            {t(
              '好的界面不需要解释自己。你打开页面，就能看见重点、完成选择，并清楚下一步该往哪里走。'
            )}
          </p>
        </AnimateInView>

        <div className='divide-border/60 border-border/60 divide-y border-y'>
          {principles.map((item, index) => {
            const Icon = item.icon

            return (
              <AnimateInView
                key={item.title}
                delay={index * 80}
                animation='fade-up'
                className='grid gap-4 py-6 md:grid-cols-[180px_minmax(0,1fr)] md:items-start md:py-8'
              >
                <div className='flex items-center gap-3'>
                  <span className='text-muted-foreground font-mono text-sm'>
                    0{index + 1}
                  </span>
                  <Icon className='text-muted-foreground size-4' />
                </div>
                <div>
                  <h3 className='text-base font-semibold tracking-tight'>
                    {item.title}
                  </h3>
                  <p className='text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed'>
                    {item.desc}
                  </p>
                </div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
