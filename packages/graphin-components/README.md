![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin-components.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)
[![Build Status](https://travis-ci.org/antvis/graphin.svg?branch=master)](https://travis-ci.org/antvis/graphin)

## @antv/graphin-components

[中文](./README-cn.ZH.md)

This is Graphin's library of pre-built React components for common analytical use cases. Graphin is a graph analysis solution based on [G6 4.x](https://github.com/antvis/g6).

Components list:

| Component       | Category                      | Description                                                                 |
| --------------- | ----------------------------- | --------------------------------------------------------------------------- |
| ContextMenu     | Interactive Component         | Help users perform node or edge operations such as tagging or expansion     |
| Tooltip         | Interactive Component         | Help users quickly browse node or edge information                          |
| MiniMap         | Interactive Component         | Help users to navigate around the canvas                                    |
| Toolbar         | Interactive Component         | Help users with canvas operations: zoom out, zoom in, full screen etc.      |
| RedoUndo        | Interactive Component         | Help users manage graph history                                             |
| FishEye         | Interactive Component         | Help users to enlarge cluttered graph details                               |
| CreateEdge      | Interactive Component         | Help users draw connections between nodes                                   |
| Legend          | Labeling Component            | Displays categorical information about nodes and/or edges                   |
| Hull            | Labeling Component            | Help users group similar nodes together                                     |
| Statistic       | Labeling Component            | Help users monitor canvas information                                       |
| SnapshotGallery | Analytical Component          | Provide snapshot saving and replaying function as part of an image carousel |
| LayoutSelector  | Analytical Component          | Help users switch layouts and configure layout options for optimal display  |
| Sheetbar        | Analytical Component          | Help users analyze and manage multiple canvases                             |
| TableMode       | Analytical Component          | Help users view relational data as tables                                   |
| FindPathPanel   | Algorithm Based Component     | Help users calculate the shortest path and possible paths between two nodes |
| MapMode         | Advanced Analytical Component | Help users analyze geospatial relational data                               |
| Timebar         | Advanced Analytical Component | Help users analyze time series relational data                              |

## Install

```bash

npm install @antv/graphin-components --save

```

UMD bundle is available in [releases](https://github.com/antvis/Graphin/releases). Peer dependencies: react, react-dom, antd.

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

// Do not forget to import required CSS

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
