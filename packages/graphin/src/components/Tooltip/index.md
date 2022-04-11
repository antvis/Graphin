---
title: Tooltip 提示框
order: 1
group:
  path: /built-in
  title: 内置组件
  order: 0
nav:
  title: 分析组件
  path: /components
  order: 1
---

# Tooltip

> 注意 ⚠️：从 graphin 2.6.0 版本开始，我们将该组件从`@antv/graphin-components`内置到`@antv/graphin`中，详情请参考[发布文档](https://www.yuque.com/antv/gi/gstoyh)

Tooltip 提示框是一种快速浏览信息的交互组件，常用于图的节点和边上。通过鼠标悬停在节点或边上时，出现一个提示框，鼠标移出节点则取消提示框。这在快速查询元素详细信息时非常有帮助。

`<Tooltip/>`是提示框的容器，提供位置，触发元素，回调函数等信息，这些信息可以用户通过`context`获取。具体如何渲染，完全交给用户

<code src='./demos/index.tsx'>
<API src='./index.tsx'>
