---
title: TableMode
group:
  path: /analysis
  title: Analysis package
nav:
  title: Components
  path: /components
  order: 1
---

# TableMode

TableMode displays nodes and edges properties in a table to complement the existing graph display.

## Features

- TableMode's data source should be consistent with Graphin.props.data and rendered as tables

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

- ![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*iNtkTIpsuKYAAAAAAAAAAAAAARQnAQ)

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { TableMode } from '@antv/graphin-components';
// Do not forget to import CSS

const data = Utils.mock(10).graphin();
const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <TableMode data={data} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
