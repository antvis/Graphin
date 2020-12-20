---
title: 基本介绍
order: 0
group:
  path: /behaviors
  title: 交互行为
  order: 3
nav:
  title: Graphin
  path: /graphin
  order: 1
---

## 基本介绍

Graphin 中的交互行为都是可组合的，例如内置了 DragCavans,ZoomCanvas,SelectClick 组件，因为交互都是异步的，因此其组件内部实现了 addBehaviors 和 RemoveBehaviros 的原子操作。默认交互行为开箱即用，如果功能还不够满足，可以选择两种方式，一种是通过 options.xx 来配置（一般用户主要交互行为的配置，不会完全枚举）。如果希望更加灵活的配置方式，可以通过 `import {Behaviors} from '@antv/graphin'` 来按需引入,如下面示例子

> Props API 和 G6 的 defaultBehaviros 完全保持一致:https://g6.antv.vision/zh/docs/manual/middle/states/defaultBehavior

## typescript 友好

![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xpoaRpOGme4AAAAAAAAAAAAAARQnAQ)

## 在线示例

### 通过组件的 Props，修改原先的交互设置

<code src='./demo.tsx'>

### 通过 disabled 来禁用该交互行为

<code src='../render/data/Network.tsx'>
