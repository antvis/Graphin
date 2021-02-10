---
title: 边的样式
order: 3
group:
  path: /render
nav:
  path: /graphin
  order: 1
---

## 基本介绍

Graphin 官网内置了 边类型`graphin-line`.作为默认的边类型，你不需要在数据中显式指定`type:"graphin-line"`。Graphin 对边的组成进行了规范化处理，`graphin-line` 由 3 部分图形组成，分别是`keyshape`,`label`,`halo`

## 01.样式通过数据驱动

节点的样式信息全部存储在 `style` 字段中，我们可以通过数据驱动 边的样式设置。

> ⚠️：可以点击右下方`</>`图标，展开完整源码查看

<code src='./demos/edge.tsx'>

## 02.使用工具快速处理多边

Graphin 内置了 `Utils.processEdges` 方法，专门处理多边的情况，无论是同方向还是反方向边，亦或是自环边，通过该工具函数都能快速处理

<code src='./demos/edge-default.tsx'>

### API: Graphin.Utils.processEdges(params1,params2)

| 函数参数 | 说明       | 类型                        | 默认值              |
| -------- | ---------- | --------------------------- | ------------------- |
| params1  | 边的集合   | `GraphinData['edges']`      | -                   |
| params2  | 多边配置项 | `{poly:number,loop:number}` | `{poly:50,loop:10}` |

## 03.`graphin-line` 样式接口文档

<API   src='../../interface/edge-style.ts'>
