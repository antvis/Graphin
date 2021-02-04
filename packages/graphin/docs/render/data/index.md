---
title: 数据结构
order: 0
group:
  path: /render
nav:
  title: Graphin
  path: /graphin
  order: 1
---

## 基本介绍

图 从 数据机构上区分，可以分为 网图 和 树图，Graphin 根据数据结构的不同，在内部自动判断 渲染不同的图，在`Graphin`的源码实现上,网图封装了`G6.TreeGraph`，树图封装了`G6.Graph`

无论哪种数据结构，网图和树图的 布局，交互，渲染，在 Graphin 上的用法保持一致。

### 网图渲染

> `Graphin` 内置了 `Utils.mock` 方法，方便我们快速生成网图的数据结构，同时针对业务常见的一些渲染后的操作，比如 `FocusItem`，`FitView`。通过 Graphin 也能快速组件化集成。可以点击右下方`</>`图标，展开完整源码查看

<code src='./Network.tsx'>

Graphin2.0 版本支持树图渲染。和树图搭配的有 `TreeCollapse`和 `FitView` 两个交互组件。前者可以将子树展开收起，后者可以将庞大的树图展示全

> ⚠️ 注意： `<FitView />`组件目前在树图上有 BUG（网图可以正确作用），等 G6 版本修复后同步更新

### 树图渲染

<code src='./CompactBox.tsx'>

### 🔧 工具函数

Graphin 提供了一个工具函数，可以帮助我们快速生成网图和树图的数据

```jsx | pure
import { Utils } from '@antv/graphin';

const tree = Utils.mock(10)
  .tree()
  .graphinTree();
const network = Utils.mock(10)
  .circle()
  .graphin();
const network = Utils.mock(10)
  .random()
  .graphin();
const network = Utils.mock(10)
  .tree()
  .graphin();
```

### ⚠️ 动态切换

Graphin 暂不支持树图和网图的动态切换，因为树图和网图 在内部实现上，两种图属于不同的实例化对象，因此我们更推荐用户采用多个 Graphin 实例的方式来处理树图和网图兼容的情况，如下图所示的伪代码。

```jsx | pure
<Tab>
  <TabPanel title="网图">
    <Graphin data={network} />
  </TabPanel>
  <TabPanel title="树图">
    <Graphin data={tree} />
  </TabPanel>
</Tab>
```

### ⚠️ 布局方案

布局上，树图的布局和网图的布局不是通用的，因此一个数据结构为 `Tree` 的树图，不能够指定它的布局方法为 `concentric`。同理，一个数据结构为`Network`的网图，不能够指定它的布局为`compactBox`。
