---
title: 更新样式
group:
  path: /render
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 节点更新

## 【推荐】使用 `graph.updateItem()` 更新样式与状态

> 可以右键菜单，更新以下节点，核心是调用 `graph.updateItem()` 方法，分别更新`graphin-circle`的 keyshape，label，halo，badges，icon。

<code src='./node.tsx'>

## 【持久化】使用 `props.data` 更新样式与状态

如果我们需要通过数据驱动的方式更新节点的样式与状态，改变 props.data 也可以达到效果，只是目前还有两个可以待开发的点：

- 【1】可以内置`Graphin.Utils.update` 方法，方便用户操作 data，返回新的 data，在下面 demo 中，是用户自己实现的 update 方法。
- 【2】在 props.data 更新的时候，目前是全量更新，需要在内部做一次优化。预计`2.1.0` 版本更新这两个特性

> 下图点击节点，更新节点的徽标

<code src='./state.tsx'>
