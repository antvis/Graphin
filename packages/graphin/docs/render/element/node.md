---
title: 节点样式
order: 2
group:
  path: /render

nav:
  path: /graphin
  order: 1
---

## 基本介绍

Graphin 内置唯一一款节点类型`graphin-circle`.作为默认的节点类型，你不需要在数据中显式指定`type:"graphin-circle"`。Graphin 对节点的组成进行了规范化处理，`graphin-circle` 由 5 部分图形组成，分别是`keyshape`,`label`,`icon`,`badges`,`halo`

## 01.样式通过数据驱动

节点的样式信息全部存储在 `style` 字段中，我们可以通过数据驱动 节点的样式设置。

> ⚠️：可以点击右下方`</>`图标，展开完整源码查看

<code src='./demos/node.tsx'>

## 02.设置字体图标

上述的 icon 有 3 种类型，从实际业务出发，将 icon 设置为字体图标是最常见的做法，这样不仅减少网络带宽请求，也很方便高效。
Graphin 采用`Graphin.registerFontFamily`的方式注册加载字体文件，让我们来看看吧

<code src='./demos/node-icon.tsx'>

## 03.设置默认样式

上述设置节点的字体图标，除了在每个数据的 style 中覆盖样式，graphin 也保持 G6 的机制，可以通过`defaultNode`设置默认节点样式

<code src='./demos/node-default.tsx'>

## 04.设置动画

如果我们追求更细腻的交互体验，比如在 hover 的时候，让 halo 光晕又一个动画效果，如下图所示
<code src='./demos/node-animate.tsx'>

## 05.高颜值节点

<code src='./demos/node-beauty.tsx'>

## 06.`graphin-circle` 样式接口文档

<API  src='../../interface/node-style.ts' >
