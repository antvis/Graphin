---
title: Layout
order: 1
---

In the process of graph analysis, we need different layouts for different analysis scenes.

## 01. Definition of layout

-   Layout, as the name suggests, is how to place nodes. It is determined by x and y of nodes.
-   The layout algorithm is a function that adds x and y to a node.

The layout is specified by Graphin's `props.layout`:

```tsx
<Graphin data={data} layout={{ name: 'force', options: {} }} />
```

## 02. Built-in layout

### 01. `circle`

-   name: circle

-   character: arranged in a circle order.

-   scene: When we find the key node in a group of nodes, it has the most related nodes. so with the circle layout, we can easily find this key node in the center.

|   Property | Type     | Default                   | Description        |
| ------ | -------- | ------------------------ | ----------- |
| x      | `number` | CanvasWidth / 2        |  x of the center node |
| y      | `number` | CanvasHeight / 2       | y of the center node |
| r      | `number` | data.nodes.length * 10 | Radius of the circle    |
| scale  | `number` | 0.8                      | Scaling ratio    |


### 02. `concentric`

-   name: concentric

-   character: The nodes are sorted by degree, and a group of nodes with a large degree are arranged at the center, and nodes with a small degree are distributed at the outermost layer.

-   scene: When we find the key node in a group of nodes, it has the most related nodes. so with the circle layout, we can easily find this key node in the center.

|   Property         | Type       | Default                                   | Description                                       |
| -------------- | ---------- | ---------------------------------------- | ------------------------------------------ |
| boundingBox    | `object`   | { x:0, y:0, w:CanvasWidth, h:CanvasHeight } | Range of the layout  |
| minNodeSpacing | `number`   | 60                                       | Distance between nodes                   |
| levelWidth     | `function` | (nodes: Data['nodes'], maxDegree: number) => number | 每层的节点度数范围                         |

example of levelWidth:

```tsx
const LevelWidthFunction = (nodes: Data['nodes'], maxDegree: number) => {
    /** 同心圆层数 */
    const levelNum = 8;
    return maxDegree / levelNum;
};
```

### 03. `grid`

- name: grid

- character: Arrange the nodes in order, presenting a grid

- scene: The position of the node is expanded according to the user-defined sorting. It is generally used for pre-analysis of other layouts.


|   Property   | Type     | Default         | Description                             |
| -------- | -------- | -------------- | -------------------------------- |
| width    | `number` | CanvasWidth  | Width of the layout                  |
| height   | `number` | CanvasHeight | Height of the layout                  |
| nodeSep  | `number` | 100            | Distance between nodes |
| nodeSize | `number` | 50             | Size of the node              |

### 04. `radial`

-   name: radial
-   character: Nodes spread out like radar, which is the main layout algorithm for solving crossover problems in static layouts.
-   scene:

|   Property   | Type     | Default         | Description                             |
| -------------- | ----------------- | -------------------------------- | ---------- |
| center         | `[number,number]` | [CanvasWidth/2,CanvasHeight/2] | coordinate of the center node|
| preventOverlap | `bolean`          | CanvasHeight                | prevent coverage   |
| nodeSize       | `number`          | 100                              | size of a node   |
| unitRadius     | `number`          | 150                              | radius of each layer |

### 05. `dagre`

-   name: dagre
-   character: Tree arrangement according to the direction of the edge and the level of the node
-   scene: When we need to know the hierarchy, the upstream and downstream relationship of the data, dagre is a good way.


|   Property   | Type     | Default         | Description                             |
| -------- | ----------------- | ------------------------- | ------------------ |
| center   | `[number,number]` | [width / 2, height / 2] | coordinate of the center node        |
| nodeSize | `number`          | CanvasHeight            | size of a node         |
| nodesep  | `number`          | 12                        | horizontal distance between nodes   |
| ranksep  | `number`          | 50                        | vertical distance between nodes |
| align    | `string`          | `UL`                      | 放置位置           |

### 06. `force`

-   name: force
-   character: The nodes are distributed according to the natural force. The simulated charge repulsion between the nodes remains disjoint, and the spring tension is not dissociated. Finally, a force balance is achieved in multiple dynamic iterations.
-   scene: When you want to solve the problem of intersecting nodes, it is very suitable to use the force layout. Generally used as a pre-layout for other layouts

|   Property   | Type     | Default         | Description                             |
| ------------------ | -------- | ------------------------------ | -------------------------------------------------------------------------- |
| preset             | `object` | { name: 'random',options:{}} | 前置布局，主要用于布局切换。当前置布局为 force 时，内部启动 tweak 布局算法 |
| stiffness          | `number` | 200                            | 弹簧劲度系数                                                               |
| defSpringLen       | `number` | 200                            | 默认的弹簧长度                                                             |
| repulsion          | `number` | 200.0 \* 5                     | 斥力，这里指代 库伦常量 Ke                                                 |
| damping            | `number` | 0.9                            | 速度的减震因子，其实就是阻尼系数                                           |
| minEnergyThreshold | `number` | 0.1                            | 最小能量阈值，粒子运动，有阻尼系数的存在，最终能量会消耗殆尽               |
| maxSpeed           | `number` | 1000                           | 最大的速度 [0,1000]                                                        |
| MaxIterations      | `number` | 1000000                        | 1000000 次/(1000/60) = 60000s = 1min                                       |
| animation          | `bolean` | true                           | 是否开启动画                                                               |

```tsx
// 力导里的小细节

- edge.data.spring 可以指定设置边的弹簧长度
- node.layout.force.mass 可以设置力导节点的质量
```
