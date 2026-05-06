// ============================================================
// 文件：src/lib/routing.ts
// 用途：next-intl v3 路由配置，供 middleware 和 navigation 共享
// ============================================================

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-Hant', 'zh-Hans', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
