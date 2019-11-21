![](https://camo.githubusercontent.com/2b77a87432d47fb4f20f5b0bfbdcb2db15775dab/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f6d646e2f726d735f3030656463622f616674732f696d672f412a456b4a6d52726d754a41674141414141414141414141426b4152516e4151)

[English](./README.en-US.md)

Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 [G6](https://github.com/antvis/g6) 封装的 React 组件库。简单，高效，开箱即用。它的 Logo 是一个石墨烯（Graphene），意为蕴藏未来的潜力。

Graphin 采用 lerna 管理仓库，packages 中包含以下 4 个 package：

```bash
/packages
    graphin
    graphin-components
    graphin-studio
    graphin-site
```

他们依次对应的包名与解释如下：

| 包名                                                                                                  | 说明                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [@antv/graphin](https://github.com/antvis/graphin/tree/master/packages/graphin)                       | Graphin 中的图分析内核，基于 G6 封装 的 React 组件     |
| [@antv/graphin-components](https://github.com/antvis/graphin/tree/master/packages/graphin-components) | Graphin 中的图分析组件                                 |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin 文档官网                                       |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | Graphin 演示 DEMO：基于 Graphin 实现的通用关系分析平台 |

### Graphin 快速开始

#### 安装

```bash
npm run --save @antv/graphin
```

#### Usage

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

### 开发 Graphin

-   设置 npmClient

在 lerna.json 中设置你的 npmClient，中国地区的朋友可以设置 [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
    "packages": ["packages/*"],
    "npmClient": "cnpm",
    "version": "0.0.0"
}
```

-   安装依赖

```bash
cnpm i
```

-   安装各 packages 的依赖

```bash
npm run bootstrap
```

-   启动 graphin 与 graphin-components 的本地编译

```bash
npm run start
```


-  在`npm run start`后，启动 Graphin Demo：Graphin Studio

```bash
npm run studio
```

-   启动 Graphin 文档站点

```bash
npm run site
```

### 更多信息

-   [Graphin 简介](https://graphin.antv.vision/zh/docs/manual/introduction)
-   [快速上手](https://graphin.antv.vision/zh/docs/manual/getting-started)
-   [API 文档](https://graphin.antv.vision/zh/docs/api/graphin)
-   [GraphinStudio](https://graphin.antv.vision/zh/GraphinStudio)
