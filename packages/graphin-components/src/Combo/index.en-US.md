---
title: Combo
group:
  path: /mark
  title: Labeling Component
nav:
  title: Components
  path: /components
  order: 1
---

# Combo

Combo, a very practical graph analysis component that can be used with other components to support more complex functions, such as: graph layout with node grouping, nested grouping, etc.

## Demo

<code src='./demos/Simple.tsx'></code>

<API src='./index.tsx'></API>

## Features

- Consistent with G6 Combo technical implementation.
- Support for multiple contours
- Support for user-defined styles

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Combo } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  const comboOptions = [
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
        <Combo options={comboOptions} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
