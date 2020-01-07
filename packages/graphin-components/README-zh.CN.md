## @antv/graphin-components

[English](./README.md)

这是 Graphin 的辅助分析 React 组件库。Graphin 是基于 [G6 3.x](https://github.com/antvis/g6) 的图分析解决方案。

主要包括：

-   Toolbar 工具栏
-   ContextMenu 右键菜单
-   更多组件开发中...

## 安装

```bash

npm install @antv/graphin-components --save

```

UMD 格式的文件可以在 [releases](https://github.com/antvis/Graphin/releases) 中下载。外部依赖：react，react-dom，antd。

## 使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

// 别忘了引入 CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
    const data = Utils.mock(10).graphin();
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

## 文档

请参考 [Graphin 文档-分析组件](https://graphin.antv.vision/zh/docs/manual/main-concepts/components)

## APIs

请参考[Graphin 分析组件 API 文档](https://graphin.antv.vision/zh/docs/api/components)
