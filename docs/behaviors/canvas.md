---
title: 画布交互
order: 1
group:
  path: /behaviors
  title: 交互行为
  order: 3
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 用法

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

## DragCanvas 拖拽画布

<API src='../../src/behaviors/DragCanvas.tsx'>

## ZoomCanvas 缩放画布

<API src='../../src/behaviors/ZoomCanvas.tsx'>

## BrushSelect 圈选画布

<API src='../../src/behaviors/BrushSelect.tsx'>

## LassoSelect 拉索画布

<API src='../../src/behaviors/LassoSelect.tsx'>

## ResizeCanvas Resize 画布

<API src='../../src/behaviors/ResizeCanvas.tsx'>
