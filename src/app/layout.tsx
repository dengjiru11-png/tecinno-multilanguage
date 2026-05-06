// ============================================================
// 文件：src/app/layout.tsx
// 用途：整个网站的根布局，加载字体和全局 CSS
// 维护：如要更换字体，在这里修改 Google Fonts 导入
// ============================================================

import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Noto_Sans_SC, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

// 【可修改】标题字体 —— Playfair Display（衬线，有高端感）
const fontDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

// 【可修改】正文字体 —— DM Sans（无衬线，清晰易读）
const fontBody = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

// 中文字体 —— Noto Sans SC（简体/繁体中文）
const fontChinese = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-chinese',
  display: 'swap',
})

// 日文字体 —— Noto Sans JP（日语）
const fontJapanese = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-japanese',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TecInno — Premium Cosmetic Ingredients Distributor',
    template: '%s | TecInno',
  },
  description: 'TecInno is a premier distributor of high-quality cosmetic ingredients from China. Serving brand owners, formulators and OEMs globally.',
  keywords: ['cosmetic ingredients', 'cosmetic distributor', 'China cosmetic ingredients', '化粧品原料', '化妆品原料代理'],
  openGraph: {
    siteName: 'TecInno',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${fontDisplay.variable} ${fontBody.variable} ${fontChinese.variable} ${fontJapanese.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
