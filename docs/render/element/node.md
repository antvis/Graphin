---
title: 节点样式
order: 2
group:
  path: /render

nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 基本介绍

通常来讲，将图数据 `nodes` 每个节点包含的属性信息，通过人眼更容易理解的「大小」「颜色」「位置」表达出来，是一种非常重要的数据分析手段。

目前 Graphin 完全兼容 G6 5.0 的样式规范，同时也保留了之前定义的 Spec 规范，即 `graphin-circle`，并且提供了两种数据映射方式「配置映射」和「函数映射」

## 配置映射

节点的样式信息全部存储在 `style` 字段中，通过 G6 5.0 的 `NodeMapper` 机制在内部转化为函数映射。以下是 Graphin 节点和 G6 内置节点的数据驱动写法，可以点击右下方`</>`图标，展开完整源码查看

<code src='./demos/node.tsx'>

## 函数映射

在 G6 5.0 中，`options.node` 代表了节点的函数映射，该写法不支持 `graphin-circle` 类型的节点，其余类型的 G6 节点是支持的。例如 G6 的官网例子：https://g6-next.antv.antgroup.com/examples/item/defaultNodes/#circle

<code src='./demos/node-g6.tsx'>

## 探究一下

数据驱动的写法是 Graphin 从用户代码迁移成本出发， 延续了 G6 4.x 的写法，其核心逻辑如下，当用户没有 `props.node` 的时候，则会使用下述 `defaultNodeMapper`, 按照约定，将用户的 `style` 字段，转化透传给 G6 渲染绘制。因此当用户使用自定义 `nodeMapper`，需要额外注意，是否需要对 `graphin-cirlce` 类型的节点做兼容处理，例如 `transGraphinStyle`函数

```jsx | pure
export const defaultNodeMapper = node => {
  const { id, data, style } = node;
  const { x = 0, y = 0, z = 0 } = data;
  if (style) {
    const { type } = style;
    const IS_GRAPHIN = !type || type === 'graphin-circle';
    if (IS_GRAPHIN) {
      return {
        id,
        data: {
          x,
          y,
          z,
          ...transGraphinStyle(style),
        },
      };
    }
    return {
      id,
      data: {
        x,
        y,
        z,
        ...style,
      },
    };
  }
  return node;
};
```

## `graphin-circle` 样式接口文档

> 这里仅列举 `graphin-circle` 类型的文档， 其余类型的节点请参考 G6 5.0 官方文档

<API  src='../../interface/node-style.ts' >
