---
title: Extend
order: 3
---

The property `extend` of  component `<Graphin/>` is used to extend layout, NodeShape and Marker of Graphin.

|   Property    | Type                                                           | Required | Description       |
| --------- | -------------------------------------------------------------- | -------- | ---------- |
| layout    | (graphin: [Graphin](), prevProps: [GraphinProps](/zh/docs/api/graphin#props)) => [ExtendLayout](#extendlayout)[ ]  | no       | custom Layout |
| nodeShape | (node: [Node](/zh/docs/api/graphin#node)) => [ExtendNodeShape](#extendnodeshape)[ ] | no       | custom Node |
| marker    | ( ) => [ExtendMarker](#extendmarker)[ ]         | no       | custom Icon |


### ExtendLayout

Configuration of custom layout

|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| name    | string       | **yes** | name of the layout      |
| desc  | string     | **yes**       | name  of the layout     |
| icon  | string   | **yes**     | antd icon type     |
| layout      | (data: [Data](/zh/docs/api/graphin#data), options: [LayoutOption](/en/docs/api/layout#layoutoptions)) => { data: [Data](/zh/docs/api/graphin#data); forceSimulation?: [ForceSimulation]();} | **yes**       | a function for calculating the layout which accept nodes as arguments and return nodes with location     |

### ExendNodeShape

Configuration of custom node

|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| shape    | string       | **yes** | name of custom NodeShape      |
| shapeComponents  | [ShapeComponent](#shapecomponent)[ ]     | **yes**       | 构成 Shape 的组件数组      |

#### ShapeComponent

|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| shape    | string       | **yes** |  name of built-in nodeShape in G6      |
| attrs  | [Attrs](https://www.yuque.com/antv/g6/ffzwfp)     | **yes**       | Property of shape    |


### ExendMarker

Configuration of custom marker

|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| name    | string       | **yes** | icon type      |
| path | string     | **yes**       | svg path      |
