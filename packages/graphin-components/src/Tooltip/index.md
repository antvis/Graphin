---
title: Tooltip 提示框
order: 1
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: 分析组件
  path: /components
  order: 1
---

# Tooltip

Tooltip 提示框是一种快速浏览信息的交互组件，常用于图的节点和边上。通过鼠标悬停在节点或边上时，出现一个提示框，鼠标移出节点则取消提示框。这在快速查询元素详细信息时非常有帮助。

## 内置组件：<Tooltip.Node />

`<Tooltip/>`是提示框的容器，提供位置，触发元素，回调函数等信息，这些信息可以用户通过`context`获取。具体如何渲染，完全交给用户，官方也提供了`<Tooltip.Node />`组件，用来快速使用，用户完全可以自定义展示的内容

<code src='./demos/index.tsx'>
<API src='./index.tsx'>

## 开放组件：自定义组件

<code src='./demos/Custom.tsx'>

## ⚠️：集成 Antd 的 Popover 组件

集成 Antd 的 Popover 组件，需要一个触发的 DOM，而触发的 DOM 恰好覆盖了节点，因此，我们的组件`ContextMenu`,`<DragNode />`等无法触发节点事件，从而带来失效，推荐官方内置的`<Tooltip pleacement='top' hasArrow/>`来使用

<code src='./demos/Antd.tsx' >

## 功能特性

- Tooltip 作为容器组件，给内部的组件提供事件唤起和坐标定位功能,提供 Node 和 Edge 两种容器
- 内容展示组件 完全由用户决定

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。
