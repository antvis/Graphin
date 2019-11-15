---
title: 快速上手
order: 2
---

## 安装

```bash
$ npm install @antv/graphin --save
```

## 第一个例子

这是一个最简单的 Graphin 组件的在线演示。访问 http://u.ant.design/codesandbox-repro 创建一个 CodeSandbox 的在线示例，别忘了保存以创建一个新的实例。通过 CodeSandbox，我们可以不用去配那些琐碎的 React 脚手架，快速尝鲜。

<iframe
     src="https://codesandbox.io/embed/data-driven-3o71b?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="data-driven"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 01. 渲染数据

Graphin 使用起来就像普通的组件一样，它只有一个必选属性 `data`，内部会对其进行数据校验，data 的数据结构有一定的要求，详情参考：[核心概念/Data 数据驱动](main-concepts/data)

Graphin 提供一个 Mock 函数，帮助我们快速生成一些图数据，让我们试试看吧：

```jsx
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


### 02. 使用布局

Graphin 组件内置了 6 种布局，默认提供布局为 force（力导布局）。我们可以根据自己业务的不同来调整布局。比如，我们希望节点按照同心圆（concentric）排列。让我们来调整上述的代码：

```diff

-  <Graphin data={data} />
+  <Graphin data={data} layout={{name:"concentric"}}/>

```

### 03. 使用组件

Graphin 目前仅提供两个官方组件，Toolbar 和 ContextMenu。关于它们，你们可以在[核心概念/Components 分析组件](main-concepts/components)中得到更详细的介绍，我们以添加组件 `Toolbar` 为例：

-   安装组件，graphin 分析组件发布在单独的 NPM 包 graphin-components 中：

```bash
$ npm install @antv/graphin-components --save
```

-   将组件放在 Graphin 组件内部，这样 `Graphin` 组件可以将 `graph`，`apis` 等属性传递给分析组件：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import './styles.css';

const App = () => {
    const data = Utils.mock(10).graphin();
    return (
        <div className="App">
            <Graphin data={data} layout={{ name: 'concentric' }}>
                <Toolbar />
            </Graphin>
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

这个时候我们再到 CodeSandbox 中去体验下 Toolbar：

-   todo/redo 撤销重做功能
-   zoomIn/out 缩小放大功能
-   fullscreen 全屏功能

### 04. 事件监听

图分析有着非常丰富的事件，如果我们想监听事件，该如何做呢？

-   1. 得到 Graphin 的 Ref 实例
-   2. 使用 G6 的 graph 进行事件监听

```jsx
const App = () => {
    const data = Utils.mock(10).graphin();
    const graphRef = React.createRef(null);
    React.useEffect(() => {
        const { graph } = graphRef.current;
        graph.on('node:click', e => {
            console.log('node:click', e);
        });
    }, []);
    return (
        <div className="App">
            <Graphin data={data} layout={{ name: 'concentric' }} ref={graphRef}>
                <Toolbar />
            </Graphin>
        </div>
    );
};
```

### 05. 总结与引导

通过上面的 4 步，我们基本了解了 Graphin 的全部 4 个核心概念 data、layout、components，events。

关于它们的用法，肯定还有很多同学有疑问，我们试着把这些问题整理归纳，形成一个指引。如果有其他问题，还请大家在 issue 中提出。

-   Data

    -   1. 产生 Data 的 Mock 函数究竟是什么？ --- [核心概念/data 数据驱动](main-concepts/data)
    -   2. 如何根据对设置 Node 的样式
    -   3. 如何自定义 NodeShape？

-   Layout
    -   1. 布局参数 API 在哪里？
    -   2. 布局切换 如何实现？
    -   3. 如何实现一个自定义布局？

-   Components
    -   1. Toolbar/ContextMenu 可以自定义吗？
    -   2. Graphin 未来还会新增哪些组件？都有什么功能？

-   Events
    -   1. 为什么不提供 handleEvents 的回调函数，而要让用户通过 Ref 手动去监听事件？
    -   2. 一共支持哪些事件呢？

当然，还有很多问题，可能属于高级指引范畴，这里就不一一列举，让我们快进入第二个阶段，开发点有趣的功能。

## 开发点有趣的功能

通过上文，聪明的小伙伴已经发现了，Graphin 的设计完全遵照了 React 的编程模型，声明式的完成了从数据到视图的映射。现在让我们一起来开发两个有趣的功能，**_布局切换_** 与 **_节点扩散_**。

### 01. 布局切换

> 同一组数据，改变布局算法会产生不一样的布局效果，从而满足人们的分析需求。

因为 Graphin 是 React 组件，改变 `props.layout` 就能改变视图的布局效果，因此我们只要把多种布局 layouts 组合起来，每次切换改变 `props.layout` 即可。

-   1. 设计布局切换 `LayoutSelector`组件的接口

```tsx
interface Layout {
    name: string;
    options: {
        [key: string]: any;
    };
}
interface LayoutSelectorProps {
    /** 所有的内置布局**/
    layouts: Layout[];
    /** 当前的布局 **/
    value: Layout;
    /** 切换布局的事件 **/
    onChange: (vale: Layout) => void;
}

