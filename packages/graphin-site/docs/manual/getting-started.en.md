---
title: Getting Started
order: 2
---

## Install

```bash
$ npm install @antv/graphin --save
```

## First Example

Here is a simple example to show the usage of Graphin. Visit http://u.ant.design/codesandbox-repro to create a codesandbox. Don't forget to press the save button.

<iframe
     src="https://codesandbox.io/embed/data-driven-3o71b?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="data-driven"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 01. Rendering data 

There is no difference between Graphin and typical React components. It has a required props `data` which will be checked internally. There are some requirements of data. For details, see: [Main Concepts/Data].

Graphin provides a Mock function to help us generate some graph data quickly, let us have a try:

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

### 02. Using layout

There are six built-in layouts in Grapnin, and the default is force (force layout). We can switch the layout according to our needs.

For example, we want nodes to be arranged in a concentric order:

```diff

-  <Graphin data={data} />
+  <Graphin data={data} layout={{name:"concentric"}}/>

```

### 03. Using components

Graphin provides two official components, Toolbar and ContextMenu. you can get more detail about them in the [Main-concepts/Components].

we take Toolbar as an example:

-   Install component. Analysis components of graphin are published as package graphin-components.

```bash
$ npm install @antv/graphin-components --save
```

-   Place Toolbar component inside Graphin component so that Graphin can pass properties such as graph, apis, etc. to the Toolbar:

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

we can experience Toolbar component in codesandbox:

-   todo/redo
-   zoomIn/out
-   fullscreen

### 04. Monitoring event 

There are a lot of events in Graph analysis. If we want to monitor events, what should we do?

-   1. get Ref of Graphin
-   2. Use graph instance of G6 to monitor events

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

### 05. Summary and guidance

Through the above 4 steps, we have a knowledge of all four core concepts of Graphin: data, layout, components, and events.

As for their usage, there are certainly many students who have doubts. We try to sort out these issues and form a guide. If you have other questions, please ask in the issue.

-   Data

    -   1. what is the mock function？ --- [Main concepts/data Data](main-concepts/data)
    -   2. How to set the style of Node?
    -   3. How to customize NodeShape?

-   Layout

    -   1. How to get layout parameters？
    -   2. How to switch Layout?
    -   3. How to implement a custom layout?

-   Components

    -   1. Can Toolbar/ContextMenu be customized?
    -   2. What components will Graphin add in the future? What are the features?

-   Events
    -   1. Why not provide a callback function for handleEvents, but let the user manually monitor events via Ref?
    -   2. What events do Graphin support in total?

Of course, there are still many problems, which may belong to the high-level guidelines. I will not list them here. Let us enter the second stage and develop some interesting features.

## more features

Through the above, we can know that design of Graphin fully complies with React's programming model and completes the mapping from data to view declaratively. Now let's develop two interesting features together, **_layout switch_** and **_node spread_**.

### 01. Switching layout

> The change of layout will lead to different layout effects to meet people's analytical needs with the same data.


Graphin is a React component, the change of  `props.layout` will lead to diffrent layout effect, so we need to combine layouts and change `props.layout` every time.

-   1. Interface of `LayoutSelector` component

```tsx
interface Layout {
    name: string;
    options: {
        [key: string]: any;
    };
}
interface LayoutSelectorProps {
    /** all built-in layouts**/
    layouts: Layout[];
    /** current layout **/
    value: Layout;
    /** events of switching layout **/
    onChange: (vale: Layout) => void;
}

<LayoutSelector layouts={layouts} value={currentLayout} onChange={handleChange} />;
```

-   2. How to get Built-in layout information

Graphin provides a number of APIs to the user which are some internal states or functions. Built-in layout information is also available via `apis.getInfo().layouts`.

-   3.  How to get API?

Graphin provides two ways to get the apis interface. The first is to pass the component's props, that is, all the components wrapped inside the Graphin component will get the apis property. The second way is through the ref instance, see [Advanced Guide/GraphRef] (advanced-guides/graphRef). The first one is suitable for user-defined components, so it is very convenient to get the required interface. The second way is more flexible, and you can use the information provided by Graphin in the outer layer of Graphin, which is often used in complex scenes.

-   4. The complete code is as follows:

<iframe
     src="https://codesandbox.io/embed/layout-selector-k16mh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="layout-selector"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

### 02.Node Diffusion

> Spreading a node out of its one-degree, second-degree, and multi-degree relationship is a very common analytical technique.

Node Diffusion" is a typical function in graph analysis. Under normal circumstances, node operations in the canvas, such as adding nodes, deleting nodes, we will consider many problems, such as changing from 1 node to 10 nodes, how does the canvas change? Where will the new 9 nodes be placed? When using Graphin, we don't need to think about it. Just remember that it is data-driven. We don't need to care about the internal implementation. Just tell Graphin what data you need to render. Adding nodes does not use `graph.add(node)`, deleting nodes does not need to call `graph.remove(node)`, everything is changed data `props.data`.

- 1. Perform a data mock on the selected node.
- 2. The Click event triggers a change to `state.data`.

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

-   4. The complete code is as follows:

<iframe
     src="https://codesandbox.io/embed/icy-snow-grltv?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="nodeExpand"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

### 03. Summary and guidance

These are the quick start guides for Graphin. I believe you have seen the ease of use of Graphin. In fact, there are a lot of ideas about the use of Graphin. For example, what happens when the layout and data change together? You can have a try. if you want to get a deeper understanding of Graphin, you can continue to read the contents of [main-concepts]() and [advanced guides]().
