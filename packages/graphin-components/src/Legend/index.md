---
title: Legend 图例
group:
  path: /mark
  title: 标示组件
  order: 1
nav:
  title: Components
  path: /components
  order: 1
---

# Legend

Legend 图例是一种常见的图分析配套组件，通常将节点和边分类后进行染色，方便用户交互分析。其中点击图例有两种逻辑，一是高亮，即高亮选中的图例所对应的节点；二是过滤，即将未选中的节点隐藏。

<code src='./demos/index.tsx'>

## 用法

`<Legend />` 内置了一个`<Legend.Node />`组件，用来处理图例的展示样式与交互样式。

```tsx | pure
<Graphin data={data}>
  <Legend bindType="node" sortKey="data.type" colorKey="style.keyshape.stroke">
    <Legend.Node />
  </Legend>
</Graphin>
```

<API src='./index.tsx'>
<API src='./Node.tsx'>

## 自定义

Legend 内置了一个`<Legend.Node />`组件，用来处理图例的展示样式与交互样式。用户完全可以定义自己的`<Legend.Node />`组件，达到自定义的目的，可以自定义样式，也可以自定义交互名称。

<code src='./demos/custom.tsx'>

- 自定义交互

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

- Graphin 现在的 legend：https://graphin.antv.vision/zh/examples/components/legend
