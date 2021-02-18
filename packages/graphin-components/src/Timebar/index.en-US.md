---
title: Timebar
group:
  path: /special
  title: Advanced Analytical
nav:
  title: Components
  path: /components
  order: 1
---

# Timebar

Timebar is a common analysis component that analyzes graph data in a temporal dimension. Its interaction and usage scenarios can be further explored.

## Features

- Timebar component can be derived from G6.Timebar or other custom component
- Main focus is on ease of use and allowing Timebar events to interact with Graphin's canvas

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Timebar } from '@antv/graphin-components';
// Do not forget to import CSS

const data = Utils.mock(10).graphin();
const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <Timebar data={data} onChange={} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
