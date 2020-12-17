---
title: FishEye
group:
  path: /interaction
  title: Interactive Component
nav:
  title: Components
  path: /components
  order: 1
---

# FishEye

FishEye Magnifier, a common graph analysis companion component is used to enlarge local details and is very useful when the graph has many nodes and edges.

## Features

- Support for all G6.FishEye capabilities
- Support all keyboard and mouse events to activate the fisheye magnifier
- Easily integrated into the Toolbar component

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { FishEye } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <FishEye />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
