import { join } from 'path';
const isProduction = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
export default {
  title: 'graphin docs',
  mode: 'site',
  resolve: {
    includes: [
      'packages/graphin/docs/',
      'packages/graphin-components/src/',

      /** local develop */
      // 'packages/graphin/docs/geamaker/',
    ],
  },
  alias: {
    '@antv/graphin': join(__dirname, 'packages', 'graphin'),
    '@antv/graphin-components': join(__dirname, 'packages', 'graphin-components'),
    '@antv/graphin-icons': join(__dirname, 'packages', 'graphin-icons'),
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
      content: 'graphin,g6,graph',
    },
  ],

  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com',
    },
  ],
  analytics: isProduction ? { ga: '' } : false,
  hash: true,
  ssr: {
    devServerRender: false,
  },
  exportStatic: {},
  externals:
    process.env.NODE_ENV === 'development'
      ? {
          react: 'window.React',
          'react-dom': 'window.ReactDOM',
          antd: 'window.antd',
          '@antv/g6': 'window.G6',
        }
      : {},
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
  links: process.env.NODE_ENV === 'development' ? ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css'] : [],
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
          'https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd-with-locales.js',
          /** G6 **/
          'https://gw.alipayobjects.com/os/lib/antv/g6/4.0.3/dist/g6.min.js',
          'https://gw.alipayobjects.com/os/lib/antv/g6/4.0.3/dist/g6Layout.worker.js',
          'https://gw.alipayobjects.com/os/lib/antv/g6/4.0.3/dist/g6Layout.worker.js.map',
          'https://gw.alipayobjects.com/os/lib/antv/g6/4.0.3/dist/g6.min.js.map',
          /** lodash */
          'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
        ]
      : [],
};
