---
title: FindPathPanel
group:
  path: /analysis
  title: Analytical Component
nav:
  title: Components
  path: /components
  order: 1
---

# FindPathPanel

FindPathPanel is an algorithmic analysis component. The user flow is as follows:

1. When two nodes are selected, the component will light up prompting the user to open the panel.
2. In the panel, the two selected nodes will be used as source and target nodes (with an arrow button to switch the starting and ending directions, similar to a flights search application)
3. A list of paths between the two points will appear below, with the first path in the list being the shortest path, and the rest of the paths sorted by the number of nodes in the path in descending order

## Features

- FindPathPanel automatically detects when 2 nodes are selected to prompt the user that a path finding analysis can be carried out
- The APIs for the various path finding algorithms are provided by graphin.graph

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { FindPathPanel } from '@antv/graphin-components';
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const { BreathingLamp } = FindPathPanel;

const App = () => {
  const handleCloseCallback = () => {};

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <FindPathPanel onClose={handleCloseCallback} />
        <Toolbar>
          <Toolbar.Item>
            <BreathingLamp />
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
