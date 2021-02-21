---
title: Introduction
order: -1
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

## 📖 Background

With the advent of the era of big data, data analysis is becoming more important for enterprises. Traditional OLAP chart analysis has already emerged in the business world to help companies make business decisions. This is known as "BI" (Business Intelligence). In recent years, 5G + IoT technology has been applied gradually, which will produce a new kind of data - associated data. Imagine, in your home, WiFi and 5G are connected to your refrigerator, air conditioner, washing machine, mobile phone and computer, and your social account is also connected to your mobile phone or computer. The future world must be a connected world, and we are all involves in this huge topology.

Therefore, the way to process these relational data and analyze the data topology network becomes a challenge. The process of this analysis is also known as Graph Analysis.

At present, graph analysis has been widely used in the fields of financial anti-fraud, public safety, infrastructure monitoring, and smart medical care. In this process, we need a powerful graph calculation engine to solve the problem of data compliance and collection. The corresponding graph algorithm is also needed to solve the graph construction and analysis. Finally, at front end, we need a graph visualization engine that provides us with visual analysis capabilities to discover potential value. Graphin was born in this context, it serve a purpose to visualize these relational data and analyze it.

## 💡 Naming Origin

Graphin means Graph Insight (analysis of graphs). It is a library of React components based on [G6 3.x](https://g6.antv.vision/) that is simple, efficient and with out-of-the-box's feature. The logo, [Graphene](https://en.wikipedia.org/wiki/Graphene), indicates the potential in the future.

## 🚀 Product Positioning

Graph visualization can be layered into "graph analysis" and "graph editing" in the application field. The [background](#Background) above is actually about the graph analysis layer.

- Graph Analysis: layout analysis and visual exploration of the graph. Representative products are: [cambridge-intelligence](https://cambridge-intelligence.com/), [TigerGraph](https://testdrive.tigergraph.com), [Linkurio](https://crunchbase.linkurio.us/demo/),[Gephi](https://gephi.org/), [Palantir](https://www.palantir.com/), [Neo4j](https://neo4j.com/product/).
- Graph Editing: editing, wiring, process management of the graph. Representative products are: [draw.io](https://www.draw.io/), [mxGraph](https://github.com/jgraph/mxgraph), [ggEditor](http://ggeditor.com/).

Graphin is based on [G6](https://g6.antv.vision/) + React. G6 was a graphical visualization rendering engine before v3.1. It supports both graph analysis and graph editing. Starting from v3.1, G6 concentrates on graph analysis and hand over graph editing to [X6](https://x6.antv.vision/). Graphin utilise React's powerful component ecosystem with simple and declarative programming concepts to greatly reduce user's learning curve.

Graphin benchmarks [ReGraph](https://cambridge-intelligence.com/regraph/) on product capabilities, and hopes to serve many graph analysis areas such as relationship analysis, knowledge graph, financial anti-fraud, logistics security, and infrastructure monitoring.

## 💼 Graph Visual Analysis Solution

AntV is a new generation of data visualization solution for Ant Group. As part of its product matrix, Graphin hopes to find a way in the exploration of relational data, which can help developers improve efficiency and empower business. Therefore, on the AntV Open Source Day on 22 December 2020, we launched the "AntV Graph Visual Analysis Solution" and its [sub-application area](https://graphin.antv.vision/solution/database/graph-database) The white paper on the solution is an introduction, and I hope to discuss with you and move forward.

```jsx
/**
 * inline: true
 */

import React from 'react';

export default () => {
  return (
    <div style={{ height: '900px' }}>
      <embed
        title="visualization for graph "
        height="100%"
        width="100%"
        src="https://gw.alipayobjects.com/os/bmw-prod/c8ddbda8-c742-4c11-9c68-3783dd5954b9.pdf"
        type="application/pdf"
      />
    </div>
  );
};
```

## 🎬 Other resources

- [[Share] Graph Insight: AntV graph visual analysis solution](https://www.bilibili.com/video/BV15h411y7AT)
- [[Article] How much do you know about graph visualization](https://www.yuque.com/antv/g6-blog)
