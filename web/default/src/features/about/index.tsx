import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Markdown } from '@/components/ui/markdown'
import { Skeleton } from '@/components/ui/skeleton'
import { PublicLayout } from '@/components/layout'
import { getAboutContent } from './api'

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isLikelyHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

function EmptyAboutState() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <div className='flex min-h-[60vh] items-center justify-center p-8'>
      <div className='max-w-3xl space-y-8'>
        <div className='space-y-3'>
          <p className='text-muted-foreground text-xs font-medium uppercase'>
            {t('About')}
          </p>
          <h2 className='text-3xl font-semibold tracking-tight'>
            {t('少即是多，能力不必复杂')}
          </h2>
          <p className='text-muted-foreground max-w-2xl leading-relaxed'>
            {t(
              'BlueFuture Studio 面向创作者、学生、开发者和 AI 高频用户。我们把模型接入、密钥、额度和用量收进一条清楚路径，让用户少理解系统，多完成自己的事。'
            )}
          </p>
        </div>
        <div className='grid gap-3 text-sm md:grid-cols-3'>
          {[t('信息少一层'), t('操作少一步'), t('结果更清楚')].map((item) => (
            <div
              key={item}
              className='rounded-lg border border-border/70 bg-card px-4 py-4 font-medium'
            >
              {item}
            </div>
          ))}
        </div>
        <div className='text-muted-foreground space-y-3 text-sm'>
          <p>
            {t('本站基于开源项目构建：')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('QuantumNous/new-api')}
            </a>
          </p>
          <p className='text-muted-foreground'>
            © {currentYear} BlueFuture Studio. {t('当前版本')}:{' '}
            <span className='text-foreground font-medium'>BlueFuture v1.1</span>
            . {t('开源许可遵循')}{' '}
            <a
              href='https://github.com/QuantumNous/new-api/blob/main/LICENSE'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              {t('AGPL v3.0 License')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: getAboutContent,
  })

  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isValidUrl(rawContent)
  const isHtml = hasContent && !isUrl && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout>
        <EmptyAboutState />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={t('About')}
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        {isHtml ? (
          <div
            className='prose prose-neutral dark:prose-invert max-w-none'
            dangerouslySetInnerHTML={{ __html: rawContent }}
          />
        ) : (
          <Markdown className='prose-neutral dark:prose-invert max-w-none'>
            {rawContent}
          </Markdown>
        )}
      </div>
    </PublicLayout>
  )
}
