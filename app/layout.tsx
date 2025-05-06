import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shadcn/ui Extra',
  description: 'A collection of custom components built on top of shadcn/ui',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
