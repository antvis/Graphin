---
title: Statistic
group:
  path: /mark
  title: Labeling components
nav:
  title: Components
  path: /components
  order: 1
---

# Statistic

Similar to antd's [Statistic Component](https://ant.design/components/statistic/), this component allows for displaying real-time statistics on canvas nodes.

## Features

- Basic functions
  - Count the number of nodes and edges of the current canvas
- Advanced functions
  - In iterative layout (e.g. force-directed layout), layout time and progress can also be provided
  - For use cases which involves larger graph objects, it is also necessary to monitor the browser's memory, network and other system information.

## Reference

![GraphStudio Design](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xiXPRJAq3S4AAAAAAAAAAAAAARQnAQ)

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Statistic } from '@antv/graphin-components';
// Do not forget to import CSS
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <Statistic />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
