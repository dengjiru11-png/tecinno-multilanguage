// ============================================================
// 文件：src/sanity/sanity.config.ts
// 用途：Sanity Studio 配置（嵌入 Next.js /studio 路由）
// ============================================================

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zj3fjcp'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: '太新美康 · TecInno 内容工作室',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
