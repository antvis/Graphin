<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">Graphin</h1>

<div align="center">

[![Version](https://badgen.net/npm/v/@antv/graphin)](https://www.npmjs.com/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](http://npmjs.com/@antv/graphin)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>

Graphin means Graph Insight (analysis of graphs). It is a library based on [G6](https://github.com/antvis/g6) and React and offers graph analysis ability out of the box. Graphin's logo is graphene, which means the potential of the future.

For more infomation, please check the [Graphin Website](https://graphin.antv.vision/zh).

![graphin](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*N-5PT6UO9LAAAAAAAAAAAABkARQnAQ)

Graphin use lerna to manage this repo. This repo contains the following packages:

```bash
/packages
    graphin
    graphin-components
    graphin-studio
    graphin-site
```

Please checkout the specific package：

| Package Name                                                                                          | Description                                                       |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [@antv/graphin](https://github.com/antvis/graphin/tree/master/packages/graphin)                       | Core React component of Graphin                                   |
| [@antv/graphin-components](https://github.com/antvis/graphin/tree/master/packages/graphin-components) | Graphin components                                                |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin documentation website                                     |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | A Graphin demo: generic graph analysis workbench based on Graphin |

### Graphin Quick Start

#### Install

```bash
npm run --save @antv/graphin
```

#### Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // Don't forget to import css
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

### Graphin and G6 compatible table

| Graphin Version | G6 Version |
| --------------- | ---------- |
| before 1.0.1    | 3.1.9      |
| ^1.0.2          | ^3.2.0     |

### Develop Graphin

-   Set npmClient

Set your npmClient in lerna.json, developers in China can set npmClient to [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
    "packages": ["packages/*"],
    "npmClient": "yarn",
    "version": "0.0.0"
}
```

-   Install dependencies

```bash
npm i
```

-   Install dependencies for each package

```bash
npm run bootstrap
```

-   Start the local compilation of graphin and graphin-components

```bash
npm run start
```

-   Start the Graphin studio demo after `npm run start`

```bash
npm run studio
```

-   Start the Graphin Doc site

```bash
npm run site
```

### More Info

-   [Introduction to Graphin](https://graphin.antv.vision/zh/docs/manual/introduction)
-   [Getting started](https://graphin.antv.vision/zh/docs/manual/getting-started)
-   [API documentation](https://graphin.antv.vision/zh/docs/api/graphin)
-   [GraphinStudio](https://graphin.antv.vision/zh/GraphinStudio)

### DingTalk

You can scan the QR code to join graphin's group chat

<img src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*xlT5ToVNZdYAAAAAAAAAAABkARQnAQ' alt='DingTalk' width= '300px'/>
