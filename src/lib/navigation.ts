// ============================================================
// 文件：src/lib/navigation.ts
// 用途：next-intl v3 导航 API，自动处理 locale 前缀
// 用法：import { Link, usePathname, useRouter } from '@/lib/navigation'
// ============================================================

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
