// ============================================================
// 文件：src/lib/i18n.ts
// 用途：多语言核心配置（getRequestConfig）+ 语言显示名称
// 维护：【如需新增语言】修改 src/lib/routing.ts 的 locales 数组
// ============================================================

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// 从 routing.ts 共享 locale 定义，避免重复
export const locales = routing.locales;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = routing.defaultLocale;

// 语言显示名称（用于导航栏语言切换按钮）
export const localeNames: Record<Locale, string> = {
  en: 'English',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  ja: '日本語',
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
