import { useEffect, useRef } from 'react'

export function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return
      if (event.data?.type !== 'navigate' || !event.data.href) return

      const href = String(event.data.href)
      if (href.startsWith('#')) return
      if (/^https?:\/\//.test(href)) {
        window.location.href = href
        return
      }
      window.location.href = href
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src='/bluefuture/index.html?v=imagegen-lab'
      className='block min-h-screen w-full border-none'
      title='BlueFuture Studio'
      allow='clipboard-read; clipboard-write'
      onLoad={() => {
        const iframe = iframeRef.current
        try {
          const doc = iframe?.contentDocument
          if (!iframe || !doc?.documentElement) return
          const setHeight = () => {
            iframe.style.height = `${Math.max(
              doc.documentElement.scrollHeight,
              doc.body?.scrollHeight || 0,
              window.innerHeight
            )}px`
          }
          setHeight()
          new ResizeObserver(setHeight).observe(doc.documentElement)
        } catch {
          /* Cross-origin fallback: keep viewport height. */
        }
      }}
    />
  )
}
