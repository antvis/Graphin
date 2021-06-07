---
title: Data Structure
order: 0
group:
  path: /render
nav:
  path: /graphin
  order: 1
---

## Basic Introduction

Graphs are distinguished from the data structure, which can be divided into network graphs and tree graphs. Graphin automatically judges and renders different graphs according to the different data structures. In the source code implementation of `Graphin`, the network graph encapsulates `G6.Graph` , The tree graph encapsulates `G6.TreeGraph`

Regardless of the data structure, the layout, interaction, rendering, and usage of the network graphs and tree graphs remain consistent on Graphin.

### Network Graphs Rendering

> `Graphin` has built-in `Utils.mock` method, which is convenient for us to quickly generate the data structure of the network graphs, and at the same time for some common operations after rendering in the business, such as `FocusItem`, `FitView`. Fast component integration can also be achieved through Graphin. You can click the `</>` icon at the bottom right to expand the full source code to view

<code src='./Network.tsx'>

Graphin2.0 version supports tree graph rendering. There are two interactive components `TreeCollapse` and `FitView` that match the tree graphs. The former can expand and collapse the subtrees, and the latter can display the entire tree graphs.

> ⚠️ Note: The `<FitView />` component currently has a BUG on the tree graphs (the network graphs can function correctly), and it will be updated after the G6 version is repaired.

### Tree Graphs Rendering

<code src='./CompactBox.tsx'>

### 🔧 Tool Functions

Graphin provides a tool function that can help us quickly generate data for network graphs and tree graphs

```jsx | pure
import { Utils } from '@antv/graphin';

const tree = Utils.mock(10)
  .tree()
  .graphinTree();
const network = Utils.mock(10)
  .circle()
  .graphin();
const network = Utils.mock(10)
  .random()
  .graphin();
const network = Utils.mock(10)
  .tree()
  .graphin();
```

### ⚠️ Dynamic Switching

Graphin does not support the dynamic switching of tree graph and network graph at the moment, because the tree graph and network graph are implemented internally, the two graphs belong to different instantiation objects, so we recommend that users use multiple Graphin instances to process the tree graph If it is compatible with the network graph, the pseudo code is shown in the figure below.

```jsx | pure
<Tab>
  <TabPanel title="网图">
    <Graphin data={network} />
  </TabPanel>
  <TabPanel title="树图">
    <Graphin data={tree} />
  </TabPanel>
</Tab>
```

### ⚠️ Layout Plan

In terms of layout, the layout of the tree graphs and the layout of the network graphs are not universal, so a tree graphs with a data structure of `Tree` cannot be specified as a `concentric` layout method. In the same way, a network graphs with a data structure of `Network` cannot specify its layout as `compactBox`.
