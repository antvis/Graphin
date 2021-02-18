---
title: Legend
group:
  path: /mark
  title: Labeling Component
  order: 1
nav:
  title: Components
  path: /components
  order: 1
---

# Legend

Legend is a common graph analysis companion component, which usually colors nodes and edges after categorizing them to facilitate interactive analysis by users. Clicking on a legend results in two behaviors: highlighting, which highlights the node corresponding to the selected legend; and filtering, which hides the unselected nodes.

<code src='./demos/index.tsx'>

## Usage

`<Legend />` has a built-in `<Legend.Node />` component to process the display style and interactive style of the legend.

```tsx | pure
<Graphin data={data}>
  <Legend bindType="node" sortKey="data.type" colorKey="style.keyshape.stroke">
    <Legend.Node />
  </Legend>
</Graphin>
```

<API src='./demos/index.tsx'>
<API src='./Node.tsx'>

## customize

Legend has a built-in `<Legend.Node />` component to handle the display style and interactive style of the legend. Users can completely define their own `<Legend.Node />` component to achieve the purpose of customization. You can customize the style or the interaction name.

<code src='./demos/custom.tsx'>

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
