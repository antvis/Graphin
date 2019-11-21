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
        icon: extendIconFunction,
        layout: extendLayoutFunction,
    }}
/>
```

下面让我们来看如何具体自定义布局，节点和图标。

## 扩展布局

让我们来实现一个简单的随机布局作为例子。

本节的最终效果可以查看：[![Edit extendLayout](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/extendlayout-vxfds?fontsize=14&hidenavigation=1&theme=dark)

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

这个 layout 函数返回一个数组，每个数组都是一个自定义 layout 配置。layout 配置中最关键的就是 layout 方法，这个方法接受 data 作为参数，然后返回修改过的 data 数据。修改的就是每个节点上的 x 和 y 属性，也就是给每个节点附上了位置信息。

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

`extend.layout` 函数的 API 参见[文档](/zh/docs/api/extend#exendlayout)。

## 扩展节点

扩展节点指的是扩展 NodeShape，也就是 G6 中节点的渲染形状和样式。

本节的最终效果可以查看：[![Edit extendNodeShape](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/extendnodeshape-nilen?fontsize=14&hidenavigation=1&theme=dark)

在 Graphin 中，我们支持通过 JSON 配置的形式来配置 NodeShape。让开发者不用使用 G6 的 API，声明式的对 NodeShape 进行扩展。

比如我们要注册一个新的 RectNode 类型的 NodeShape。首先我们要定义一个 NodeShape 函数：

```tsx
import { Node } from '@antv/graphin';

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
                selected: {
                    'rect-container': {
                        fill: style.highlightFill,
                    },
                },
            },
        ],
    };
};
```

这个函数返回的是一个 JSON schema，是对 Shape 的描述。主要包括 shapeComponents 和 state。

shapeComponents 是一个数组，每一项是一个 Shape 的样式描述。其中 shape 的值是 G6 中的内置 shape。shape 类型和 attrs 的详情见 [G6 文档](https://www.yuque.com/antv/g6/ffzwfp)。

state 则是对 G6 中 behavior 中 state 的抽象。state 的 key 是 G6 的 behavior 中 `setItemState` 的状态。value 也一个 map，key 是 shapeComponents 中 shape 的 id。value 是 attrs 对象。因此 state 对象是对不同状态下 shapeComponents 的属性的描述。通过这个 API，我们可以声明式的对 NodeShape 的样式和组成进行编写，更符合 React 的编程范式。

`extend.nodeShape` 函数的具体 API 请参考[文档](/zh/docs/api/extend#exendnodeshape)。

## 扩展图标

Graphind 的 icon 机制使用 iconfont 实现。并且 Graphin 内置了 graphin 这个 fontFamily（Graphin 的内置图标）。如果想使用自定义的 图标，可以使用 `extend.icon` API 进行扩展。

Graphin 使用的 G6 的 iconfont 方案。使用 unicode 方式。具体可以参考 [G6 文档](https://www.yuque.com/antv/g6/acaihu)。

首先我们要把自定义的图标导入到一个 iconfont 项目中。

> 以下假设开发者使用的 iconfont.cn 这个字体图标平台。使用其他 iconfont 平台也是可以的。

之后引入 CSS。打开 iconfont 下自己的字体项目，将 unicode tab 下的 font-face 这段 CSS 复制到项目的 CSS 中：

<img style="width:80%;" src="https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*hzfWSbtVNBMAAAAAAAAAAABkARQnAQ" />

使用 icon 时，unicode 的方式可读性很差，不太友好。因此我们可以给 Graphin 提供一个 icon 的 name 和 unicode 的映射。

iconfont.cn 刚好提供了这样的映射，我们可以点击上图中的下载到本地，找到一个 `.json` 后缀的文件。

最后我们通过 `props.extend.icon` 传入新的 fontFamily 和 name-unicode 映射，对 Graphin 的图标进行扩展。同时在 data 的 `node.style` 中传入对应的 icon 和 fontFamily。icon 的值是 iconfont 中的 icon 的 name。

```tsx
import json from './font.json'; // iconfont 网站上下载的 name-unicode 映射文件。

const data = {
    nodes: [
        {
            id: 'foo',
            style: {
                icon: "phone",
                fontFamily: "iconfont"
            }
        }
    ]
}

<Graphin
    data={data}
    extend={{
        icon: () => {
            return [
                {
                    fontFamily: 'iconfont', // 注意这边的 fontFamily 需要和上面 CSS 的 fontFamily 对应
                    map: fonts.glyphs,
                },
            ];
        },
    }}
/>;
```

> 如果使用的 iconfont 平台没有 name-unicode 映射文件，可以自己构造一个，数据结构是 `{ name: string; unicode_decimal: number; }[ ]`

<!--
如果想在 Graphin 节点上展示自定义的 icon，就需要通过 `extend.marker` 进行扩展：

```tsx
import layout from './layout';

<Graphin
    data={data}
    extend={{
        marker: () => {
            return [
                {
                    name: 'company',
                    path:
                        '<path d="M831.808 869.184V171.168l-97.856-65.312-356.704 159.2v123.2l-197.12 68.64v412.288H160v48.992h64.352V485.472l261.472-85.696v518.4h181.024v-53.056h-40.224V391.584l-94.912-57.152-106.24 36.992V293.6l257.472-114.304v738.848H864v-48.992h-32.192v0.032zM256.544 595.68l189.056-61.216v-81.632l-189.056 65.312v77.536z m0 106.144l189.056-40.832v-81.632l-189.056 48.992v73.472z m0 110.208l189.056-24.512v-81.632l-189.056 28.576v77.568z m0 106.112l189.056-4.096v-81.632l-189.056 8.192v77.536z" p-id="818"></path>',
                },
            ];
        },
    }}
/>;
```

`extend.marker` 的 API 很简单，就是一个返回图标配置数组的函数。返回的图标配置中，name 代表 icon 的标识，也就是 G6 NodeShape 中 Marker 的 symbol 属性的值。path 就是 SVG 图标的 XML 代码。

`extend.marker` 函数的 API 参见[文档](/zh/docs/api/extend#exendmarker)。 -->
