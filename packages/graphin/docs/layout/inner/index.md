---
title: 内置布局
group:
  path: /layout
  title: 布局方案
  order: 1
nav:
  title: Graphin
  path: /graphin
  order: 0
---

## 基本介绍

Graphin 2.0 的布局全面拥抱 G6，详情请参考：https://g6.antv.vision/zh/docs/api/graphLayout/guide

因此布局能力在 Graphin1.0 的基础上，新增了

- MDS Layout：高维数据降维算法布局；
- Fruchterman Layout：Fruchterman 力导布局
- Combo Force Layout：适用于带有 combo 图的力导向布局，推荐有 combo 的图使用该布局。

在大数据节点下，也同步支持 GGPU 和 Webworker 的计算与渲染机制

## 在线示例

> 目前测试出来，agre 和 concentric 布局存在问题，nodes 中的 x,y  坐标计算为 NaN，可以在布局切换的例子中复现

<code  title="Concentric" desc="同心圆布局" src='./concentric.tsx'>

<code  title="Force" desc="力导布局"  src='./force.tsx'>

### Grid

<!-- <code src='./grid.tsx'> -->

### Circular

<!-- <code src='./circular.tsx'> -->
