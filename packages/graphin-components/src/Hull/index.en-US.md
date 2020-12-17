---
title: Hull
group:
  path: /mark
  title: Labeling Component
nav:
  title: Components
  path: /components
  order: 1
---

# Hull

Hull, a common graph analysis component, which allows contour wrapping of nodes belonging to a group, so as to visually distinguish the grouping, while preserving the original node layout. It is an efficient and simple analysis component.

## Features

- Consistent with G6 Hull technical implementation.
- Support for multiple contours
- Support for user-defined styles

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Hull } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  const hullOptions = [
    {
      members: ['node-1', 'node-2'], // Required
    },
    {
      members: ['node-4', 'node-5'],
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    },
  ];
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()} layout={layout}>
        <Hull options={hullOptions} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```