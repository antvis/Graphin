---
title: Tree Graph layout
order: 2
group:
  path: /layout
  title: Layout Plan
  order: 2
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## Quick To Use

The usage of the tree graph layout is very simple, just specify `<Graphin layout={{type:"xxx"}} />`. At the same time, you must ensure that the data of `props.data` is `Tree`

```jsx | pure
import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

// Mock tree graph data
const data = Utils.mock(10)
  .tree()
  .graphinTree();

export default () => {
  return <Graphin data={data} layout={{ type: 'compactBox' }}></Graphin>;
};
```

## Layout Preview

The following are the 10 built-in network graph layouts of Graphin based on the G6 layout, sorted by the frequency of usage scenarios as follows.

> Note ⚠️: The following data are all from the same data, so the difference between some layouts may not be so big. In a real business scenario, the effect of matching the data with a suitable layout will be obvious. At the same time, for the convenience of browsing, the zoom function of the canvas is cancelled. , You can click on the icon `</>` at the bottom right corner to expand and view the detailed code
> <code src='./index.tsx'>
