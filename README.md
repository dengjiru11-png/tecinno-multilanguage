# TecInno B2B 化妆品原料网站

专业化妆品原料代理商的跨境三语言（中/英/日）B2B官方网站。

## 📋 项目结构说明

```
tecinno-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← 根布局（加载字体、全局样式）
│   │   ├── globals.css             ← 全局 CSS 和 CSS 变量定义
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          ← 每个语言版本的布局
│   │   │   ├── page.tsx            ← 【首页】Hero + 产品 + 优势 + 评价
│   │   │   ├── products/
│   │   │   │   ├── page.tsx        ← 【产品目录页】搜索 + 筛选
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    ← 【产品详情页】完整技术参数
│   │   │   ├── sample/
│   │   │   │   └── page.tsx        ← 【索样表单】EmailJS 发送邮件
│   │   │   ├── about/
│   │   │   │   └── page.tsx        ← 【关于我们】公司理念 + 历程
│   │   │   └── contact/
│   │   │       └── page.tsx        ← 【联系我们】邮件表单
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx          ← 顶部导航栏 + 语言切换
│   │       └── Footer.tsx          ← 页脚
│   ├── lib/
│   │   ├── products.ts             ← 【最重要的维护文件】所有产品数据
│   │   └── i18n.ts                 ← 多语言配置
│   └── middleware.ts               ← 语言路由中间件
├── messages/
│   ├── en.json                     ← 英文界面文字（可直接修改）
│   ├── zh.json                     ← 中文繁体界面文字（可直接修改）
│   └── ja.json                     ← 日文界面文字（可直接修改）
├── public/
│   └── images/                     ← 图片存放目录（目前为空，有图后放这里）
├── package.json                    ← 依赖列表 + npm 脚本
├── next.config.js                  ← Next.js 框架配置
├── tailwind.config.ts              ← 【品牌颜色在这里改】Tailwind 设计系统
├── tsconfig.json                   ← TypeScript 配置
├── postcss.config.js               ← CSS 处理配置
├── .gitignore
└── README.md                       ← 这个文件
```

## 🚀 快速开始

### 第一步：本地开发环境

```bash
# 1. 装 Node.js（18+）和 npm
#    https://nodejs.org/

# 2. 将整个 tecinno-website 文件夹放到你电脑上任意位置

# 3. 打开终端，进入文件夹
cd tecinno-website

# 4. 安装依赖（第一次需要，约2分钟）
npm install

# 5. 启动本地开发服务器
npm run dev

# 6. 在浏览器打开 http://localhost:3000
```

**此时你就可以在本地看到网站的样子了！**

---

## ⚙️ 核心维护指南

### A. 【最常改的】修改产品内容 → `src/lib/products.ts`

**新增产品示例：**
```typescript
{
  id: 'mynewproduct',                    // 产品ID（英文+连字符）
  slug: 'mynewproduct-custom-name',      // URL路径用
  featured: true,                        // true = 在首页精选区显示
  tags: ['moisturizing', 'anti-aging'],  // 功效标签（用于筛选）
  name: {
    en: 'MyNewProduct™',
    zh: 'MyNewProduct™ 中文名称',
    ja: 'MyNewProduct™ 日本語名前',
  },
  inci: 'INCI Name Here',                // 国际化妆品命名
  appearance: { en: '...', zh: '...', ja: '...' },
  params: { ph: '4.0-6.5', keySpec: { label: {...}, value: '...' } },
  efficacy: { en: 'Long description...', zh: '...', ja: '...' },
  dosage: { en: '0.5-2.0%...', zh: '...', ja: '...' },
  compliance: { en: 'Compliant with...', zh: '...', ja: '...' },
  moq: '10g (sample) / 1kg (bulk)',
  relatedIds: ['productid1', 'productid2'], // 相关产品 ID
},
```

**修改现有产品：** 直接找到对应产品对象，改对应字段即可。

---

### B. 【次常改的】修改界面文字 → `messages/*.json`

三个文件对应三个语言版本：
- `messages/en.json` ← 英文
- `messages/zh.json` ← 中文繁体
- `messages/ja.json` ← 日文

**修改方式：** 直接编辑JSON文件中引号内的文字，保留引号和逗号格式。

例如改首页副标题：
```json
"hero": {
  "subtitle": "from China's Botanical Innovation"  ← 改这里
}
```

---

### C. 【如需改颜色/字体】→ `tailwind.config.ts` 和 `src/app/globals.css`

网站使用的是**绿色系 + 金色强调**的品牌配色。

**改品牌颜色：** 编辑 `tailwind.config.ts` 的 `colors.brand` 部分
```typescript
brand: {
  500: '#22a428',  // 这是主绿色，改这个值
  // ...
}
```

