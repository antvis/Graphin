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

In the era of big data, data analysis is becoming more important for enterprises. Traditional OLAP analysis using charts has already emerged in the business world to help companies make business decisions. This is known as "BI" (Business Intelligence). In recent years, the growth of 5G + IoT technology has produced a new kind of data - connected data. For example, in a house, the refrigerator, air conditioner, washing machine, mobile phone and computer, and even your social media accounts are all connected with WiFi or 5G technology. The future is a connected world.

The way to process connected data and analyze a network’s topology is a challenge. This is known as Graph Analysis.

At present, graph analysis has been widely used in the fields of financial fraud prevention, public safety, infrastructure monitoring, and smart medical care. In these use cases, we need a powerful graph calculation engine to solve the problem of data calculation and collection. The correct graph algorithm is also needed for analysis. Finally, we need a graph visualization engine that provides us with visual analysis capabilities for data exploration. Graphin was born in this context and it helps to visualize and analyze connected data.

## 💡 Naming Origin

Graphin means Graph Insight (analysis of graphs). It is a library of React components based on G6, that is simple and efficient and with many out-of-the-box features. The logo, [Graphene](https://en.wikipedia.org/wiki/Graphene), indicates the potential in the future.

## 🚀 Product Positioning

Graph visualization applications can be categorized into "graph analysis" and "graph editing". The [background](#Background) above focuses on the graph analysis use case.

- Graph Analysis: layout analysis and visual exploration of the graph. Similar products include: [cambridge-intelligence](https://cambridge-intelligence.com/), [TigerGraph](https://testdrive.tigergraph.com), [Linkurio](https://crunchbase.linkurio.us/demo/),[Gephi](https://gephi.org/), [Palantir](https://www.palantir.com/), [Neo4j](https://neo4j.com/product/).
- Graph Editing: editing, wiring, process management of the graph. Similar products include: [draw.io](https://www.draw.io/), [mxGraph](https://github.com/jgraph/mxgraph), [ggEditor](http://ggeditor.com/).

Graphin is based on [G6](https://g6.antv.vision/) + React. G6 was a graphical visualization rendering engine before v3.1. It supported both graph analysis and graph editing. Starting from v3.1, G6 concentrates on graph analysis and hands over graph editing capabilities to [X6](https://x6.antv.vision/). Graphin utilises React's powerful component ecosystem with simple and declarative programming concepts to greatly reduce a user's learning curve.

Graphin benchmarks [ReGraph](https://cambridge-intelligence.com/regraph/) on product capabilities, and hopes to serve many graph applications such as relationship analysis, knowledge graph, financial fraud detection, logistics security, and infrastructure monitoring.

## 💼 Graph Visual Analysis Solution

AntV is a new generation of data visualization solution for Ant Group. As part of its product matrix, Graphin hopes to find a way in the exploration of relational data, which can help developers improve efficiency and empower business. On the AntV Open Source Day (22 December 2020), we launched "AntV Graph Visual Analysis Solution" and its [sub-application area](https://graphin.antv.vision/solution/database/graph-database). The white paper provides an introduction to our solution, and we hope to discuss it with the community going forward.

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
