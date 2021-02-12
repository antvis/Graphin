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

## Graphin Quick Start

> Graphin 2.0 组件文档：https://antv.vision/graphin-docs/

### Install

```bash
npm install --save @antv/graphin
```

### Usage

```jsx | pure
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

### Graphin and G6 compatible table

| Graphin Version | G6 Version | graphin-components antd Version |
| --------------- | ---------- | ------------------------------- |
| before 1.0.1    | 3.1.9      | 3.24.3                          |
| ^1.0.2          | ^3.2.0     | 3.24.3                          |
| ^1.0.5          | ^3.3.0     | 3.24.3                          |
| ^1.1.0          | ^3.4.0     | 4.0.3                           |

## Upgrade Guidelines

From V1 to V2

Compared with version 1.0, 2.0 has fully supported and upgraded the capabilities of G6: registration mechanism, layout mechanism, element styles, etc. are consistent with G6, support tree diagrams, and better componentization solutions

### layout layout

-The configuration is consistent with the G6 layout, so you can use [G6 Layout Configuration](https://g6.antv.vision/zh/docs/api/graphLayout/guide)
-Usage is consistent with G6 layout, layout.options needs to be deconstructed

```jsx | pure
//v1
<Graphin data={data} layout={{ name:'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name:'grid', ...options }} />
```

### data data

- Network graph data: The data structure of Graphin2.0 remains unchanged, but the data content has undergone some changes. New status fields and style fields are added to facilitate business processing. For details, see:
- Tree graph data: Graphin2.0 supports tree graphs. If the data structure is tree, TreeGraph will be rendered internally

```tsx
const data = {
  nodes: [
    {
      id: 'node-1',
      // style field
      style: {
        label: {
          value: 'node-1-label',
        },
      },
      // status field
      status: {
        selected: true,
      },
    },
  ],
};

<Graphin data={data} />;
```

### behavior

Interactive behaviors, previously needed to be introduced in G6 through modes, support componentized introduction in Graphin, and support component attribute configuration to complete data drive. When upgrading the V2 version, there is no need to perceive this

### extend

The extend interface is completely removed from Graphin. Previously, nodeShape, icon, layout can be implemented through the `Graphin.register` interface. `extend.marker` completely removed

- Expand node

```tsx
// v1
<Graphin extend={{ nodeShape: renderNodeShape }} />;

// v2
Graphin.registerNode(renderNodeShape);
```

- Extend layout

```tsx
// layout
<Graphin extend={{ nodeShape: customLayout }} />;

// v2
Graphin.registerLayout(customLayout);
```

- Extend icon

```tsx
// layout
<Graphin extend={{ icon: customIconFunction }} />;

// v2
Graphin.reigsterFontFamily(iconloader); // View details Custom icon
```

- Extend marker (completely removed)

### register

Fully consistent with G6 registration mechanism

```tsx
// Register the node, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registernodenodename-options-extendednodename for details
Graphin.registerNode();

// Register edge, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registeredgeedgename-options-extendededgename for details
Graphin.registerEdge();

// Register Combo, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registercombocomboname-options-extendedcomboname for details
Graphin.registerCombo();

// Register layout, please refer to https://g6.antv.vision/zh/docs/api/registerLayout#g6registerlayoutlayoutname-layout
Graphin.registerLayout();

// Registration behavior, refer to https://g6.antv.vision/zh/docs/api/Behavior for details
Graphin.registerBehavior();
```

## Develop Graphin

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
| [@antv/graphin-icons](https://github.com/antvis/graphin/tree/master/packages/graphin-icons)           | Graphin official icons                                            |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin documentation website                                     |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | A Graphin demo: generic graph analysis workbench based on Graphin |

- Set up npmClient

Set your npmClient in lerna.json, friends in China can set [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
  "packages": ["packages/*"],
  "npmClient": "cnpm",
  "version": "0.0.0"
}
```

- Installation dependencies

Install node_modules in `the project root directory`

```bash
cnpm i
```

- Install the dependencies of each package

In the `root directory of the project`, start lerna's bootstrap, lerna automatically installs the dependencies of each package, after installation, you can find that each package has its own node_modules

```bash
npm run bootstrap
```

- Start local compilation of graphin, graphin-components, graphin-icons

You can `cd` to graphin, graphin-components, graphin-icons in pacakges to start the script command `npm run start` in each package.json.

Note ⚠️ Because each package in the packages has a dependency relationship, for example, graphin-components depends on the packaged product of graphin, and the speed of package startup is different, so we need to start the graphin package first, and then start packages/graphin-components. Startup is complete Later, you can also restart the ts compiler in vscode to ensure that each dependency ts can be inferred and found

```bash
npm run start
```

- Launch Graphin Dumi development document

[dumi](https://d.umijs.org/) is a doc tool can assist you to develop libraries & write docs. very easy to use, so we can start dumi to view our development documents.

Return to the `root directory of the project`, start `npm run docs`, you can see

```bash
npm run docs
```

- Launch Graphin official site

```bash
cd packages/graphin-site
npm run site
```

### More Info

- [Introduction to Graphin](https://graphin.antv.vision/zh/docs/manual/introduction)
- [Getting started](https://graphin.antv.vision/zh/docs/manual/getting-started)
- [API documentation](https://graphin.antv.vision/zh/docs/api/graphin)
- [GraphinStudio](https://graphin.antv.vision/zh/GraphinStudio)

### DingTalk

You can scan the QR code to join graphin's group chat

<img src='https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*-qzoTpLg-1cAAAAAAAAAAAAAARQnAQ' alt='DingTalk' width= '300px'/>
