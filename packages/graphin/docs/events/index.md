---
title: 基本介绍
group:
  path: /events
  title: 事件机制
nav:
  title: Graphin
  path: /graphin
  order: 0
---

## 基本介绍

Graphin 中的事件机制来自于 G6 的事件机制，通过 context.graph 或者 ref.graph 两种方式拿到 graph 实例，从而监听事件的发生，我们鼓励事件和 UI 逻辑绑定，大部分的分析组件也是通过这样实现的。比如 ContextMenu

## typescript 友好
