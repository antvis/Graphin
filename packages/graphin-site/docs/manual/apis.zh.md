---
title: API手册
order: 3
---

## Graphin

> Graphin 组件的 props 属性说明

|   属性   | 类型                  | 是否必选 | 说明          |
| -------- | --------------------- | -------- | ------------- |
| data     | [Data](#data)         | **_是_** | 渲染数据      |
| layout   | [Layout](#layout)     | 否       | 布局信息      |
| options  | [Options](#option)    | 否       | 配置信息      |
| ref      | [Ref](#ref)           | 否       | Ref 实例      |
| extend   | [Extend](#extend)     | 否       | Extend 扩展   |
| register | [Register](#register) | 否       | Register 注册 |

## Data

> 数据驱动，1.可以实现节点和边的添加与删除，2.可以实现图的保存与渲染

|   属性 | 类型                   | 是否必选 | 说明       |
| ------ | ---------------------- | -------- | ---------- |
| nodes  | [`Array<Node>`](#node) | 是       | 节点的集合 |
| edges  | [`Array<Edge>`](#edge) | 是       | 边的集合   |

### Node

|   属性         | 类型                                  | 是否必选 | 说明                                              |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------- |
| id             | `string`                              | **_是_** | 唯一标示 ID，必选                                 |
| data           | [NodeData](#nodedata)                 | **_是_** | 节点源数据,必选，通常将后端数据存储在 data 字段中 |
| shape          | `string`                              | 否       | 节点的图形类型(NodeShape) ，默认值为`CircleNode`  |
| style          | [NodeDefaultStyle](#nodedefaultstyle) | 否       | 和 NodeShape 相对应的样式信息                     |
| x              | `number`                              | 否       | 节点的位置信息：X 坐标                            |
| y              | `number`                              | 否       | 节点的位置信息：Y 坐标                            |
| layout         | Register                              | 否       | 图数据                                            |
| `[key:string]` | `any`                                 | 否       | 其余用户自定义的属性，也是支持挂载的              |
|                |

### NodeData

|   属性         | 类型     | 是否必选 | 说明                    |
| -------------- | -------- | -------- | ----------------------- |
| id             | `string` | **_是_** | 节点的唯一标示 ID，必选 |
| label          | `string` | 否       | 节点的文本信息          |
| properties     | `any`    | 否       | 节点的属性              |
| `[key:string]` | `any`    | 否       | 其余属性                |

### NodeDefaultStyle

|   属性       | 默认值    | 说明           |
| ------------ | --------- | -------------- |
| nodeSize     | 20        | 节点的大小     |
| primaryColor | '#9900EF' | 节点的主要颜色 |
| fontSize     | 12        | 文本的字体大小 |
| fontColor    | '#3b3b3b' | 文本的字体颜色 |
| dark         | '#eee'    | dark 置灰      |

### Edge

|   属性         | 类型     | 是否必选 | 说明                         |
| -------------- | -------- | -------- | ---------------------------- |
| data           | `any`    | **_是_** | 边的数据，必选               |
| source         | `string` | **_是_** | 边的 源节点 ID，必选         |
| target         | `string` | **_是_** | 边的 目标节点 ID，必选       |
| shape          | `string` | 否       | 边的类型，默认值为`LineEdge` |
| label          | `string` | 否       | 边的文本                     |
| style          | `any`    | 否       | 节点的属性                   |
| spring         | `numbe`  | 否       | 边的弹簧长度，力导时使用     |
| `[key:string]` | `any`    | 否       | 其余边的属性，用户自行挂载   |

## Layout

> 布局

|   属性  | 类型                                    | 是否必选 | 含义                      |
| ------- | --------------------------------------- | -------- | ------------------------- |
| name    | `string`                                | **_是_** | 布局名称，必选            |
| options | `any`                                   | 否       | 布局配置，可选,           |
|         | [CircleOptions](#circleoptions)         | 否       | 圆形布局参数 circle       |
|         | [ConcentricOptions](#concentricoptions) | 否       | 同心圆布局参数 concentric |
|         | [GridLOptions](#gridoptions)            | 否       | 横纵布局参数 grid         |
|         | [RadialOptions]](#radialoptions)        | 否       | 径向布局参数 radial       |
|         | [DagreOptions](#dagreoptions)           | 否       | 有向分层布局参数 dagre    |
|         | [ForceOptions](#forceoptions)           | 否       | 力导布局参数 force        |

### CircleOptions

|   属性 | 类型     | 默认值                   | 说明        |
| ------ | -------- | ------------------------ | ----------- |
| x      | `number` | `CanvasWidth / 2`        | 圆心 x 坐标 |
| y      | `number` | `CanvasHeight / 2`       | 圆心 y 坐标 |
| r      | `number` | `data.nodes.length * 10` | 圆的半径    |
| scale  | `number` | 0.8                      | 缩放比率    |

### ConcentricOptions

|   属性         | 类型       | 默认值                                   | 说明                                       |
| -------------- | ---------- | ---------------------------------------- | ------------------------------------------ |
| boundingBox    | `object`   | `{x:0,y:0,w:CanvasWidth,y:CanvasHeight}` | 同心圆的布局范围，默认为当前画布的宽高范围 |
| minNodeSpacing | `number`   | 60                                       | 节点间的距离，默认为 60                    |
| levelWidth     | `function` | `LevelWidthFunction`                     | 每层的节点度数范围                         |

```tsx
const LevelWidthFunction = (nodes: Data['nodes'], maxDegree: number) => {
    /** 同心圆层数 */
    const levelNum = 8;
    return maxDegree / levelNum;
};
```

### GridLOptions

|   属性   | 类型     | 默认值         | 说明                             |
| -------- | -------- | -------------- | -------------------------------- |
| width    | `number` | `CanvasWidth`  | 布局范围的宽度                   |
| height   | `number` | `CanvasHeight` | 布局范围的高度                   |
| nodeSep  | `number` | 100            | 节点间的间距，上下左右均是一致的 |
| nodeSize | `number` | 50             | 节点的大小，单位 px              |

### RadialOptions

|   属性         | 类型              | 默认值                           | 说明       |
| -------------- | ----------------- | -------------------------------- | ---------- |
| center         | `[number,number]` | `[CanvasWidth/2,CanvasHeight/2]` | 中心点坐标 |
| preventOverlap | `bolean`          | `CanvasHeight`                   | 防止覆盖   |
| nodeSize       | `number`          | 100                              | 节点大小   |
| unitRadius     | `number`          | 150                              | 每层的半径 |

### DagreOptions

|   属性   | 类型              | 默认值                    | 说明               |
| -------- | ----------------- | ------------------------- | ------------------ |
| center   | `[number,number]` | `[width / 2, height / 2]` | 中心点坐标         |
| nodeSize | `number`          | `CanvasHeight`            | 节点大小           |
| nodesep  | `number`          | 12                        | 节点水平间距(px)   |
| ranksep  | `number`          | 50                        | 每一层节点之间间距 |
| align    | `string`          | `UL`                      | 放置位置           |

### ForceOptions

|   属性             | 类型     | 默认值                         | 说明                                                                       |
| ------------------ | -------- | ------------------------------ | -------------------------------------------------------------------------- |
| preset             | `object` | `{ name: 'random',options:{}}` | 前置布局，主要用于布局切换。当前置布局为 force 时，内部启动 tweak 布局算法 |
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

## Options

|   属性 | 类型  | 是否必选 | 含义 |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_是_** | ..   |

## Extend

|   属性 | 类型  | 是否必选 | 含义 |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_是_** | ..   |

## Register

|   属性 | 类型  | 是否必选 | 含义 |
| ------ | ----- | -------- | ---- |
| ..     | `any` | **_是_** | ..   |

## Ref

|   属性 | 类型  | 是否必选 | 含义        |
| ------ | ----- | -------- | ----------- |
| graph  | Graph | 是       | G6 的图实例 |
| apis   | Apis  | 否       | apis        |
