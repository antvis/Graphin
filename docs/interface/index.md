---
title: 接口文档
order: 1
group:
  path: /quick-start
  title: 快速开始
  order: 2
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 如何使用 Graphin

Graphin 最基础的角色是 React 组件，下表是`<Graphin />`的接口说明.

| 属性名           | Typescript 类型       | 默认值                                                | 说明                                                                         |
| ---------------- | --------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| data             | `GraphinProps.data`   | **是**                                                | [数据结构](/graphin/render/data)                                             |
| layout           | `Layout`              | `{type:"grid"}`                                       | [设置布局](/graphin/layout/layout)                                           |
| theme            | `ThemeType`           | `{mode:"#light",...}`                                 | [设置主题](/graphin/render/theme#api)                                        |
| ref              | `ReactRef`            | `-`                                                   | Graphin 组件 Ref                                                             |
| width            | `number`              | `-`                                                   | Graphin 画布宽度,推荐通过父元素容器设置宽度，默认宽度为 100%                 |
| height           | `number`              | `-`                                                   | Graphin 画布高度,推荐通过父元素容器设置宽度,默认最小高度 500px               |
| style            | `React.CSSProperties` | `{height: '100%',width: '100%',background: '#fff'}`   | Graphin 画布的样式                                                           |
| containerId      | `string`              | `graphin-container`                                   | Graphin 容器的 ID，一般用于多实例管理的场景下                                |
| containerStyle   | `React.CSSProperties` | `{height: '100%',width: '100%',position: 'relative'}` | Graphin 容器的样式                                                           |
| modes            | `G6.Modes`            | `-`                                                   | 推荐使用 [Behaviors](/graphin/behaviors/behaviros)                           |
| plugins          | `G6.Plugins`          | `-`                                                   | 推荐使用 [Components](/components/built-in/context-menu)                     |
| defaultNode      |                       |                                                       | 节点的默认样式配置                                                           |
| defaultEdge      |                       |                                                       | 边的默认样式配置                                                             |
| defaultCombo     |                       |                                                       | Combo 的默认样式配置                                                         |
| nodeStateStyles  |                       |                                                       | 不同状态下的节点样式配                                                       |
| edgeStateStyles  |                       |                                                       | 不同状态下的边样式配置                                                       |
| comboStateStyles |                       |                                                       | 不同状态下的 Combo 样式配置                                                  |
| fitView          | `boolean`             | false                                                 | 是否开启画布自适应。开启后图自动适配画布大小                                 |
| fitCenter        | `boolean`             | false                                                 | 开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView |
| fitViewPadding   | `number[]`            | [0,0]                                                 | fitView 为 true 时生效。图适应画布时，指定四周的留白                         |
| minZoom          | `number`              | 0.2                                                   | 最小缩放比例                                                                 |
| maxZoom          | `number`              | 10                                                    | 最大缩放比例                                                                 |
| enabledStack     | `boolean`             | false                                                 | 是否启用 stack，即是否开启 redo & undo 功能                                  |
| maxStep          | `number`              | 10                                                    | redo & undo 最大步数, 只有当 enabledStack 为 true 时才起作用                 |
| rtl              | `boolean`             | false                                                 | 文本是否以从右到左的方向呈现，用于阿拉伯语或希伯来语等语言                   |

## 如何使用 Graphin 中的 graph 实例

### 01. 通过 Ref 获取

```jsx | pure
import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const Demo = () => {
  const graphinRef = React.createRef();

  React.useEffect(() => {
    const {
      graph, // g6 的Graph实例
      apis, // Graphin 提供的API接口
    } = graphinRef.current;
    console.log('ref', graphinRef, graph, apis);
  }, []);

  return (
    <div className="App">
      <Graphin data={data} ref={graphinRef}></Graphin>
    </div>
  );
};
export default Demo;
```

### 02.通过 context 获取

```jsx | pure
import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const CustomComponents = () => {
  // 只要包裹在Graphin内的组件，都可以通过Context获得Graphin提供的graph实例和apis
  const { graph, apis } = React.useContext(GraphinContext);
  return null;
};

const Demo = () => {
  return (
    <div className="App">
      <Graphin data={data} ref={graphinRef}>
        <CustomComponents />
      </Graphin>
    </div>
  );
};
export default Demo;
```

## G6 的实例 graph

> 参考 G6 graph 的实例方法：https://g6.antv.vision/zh/docs/api/graphFunc/get_set

常用的方法如下：

- [视口操作](https://g6.antv.vision/zh/docs/api/graphFunc/transform)
- [元素操作](https://g6.antv.vision/zh/docs/api/graphFunc/item)
- [查找元素](https://g6.antv.vision/zh/docs/api/graphFunc/find)
- [元素状态](https://g6.antv.vision/zh/docs/api/graphFunc/state)
- [事件绑定](https://g6.antv.vision/zh/docs/api/graphFunc/on_off)
- [布局](https://g6.antv.vision/zh/docs/api/graphFunc/layout) : 注意 ⚠️ ： Graphin 中的布局算法和 G6 一致，但是布局流程不是 G6 的布局流程，因此关于布局的接口操作暂不可用，未来会兼容。
- [图计算相关](https://g6.antv.vision/zh/docs/api/graphFunc/calculation)
- [增加水印](https://g6.antv.vision/zh/docs/api/graphFunc/watermarker)
- [导出图片](https://g6.antv.vision/zh/docs/api/graphFunc/download)

## Graphin 内建接口 apis

> 未来 Graphin 的版本迭代，将会将常用的接口 在 Graphin 上层聚合透出

<API src='./apis.ts'>
