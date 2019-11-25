---
title: Graphin
order: 0
icon: none
---

## Background

With the advent of the era of big data, data analysis is becoming more and more important for enterprises. Traditional OLAP chart analysis has already emerged in the business world to help companies make business decisions. This is known as "BI" (Business Intelligence). In recent years, 5G + IoT technology has been applied gradually, which will produce a new kind of data - associated data. Imagine, in your home, WiFi and 5G are connected to your refrigerator, air conditioner, washing machine, mobile phone and computer, and your social account is also connected to your mobile phone or computer. The future world must be a connected world, and we all live in a huge topology.

Therefore, how to process these relational data and analyze the data topology network becomes a challenge. The process of this analysis is also called Graph Analysis.

At present, graph analysis has been widely used in the fields of financial anti-fraud, public safety, infrastructure monitoring, and smart medical care. In this process, we need a powerful graph calculation engine to solve the problem of data compliance and collection. The corresponding graph algorithm is also needed to solve the graph construction and analysis. Finally, at front end, we need a graph visualization engine that provides us with visual analysis capabilities to discover potential value. Graphin was born in this context, its purpose is to visualize these relational data and analyze it.

## Naming Origin

Graphin means Graph Insight (analysis of graphs). It is a library of React components based on [G6 3.x](https://g6.antv.vision/) that is simple, efficient and out of the box. Its logo is [Graphene](https://en.wikipedia.org/wiki/Graphene), which means the potential in the future.

## Product Positioning

Graph visualization can be layered into "graph analysis" and "graph editing" in the application field. The [background](#Background) above is actually about the graph analysis layer.

-   Graph Analysis: layout analysis and visual exploration of the graph. Typical product: [cambridge-intelligence](https://cambridge-intelligence.com/), [TigerGraph](https://testdrive.tigergraph.com), [Linkurio](https://crunchbase.linkurio.us/demo/),[Gephi](https://gephi.org/), [Palantir](https://www.palantir.com/), [Neo4j](https://neo4j.com/product/).
-   Graph Editing: editing, wiring, process management of the graph. Typical product: [draw.io](https://www.draw.io/), [mxGraph](https://github.com/jgraph/mxgraph), [ggEditor](http://ggeditor.com/).

Graphin is based on [G6](https://g6.antv.vision/) + React. G6 was a graphical visualization rendering engine before v3.1. It supports both graph analysis and graph editing. Starting from v3.1, G6 concentrates on graph analysis and hand over graph editing to X6. Graphin use React's powerful component ecosystem and simple and declarative programming model to greatly reduce user's learning cost.

## Targeted Product

Graphin benchmarks [ReGraph](https://cambridge-intelligence.com/regraph/) on product capabilities, and hopes to serve many graph analysis areas such as relationship analysis, knowledge graph, financial anti-fraud, logistics security, and infrastructure monitoring.

## Open Sourcing Motivation

-   **Improve efficiency**: Graph is a complex concept with high learning cost. G6 is a library of graph visualization and graph analysis. It's flexible, but it also means the lack of best practices. What can G6 do? Many people are actually not clear. Graphin hopes to add engineering best practice to G6 to improve developer productivity.

-   **Throw away a brick**: Graphin is just a starter in the field of graph analysis. There are many excellent products before Graphin which did a very good job in product experience and analysis, but none of them was open source and many products do not sell to China. Graphin hopes to attract more people to explore in this field through open source co-operation.

## Functional Characteristics

### 01. Data Driven

Take advantage of React declarative UI features to map data to canvas rendering result.

-   Incremental data addition: Graphin adds data dynamically according to the pre-layout to achieve node diffusion, relationship discovery and other effects.
-   Full data rendering: Graphin supports full data rendering to meet the requirements of saving, importing, exporting, etc.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*PM7yTr_-O0gAAAAAAAAAAABkARQnAQ'/>

### 02. Layout Switching

Graphin has some built-in layouts that supports auto layout and layout switching to meet the layout needs of different scenarios.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*U9XMRbsTTA8AAAAAAAAAAABkARQnAQ'/>

### 03. Analysis Component

The data analysis process is a dynamic interactive process. There is no exception for graph analysis. So we need some analysis components to help us. There are two built-in components in Graphin: Toobar and ContextMenu. MiniMap and ProptertiesFilter Component are coming soon.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*aBjSTYyhsE8AAAAAAAAAAABkARQnAQ'/>

### 04. Custom Styling

Graphin has a built-in style for node and edge. It also allows users to customize style via JSON Schema.

<img style='width:100%;box-shadow: 0 2px 8px #f0f1f2;padding:40px;'  src = 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UzMDRoPLwWMAAAAAAAAAAABkARQnAQ'/>

### 05. Basic Analysis

Support node diffusion, edge relationships finding  and other basic analysis methods.

### 06. Advanced Analysis

Time based analysis (Timebar), geographic analysis (Map mode) and other advanced analysis methods are planned.
