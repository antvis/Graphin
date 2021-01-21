---
title: Legend
group:
  path: /mark
  title: Labeling Component
nav:
  title: Components
  path: /components
  order: 1
---

# Legend

Legend is a common graph analysis companion component, which usually colors nodes and edges after categorizing them to facilitate interactive analysis by users. Clicking on a legend results in two behaviors: highlighting, which highlights the node corresponding to the selected legend; and filtering, which hides the unselected nodes.

## Features

- Support user-defined legend color mapping
- Two modes while clicking: highlighting and hiding

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

- Graphin's current legend：https://graphin.antv.vision/zh/examples/components/legend

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Legend } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Legend />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
