import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '@/components/ui/skeleton'

interface PanelWrapperProps {
  title: ReactNode
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  height?: string
  headerActions?: ReactNode
  children?: ReactNode
}

export function PanelWrapper(props: PanelWrapperProps) {
  const { t } = useTranslation()
  const resolvedEmptyMessage = props.emptyMessage ?? t('No data available')
  const height = props.height ?? 'h-64'

  if (props.loading) {
    return (
      <div className='bg-card/70 overflow-hidden rounded-lg border border-border/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)]'>
        <div className='border-border/60 border-b px-3 py-2.5 sm:px-4'>
          <div className='text-sm font-semibold tracking-tight'>
            {props.title}
          </div>
        </div>
        <div className='p-3 sm:p-4'>
          <Skeleton className={`w-full ${height}`} />
        </div>
      </div>
    )
  }

  if (props.empty) {
    return (
      <div className='bg-card/70 overflow-hidden rounded-lg border border-border/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)]'>
        <div className='border-border/60 border-b px-3 py-2.5 sm:px-4'>
          <div className='text-sm font-semibold tracking-tight'>
            {props.title}
          </div>
        </div>
        <div
          className={`text-muted-foreground/80 flex items-center justify-center px-4 text-center text-sm ${height}`}
        >
          {resolvedEmptyMessage}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-card/70 overflow-hidden rounded-lg border border-border/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)]'>
      <div className='border-border/60 border-b px-3 py-2.5 sm:px-4'>
        {props.headerActions ? (
          <div className='flex items-center justify-between gap-2'>
            <div className='text-sm font-semibold tracking-tight'>
              {props.title}
            </div>
            {props.headerActions}
          </div>
        ) : (
          <div className='text-sm font-semibold tracking-tight'>
            {props.title}
          </div>
        )}
      </div>
      <div className='p-3 sm:p-4'>{props.children}</div>
    </div>
  )
}
