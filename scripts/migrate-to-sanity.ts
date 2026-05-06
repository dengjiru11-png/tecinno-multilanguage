// ============================================================
// 脚本：scripts/migrate-to-sanity.ts
// 用途：将 src/lib/products.ts 的本地产品数据完整迁移到 Sanity CMS
//
// 使用方法：
//   cd tecinno-website
//   npx tsx scripts/migrate-to-sanity.ts
//
// 前提：.env.local 中需要有 NEXT_PUBLIC_SANITY_PROJECT_ID
//       和 SANITY_API_WRITE_TOKEN（带写权限的 Token）
//       如只有 SANITY_API_READ_TOKEN，可将其改为写权限 Token
// ============================================================

import { createClient } from '@sanity/client'
import { products } from '../src/lib/products'
import * as fs from 'fs'
import * as path from 'path'

// 手动加载 .env.local（Next.js 自动加载，node 脚本需要手动处理）
function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) return
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx < 0) continue
    const key = trimmed.slice(0, idx).trim()
    const value = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zj3fjcp'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.error('❌ 缺少 Token！请在 .env.local 中设置 SANITY_API_WRITE_TOKEN')
  console.error('   或者将现有的 SANITY_API_READ_TOKEN 改为带写权限的 Token')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// 将本地产品数据转换为 Sanity 文档格式
function toSanityDoc(p: typeof products[number]) {
  return {
    _type: 'product',
    _id: `product-${p.id}`,
    name: {
      en: p.name.en,
      zh_Hans: p.name['zh-Hans'],
      zh_Hant: p.name['zh-Hant'],
      ja: p.name.ja,
    },
    slug: { _type: 'slug', current: p.slug },
    featured: p.featured,
    category: 'cosmetic',
    tags: p.tags,
    // image 字段暂不迁移（需要在 Sanity Studio 上传）
    // 本地图片路径 /images/xxx.png 不会写入 Sanity
    inci: p.inci,
    appearance: {
      en: p.appearance.en,
      zh_Hans: p.appearance['zh-Hans'],
      zh_Hant: p.appearance['zh-Hant'],
      ja: p.appearance.ja,
    },
    params: {
      ph: p.params.ph,
      keySpecLabel: {
        en: p.params.keySpec.label.en,
        zh_Hans: p.params.keySpec.label['zh-Hans'],
        zh_Hant: p.params.keySpec.label['zh-Hant'],
        ja: p.params.keySpec.label.ja,
      },
      keySpecValue: p.params.keySpec.value,
    },
    efficacy: {
      en: p.efficacy.en,
      zh_Hans: p.efficacy['zh-Hans'],
      zh_Hant: p.efficacy['zh-Hant'],
      ja: p.efficacy.ja,
    },
    efficacySummary: p.efficacySummary
      ? {
          en: p.efficacySummary.en,
          zh_Hans: p.efficacySummary['zh-Hans'],
          zh_Hant: p.efficacySummary['zh-Hant'],
          ja: p.efficacySummary.ja,
        }
      : undefined,
    dosage: {
      en: p.dosage.en,
      zh_Hans: p.dosage['zh-Hans'],
      zh_Hant: p.dosage['zh-Hant'],
      ja: p.dosage.ja,
    },
    compliance: {
      en: p.compliance.en,
      zh_Hans: p.compliance['zh-Hans'],
      zh_Hant: p.compliance['zh-Hant'],
      ja: p.compliance.ja,
    },
    moq: p.moq,
  }
}

async function migrate() {
  console.log('🚀 开始迁移产品数据到 Sanity...\n')
  console.log(`项目 ID: ${projectId}`)
  console.log(`数据集: ${dataset}\n`)

  let successCount = 0
  let failCount = 0

  for (const product of products) {
    const doc = toSanityDoc(product)

    // 先尝试删除已存在的文档（用 upsert 替代）
    try {
      await client.delete(`product-${product.id}`)
    } catch {
      // 忽略删除错误（文档可能不存在）
    }

    // 创建或更新文档
    const result = await client.createOrReplace(doc).catch(async (err) => {
      // 如果 createOrReplace 失败，尝试 create
      console.warn(`⚠️ createOrReplace 失败，尝试 create: ${err.message}`)
      return client.create(doc)
    })

    console.log(`✅ 已写入: ${product.name.en} (${product.slug})`)
    console.log(`   ID: ${result._id}\n`)
    successCount++
  }

  console.log('─────────────────────────────')
  console.log(`🎉 迁移完成！成功: ${successCount}，失败: ${failCount}`)
  console.log('\n请到 Sanity Studio 补充：')
  console.log('  1. 每个产品的图片（需要上传到 Sanity）')
  console.log('  2. 验证 relatedProducts 关联是否正确')
  console.log('  3. 确认 featured = true 的产品在首页显示\n')
}

migrate().catch(console.error)
