---
title: Tooltip
group:
  path: /interaction
  title: Interaction Component
nav:
  title: Components
  path: /components
  order: 1
---

# Tooltip

Tooltip is an interactive component for quickly accessing nodes or edges information. By hovering over a node or edge, a display box appears with detailed information about an element. The tooltip disappears on mouse leave.

## Features

- Tooltip is a container component that provides a callback function with coordinate positioning to internal components, with possibly two variants depending on whether a Node or Edge is hovered over.
- Display contents are completely user-defined

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Tooltip.Node>
          {(e) => {
            return <CustomContent>{e.item.getModel().name}</CustomContent>;
          }}
        </Tooltip.Node>

        <Tooltip.Edge>
          {(e) => {
            return <CustomContent>{e.item.getModel().name}</CustomContent>;
          }}
        </Tooltip.Edge>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
