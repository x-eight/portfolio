import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/lib/i18n-context'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Saul Quispe | Full Stack Developer',
  description: 'Full Stack Developer specializing in building accessible, pixel-perfect digital experiences for the web. Expert in React, Next.js, TypeScript, and cloud technologies.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
  authors: [{ name: 'Saul Quispe' }],
  creator: 'Saul Quispe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saulquispe.dev',
    title: 'Saul Quispe | Full Stack Developer',
    description: 'Full Stack Developer specializing in building accessible, pixel-perfect digital experiences for the web.',
    siteName: 'Saul Quispe Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saul Quispe | Full Stack Developer',
    description: 'Full Stack Developer specializing in building accessible, pixel-perfect digital experiences for the web.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
