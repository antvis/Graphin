import { join } from 'path';
const isProduction = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
export default {
  title: 'graphin docs',
  mode: 'site',
  resolve: {
    includes: [
      /** Graphin Core */
      'packages/graphin/docs/',
      /** Graphin Components */
      'packages/graphin-components/src/',
    ],
  },
  alias: {
    '@antv/graphin': join(__dirname, 'packages', 'graphin'),
    '@antv/graphin-components': join(__dirname, 'packages', 'graphin-components'),
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
  links: process.env.NODE_ENV === 'development' ? ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css'] : [],
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
          'https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd-with-locales.js',
        ]
      : [],
};
