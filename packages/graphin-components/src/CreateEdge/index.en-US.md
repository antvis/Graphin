---
title: CreateEdge
group:
  path: /interaction
  title: Interactive Component
nav:
  title: Components
  path: /components
  order: 1
---

# CreateEdge

The CreateEdge edge builder is a common interactive component. For example, it is used when creating a UML diagram model to connect the nodes. The general user flow is as follows:

1. Click on the button of the Edit icon to activate the edge build mode
2. When the mouse hovers over the node, a + sign indicates that the node can be connected.
3. Click on another node to create an edge.

The whole process can be seen in G6's create-edge implementation: https://g6.antv.vision/en/examples/interaction/createEdge#click

## Features

- CreateEdge is a container component, which takes `edit-icon` as a child. On click, it activates the edge building mode
- Good UI/UX by default including mouse hover state, mouse indication style, global state hint, etc.
- Takes a callback function: onChange which passes the latest canvas data and allows the user to synchronize it with Graphin.props.data

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { CreateEdge } from '@antv/graphin-components';

const { BreathingLamp } = CreateEdge;

const App = () => {
  const handleChange = (value: GraphData) => {};

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        /** Can be included in the Toolbar **/
        <Toolbar>
          <Toolbar.Item>
            <CreateEdge onChange={handleChange}>Create Relationship</CreateEdge>
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
