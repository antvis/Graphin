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

`<Tooltip/>` is a tooltip container, providing information such as position, trigger element, callback function, etc., which can be obtained by the user through `context`. How to render is completely handed over to the user, and the official `<Tooltip.Node />` component is also provided for quick use. The user can customize the content of the display.

<code src='./demos/index.tsx'>
<API src='./index.tsx'>

## Custom Component: Popover component integrated with Antd

<code src='./demos/Custom.tsx' />

## ⚠️: Popover component integrated with Antd, unable to listen to ContextMenu event

Integrating the Popover component of Antd requires a triggered DOM, and the triggered DOM happens to cover the node. Therefore, our components `<ContextMenu />`, `<DragNode />`, etc. cannot trigger node events, which will lead to failure. The official built-in is recommended `<Tooltip pleacement='top' hasArrow/>` to use

<code src='./demos/Antd.tsx' />

## Features

- Tooltip is a container component that provides a callback function with coordinate positioning to internal components, with possibly two variants depending on whether a Node or Edge is hovered over.
- Display contents are completely user-defined

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.
