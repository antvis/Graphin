---
title: 快速开始
order: 0
group:
  path: /
  title: 快速开始
  order: 0
nav:
  title: Graphin
  path: /graphin
  order: 0
---

## 00.前言

“两点一线构成图”，相信这是大家都对图的一个基本认知。在我们的业务开发中，往往也有大量场景需要对图进行可视化，如下图所示，不同的领域中，图均发挥着关键作用
![领域关系图](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*G8I1TaPvDogAAAAAAAAAAAAAARQnAQ)

如果你也需要对关系图进行可视化，不妨来试试 AntV 推出的图可视化工具 Graphin ～ 接下来让我们跟随这个在线教程 DEMO，来看看 Graphin 如何帮助我们完成一个图分析应用～

> 友情提示：本网站通过 dumi 生成，因此可以直接点击 demo 示例的右下角，展开源代码查看。

## 01.把关系数据可视化出来

完成一个图分析产品的第一步，就是将关系数据可视化出来。关系数据是非常典型的图结构，由节点 Node 和边 Edge 组成。Node 中只有 id 是必须参数，Edge 中只有 source 和 target 是必须按参数，它分别代表边的开始节点和结束节点的 ID

<code src='./index.tsx'>

## 02.视觉通道映射

第一步我们完成了节点和边的渲染，但是它们的样式太过节点，如何将更多的信息呈现在节点和边上呢？这个时候可以利用视觉通道映射，除了常规的大小，形状，样式，Graphin 内置的节点和边 进行了规范。

Graphin 内置的节点由 5 部分图形组成，分别是`keyshape`,`label`,`icon`,`badges`,`halo`

<code src='./node.tsx'>

比如 `node-0` 是一个用户，`node-1` 是一家企业，`node-3` 是另一家企业.我们可以用节点的大小来代表企业的规模，节点的 ICON 来展示不同的属性，颜色加以区分。

<code src='./style.tsx'>
