// ============================================================
// 文件：src/sanity/schemas/product.ts
// 用途：Sanity CMS 产品数据完整模型
//       字段与 src/lib/products.ts 的 Product interface 对齐
// ============================================================

import { defineType, defineField } from 'sanity'

// ── 多语言文本框辅助函数 ──────────────────────────
function defineI18nField(fieldName: string, fieldTitle: string, options?: { required?: boolean }) {
  return defineField({
    name: fieldName,
    title: fieldTitle,
    type: 'object',
    fields: [
      defineField({ name: 'en',      title: 'English',      type: 'text', rows: 3 }),
      defineField({ name: 'zh_Hans', title: '简体中文',     type: 'text', rows: 3 }),
      defineField({ name: 'zh_Hant', title: '繁體中文',     type: 'text', rows: 3 }),
      defineField({ name: 'ja',      title: '日本語',        type: 'text', rows: 3 }),
    ],
    validation: options?.required
      ? (Rule) => Rule.required()
      : undefined,
  })
}

export const productSchema = defineType({
  name: 'product',
  title: '产品 / Products',
  type: 'document',
  fields: [
    // ── 基础信息 ──────────────────────────────────
    defineField({
      name: 'name',
      title: '产品名称 / Product Name（四语言）',
      type: 'object',
      fields: [
        defineField({ name: 'en',      title: 'English *',     type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'zh_Hans', title: '简体中文 *',    type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'zh_Hant', title: '繁體中文 *',    type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ja',      title: '日本語 *',      type: 'string', validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL 别名 / Slug *',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: '首页精选 / Featured on Homepage',
      type: 'boolean',
      description: '设为 true 则在首页精选产品区显示',
      initialValue: false,
    }),

    defineField({
      name: 'image',
      title: '产品图片 / Product Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── 分类与标签 ──────────────────────────────────
    defineField({
      name: 'category',
      title: '分类 / Category',
      type: 'string',
      options: {
        list: [
          { title: '化妆品原料 / Cosmetic Ingredient', value: 'cosmetic' },
          { title: '功效研究 / Efficacy Research',     value: 'research' },
          { title: '提取物 / Extract',                value: 'extract' },
        ],
      },
    }),

    defineField({
      name: 'materialTags',
      title: '原料类型标签 / Material Type Tags',
      description: '用于前端筛选：大宗基础料、表面活性剂、助剂辅料',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '大宗基础料 / Bulk Basic Materials',    value: 'bulk-basic' },
          { title: '表面活性剂 / Surfactants',             value: 'surfactant' },
          { title: '助剂辅料 / Auxiliary Agents',          value: 'auxiliary' },
        ],
        layout: 'grid',
      },
    }),

    defineField({
      name: 'tags',
      title: '功效标签 / Efficacy Tags',
      description: '与前端筛选对应：brightening, anti-aging, soothing, barrier-repair, oil-control, antioxidant, moisturizing, anti-glycation',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Brightening 提亮/美白',      value: 'brightening' },
          { title: 'Anti-Aging 抗衰老',           value: 'anti-aging' },
          { title: 'Soothing 舒缓镇静',           value: 'soothing' },
          { title: 'Barrier Repair 屏障修复',      value: 'barrier-repair' },
          { title: 'Oil Control 控油',             value: 'oil-control' },
          { title: 'Antioxidant 抗氧化',           value: 'antioxidant' },
          { title: 'Moisturizing 保湿',            value: 'moisturizing' },
          { title: 'Anti-Glycation 抗糖化',        value: 'anti-glycation' },
        ],
        layout: 'grid',
      },
    }),

    // ── 产品基本属性 ──────────────────────────────────
    defineField({
      name: 'inci',
      title: 'INCI 名称 / INCI Name *',
      description: '如：Saccharomyces/Rice Ferment Filtrate, Maltodextrin',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'appearance',
      title: '外观描述 / Appearance（四语言）',
      type: 'object',
      fields: [
        defineField({ name: 'en',      title: 'English',     type: 'string' }),
        defineField({ name: 'zh_Hans', title: '简体中文',    type: 'string' }),
        defineField({ name: 'zh_Hant', title: '繁體中文',    type: 'string' }),
        defineField({ name: 'ja',      title: '日本語',       type: 'string' }),
      ],
    }),

    defineField({
      name: 'moq',
      title: '最小起订量 / MOQ',
      description: '如：10g (sample) / 1kg (bulk)',
      type: 'string',
    }),

    // ── 技术参数 ──────────────────────────────────
    defineField({
      name: 'params',
      title: '技术参数 / Technical Parameters',
      type: 'object',
      fields: [
        defineField({
          name: 'ph',
          title: 'pH 范围 / pH Range',
          description: '如：2.5 – 4.5 (1% sol.)',
          type: 'string',
        }),
        defineField({
          name: 'keySpecLabel',
          title: '关键指标标签 / Key Spec Label（四语言）',
          type: 'object',
          fields: [
            defineField({ name: 'en',      title: 'English',     type: 'string' }),
            defineField({ name: 'zh_Hans', title: '简体中文',    type: 'string' }),
            defineField({ name: 'zh_Hant', title: '繁體中文',    type: 'string' }),
            defineField({ name: 'ja',      title: '日本語',       type: 'string' }),
          ],
        }),
        defineField({
          name: 'keySpecValue',
          title: '关键指标数值 / Key Spec Value',
          description: '如：≥ 35%',
          type: 'string',
        }),
      ],
    }),

    // ── 功效说明 ──────────────────────────────────
    defineI18nField('efficacy', '功效详细说明 / Efficacy Description（四语言）', { required: true }),
    defineI18nField('efficacySummary', '功效简介 / Efficacy Summary（四语言，可选）'),

    // ── 配方建议 ──────────────────────────────────
    defineI18nField('dosage', '配方建议 / Dosage & Formulation Notes（四语言）'),

    // ── 合规信息 ──────────────────────────────────
    defineI18nField('compliance', '合规信息 / Compliance（四语言）'),

    // ── 相关产品（引用） ────────────────────────────
    defineField({
      name: 'relatedProducts',
      title: '相关产品 / Related Products',
      description: '选择与本产品相关的其他产品（最多4个）',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── 其他元数据 ──────────────────────────────────
    defineField({
      name: 'description',
      title: '详细描述 / Description（Rich Text）',
      description: '用于未来扩展，当前详情页未使用此字段',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'researcher',
      title: '研究者 / Researcher',
      type: 'string',
    }),

    defineField({
      name: 'source',
      title: '来源 / Source',
      type: 'string',
    }),

    defineField({
      name: 'publishedAt',
      title: '发布日期 / Publish Date',
      type: 'date',
    }),
  ],

  // 在 Studio 列表视图中显示的列
  preview: {
    select: {
      zhHans: 'name.zh_Hans',
      en: 'name.en',
      slug: 'slug.current',
      media: 'image',
    },
    prepare({ zhHans, en, slug, media }) {
      return {
        title: zhHans || en || slug || '未命名产品',
        subtitle: en ? `EN: ${en}` : slug,
        media,
      }
    },
  },
})
