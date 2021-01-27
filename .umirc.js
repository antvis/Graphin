import { join } from 'path';
const isProduction = process.env.NODE_ENV === 'production';

export default {
  title: 'Graphin 2.X',
  mode: 'site',
  base: '/graphin-docs/',
  publicPath: '/graphin-docs/',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  resolve: {
    includes: [
      'packages/graphin/docs/',
      'packages/graphin-components/src/',
      'packages/graphin-icons/src',

      // 'packages/graphin-graphscope/docs/',
      /** local develop */
      // 'packages/graphin/docs/geamaker/',
    ],
  },
  alias: {
    '@antv/graphin': join(__dirname, 'packages', 'graphin'),
    '@antv/graphin-components': join(__dirname, 'packages', 'graphin-components'),
    '@antv/graphin-icons': join(__dirname, 'packages', 'graphin-icons'),
    '@antv/graphin-graphscope': join(__dirname, 'packages', 'graphin-graphscope'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  metas: [
    {
      name: 'keywords',
      content: 'graphin,g6,graph,Graphin,AntV Graph',
    },
  ],

  navs: [
    null,
    {
      title: 'v1.x',
      path: 'https://antv.vision/graphin-1.x-site/',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/Graphin',
    },
  ],

  analytics: isProduction ? { ga: 'UA-148148901-8' } : false,
  hash: true,
  ssr: {
    devServerRender: false,
  },
  exportStatic: {},
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    '@antv/g6': 'window.G6',
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
    'https://gw.alipayobjects.com/os/lib/antv/g6/4.1.1/dist/g6.min.js',
    'https://gw.alipayobjects.com/os/lib/antv/g6/4.1.1/dist/g6.min.js.map',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
  ],
};
