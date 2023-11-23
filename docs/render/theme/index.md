---
title: 设置主题
order: 0
group:
  path: /render
  title: 元素渲染
  order: 0
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

### 设置主题

在不同的业务场景下，我们可能面临对画布进行主题设置。Graphin 根据《图可视分析设计指引》内置了 黑夜 和 白天 两种默认主题。可以通过下述 API 接口所示，通过设置`<Graphin theme={}/>`来完成主题的设置。

> 注意 ⚠️ : Graphin 目前还不能够对主题进行切换，即将 theme 设置为 React 的 `state` 状态，动态改变。预计在 `2.1.0` 版本加入。同时对于 GraphinComponents 内的组件，Theme 暂时也无法自动切换，预计在 `2.2.0` 版本加入.

<code src='./setting.tsx'>

<API src='../../interface/theme.ts'>

### 🔧 工具函数

我们也提供了 Utils 函数，用户可以通过主题配置，生成元素的样式。在 Graphin 官方默认的样式中，也是通过这些工具函数深成默认的样式。

```jsx | pure
import { Utils } from '@antv/graphin';

const nodeStyle = Utils.getNodeStyleByTheme({
  primaryColor: 'red',
  nodeSize: 12,
  mode: 'dark',
});

const edgeStyle = Utils.getEdgeStyleByTheme({
  primaryEdgeColor: 'red',
  edgeSize: 12,
  mode: 'dark',
});

const comboStyle = Utils.getComboStyleByTheme();
```
