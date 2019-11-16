---
title: Graphin 简介
order: 0
icon: none
---

## Background

With the advent of the era of big data, data analysis is becoming more and more important for enterprises. Traditional OLAP chart analysis has already emerged in the business world to help companies make business decisions. This is known as "BI" (Business Intelligence). In recent years, 5G + IoT technology has been gradually applied, which will produce a new kind of data - associated data. Imagine, in your home, WiFi and 5G are connected to your refrigerator, air conditioner, washing machine, and your mobile phone, computer, and your social account is also connected to your mobile phone or computer.  The future world must be a connected world, and we all live in a huge topology.

Therefore, how to process these relational data and analyze the data topology network, becomes a challenge. The process of this analysis is also called Graph Analysis.

At present, graph analysis has been widely used in the fields of financial anti-fraud, public safety, infrastructure monitoring, and smart medical care. In this process, we need a powerful graph calculation engine to solve the problem of data compliance and collection. The corresponding graph algorithm is also needed to solve the graph construction and analysis. Finally, at the front end, we need a graph visualization engine that provides us with visual analysis capabilities to discover potential value. Graphin was born in this context, its purpose is to visualize these relational data and analyze it.

## Naming Origin

Graphin means Graph Insight (analysis of graphs). It is a library of React components based on G6. Simple, efficient, out of the box. Its logo is a graphene (Graphene), meaning the potential in the future.

## Product Positioning

Graph visualization can be layered into "graph analysis" and "graph editing" in the application field. The background introduction(#Background) above is actually about the graph analysis.

-   graph analysis: layout analysis and visual exploration of the graph. Typical product: [cambridge-intelligence](https://cambridge-intelligence.com/)，[TigerGraph](https://testdrive.tigergraph.com)，[Linkurio](https://crunchbase.linkurio.us/demo/)，[Gephi](https://gephi.org/) ，[Palantir](https://www.palantir.com/)，[Neo4j](https://neo4j.com/product/)。
-   graph editing: Editing, wiring, process management of the graph. Typical product: [draw.io](https://www.draw.io/)，[mxGraph](https://github.com/jgraph/mxgraph)，[ggEditor](http://ggeditor.com/)。

Graphin is based on [G6](https://github.com/antvis/g6) + React. G6 was a graphical visualization rendering engine before v3.1. so it supports both graph analysis and graph editing. Starting from v3.1, G6 concentrates on graph analysis and hand over graph editing to X6. React's powerful component ecology, simple programming model, greatly reduce the user's usage threshold.

## Targeted Product

Graphin benchmarks [ReGraph](https://cambridge-intelligence.com/regraph/) on product capabilities, and hopes to serve many graph analysis areas such as relationship analysis, knowledge mapping, financial anti-fraud, logistics security, and infrastructure monitoring.

## Motivation

-   **研发效能**: Graph is a complex concept with usage threshold. G6 is a library of graph visualization and graph analysis. It is flexible, but it also means the lack of best practices. What can G6 do? Many people are actually not clear. Graphin hopes to add engineering practice capabilities to the G6 to improve developer productivity.

-   **抛砖引玉**: Graphin is just a learner in the field of graph analysis. there are many excellent products before it which did a very good job in product experience and analysis, but none of them was open source and many products do not cooperate in China. Graphin hopes to attract more people to explore in this field through open source co-construction.

## Functional Characteristics

### 01. Data Driven

Take advantage of the React framework features to map from data to canvas rendering

-   增量数据添加：Graphin 会根据前置布局，动态完成增量数据添加，达到节点扩散，关系发现等效果。
-   全量数据渲染：Graphin 支持全量数据渲染，满足保存，导入，导出等需求。


<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*PM7yTr_-O0gAAAAAAAAAAABkARQnAQ'/>

### 02.Layout Switching

Graphin has some built-in layouts that supports layout switching to meet the layout needs of different scenes.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*U9XMRbsTTA8AAAAAAAAAAABkARQnAQ'/>

### 03.分析组件

分析过程是一个动态交互的过程，对于图分析也不例外。因此我们需要一些分析组件帮助我们辅助分析，这里 Graphin 内置了两款组件：Toobar 通用工具栏 和 ContextMenu 右键菜单 ，未来计划新增 MiniMap 缩略图 与 ProptertiesFilter 属性筛选器，Legend 图例等组件，从而达到让用户高效分析的目的。

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*aBjSTYyhsE8AAAAAAAAAAABkARQnAQ'/>

### 04.Custom Styling

内置节点与边的样式，支持用户通过 JSON Schema 自定义。
Graphin has a built-in style for node and edge. It also allows users to customize style via JSON Schema

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UzMDRoPLwWMAAAAAAAAAAABkARQnAQ'/>

### 05.Basic Analysis

支持节点扩散，寻找边关系等基础分析方法。

### 06.Advanced Analysis

开源后计划新增 时序分析（Timebar），地理位置分析（Map mode）等高级分析方法。
time analysis (Timebar), geographic analysis (Map mode) and other advanced analysis methods are in the planning.