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
