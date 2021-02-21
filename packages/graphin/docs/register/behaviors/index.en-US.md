---
title: Custom Interaction
order: 0
group:
  path: /register
  title: Custom
nav:
  path: /graphin
  order: 5
---

## [Recommended] Graphin custom interactive components

As shown in the figure below: suppose we need to automatically focus on the `node-1` point when initializing the canvas, and need to focus on the clicked node after each click. At this time, we only need to customize an interactive component. If this interactive component has no UI, then `return null`

<code src='./graphin-style.tsx'>

## [Compatible] How to write G6 registration behavior

If you are an old user of G6, for the definition of interactive behavior, you may use the wording of `registerBehavior`, which of course Graphin also supports. But for the sake of logical unification, when you use this method, Graphin will remove all default interactions internally. The internal source code implementation is shown in the figure below. So you have to rewrite `drag-canvas` and other behaviors with `<Graphin modes={{ default: ['sampleBehavior','drag-canvas'] }}/>`.

```jsx | pure
<>
  {/** When the modes do not exist, start the default behaviors, otherwise it will overwrite the user's own input */
  !modes && (
    <>
      {/* drag the canvas */} <DragCanvas />
      {/* zoom the canvas */} <ZoomCanvas />
      {/* drag node */} <DragNode />
      {/* drag combo*/} <DragCombo />
      {/* click node */} <ClickSelect />
      {/* brush select nodes */} <BrushSelect />
    </>
  )}
</>
```

> Note ⚠️: The following DEMO is a user-defined `click interaction`, obviously the Graphin default `ClickSelect` interaction has been removed, so the selected interaction has no effect.

<code src='./g6-style.tsx'>
