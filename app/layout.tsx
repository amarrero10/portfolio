import type { Metadata } from 'next'
import { Syne, Onest } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio — Full Stack Web Developer',
  description: 'Full Stack Web Developer specializing in React, Next.js, and modern web technologies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${onest.variable}`}>
      <body>{children}</body>
    </html>
  )
}
