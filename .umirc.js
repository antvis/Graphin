const isProduction = process.env.NODE_ENV === 'production';

export default {
  title: 'Graphin',
  mode: 'site',
  base: '/',
  publicPath: '/',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  // sitemap: {
  //   hostname: 'graphin.antv.vision',
  // },
  extraBabelIncludes: ['@antv/dumi-theme-antv'],
  resolve: {
    includes: ['docs/*.md', 'docs/render/data/', 'docs/render/element/'],
  },

  metas: [
    {
      name: 'keywords',
      content: 'graphin,g6,graph,Graphin,AntV Graph',
    },
  ],

  navs: [
    null,
    {
      title: '在线分析工具 G6VP',
      path: 'https://insight.antv.antgroup.com',
    },
    // {
    //   title: 'GitHub',
    //   path: 'https://github.com/antvis/Graphin',
    // },
  ],

  analytics: isProduction ? { ga: 'UA-148148901-8' } : false,
  hash: true,
  ssr: {
    devServerRender: false,
  },
  workerLoader: {},
  webpack5: {},
  exportStatic: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    '@antv/g6': 'window.G6V5',
  },
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@s-site-menu-width': '280px',
    '@primary-color': '#873bf4',
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  links: ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css'],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
    'https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd-with-locales.js',
    /** G6 **/
    'http://127.0.0.1:9001/g6.min.js',

    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
  ],
};
