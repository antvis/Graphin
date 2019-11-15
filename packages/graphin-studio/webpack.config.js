/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
    const isLib = env.type === 'lib';
    const externals = isLib
        ? {
              react: {
                  commonjs: 'react',
                  commonjs2: 'react',
                  amd: 'react',
                  root: 'React',
              },
              'react-dom': {
                  commonjs: 'react-dom',
                  commonjs2: 'react-dom',
                  amd: 'react-dom',
                  root: 'ReactDOM',
              },
          }
        : {};
    return {
        entry: {
            bundle: './src/index.tsx',
            app: './src/GraphinStudio.tsx',
        },
        mode: process.env.NODE_ENV,
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
                        plugins: [
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            [
                                'import',
                                {
                                    libraryName: 'antd',
                                    libraryDirectory: 'es',
                                    style: 'css', // `style: true` 会加载 less 文件
                                },
                            ],
                            ['react-hot-loader/babel'],
                        ],
                    },
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
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
                            loader: 'style-loader', // creates style nodes from JS strings
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
                },
            ],
        },

        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
            alias: {
                react: require.resolve('react'),
                '@types': path.resolve('./', 'src', 'types.ts'),
                '@service': path.resolve('./', 'src', 'Service'),
                '@utils': path.resolve('./', 'src', 'Utils/'),
                '@com': path.resolve('./', 'src', 'Components/'),
            },
        },
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            publicPath: './',
            // filename: 'bundle.js',
            filename: '[name].js',
            library: 'graphin-studio',
            libraryTarget: 'umd',
        },
        devServer: {
            contentBase: path.join(__dirname, 'public/'),
            port: 3003,
            publicPath: 'http://localhost:3003/',
            hotOnly: true,
        },
        plugins: [
            // new BundleAnalyzerPlugin(),
            // new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'example',
                template: './public/index.html',
                chunks: ['bundle'],
            }),
        ],
        externals,
    };
};
