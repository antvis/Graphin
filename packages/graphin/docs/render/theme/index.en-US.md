---
title: Set The Theme
order: 0
group:
  path: /render
  title: Element Rendering
  order: 0
nav:
  path: /graphin
  order: 0
---

### Set The Theme

In different business scenarios, we may be faced with setting themes on the canvas. According to the "Graph Visual Analysis Design Guidelines", Graphin has built-in two default themes: night and day. The theme setting can be completed by setting `<Graphin theme={}/>` as shown in the following API interface.

> Note ⚠️: Graphin is currently unable to switch the theme, that is, set the theme to the React `state` and change dynamically. It is expected to be added in version `2.1.0`. At the same time, for the components in GraphinComponents, Theme cannot be automatically switched for the time being, and it is expected to be added in version `2.2.0`.

<code src='./setting.tsx'>

<API src='../../interface/theme.ts'>

### 🔧 Tool Functions

We also provide the Utils function, which users can configure through themes to generate element styles. In Graphin's official default style, these tool functions are also used to deepen the default style.

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
