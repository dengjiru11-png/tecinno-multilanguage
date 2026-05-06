'use client'
// ============================================================
// 文件：src/components/products/ProductGrid.tsx
// 用途：产品目录的搜索+筛选+展示（客户端交互组件）
//       数据由父级服务端组件传入，这里只负责交互
// ============================================================

import { useState, useMemo } from 'react'
import { Link } from '@/lib/navigation'
import { Search, FlaskConical, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'
import { urlFor } from '@/sanity/queries'
import type { Locale } from '@/lib/products'
import { tagLabels } from '@/lib/products'

interface SanityProduct {
  _id: string
  slug: { current: string }
  tags: string[]
  image?: any
  name: {
    en: string
    'zh-Hans'?: string
    'zh-Hant'?: string
    zh?: string
    ja?: string
  }
  inci?: string
  params?: { ph?: string; moq?: string }
  moq?: string
  compliance?: { en?: string; 'zh-Hans'?: string; 'zh-Hant'?: string; zh?: string; ja?: string }
  efficacySummary?: { en?: string; 'zh-Hans'?: string; 'zh-Hant'?: string; zh?: string; ja?: string }
}

interface ProductGridProps {
  products: SanityProduct[]
}

// 将 next-intl 返回的 locale 字符串映射到 Sanity 数据支持的 name key
// Sanity GROQ 查询已将 zh_Hans/zh_Hant 映射为 zh-Hans/zh-Hant
function normalizeLocale(locale: string): string {
  if (locale === 'zh-Hans') return 'zh-Hans'
  if (locale === 'zh-Hant') return 'zh-Hant'
  if (locale === 'ja') return 'ja'
  return 'en'
}

// 从产品 name 对象中按当前 locale 获取名称
function getLocalizedName(name: SanityProduct['name'], locale: string): string {
  const key = normalizeLocale(locale) as keyof typeof name
  return (name as any)[key] || name.en || ''
}

export default function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations('products')
  const rawLocale = useLocale()
  const locale = normalizeLocale(rawLocale)

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  // 固定使用 tagLabels 中定义的所有标签（按定义顺序显示，不依赖产品数据）
  const allTags = Object.keys(tagLabels)

  // 搜索 + 标签筛选
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const tagMatch = activeTag === 'all' || product.tags?.includes(activeTag)
      const query = searchQuery.toLowerCase().trim()
      const searchMatch =
        !query ||
        [
          product.name?.en,
          product.name?.zh,
          product.name?.ja,
          product.inci,
          ...(product.tags ?? []),
        ]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(query))
      return tagMatch && searchMatch
    })
  }, [searchQuery, activeTag, products])

  // 获取产品图片 URL
  const getImageUrl = (image: any) => {
    if (!image) return null
    if (typeof image === 'string') return image
    return urlFor(image, { width: 400, height: 300 })
  }

  // 获取标签的本地化文本（tagLabels 键为 en / zh-Hans / zh-Hant / ja）
  const getTagLabel = (tag: string): string => {
    const labelMap = tagLabels[tag]
    if (!labelMap) return tag
    const key = locale as keyof typeof labelMap
    return labelMap[key] || tag
  }

  return (
    <>
      {/* 搜索框 */}
      <div className="relative max-w-lg mx-auto mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-11"
        />
      </div>

      {/* 标签筛选 */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeTag === tag
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
            )}
          >
            {getTagLabel(tag)}
          </button>
        ))}
      </div>

      {/* 产品网格 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <FlaskConical size={48} className="mx-auto mb-4 opacity-30" />
          <p>{t('no_results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const imgUrl = getImageUrl(product.image)
            const slug = product.slug?.current ?? ''
            const productName = getLocalizedName(product.name, rawLocale)
            return (
              <div key={product._id} className="product-card group">
                {/* 产品图片 */}
                <div className="h-48 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-50 flex items-center justify-center relative overflow-hidden">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FlaskConical size={48} className="text-brand-200" />
                  )}
                  {product.compliance?.en?.includes('ECOCERT') && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      ECOCERT
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {/* 功效标签 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-pill">
                        {getTagLabel(tag)}
                      </span>
                    ))}
                  </div>

                  {/* 产品名 */}
                  <h3 className="font-display font-bold text-gray-900 mb-1 leading-tight">
                    {productName}
                  </h3>

                  {/* INCI 名 */}
                  <p className="text-xs text-gray-400 italic mb-2 leading-relaxed line-clamp-2">
                    {product.inci}
                  </p>

                  {/* 参数小字 */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    {product.params?.ph && <span>pH {product.params.ph.split(' ')[0]}</span>}
                    {product.moq && (
                      <>
                        <span>·</span>
                        <span>MOQ: {product.moq.split(' ')[0]}</span>
                      </>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${slug}`}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      {t('view_details')}
                      <ArrowRight size={12} />
                    </Link>
                    <Link
                      href={`/sample?product=${encodeURIComponent(product.name?.en ?? '')}`}
                      className="flex-1 text-center py-2 text-xs font-semibold bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                    >
                      {t('request_sample')}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
