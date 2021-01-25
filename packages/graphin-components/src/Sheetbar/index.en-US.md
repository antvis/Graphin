---
title: Sheetbar
group:
  path: /analysis
  title: Analytical Component
nav:
  title: Components
  path: /components
  order: 1
---

# Sheetbar

Multi-canvas mode, similar to excel sheet tabs, supports multi-canvas operations and secondary analysis for users.

## Features

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Sheetbar } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  return (
    <div className="App">
      <Sheetbar>
        <Sheetbar.Item>
          <Graphin data={Utils.mock(10).graphin()}></Graphin>
        </Sheetbar.Item>
        <Sheetbar.Item>
          <Graphin data={Utils.mock(4).graphin()}></Graphin>
        </Sheetbar.Item>
      </Sheetbar>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
