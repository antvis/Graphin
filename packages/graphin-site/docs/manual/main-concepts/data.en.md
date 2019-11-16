---
title: Data
order: 0
---

## 01. Definition of Data

> In graphin, nodes represents the collection of nodes, and edges represents the collection of edges.

-   1. Use TypeScript to define data:

```tsx
export interface Data {
    /** 节点 */
    nodes: Node[];
    /** 边 */
    edges: Edge[];
}
```

-   2. important concepts of Node

|   属性 | 说明                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------- |
| id     | id is the unique identifier of a node. If id does not exist, Graphin will ignore the node.           |
| shape  | shape tells Graphin what kind of node to render, and the default shape is the built-in `CircleNode`. the concept of shape is the same with the shape in G6 |
| data   | data 保存了后端返回的节点数据。单独用 data 字段来存储是为了避免和 Graphin 的节点数据混在一起          |

-   3. important concepts of Edge

|   属性 | 说明                                                                                |
| ------ | ----------------------------------------------------------------------------------- |
| source | source is the id of the source node                     |
| target | target is the id of the target node   |
| data   | data 保存了后端返回的边数据，单独用 data 字段来存储是为了避免和 Graphin 的节点数据混在一起 |

> 完整的 API，请查看[API 手册](../apis/#data)

## 02. 从数据到视图

Graphin 数据全量渲染和增量添加：

-   增量数据添加：Graphin 会根据前置布局，动态完成增量数据添加，达到节点扩散，关系发现等效果。
-   全量数据渲染：Graphin 支持全量数据渲染，满足保存，导入，导出等需求。

when we use Graphin, we need to pass in the data to be rendered.

Sometimes we need to adjust the color, size, etc. of the nodes dynamically according to some business scenes. In Graphin, it is simple to complete, because we just need to customize a transform function. Graphin is design as a data-driven component so data changing can change the view.

```jsx
<Graphin data={transform(data)} />
```

As for the default `CircleNode` node, we only need to change the style of each node.

|   属性       | 默认值    | 说明           |
| ------------ | --------- | -------------- |
| nodeSize     | 20        | size of node     |
| primaryColor | '#9900EF' | primary color of node |
| fontSize     | 12        | fontSize of text |
| fontColor    | '#3b3b3b' | fontColor of text |
| dark         | '#eee'    | dark 置灰      |

-   Custom transform function

```tsx
const transform = {
    nodes: (nodes: NodeData[]) => {
        return nodes.map(node => {
            return {
                id: node.id,
                data: node,
                // 根据type来指定渲染的shape
                shape: node.type === 'phone' ? 'MyCustomNode' : 'CircleNode',
                // 根据数据的渲染样式
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

## 03. 特殊情况

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
| exist       | not exist        |  rendering based on x and y of each node                    | 图保存再复现 |
| exist       | exist          | ignore x and y of each node and rendering according to layout.name  | switch layout     |
| not exist     | not exist / exist | rendering according to layout.name                              | render by layout     |
