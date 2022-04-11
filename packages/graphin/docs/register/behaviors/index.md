---
title: 自定义交互
order: 0
group:
  path: /register
  title: 自定义机制
nav:
  path: /graphin
  order: 0
---

## 【推荐】 Graphin 自定义 交互组件

如下图所示：假定我们需要在初始化画布的时候，自动聚焦到`node-1`点，需要在每次点击后，聚焦到点击的节点上。这个时候，我们只需要自定义一个交互组件即可。如果这个交互组件无 UI，则`return null` 即可

<code src='./graphin-style.tsx'>

## 【兼容】 G6 注册 Behavior 的写法

如果你是 G6 的老用户了，对于交互行为的定义，你可能会采用`registerBehavior`的写法,Graphin 当然也支持。不过为了逻辑的统一，当你使用这种方式的时候，Graphin 内部会移除所有的默认交互，`内部源码实现`如下图所示。因此你不得不再将`drag-canvas`等 behaviors，用`<Graphin modes={{ default: ['sampleBehavior','drag-canvas'] }}/>`的方式重新写入。

```jsx | pure
<>
  {/** modes 不存在的时候，才启动默认的behaviors，否则会覆盖用户自己传入的 */
  !modes && (
    <>
      {/* 拖拽画布 */} <DragCanvas />
      {/* 缩放画布 */} <ZoomCanvas />
      {/* 拖拽节点 */} <DragNode />
      {/* 点击节点 */} <DragCombo />
      {/* 点击节点 */} <ClickSelect />
      {/* 圈选节点 */} <BrushSelect />
    </>
  )}
</>
```

> 注意 ⚠️ ：下面 DEMO 是用户自定义`点击交互`，很显然默认的`ClickSelect`交互已经被移除，因此点击选中的交互无效果。

<code src='./g6-style.tsx'>
