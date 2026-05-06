// ============================================================
// 文件：src/sanity/schemas/index.ts
// 用途：导出所有 Sanity 数据模型（Schema）
// 维护：添加新的内容类型时，在这里注册
// ============================================================

import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './product'

export const schemaTypes: SchemaTypeDefinition[] = [
  productSchema,
]
