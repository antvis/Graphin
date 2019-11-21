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
| r      | `number` | Number of nodes * 10 | Radius of the circle    |
| scale  | `number` | 0.8                      | Scaling ratio    |


### 02. `concentric`

-   name: concentric

-   character: The nodes are sorted by degree, and a group of nodes with a large degree are arranged at the center, and nodes with a small degree are distributed at the outermost layer.

-   scene: When we find the key node in a group of nodes, it has the most related nodes. so with the circle layout, we can easily find this key node in the center.

|   Property         | Type       | Default                                   | Description                                       |
| -------------- | ---------- | ---------------------------------------- | ------------------------------------------ |
| boundingBox    | `object`   | { x:0, y:0, w:CanvasWidth, h:CanvasHeight } | Range of the layout  |
| minNodeSpacing | `number`   | 60                                       | Distance between nodes                   |
| levelWidth     | `function` | (nodes: Data['nodes'], maxDegree: number) => number | range of degree in each layer                         |

example of levelWidth:

```tsx
const LevelWidthFunction = (nodes: Data['nodes'], maxDegree: number) => {
    /** Number of layers */
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
| align    | `string`          | `UL`                      | position           |

### 06. `force`

-   name: force
-   character: The nodes are distributed according to the natural force. The simulated charge repulsion between the nodes remains disjoint, and the spring tension is not dissociated. Finally, a force balance is achieved in multiple dynamic iterations.
-   scene: When you want to solve the problem of intersecting nodes, it is very suitable to use the force layout. Generally used as a pre-layout for other layouts

|   Property   | Type     | Default         | Description                             |
| ------------------ | -------- | ------------------------------ | -------------------------------------------------------------------------- |
| preset             | `object` | { name: 'random',options:{}} | Front layout that is used for switching layout mainly. tweak layout algorithm will be used when the current layout is force |
| stiffness          | `number` | 200                            | Spring stiffness factor                                                               |
| defSpringLen       | `number` | 200                            | Default spring length                                                               |
| repulsion          | `number` | 200.0 \* 5                     | Repulsive force, here refers to the Coulomb constant Ke                                                |
| damping            | `number` | 0.9                            | Damping coefficient                                          |
| minEnergyThreshold | `number` | 0.1                            | Minimum energy threshold               |
| maxSpeed           | `number` | 1000                           | Maximum speed, range interval [0,1000]                                                        |
| MaxIterations      | `number` | 1000000                        | 1000000 times/(1000/60) = 60000 s = 1 min                                        |
| animation          | `bolean` | true                           | Whether to turn on animation                                                               |

```tsx
// details of the force layout:

- edge.data.spring can be used to set the spring length of edge
- node.layout.force.mass can be used to set the quality of the node
```
