---
title: FAQ
order: 2
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
  order: 0
---

### 01. What is the relationship between Graphin and G6?

It's important to understand the relationship between Graphin and G6. Although Graphin is a React component library based on G6, this is just a technical implementation instead of positioning. G6 is an analysis engine for graph analysis and graph visualization. In the field of analysis, G6 can be used for flow and relationship visual analysis. Graphin is only a solution in the field of relational visual analysis, as shown in the following figure:

<img  src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*CkJcSqfJJiQAAAAAAAAAAABkARQnAQ' width="100%"/>

- Project plan: There is a learning curve to use G6. Graphin provides a set of engineering solutions: rendering, interaction, layout and encapsulates capability of G6's API.

- Product Capability: Graphin helps to make products. After its open source, we will continue to improve Graphin in all aspects and plan to add Map Mode, Timebar and other advanced analysis methods.

- Easy to use: Graph visualization is a complex concept. Graphin removes several graph visualization concepts of G6. Both interaction and layout are encapsulated in Graphin and you can register nodeShape with JSON schema.

### 02. What is the future plan of Graphin?

Before answering this question, we have to talk about where Graphin comes from.

Graphin was born from our graph analysis business team. The first version was developed using cytoscape.js. As more customized requirements and business needs arises, we decided to switch the engine to G6 and worked closely with the G6's developers to slowly integrate it into the entire AntV system. The mindmap below shows the currently completed features of Graphin.

<img src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UKJkQYwpyu0AAAAAAAAAAABkARQnAQ' width='100%'/>
