![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/graphin-components.svg)](https://www.npmjs.com/package/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](https://npmjs.org/package/@antv/graphin)
[![Build Status](https://travis-ci.org/antvis/graphin.svg?branch=master)](https://travis-ci.org/antvis/graphin)

## @antv/graphin-components

[中文](./README-cn.ZH.md)

Graphin's components lib for building graph analysis studio. Graphin is the graph analysis toolkit based on [G6 3.x](https://github.com/antvis/g6).

Components list:

| 组件            | 分类         | 名称       | 说明                                                 |
| --------------- | ------------ | ---------- | ---------------------------------------------------- |
| ContextMenu     | 交互组件     | 右键菜单   | 帮助用户进行节点或边操作：打标，扩散，发现           |
| Tooltip         | 交互组件     | 提示框     | 帮助用户快速浏览节点或边的信息                       |
| MiniMap         | 交互组件     | 小地图     | 帮助用户进行全局导航                                 |
| Toolbar         | 交互组件     | 工具栏     | 帮助用户进行画布操作：缩小，放大，全屏               |
| RedoUndo        | 交互组件     | 撤销回退   | 帮助用户进行全局导航                                 |
| FishEye         | 交互组件     | 鱼眼放大镜 | 帮助用户进行查看细节                                 |
| CreateEdge      | 交互组件     | 边建联组件 | 帮助用户进行关系建联                                 |
| Legend          | 标示组件     | 图例       | 帮助用户进行节点和边的类型标示：颜色，大小，属性     |
| Hull            | 标示组件     | 轮廓       | 帮助用户进行节点归类示                               |
| Statistic       | 标示组件     | 统计面板   | 帮助用户进行画布状态的监控标示                       |
| SnapshotGallery | 分析配套组件 | 快照画廊   | 提供快照保存复现功能，帮助用户分析过程不中断         |
| LayoutSelector  | 分析配套组件 | 布局切换器 | 帮助用户切换布局，自主调节参数，从而达到最佳布局效果 |
| Sheetbar        | 分析配套组件 | 多画布组件 | 帮助用户二次分析，多画布管理                         |
| TableMode       | 分析配套组件 | 表格模式   | 帮助通过表格查看关系源数据                           |
| FindPathPanel   | 算法分析组件 | 寻找路径   | 帮助用户计算两个节点间的最短路径和可能路径列表       |
| MapMode         | 高级分析组件 | 地图模式   | 帮助用户分析地理关系数据                             |
| Timebar         | 高级分析组件 | 时间轴     | 帮助用户分析时序关系数据                             |

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
