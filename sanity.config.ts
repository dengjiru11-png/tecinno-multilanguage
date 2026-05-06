// ============================================================
// 注意：实际生效的配置在 src/sanity/sanity.config.ts
// 此文件仅作兼容保留，供 Sanity CLI 工具使用
// ============================================================
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'TecInno Content Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3zj3fjcp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
