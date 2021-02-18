---
title: UndoRedo
group:
  path: /interaction
  title: Interactive components
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# UndoRedo

UndoRedo provides data storage capabilities, and can easily implement Todo and Undo product capabilities, so that the entire analysis process is operationally fault-tolerant. The business layer can also add a special business strategy to cancel the rollback on this component

## Features

- UndoRedo has built-in state, which can monitor Graphin's built-in events to store the required data
- The instance provides undo and todo atomic APIs, which can be easily operated by users

## Reference

> Welcome github partners to discuss design and component solutions, open source and co-construct.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { UndoRedo, Toolbar } from '@antv/graphin-components';

const App = () => {
  const historyRef = React.createRef();

  const handleTodo = () => {
    historyRef.current.todo();
  };
  const handleUndo = () => {
    historyRef.current.undo();
  };

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <UndoRedo ref={historyRef} />
        <Toolbar>
          <Toolbar.Item onClick={handleTodo}>todo</Toolbar.Item>
          <Toolbar.Item onClick={handleUndo}>undo</Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
