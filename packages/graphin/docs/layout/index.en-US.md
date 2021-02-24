---
title: Basic Introduction
order: 0
group:
  path: /layout
  title: Layout Plan
  order: 2
nav:
  path: /graphin
  order: 0
---

## Graphin Unique Layout

The layout of Graphin 2.0 fully embraces G6. For details, please refer to [Reference](https://g6.antv.vision/en/docs/api/graphLayout/guide). But Graphin also has 2 built-in layouts, namely `graphin-force` and `preset` layout

- `graphin-force` is a force-guided layout algorithm based on the charge spring model. The built-in `tweak` algorithm can realize the incremental layout of force-guided
- `preset` is a preset layout as the name implies. When the user sets this layout, the graphin will be laid out according to the coordinate information (x, y) in the data nodes given by the user. This layout is very useful when you need to layout the caching strategy in your business, or save the canvas and enter it again.

## Network Graphs Layout

> Note ⚠️: Graphin@2.0.0 version does not support webworker and ggpu layouts for the time being. These two layout calculation optimization schemes for large data nodes will be added in subsequent versions.

- [Random Layout](https://g6.antv.vision/en/docs/api/graphLayout/random)：Random layout;
- [GForce Layout](https://g6.antv.vision/en/docs/api/graphLayout/gforce)：Classic force-oriented layout supported by G6 4.0 and GPU parallel computing
- [Force Layout](https://g6.antv.vision/en/docs/api/graphLayout/force)：Quoting d3's classic force-oriented layout;
- [Circular Layout](https://g6.antv.vision/en/docs/api/graphLayout/circular)：Circular layout;
- [Radial Layout](https://g6.antv.vision/en/docs/api/graphLayout/radial)：Radial layout;
- [MDS Layout](https://g6.antv.vision/en/docs/api/graphLayout/mds)：High-dimensional data dimensionality reduction algorithm layout;
- [Fruchterman Layout](https://g6.antv.vision/en/docs/api/graphLayout/fruchterman)：Fruchterman layout, a force-guided layout;
- [Dagre Layout](https://g6.antv.vision/en/docs/api/graphLayout/dagre)：Hierarchical layout;
- [Concentric Layout](https://g6.antv.vision/en/docs/api/graphLayout/concentric)：Concentric layout, place important nodes (measured by degrees by default) in the center of the layout;
- [Grid Layout](https://g6.antv.vision/en/docs/api/graphLayout/grid)：Grid layout, arrange the nodes in order (data order by default) on the grid;
- [Combo Force Layout](https://g6.antv.vision/en/docs/api/graphLayout/combo-force)：It is recommended to use this layout for graphs with combo.

## Tree Graph layout

> Note ⚠️: Graph layout and TreeGaph layout are not common to each other. The tree graph layout does not support independent use; the tree graph layout does not support customization.

- [CompactBox Compact tree layout](https://g6.antv.vision/en/docs/api/treeGraphLayout/compactBox)
- [Dendrogram Eco tree layout](https://g6.antv.vision/en/docs/api/treeGraphLayout/dendrogram)
- [Indented Indented tree layout](https://g6.antv.vision/en/docs/api/treeGraphLayout/indented)
- [Mindmap Brain map tree layout](https://g6.antv.vision/en/docs/api/treeGraphLayout/mindmap)
