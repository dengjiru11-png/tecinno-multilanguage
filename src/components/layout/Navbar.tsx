'use client'
// ============================================================
// File: src/components/layout/Navbar.tsx
// Purpose: Top navigation bar component
// Contains: Logo / Nav links / Language switcher / Mobile menu
// Maintenance:
//   - Change nav links -> edit messages/en.json nav section
//   - Change Logo text/image -> find "TecInno" section and replace
//   - Add new nav page -> add to navLinks array
// ============================================================

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link, usePathname, useRouter } from '@/lib/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import clsx from 'clsx'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  // Change navbar background on scroll
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Navigation links array - add new pages here
  // next-intl/link 会自动添加 locale 前缀，这里写裸路径即可
  const navLinks = [
    { href: '/',           label: t('home') },
    { href: '/products',  label: t('products') },
    { href: '/about',     label: t('about') },
    { href: '/sample',    label: t('sample') },
    { href: '/contact',   label: t('contact') },
  ]

  // Language switcher function
  // next-intl v3: router.push(href, options) 第二个参数是 { locale } 选项
  const switchLocale = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale })
    setIsLangOpen(false)
  }

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* ======= Logo Area ======= */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/images/logo.png" alt="TecInno Logo" width="32" height="32" className="rounded-lg object-contain" />
            <div>
              <span className="font-display font-bold text-xl text-gray-900 group-hover:text-brand-600 transition-colors">
                TecInno
              </span>
              <span className="hidden sm:block text-xs text-gray-400 leading-none">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* ======= Desktop Navigation Links ======= */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  pathname === link.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ======= Right side: Language switch + CTA button + Mobile menu ======= */}
          <div className="flex items-center gap-3">

            {/* Language switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              >
                <Globe size={15} />
                <span className="font-sans">{localeNames[locale]}</span>
                <ChevronDown size={12} className={clsx('transition-transform', isLangOpen && 'rotate-180')} />
              </button>

              {/* Language options dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden">
                  {locales.map(loc => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={clsx(
                        'w-full text-left px-4 py-2 text-sm font-sans transition-colors',
                        loc === locale
                          ? 'text-brand-600 bg-brand-50 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sample CTA button (desktop) */}
            <Link
              href="/sample"
              className="hidden sm:inline-flex btn-primary text-sm py-2"
            >
              {t('sample')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ======= Mobile menu ======= */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
