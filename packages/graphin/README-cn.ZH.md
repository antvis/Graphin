![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)

[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/graphin.svg)](http://isitmaintained.com/project/antvis/graphin 'Percentage of issues still open')

[English](./README.en-US.md)

## @antv/graphin

这是 Graphin 的核心 React 组件。Graphin 是基于 [G6](https://github.com/antvis/g6) 的图分析解决方案。


## 安装

```bash

npm install @antv/graphin --save

```

## 使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css';

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

## 文档

请参考 [Graphin 文档](https://antvis.github.io/graphin/zh/)


## APIs

请参考[Graphin API 文档](https://antvis.github.io/graphin/zh/docs/api/graphin)
