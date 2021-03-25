export default {
  base: '/',
  publicPath: '/public/',
  hash: true,
  history: {
    type: 'hash',
  },
  routes: [
    { exact: true, path: '/', component: 'Home' },
    { exact: true, path: '/studio', component: 'Studio' },
  ],
  antd: {
    dark: true,
    compact: true,
  },
};
