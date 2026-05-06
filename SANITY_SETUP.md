# Sanity 配置指南

## ✅ 已完成的配置

### 1. Sanity Studio 配置
- ✅ `sanity.config.ts` - Sanity Studio 主配置文件
- ✅ `src/app/studio/layout.tsx` - Studio 布局
- ✅ `src/app/studio/[[...tool]]/page.tsx` - Studio 页面
- ✅ `src/middleware.ts` - 更新以排除 /studio 路由

### 2. 数据获取配置
- ✅ `src/sanity/client.ts` - Sanity 客户端
- ✅ `src/sanity/schemas/index.ts` - Schema 导出

## 📋 接下来需要做的事情

### 1. 确保环境变量已配置

在你的 `.env.local` 文件中确保有以下配置：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 2. 启动 Sanity Studio

运行开发服务器：

```bash
npm run dev
```

然后访问 **http://localhost:3006/studio** 即可进入 Sanity 管理后台。

### 3. 创建你的第一个 Schema

编辑 `src/sanity/schemas/index.ts`，添加你的内容类型：

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { product } from './product'

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  product,
]
```

然后创建对应的 schema 文件，例如 `src/sanity/schemas/post.ts`。

### 4. 在组件中使用 Sanity 数据

```typescript
import { client } from '@/sanity/client'

export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "imageUrl": image.asset->url
    }
  `)
}
```

## 🎯 下一步建议

1. **添加内容类型**：在 `src/sanity/schemas/` 中创建 Post、Product 等 schema
2. **连接前端数据**：在页面组件中获取并展示 Sanity 数据
3. **配置图片处理**：使用 `@sanity/image-url` 处理图片

## 📚 参考资源

- [Sanity 官方文档](https://www.sanity.io/docs)
- [next-sanity 文档](https://next-sanity.dev/)
- [GROQ 查询语言](https://www.sanity.io/docs/groq)
