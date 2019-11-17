---
title: API
order: 3
---

## Graphin

> Description of the props of the Graphin component


|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| data     | [Data](#data)         | **yes** | rendering Data      |
| layout   | [Layout](#layout)     | no       | layout Information      |
| options  | [Options](#option)    | no       | configuration Information      |
| ref      | [Ref](#ref)           | no       | ref Instance      |
| extend   | [Extend](#extend)     | no       | extend   |
| register | [Register](#register) | no       | register |

## Data

> Data-driven, 1. Can add and delete nodes and edges, 2. Can save and render graphs


|   Property | Type                   | Required | Description       |
| ------ | ---------------------- | -------- | ---------- |
| nodes  | [`Array<Node>`](#node) | yes       | collection of nodes |
| edges  | [`Array<Edge>`](#edge) | yes       | collection of edges   |

### Node

|   Property         | Type                    | Required | Description                                              |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------- |
| id             | `string`                              | **yes** | unique ID                                 |
| data           | [NodeData](#nodedata)                 | **yes** | source data |
| shape          | `string`                              | no       | type of the node (NodeShape), the default value is `CircleNode`   |
| style          | [NodeDefaultStyle](#nodedefaultstyle) | no       | style corresponding to NodeShape                     |
| x              | `number`                              | no       | the x coordinate of the node                           |
| y              | `number`                              | no       | the y coordinate of the node                            |
| layout         | Register                              | no       | layout                                            |
| `[key:string]` | `any`                                 | no       | custom property              |
|                |

### NodeData

|   Property         | Type     | Required | Description                    |
| -------------- | -------- | -------- | ----------------------- |
| id             | `string` | **_yes_** | unique identifier for the node |
| label          | `string` | no       | text information for node          |
| properties     | `any`    | no       | node properties              |
| `[key:string]` | `any`    | no       | Other Propertys               |

### NodeDefaultStyle

|   Property       | Default    | Description           |
| ------------ | --------- | -------------- |
| nodeSize     | 20        | size of node     |
| primaryColor | '#9900EF' | the main color of node |
| fontSize     | 12        | font Size of text |
| fontColor    | '#3b3b3b' | font Color of text |
| dark         | '#eee'    | dark 置灰      |

### Edge

|   Property         | Type     | Required | Description                         |
| -------------- | -------- | -------- | ---------------------------- |
| data           | `any`    | **_yes_** | data of edge               |
| source         | `string` | **_yes_** | ID of source node          |
| target         | `string` | **_yes_** | ID of target node        |
| shape          | `string` | no       | edge type, default value is `LineEdge` |
| label          | `string` | no       | text information of edge                      |
| style          | `any`    | no       | style                    |
| spring         | `numbe`  | no       | spring length of the edge which is used when the layout is force layout     |
| `[key:string]` | `any`    | no       | custom property   |

## Layout

> layout

|   Property  | Type                                    | Required | Description                      |
| ------- | --------------------------------------- | -------- | ------------------------- |
| name    | `string`                                | **_yes_** | layout name           |
| options | `any`                                   | no       | layout configuration           |
|         | [CircleOptions](#circleoptions)         | no       | parameters of circle layout      |
|         | [ConcentricOptions](#concentricoptions) | no       | parameters of concentric layout |
|         | [GridLOptions](#gridoptions)            | no       | parameters of grid layout         |
|         | [RadialOptions]](#radialoptions)        | no       | parameters of radial layout        |
|         | [DagreOptions](#dagreoptions)           | no       | parameters of dagre layout   |
|         | [ForceOptions](#forceoptions)           | no       | parameters of force layout        |

### CircleOptions

|   Property | Type     | Default                   | Description        |
| ------ | -------- | ------------------------ | ----------- |
| x      | `number` | `CanvasWidth / 2`        | x Coordinates of the center |
| y      | `number` | `CanvasHeight / 2`       | y Coordinates of the center |
| r      | `number` | `data.nodes.length * 10` | radius of the circle    |
| scale  | `number` | 0.8                      | scaling ratio    |

### ConcentricOptions

|   Property         | Type       | Default                                   | Description                                       |
| -------------- | ---------- | ---------------------------------------- | ------------------------------------------ |
| boundingBox    | `object`   | `{x:0,y:0,w:CanvasWidth,h:CanvasHeight}` | Range of the layout |
| minNodeSpacing | `number`   | 60                                       | Distance between nodes                    |
| levelWidth     | `function` | `LevelWidthFunction`                     | degree range of nodes per layer                        |

```tsx
const LevelWidthFunction = (nodes: Data['nodes'], maxDegree: number) => {
    /** layers of the Concentric layout */
    const levelNum = 8;
    return maxDegree / levelNum;
};
```

### GridLOptions

|   Property   | Type     | Default         | Description                             |
| -------- | -------- | -------------- | -------------------------------- |
| width    | `number` | `CanvasWidth`  | Width of the layout                    |
| height   | `number` | `CanvasHeight` | Height of the layout                   |
| nodeSep  | `number` | 100            | Distance between nodes |
| nodeSize | `number` | 50             | Size of the node              |

### RadialOptions

|   Property         | Type              | Default                           | Description       |
| -------------- | ----------------- | -------------------------------- | ---------- |
| center         | `[number,number]` | `[CanvasWidth/2,CanvasHeight/2]` | coordinate of the center node |
| preventOverlap | `bolean`          | `CanvasHeight`                   | prevent coverage   |
| nodeSize       | `number`          | 100                              | size of node   |
| unitRadius     | `number`          | 150                              | radius of each layer |

### DagreOptions

|   Property   | Type              | Default                    | Description               |
| -------- | ----------------- | ------------------------- | ------------------ |
| center   | `[number,number]` | `[width / 2, height / 2]` | Coordinate of the center node       |
| nodeSize | `number`          | `CanvasHeight`            | size of a node            |
| nodesep  | `number`          | 12                        | horizontal distance between nodes   |
| ranksep  | `number`          | 50                        | vertical distance between nodes |
| align    | `string`          | `UL`                      | 放置位置           |

### ForceOptions

|   Property             | Type     | Default                         | Description                                                                       |
| ------------------ | -------- | ------------------------------ | -------------------------------------------------------------------------- |
| preset             | `object` | `{ name: 'random',options:{}}` | 前置布局，主要用于布局切换。当前置布局为 force 时，内部启动 tweak 布局算法 |
| stiffness          | `number` | 200                            | 弹簧劲度系数                                                               |
| defSpringLen       | `number` | 200                            | default spring length                                                            |
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

## Options

|   Property | Type  | Required | Description |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_yes_** | ..   |

## Extend

|   Property | Type  | Required | Description |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_yes_** | ..   |

## Register

|   Property | Type  | Required | Description |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_yes_** | ..   |

## Ref

|   Property | Type  | Required | Description        |
| ------ | ----- | -------- | ----------- |
| graph  | Graph | yes       | ref of graph |
| apis   | Apis  | no       | apis        |
