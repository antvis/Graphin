<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> 简体中文 | [English](./README.md)

<h1 align="center">Graphin</h1>

<div align="center">

[![Version](https://badgen.net/npm/v/@antv/graphin)](https://www.npmjs.com/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](http://npmjs.com/@antv/graphin)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>

Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 [G6](https://github.com/antvis/g6) 封装的 React 组件库。简单，高效，开箱即用。它的 Logo 是一个石墨烯（Graphene），意为蕴藏未来的潜力。

![graphin](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*N-5PT6UO9LAAAAAAAAAAAABkARQnAQ)

Graphin 采用 lerna 管理仓库，packages 中包含以下 5 个 package：

```bash
/packages
    graphin
    graphin-components
    graphin-icons
    graphin-studio
    graphin-site
```

他们依次对应的包名与解释如下：

| 包名                                                                                                  | 说明                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [@antv/graphin](https://github.com/antvis/graphin/tree/master/packages/graphin)                       | Graphin 中的图分析内核，基于 G6 封装 的 React 组件     |
| [@antv/graphin-components](https://github.com/antvis/graphin/tree/master/packages/graphin-components) | Graphin 中的图分析组件                                 |
| [@antv/graphin-icons](https://github.com/antvis/graphin/tree/master/packages/graphin-icons)           | Graphin 内置图标                                       |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin 文档官网                                       |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | Graphin 演示 DEMO：基于 Graphin 实现的通用关系分析平台 |

## Graphin 快速开始

### 安装

```bash
npm run --save @antv/graphin
```

### Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // 别忘了引入Graphin CSS
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

## 升级指引

从 V1 到 V2

2.0 相比 1.0 版本，对 G6 的能力进行了全面的支持与升级：注册机制，布局机制，元素样式等和 G6 保持一致，支持树图，以及更好的组件化方案

### layout 布局

- 配置 和 G6 的 layout 保持一致，因此你可以使用[G6 的 Layout 配置](https://g6.antv.vision/zh/docs/api/graphLayout/guide)
- 用法 和 G6 的 layout 保持一致 , layout.options 需要解构

```jsx | pure
//v1
<Graphin data={data} layout={{ name: 'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name: 'grid', ...options }} />
```

### data 数据

- 网图数据：Graphin2.0 的数据结构不变，但是数据内容发生了一些变化，新增状态字段和样式字段，方便业务处理，具体详见：
- 树图数据：Graphin2.0 支持树图，如果数据结构为 tree，则在内部渲染 TreeGraph

```tsx
const data = {
  nodes: [
    {
      id: 'node-1',
      // 样式字段
      style: {
        label: {
          value: 'node-1-label',
        },
      },
      // 状态字段
      status: {
        selected: true,
      },
    },
  ],
};

<Graphin data={data} />;
```

### behavior

交互行为，之前在 G6 中需要通过 modes 引入，在 Graphin 中支持组件化引入，同时支持组件属性配置，从而完成数据驱动。在升级 V2 版本，这块不用感知

### extend

Graphin 中全面移除 extend 接口，之前 nodeShape，icon，layout 可以通过注册接口实现。extend.marker 彻底移除

- 扩展节点

```tsx
// v1
<Graphin extend={{ nodeShape: renderNodeShape }} />;

// v2
Graphin.registerNode(renderNodeShape);
```

- 扩展布局

```tsx
// layout
<Graphin extend={{ nodeShape: customLayout }} />;

// v2
Graphin.registerLayout(customLayout);
```

- 扩展 icon

```tsx
// layout
<Graphin extend={{ icon: customIconFunction }} />;

// v2
Graphin.reigsterFontFamily(iconloader); // 详情查看 自定义 icon
```

- 扩展 marker （彻底移除）

### register

和 G6 的注册机制完全保持一致

```tsx
// 注册节点，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registernodenodename-options-extendednodename
Graphin.registerNode();

// 注册边，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registeredgeedgename-options-extendededgename
Graphin.registerEdge();

// 注册Combo，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registercombocomboname-options-extendedcomboname
Graphin.registerCombo();

// 注册布局，详情参考 https://g6.antv.vision/zh/docs/api/registerLayout#g6registerlayoutlayoutname-layout
Graphin.registerLayout();

// 注册行为，详情参考 https://g6.antv.vision/zh/docs/api/Behavior
Graphin.registerBehavior();
```

## 开发 Graphin

- 设置 npmClient

在 lerna.json 中设置你的 npmClient，中国地区的朋友可以设置 [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
  "packages": ["packages/*"],
  "npmClient": "cnpm",
  "version": "0.0.0"
}
```

- 安装依赖

在`该项目根目录`下安装 node_modules

```bash
cnpm i
```

- 安装各 packages 的依赖

在`该项目根目录`下，启动 lerna 的 bootstrap，lerna 自动安装好各个 packages 的依赖，安装好后，可以发现各个 packages 中就存在自己的 node_modules 了

```bash
npm run bootstrap
```

- 启动 graphin ， graphin-components ，graphin-icons 的本地编译

可以分别 cd 到 pacakges 中的 graphin，graphin-components，graphin-icons 中启动各个 package.json 中的 script 命令`npm run start`.

注意 ⚠️ 因为 packages 中各个包 存在依赖关系，比如 graphin-components 就依赖 graphin 的打包产物，且 打包启动的速度不一样，因此需要我们先把 graphin 包启动后，再启动 packages/graphin-components .启动完毕后，也可以在 vscode 中重启 ts 编译器，从而确保各个依赖关系 ts 可以推断找到

```bash
npm run start
```

- 启动 Graphin Dumi 开发文档

dumi 是一款针对组件开发场景而生的文档工具，非常好用，因此我们可以启动 dumi 来查看我们的开发文档。

退回到`该项目根目录`，启动 `npm run docs` ,既可以看到

```bash
npm run docs
```

- 启动 Graphin 官方站点

```bash
cd packages/graphin-site
npm run site
```

### Graphin 与 G6 兼容版本对照表

| Graphin 版本 | G6 版本 |
| ------------ | ------- |
| before 1.0.1 | 3.1.9   |
| ^1.0.2       | ^3.2.0  |

### 更多信息

- [Graphin 简介](https://graphin.antv.vision/zh/docs/manual/introduction)
- [快速上手](https://graphin.antv.vision/zh/docs/manual/getting-started)
- [API 文档](https://graphin.antv.vision/zh/docs/api/graphin)
- [GraphinStudio](https://graphin.antv.vision/zh/GraphinStudio)

### 钉钉群

<img src='https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*-qzoTpLg-1cAAAAAAAAAAAAAARQnAQ' alt='钉钉群' width= '300px'/>
