---
title: Layout
order: 3
---

The property `layout` of component `<Graphin/>` is used to set the layout of Graphin.

|   Property | Type                            | Required | Description                    |
| ---------- | ------------------------------- | -------- | ------------------------------ |
| name       | string                          | **yes**  | name of the layout             |
| options    | [LayoutOptions](#layoutoptions) | no       | custom configuration of layout |

## LayoutOptions

Different layout is with different configuration. If `layout.name` is a custom layout, LayoutOptions also includes the configuration of the custom layout.

### CircleOptions

configuration of circle layout

|   Property | Type   | Default               | Description                      |
| ---------- | ------ | --------------------- | -------------------------------- |
| x          | number | CanvasWidth / 2       | x Coordinates of the Center node |
| y          | number | CanvasHeight / 2      | y Coordinates of the Center node |
| r          | number | Number of nodes \* 10 | Radius of the circle             |
| scale      | number | 0.8                   | Scaling ratio                    |

### ConcentricOptions

configuration of concentric layout

|   Property     | Type                                                | Default                                | Description                   |
| -------------- | --------------------------------------------------- | -------------------------------------- | ----------------------------- |
| boundingBox    | { x1: number; y1:number; w:number; y:number; }      | {x:0,y:0,w:CanvasWidth,h:CanvasHeight} | Range of the layout           |
| minNodeSpacing | number                                              | 60                                     | Distance between nodes        |
| levelWidth     | (nodes: Data['nodes'], maxDegree: number) => number | below                                  | range of degree in each layer |

LevelWidth Default：

```tsx
const LevelWidth = (nodes: Data['nodes'], maxDegree: number) => {
  /** Number of layers */
  const levelNum = 8;
  return maxDegree / levelNum;
};
```

### GridLOptions

configuration of grid layout

|   Property | Type   | Default      | Description            |
| ---------- | ------ | ------------ | ---------------------- |
| width      | number | CanvasWidth  | Width of the layout    |
| height     | number | CanvasHeight | Height of the layout   |
| nodeSep    | number | 100          | Distance between nodes |
| nodeSize   | number | 50           | Size of a node         |

### RadialOptions

configuration of radial layout

|   Property     | Type            | Default                        | Description                   |
| -------------- | --------------- | ------------------------------ | ----------------------------- |
| center         | [number,number] | [CanvasWidth/2,CanvasHeight/2] | Coordinate of the center node |
| preventOverlap | boolean         | true                           | prevent coverage              |
| nodeSize       | number          | 100                            | Size of a node                |
| unitRadius     | number          | 150                            | Radius of each layer          |

### DagreOptions

configuration of dagre layout

|   Property | Type            | Default                             | Description                                                                         |
| ---------- | --------------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| center     | [number,number] | [CanvasWidth / 2, CanvasHeight / 2] | coordinate of the center node                                                       |
| nodeSize   | number          | CanvasHeight                        | size of a node                                                                      |
| nodesep    | number          | 12                                  | horizontal distance between nodes                                                   |
| ranksep    | number          | 50                                  | vertical distance between nodes                                                     |
| align      | string          | UL                                  | position, see [G6 Document](https://www.yuque.com/antv/g6/fkhp3c#sSXQJ) for details |

### ForceOptions

configuration of force layout

|   Property         | Type                          | Default                                               | Description                                                                                                                 |
| ------------------ | ----------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| preset             | [Layout](/en/docs/api/layout) | `{ name: 'random',options:{}}`                        | Front layout that is used for switching layout mainly. tweak layout algorithm will be used when the current layout is force |
| stiffness          | number                        | 200                                                   | Spring stiffness factor                                                                                                     |
| defSpringLen       | function                      | (edge: Edge, source: Point, target: Point) => number; | The default spring length, version 1.1.0 changed to function, can set the initial length for each edge                      | length |
| repulsion          | number                        | 200.0 \* 5                                            | Repulsive force, here refers to the Coulomb constant Ke                                                                     |
| damping            | number                        | 0.9                                                   | Damping coefficient                                                                                                         |
| minEnergyThreshold | number                        | 0.1                                                   | Minimum energy threshold                                                                                                    |
| maxSpeed           | number                        | 1000                                                  | Maximum speed, range interval [0,1000]                                                                                      |
| MaxIterations      | number                        | 1000000                                               | 1000000 times/(1000/60) = 60000 s = 1 min                                                                                   |
| animation          | bolean                        | true                                                  | Whether to turn on animation                                                                                                |
| enableWorker       | bolean                        | false                                                 | Whether to start webworker, when big data node rendering, we recommend that you open, can not block UI rendering            |

Small details of the force layout:

- edge.data.spring can be used to set the spring length of edge
- node.layout.force.mass can be used to set the quality of the node
