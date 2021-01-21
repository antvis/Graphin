---
title: 基本介绍
order: 0
group:
  path: /register
  title: 注册机制
nav:
  title: Graphin
  path: /graphin
  order: 5
---

## 基本介绍

Graphin 中的自定义机制 来自于 G6 的注册机制，对于 Node，Edge，Combo，Layout，Behavior 这 5 个的自定义是和 G6 保持完全一致的:

- Graphin.registerNode :https://g6.antv.vision/zh/docs/api/registerItem
- Graphin.registerEdge
- Graphin.registerCombo
- Graphin.registerBehavior : https://g6.antv.vision/zh/docs/api/Behavior
- Graphin.registerLayout : https://g6.antv.vision/zh/docs/api/registerLayout

在业务的大量实践中，我们发现节点的 font icon 是一个比较常用的功能，因此在 Graphin 层提供 reigsterIconFontFamily 这个接口，官方将原来内置的 iconfont 抽离成单独的 package:`@antv/graphin-icon`

- Graphin.registerIconFontFamily

## typescript 友好
