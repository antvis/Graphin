![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin-components.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)
[![Build Status](https://travis-ci.org/antvis/graphin.svg?branch=master)](https://travis-ci.org/antvis/graphin)

## @antv/graphin-components

[中文](./README-cn.ZH.md)

Graphin's components lib for building graph analysis studio. Graphin is the graph analysis toolkit based on [G6 3.x](https://github.com/antvis/g6).

Components list: 

-   Toolbar
-   ContextMenu 
-   More coming soon...

## Install

```bash

npm install @antv/graphin-components --save

```

UMD bundle is available in [releases](https://github.com/antvis/Graphin/releases). External dependencys: react, react-dom, antd.


## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
    const data = Utils.mock(10).graphin();
    return (
        <div className="App">
            <Graphin data={data}>
                <Toolbar />
            </Graphin>
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## Docs

Please refer to [Graphin Docs - Components](https://graphin.antv.vision/zh/docs/manual/main-concepts/components)

## APIs

Please refer to [Graphin Components API Doc](https://graphin.antv.vision/zh/docs/api/components)
