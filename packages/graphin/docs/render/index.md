---
title: 基本介绍
order: 0
group:
  path: /render
  title: 元素渲染
  order: 0
nav:
  title: Graphin
  path: /graphin
  order: 0
---

Graphin 2.x 支持 树图 和 网图 两种关系的渲染，在内部通过 data 的数据类型进行判断执行。Graphin2.x 支持 G6 节点和边的 内置类型和自定义类型。Graphin 内置了`graphin-circle` 和 `graphin-edge` 两种类型，和其他 G6 的自定义类型不同的是，Graphin 内置的点/边类型最大的特点是规范化，解构了节点和边的诸多元素组合，通过一份配置文件来描述组合。

### 树图渲染

> 根据数据类型不一样，渲染不同的图类型。实现的[Github 源码逻辑](https://github.com/antvis/Graphin/blob/master/packages/graphin/src/Graphin.tsx#L236) 感兴趣的同学可以自行查看

<code src='./data/CompactBox.tsx'>

### 网图渲染

<code src='./data/Network.tsx'>

<!-- <API src='../../src/typings/type.ts' exports='["NodeStyle"]'> -->

### 节点样式

```jsx | pure
export interface NodeStyle {
  /** 节点的主要容器 */
  keyshape: {
    /** 节点的大小 */
    size: number | [number] | [number, number],
    /** 填充色 */
    fill: string,
    /** 包围边颜色 */
    stroke: string,
    /** 边框的宽度 */
    lineWidth: number,
  };
  /** 节点的文本 */
  label: NodeStyleLabel;
  /** 节点的中间位置图标区域 */
  icon: NodeStyleIcon;
  /** 节点的徽标 */
  badges: NodeStyleBadge[];
  /** 光环 */
  halo: any;
}

export type NodeStyleLabel = Partial<{
  /** label的名称 */
  value: string,
  /** 展示位置 */
  position: 'top' | 'bottom' | 'left' | 'right' | 'center',
  /** 文本填充色 */
  fill: string,
  /** 文本大小 */
  fontSize: number,
  /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
  offset: number,
}>;

export type NodeStyleIcon = Partial<{
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text',
  /** 根据类型，填写对应的值 */
  value: string,
  /** 图标大小 */
  size: number | number[],
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: string,
  fontFamily: string,
}>;

export type NodeStyleBadge = Partial<{
  /** 放置的位置，ef：LT（left top）左上角 */
  position: 'LT' | 'RT' | 'RB' | 'LB',
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'font' | 'image' | 'text',
  value: number | string,
  // type = image 时生效，表示图片的宽度和高度
  size: [number, number] | [number],
  /** 徽标填充色 */
  fill: string,
  /** 徽标描边色 */
  stroke: string,
  /** 徽标内文本的颜色 */
  color: string,
  fontSize: number,
  fontFamily: string,
  // badge 中文本距离四周的偏移量
  padding: number,
  // badge 在 x 和 y 方向上的偏移量
  offset: [number, number],
}>;
```
