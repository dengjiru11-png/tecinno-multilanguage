// ============================================================
// 文件：next.config.js
// 用途：Next.js 框架配置，启用多语言路由（/en/ /ja/ /zh/）
//       以及图片优化设置
// 维护：通常不需要修改，除非更换语言或新增域名
// ============================================================

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 重要：告诉 Next.js 不要打包这些包，避免 React context 冲突
  experimental: {
    serverComponentsExternalPackages: ['sanity', 'next-sanity'],
  },
  images: {
    // 【可修改】允许从这些外部域名加载图片
    // 若使用 Sanity CMS 存图，将来需要在此加入 cdn.sanity.io
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 暂用占位图，上线前替换
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3006',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3006',
      },
    ],
    // 允许本地图片优化
    unoptimized: false,
  },
};

module.exports = withNextIntl(nextConfig);
