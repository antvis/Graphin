---
title: Layout
order: 3
---

`<Graphin/>` 组件 `props.layout` 配置。用于配置 Graphin 的布局。


|   属性  | 类型                                    | 是否必选 | 说明                      |
| ------- | --------------------------------------- | -------- | ------------------------- |
| name    | string                                | **是** | 布局名称            |
| options | [LayoutOptions](#layoutoptions)                                  | 否       | 用户自定义布局配置           |


## LayoutOptions

根据 Layout 的不同，每个 Layout 有自己的配置。如果是 `layout.name` 是自定义布局，LayoutOptions 也包括自定义布局的配置。

### CircleOptions

圆形布局配置

|   属性 | 类型     | 默认值                   | 说明        |
| ------ | -------- | ------------------------ | ----------- |
| x      | number | 画布宽度 / 2        | 圆心 x 坐标 |
| y      | number | 画布高度 / 2       | 圆心 y 坐标 |
| r      | number | 节点数量 * 10 | 圆的半径    |
| scale  | number | 0.8                      | 缩放比率    |

### ConcentricOptions

同心圆布局配置

|   属性         | 类型       | 默认值                                   | 说明                                       |
| -------------- | ---------- | ---------------------------------------- | ------------------------------------------ |
| boundingBox    | { x: number; y:number; w:number; y:number; }   | {x:0,y:0,w:画布宽度,y:画布高度} | 同心圆的布局范围，默认为当前画布的宽高范围 |
| minNodeSpacing | number   | 60                                       | 节点间的距离                    |
| levelWidth     | (nodes: Data['nodes'], maxDegree: number) => number |       见下方              | 每层的节点度数范围                         |

LevelWidth 默认值：

```tsx
const LevelWidth = (nodes: Data['nodes'], maxDegree: number) => {
    /** 同心圆层数 */
    const levelNum = 8;
    return maxDegree / levelNum;
};
```

### GridLOptions

横纵布局配置

|   属性   | 类型     | 默认值         | 说明                             |
| -------- | -------- | -------------- | -------------------------------- |
| width    | number | 画布宽度  | 布局范围的宽度                   |
| height   | number | 画布高度 | 布局范围的高度                   |
| nodeSep  | number | 100            | 节点间的间距，上下左右均是一致的 |
| nodeSize | number | 50             | 节点的大小，单位 px              |

### RadialOptions

径向布局配置

|   属性         | 类型              | 默认值                           | 说明       |
| -------------- | ----------------- | -------------------------------- | ---------- |
| center         | [number,number] | [画布宽度/2,画布高度/2] | 中心点坐标 |
| preventOverlap | boolean         | 画布高度                   | 是否防止覆盖   |
| nodeSize       | number          | 100                              | 节点大小   |
| unitRadius     | number          | 150                              | 每层的半径 |

### DagreOptions

有向分层布局配置

|   属性   | 类型              | 默认值                    | 说明               |
| -------- | ----------------- | ------------------------- | ------------------ |
| center   | [number,number] | [画布宽度 / 2, 画布高度 / 2] | 中心点坐标         |
| nodeSize | number          | 画布高度            | 节点大小           |
| nodesep  | number          | 12                        | 节点水平间距，单位 px   |
| ranksep  | number          | 50                        | 每一层节点之间间距 |
| align    | string          | UL                      | 放置位置，枚举值见[G6 文档](https://www.yuque.com/antv/g6/fkhp3c#sSXQJ)           |

### ForceOptions

力导布局配置 

|   属性             | 类型     | 默认值                         | 说明                                                                       |
| ------------------ | -------- | ------------------------------ | -------------------------------------------------------------------------- |
| preset             | [Layout](/zh/docs/api/layout) | `{ name: 'random',options:{}}` | 前置布局，主要用于布局切换。当前置布局为 force 时，内部启动 tweak 布局算法 |
| stiffness          | number | 200                            | 弹簧劲度系数                                                               |
| defSpringLen       | number | 200                            | 默认的弹簧长度                                                             |
| repulsion          | number | 200.0 * 5                     | 斥力，这里指代 库伦常量 Ke                                                 |
| damping            | number | 0.9                            | 速度的减震因子，其实就是阻尼系数                                           |
| minEnergyThreshold | number | 0.1                            | 最小能量阈值，粒子运动，有阻尼系数的存在，最终能量会消耗殆尽               |
| maxSpeed           | number | 1000                           | 最大的速度，范围区间 [0,1000]                                                        |
| MaxIterations      | number | 1000000                        | 1000000 次/(1000/60) = 60000 s = 1 min                                       |
| animation          | bolean | true                           | 是否开启动画                                                               |

力导里的小细节：

- edge.data.spring 可以指定设置边的弹簧长度
- node.layout.force.mass 可以设置力导节点的质量
