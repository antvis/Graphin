---
title: Layout 自动布局
order: 1
---

在图分析过程中，针对不同的分析场景，我们需要不同的布局方案：

## 01. 布局的定义

> -   布局 顾名思义是如何放置节点， 反应在 Graphin 的 `data.nodes` 中就是节点的 x，y 坐标
> -   布局算法 就是一个函数，用来给 node 添加 x，y 信息

```tsx
<Graphin data={data} layout={{ name: 'force', options: {} }} />
```

## 02. 内置的布局

### 01.circle

-   名称： 圆圆形局

-   特点：整体呈现圆排布。

-   适用场景：当我们找到一群点中的关键节点，它所联系的节点最多，那么利用圆形布局，便可以在中心处轻松找到

|   属性 | 类型     | 默认值                   | 说明        |
| ------ | -------- | ------------------------ | ----------- |
| x      | `number` | `CanvasWidth / 2`        | 圆心 x 坐标 |
| y      | `number` | `CanvasHeight / 2`       | 圆心 y 坐标 |
| r      | `number` | `data.nodes.length * 10` | 圆的半径    |
| scale  | `number` | 0.8                      | 缩放比率    |

### 02.concentric

-   名称： 同心圆布局

-   特点：将节点按照度数排序，节点度数大的一群点会排列在最中心，度数小的节点会分布在最外层。整体呈现同心圆排布。

-   适用场景：当我们找到一群点中的关键节点，它所联系的节点最多，那么利用圆形布局，便可以在中心处轻松找到

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

### 03.grid

名称： 网格布局

特点：将节点依次整齐排列，呈现网格状

适用场景：节点的位置按照用户自定义后的排序展开，清晰明了，一般用于其他布局的前置分析。

|   属性   | 类型     | 默认值         | 说明                             |
| -------- | -------- | -------------- | -------------------------------- |
| width    | `number` | `CanvasWidth`  | 布局范围的宽度                   |
| height   | `number` | `CanvasHeight` | 布局范围的高度                   |
| nodeSep  | `number` | 100            | 节点间的间距，上下左右均是一致的 |
| nodeSize | `number` | 50             | 节点的大小，单位 px              |

### 04.radial

-   名称：迳向布局
-   特点：节点像雷达一样散开，是静态布局里解决交叉问题的主要布局算法
-   适用场景

|   属性         | 类型              | 默认值                           | 说明       |
| -------------- | ----------------- | -------------------------------- | ---------- |
| center         | `[number,number]` | `[CanvasWidth/2,CanvasHeight/2]` | 中心点坐标 |
| preventOverlap | `bolean`          | `CanvasHeight`                   | 防止覆盖   |
| nodeSize       | `number`          | 100                              | 节点大小   |
| unitRadius     | `number`          | 150                              | 每层的半径 |

### 05.dagre

-   名称：有向层次布局
-   特点：按照边的方向与节点的层次，呈现树形排列
-   适用场景：我们需要知道一群数据里的层次结构，上下游关系，那么 dagre 有向层次布局便是非常好的办法。

|   属性   | 类型              | 默认值                    | 说明               |
| -------- | ----------------- | ------------------------- | ------------------ |
| center   | `[number,number]` | `[width / 2, height / 2]` | 中心点坐标         |
| nodeSize | `number`          | `CanvasHeight`            | 节点大小           |
| nodesep  | `number`          | 12                        | 节点水平间距(px)   |
| ranksep  | `number`          | 50                        | 每一层节点之间间距 |
| align    | `string`          | `UL`                      | 放置位置           |

### 06.force

-   名称： 力导布局
-   特点：节点按照自然受力进行分布，节点间模拟电荷斥力保持不相交，边通过弹簧拉力保持不相离，最终在多次动态迭代，达到一个受力平衡
-   适用场景：想解决点边相交问题的时候，使用力导非常合适。一般作为其他布局的后置布局使用

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
