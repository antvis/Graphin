---
title: Extend 扩展接口
order: 0
---

## Extend 介绍

extend 顾名思义是扩展的意思。Graphin 支持 3 种扩展类型：扩展自定义布局，扩展自定义节点，扩展自定义图标。

Graphin 内置了布局，节点 与图标。除此之外，Graphin 给用户提供了扩展机制，用户可以方便的通过 extend 配置自定义布局，节点与图表。

扩展是通过 `props.extend` 实现的：

```tsx
<Graphin
    data={data}
    extend={{
        nodeShape: extendNodeShapeFunction,
        marker: extendMakerFunction,
        layout: extendLayoutFunction,
    }}
/>
```

下面让我们来看如何具体自定义布局，节点和图标。

## 扩展布局

让我们来实现一个简单的随机布局作为例子。

首先我们要定义一个 layout 函数：

```tsx
import Graphin, { Data, GraphinProps, LayoutOption } from '@antv/graphin';

const layout = (graphin: Graphin, props: GraphinProps) => {
    return [
        {
            name: 'custom',
            desc: '自定义随机布局',
            icon: 'home',
            layout: (data: Data, options: LayoutOption): { data: Data } => {
                const nodes = data.nodes.map(node => {
                    return {
                        ...node,
                        x: Math.round(Math.random() * 800),
                        y: Math.round(Math.random() * 500),
                    };
                });
                return {
                    data: {
                        nodes,
                        edges: props.data.edges,
                    },
                };
            },
        },
    ];
};

export default layout;
```

这个 layout 函数返回一个数组，每个数组都是一个自定义 layout 配置。layout 配置中最关键的就是 layout方法，这个方法接受 data 作为参数，然后返回修改过的 data 数据。修改的就是每个节点上的 x 和 y 属性，也就是给每个节点附上了位置信息。

接下来我们在 Graphin 的 `extend.layout` 中传入这个函数，并制定 `layout.name` 为 custom，就可以使用这个自定义 layout 了。

```tsx
import layout from "./layout"

<Graphin
    data={data}
    layout={
        name: "custom"
    }
    extend={{
        layout
    }}
/>
```

`extend.layout` 函数的 API 参见[文档](/zh/docs/api/layout)。


## 扩展节点

扩展节点指的是扩展 NodeShape，也就是 G6 中节点的渲染形状和样式。

在 Graphin 中，我们支持通过 JSON 配置的形式来配置 NodeShape。让开发者不用使用 G6 的 API，声明式的对 NodeShape 进行扩展。

比如我们要注册一个新的 RectNode 类型的 NodeShape。首先我们要定义一个 NodeShape 函数：

```tsx
import { Node } from "@antv/graphin"

const renderRectNode = (node: Node) => {
    const style: Style = {
        ...defaultStyles,
        ...node.style,
    };
    const badgeNumber = node.data.properties.length;

    return {
        shape: 'RectNode',
        shapeComponents: [
            {
                shape: 'rect',
                attrs: {
                    id: 'rect-container',
                    x: 0,
                    y: 0,
                    width: style.containerWidth,
                    height: style.containerWidth,
                    fill: style.containerFill,
                    stroke: style.containerStroke,
                    cursor: 'pointer',
                    lineWidth: 2,
                    radius: 2,
                },
            }
        ]
    }
}
```

JSON 配置文档 -> 

## 扩展图标


如果想在 Graphin 节点上展示自定义的 icon，就需要通过 `extend.marker` 进行扩展：


```tsx
import layout from "./layout"

<Graphin
    data={data}
    extend={{
        marker: () => {
            return [
                {
                    name: "company",
                    path: '<path d="M831.808 869.184V171.168l-97.856-65.312-356.704 159.2v123.2l-197.12 68.64v412.288H160v48.992h64.352V485.472l261.472-85.696v518.4h181.024v-53.056h-40.224V391.584l-94.912-57.152-106.24 36.992V293.6l257.472-114.304v738.848H864v-48.992h-32.192v0.032zM256.544 595.68l189.056-61.216v-81.632l-189.056 65.312v77.536z m0 106.144l189.056-40.832v-81.632l-189.056 48.992v73.472z m0 110.208l189.056-24.512v-81.632l-189.056 28.576v77.568z m0 106.112l189.056-4.096v-81.632l-189.056 8.192v77.536z" p-id="818"></path>',
                }
            ]
        }
    }}
/>
```

`extend.marker` 的 API 很简单，就是一个返回图标配置数组的函数。返回的图标配置中，name 代表 icon 的标识，也就是 G6 NodeShape 中 Marker 的 symbol 属性的值。path 就是 SVG 图标的 XML 代码。
