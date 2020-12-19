---
title: MapMode
group:
  path: /special
  title: Advanced Analytical Component
nav:
  title: Components
  path: /components
  order: 1
---

# MapMode

MapMode allows overlaying a graph on top of a map. Can consider splitting it as a separate packages/graphin-geospatial when the function is completed.

## Features

- MapMode underlying dependencies on @antv/L7, geographic and relational data need to be adapted
- Freely switches between map mode and relational canvas mode

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { MapMode } from '@antv/graphin-components';
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <MapMode></MapMode>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

```

```
