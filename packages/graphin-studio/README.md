## Graphene 图分析产品 DEMO

Graphene 是一个在线图分析产品的 DEMO，它包含了

## build from scratch

### 01. write webpack.config.js

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] },
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
                test: /\.svg$/,
                loader: 'svg-inline-loader',
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
                    },
                ],
            },
        ],
    },

    resolve: { extensions: ['*', '.ts', '.tsx', '.js', '.jsx'] },
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: './',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 6666,
        publicPath: 'http://localhost:6666/',
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'example',
            template: './public/index.html',
        }),
    ],
};
```

### 02.install dependence

```bash
tnpm i webpack webpack-cli html-webpack-plugin babel-loader ts-loader style-loader css-loader less-loader webpack-dev-server  --save-dev

```

### 03.babel

-   installation

```bash

tnpm i @babel/cli @babel/core  @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react --save-dev

```

-   config

```js
{
    "presets": ["@babel/env", "@babel/preset-react"],
    "plugins": [
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ]
}
```

### eslint

-   https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

### 04.write your `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>example</title>
        <meta name="keywords" content="react,component" />
        <meta name="description" content="example" />
        <style type="text/css">
            /* custom class */
        </style>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### 05.write your `src/index.tsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
    return <div>hello world</div>;
};
ReactDOM.render(<App />, document.getElementById('root'));
```

### 07. install react/react-dom

```bash
tnpm i react react-dom --save
```

### 06.write your run-scripts in package.json

```json
"scripts": {
    "start": "webpack-dev-server",
    "build": "webpack -c ./webpack.config.js ",
  },
```

### 07.babel-loader doesn't transpile imported js from an outside directory

-   [github issue](https://github.com/babel/babel-loader/issues/293)  
    The solution that helped me was to remove .babelrc file and move the options to webpack.config.js as such:

```js
 {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
        options: {
        presets: ["@babel/env", "@babel/preset-react"],
        plugins: [
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css" // `style: true` 会加载 less 文件
            }]
        ]
        },
},
```

### 08. add hot loader

参考：https://github.com/gaearon/react-hot-loader

-   1.Add react-hot-loader/babel to your .babelrc or your webpack babel:

```js
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```

-   2.Mark your root component as hot-exported:

```js
import React from 'react';
import { hot } from 'react-hot-loader/root';

const Layout = () => {
    return (
        <div className="container">
            <Router>
                <Route exact path="/" component={Home} />
            </Router>
        </div>
    );
};
export default hot(Layout);
```

-   3.add --hot in your start scripts

```js
 "start": "NODE_ENV=development && webpack-dev-server --hot",
```

-   4.踩坑：remove webpack.HotModuleReplacementPlugin in your webpack.config.js

```js

  plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title: "example",
          template: "./public/index.html"
        })
    ],

```

### trouble shooting

```js

react.development.js:1533 Uncaught Invariant Violation: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app

```

-   resolve: add react alias for react-hook

```js

resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'] ,
    alias:{
        react : require.resolve('react')
    }
}

```

### g6 npm link

采用 npm link 的方式将 G6 的源码软连接到全局 ndoe_modules

-   先在你的电脑里的任意位置 git clone g6 的源码 ，推荐和你的项目平级

```bash
https://github.com/antvis/g6.git

```

-   安装依赖，产生 g6 的编译后文件

```bash
tnpm i
npm run build
```

-   使用 npm link 产生 global links

```bash
sudo tnpm link
```

-   在我们的项目里使用 global link

```bash
cd g6-pro/packages/analyzer-react

tnpm link @antv/g6
```

-   然后我们项目咯里的 node_modules/@antv/g6 就会被软连接到 global link，global link 就会连接到 g6 的源码处

such as :

```bash

link /Users/pomelo/Desktop/workspace/g6-pro/packages/analyzer-react/node_modules/@antv/g6@ -> /usr/local/lib/node_modules/@antv/g6

```
