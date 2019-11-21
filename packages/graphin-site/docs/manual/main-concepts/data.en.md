---
title: Data
order: 0
---

## 01. Definition of Data

> In graphin, nodes represents the collection of nodes, and edges represents the collection of edges.

-   1. Use TypeScript to define data:

```tsx
export interface Data {
    /** node */
    nodes: Node[];
    /** edge */
    edges: Edge[];
}
```

-   2. important concepts of Node

|   Property | Description                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------- |
| id     | id is the unique identifier of a node. If id does not exist, Graphin will ignore the node.           |
| shape  | shape tells Graphin what kind of node to render, and the default shape is the built-in `CircleNode`. the concept of shape is the same with the shape in G6 |
| data   | Data refers to the specific data of the node        |

-   3. important concepts of Edge

|   Attributr | Description                                                                                |
| ------ | ----------------------------------------------------------------------------------- |
| source | the value of source is the id of the source node                     |
| target | the value of target is the id of the target node   |
| data   | data refers to the specific data of the edge |

> For a complete API, please see [API Manual] (../apis/#data)

## 02. From data to view

Graphin Full data rendering and incremental addition:

-   Incremental data addition: Graphin adds data dynamically according to the pre-layout to achieve node diffusion, relationship discovery and other effects.
-   Full data rendering: Graphin supports full data rendering to Meet the requirements of saving, importing, exporting, etc.

when we use Graphin, we need to pass in the data to be rendered.

Sometimes we need to adjust the color, size, etc. of the nodes dynamically according to some business scenes. In Graphin, it is simple to complete, because we just need to customize a transform function. Graphin is design as a data-driven component so data changing can change the view.

```jsx
<Graphin data={transform(data)} />
```

As for the default `CircleNode` node, we only need to change the style of each node.

|   Property     | Default    | Description           |
| ------------ | --------- | -------------- |
| nodeSize     | 20        | size of node     |
| primaryColor | '#9900EF' | primary color of node |
| fontSize     | 12        | fontSize of text |
| fontColor    | '#3b3b3b' | fontColor of text |
| dark         | '#eee'    | color of the node when it is darkened      |

-   Custom transform function

```tsx
const transform = {
    nodes: (nodes: NodeData[]) => {
        return nodes.map(node => {
            return {
                id: node.id,
                data: node,
                shape: node.type === 'phone' ? 'MyCustomNode' : 'CircleNode',
                style: {
                    nodeSize: node.weight > 20 ? 50 : 20,
                },
            };
        });
    },
    edges: (edges: EdgeData[]) => {
        return edges;
    },
    data: (data: { nodes: NodeData[]; edges: EdgeData[] }) => {
        return {
            nodes: transform.nodes(data.nodes),
            edges: transform.edges(data.edges),
        };
    },
};
```

## 03. Special cases

Through the definition of the data, we know that the data of Graphin is a mandatory option. We have listed several special cases below.

-   How to render an empty canvas

```tsx
<Graphin data={{ nodes: [], edges: [] }} />
```

-  How is the data and layout combined?

There are two key points about rendering

-   1. The shape of the node: it is determined by the shape and id
-   2. The position of the node: it is determined by the x and y of the Node

|   x、y  | Layout    | How to Render                                                    | scenes     |
| ---------- | ------------- | ----------------------------------------------------------- | ------------ |
| exist       | not exist        |  rendering based on x and y of each node                    | render data after saving |
| exist       | exist          | ignore x and y of each node and rendering according to layout.name  | switch layout     |
| not exist     | not exist / exist | rendering according to layout.name                              | render by layout     |
