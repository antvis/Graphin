---
title: EdgeBundling 边绑定
group:
  path: /analysis
  title: 分析组件
nav:
  title: 分析组件
  path: /components
  order: 1
---

# EdgeBundling

<code src='./demos/index.tsx'>

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { EdgeBundling } from '@antv/graphin-components';

const App = () => {
  const handleCloseCallback = () => {};

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <EdgeBundling />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
