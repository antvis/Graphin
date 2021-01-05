## @antv/graphin-icons

[中文](./README-cn.ZH.md)

Graphin's font icons

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

// font icon
import fontLoader from '@antv/graphin-icons';
import '@antv/graphin-icons/dist/index.css';

/** 加载 font icons **/
Graphin.registerIcon('graphin', fontLoader);
const data = Utils.mock(10).graphin();

data.nodes.forEach((node) => {
  node.style.icon = {
    fontFamilay: 'graphin',
    value: 'eye',
  };
});

const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <Toolbar />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
