---
title: 叶子节点按类型聚类
group:
  path: /layout
  title: 布局方案
  order: 9
nav:
  path: /graphin
  order: 2
---

## 叶子节点按类型聚类

`叶子节点按类型聚类`是指布局为graphin-force时，叶子节点可以根据`节点类型`进行聚类分堆展示。主要作用于在`连续分析探索`的场景，解决展开某个节点的一度关系导致的节点排布混乱（graphin-force布局的节点排布是乱序打散的）、看不清难以发现有效信息等问题；将同一中心节点发散的一度节点进行按类型聚类分堆展示，可以帮助业务更清晰快速的看清。

底层算法是是通过配置力导布局`centripetalOptions`，将`不同类型的节点施以不同的向心力及设置不同的center`，实现将同类型的节点相对关联的节点聚在一起。相比于普通的全局聚类算法，在不破坏graphin-force整体布局的基础上做了叶子节点聚类分堆，视觉上更方便对类型进行区分，同时也不会打乱边的展示。


## 快速使用
`叶子节点按类型聚类`的使用非常简单，只需要在graphin-force配置`leafCluster`、`nodeclusterby`和`clusterNodeStrength`。

```jsx | pure
import React, { useEffect, useState } from 'react';
import Graphin from '@antv/graphin';

export default () => {
  const layout = {
    type: 'graphin-force',
    animation: false,
    preset: {
      type: 'concentric', // 力导的前置布局
    },
    leafCluster: true, // 是否需要叶子节点按类型聚类
    nodeClusterBy: 'cluster', // 聚类的映射字段
    clusterNodeStrength: 8, // 节点聚类作用力系数
  };
  return <Graphin data={data} layout={layout} />;
};
```

## 使用示例
为方便区分聚类效果对比，现将同类型的节点映射成一种颜色。
- **简单数据场景效果对比**
<code src='./demos/simple.tsx'>
<br />

- **复杂数据场景效果对比**
<code src='./demos/complex.tsx'>
