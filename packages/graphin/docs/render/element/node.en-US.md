---
title: Node Style
order: 2
group:
  path: /render
nav:
  path: /graphin
  order: 1
---

## Basic Introduction

Graphin has the only built-in node type `graphin-circle`. As the default node type, you do not need to explicitly specify `type:"graphin-circle"` in the data. Graphin standardizes the composition of nodes, `graphin-circle` is composed of 5 parts of graphs, namely `keyshape`, `label`, `icon`, `badges`,`halo`

## 01.Styles Are Data-driven

The style information of the node is all stored in the `style` field, and we can drive the style setting of the node through data.

> ⚠️：You can click on the `</>` icon at the bottom right to expand the full source code view

<code src='./demos/node.tsx'>

## 02.Set Font Icons

There are three types of icons mentioned above. Starting from the actual business, setting the icon as a font icon is the most common practice. This not only reduces network loan requests, but is also very convenient and efficient.
Graphin uses `Graphin.registerFontFamily` to register and load font files, let's take a look

<code src='./demos/node-icon.tsx'>

## 03.Set Default Style

The font icon of the above setting node, in addition to covering the style in the style of each data, graphin also maintains the mechanism of G6, you can set the default node style through `defaultNode`

<code src='./demos/node-default.tsx'>

## 04.Set Up Animation

If we pursue a more delicate interactive experience, such as in hover, let halo another animation effect, as shown in the figure below
<code src='./demos/node-animate.tsx'>

## 05.High-value Nodes

<code src='./demos/node-beauty.tsx'>

## 06.`graphin-circle` Style Interface Document

<API  src='../../interface/node-style.ts' >
