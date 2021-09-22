/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  return {
    entry: {
      index: './src/index.ts',
    },
    mode: env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react'],
            plugins: [['@babel/plugin-proposal-class-properties', { loose: true }], ['react-hot-loader/babel']],
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            compilerOptions: {
              declaration: false,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                javascriptEnabled: true,
              },
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      library: 'GraphinComponents',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist/'),
      publicPath: './',
      filename: 'graphin-components.min.js',
    },
    plugins: [new MiniCssExtractPlugin(), new BundleAnalyzerPlugin()],
    externals: {
      lodash: {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_',
      },
      react: 'React',
      'react-dom': 'ReactDOM',
      '@antv/graphin': 'Graphin',
      '@antv/g6': 'G6',
      antd: 'antd',
    },
  };
};
