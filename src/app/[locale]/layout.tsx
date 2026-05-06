// ============================================================
// 文件：src/app/[locale]/layout.tsx
// 用途：每个语言版本的共用布局
//       加载对应语言的翻译文字，设置 html lang 属性
//       包含导航栏（Navbar）和页脚（Footer）
// 维护：通常不需要修改
// ============================================================

import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// 为每个语言版本生成正确的 lang 属性
export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // 验证语言代码有效性
  if (!locales.includes(locale as any)) notFound()

  // 加载当前语言的翻译内容
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* 顶部导航栏 —— 见 src/components/layout/Navbar.tsx */}
          <Navbar />
          {/* 主内容区域 */}
          <main className="min-h-screen">
            {children}
          </main>
          {/* 页脚 —— 见 src/components/layout/Footer.tsx */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
