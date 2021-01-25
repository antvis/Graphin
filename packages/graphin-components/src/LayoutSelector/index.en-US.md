---
title: LayoutSelector
group:
  path: /analysis
  title: Analytical Component
nav:
  title: Components
  path: /components
  order: 1
---

# LayoutSelector

LayoutSelector is a common graph analysis component that switches the type of layout and supports user-defined parameters in order to achieve the best layout effect.

## Features

- Support layout switching
- Support user-defined configuration parameters

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

- ![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*cMRqTbym2dcAAAAAAAAAAAAAARQnAQ)

## Usage

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { LayoutSelector } from '@antv/graphin-components';
// Do not forget to import CSS
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  const [layout, setLayout] = React.useState({ name: 'force', options: {} });
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()} layout={layout}>
        <LayoutSelector value={layout} onChange={setLayout} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
