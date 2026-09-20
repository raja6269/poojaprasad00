import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pooja Prasad & Samagri - Online Store',
  description: 'Premium pooja items, prasad, and samagri for your spiritual needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
