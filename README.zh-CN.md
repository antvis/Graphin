<p align="center">
  <a href="https://ant.design">
    <img width="150" src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg">
  </a>
</p>
<h1 align="center">Graphin</h1>

<div align="center">

A React toolkit for graph analysis based on G6

[![Version](https://badgen.net/npm/v/@antv/graphin)](https://www.npmjs.com/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](http://npmjs.com/@antv/graphin)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>

<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> 简体中文 | [English](./README.md)

## ✨ 功能特性

### 🎨 高颜值元素，规范的样式配置。

Graphin 对于图元素的视觉映射做了规范化处理。一个 Graphin 内置节点包含：容器，标签，光晕，图标，徽标 5 部分，每一部分均可以通过数据驱动。内置的边包含：路径，标签，光晕 3 部分，同时针对业务中常用的标签背景，自环，多边，虚线等，也有响应的数据样式配置。[在线体验](https://graphin.antv.vision/graphin/render/node)

![node-style](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*eGi_S5NXE3cAAAAAAAAAAAAAARQnAQ)
![edge-style](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*voNsS4vtKlsAAAAAAAAAAAAAARQnAQ)

### 📦 自动布局，轻松应对复杂场景

Graphin 内置 10 款网图布局，4 款树图布局，满足你对于不同数据类型，不同分析场景的布局需求。针对复杂业务场景下的布局切换，动态布局，子图布局等，均能通过数据驱动布局，轻松实现。[在线体验](https://graphin.antv.vision/graphin/layout/dynamic-layout)

![node-expand](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*tdcwQYD_FLoAAAAAAAAAAAAAARQnAQ)
![layout-switch](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*ZhBqT4ZONrcAAAAAAAAAAAAAARQnAQ)

### 📝 细腻的交互，轻松自定义

Graphin 提供了 13 种交互组件。包括画布的缩放，平移，圈选，拉索，自动 Resize，也包括元素的拖拽，选中，悬停，高亮，展开收起等，满足你对于不同分析场景的交互需求。[在线体验](https://graphin.antv.vision/graphin/behaviors/behaviors)

### 🚀 丰富的组件，源于业务沉淀

目前 Graphin 提供了 7 种分析组件：分别为右键菜单，提示框，小地图，工具栏，鱼眼放大镜，轮廓，图例。未来将提供 17+ 的分析组件。[在线体验](https://graphin.antv.vision/components/interaction/context-menu)

![components](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*XebMSIakucgAAAAAAAAAAAAAARQnAQ)

### ⚙️ 舒心的开发体验，符合 React 用户心智

![typescript](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xpoaRpOGme4AAAAAAAAAAAAAARQnAQ)

## 🖥 浏览器支持

- Graphin 图标 使用了 [Proxy](https://caniuse.com/?search=Proxy)，在一些不支持 Proxy 语法的浏览器上可能无法正确显示字体图标
- Graphin 绘制引擎为 G6，依赖浏览器 API，暂不支持 SSR。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| IE11, Edge                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                              |

## 📦 安装

如果你是使用 React 的 Web 开发者，那么你大可将 Graphin 当作一个普通的 React 组件来使用。

本文采用 yarn 安装依赖，使用 npm 也可以。以下分别安装 Graphin 的核心组件`@antv/graphin` 和 分析组件`@antv/graphin-components`，以及 Graphin 官方提供的图标库`@antv/graphin-icons`

```bash
yarn add @antv/graphin@latest --save
yarn add @antv/graphin-components@latest --save
yarn add @antv/graphin-icons --save
```

## 🔨 使用

### 使用 Graphin 画布组件

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
// mock数据
const data = Utils.mock(10).circle().graphin();
export default () => {
  return <Graphin data={data} />;
};
```

### 使用 Graphin 分析组件

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// mock数据
const data = Utils.mock(10).circle().graphin();
export default () => {
  return (
    <Graphin data={data}>
      <MiniMap />
    </Graphin>
  );
};
```

### 使用 Graphin 字体图标

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// 引入图标资源文件
import iconLoader from '@antv/graphin-icons';
// mock数据
const data = Utils.mock(10).circle().graphin();
// 注册到 Graphin 中
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);
// 使用图标
data.nodes.forEach(node => {
  node.style = {
    icon: {
      type: 'font', // 指定图标为Font类型
      fontFamily: fontFamily, // 指定FontFamily
      value: icons.home, // 指定图标的值
    },
  };
});
export default () => {
  return (
    <Graphin data={data}>
      <MiniMap />
    </Graphin>
  );
};
```

## 👨‍💻 升级指南

如果你是从 Graphin1.x 的用户，这份[升级指南](https://graphin.antv.vision/graphin/quick-start/migration)可能会帮助你，遇到升级问题，也可以在 github 上提 issue

## ⌨️ 开发指南

如果你想在本地启动 Graphin，不妨看这份[贡献指南](https://graphin.antv.vision/graphin/quick-start/contributing)。我们希望有更多的小伙伴一起参与 Graphin 的开源建设

## 更多信息

- [Graphin 简介](https://graphin.antv.vision/graphin/quick-start/introduction)
- [快速上手](https://graphin.antv.vision/graphin/quick-start/quick-start)
- [图可视分析解决方案](https://graphin.antv.vision/solution/database/graph-database)

## 钉钉群

<img src='https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*-qzoTpLg-1cAAAAAAAAAAAAAARQnAQ' alt='钉钉群' width= '300px'/>
