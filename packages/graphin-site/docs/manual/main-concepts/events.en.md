---
title: Events
order: 3
---

## Definition of event

Our interaction on the graph will actually trigger the event. For example, when the window is zoomed out, Graphin will automatically update the width and height of the canvas. when the canvas is zoomed out, only KeyShape is reserved by default.

We can monitor events through the G6 API.

## Supported events

The combined event name is a combination of `element` and `event`. For example, `node:click` indicates the click event of the node. common events are as follows:

|   element               | event                         | combined event name                                               |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| node / edge / canvas | click （click event）           | `node:click`, `edge:click`, `canvas:click`                 |
| node / edge / canvas | dblclick （double click event）        | `node:dblclick`,`edge:dblclick`,`canvas:dblclick`          |
| node / edge / canvas | contextmenu （right-click event） | `node:contextmenu`,`edge:contextmenu`,`canvas:contextmenu` |

For more events, please refer to G6's [Events API] (https://www.yuque.com/antv/g6/event-api)

## Usage of event 

We use graphRef to get a Graph instance of G6 and monitor events on the Graph. For example, the following code, we want to store the clicked nodes:

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
