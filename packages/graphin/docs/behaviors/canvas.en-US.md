---
title: Canvas interaction
order: 1
group:
  path: /behaviors
  title: Interactive behavior
  order: 3
nav:
  path: /graphin
  order: 1
---

## Usage

```tsx | pure
import React from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const data = Utils.mock(10)
  .random()
  .graphin();

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default () => {
  return (
    <div>
      <Graphin data={data}>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <ActivateRelations trigger="click" />
      </Graphin>
    </div>
  );
};
```

## DragCanvas

> Drag the canvas

<API src='../../src/behaviors/DragCanvas.tsx'>

## ZoomCanvas

Zoom Canvas

<API src='../../src/behaviors/ZoomCanvas.tsx'>

## BrushSelect

brush select the canvas

<API src='../../src/behaviors/BrushSelect.tsx'>

## LassoSelect

lasso select canvas

<API src='../../src/behaviors/LassoSelect.tsx'>

## ResizeCanvas

resize canvas

<API src='../../src/behaviors/ResizeCanvas.tsx'>