**改字体：** 编辑 `src/app/layout.tsx` 的 Google Fonts 导入
```typescript
const fontDisplay = Playfair_Display({...})  // 标题字体
const fontBody = DM_Sans({...})              // 正文字体
```

---

### D. 【EmailJS 配置】→ 索样和联系表单邮件发送

目前 `src/app/[locale]/sample/page.tsx` 和 `src/app/[locale]/contact/page.tsx` 使用 EmailJS 发送邮件。

**配置步骤：**

1. 注册 emailjs.com 免费账号
2. 创建 Email Service（连接你的 Gmail）
3. 创建 Email Template（设定邮件格式）
4. 在 EmailJS 后台找到：
   - Service ID
   - Template ID
   - Public Key
5. 将这三个值填入：
   ```typescript
   const EMAILJS_SERVICE_ID  = 'service_xxxx'
   const EMAILJS_TEMPLATE_ID = 'template_xxxx'
   const EMAILJS_PUBLIC_KEY  = 'public_xxxx'
   ```

**完整教程：** https://www.emailjs.com/docs/

---

## 🖼️ 图片替换说明

目前网站用的是**占位图标**（没有真实产品图片）。

**图片放置位置：**
```
public/images/
  ├── hero-bg.jpg        (首页背景，可选)
  ├── product-1.jpg      (产品1图片)
  ├── product-2.jpg      (产品2图片)
  └── ...
```

**替换方式：**
1. 准备好图片，放到 `public/images/` 文件夹
2. 在组件中引入：
   ```typescript
   import Image from 'next/image'

   <Image
     src="/images/product-1.jpg"
     alt="Product Name"
     width={400}
     height={400}
   />
   ```

---

## 🌐 部署到网络上（Vercel）

现在网站只在你电脑本地跑，别人看不到。要让别人能访问，需要部署。

### 第一步：关联 GitHub

```bash
# 1. 创建 GitHub 账号（免费）https://github.com
# 2. 在本地 tecinno-website 文件夹初始化 git
git init

# 3. 添加所有文件到 git
git add .

# 4. 提交（描述改动）
git commit -m "Initial website commit"

# 5. 在 GitHub 网页上创建一个新的 repository（选「public」）
# 6. 按照 GitHub 指示推送本地代码到远程
# （大约就是 git remote add origin ... 和 git push）
```

### 第二步：用 Vercel 部署

```bash
# 1. 注册 Vercel 账号（免费）https://vercel.com
# 2. 连接你的 GitHub 账户
# 3. Import Project → 选择你刚创建的 repository
# 4. 点击「Deploy」，等1-2分钟自动部署完成
# 5. Vercel 会给你一个网址，分享这个网址别人就能访问了
```

**此后每次你更新代码并 push 到 GitHub，Vercel 会自动重新部署。**

---

## 📝 编辑、保存、部署工作流

```
1. 在 Trae / Cursor 编辑代码
   ↓
2. 本地测试 (npm run dev)
   ↓
3. 修改后 push 到 GitHub
   git add .
   git commit -m "Update products"
   git push
   ↓
4. Vercel 自动检测并重新部署（约1分钟）
   ↓
5. 网站自动更新，全球用户看到新版本
```

---

## 🔍 常见问题

**Q: 图片一直显示不出来？**
A: 确认图片在 `public/images/` 文件夹，且路径正确（大小写敏感）

**Q: 表单提交后没收到邮件？**
A: 检查 EmailJS 的 Service ID / Template ID / Public Key 是否正确填写

**Q: 怎么改导航栏菜单？**
A: 编辑 `src/components/layout/Navbar.tsx` 的 `navLinks` 数组

**Q: 怎么新增一个页面（比如博客页）？**
A: 创建文件夹 `src/app/[locale]/blog/page.tsx`，模仿其他页面的结构

**Q: 怎么改网站的主色调？**
A: 修改 `tailwind.config.ts` 的 `colors.brand` 值

---

## 🛠️ 开发工具推荐

- **Trae 编辑器** (中文友好): https://trae.ai
- **Cursor 编辑器** (功能更全): https://cursor.com
- **GitHub Desktop** (管理代码，新手友好): https://desktop.github.com
- **VS Code** (专业开发): https://code.visualstudio.com

---

## 📞 获取帮助

- 有代码问题？ → 把报错信息和代码贴给 Claude，它会帮你修
- 不确定怎么改？ → 找对应的文件和注释说明
- 想加功能？ → 用中文描述你要的效果，告诉 Claude Code / Cursor

---

## 📦 技术栈概览

- **框架**: Next.js 14 (React)
- **样式**: Tailwind CSS + 自定义 CSS
- **多语言**: next-intl
- **邮件**: EmailJS
- **部署**: Vercel
- **数据**: JSON 文件 (可后期接 CMS)

---

**祝你的网站上线顺利！** 🚀
