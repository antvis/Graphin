import { defineConfig } from 'dumi';
import { repository, version } from '../packages/graphin/package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  title: 'Graphin', // 网站header标题
  favicons: ['https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'], // 网站 favicon
  metas: [
    // 自定义 meta 标签
    {
      name: 'keywords',
      content: 'graphin,g6,graph,Graphin,AntV Graph',
    },
  ],
  themeConfig: {
    title: 'Graphin',
    description: 'The Grammar of Visualization in JavaScript',
    defaultLanguage: 'zh', // 默认语言
    isAntVSite: false, // 是否是 AntV 的大官网
    footerTheme: 'light', // 白色 底部主题
    siteUrl: 'https://antv.antgroup.com/', // 官网首页地址
    githubUrl: repository.url, // GitHub 地址
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: process.env.NODE_ENV === 'production', // 是否在 demo 页展示API文档
    es5: false, // 案例代码是否编译到 es5
    versions: {
      // 历史版本以及切换下拉菜单
      [version]: 'https://graphin.antv.antgroup.com/',
      '1.x': 'https://graphin-v1.antv.antgroup.com/',
    },
    docsearchOptions: {
      apiKey: '200ec461f4aa0bb4f0e761566f1a1336',
      indexName: 'antv_graphin',
    },
    navs: [
      // 头部的菜单列表
      {
        slug: 'docs/manual',
        title: {
          zh: '教程',
          en: 'Manual',
        },
      },
      {
        slug: 'docs/api/overview',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
      {
        name: {
          zh: 'ant-design-charts',
          en: 'ant-design-charts',
        },
        url: 'https://github.com/ant-design/ant-design-charts',
      },
    ],
    docs: [
      // manual
    ],
    examples: [
      {
        slug: 'general',
        title: {
          zh: '通用',
          en: 'General',
        },
        icon: 'other',
      },
    ],
    playground: {
      devDependencies: {
        typescript: 'latest',
      },
    },
    announcement: {
      zh: '',
      en: '',
    },
    /** 首页技术栈介绍 */
    detail: {
      engine: {
        zh: 'Graphin',
        en: 'Graphin',
      },
      title: {
        zh: 'Graphin·图的分析洞察',
        en: 'Graphin·Graph Insight',
      },
      description: {
        zh: 'Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 G6 封装的 React 组件库，专注在关系可视分析领域，简单高效，开箱即用。',
        en: `Graphin stands for Graph Insight. It's a React toolkit based on G6, focuses on relational visual analysis. It's simple, efficient, out of the box.`,
      },
      image: 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*Gix7Rry3-5wAAAAAAAAAAABkARQnAQ',
      imageStyle: {
        marginLeft: '80px',
        marginTop: '30px',
        transform: 'scale(1.4)',
      },
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/manual/getting-started`,
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples/`,
          type: 'primary',
        },
      ],
    },
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    /** 首页特性介绍 */
    features: [
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*4x_KTKyqwJgAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '千变万化，自由组合',
          en: 'The ever-changing, free combination',
        },
        description: {
          zh: '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意',
          en: 'Any chart can be drawn flexibly based on graphic syntax to satisfy your unlimited creativity',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ELYbTIVCgPoAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '专业完备',
          en: 'Professional complete',
        },
        description: {
          zh: '大量产品实践之上，提供绘图引擎、完备图形语法、专业设计规范',
          en: 'On top of a large number of product practices, it provides a drawing engine, a complete graphics grammar, and professional design rules',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_riSQZrgczgAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '生动，可交互',
          en: 'Vivid, interactive',
        },
        description: {
          zh: '强大的交互语法，助力可视分析，让图表栩栩如生',
          en: 'owerful interactive syntax to help visual analysis and make charts come alive',
        },
      },
    ],
    /** 首页案例 */
    cases: [
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '精品 Gallery',
          en: 'Boutique Gallery',
        },
        description: {
          zh: '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。',
          en: 'Real data visualization cases, we summarize them into story-based design templates, allowing users to achieve out-of-the-box effects.',
        },
        link: `/examples`,
        image: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*hDrgRb7ma4EAAAAAAAAAAABkARQnAQ',
      },
    ],
    /** 首页合作公司 */
    companies: [
      {
        name: '阿里云',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '支付宝',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ',
      },
      {
        name: '天猫',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '淘宝网',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '网上银行',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '京东',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ',
      },
      {
        name: 'yunos',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '菜鸟',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ',
      },
    ],
  },
  mfsu: false,
  analytics: {
    // google analytics 的 key (GA 4)
    // ga_v2: 'G-abcdefg',
    // 若你在使用 GA v1 旧版本，请使用 `ga` 来配置
    ga_v2: 'G-3L8SSDC4X6',
    // 百度统计的 key
    // baidu: 'baidu_tongji_key',
  },
  links: [],
  scripts: [],
  styles: ['https://fonts.googleapis.com/css?family=Gaegu'],
});
