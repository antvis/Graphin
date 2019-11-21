---
title: Events 事件响应
order: 3
---

## 事件的定义

我们在图上的交互行为，其实都会触发事件，比如窗口缩放时，Graphin 会自动更新画布的宽高。又比如画布缩放时，默认只保留 KeyShape。

我们可以通过 G6 的 API 来对事件进行监听。

## 支持的事件

graph 监听的名称是由 `元素 : 事件` 的方式组合而成的，例如`node:click`则表示节点的点击事件。常见的事件如下

|   元素               | 事件                         | 组合的事件名                                               |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| node / edge / canvas | click （点击事件）           | `node:click`, `edge:click`, `canvas:click`                 |
| node / edge / canvas | dblclick （双击事件）        | `node:dblclick`,`edge:dblclick`,`canvas:dblclick`          |
| node / edge / canvas | contextmenu （右键菜单事件） | `node:contextmenu`,`edge:contextmenu`,`canvas:contextmenu` |

更多事件，请参考 G6 的 [Events API](https://www.yuque.com/antv/g6/event-api)

## 事件的用法

我们使用 graphRef 获得 G6 的 Graph 实例，在 Graph 上监听事件。比如下列代码，我们希望将点击的节点存储起来：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';

const App = () => {
    const [state, setState] = React.useState({
        selected: [],
        data: Utils.mock(10).graphin(),
    });
    const { data, selected } = state;
    const graphRef = React.createRef(null);
    React.useEffect(() => {
        const { graph } = graphRef.current;
        const handleNodeClick = e => {
            console.log('node:click', e);
            setState({
                ...state,
                selected: [e.item.get('model')],
            });
        };
        graph.on('node:click', handleNodeClick);
        return () => {
            // 如果是每次渲染，那就需要解绑事件
            graph.off('node:click', handleNodeClick);
        };
    }, [state]);

    return (
        <div className="App">
            <Graphin data={data} layout={{ name: 'concentric' }} ref={graphRef}></Graphin>
        </div>
    );
};
```
