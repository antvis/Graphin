---
title: Graphin 简介
order: 0
icon: none
---

## 背景介绍

随着大数据时代的到来，依据数据做分析对于企业而言变得越来越重要。传统的 OLAP 图表分析，已经在商业领域展露头脚，帮助企业经营决策，这就是大家熟知的“BI”（Business Intelligence）。近些年来，5G+IOT 技术已经逐渐从概念走向应用，这会产生一种新的数据---关联数据。想象一下，在你的家庭中，WIFI 和 5G 连接着你家的电冰箱，空调，洗衣机，也连接着你的手机，电脑，通过手机电脑可能也连接着你的社交账号，出门导航的信息也在同步连接着你的位置。未来的世界一定是一个互联共同的世界，我们都生活在一张巨大的拓扑图中。

因此如何对这些关系数据进行加工处理，如何对这张数据拓扑网进行分析，就成为一件非常有挑战性的事情，这个分析的过程也被定义为图分析（Graph Analysis）

目前图分析已经被广泛被用在金融反欺诈，公共安全，基础设施监控，智慧医疗等领域。在这个过程中，我们需要一个强大的图计算引擎，解决数据合规，挖掘问题。也需要相应的图算法去解决图的构建，分析问题。最后在前端，我们需要一个图可视化引擎，为我们提供可视化分析能力，发现潜在的价值。Graphin 就是在这样的背景下诞生的，将这些关系数据进行可视化呈现，与分析探索。

## 命名由来

Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 G6 封装的 React 组件库，简单，高效，开箱即用。它的 logo 是一个石墨烯（Graphene），意为蕴藏未来的潜力

## 产品定位

图可视化，在应用领域可以分层为 图分析 与 图编辑，上文中的`背景介绍`其实事图分析的背景介绍

-   图分析：对图进行布局分析，可视化探索。典型的产品有: [cambridge-intelligence](https://cambridge-intelligence.com/)，[TigerGraph](https://testdrive.tigergraph.com)，[Linkurio](https://crunchbase.linkurio.us/demo/)，[Gephi](https://gephi.org/) ，[Palantir](https://www.palantir.com/)，[Neo4j](https://neo4j.com/product/)
-   图编辑：对图进行编辑，连线，流程管理。典型的产品有: [draw.io](https://www.draw.io/),[mxGraph](https://github.com/jgraph/mxgraph),[ggEditor](http://ggeditor.com/)

Graphin 的技术底盘是 `G6 + React`，G6 在@3.1 版本之前，是一个图可视化渲染引擎，所以它对图分析与图编辑场景都支持。全面就意味着可能是全面的平庸。从 @3.1 开始，G6 把图编辑场景剥离，专心做图分析，图编辑场景交给 `X6` 去 承接。而利用 `React` 强大的组件生态，简单的编程模型，大大降低用户的使用门槛

## 对标产品

Graphin 在产品能力上对标 [ReGraph](https://cambridge-intelligence.com/regraph/) ，未来希望能够服务 关系分析，知识图谱，金融反欺诈，物流安全，基础设施监控 等众多图分析领域

## 开源动机

-   <strong>研发效能</strong>：图本身是一个比较复杂的概念，有一定的上手门槛，G6 是一个图可视化与图分析库，它很灵活，但也意味着缺少最佳实践，G6 到底能做什么？很多人其实并不清楚。Graphin 希望能为 G6 附加工程实践能力，提高开发者的研发效能。

-   <strong>抛砖引玉</strong>：Graphin 在图分析领域只是一个学习者。在它之前有众多国内外优秀的产品，在产品体验与分析探索上做得非常不错，无一例外没有一个是开源的。很多产品也不在中国地区开展合作。Graphin 希望通过开源共建的方式，吸引更多的人在这一领域探索。

## 功能特性

### 01. 数据驱动

充分利用 React 框架特性，支持数据到图的映射与变化

-   增量数据添加：Graphin 会根据前置布局，动态完成增量数据添加，达到节点扩散，关系发现等效果
-   全量数据渲染：Graphin 支持全量数据渲染，满足保存，导入，导出等需求

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*PM7yTr_-O0gAAAAAAAAAAABkARQnAQ'/>

### 02.布局切换

内置丰富的布局，支持布局切换，满足不同场景下的布局需求

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*U9XMRbsTTA8AAAAAAAAAAABkARQnAQ'/>

### 03.分析组件

分析过程是一个动态交互的过程，对于图分析也不例外。因此我们需要一些分析组件帮助我们辅助分析，这里 Graphin 内置了两款组件：Toobar 通用工具栏 和 ContextMenu 右键菜单 ，未来计划新增 MiniMap 缩略图 与 ProptertiesFilter 属性筛选器，Legend 图例等组件，从而达到让用户高效分析的目的

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*aBjSTYyhsE8AAAAAAAAAAABkARQnAQ'/>

### 04.自定义样式

内置节点与边的样式，支持用户通过 JSON Schema 自定义

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UzMDRoPLwWMAAAAAAAAAAABkARQnAQ'/>

### 05.基础分析

支持节点扩散，寻找边关系等基础分析方法；

### 06.高级分析

开源后计划新增 时序分析（timebar），地理位置分析（map mode）等高级分析方法。
