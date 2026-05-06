// ============================================================
// 文件：src/lib/products.ts
// 用途：【最重要的维护文件】所有产品数据都存在这里
//       新增产品、修改产品信息、修改功效标签 = 改这个文件
// 维护步骤：
//   1. 复制已有的产品对象（从 { id: '...' 到最后一个 }）
//   2. 修改 id、name、inci、tags 等字段
//   3. 保存后网站自动更新（Vercel 自动部署）
// ============================================================

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant' | 'ja';

export interface Product {
  id: string;           // 产品唯一ID，用于URL，只用英文小写和连字符
  slug: string;         // 同上，URL路径用
  featured: boolean;    // true = 在首页精选产品区显示
  tags: string[];       // 功效标签，用于筛选，英文小写
  image: string;        // 产品图片路径，如 '/images/product.jpg'
  name: {               // 产品名称（四语言）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  inci: string;         // INCI国际化妆品命名（英文，国际通用）
  appearance: {         // 外观描述（四语言）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  params: {             // 技术参数
    ph: string;         // pH值范围
    keySpec: {          // 关键指标（如多糖含量、黄酮含量等）
      label: { en: string; 'zh-Hans': string; 'zh-Hant': string; ja: string };
      value: string;
    };
  };
  efficacy: {           // 功效详细说明（四语言，这是最重要的描述）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  efficacySummary?: {   // 功效简介（四语言，可选）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  dosage: {             // 推荐添加量及配方建议（四语言）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  compliance: {         // 合规信息（四语言）
    en: string;
    'zh-Hans': string;
    'zh-Hant': string;
    ja: string;
  };
  moq: string;          // 最小起购量，如 "10g (sample) / 1kg (bulk)"
  relatedIds: string[]; // 相关产品的ID列表，显示在详情页底部
}

// ============================================================
// 【在这里新增/编辑产品】
// 目前共有 4 个产品，全部来自太新美康产品资料文档
// ============================================================
export const products: Product[] = [
  {
    id: 'brewelixir',
    slug: 'brewelixir-baijiu-ferment',
    featured: true,
    // 【可修改】功效标签 —— 决定产品出现在哪个筛选分类下
    // 可用标签：brightening, anti-aging, soothing, barrier-repair,
    //           oil-control, antioxidant, moisturizing, anti-glycation
    tags: ['oil-control', 'soothing', 'anti-aging'],
    image: '/images/BrewElixir酒糟美肤水.png',
    name: {
      en: 'BrewElixir™',
      'zh-Hans': 'BrewElixir™ 酒糟美肤水',
      'zh-Hant': 'BrewElixir™ 酒糟美膚水',
      ja: 'BrewElixir™ 酒糟スキンエリクサー',
    },
    inci: 'Saccharomyces/Rice Ferment Filtrate, Maltodextrin',
    appearance: {
      en: 'Light yellow to yellow powder with characteristic odor',
      'zh-Hans': '浅黄色至黄色粉末，具有特征性气味',
      'zh-Hant': '淺黃色至黃色粉末，具有特徵性氣味',
      ja: '淡黄色〜黄色の粉末。特有の香りあり',
    },
    params: {
      ph: '2.5 – 4.5 (1% sol.)',
      keySpec: {
        label: { en: 'Total Polysaccharide', 'zh-Hans': '总多糖含量', 'zh-Hant': '總多糖含量', ja: '全多糖含量' },
        value: '≥ 35%',
      },
    },
    efficacy: {
      en: 'Derived from premium Guizhou Baijiu brewing by-products via Upcycling technology. Rich in bioactive small molecules (organic acids, amino acids, peptides). Clinically demonstrated to inhibit neutrophil production in zebrafish embryos (soothing) and suppress 5α-reductase gene expression by up to 32% (sebum control). Ideal for oily, acne-prone, and sensitive skin formulations.',
      'zh-Hans': '基于贵州「酱香白酒」酿造过程中的窖底水循环利用（Upcycling）技术提取。富含活性小分子（有机酸、氨基酸、肽），能显著抑制斑马鱼胚胎中的中性粒细胞产生（舒缓），并抑制5α-还原酶基因表达高达32%（控油）。适合油性、痘痘肌及敏感性肤质配方。',
      'zh-Hant': '基於貴州「醬香白酒」釀造過程中的窖底水循環利用（Upcycling）技術提取。富含活性小分子（有機酸、氨基酸、肽），能顯著抑制斑馬魚胚胎中的中性粒細胞產生（舒緩），並抑制5α-還原酶基因表達高達32%（控油）。適合油性、痘痘肌及敏感性膚質配方。',
      ja: '貴州産プレミアム白酒の釀造副産物をアップサイクル技術で抽出。有機酸・アミノ醛・ペプチドなどの生理活性小分子を豊富に含みます。ゼブラフィッシュ胚を用いた試験で好中球産生の有意な抑制（鎮静効果）と、5α-リダクターゼ遺伝子発現の最大32%抑制（皮脂コントロール）を確認。オイリー肌・ニキビ肌・敏感肌向け処方に最適です。',
    },
    dosage: {
      en: 'Recommended: 0.5–2.0%. pH range: 4.0–6.0. Use ion-resistant carbomers if thickening. Add at cool-down phase (<40°C) as active.',
      'zh-Hans': '推荐添加量：0.5~2.0%；适用pH：4.0~6.0；如使用卡波姆增稠，建议选择耐离子型；需在低温阶段（<40°C）作为活性物加入。',
      'zh-Hant': '推薦添加量：0.5~2.0%；適用pH：4.0~6.0；如使用卡波姆增稠，建議選擇耐離子型；需在高溫階段（<40°C）作為活性物加入。',
      ja: '推奨配合量：0.5〜2.0%。適切pH：4.0〜6.0。カルボマー増粘剤は耐イオン性タイプを推奨。低温工程（40°C以下）で活性物として添加してください。',
    },
    compliance: {
      en: 'Patent No. ZL 2024 1 0040777.4. Compliant with EU Cosmetics Regulation. Please contact us for full regulatory documentation.',
      'zh-Hans': '专利号：ZL 2024 1 0040777.4。符合欧盟化妆品法规要求。如需完整合规文件请联系我们。',
      'zh-Hant': '專利號：ZL 2024 1 0040777.4。符合歐盟化妝品法規要求。如需完整合規文件請聯繫我們。',
      ja: '特許番号：ZL 2024 1 0040777.4。EU化妝品規制準拠。詳細なコンプライアンス書類はお問い合わせください。',
    },
    moq: '10g (sample) / 1kg (bulk)',
    relatedIds: ['fairyveil', 'herbacycline'],
  },

  {
    id: 'cibeauty',
    slug: 'cibeauty-roxburghii-extract',
    featured: true,
    tags: ['brightening', 'anti-glycation', 'antioxidant', 'anti-aging'],
    image: '/images/CiBeauty茨肤美.jpg',
    name: {
      en: 'CiBeauty™',
      'zh-Hans': 'CiBeauty™ 茨肤美',
      'zh-Hant': 'CiBeauty™ 茨膚美',
      ja: 'CiBeauty™ ツーフーメイ',
    },
    inci: 'Rosa Roxburghii Fruit Extract, Maltodextrin',
    appearance: {
      en: 'Light yellow to yellow powder with characteristic odor',
      'zh-Hans': '浅黄色至黄色粉末，特征性气味',
      'zh-Hant': '淺黃色至黃色粉末，特徵性氣味',
      ja: '淡黄色〜黄色の粉末。特有の香りあり',
    },
    params: {
      ph: '2.5 – 4.5 (1% sol.)',
      keySpec: {
        label: { en: 'Total Flavonoids', 'zh-Hans': '总黄酮含量', 'zh-Hant': '總黃酮含量', ja: '全フラボノイド含量' },
        value: '≥ 10%',
      },
    },
    efficacy: {
      en: 'Sourced from Guizhou\'s endemic Roxburgh Rose (刺梨), the "Fruit King of Vitamin C". Contains ultra-high Vc & SOD. Inhibits tyrosinase by 97.6% (skin brightening) and reduces AGEs fluorescence by 87% (anti-glycation/anti-wrinkle). Also provides anti-blue-light and anti-inflammatory benefits. ECOCERT/COSMOS certified.',
      'zh-Hans': '源自贵州特产刺梨，被誉为「Vc之王」。含有极高的Vc与SOD。能抑制酪氨酸酶活性97.6%（提亮肤色），降低AGEs荧光87%（抗糖化/抗皱）。同时具备抗蓝光和抗炎功效。获得ECOCERT/COSMOS认证。',
      'zh-Hant': '源自貴州特產刺梨，被譽為「Vc之王」。含有極高的Vc與SOD。能抑制酪氨酸酶活性97.6%（提亮膚色），降低AGEs螢光87%（抗糖化/抗皺）。同時具備抗藍光和抗炎功效。獲得ECOCERT/COSMOS認證。',
      ja: '貴州省の固有種「刺梨（シリー）」由来、別名「<delete_file> Cの王様」。極めて高いVcとSODを含有。チロシナーゼ活性を97.6%抑制（ブライトニング）、AGEs蛍光を87%低減（抗糖化・抗シワ）。抗ブルーライト・抗炎症効果も確認。ECOCERT/COSMOS認証取得。',
    },
    dosage: {
      en: 'Recommended: 0.05–0.5%. Highly water-soluble and transparent. pH 4.0–5.0. Must use light-resistant packaging. Add at cool-down phase.',
      'zh-Hans': '推荐添加量：0.05~0.5%；高水溶性且透明；建议pH：4.0~5.0；必须使用避光包装；在冷却阶段加入。',
      'zh-Hant': '推薦添加量：0.05~0.5%；高水溶性且透明；建議pH：4.0~5.0；必須使用避光包裝；在冷卻階段加入。',
      ja: '推奨配合量：0.05〜0.5%。高水溶性で透明処方に適す。pH：4.0〜5.0推奨。遮光容器必須。冷却工程で添加。',
    },
    compliance: {
      en: 'ECOCERT / COSMOS certified. Patent No. ZL 2024 1 0011438.3. Natural origin compliant.',
      'zh-Hans': '获得ECOCERT/COSMOS认证。专利号：ZL 2024 1 0011438.3。天然来源合规。',
      'zh-Hant': '獲得ECOCERT/COSMOS認證。專利號：ZL 2024 1 0011438.3。天然來源合規。',
      ja: 'ECOCERT／COSMOS認証取得。特許番号：ZL 2024 1 0011438.3。天然由来基準準拠。',
    },
    moq: '10g (sample) / 1kg (bulk)',
    relatedIds: ['brewelixir', 'herbacycline'],
  },

  {
    id: 'fairyveil',
    slug: 'fairyveil-dictyophora-extract',
    featured: true,
    tags: ['soothing', 'barrier-repair', 'antioxidant'],
    image: '/images/FairyVeil灵莳.png',
    name: {
      en: 'FairyVeil™',
      'zh-Hans': 'FairyVeil™ 灵莳',
      'zh-Hant': 'FairyVeil™ 靈莳',
      ja: 'FairyVeil™ 霊芝ヴェール',
    },
    inci: 'Dictyophora Indusiata Extract, Maltodextrin',
    appearance: {
      en: 'Pale yellow to light brown powder with characteristic odor',
      'zh-Hans': '淡黄色至浅棕色粉末，特征性气味',
      'zh-Hant': '淡黃色至淺棕色粉末，特徵性氣味',
      ja: '淡黄色〜淡褐色の粉末。特有の香りあり',
    },
    params: {
      ph: '4.8 – 6.8 (1% sol.)',
      keySpec: {
        label: { en: 'Total Polysaccharide', 'zh-Hans': '总多糖含量', 'zh-Hant': '總多糖含量', ja: '全多糖含量' },
        value: '≥ 30%',
      },
    },
    efficacy: {
      en: 'Extracted from Dictyophora Indusiata (Bamboo Pith Mushroom) grown in Guizhou\'s misty bamboo forests. Proven to significantly promote zebrafish tail fin repair (+12%) and scavenge reactive oxygen species (ROS) by 64%. Delivers exceptional barrier repair and calming benefits, ideal for sensitive and compromised skin.',
      'zh-Hans': '提取自贵州雾深竹林中的长裙竹荪。实验证明能显著促进斑马鱼尾鳍修复（+12%），有效清除自由基（ROS -64%），具有卓越的屏障修复与舒缓镇静作用。适合敏感肌及受损肌肤配方。',
      'zh-Hant': '提取自貴州霧深竹林中的長裙竹蓀。實驗證明能顯著促進斑馬魚尾鰭修復（+12%），有效清除自由基（ROS -64%），具有卓越的屏障修復與舒緩鎮靜作用。適合敏感肌及受損肌膚配方。',
      ja: '貴州の霧深い竹林で育つキヌガサタケ（Dictyophora Indusiata）のエキス。ゼブラフィッシュ尾鰭修復試験で+12%の有意な促進効果を確認。ROS（</minimax:tool_call>を64%除去。優れたバリア機能修復と鎮静効果を発揮し、敏感肌や乾燥ダメージ肌に最適です。',
    },
    dosage: {
      en: 'Recommended: 0.23–2.0%. pH range: 5.0–7.0. Add at cool-down phase (<40°C). Pairs well with BrewElixir™ or Herbacycline™ for enhanced repair.',
      'zh-Hans': '推荐添加量：0.23~2.0%；适用pH：5.0~7.0；需在低温阶段加入；推荐搭配BrewElixir™或Herbacycline™以强化修复功效。',
      'zh-Hant': '推薦添加量：0.23~2.0%；適用pH：5.0~7.0；需在低溫階段加入；推薦搭配BrewElixir™或Herbacycline™以強化修復功效。',
      ja: '推奨配合量：0.23〜2.0%。適正pH：5.0〜7.0。低温工程（40°C以下）で添加。BrewElixir™またはHerbacycline™との併用で修復効果が増強されます。',
    },
    compliance: {
      en: 'Natural mushroom extract. Suitable for global cosmetic formulations. Contact us for regulatory support.',
      'zh-Hans': '天然菌菇提取物，适用于全球化妆品配方。如需合规支持请联系我们。',
      'zh-Hant': '天然菌菇提取物，適用於全球化妝品配方。如需合規支持請聯繫我們。',
      ja: '天然きのこエキス。グローバル化粧品処方への適用可。コンプライアンスサポートはお問い合わせください。',
    },
    moq: '10g (sample) / 1kg (bulk)',
    relatedIds: ['brewelixir', 'herbacycline'],
  },

  {
    id: 'herbacycline',
    slug: 'herbacycline-pseudostellaria-extract',
    featured: true,
    tags: ['anti-aging', 'barrier-repair', 'moisturizing'],
    image: '/images/Herbacycline太子参提取物.png',
    name: {
      en: 'Herbacycline™',
      'zh-Hans': 'Herbacycline™ 太子参提取物',
      'zh-Hant': 'Herbacycline™ 太子參提取物',
      ja: 'Herbacycline™ タイサジンキス',
    },
    inci: 'Pseudostellaria Heterophylla Extract, Maltodextrin',
    appearance: {
      en: 'Yellowish powder with characteristic odor',
      'zh-Hans': '淡黄色粉末，特征性气味',
      'zh-Hant': '淡黃色粉末，特徵性氣味',
      ja: '淡黄色の粉末。特有の香りあり',
    },
    params: {
      ph: '3.5 – 6.5 (1% sol.)',
      keySpec: {
        label: { en: 'Heterophyllin B', 'zh-Hans': '太子参环肽B', 'zh-Hant': '太子參環肽B', ja: 'タイサジン環状ペプチドB' },
        value: '≥ 800 ppm',
      },
    },
    efficacy: {
      en: 'A traditional Chinese medicine-origin ingredient (medicine-food homology). Significantly upregulates SIRT1 longevity gene expression (+72%) and enhances fibroblast viability (+149%), delivering powerful anti-aging benefits. Effectively reduces skin barrier permeability by 30%, providing superior moisture retention and protection.',
      'zh-Hans': '药食同源特色原料。通过上调SIRT1长寿基因表达（+72%）和提升成纤维细胞活力（+149%）实现抗衰老，并能显著降低皮肤屏障渗透性（-30%），提供卓越的保湿与防护效果。',
      'zh-Hant': '藥食同源特色原料。通過上調SIRT1長壽基因表達（+72%）和提升成纖維細胞活力（+149%）實現抗衰老，並能顯著降低皮膚屏障滲透性（-30%），提供卓越的保濕與防護效果。',
      ja: '薬食同源の特性を持つ原料。SIRT1長寿遺伝子の発現を72%向上させ、線維芽細胞の活性を149%増加させることで強力な-agingケア効果を発揮。皮膚バリアの透過性を30%低減し、優れた保湿とバリア保護を実現します。',
    },
    dosage: {
      en: 'Recommended: 0.1–0.5%. Suitable for emulsions and creams. Add at cool-down phase. Compatible with most cosmetic actives.',
      'zh-Hans': '推荐添加量：0.1~0.5%；适用于乳液与面霜配方；在冷却阶段加入；与大多数化妆品活性物相容。',
      'zh-Hant': '推薦添加量：0.1~0.5%；適用於乳液與面霜配方；在冷卻階段加入；與大多數化妝品活性物相容。',
      ja: '推奨配合量：0.1〜0.5%。乳液・クリーム処方に最適。冷却工程で添加。ほとんどの化粧品活性物との配合適合性良好。',
    },
    compliance: {
      en: 'Traditional Chinese herbal extract. Medicine-food homology certified origin. Contact us for documentation.',
      'zh-Hans': '传统中草药提取物，药食同源认证来源。如需文件请联系我们。',
      'zh-Hant': '傳統中草藥提取物，藥食同源認證來源。如需文件請聯繫我們。',
      ja: '伝統中医学ハーブキス。薥食同源認証由来。関連書類はお問い合わせください。',
    },
    moq: '10g (sample) / 1kg (bulk)',
    relatedIds: ['fairyveil', 'cibeauty'],
  },
];

// ============================================================
// 功效标签定义（用于产品筛选界面）
// 【可修改】新增标签：在这里加入新标签的显示名称
// ============================================================
export const tagLabels: Record<string, { en: string; 'zh-Hans': string; 'zh-Hant': string; ja: string }> = {
  'all':               { en: 'All',              'zh-Hans': '全部',         'zh-Hant': '全部',           ja: 'すべて' },
  'brightening':       { en: 'Brightening',      'zh-Hans': '提亮/美白',    'zh-Hant': '提亮/美白',      ja: 'ブライトニング' },
  'anti-aging':        { en: 'Anti-Aging',       'zh-Hans': '抗衰老',       'zh-Hant': '抗衰老',         ja: 'イズジングケア' },
  'soothing':          { en: 'Soothing',         'zh-Hans': '舒缓镇静',      'zh-Hant': '舒緩鎮靜',        ja: '鎮静' },
  'barrier-repair':    { en: 'Barrier Repair',   'zh-Hans': '屏障修复',      'zh-Hant': '屏障修復',        ja: 'バリア修復' },
  'oil-control':       { en: 'Oil Control',      'zh-Hans': '控油',          'zh-Hant': '控油',            ja: '皮脂コントロール' },
  'antioxidant':       { en: 'Antioxidant',      'zh-Hans': '抗氧化',        'zh-Hant': '抗氧化',          ja: '抗酸化' },
  'moisturizing':      { en: 'Moisturizing',     'zh-Hans': '保湿',          'zh-Hant': '保濕',            ja: '保湿' },
  'anti-glycation':    { en: 'Anti-Glycation',   'zh-Hans': '抗糖化',        'zh-Hant': '抗糖化',          ja: '抗糖化' },
  // 原料分类标签
  'bulk-base-materials': { en: 'Bulk Base Materials', 'zh-Hans': '大宗基础料', 'zh-Hant': '大宗基礎料', ja: 'バルク基材' },
  'surfactants':         { en: 'Surfactants',        'zh-Hans': '表面活性剂',  'zh-Hant': '表面活性劑',   ja: '界面活性剤' },
  'adjuvants':           { en: 'Adjuvants',         'zh-Hans': '助剂辅料',    'zh-Hant': '助劑輔料',     ja: '添加剤' },
};

// 根据ID查找产品的工具函数（代码内部使用）
export function getProductById(id: string) {
  return products.find(p => p.id === id);
}
export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}
