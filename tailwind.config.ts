// ============================================================
// 文件：tailwind.config.ts
// 用途：网站设计系统配置 —— 定义品牌颜色、字体、间距等
// 维护：【重要】如果你要改网站颜色或字体，改这里！
//       brand 系列 = 主色调（绿色系，符合太新美康品牌）
//       accent 系列 = 强调色（金色，用于CTA按钮、高亮）
// ============================================================

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 【可修改】品牌主色 —— 深森林绿系
        brand: {
          50:  '#f0faf0',
          100: '#dcf5dc',
          200: '#b5eab7',
          300: '#7dd880',
          400: '#45c24a',
          500: '#22a428', // 主绿色
          600: '#178520',
          700: '#146a1b',
          800: '#135419',
          900: '#104518',
          950: '#052509',
        },
        // 【可修改】强调色 —— 暖金色，用于CTA按钮
        accent: {
          400: '#f5c842',
          500: '#e8b400',
          600: '#c49a00',
        },
        // 深色背景色（导航栏/页脚）
        dark: '#0d2010',
      },
      fontFamily: {
        // 【可修改】中英文混合字体方案
        // sans = 正文字体
        // display = 标题字体（更有设计感）
        sans: ['var(--font-body)', 'Noto Sans TC', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        // 品牌渐变（用于Hero区、按钮等）
        'brand-gradient': 'linear-gradient(135deg, #052509 0%, #146a1b 50%, #22a428 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322a428' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
