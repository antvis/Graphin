---
title: Toolbar 工具栏
order: 3
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# Toolbar

Toolbar 是提供常见分析操作的工具栏。在 Graphin1.x 版本，我们内置了撤销与重做（操作历史）、鱼眼放大镜、画布缩放、全屏、节点聚焦、画布快照下载等功能。但是在一些深度使用的业务中，我们得到的反馈是更希望 Graphin 暴露这些功能的 API，业务要重新设置样式和界面布局。因此在 Graphin2.x 中 Toolbar 将重新设计，定位为工具栏的容器，功能原子化，支持自由组合。

Graphin 2.0 中，我们在使用 Toolbar 时，有三种方式：

- 配置 options
- 使用 `<Toolbar.Item>` 子组件
- 完全自定义

## 案例

### 01. 通过 Option 设置 Toolbar

<code src='./demos/option'>

### 02. 使用 <Toolbar.Item> 子组件

<code src='./demos/item'>

### 03. 完全自定义：配合使用 Antd 组件

<code src='./demos/custom'>

<API src='./interface.ts' >

## 功能特性

- Toolbar 作为容器组件，功能原子化，支持自由组合
- 内容展示组件：FullSceen，ZoomIn，ZoomOut，DonwLoadFullImage , 取代内置 Redo 和 Undo 功能。
- 支持用户自定义内部展示组件：比如用户将 FishEye 组件集成
- 支持抛出原子化 API，比如 `GraphinContext.apis.zoomIn()`

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。
