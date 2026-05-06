// ============================================================
// 文件：src/app/[locale]/products/[slug]/page.tsx
// 用途：产品详情页 —— 每个原料的独立详情页
//       URL 格式：/en/products/brewelixir-baijiu-ferment
// 维护：
//   - 【修改产品内容】→ src/lib/products.ts 对应产品的字段
//   - 此文件无需修改，数据全部从 products.ts 读取
// ============================================================

import { notFound } from 'next/navigation'
import { Link } from '@/lib/navigation'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft, FlaskConical, ChevronRight } from 'lucide-react'
import { getProductBySlug, urlFor } from '@/sanity/queries'
import { products as localProducts, getProductById as getLocalProductById, tagLabels, type Locale } from '@/lib/products'

// 告诉 Next.js 预生成所有产品页面（静态生成，加载更快）
export function generateStaticParams() {
  const locales = ['en', 'zh-Hans', 'zh-Hant', 'ja']
  return locales.flatMap(locale =>
    localProducts.map(product => ({ locale, slug: product.slug }))
  )
}

interface Props {
  params: { locale: string; slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = params
  const t = await getTranslations('product_detail')
  const tSample = await getTranslations('nav')

  // 将 next-intl 返回的 locale 字符串映射到数据支持的 key
  const loc: Locale = (() => {
    if (locale === 'zh-Hans' || locale === 'zh-Hant') return locale as Locale
    if (locale === 'ja') return 'ja'
    return 'en'
  })()

  // 获取标签的本地化文本（支持 zh-Hans / zh-Hant / zh 回退）
  const getTagLabel = (tag: string): string => {
    const labelMap = tagLabels[tag]
    if (!labelMap) return tag
    return (labelMap as any)[loc as string] || labelMap.zh || tag
  }

  // 优先从 Sanity 获取产品数据；若失败则降级使用本地数据
  let product: any = null
  try {
    product = await getProductBySlug(slug)
  } catch (e) {
    console.warn('Sanity unavailable, using local data:', e)
  }
  if (!product) {
    product = localProducts.find(p => p.slug === slug)
  }
  if (!product) notFound()

  // DEBUG：打印 Sanity 返回的 image 原始数据
  console.log('[DEBUG image]', slug, JSON.stringify(product?.image))

  // 统一图片 URL（支持本地字符串路径 和 Sanity image object）
  const getImageSrc = (img: any) => {
    if (!img) return null
    if (typeof img === 'string') return img
    // Sanity image object：必须有 asset._ref 才能生成有效 URL
    return urlFor(img, { width: 600 })
  }

  // 获取功效文本（兼容 zh-Hans 和 zh-Hant）
  const getEfficacyText = (p: typeof product) => {
    const l = loc as string;
    if (p.efficacy[l as keyof typeof p.efficacy]) {
      return p.efficacy[l as keyof typeof p.efficacy];
    }
    if (p.efficacy['zh-Hans']) return p.efficacy['zh-Hans'];
    return p.efficacy.en;
  };

  // 获取功效简介
  const getEfficacySummary = (p: typeof product) => {
    if (!p.efficacySummary) return null;
    const l = loc as string;
    if (p.efficacySummary[l as keyof typeof p.efficacySummary]) {
      return p.efficacySummary[l as keyof typeof p.efficacySummary];
    }
    if (p.efficacySummary['zh-Hans']) return p.efficacySummary['zh-Hans'];
    return p.efficacySummary.en;
  };

  // 统一相关产品格式（Sanity 返回对象数组，本地返回 slug 数组）
  let relatedProducts: any[] = []
  if (product.relatedProducts && Array.isArray(product.relatedProducts)) {
    // Sanity 格式
    relatedProducts = product.relatedProducts.map((p: any) => ({
      id: p._id || p.id,
      slug: typeof p.slug === 'string' ? p.slug : p.slug?.current,
      name: p.name,
      image: p.image,
      tags: p.tags || [],
    }))
  } else if (product.relatedIds && Array.isArray(product.relatedIds)) {
    // 本地数据格式
    relatedProducts = product.relatedIds
      .map((slug: string) => getLocalProductById(slug))
      .filter(Boolean)
      .map(p => ({
        id: p!.id,
        slug: p!.slug,
        name: p!.name,
        image: p!.image,
        tags: p!.tags,
      }))
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 面包屑导航 */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/products" className="hover:text-brand-600 flex items-center gap-1">
            <ArrowLeft size={14} />
            {t('back')}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-600 font-medium">{product.name[loc]}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* 左侧主内容 */}
          <div className="lg:col-span-2 space-y-8">

            {/* ===== 基本信息卡 ===== */}
            <div>
              {/* 功效标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map(tag => (
                  <span key={tag} className="tag-pill">
                    {getTagLabel(tag)}
                  </span>
                ))}
              </div>

              {/* 产品名（三语言展示） */}
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                {product.name[loc]}
              </h1>
              {/* 非英文时显示英文副标题 */}
              {loc !== 'en' && (
                <p className="text-gray-400 text-sm mb-1">{product.name.en}</p>
              )}

              {/* INCI 名 */}
              <p className="text-gray-500 italic text-sm mt-2">
                <span className="font-medium not-italic text-gray-700">INCI: </span>
                {product.inci}
              </p>

              {/* 外观 */}
              <p className="text-gray-600 text-sm mt-1">
                {product.appearance[loc]}
              </p>
            </div>

            {/* ===== 功效说明 ===== */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-brand-500" />
                {t('efficacy')}
              </h2>
              {/* 功效简介（如果有） */}
              {getEfficacySummary(product) && (
                <p className="text-gray-700 font-medium leading-relaxed mb-3">
                  {getEfficacySummary(product)}
                </p>
              )}
              {/* 功效详细说明 */}
              <p className="text-gray-600 leading-relaxed">{getEfficacyText(product)}</p>
            </section>

            {/* ===== 技术参数 ===== */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-brand-500" />
                {t('params')}
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">pH Range</p>
                  <p className="font-mono font-semibold text-gray-900">{product.params.ph}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {product.params.keySpec.label[loc]}
                  </p>
                  <p className="font-mono font-semibold text-gray-900">{product.params.keySpec.value}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t('appearance') || 'Appearance'}</p>
                  <p className="text-gray-700 text-sm">{product.appearance[loc]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">MOQ</p>
                  <p className="text-gray-700 text-sm">{product.moq}</p>
                </div>
              </div>
            </section>

            {/* ===== 配方建议 ===== */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-accent-500" />
                {t('dosage')}
              </h2>
              <div className="bg-accent-400/10 border border-accent-400/20 rounded-2xl p-6">
                <p className="text-gray-700 text-sm leading-relaxed">{product.dosage[loc]}</p>
              </div>
            </section>

            {/* ===== 合规信息 ===== */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-gray-400" />
                {t('compliance')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{product.compliance[loc]}</p>
              {/* 注意：无文件下载，需要文件请联系我们（符合PRD要求） */}
            </section>
          </div>

          {/* 右侧 —— 固定 CTA 栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* 产品图片 */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center relative overflow-hidden">
                {getImageSrc(product.image) ? (
                  <img
                    src={getImageSrc(product.image)!}
                    alt={product.name[loc]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FlaskConical size={64} className="text-brand-200" />
                )}
              </div>

              {/* 索样 CTA 按钮 —— 跳转到索样页并预填产品名 */}
              <Link
                href={`/sample?product=${encodeURIComponent(product.name.en)}`}
                className="btn-primary w-full justify-center text-base py-4"
              >
                {t('request_sample')}
              </Link>

              {/* 参数摘要小卡片 */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">INCI</span>
                  <span className="text-gray-700 font-medium text-right max-w-[60%] text-xs italic">
                    {product.inci.split(',')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">pH</span>
                  <span className="text-gray-700 font-mono">{product.params.ph}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MOQ</span>
                  <span className="text-gray-700">{product.moq}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 相关产品 ===== */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((related, i) => related && (
                <Link
                  key={related.id || related.slug || i}
                  href={`/products/${typeof related.slug === 'string' ? related.slug : related.slug?.current}`}
                  className="product-card p-4 flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {related.image ? (
                      <img src={getImageSrc(related.image)} alt={related.name?.[loc] || ''} className="w-full h-full object-cover" />
                    ) : (
                      <FlaskConical size={24} className="text-brand-300" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors">
                      {related.name?.[loc]}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {(related.tags || []).slice(0, 1).map((tag: string) => (
                        <span key={tag} className="tag-pill text-xs">{getTagLabel(tag)}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
