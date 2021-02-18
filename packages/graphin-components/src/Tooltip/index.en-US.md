---
title: Tooltip
order: 1
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

## Built-in Components

<code src='./demos/index.tsx'>

<API src='./index.tsx'>
<API src='./Node.tsx'>
<API src='./Edge.tsx'>

## Custom Component: Popover component integrated with Antd

<code src='./demos/Antd.tsx' />

## ⚠️: Popover component integrated with Antd, unable to listen to ContextMenu event

Because we integrate Antd's Popover component, we need a triggered DOM, and the triggered DOM happens to cover the node. Therefore, when we introduce Graphin's ContextMenu component, there is no way to listen to the'node:contextmenu' event. The temporary solution is as follows: in the AntdTooltip component, listen to the `onContexmenu` event that triggers the DOM, and customize the ContextMenu

<code src='./demos/AntdWithContextMenu.tsx' />

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

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Tooltip.Node>
          {e => {
            return <CustomContent>{e.item.getModel().name}</CustomContent>;
          }}
        </Tooltip.Node>

        <Tooltip.Edge>
          {e => {
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
