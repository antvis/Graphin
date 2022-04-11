---
title: Legend 图例
group:
  path: /built-in
  title: 内置组件
  order: 1
nav:
  title: 分析组件
  path: /components
  order: 1
---

# Legend

> 注意 ⚠️：从 graphin 2.6.0 版本开始，我们将该组件从`@antv/graphin-components`内置到`@antv/graphin`中，详情请参考[发布文档](https://www.yuque.com/antv/gi/gstoyh)

Legend 图例是一种常见的图分析配套组件，通常将节点和边分类后进行染色，方便用户交互分析。其中点击图例有两种逻辑，一是高亮，即高亮选中的图例所对应的节点；二是过滤，即将未选中的节点隐藏。

<code src='./demos/index.tsx'>
