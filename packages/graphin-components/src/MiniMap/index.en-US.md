---
title: MiniMap
group:
  path: /interaction
  title: Interactive Component
nav:
  title: Components
  path: /components
  order: 1
---

# MiniMap

MiniMap is a common interactive component that allows users to see where the content of the current canvas is located globally. Allows for quick preview and exploration on large graphs.

## Features

- MiniMap should be based on G6.MiniMap which can be injected through the component internal didmount during addPlugins
- Supports custom style and position

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const data = Utils.mock(10).graphin();
const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <MiniMap styles={} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```