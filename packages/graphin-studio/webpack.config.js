/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
    return {
        entry: {
            bundle: './src/index.tsx',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
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
                        plugins: [
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
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
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                    sideEffects: true,
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
            alias: {
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
            filename: '[name].[hash].js',
        },
        devServer: {
            contentBase: path.join(__dirname, 'public/'),
            port: 3003,
            publicPath: 'http://localhost:3003/',
        },
        plugins: [
            new MiniCssExtractPlugin(),
            // new BundleAnalyzerPlugin(),
            new HtmlWebpackPlugin({
                title: 'example',
                template: './public/index.html',
                chunks: ['vendors~bundle', 'bundle'],
            }),
        ],
        externals: [
            {
                antd: 'window.antd',
                'chinese-random-name': 'chineseRandomName',
                lodash: '_',
                react: 'window.React',
                'react-dom': 'window.ReactDOM',
                '@antv/g6': 'G6',
            },
            // eslint-disable-next-line
            (context, request, callback) => {
                if (request === 'lodash') {
                    return callback(null, '_');
                }
                if (/lodash\//.test(request)) {
                    // lodash/isArray
                    const paths = request.split('/');
                    // lodash or lodash-es
                    paths[0] = '_';
                    // _.isArray
                    return callback(null, paths.join('.'));
                }
                if (/lodash\./.test(request)) {
                    // lodash.debounce
                    const paths = request.split('.');
                    // lodash or lodash-es
                    paths[0] = '_';
                    // _.debounce
                    return callback(null, paths.join('.'));
                }
                callback();
            },
        ],
    };
};
