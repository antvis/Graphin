---
title: 升级指南
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
  order: 0
---

## 从 V1 到 V2

2.0 相比 1.0 版本，对 G6 的能力进行了全面的支持与升级：注册机制，布局机制，元素样式等和 G6 保持一致，支持树图，以及更好的组件化方案

### layout 布局

- 配置 和 G6 的 layout 保持一致，因此你可以使用[G6 的 Layout 配置](https://g6.antv.vision/zh/docs/api/graphLayout/guide)
- 用法 和 G6 的 layout 保持一致 , layout.options 需要解构

```jsx | pure
//v1
<Graphin data={data} layout={{ name: 'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name: 'grid', ...options }} />
```

### data 数据

- 网图数据：Graphin2.0 的数据结构不变，但是数据内容发生了一些变化，新增状态字段和样式字段，方便业务处理，具体详见：
- 树图数据：Graphin2.0 支持树图，如果数据结构为 tree，则在内部渲染 TreeGraph

```tsx | pure
const data = {
  nodes: [
    {
      id: 'node-1',
      // 样式字段
      style: {
        label: {
          value: 'node-1-label',
        },
      },
      // 状态字段
      status: {
        selected: true,
      },
    },
  ],
};

<Graphin data={data} />;
```

### behavior

交互行为，之前在 G6 中需要通过 modes 引入，在 Graphin 中支持组件化引入，同时支持组件属性配置，从而完成数据驱动。在升级 V2 版本，这块不用感知

### extend

Graphin 中全面移除 extend 接口，之前 nodeShape，icon，layout 可以通过注册接口实现。extend.marker 彻底移除

- 扩展节点

```tsx | pure
// v1
<Graphin extend={{ nodeShape: renderNodeShape }} />;

// v2
Graphin.registerNode(renderNodeShape);
```

- 扩展布局

```tsx | pure
// layout
<Graphin extend={{ nodeShape: customLayout }} />;

// v2
Graphin.registerLayout(customLayout);
```

- 扩展 icon

```tsx | pure
// layout
<Graphin extend={{ icon: customIconFunction }} />;

// v2
Graphin.registerFontFamily(iconloader); // 详情查看 自定义 icon
```

- 扩展 marker （彻底移除）

### register

和 G6 的注册机制完全保持一致

```tsx | pure
// 注册节点，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registernodenodename-options-extendednodename
Graphin.registerNode();

// 注册边，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registeredgeedgename-options-extendededgename
Graphin.registerEdge();

// 注册Combo，详情参考 https://g6.antv.vision/zh/docs/api/registerItem#g6registercombocomboname-options-extendedcomboname
Graphin.registerCombo();

// 注册布局，详情参考 https://g6.antv.vision/zh/docs/api/registerLayout#g6registerlayoutlayoutname-layout
Graphin.registerLayout();

// 注册行为，详情参考 https://g6.antv.vision/zh/docs/api/Behavior
Graphin.registerBehavior();
```
