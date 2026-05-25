import type { Metadata } from 'next'
import { Noto_Sans, Noto_Serif } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const notoSerif = Noto_Serif({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'DP Chaudhary | Kurukshetra',
  description:
    'Official website of D.P. Chaudhary — Political Leader from Kurukshetra, Haryana. Committed to development, culture, and the prosperity of the sacred land.',
  keywords: 'DP Chaudhary, Kurukshetra, Haryana, politician, leader, development',
  authors: [{ name: 'DP Chaudhary' }],
  openGraph: {
    title: 'DP Chaudhary | Kurukshetra',
    description: 'Official website of DP Chaudhary — Leader from the sacred land of Kurukshetra',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${notoSans.variable} ${notoSerif.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
