---
title: Basic introduction
order: 0
group:
  path: /behaviors
  title: Interactive behavior
  order: 3
nav:
  path: /graphin
  order: 1
---

## Basic Usage

The interaction behaviors in Graphin are all composable, such as the built-in `DragCavans`, `ZoomCanvas`, and `SelectClick` components. Because the interactions are all asynchronous, the components implement the atomic operations of addBehaviors and removeBehaviros. The default interaction behavior is available out of the box and can be imported on demand via `import {Behaviors} from'@antv/graphin'`.

The Props API of each interactive component is completely consistent with [G6's defaultBehaviros](https://g6.antv.vision/zh/docs/manual/middle/states/defaultBehavior). You can view it in the documents of [Node Interaction](/graphin/behaviors/node) and [Canvas Interaction](/graphin/behaviors/canvas)

```tsx | pure
import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const data = Utils.mock(10)
  .random()
  .graphin();

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default () => {
  return (
    <div>
      <Graphin data={data}>
        <ZoomCanvas enableOptimize />
        <DragNode disabled />
      </Graphin>
    </div>
  );
};
```

## Typescript Friendly

![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xpoaRpOGme4AAAAAAAAAAAAAARQnAQ)

## Built-in Interactive Behavior

> Not all interactive behaviors need to be manually introduced by the user. Therefore, Graphin has 9 built-in interactive behaviors. We consider these interactive behaviors to be the basic interaction requirements of graph analysis products, so we choose to build them.

```jsx | pure
<>
  {/* drag the canvas */}<DragCanvas />
  {/* zoom the canvas */}<ZoomCanvas />
  {/* drag node */}<DragNode />
  {/* drag combo */}<DragCombo />
  {/* click node */}<ClickSelect />
  {/* brush select nodes */}<BrushSelect />
  {/** resize canvas */}<ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />
  {/** hovering node**/}<Hoverable bindType="node" />
</>
```

<code src='./demos/index.tsx'>

## Disable The default interactive behavior

The built-in interactive component is a singleton mode. Therefore, we only need to import the interactive components that need again, and then manually set it to `disabled`. As in the example below, turn off the default `canvas zoom` and `node dragging` behaviors

<code src='./demos/disabled.tsx'>

## The optional interactive behavior

> For non-high-frequency interactive behaviors, Graphin encapsulates these for users to introduce on demand. Tips 💡: Click to jump to the corresponding document to see more

- Association highlighting interaction: [`<ActivateRelations />`](/graphin/behaviors/node#activaterelations)
- Fitview viewpoint interaction: [`<FitView />`](/graphin/behaviors/canvas#fitview)
- Font loading rendering: [`<FontPaint />`](/graphin/behaviors/node#fontpaint)
- Tree graph expand and collapse: [`<TreeCollapse />`](/graphin/behaviors/node#treecollapse)
