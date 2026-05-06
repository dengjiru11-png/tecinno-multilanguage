// ============================================================
// 文件：src/app/[locale]/about/page.tsx
// 用途：关于我们页面 —— 展示公司理念、角色、背景
// 维护：
//   - 【修改公司介绍文字】→ messages/*.json 的 about 部分
//   - 【新增历程/里程碑】→ 在下方 milestones 数组里加项目
// ============================================================

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Award, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  const t = useTranslations('about')
  const tWhy = useTranslations('why')

  // 【可修改】公司发展历程 —— 新增里程碑在这里加
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== Hero 区 ===== */}
        <section className="mb-20">
          <div className="brand-line mb-6" />
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle mt-4">{t('subtitle')}</p>
        </section>

        {/* ===== 核心愿景 ===== */}
        <section className="mb-16 bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-3xl p-8 lg:p-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
              <svg className="text-white" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 7H16L11 11L13 17L8 13L3 17L5 11L0 7H6L8 1Z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{t('vision_label')}</h2>
              <p className="text-gray-600 leading-relaxed italic text-lg">「{t('vision')}」</p>
            </div>
          </div>
        </section>

        {/* ===== 关于我们 ===== */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-brand-500" />
            {t('about_label')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t('about_text')}</p>
        </section>

        {/* ===== 我们的角色 ===== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-accent-500" />
            {t('role_label')}
          </h2>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
            <p className="text-gray-600 leading-relaxed text-lg">{t('role_text')}</p>
          </div>
        </section>

        {/* ===== 我们的优势（复用 why 块内容） ===== */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            {tWhy('title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(tWhy.raw('items') as any[]).map((item: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <span className="text-brand-600 font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA 区 ===== */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cta_title')}</h2>
          <p className="text-gray-500 mb-6">{t('cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sample" locale={false} className="btn-primary">
              {t('cta_sample')}
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" locale={false} className="btn-secondary">
              {t('cta_contact')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
