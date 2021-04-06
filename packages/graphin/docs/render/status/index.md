---
title: 设置状态
group:
  path: /render
nav:
  path: /graphin
  order: 1
---

## 节点的状态

graphin-circle 内置了 5 种交互状态。最常见的交互是 `悬停`和`选中`状态，因此我们内置在两个 Behaviors 组件中，其余的状态均可以通过`graph.setItemState`手动触发。

| 字段名称 | 描述                   | 触发的 Behavior                            |
| -------- | ---------------------- | ------------------------------------------ |
| normal   | 默认状态               | `graph.setItemState(node,'normal',true)`   |
| hover    | 悬停状态               | `<Hoverable bindType="node" />`            |
| selected | 选中状态               | `<ClickSelect />`                          |
| disabled | 禁用状态               | `graph.setItemState(node,'disable',true)`  |
| active   | 激活状态（视觉高亮）   | `graph.setItemState(node,'active',true)`   |
| inactive | 未激活状态（视觉弱化） | `graph.setItemState(node,'inactive',true)` |

## 设置节点状态

### 方法一：数据驱动

<code src='./demos/data-driven.tsx'>

### 方法二：接口调用

## 边的状态
<code src='./demos/edge-status.tsx'>