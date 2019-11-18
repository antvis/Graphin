---
title: Extend
order: 0
---

## Extend

Extend As the name implies means extension. Graphin supports 3 extension types: extending custom layouts, extending custom nodes, and extending custom icons.

Graphin has built-in layouts, nodes and icons. In addition, Graphin provides users with an extension mechanism that allows users to easily configure custom layouts, nodes and charts via extend.

The extension is implemented by `props.extend`:

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

Let's see how to customize the layout, nodes and icons.

## Extend layout

Let's implement a simple random layout as an example.

First we have to define a layout function:

```tsx
import Graphin, { Data, GraphinProps, LayoutOption } from '@antv/graphin';

const layout = (graphin: Graphin, props: GraphinProps) => {
    return [
        {
            name: 'custom',
            desc: 'random layout',
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

This layout function returns an array which is a custom layout configuration. The most critical part of the layout configuration is the layout method, which accepts data as a parameter and then returns the modified data. Through the layout function, What is modified is the x and y attributes on each node, which is to attach location information to each node.

Next we pass this function in Graphin's `extend.layout` and make `layout.name` custom, then we can use this custom layout.

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

The API for the `extend.layout` function is described in [documentation] (/zh/docs/api/layout).

## Extend node

The extend of node refers to extending NodeShape, which is the rendered shape and style of the nodes in G6.

In Graphin, we support configuring NodeShape in the form of a JSON configuration. Let developers extend the NodeShape declaratively without using G6's API.

For example, we want to register a new NodeShape of type RectNode. First we have to define a NodeShape function:

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

JSON configuration document ->

## Extend icon


If you want to display a custom icon on the Graphin node, you need to extend it with `extend.marker`:

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

The `extend.marker` API is very simple, a function that returns an array of icon configurations. In the returned icon configuration, name represents the identifier of the icon, which is the value of the symbol property of the Marker in the G6 NodeShape. Path is the XML code of the SVG icon.
