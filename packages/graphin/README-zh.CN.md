![Graphin](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*EkJmRrmuJAgAAAAAAAAAAABkARQnAQ)
## About 简介

Graphin 意为 Graph Insight 图的分析洞察，象形 Graphene 石墨烯，蕴藏未来的潜力。

Graphin 是一个基于G6封装的React组件库，专注在图分析领域。

- 底层 使用G6作为图的渲染，交互，布局引擎。
- 外层 使用React进行组件化开发，提高开发者效率。
- 上层 沉淀聚合 业界优秀图分析产品的功能特性。

从上述可以看出，Graphin的G6底层让我们有图可视化的能力，外层的React封装，让我们提高开发效率，上层的产品功能沉淀，让我们的分析更加专业出彩

## Installation 安装
```bash

npm install @antv/graphin --save

```


## Usage 用法

```js

import React from 'react'
import ReactDOM from 'react-dom';
import Graphin,{Utils} from '@antv/graphin'


const SimpleDemo =()=>{
    const data = Utils.mock(10).circle("node-0")
    return <Graphin data={data}></Graphin>
} 

ReactDOM.render(<SimpleDemo />, document.getElementById('root'));

```

## APIS

### GraphinProps

Graphin是一个React组件，基于数据驱动

| 属性 | 说明 | 类型 |  选项  
| --- | --- | --- | --- | 
| data | 图数据 | Data |  必选 | 
| options | 配置项 | GraphOptions |  可选|  
| layout | 布局 | GraphLayout |  可选 |  
| registerMarker | 注册图标 | G6RegisteMarker |  可选 |  
 
| registerNode | 注册节点 | G6RegisterNode |  可选 |  
| registerEdge | 注册边 | G6RegisterEdge |  可选 |   
| renderNodeShape | 渲染节点 | GraphDiffuse |  可选 |  
| renderEdgeShape | 渲染边 | GraphDiffuse |  可选 |  
| children | Children内容 | GraphChildren |  可选 |  


#### 01.data

- 属性说明

data是Graphin中的唯一必须参数。当data为 `{nodes:[],edges:[]}` 则渲染出一个空画布。当data数据变化的时候，Graphin内部会自动更新画布，改变data可以实现增量添加和全量替换等功能。


- 类型定义：Data

```tsx

export interface Data {
    /** 节点 */
    nodes: NodeData[];
    /** 边 */
    edges: EdgeData[];
}

export interface NodeData {
    /** 唯一标示ID，必选 */
    id: string;
    /** 节点类型 */
    type?: string;
    /** 节点文本 */
    label?: string;
    /** 节点属性 */
    properties?: object[];
}

export interface EdgeData {
    /** 边的源节点，必选 */
    source: string;
    /** 边的目标节点，必选 */
    target: string;
    /** 边的ID */
    id?: string;
    /** 边的类型 */
    type?: string;
    /** 边的文本 */
    label?: string;
    /** 边的属性 */
    properties?: object[];
}

```

- Mock函数

Graphin提供Mock函数，帮助我们生成data数据

```jsx

import {Utils} from '@antv/graphin'

/** Mock节点个数：10，边的裁剪方式：选举中心点，默认中心点为"node-0" **/
const data0 = Utils.mock(10).circle()
const data1 = Utils.mock(20).circle('node-2')
/** Mock节点个数：10，边的裁剪方式：随机裁剪，默认裁剪的稀疏参数为0.3 **/
const data2 = Utils.mock(10).random()
const data3 = Utils.mock(10).random(0.6)

```



#### 02.options

- 属性说明

options是对图的初始化配置，用户可以不用配置。

- 类型定义 GraphOptions

```tsx
export interface GraphOptions {
    /** 缩放比例，默认值 1 */
    zoom?: number;
    /** 平移的位置 */
    pan?: { x: number; y: number };
    /** 最小缩放值，默认值 0.1*/
    minZoom?: number;
    /** 最大缩放值，默认值 10*/
    maxZoom?: number;
    /** 禁止画布平移 ，默认值 false**/
    disablePan?: boolean;
    /** 禁用画布缩放，默认值 false */
    disableZoom?: boolean;
    /** 禁用节点拖拽 ，默认值 false*/
    disableDrag?: boolean;
    /** 缩放的敏感度，我们在内部有不同设备的最佳匹配，默认值 1 */
    wheelSensitivity?: number;
    /** 是否开启动画，默认值 true */
    animate?: boolean;
    /** G6的插件 */
    plugins: any[];
}
```

#### 03.layout

- 属性说明

