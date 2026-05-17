import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/image-console')({
  component: ImageConsolePage,
})

function ImageConsolePage() {
  return (
    <main className='bg-background min-h-svh'>
      <iframe
        title='bluefuture.studio Image Console'
        src='/image-console-app/index.html'
        className='h-svh w-full border-0'
        allow='clipboard-read; clipboard-write'
      />
    </main>
  )
}
