'use client'
// ============================================================
// 文件：src/app/[locale]/contact/page.tsx
// 用途：联系我们页面
//       直接显示邮箱 + EmailJS 表单（可选）
// 维护：
//   - 【修改邮箱】→ 下方 CONTACT_EMAIL 常量 + messages/*.json footer.email
//   - 【修改营业时间】→ messages/*.json 的 contact.hours
// ============================================================

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import emailjs from '@emailjs/browser'
import { Mail, Clock, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

// 【可修改】联系邮箱 —— 同时改 messages/*.json 的 footer.email
const CONTACT_EMAIL = 'fenglei.net@gmail.com'

// 【同样需要填写】EmailJS 配置（同样本页使用）
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function ContactPage() {
  const t = useTranslations('contact')

  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_company: form.company || 'Not specified',
          from_email:   form.email,
          message:      form.message,
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
    } catch (err) {
      console.error('Error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="brand-line mx-auto mb-6" />
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">

          {/* 左侧：联系信息 */}
          <div className="lg:col-span-1 space-y-8">

            {/* 邮箱 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-brand-600" />
                <h3 className="font-semibold text-gray-900">{t('email_label')}</h3>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-600 hover:text-brand-700 font-medium break-all"
              >
                {t('email')}
              </a>
            </div>

            {/* 营业时间 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-brand-600" />
                <h3 className="font-semibold text-gray-900">{t('hours_label')}</h3>
              </div>
              <p className="text-gray-600">{t('hours')}</p>
            </div>

            {/* 回覆时效 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-brand-600" />
                <h3 className="font-semibold text-gray-900">{t('response_label')}</h3>
              </div>
              <p className="text-gray-600">{t('response')}</p>
            </div>
          </div>

          {/* 右侧：表单 */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-brand-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{t('success')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t('form_title')}</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('name')}
                  </label>
                  <input
                    name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('company')}
                  </label>
                  <input
                    name="company" type="text"
                    value={form.company} onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('email_field')}
                  </label>
                  <input
                    name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('message')}
                  </label>
                  <textarea
                    name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('submit')}
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">{t('error')}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
