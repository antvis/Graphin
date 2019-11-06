---
title: Data 数据驱动
order: 0
---

## 01. 数据的定义

```ts
const data = {
  nodes::[],
  edges:[]
}
```

## 02. 数据的映射

```ts
transform = {
    nodes: () => {},
    edges: () => {},
};
```

## 03. 数据的增量改变

### 01. Nodes 的数据增量变化

关系扩散

### 02. Edges 的数据增量变化

关系发现

## 04. 数据的全量替换

-   数据不带位置信息

-   数据带位置信息
