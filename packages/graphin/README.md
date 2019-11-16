![](https://user-images.githubusercontent.com/6628666/44565549-4ab5d480-a79b-11e8-8d75-11420845efc0.png)

[![](https://img.shields.io/travis/antvis/graphin.svg)](https://travis-ci.org/antvis/graphin)
![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)

[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/graphin.svg)](http://isitmaintained.com/project/antvis/graphin 'Percentage of issues still open')

[English README](./README.en-US.md)

## @antv/graphin

`@antv/graphin` 是图分析工具的内核，它是一个基于 g6 封装的 React 组件。

## 安装

```bash

npm install @antv/graphin --save

```

## 用法

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import './styles.css';

const App = () => {
    const data = Utils.mock(10).graphin();
    return (
        <div className="App">
            <Graphin data={data} />
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## API

参考官网:[API 文档](https://antvis.github.io/graphin/zh/docs/api/graphin)

## 快速开始

参考官网[快速开始](https://antvis.github.io/graphin/zh/docs/manual/getting-started)
