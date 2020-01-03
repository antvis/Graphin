---
title: Data 数据驱动
order: 0
---

## 01. 数据的定义

> 图的数据结构比较固定。一般用 nodes 表示节点的集合，用 edges 表示边的集合。

-   1. 用 TypeScript 的类型来定义数据 data 如下：

```tsx
export interface Data {
    /** 节点 */
    nodes: Node[];
    /** 边 */
    edges: Edge[];
}
```

-   2. Node 最重要的三个概念

|   属性 | 说明                                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| id     | id 是节点的唯一标识，如果 id 不存在，Graphin 会忽略这个节点                                                      |
| shape  | shape 是告诉 Graphin，渲染什么样的节点，默认设置为内置的 `CircleNode` 类型 。shape 和 G6 中的 shape 是同一个概念 |
| data   | data 保存了后端返回的节点数据。单独用 data 字段来存储是为了避免和 Graphin 的节点数据混在一起                     |

-   3. Edge 最重要的三个概念

|   属性 | 说明                                                                                       |
| ------ | ------------------------------------------------------------------------------------------ |
| source | source 是边连接的源节点的 id ，是 string 类型                                              |
| target | target 是边连接的目标节点的 id ，是 string 类型                                            |
| data   | data 保存了后端返回的边数据，单独用 data 字段来存储是为了避免和 Graphin 的节点数据混在一起 |

> 完整的 API，请查看[API 手册](/zh/docs/api/graphin#data)

## 02. 从数据到视图

Graphin 数据全量渲染和增量添加：

-   增量数据添加：Graphin 会根据前置布局，动态完成增量数据添加，达到节点扩散，关系发现等效果。
-   全量数据渲染：Graphin 支持全量数据渲染，满足保存，导入，导出等需求。

不管是何种方式，我们在使用 Graphin 的时候，只需要传入要渲染的 data 就可以。

有时候我们需要根据业务场景，动态调整节点的颜色，大小等。在 Graphin 中，完成这个需求也很简单，只需要自定义一个 `transform` 函数。因为 Graphin 是数据驱动设计，改变数据即可以改变视图。

```jsx
<Graphin data={transform(data)} />
```

对于默认的 `CircleNode` 节点，我们只需要改变每个节点 style 即可：

|   属性       | 默认值    | 说明                                             |
| ------------ | --------- | ------------------------------------------------ |
| nodeSize     | 20        | 节点的大小                                       |
| primaryColor | '#9900EF' | 节点的主要颜色                                   |
| fontSize     | 12        | 文本的字体大小                                   |
| fontColor    | '#3b3b3b' | 文本的字体颜色                                   |
| dark         | '#eee'    | dark 置灰                                        |
| icon         | 无        | iconfont 的 name                                 |
| fontFamily   | 'graphin' | iconfont 的 fontFamily，默认为 Graphin 内置 icon |

Graphin 的内置 icon 请查阅[内置图标](/zh/docs/manual/icons)

> 这里的 style 属性规范只针对 Graphin 的内置 Shape。如果是自定义 Shape，从 style 到 G6 节点 attr 的映射可以在 Shape 定义时自行配置

综上，我们可以编写 transform 函数来对 Data 进行转换：

```tsx
const transform = (data: { nodes: NodeData[]; edges: EdgeData[] }) => {
    const nodes = (nodes: NodeData[]) => {
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
    };
    const edges = (edges: EdgeData[]) => {
        return edges;
    };
    return {
        nodes: transform.nodes(data.nodes),
        edges: transform.edges(data.edges),
    };
};

<Graphin data={transform.(data)} />;
```

## 03. 特殊情况

通过数据的定义，我们知道 Graphin 的 data 是必选项，我们把几种特殊的情况列举在下面：

-   如何渲染一个空画布

```tsx
<Graphin data={{ nodes: [], edges: [] }} />
```

-   数据 data 和布局 layout 组合起来是如何渲染的？

渲染包含两个关键点

-   1. 节点的形状：它由 shape 和 id 共同决定的
-   2. 节点的位置：它由 Node 的 x 和 y 值决定的

|   x、y 坐标 | Layout 布局   | 渲染结果                                                    | 使用场景     |
| ----------- | ------------- | ----------------------------------------------------------- | ------------ |
| 存在        | 不存在        | 根据 data.nodes 中的 x，y 进行布局渲染                      | 图保存再复现 |
| 存在        | 存在          | 忽略 data.nodes 中的布局信息，根据 layout.name 进行布局渲染 | 布局切换     |
| 不存在      | 不存在 / 存在 | 根据 layout.name 进行布局渲染                               | 布局渲染     |
