import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['src/index.ts'],
    },
    tsconfigPath: 'tsconfig.build.json',
  },
  plugins: [pluginReact()],
  lib: [
    {
      dts: true,
      format: 'esm',
      output: {
        target: 'web',
      },
    },
    {
      format: 'cjs',
    },
  ],
  output: {
    sourceMap: true,
  },
});
