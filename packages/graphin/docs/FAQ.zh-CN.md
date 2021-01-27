---
title: FAQ
group:
  path: /
nav:
  path: /graphin
---

### 01. Graphin 与 G6 的关系是什么？

搞懂 Graphin 与 G6 的关系非常重要，虽然 Graphin 是基于 G6 封装的 React 组件库，这只是它的技术实现，并不是它的定位。G6 是图分析与图可视化的分析引擎，在分析领域，可以使用 G6 做关系可视分析，也可以使用 G6 做流量可视分析，Graphin 只是一个在关系可视分析领域的解决方案，如下图所示：

<img  src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*CkJcSqfJJiQAAAAAAAAAAABkARQnAQ' width="100%"/>

- 工程方案：G6 有一定的上手门槛，Graphin 提供了一套工程方案，渲染，交互，布局流程内置，与 React 框架整合，把 G6 能力封装聚合成 API。

- 产品能力：Graphin 有一颗想做产品的心，开源后，我们将对标商业图分析工具 ReGraph 去打造，参考业界优秀图分析产品的功能特性，内置 布局切换，关系扩散，撤销重做等功能，未来计划新增 地图模式(Map Mode)，时序分析（Timebar），团伙导航等高级分析方法。

- 简单易用：本身是一个比较复杂的概念，Graphin 屏蔽了 G6 的一些图可视化概念，注册节点也可以通过 JSON schema 去描述，交互，布局等概念都封装在 Graphin 内部，用户只需要像使用普通 React 组件一样去使用 Graphin 即可。

### 02. Graphin 未来的计划是什么？

回答 Graphin 未来去哪儿的问题，我们得先得回答 Graphin 从哪儿来的问题

Graphin 诞生在一个图分析业务团队，第一版本还是使用 cytoscape.js 进行开发的。随着业务进入深水区，基于业务的定制越来越多，我们切换了引擎到 G6，与 G6 的开发者深入合作，慢慢地融入整个 AntV 体系。以下思维导图中 ✅ 部分是 Graphin 开源版本已经做到的功能

<img src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UKJkQYwpyu0AAAAAAAAAAABkARQnAQ' width='100%'/>
