// ============================================================
// 文件：src/app/[locale]/products/page.tsx
// 用途：产品目录页（服务端组件）
//       数据从 Sanity CMS 获取，交互部分由 ProductGrid 组件负责
// ============================================================

import { useTranslations } from 'next-intl'
import { getAllProducts } from '@/sanity/queries'
import { products as localProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'

// 将本地产品数据转换为与 Sanity GROQ 查询相同的结构
// 这样 ProductGrid / 详情页可以用同一套代码处理两种数据源
function toSanityFormat(p: typeof localProducts[number]) {
  return {
    _id: p.id,
    slug: { current: p.slug },
    featured: p.featured,
    tags: p.tags,
    image: p.image,
    name: {
      en: p.name.en,
      'zh-Hans': p.name['zh-Hans'],
      'zh-Hant': p.name['zh-Hant'],
      ja: p.name.ja,
    },
    inci: p.inci,
    appearance: {
      en: p.appearance.en,
      'zh-Hans': p.appearance['zh-Hans'],
      'zh-Hant': p.appearance['zh-Hant'],
      ja: p.appearance.ja,
    },
    params: {
      ph: p.params.ph,
      keySpec: {
        label: {
          en: p.params.keySpec.label.en,
          'zh-Hans': p.params.keySpec.label['zh-Hans'],
          'zh-Hant': p.params.keySpec.label['zh-Hant'],
          ja: p.params.keySpec.label.ja,
        },
        value: p.params.keySpec.value,
      },
    },
    efficacy: {
      en: p.efficacy.en,
      'zh-Hans': p.efficacy['zh-Hans'],
      'zh-Hant': p.efficacy['zh-Hant'],
      ja: p.efficacy.ja,
    },
    efficacySummary: p.efficacySummary ? {
      en: p.efficacySummary.en,
      'zh-Hans': p.efficacySummary['zh-Hans'],
      'zh-Hant': p.efficacySummary['zh-Hant'],
      ja: p.efficacySummary.ja,
    } : null,
    dosage: {
      en: p.dosage.en,
      'zh-Hans': p.dosage['zh-Hans'],
      'zh-Hant': p.dosage['zh-Hant'],
      ja: p.dosage.ja,
    },
    compliance: {
      en: p.compliance.en,
      'zh-Hans': p.compliance['zh-Hans'],
      'zh-Hant': p.compliance['zh-Hant'],
      ja: p.compliance.ja,
    },
    moq: p.moq,
    relatedIds: p.relatedIds,
  }
}

export default async function ProductsPage() {
  // 尝试从 Sanity 获取产品数据；若失败或返回空数组，则降级使用本地数据
  let products: ReturnType<typeof toSanityFormat>[] = []
  try {
    const sanityProducts = await getAllProducts()
    if (sanityProducts && sanityProducts.length > 0) {
      products = sanityProducts
    } else {
      // Sanity 数据库为空，使用本地数据
      products = localProducts.map(toSanityFormat)
    }
  } catch (error) {
    console.warn('Sanity CMS unavailable, using local product data:', error)
    products = localProducts.map(toSanityFormat)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductsHeader />
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

// 服务端子组件：页面标题（使用 i18n）
function ProductsHeader() {
  const t = useTranslations('products')
  return (
    <div className="text-center mb-10">
      <div className="brand-line mx-auto mb-4" />
      <h1 className="section-title">{t('title')}</h1>
      <p className="section-subtitle">{t('subtitle')}</p>
    </div>
  )
}