layout是对数据data的位置(x,y)处理，每次改变layout，Graphin都会感知，从而进行布局切换，具体功能特性参考：[Automatic layouts  自动布局](#layout)

- 类型定义

```tsx
export interface Layout {
    /** 布局名称，必选 */
    name: string;
    /** 布局配置，可选 */
    options?: object;
}
```

- grid options 
[grid 网格布局](#grid)
```tsx
    {
        name:"grid",
        options:{
             /** 布局范围的宽度 */
            width,
            /** 布局范围的高度 */
            height,
            /** 节点间的间距，上下左右均是一致的 */
            nodeSep: 100,
            /** 节点的大小，单位px */
            nodeSize: 50,
        }
    }
    
```

- concentric options 
[concentric 同心圆](#concentric)
```tsx
    {
        name:"concentric",
        options:{
            /** 同心圆的布局范围，默认为当前画布的宽高范围 */
            boundingBox: {
                x1: 0,
                y1: 0,
                w: width,
                h: height,
            },
            /** 节点间的距离，默认为60 */
            minNodeSpacing: 60,
            /** 每层的节点度数范围*/
            levelWidth: (nodes: object, maxDegree: number) => {
                /** 同心圆层数 */
                const levelNum = 3;
                return maxDegree / levelNum;
            },
        }
    }
    
```

- force options 
[force 力导布局](#force)
```tsx
    {
        name:"force",
        options:{
            stiffness: 200.0, // spring stiffness 弹簧劲度系数
            defSpringLen: null, //默认的弹簧长度
            repulsion: 200.0 * SPEED, // repulsion 斥力，这里指代 库伦常量Ke
            damping: 0.9, // volocity damping factor 速度的减震因子，其实就是阻尼系数
            minEnergyThreshold: 0.1, //0.1, // 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽
            maxSpeed: 1000, // 最大的速度 ？[0,1000]的加速度
            coulombDisScale: 0.005, //0.005, // default Coulombs Constant
            MaxIterations: 240, // 1000000次/(1000/60) = 60000s = 1min
            animation: true,
        }
    }
    
```

- radial options 
[radial 迳向布局](#radial)
```tsx
    {
        name:"radial",
        options:{
            /** 中心点坐标 */
            center: [width / 2, height / 2],
            /** 防止覆盖 */
            preventOverlap: true,
            /** 节点大小 */
            nodeSize: 50,
            /** 每层的半径 */
            unitRadius: 120,
        }
    }
    
```
- dagre options 
[dagre 有向分层布局](#dagre)
```tsx
    {
        name:"dagre",
        options:{
            /** 中心点坐标 */
            center: [width / 2, height / 2],
            /** 节点大小 */
            nodeSize: [50, 50],
            /**  节点水平间距(px) */
            nodesep: 12,
            /** 每一层节点之间间距 */
            ranksep: 50,
            /** 防止位置 */
            align: 'UL',
        }
    }
    
```



 

## Feature 功能

### 01. Data driven 数据驱动

#### 01.增量数据添加

在图分析的过程中，我们需要增量添加节点，节点添加后的位置就是一个值得讨论的问题，Graphin采用前置布局的方案，将新增节点加入前置布局里，以达到添加后节点的稳定与美观。

![Oct-09-2019 20-20-07.gif](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*t9cNQbcmZpcAAAAAAAAAAABkARQnAQ) 

#### 02.全量数据渲染

在图分析过程中，我们有时需要全量渲染数据，例如需要将保存的图再次渲染出来。这种情况下，我们数据的变化也会同步被Graphin感知到

![全量添加](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*iGCgQaHq3BgAAAAAAAAAAABkARQnAQ)

### 02. Automatic layouts  自动布局
<span id='layout'></span>
在图分析过程中，针对不同的分析场景，我们需要不同的布局方案：

#### 01.concentric 同心圆布局 
<span id='concentric'></span>
该布局的特点是：将节点按照度数排序，节点度数大的一群点会排列在最中心，度数小的节点会分布在最外层。整体呈现同心圆排布。
适用场景：当我们找到一群点中的关键节点，它所联系的节点最多，那么利用圆形布局，便可以在中心处轻松找到

#### 02.grid 网格布局
<span id='grid'></span>
该布局的特点是：将节点依次整齐排列，呈现网格状
适用场景：节点的位置按照用户自定义后的排序展开，清晰明了，一般用于其他布局的前置分析。


#### 03.force 力导布局
<span id='force'></span>
该布局的特点是：节点是平等的，完全按照自然受力进行分布，节点间模拟电荷斥力保持不相交，边通过弹簧拉力保持不相离，最终在多次动态迭代，达到一个受力平衡
适用场景：想解决点边相交问题的时候，使用力导非常合适。一般作为其他布局的后置布局使用

#### 04.radial 迳向布局
<span id='radial'></span>
该布局的特点是：节点像雷达一样散开，是静态布局里解决交叉问题的主要布局算法


#### 05.dagre 有向层次布局
<span id='dagre'></span>
该布局的特点是：按照边的方向与节点的层次，呈现树形排列

适用场景：我们需要知道一群数据里的层次结构，上下游关系，那么dagre有向层次布局便是非常好的办法。

![layout](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*mkVrTpJb-GAAAAAAAAAAAABkARQnAQ)

### 03. Analysis Components 分析组件

分析过程是一个动态交互的过程，对于图分析也不例外。因此我们需要一些分析组件帮助我们辅助分析，这里Graphin内置了两款组件：Toobar通用工具栏 和 ContextMenu 右键菜单 ，未来计划新增 MiniMap 缩略图 与 ProptertiesFilter 属性筛选器，从而达到让用户高效分析的目的 

#### 01.Toolbar 通用工具栏

Toolbar内置了4大功能

- todo/redo 撤销重做功能

我们提供了撤销重做的功能，能够让整个分析过程变得可靠，因为用户不必再担心因为误操作而毁坏了之前的分析过程。对于工具型产品，这是基础功能，也是特色功能

- zoomIn/out 缩小放大功能

在分析过程中，当节点数量的变化，布局的变化，引起一些节点可能不在当前视窗内，这个时候我们就需要缩放功能帮助我们调整视窗的范围，配合画布的拖拽，能让我们不丢失全局（zoomOut），也不损失细节（zoomIn）

- fullscreen 全屏功能

触发后，整个画布占满浏览器窗口，当你的画布页在业务中占比很小的时候，这将非常有用。


- foucs 节点聚焦功能

输入节点ID，将自动对焦到该节点，将和Search功能配套起来，支持模糊搜索，快速定位，这将大大提高你的分析效率


- Snapshot 快照下载

当你希望保存当前的画布给别人分享，下载快照将会是一个非常有用的功能。


![toolbar](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*2I2ITbEL7x4AAAAAAAAAAABkARQnAQ)

#### 02.ContextMenu 右键菜单

在画布上，我们在节点上右键菜单，将会出现更多的操作选项，如果说Toolbar是针对整个画布的操作，那么ContextMenu则是针对单独的节点做操作，对于单个节点，我们通用的分析操作有如下：

- 复制

复制节点ID，以便于你的后续操作

- 反选

反选节点，这种排除法，是选择其他节点的一种快捷方式

- 删除

删除该节点，删除后，剩余的节点将重新布局，渲染，这在我们做案件排查的时候，删除已经确定的关键节点，重新布局分析能够减少我们的分析干扰。

- 新增画布分析

当我们在前一次分析中筛选出的关键节点，可以通过右键菜单，新建画布分析的方式，在一个新的画布中做二次分析，减少无用信息的干扰

- 业务相关

业务特有的一些针对节点的操作，比如给该节点打标，进行关系扩散，或者发起数据请求什么的



#### 03.MiniMap 缩略图

整个图可视化中的关键问题是“size”，当节点数量很多的时候，用户视窗内的展示节点数量有限，这就需要我们适用MiniMap 缩略图去定位当前我们处于画布的什么位置

其次，我们也可以通过MiniMap快速定位，导航到我们需要的节点位置

#### 04.PropertiesFilter 属性筛选器

属性筛选器 是针对属性进行筛选的一个组件。这里就引发两个主要问题，什么是属性Properties？为什么要筛选它？

图是一种非常经典的数据模型，Node-Edge 这样的单元不断组合就形成了图。其中Node和Edge的右下脚应该还有一个字段，那便是Properties，用于存储Node或者Edge的其他信息，这些信息往往也是我们案件分析中的关键一步，是真正有价值的数据载体。

以 Node 为 自然人实体 举例，一个Properties中可能包含自然人的姓名，性别，年龄，居住城市等等。在一堆的数据里，如果我们能够根据属性去筛选节点，那将极大提高分析效率。属性筛选器就是为这样的目标而设计的。

第二个问题，为什么要在前端完成属性筛选？这个就涉及到图计算引擎的问题。因为关系数据是一种既简单又复杂的数据，简单是因为我们自然中产生的数据大多都是关系数据，复杂在于它的量非常庞大，数据的加工，处理，检索，都是非常有挑战性的。因此后端给到我们的图数据，都是已经对万亿网络节点进行裁剪过的，此时前端再根据属性去反向查找，那机会是灾难性的，也没有太大必要，因为当前图画布里已经包含了这些属性信息。属性筛选器也是为了解决这样的问题而出现。

这块的数据结构有着严格的约定，这块我们之后补充

#### 05.Legend 图例

对于所有的可视化产品，图例几乎是不可缺少的组件，原因是它可以通过颜色映射，直观反应当前图的状态，也可以通过和图例交互，完成与图的交互。
Graphin中提供的图例，能够帮助开发者快速进行颜色映射，也能交互完成节点高亮

#### 06.SheetBar 画布页签

Graphin提供的SheetBar旨在提供一种多画布管理机制，通过页签可以对画布完成 新增，删除，重命名等操作。多个画布间状态相互独立，互补干扰，在我们进行二次分析的时候，非常有用。




### 04. Nodes Expand 关系扩散

风控领域：风险发生的地方往往是风险聚集度最高的地方，因此由一个点扩散去看其他点，是一种分析策略。

![diffuse](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*9xwFRonleusAAAAAAAAAAABkARQnAQ)

### 05. Find  Connections 关系发现

数学领域存在Six Degrees of Separation 的猜想，实体间直连，是一度关系，也可通过算法，发现可能存在的二度关联关系。


### 06. Custom styling 自定义样式

#### 01. Marker  自定义图标

#### 02. Node 自定义节点 

#### 03. Edge 自定义边


### 07. Advanced Analysis 高级分析

#### 01.Geographical Analysis 地理位置分析

#### 02.Time-based Analysis 时序分析

#### 03.Group Navigation Analysis 团伙导航




