import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export interface EmptyStateProps {
  searchQuery?: string
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function EmptyState(props: EmptyStateProps) {
  const { t } = useTranslation()
  const hasSearch = Boolean(props.searchQuery?.trim())

  return (
    <div className='bg-card/60 flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-border/70 px-6 py-12 text-center shadow-[0_1px_2px_rgba(15,23,42,0.03)]'>
      <div className='mb-4 flex size-12 items-center justify-center rounded-lg border border-border/70 bg-background'>
        <Search className='text-muted-foreground/50 size-6' />
      </div>

      <h3 className='text-foreground mb-1 text-base font-semibold tracking-tight'>
        {t('No models found')}
      </h3>

      <p className='text-muted-foreground mb-5 max-w-sm text-sm leading-relaxed'>
        {hasSearch
          ? t(
              'No results for "{{query}}". Try adjusting your search or filters.',
              { query: props.searchQuery }
            )
          : t('No models match your current filters.')}
      </p>

      {(props.hasActiveFilters || hasSearch) && (
        <Button variant='outline' size='sm' onClick={props.onClearFilters}>
          {t('Clear all filters')}
        </Button>
      )}
    </div>
  )
}
