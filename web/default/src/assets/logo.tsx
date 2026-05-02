import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='newapi-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>BlueFuture Studio</title>
      <path d='M4 17.5c4.5-8 9.5-11 16-11' />
      <path d='M5 7.5c4.5 2 8.5 2 14 0' />
      <path d='M12 4v16' />
      <path d='M7.5 19.5h9' />
    </svg>
  )
}
