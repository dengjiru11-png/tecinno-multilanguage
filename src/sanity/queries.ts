// ============================================================
// 文件：src/sanity/queries.ts
// 用途：所有从 Sanity CMS 获取数据的 GROQ 查询函数
//       在服务端组件（Server Components）中调用
//
// 【重要】Sanity schema 字段名使用 zh_Hans / zh_Hant（下划线）
//         前端 Product interface 使用 zh-Hans / zh-Hant（连字符）
//         本文件中的 GROQ 查询通过投影（projection）直接映射为前端格式
// ============================================================

import { client } from './client'

// Sanity CDN 图片 URL 构建器（绕过 @sanity/image-url v1.x 和 @sanity/client v6 的兼容性问题）
// asset._ref 格式：image-{hash}-{width}x{height}-{ext}，直接拼 CDN URL
export function urlFor(img: any, opts?: { width?: number; height?: number }): string | null {
  if (!img?.asset?._ref) return null
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zj3fjcp'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${img.asset._ref}`
  const params = new URLSearchParams()
  if (opts?.width) params.set('w', String(opts.width))
  if (opts?.height) params.set('h', String(opts.height))
  if (opts?.width || opts?.height) {
    params.set('fit', 'crop')
    params.set('auto', 'format')
  }
  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

// ── 字段映射投影片段 ───────────────────────────────────────
// Sanity 存储的多语言字段用下划线（zh_Hans），前端用连字符（zh-Hans）
// 在 GROQ 中统一映射为前端格式

const I18N_PROJECTION = `
  "en": @.en,
  "zh-Hans": @.zh_Hans,
  "zh-Hant": @.zh_Hant,
  "ja": @.ja
`

const PARAMS_PROJECTION = `
  "ph": @.ph,
  "keySpec": {
    "label": { ${I18N_PROJECTION.replaceAll('@.', '@.keySpecLabel.')} },
    "value": @.keySpecValue
  }
`

// ── 产品查询 ──────────────────────────────────────────────

/** 产品列表查询（用于产品目录页）*/
const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt asc) {
  _id,
  "slug": slug.current,
  featured,
  tags,
  image,
  "name": { ${I18N_PROJECTION.replaceAll('@.', '@.name.')} },
  inci,
  "appearance": { ${I18N_PROJECTION.replaceAll('@.', '@.appearance.')} },
  "params": { ${PARAMS_PROJECTION} },
  moq,
  "efficacySummary": { ${I18N_PROJECTION.replaceAll('@.', '@.efficacySummary.')} },
  "efficacy": { ${I18N_PROJECTION.replaceAll('@.', '@.efficacy.')} },
  "compliance": { ${I18N_PROJECTION.replaceAll('@.', '@.compliance.')} },
  "relatedIds": relatedProducts[]->slug.current
}`

/** 精选产品查询（用于首页） */
const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] | order(_createdAt asc) [0...4] {
  _id,
  "slug": slug.current,
  featured,
  tags,
  image,
  "name": { ${I18N_PROJECTION.replaceAll('@.', '@.name.')} },
  inci,
  "params": { ${PARAMS_PROJECTION} },
  moq,
  "compliance": { ${I18N_PROJECTION.replaceAll('@.', '@.compliance.')} },
  "efficacySummary": { ${I18N_PROJECTION.replaceAll('@.', '@.efficacySummary.')} }
}`

/** 单个产品查询（用于产品详情页） */
const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  featured,
  tags,
  image,
  "name": { ${I18N_PROJECTION.replaceAll('@.', '@.name.')} },
  inci,
  "appearance": { ${I18N_PROJECTION.replaceAll('@.', '@.appearance.')} },
  "params": { ${PARAMS_PROJECTION} },
  moq,
  "efficacy": { ${I18N_PROJECTION.replaceAll('@.', '@.efficacy.')} },
  "efficacySummary": { ${I18N_PROJECTION.replaceAll('@.', '@.efficacySummary.')} },
  "dosage": { ${I18N_PROJECTION.replaceAll('@.', '@.dosage.')} },
  "compliance": { ${I18N_PROJECTION.replaceAll('@.', '@.compliance.')} },
  "relatedProducts": relatedProducts[]-> {
    _id,
    "slug": slug.current,
    "name": { ${I18N_PROJECTION.replaceAll('@.', '@.name.')} },
    image,
    tags,
    inci
  }
}`

// ── 查询函数 ──────────────────────────────────────────────

/** 获取所有产品 */
export async function getAllProducts() {
  return client.fetch(PRODUCTS_QUERY)
}

/** 获取首页精选产品（最多4个） */
export async function getFeaturedProductsFromSanity() {
  return client.fetch(FEATURED_PRODUCTS_QUERY)
}

/** 根据 slug 获取单个产品详情 */
export async function getProductBySlug(slug: string) {
  return client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
}

/** 获取所有产品的 slug（用于 generateStaticParams） */
export async function getAllProductSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "product"]{ "slug": slug.current }`
  )
  return results.map((r) => r.slug).filter(Boolean)
}
