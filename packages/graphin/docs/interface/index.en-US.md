---
title: Interface
order: 1
group:
  path: /quick-start
  title: Quick start
  order: 2
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## How to use Graphin

The most basic role of Graphin is the React component. The following table is the interface description of `<Graphin />`.

| Property name    | type                | Default value         | Description                                                                                                                                                      |
| ---------------- | ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | `GraphinProps.data` | `-`                   | [Data Structure](/en-US/graphin/render/data)                                                                                                                     |
| layout           | `Layout`            | `{type:"grid"}`       | [Set Layout](/en-US/graphin/layout/layout)                                                                                                                       |
| theme            | `ThemeType`         | `{mode:"#light",...}` | [Set theme](/en-US/graphin/render/theme#api)                                                                                                                     |
| ref              | `ReactRef`          | `-`                   | Graphin component Ref                                                                                                                                            |
| width            | `number`            | `-`                   | Graphin canvas width, it is recommended to set the width through the parent element container, the default width is 100%                                         |
| height           | `number`            | `-`                   | Graphin canvas height, it is recommended to set the width through the parent element container, the default minHeight is 500px                                   |
| modes            | `G6.Modes`          | `-`                   | Recommended use [Behaviors](/en-US/graphin/behaviors/behaviors)                                                                                                  |
| plugins          | `G6.Plugins`        | `-`                   | Recommended [Components](/en-US/components/built-in/context-menu)                                                                                                |
| defaultNode      |                     |                       | Default style configuration of node                                                                                                                              |
| defaultEdge      |                     |                       | Default edge style configuration                                                                                                                                 |
| defaultCombo     |                     |                       | Combo's default style configuration                                                                                                                              |
| nodeStateStyles  |                     |                       | Node style configuration in different states                                                                                                                     |
| edgeStateStyles  |                     |                       | Edge style configuration in different states                                                                                                                     |
| comboStateStyles |                     |                       | Combo style configuration in different states                                                                                                                    |
| fitView          | `boolean`           | false                 | Whether to enable canvas adaptation. The image automatically adapts to the canvas size after opening                                                             |
| fitCenter        | `boolean`           | false                 | After opening, the graph will be translated, the center of the graph will be aligned to the center of the canvas, but not zoomed. Priority is lower than fitView |
| fitViewPadding   | `number[]`          | [0,0]                 | Take effect when fitView is true. When the figure adapts to the canvas, specify the space around it                                                              |
| minZoom          | `number`            | 0.2                   | Minimum zoom ratio                                                                                                                                               |
| maxZoom          | `number`            | 10                    | Maximum zoom ratio                                                                                                                                               |
| enabledStack     | `boolean`           | false                 | Whether to enable stack, that is, whether to enable redo & undo function                                                                                         |
| maxStep          | `number`            | 10                    | redo & undo maximum number of steps, only works when enabledStack is true                                                                                        |

## How to use the graph instance in Graphin

### 01. Get through Ref

```jsx | pure
import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const Demo = () => {
  const graphinRef = React.createRef();

  React.useEffect(() => {
    const {
      graph, // Graph instance of g6
      apis, // API interface provided by Graphin
    } = graphinRef.current;
    console.log('ref', graphinRef, graph, apis);
  }, []);

  return (
    <div className="App">
      <Graphin data={data} ref={graphinRef}></Graphin>
    </div>
  );
};
export default Demo;
```

### 02. Get through GraphinContext

```jsx | pure
import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const CustomComponents = () => {
  // As long as the components wrapped in Graphin, you can obtain graph instances and apis provided by Graphin through Context
  const { graph, apis } = React.useContext(GraphinContext);
  return null;
};

const Demo = () => {
  return (
    <div className="App">
      <Graphin data={data} ref={graphinRef}>
        <CustomComponents />
      </Graphin>
    </div>
  );
};
export default Demo;
```

## the instance of G6 graph

> Refer to the instance of G6 graph: https://g6.antv.vision/en/docs/api/graphFunc/get_set

The commonly used methods are as follows:

- [Viewport Operation](https://g6.antv.vision/en/docs/api/graphFunc/transform)
- [Element Operation](https://g6.antv.vision/en/docs/api/graphFunc/item)
- [Find element](https://g6.antv.vision/en/docs/api/graphFunc/find)
- [Element State](https://g6.antv.vision/en/docs/api/graphFunc/state)
- [Event Binding](https://g6.antv.vision/en/docs/api/graphFunc/on_off)
- [Layout](https://g6.antv.vision/en/docs/api/graphFunc/layout): Note ⚠️: The layout algorithm in Graphin is the same as G6, but the layout process is not the layout process of G6, so about the layout The interface operation is temporarily unavailable and will be compatible in the future.
- [Graph calculation related](https://g6.antv.vision/en/docs/api/graphFunc/calculation)
- [Add watermark](https://g6.antv.vision/en/docs/api/graphFunc/watermarker)
- [Export Picture](https://g6.antv.vision/en/docs/api/graphFunc/download)

## Graphin built-in interface: apis

> In the future iterations of Graphin versions, commonly used interfaces will be aggregated on the upper layer of Graphin.

<API src='./apis.ts'>
