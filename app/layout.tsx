import type { Metadata } from 'next'
import { Inter, Amiri } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const amiri = Amiri({ 
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri'
})

export const metadata: Metadata = {
  title: 'DREAM OS v2.1 PRO',
  description: 'Enterprise Resource Planning System',
  manifest: '/dream/manifest.json',
  themeColor: '#34C759',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dream OS'
  }
}

export default function RootLayout({
  children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/dream/assets/img/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/dream/assets/img/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} ${amiri.variable}`}>
        {children}
      </body>
    </html>
  )
}
