![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)
[![Build Status](https://travis-ci.org/antvis/graphin.svg?branch=master)](https://travis-ci.org/antvis/graphin)

[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/graphin.svg)](http://isitmaintained.com/project/antvis/graphin 'Percentage of issues still open')

[中文](./README-cn.ZH.md)


## @antv/graphin

This package is the core React component of Graphin, the graph analysis toolkit based on [G6 3.x](https://github.com/antvis/g6).


## Install

```bash

npm install @antv/graphin --save

```

UMD bundle is available in [releases](https://github.com/antvis/Graphin/releases). External dependencys: lodash, react, react-dom, @antv/g6.


## Usage

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

## Docs

Please refer to [Graphin doc site](https://graphin.antv.vision/zh/)


## APIs

Please refer to [Graphin doc site for API](https://graphin.antv.vision/zh/docs/api/graphin)
