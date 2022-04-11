---
title: 基本介绍
order: 0
group:
  path: /behaviors
  title: 交互行为
  order: 0
nav:
  path: /graphin
  order: 0
---

## 基本用法

Graphin 中的交互行为都是可组合的，例如内置了 DragCavans,ZoomCanvas,SelectClick 组件，因为交互都是异步的，因此其组件内部实现了 addBehaviors 和 RemoveBehaviors 的原子操作。默认交互行为开箱即用，可以通过 `import {Behaviors} from '@antv/graphin'` 来按需引入。

每个交互组件 Props API 和 [G6 的 defaultBehaviors](https://g6.antv.vision/zh/docs/manual/middle/states/defaultBehavior) 完全保持一致。可以在[节点交互](/graphin/behaviors/node) 和 [画布交互](/graphin/behaviors/canvas) 的文档中查看

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

## typescript 友好

![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xpoaRpOGme4AAAAAAAAAAAAAARQnAQ)

## 内置交互行为

> 并不是所有的交互行为都需要用户手动引入，因此 Graphin 内置了 9 个交互行为，这些交互行为，我们认为是图分析产品基本的交互需求，因此选择内置。

```jsx | pure
<>
  {/* 拖拽画布 */}<DragCanvas />
  {/* 缩放画布 */}<ZoomCanvas />
  {/* 拖拽节点 */}<DragNode />
  {/* 点击节点 */}<DragCombo />
  {/* 点击节点 */}<ClickSelect />
  {/* 圈选节点 */}<BrushSelect />
  {/** resize 画布 */}<ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />

</>
```

注意 ⚠️： graphin@2.3.3 版本，移除内置的节点 Hover 交互，用户需要按需引入`{/** 节点悬停 **/}<Hoverable bindType="node" />`

<code src='./demos/index.tsx'>

## 禁用默认的交互行为

内置的交互组件，是单例模式。因此，我们只需要再次引入需要关闭的交互组件，然后手动设置为`disabled`即可。如下面示例，关闭默认的 `画布缩放` 和 `节点拖拽` 行为

<code src='./demos/disabled.tsx'>

## 可选交互行为

> 针对不是高频的交互行为，Graphin 将这些封装起来，供用户自己按需引入。小提示 💡 ： 点击跳转到对应的文档查看更多

- 关联高亮交互：[`<ActivateRelations />`](/graphin/behaviors/node#activaterelations)
- 自适应视窗交互：[`<FitView />`](/graphin/behaviors/canvas#fitview)
- 字体加载渲染：[`<FontPaint />`](/graphin/behaviors/node#fontpaint)
- 树图展开收起：[`<TreeCollapse />`](/graphin/behaviors/node#treecollapse)
