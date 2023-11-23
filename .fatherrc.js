export default {
  // esm: { type: 'rollup', file: 'index', importLibToEs: true },
  // lessInRollupMode: {},
  // extractCSS: true,
  entry: './src/index.ts',
  esm: 'babel',
  cjs: 'babel',
  lessInBabelMode: true,
};
