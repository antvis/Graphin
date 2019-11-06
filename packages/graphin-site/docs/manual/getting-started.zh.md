---
title: 快速上手
order: 2
---

## 安装

```bash

npm install @antv/graphin --save

```

## 用法

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';

const SimpleDemo = () => {
    const data = Utils.mock(10).circle('node-0');
    return <Graphin data={data}></Graphin>;
};

ReactDOM.render(<SimpleDemo />, document.getElementById('root'));
```
