---
title: Combo Combined 布局
group:
  path: /layout
  title: 布局方案
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 分组布局

当数据有明显聚类特征，采用分组布局即使非常好的方式，行业内有几种常见的布局方式:

- [`Combo 缩放功箱布局`](https://cambridge-intelligence.com/graph-visualization-rectangular-combos/) @keylines
- [`CirclePacking 布局`](https://observablehq.com/@d3/zoomable-circle-packing) @d3-circle-packing
- [`Group Clustering 布局`](https://doc.linkurio.us/ogma/latest/examples/visual-grouping.html) @linkurio

> 注意 ⚠️ ：Graphin 目前对这块的功能还处于研究中，如果你感兴趣，欢迎在 github 上与我们交流～

## 数据 1

<code src='./demos/combo-combined.tsx'>

## 增加交互

- 双击 combo 解散
- 节点右键菜单中可合并到父 combo

<code src='./demos/combo-combined-data2.tsx'>
