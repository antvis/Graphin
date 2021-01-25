---
title: ContextMenu
order: 0
group:
  path: /interaction
  title: Interactive Component
nav:
  title: Components
  path: /components
  order: 1
---

# ContextMenu

ContextMenu is a right-click menu, usually for further operations on nodes. For example - node copy, delete, reverse selection, etc. More advanced operations can be supported such as marking a node, data analysis, diffusion of relationship, or sending a data request based on the selected node information. The right-click menu for a graph analysis tool is similar to the right-click menu of the browser webpage in interaction and display form, but it can also display other special designs such as a dashboard-shaped menu.

## Features

- As a container component, ContextMenu controls the positioning and event handling of internal components
- Internal display components with two optional preset styles - Menu and Donut style
- Support for user-defined sub-menu components

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
// Do not forget to import CSS
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';
const { Menu, Donut } = ContextMenu;

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <Menu.Item>menu item</Menu.Item>
        </ContextMenu>
      </Graphin>

      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <Donut.Item>donut item</Donut.Item>
        </ContextMenu>
      </Graphin>

      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <CustomContent>custom content</CustomContent>
        </ContextMenu>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
