'use client'

// ============================================================
// 文件：src/components/layout/Footer.tsx
// 用途：网站页脚组件
//       包含：公司信息 / 快速导航 / 联系方式 / 版权声明
// 维护：
//   - 【修改版权文字】→ messages/en.json 的 footer.copyright
//   - 【修改邮箱】→ messages/en.json 的 footer.email（三个语言文件都要改）
//   - 【修改公司全称】→ messages 各语言文件的 footer.company_full
// ============================================================

import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const navLinks = [
    { href: '/',          label: tNav('home') },
    { href: '/products',  label: tNav('products') },
    { href: '/about',    label: tNav('about') },
    { href: '/sample',   label: tNav('sample') },
    { href: '/contact',  label: tNav('contact') },
  ]

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* 中国元素装饰 - 底部祥云 */}
      <div className="absolute bottom-0 left-0 w-64 h-48 opacity-5">
        <svg width="256" height="192" viewBox="0 0 256 192" fill="white">
          <ellipse cx="60" cy="140" rx="50" ry="30" opacity="0.8"/>
          <ellipse cx="100" cy="128" rx="45" ry="28" opacity="0.7"/>
          <ellipse cx="140" cy="138" rx="40" ry="25" opacity="0.6"/>
          <ellipse cx="85" cy="118" rx="32" ry="20" opacity="0.5"/>
          <ellipse cx="120" cy="112" rx="26" ry="18" opacity="0.4"/>
        </svg>
      </div>
      
      {/* 右上角传统回纹 */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <svg width="128" height="128" viewBox="0 0 128 128" fill="white">
          <pattern id="footerPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="8" y="0" width="8" height="8" rx="1"/>
            <rect x="24" y="0" width="8" height="8" rx="1"/>
            <rect x="0" y="8" width="8" height="8" rx="1"/>
            <rect x="16" y="8" width="8" height="8" rx="1"/>
            <rect x="8" y="16" width="8" height="8" rx="1"/>
            <rect x="24" y="16" width="8" height="8" rx="1"/>
            <rect x="0" y="24" width="8" height="8" rx="1"/>
            <rect x="16" y="24" width="8" height="8" rx="1"/>
          </pattern>
          <rect width="128" height="128" fill="url(#footerPattern)"/>
        </svg>
      </div>
      
      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* 列1：品牌信息 */}
          <div className="md:col-span-1">
            {/* Logo 区域 */}
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="TecInno Logo" width={32} height={32} className="rounded-lg object-contain" />
              <span className="font-display font-bold text-xl text-white">TecInno</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              {t('tagline')}
            </p>
            {/* 【可修改】公司全称 */}
            <p className="text-gray-500 text-xs">{t('company_full')}</p>
          </div>

          {/* 列2：快速导航 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              {t('nav_title')}
            </h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-brand-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 列3：联系方式 */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              {t('contact_title')}
            </h4>
            {/* 【可修改】邮箱地址 —— 同时记得改 messages/*.json 的 footer.email */}
            <a
              href={`mailto:${t('email')}`}
              className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-400 transition-colors group"
            >
              <Mail size={15} className="group-hover:text-brand-400 transition-colors" />
              {t('email')}
            </a>
          </div>
        </div>
      </div>

      {/* 版权栏 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* 【可修改】版权文字 → messages/*.json 的 footer.copyright */}
          <p className="text-gray-500 text-xs text-center">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
