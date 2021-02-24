---
title: Introduction
order: 0
icon: none
---

## Background

With the advent of the era of big data, data analysis is becoming more important for enterprises. Traditional OLAP chart analysis has already emerged in the business world to help companies make business decisions. This is known as "BI" (Business Intelligence). In recent years, 5G + IoT technology has been applied gradually, which will produce a new kind of data - associated data. Imagine, in your home, WiFi and 5G are connected to your refrigerator, air conditioner, washing machine, mobile phone and computer, and your social account is also connected to your mobile phone or computer. The future world must be a connected world, and we are all involves in this huge topology.

Therefore, the way to process these relational data and analyze the data topology network becomes a challenge. The process of this analysis is also known as Graph Analysis.

At present, graph analysis has been widely used in the fields of financial anti-fraud, public safety, infrastructure monitoring, and smart medical care. In this process, we need a powerful graph calculation engine to solve the problem of data compliance and collection. The corresponding graph algorithm is also needed to solve the graph construction and analysis. Finally, at front end, we need a graph visualization engine that provides us with visual analysis capabilities to discover potential value. Graphin was born in this context, it serve a purpose to visualize these relational data and analyze it.

## Naming Origin

Graphin means Graph Insight (analysis of graphs). It is a library of React components based on [G6 3.x](https://g6.antv.vision/) that is simple, efficient and out of the box. Its logo is [Graphene](https://en.wikipedia.org/wiki/Graphene), which means the potential in the future.

## Product Positioning

Graph visualization can be layered into "graph analysis" and "graph editing" in the application field. The [background](#Background) above is actually about the graph analysis layer.

- Graph Analysis: layout analysis and visual exploration of the graph. Representative products are: [cambridge-intelligence](https://cambridge-intelligence.com/), [TigerGraph](https://testdrive.tigergraph.com), [Linkurio](https://crunchbase.linkurio.us/demo/),[Gephi](https://gephi.org/), [Palantir](https://www.palantir.com/), [Neo4j](https://neo4j.com/product/).
- Graph Editing: editing, wiring, process management of the graph. Representative products are: [draw.io](https://www.draw.io/), [mxGraph](https://github.com/jgraph/mxgraph), [ggEditor](http://ggeditor.com/).

Graphin is based on [G6](https://g6.antv.vision/) + React. G6 was a graphical visualization rendering engine before v3.1. It supports both graph analysis and graph editing. Starting from v3.1, G6 concentrates on graph analysis and hand over graph editing to X6. Graphin utilise React's powerful component ecosystem with simple and declarative programming concepts to greatly reduce user's learning curve.

## Targeted Product

Graphin benchmarks [ReGraph](https://cambridge-intelligence.com/regraph/) on product capabilities, and hopes to serve many graph analysis fields such as relationship analysis, knowledge graph, financial anti-fraud, logistics security, and infrastructure monitoring.

## Open Sourcing Motivation

- **Improve efficiency**: Graph is a complex concept with high learning curve for a novice. People might not aware of the simplicity and convenience of using G6 in build up graph visualization and graph analysis application. Graphin hopes to extends the engineering best practice and the feature of G6 to improve developer productivity in development.

- **Attract Feedbacks**: Graphin is a novice in graph analysis field. There are numerous excellent experience and analysis products are born before Graphin. However, none of them are open-sources and collaborate in China. Therefore, Graphin hopes to attract more interest and feedbacks from professional with common interest to explore in this field through open source co-operation.

## Functional Characteristics

### 01. Data Driven

Take advantage of React declarative UI features to achieves map data to canvas rendering.

- Incremental data addition: Graphin adds data dynamically according to the pre-layout to achieve node diffusion, relationship discovery and other effects.
- Full data rendering: Graphin supports full data rendering to meet the requirements of saving, importing, exporting, etc.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*PM7yTr_-O0gAAAAAAAAAAABkARQnAQ'/>

### 02. Layout Switching

Graphin possess built-in layouts that supports auto layout and manual layout switching to meet the needs of different scenarios.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*U9XMRbsTTA8AAAAAAAAAAABkARQnAQ'/>

### 03. Analysis Component

Data analysis is a dynamic interactive process, same goes to graph analysis. Thus, we might rqeuire analysis components to assist us. There are two built-in components in Graphin: Toobar and ContextMenu. MiniMap and ProptertiesFilter Component are coming soon.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*aBjSTYyhsE8AAAAAAAAAAABkARQnAQ'/>

### 04. Custom Styling

Graphin has a built-in style for node and edge. It also allows users to customize style via JSON Schema.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UzMDRoPLwWMAAAAAAAAAAABkARQnAQ'/>

### 05. Basic Analysis

Support node diffusion, edge relationships finding and other basic analysis methods.

### 06. Advanced Analysis

Time based analysis (Timebar), geographic analysis (Map mode) and other advanced analysis methods are planned.
