import { memo, type MouseEvent } from 'react'
import { ChevronRight, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { DEFAULT_TOKEN_UNIT } from '../constants'
import { parseTags } from '../lib/filters'
import { isTokenBasedModel } from '../lib/model-helpers'
import { formatPrice, formatRequestPrice } from '../lib/price'
import {
  getDynamicDisplayGroupRatio,
  getDynamicPricingSummary,
} from '../lib/dynamic-price'
import type { PricingModel, TokenUnit } from '../types'

export interface ModelCardProps {
  model: PricingModel
  onClick: () => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
}

function compactList(items: string[], fallback: string, limit = 2) {
  const cleanItems = items.filter(Boolean)
  if (cleanItems.length === 0) return fallback
  const visible = cleanItems.slice(0, limit).join(', ')
  const hidden = cleanItems.length - limit
  return hidden > 0 ? `${visible} +${hidden}` : visible
}

export const ModelCard = memo(function ModelCard(props: ModelCardProps) {
  const { t } = useTranslation()
  const { copyToClipboard } = useCopyToClipboard()
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const priceRate = props.priceRate ?? 1
  const usdExchangeRate = props.usdExchangeRate ?? 1
  const showRechargePrice = props.showRechargePrice ?? false
  const isTokenBased = isTokenBasedModel(props.model)
  const tokenUnitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const tags = parseTags(props.model.tags)
  const groups = props.model.enable_groups || []
  const endpoints = props.model.supported_endpoint_types || []
  const vendorIcon = props.model.vendor_icon
    ? getLobeIcon(props.model.vendor_icon, 26)
    : null
  const initial = props.model.model_name?.charAt(0).toUpperCase() || '?'
  const isDynamicPricing =
    props.model.billing_mode === 'tiered_expr' &&
    Boolean(props.model.billing_expr)
  const dynamicSummary = isDynamicPricing
    ? getDynamicPricingSummary(props.model, {
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate,
        groupRatioMultiplier: getDynamicDisplayGroupRatio(props.model),
      })
    : null

  const priceText = (() => {
    if (dynamicSummary?.isSpecialExpression) return t('Dynamic Pricing')

    if (dynamicSummary && dynamicSummary.primaryEntries.length > 0) {
      return dynamicSummary.primaryEntries
        .map((entry) => `${t(entry.shortLabel)} ${entry.formatted}`)
        .join(' · ')
    }

    if (isTokenBased) {
      const input = formatPrice(
        props.model,
        'input',
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate
      )
      const output = formatPrice(
        props.model,
        'output',
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate
      )
      return `${input}/${tokenUnitLabel} ${t('Input')} · ${output}/${tokenUnitLabel} ${t('Output')}`
    }

    return `${formatRequestPrice(
      props.model,
      showRechargePrice,
      priceRate,
      usdExchangeRate
    )} / ${t('request')}`
  })()

  const metaText = [
    `${t('Groups')}: ${compactList(groups, t('All Groups'))}`,
    `${t('Endpoint')}: ${compactList(endpoints, t('General'))}`,
    `${tokenUnitLabel} ${t('Billing')}`,
  ].join(' · ')

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation()
    copyToClipboard(props.model.model_name || '')
  }

  return (
    <article
      className={cn(
        'bg-card group rounded-lg border border-border/70 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-colors sm:p-5',
        'hover:border-border hover:bg-card/95'
      )}
    >
      <button
        type='button'
        onClick={props.onClick}
        className='block w-full text-left'
      >
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex min-w-0 items-start gap-4'>
            <div className='bg-muted/50 flex size-12 shrink-0 items-center justify-center rounded-lg border border-border/60'>
              {vendorIcon || (
                <span className='text-muted-foreground text-sm font-semibold'>
                  {initial}
                </span>
              )}
            </div>

            <div className='min-w-0'>
              <h3 className='text-foreground truncate font-mono text-base font-semibold leading-tight sm:text-lg'>
                {props.model.model_name}
              </h3>
              <p className='text-muted-foreground mt-4 line-clamp-3 text-sm leading-7'>
                {props.model.description || t('No description available.')}
              </p>
            </div>
          </div>

          <div className='text-muted-foreground max-w-full shrink-0 text-left font-mono text-sm font-semibold leading-relaxed sm:max-w-sm sm:text-right'>
            {priceText}
          </div>
        </div>
      </button>

      <div className='mt-4 border-t border-border/70 pt-3'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs'>
            <span className='truncate'>{metaText}</span>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='rounded-md border border-border/60 px-1.5 py-0.5'
              >
                {tag}
              </span>
            ))}
          </div>

          <div className='flex shrink-0 items-center gap-2'>
            <button
              type='button'
              onClick={handleCopy}
              className='text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md border border-border/70 transition-colors'
              title={t('Copy')}
            >
              <Copy className='size-3.5' />
            </button>
            <button
              type='button'
              onClick={props.onClick}
              className='text-primary inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm font-semibold'
            >
              {t('View document')}
              <ChevronRight className='size-3.5' />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
})
