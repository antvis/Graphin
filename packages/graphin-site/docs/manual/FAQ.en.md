---
title: FAQ
order: 6
icon: none
---

### 01.What is the relationship between Graphin and G6?

It's important to understand the relationship between Graphin and G6. Although Graphin is a React component library based on G6, this is just a technical implementation, not its positioning. G6 is an analysis engine for graph analysis and graph visualization. In the field of analysis, G6 can be used for relationshp visual analysis and flow visual analysis. Graphin is only a solution in the field of relational visual analysis, as shown in the following figure. Show:
<img  src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*CkJcSqfJJiQAAAAAAAAAAABkARQnAQ' width="100%"/>

-   Project plan: There is a threshold to use G6. Graphin provides a set of engineering solutions: rendering, interaction and layout and encapsulates capability of G6 intp API.

-   Product Capability: Graphin has a heart that wants to make products. After open source, We will continue to improve Graphin in all aspects. We plan to add Map Mode, Timebar and other advanced analysis methods.

-   Easy to use: Graph visualization is a complex concept. Graphin removes some graph visualization concepts of G6. Botn interaction and layout are encapsulated inside GraphinYou and You can register nodeShape by JSON schema. Graphin is just a React component for users.

### 02.What is the future plan of Graphin?

Before answering this question, we have to talk about where Graphin comes from.

Graphin was born in a graph analysis business team. the first version was developed using cytoscape.js. With the development of business, there are more customized needs, so we switched the engine to G6 and worked closely with the developers of G6 to slowly integrate into the entire AntV system. These parts with tick markers of the mind map are features that Graphin has already done.

<img src='https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*UKJkQYwpyu0AAAAAAAAAAABkARQnAQ' width='100%'/>
