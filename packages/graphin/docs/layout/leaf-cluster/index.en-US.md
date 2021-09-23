---
title: Clustering leaf nodes by type
group:
  path: /layout
  title: Layout Plan
  order: 9
nav:
  path: /graphin
  order: 2
---

## Clustering leaf nodes by type

`Clustering leaf nodes by type` means that when the layout is graphin-force, leaf nodes can be displayed in clusters according to the `node type`. It is mainly used in the scenario of `continuous analysis and exploration` to solve the problems of Chaotic Node arrangement caused by expanding the one-time relationship of a node (the node arrangement of graphin-force layout is scattered in disorder), unclear and difficult to find effective information, etc; Clustering and heap displaying the one-degree nodes diverging from the same central node by type can help the business see clearly and quickly.

The underlying algorithm is to configure the graphin-force layout `centripetaloptions`, apply `different centripetal forces to different types of nodes and set different centers`, so as to gather the nodes associated with the same type of nodes together. Compared with the ordinary global clustering algorithm, the leaf nodes are grouped without destroying the overall layout of graphin force, which is visually more convenient to distinguish types and will not disturb the display of edges.

## Quick use
The use of `Clustering leaf nodes by type` is very simple. You only need to configure `leafcluster`, `nodeclusterby` and `clusterNodeStrength`  in graphin-force.

```jsx | pure
import React, { useEffect, useState } from 'react';
import Graphin from '@antv/graphin';

export default () => {
  const layout = {
    type: 'graphin-force',
    animation: false,
    preset: {
      type: 'concentric', // preset layout of graphin-force
    },
    leafCluster: true, // Whether leaf nodes need to be clustered by type
    clusterBy: 'cluster', // Mapping fields for clustering
    clusterNodeStrength: 8, // Node clustering force coefficient
  };
  return <Graphin data={data} layout={layout} />;
};
```

## Use example
For the convenience of distinguishing clustering effect, nodes of the same type are mapped into one color.
- **Simple data Scene Effect Comparison**
<code src='./demos/simple.tsx'>

- **Complex data Scene Effect Comparison**
<code src='./demos/complex.tsx'>