<LayoutSelector layouts={layouts} value={currentLayout} onChange={handleChange} />;
```

-   2.  内置布局信息 `layouts` 如何获取？

Graphin 提供了很多 API，用于将内部的一些状态或者函数封装给用户使用。内置的布局信息也可通过`apis.getInfo().layouts`获得

-   3.  API 如何获得？

Graphin 提供两种方式获得 apis 接口，第一种是通过组件的 props 传递，即所有包裹在 Graphin 组件内部的组件，都会获得 apis 这个属性。第二种方式是通过 ref 实例，详见[进阶指导/GraphRef](advanced-guides/graphRef)。第一种适用于用户自定义组件，非常方便拿到需要的接口。第二种方式更加灵活，可以在 Graphin 外层使用 Graphin 所提供的信息，常用于复杂场景或者多画布实例的情况下。

-   4. 完整代码如下：

<iframe
     src="https://codesandbox.io/embed/data-driven-3o71b?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="data-driven"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 02.节点扩散

> 将一个节点扩散出它的一度，二度，多度关系，这是非常常用的一种分析手法。

「节点扩散」在图分析中是一个比较典型的功能。常规情况下，在画布中进行节点操作，比如添加节点，删除节点，我们都会考虑很多问题，比如从 1 个节点变为 10 个节点，画布如何变化呢？新增的 9 个节点会放在什么位置呢？使用 Graphin 时，我们就不需要考虑这么多，只需要记住它是数据驱动的，我们不需要关心内部的实现，只需要告诉 Graphin 你需要渲染的数据是什么就可以。增加节点不用使用 `graph.add(node)`，删除节点也不用调用 `graph.remove(node)`，一切都是改变数据 `props.data` 即可。

-   1. 对选中的节点进行数据 Mock。
-   2. Click 事件触发改变 `state.data` 即可。

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
        const onNodeClick = e => {
            console.log('node:click', e);
            setState({
                ...state,
                selected: [e.item.get('model')],
            });
        };
        graph.on('node:click', onNodeClick);
        return () => {
            graph.off('node:click', onNodeClick);
        };
    }, [state]);

    const onExpand = () => {
        const count = Math.round(Math.random() * 40);
        const expandData = Utils.mock(count)
            .expand(startNodes)
            .graphin();
        setState({
            ...state,
            data: {
                // 还需要对Node和Edge去重，这里暂不考虑
                nodes: [...state.nodes, expandData.nodes],
                edges: [...state.edges, expandData.edges],
            },
        });
    };
    return (
        <div className="App">
            <button onClick={onExpand}>Node Expand</button>
            <Graphin data={data} layout={{ name: 'concentric' }} ref={graphRef}>
                <Toolbar />
            </Graphin>
        </div>
    );
};
```

-   4. 完整代码如下：

<iframe
     src="https://codesandbox.io/embed/data-driven-3o71b?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="data-driven"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 03. 总结与引导

以上就是 Graphin 的快速入门指南，相信大家已经看到了 Graphin 的简单易用之处。其实关于 Graphin 的使用，还有可以有很多开脑洞的想法。比如布局和数据一起改变会发生什么？大家不妨自己试试。想要深入地了解 Graphin，可以继续阅读 [核心概念]() 和 [进阶指导]() 两部分的内容
