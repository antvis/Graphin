## @antv/graphin

`@antv/graphin` 是图分析工具的内核，它是一个基于 g6 封装的 React 组件。

## 安装

```bash

npm install @antv/graphin --save

```

## 用法

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import './styles.css';

const App = () => {
    const data = Utils.mock(10).graphin();
    return (
        <div className="App">
            <Graphin data={data} />
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## API

参考官网:[API 文档](https://antvis.github.io/graphin/zh/docs/api/graphin)

## 快速开始

参考官网[快速开始](https://antvis.github.io/graphin/zh/docs/manual/getting-started)
