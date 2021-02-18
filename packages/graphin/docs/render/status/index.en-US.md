---
title: Set Status
group:
  path: /render
nav:
  path: /graphin
  order: 1
---

## Node Status

Graphin-circle has 5 built-in interactive states. The most common interactions are the `hover` and `selected` states, so we have built in two Behaviors components, and the rest of the states can be triggered manually by `graph.setItemState`.

| Field Name | Description                         | Triggered Behavior                         |
| ---------- | ----------------------------------- | ------------------------------------------ |
| normal     | Default state                       | `graph.setItemState(node,'normal',true)`   |
| hover      | Hover state                         | `<Hoverable bindType="node" />`            |
| selected   | Selected state                      | `<ClickSelect />`                          |
| disabled   | Disabled state                      | `graph.setItemState(node,'disable',true)`  |
| active     | Active state (visually highlighted) | `graph.setItemState(node,'active',true)`   |
| inactive   | Inactive state (visually weakened)  | `graph.setItemState(node,'inactive',true)` |

## Set Node Status

### Method 1: Data Driven

<code src='./demos/data-driven.tsx'>

### Method 2: Interface Call

## Edge State
