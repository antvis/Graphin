---
title: Edge Style
order: 3
group:
  path: /render
nav:
  path: /graphin
  order: 0
---

## Basic Introduction

Graphin official website has built-in edge type `graphin-line`. As the default edge type, you do not need to explicitly specify `type:"graphin-line"` in the data. Graphin standardizes the composition of edges. `graphin-line` is composed of 3 parts of graphs, namely `keyshape`, `label`, and `halo`

## 01.Styles Are Data-driven

The style information of the node is all stored in the `style` field, and we can drive the style setting of the edge by data.

> ⚠️：You can click on the `</>` icon at the bottom right to expand the full source code view

<code src='./demos/edge.tsx'>

## 02.Use Tools To Quickly Handle Polygons

Graphin has built-in `Utils.processEdges` method, which specializes in dealing with multilateral situations, whether it is an edge in the same direction or an opposite direction, or a self-circular edge, it can be quickly processed by this tool function

<code src='./demos/edge-default.tsx'>

### API: Graphin.Utils.processEdges(params1,params2)

| Function parameters | Description                     | Types                       | Defaults            |
| ------------------- | ------------------------------- | --------------------------- | ------------------- |
| params1             | Collection of edges             | `GraphinData['edges']`      | -                   |
| params2             | Multilateral configuration item | `{poly:number,loop:number}` | `{poly:50,loop:10}` |

## 03.`graphin-line` Style Interface Document

<API   src='../../interface/edge-style.ts'>
