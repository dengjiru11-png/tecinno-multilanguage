// ============================================================
// 文件：src/app/[locale]/page.tsx
// 用途：首页（Home Page）
//       包含所有首页区块的组合
// 维护：各区块内容 → 对应 messages/*.json 文件修改
// ============================================================

import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, FlaskConical, Globe2, Clock, Leaf } from 'lucide-react'
import { tagLabels, getFeaturedProducts, type Locale } from '@/lib/products'

// 将 next-intl 返回的 locale 字符串映射到本地数据支持的 key
function normalizeLocale(rawLocale: string): Locale {
  if (rawLocale === 'zh-Hans') return 'zh-Hans'
  if (rawLocale === 'zh-Hant') return 'zh-Hant'
  if (rawLocale === 'ja') return 'ja'
  return 'en'
}

export default async function HomePage() {
  const t = await getTranslations()
  const rawLocale = await getLocale()
  // urlLocale: 用于 href 链接，保持原始值（如 zh-Hans）
  const urlLocale = rawLocale
  // dataLocale: 用于查找产品数据，映射到 en/zh/ja
  const locale = normalizeLocale(rawLocale)
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      {/* =====================================================
          区块1：Hero 首屏横幅
          【修改文字】→ messages/*.json 的 hero 部分
          【修改背景】→ 将 bg-brand-gradient 换成图片
            backgroundImage: "url('/images/hero-bg.jpg')"
          ===================================================== */}
      <section className="relative min-h-screen flex items-center bg-brand-gradient overflow-hidden pt-16">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* 徽章标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
              <Leaf size={14} className="text-brand-300" />
              {/* 【可修改】徽章文字 → hero.badge */}
              {t('hero.badge')}
            </div>

            {/* 主标题 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t('hero.title')}
              <br />
              <span className="text-brand-300">{t('hero.subtitle')}</span>
            </h1>

            {/* 副标题描述 */}
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl">
              {t('hero.description')}
            </p>

            {/* CTA 按钮组 */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/${urlLocale}/products`} className="btn-white">
                {t('hero.cta_products')}
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${urlLocale}/sample`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                {t('hero.cta_sample')}
              </Link>
            </div>
          </div>
        </div>

        {/* 底部弧形过渡 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* =====================================================
          区块2：数字背书区
          【修改数字和标签】→ messages/*.json 的 stats 部分
          ===================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FlaskConical, value: t('stats.products'),  label: t('stats.products_label'),  color: 'text-brand-600' },
              { icon: Globe2,       value: t('stats.countries'), label: t('stats.countries_label'), color: 'text-brand-500' },
              { icon: Clock,        value: t('stats.response'),  label: t('stats.response_label'),  color: 'text-accent-600' },
              { icon: Leaf,         value: t('stats.certified'), label: t('stats.certified_label'), color: 'text-brand-700' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`text-3xl font-display font-bold ${stat.color} mb-1 group-hover:scale-105 transition-transform`}>
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          区块3：精选产品区
          【修改产品内容】→ src/lib/products.ts
          【修改标题文字】→ messages/*.json 的 featured 部分
          ===================================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="brand-line mx-auto mb-4" />
            <h2 className="section-title">{t('featured.title')}</h2>
            <p className="section-subtitle">{t('featured.subtitle')}</p>
          </div>

          {/* 产品卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product) => {
              const name = product.name[locale] || product.name.en
              return (
              <div key={product.id} className="product-card group">
                {/* 产品图片 */}
                <div className="h-48 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center relative overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FlaskConical size={48} className="text-brand-200" />
                  )}
                </div>

                <div className="p-5">
                  {/* 功效标签 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="tag-pill">
                        {tagLabels[tag]?.[locale] ?? tag}
                      </span>
                    ))}
                  </div>

                  {/* 产品名（当前语言） */}
                  <h3 className="font-display font-bold text-gray-900 mb-1 leading-snug">
                    {name}
                  </h3>

                  {/* INCI 名 */}
                  <p className="text-xs text-gray-400 italic mb-4 leading-snug line-clamp-2">
                    {product.inci}
                  </p>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Link
                      href={`/${urlLocale}/products/${product.slug}`}
                      className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold text-brand-600 border border-brand-200 hover:bg-brand-50 transition-colors"
                    >
                      {t('featured.view_details')}
                    </Link>
                    <Link
                      href={`/${urlLocale}/sample?product=${encodeURIComponent(product.name.en)}`}
                      className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors"
                    >
                      {t('featured.request_sample')}
                    </Link>
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          {/* 查看全部按钮 */}
          <div className="text-center">
            <Link href={`/${urlLocale}/products`} className="btn-secondary">
              {t('featured.view_all')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          区块4：为什么选择我们（6大优势）
          【修改内容】→ messages/*.json 的 why 部分
          ===================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="brand-line mx-auto mb-4" />
            <h2 className="section-title">{t('why.title')}</h2>
            <p className="section-subtitle">{t('why.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t.raw('why.items') as any[]).map((item: any, i: number) => (
              <div key={i} className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <span className="text-brand-600 font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          区块5：索样3步骤说明
          【修改内容】→ messages/*.json 的 process 部分
          ===================================================== */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="brand-line mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t('process.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(t.raw('process.steps') as any[]).map((step: any, i: number) => (
              <div key={i} className="relative text-center">
                {/* 步骤编号 */}
                <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-brand-300">{step.step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>

                {/* 步骤间连接线 */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-brand-500/30" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href={`/${urlLocale}/sample`} className="btn-primary">
              {t('nav.sample')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


    </>
  )
}
