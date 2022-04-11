---
title: Dynamic Layout
group:
  path: /layout
  title: Layout Plan
  order: 9
nav:
  path: /graphin
  order: 0
---

## Dynamic Layout

`Dynamic layout` means that the process of layout is dynamic and can change according to `data changes`. Therefore, we also call it the data response layout. For example, in the canvas analysis process, data needs to be added, deleted, and modified. If the corresponding layout needs to be changed at this time, we call it `dynamic layout`.

In Graphin, dynamic layout is divided into two categories:

- The first type is dynamic layout of ordinary layout algorithms, such as `circular`, `grid`, etc. After the data changes, the layout function is re-executed, and the final position of the node after two layouts is calculated, and the layout response is completed by tweening animation , So it is also called `data response layout`
- The second category is the dynamic layout of force guide layout. For example, `d3-force`, `graphin-force`, etc. After the data changes, the ideal layout cannot be obtained by executing the layout function again. It is necessary to pre-process the front layout of the force guide. The application of the force processing strategy is a gradual process, so it is also called `Force guide progressive layout`

## [General Layout] Dynamic Layout (Data Response Layout)

<code src='./demos/normal-layout.tsx'>

## [Force Layout] Dynamic layout (force guide progressive layout)

<code src='./demos/graphin-force.tsx'>
