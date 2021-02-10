---
title: 基本介绍
order: 0
group:
  path: /layout
  title: 布局方案
  order: 2
nav:
  path: /graphin
  order: 0
---

## Graphin 特有布局

Graphin 2.0 的布局全面拥抱 G6，详情请[参考](https://g6.antv.vision/zh/docs/api/graphLayout/guide)。但是 Graphin 也内置了 2 款布局，分别为`graphin-force`和`preset`布局

- `graphin-force` 是基于电荷弹簧模型的力导布局算法，在内部内置`tweak`算法，可以实现力导的增量布局
- `preset` 顾名思义是预设布局，当用户设置此布局，则 graphin 内部会按照用户给定数据 nodes 中的坐标信息(x,y)布局。当业务中需要布局缓存策略，或者保存画布再次进入的时候，此布局非常有用。

## 网图布局

> 注意 ⚠️ ：Graphin@2.0.0 版本暂不支持 webworker 和 ggpu 布局，这两种针对大数据量节点的布局计算优化方案，graphin 会在后续的版本中加入。

- [Random Layout](/https://g6.antv.vision/zh/docs/api/graphLayout/random)：随机布局；
- [GForce Layout](/https://g6.antv.vision/zh/docs/api/graphLayout/gforce)：G6 4.0 支持的经典力导向布局，支持 GPU 并行计算
- [Force Layout](https://g6.antv.vision/zh/docs/api/graphLayout/force)：引用 d3 的经典力导向布局；
- [Circular Layout](https://g6.antv.vision/zh/docs/api/graphLayout/circular)：环形布局；
- [Radial Layout](https://g6.antv.vision/zh/docs/api/graphLayout/radial)：辐射状布局；
- [MDS Layout](https://g6.antv.vision/zh/docs/api/graphLayout/mds)：高维数据降维算法布局；
- [Fruchterman Layout](https://g6.antv.vision/zh/docs/api/graphLayout/fruchterman)：Fruchterman 布局，一种力导布局；
- [Dagre Layout](https://g6.antv.vision/zh/docs/api/graphLayout/dagre)：层次布局；
- [Concentric Layout](https://g6.antv.vision/zh/docs/api/graphLayout/concentric)：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
- [Grid Layout](https://g6.antv.vision/zh/docs/api/graphLayout/grid)：格子布局，将节点有序（默认是数据顺序）排列在格子上；
- [Combo Force Layout](https://g6.antv.vision/zh/docs/api/graphLayout/combo-force)：推荐有 combo 的图使用该布局。

## 树图布局

> 注意 ⚠️ ：Graph 布局与 TreeGaph 布局相互不通用。树图布局不支持独立使用； 树图布局不支持自定义。

- [CompactBox 紧凑树布局](https://g6.antv.vision/zh/docs/api/treeGraphLayout/compactBox)
- [Dendrogram 生态树布局](https://g6.antv.vision/zh/docs/api/treeGraphLayout/dendrogram)
- [Indented 缩进树布局](https://g6.antv.vision/zh/docs/api/treeGraphLayout/indented)
- [Mindmap 脑图树布局](https://g6.antv.vision/zh/docs/api/treeGraphLayout/mindmap)
