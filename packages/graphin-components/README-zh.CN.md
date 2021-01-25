## @antv/graphin-components

[English](./README.md)

这是 Graphin 的辅助分析 React 组件库。Graphin 是基于 [G6 4.x](https://github.com/antvis/g6) 的图分析解决方案。

主要包括：

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
| FilterPanel     | 分析配套组件 | 筛选面板   | 提供快速筛选功能                                     |
| SnapshotGallery | 分析配套组件 | 快照画廊   | 提供快照保存复现功能，帮助用户分析过程不中断         |
| LayoutSelector  | 分析配套组件 | 布局切换器 | 帮助用户切换布局，自主调节参数，从而达到最佳布局效果 |
| Sheetbar        | 分析配套组件 | 多画布组件 | 帮助用户二次分析，多画布管理                         |
| TableMode       | 分析配套组件 | 表格模式   | 帮助通过表格查看关系源数据                           |
| FindPathPanel   | 算法分析组件 | 寻找路径   | 帮助用户计算两个节点间的最短路径和可能路径列表       |
| MapMode         | 高级分析组件 | 地图模式   | 帮助用户分析地理关系数据                             |
| Timebar         | 高级分析组件 | 时间轴     | 帮助用户分析时序关系数据                             |

## 开发规范

graphin-components 里内置的组件，不绑定任何 UI 组件库，但是每个组件都会增加一个 antd UI 组件库的使用 demo，方便开发者在业务中快速开发使用。

### 文件规范

以`ContextMenu`组件为例，基本目录结构如下

- `index.tsx` ContextMenu 组件的最终导出文件
- `index.md` 中文文档
- `index.en-US.md` 英文文档
- `index.less` 样式文件
- `demos`
  - `Antd.tsx` Antd 组件集成的 DEMO
  - `index.tsx` 默认官方 DEMO
- `xxx.tsx` ContextMenu 的其他配套组件

### 内置组件

内置组件不依赖任何 UI 框架，可以从容器组件中结构

```jsx | pure
import { ContextMenu, Tooltip } from '@antv/graphin-components';

const { Menu } = ContextMenu;
const { Node, Edge } = Tooltip;
```

### 开放组件

开放组件以 Antd 组件为例，帮助业务同学快速理解，方便集成其他 UI 框架，如 Fusion，Material-UI

```jsx | pure

<code src='./demos/Antd.tsx'>

```

### 数据传输

React.FC 可以通过 `React.useContext` 拿到数据

```jsx | pure
import { GraphinContext } from '@antv/graphin';
export default () => {
  const graphin = React.useContext(GraphinContext);
  console.log(graphin);
  return null;
};
```

React.Component 可以通过 <GraphinContext.Consumer /> 拿到数据

```jsx | pure
import { GraphinContext } from '@antv/graphin';
export default class App extends React.Component {
  render() {
    return <GraphinContext.Consumer>{(graphin) => {}}</GraphinContext.Consumer>;
  }
}
```

### 接口文档

基于 dumi 的 API 接口，自动生成接口文档

```jsx | pure

<API src='./index.tsx'>

```

## 安装

```bash

npm install @antv/graphin-components --save

```

UMD 格式的文件可以在 [releases](https://github.com/antvis/Graphin/releases) 中下载。外部依赖：react，react-dom，antd。

## 使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

// 别忘了引入 CSS

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

## 文档

请参考 [Graphin 文档-分析组件](https://graphin.antv.vision/zh/docs/manual/main-concepts/components)

## APIs

请参考[Graphin 分析组件 API 文档](https://graphin.antv.vision/zh/docs/api/components)
