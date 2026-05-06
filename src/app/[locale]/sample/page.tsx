'use client'
// ============================================================
// 文件：src/app/[locale]/sample/page.tsx
// 用途：索样申请页 —— 核心转化页面
//       买家填写表单 → EmailJS 发送邮件到 fenglei.net@gmail.com
// 维护：
//   - 【修改表单字段文字】→ messages/*.json 的 sample 部分
//   - 【修改收件邮箱】→ EmailJS 后台的 Template 设置（不在代码里改）
//   - 【修改 EmailJS 密钥】→ 下方 EMAILJS_* 常量
//
// ⚠️ 重要：使用前需要：
//   1. 注册 emailjs.com 免费账号
//   2. 创建 Email Service（绑定你的 Gmail）
//   3. 创建 Email Template
//   4. 将 SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY 填入下方
// ============================================================

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { CheckCircle, Send, AlertCircle } from 'lucide-react'
import { products } from '@/lib/products'

// ============================================================
// 【必须填写】EmailJS 配置参数
// 注册 emailjs.com 后，在后台找到这三个值
// ============================================================
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // → EmailJS 后台 Email Services 页面
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // → EmailJS 后台 Email Templates 页面
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // → EmailJS 后台 Account → General 页面

// 国家列表（可自行增减）
const COUNTRIES = [
  'China', 'Japan', 'United States', 'United Kingdom', 'France', 'Germany',
  'South Korea', 'Australia', 'Canada', 'Singapore', 'Thailand',
  'Indonesia', 'Malaysia', 'Vietnam', 'India', 'Brazil',
  'China (Hong Kong)', 'China (Taiwan)', 'Other',
]

export default function SampleRequestPage() {
  const t = useTranslations('sample')
  const locale = useLocale()
  const searchParams = useSearchParams()

  // 表单状态
  const [form, setForm] = useState({
    company:  '',
    contact:  '',
    email:    '',
    country:  '',
    product:  '',  // 从产品页跳转时自动预填
    quantity: '',
    purpose:  '',
    message:  '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // 从 URL 参数预填产品名（从产品详情页点击索样按钮跳转过来时）
  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      setForm(prev => ({ ...prev, product: decodeURIComponent(productParam) }))
    }
  }, [searchParams])

  // 表单字段更新
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // 表单提交 —— 使用 EmailJS 发送邮件
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // EmailJS 发送参数
      // 这些变量名需要和你在 EmailJS Template 里设置的变量名一致
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_company:  form.company,
          from_contact:  form.contact,
          from_email:    form.email,
          from_country:  form.country,
          product_name:  form.product,
          sample_qty:    form.quantity || 'Not specified',
          use_purpose:   form.purpose  || 'Not specified',
          message:       form.message  || 'No additional notes',
          reply_to:      form.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  // 提交成功画面
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-brand-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
            {t('success_title')}
          </h2>
          <p className="text-gray-500 leading-relaxed">{t('success_msg')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 页面标题 */}
        <div className="text-center mb-10">
          <div className="brand-line mx-auto mb-4" />
          <h1 className="section-title">{t('title')}</h1>
          <p className="text-gray-500 mt-3">{t('subtitle')}</p>
        </div>

        {/* 索样表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5">

          {/* 公司名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('company')}
            </label>
            <input
              name="company" type="text" required
              value={form.company} onChange={handleChange}
              className="form-input"
              placeholder="e.g. Beauty Brand Co., Ltd."
            />
          </div>

          {/* 联系人姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('contact')}
            </label>
            <input
              name="contact" type="text" required
              value={form.contact} onChange={handleChange}
              className="form-input"
              placeholder="e.g. Sarah Chen"
            />
          </div>

          {/* 邮箱（必须，这是回复渠道） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('email')}
            </label>
            <input
              name="email" type="email" required
              value={form.email} onChange={handleChange}
              className="form-input"
              placeholder="your@company.com"
            />
          </div>

          {/* 国家 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('country')}
            </label>
            <select
              name="country" required
              value={form.country} onChange={handleChange}
              className="form-input"
            >
              <option value="">— Select —</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 产品选择 —— 从产品页跳转时自动预填 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('product')}
            </label>
            <select
              name="product" required
              value={form.product} onChange={handleChange}
              className="form-input"
            >
              <option value="">— Select Product —</option>
              {/* 产品列表自动从 products.ts 读取，新增产品会自动出现在这里 */}
              {products.map(p => (
                <option key={p.id} value={p.name.en}>{p.name.en} ({p.name.zh})</option>
              ))}
              <option value="Multiple / Not sure">Multiple / Not sure</option>
            </select>
          </div>

          {/* 样品数量（选填） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('quantity')} <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              name="quantity" type="text"
              value={form.quantity} onChange={handleChange}
              className="form-input"
              placeholder="e.g. 50g, 100g"
            />
          </div>

          {/* 用途（选填） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('purpose')} <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <select
              name="purpose"
              value={form.purpose} onChange={handleChange}
              className="form-input"
            >
              <option value="">— Select —</option>
              {(t.raw('purpose_options') as string[]).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* 备注（选填） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('message')} <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="message" rows={4}
              value={form.message} onChange={handleChange}
              className="form-input resize-none"
              placeholder="Any additional requirements or questions..."
            />
          </div>

          {/* 错误提示 */}
          {status === 'error' && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              {t('error_msg')}
            </div>
          )}

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                {t('submitting')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={16} />
                {t('submit')}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
