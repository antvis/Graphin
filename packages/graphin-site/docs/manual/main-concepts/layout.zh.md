---
title: Layout 自动布局
order: 1
---

在图分析过程中，针对不同的分析场景，我们需要不同的布局方案。

## 01. 布局的定义

-   布局，顾名思义是如何放置节点，反应在 Graphin 的 `data.nodes` 中就是节点的 x，y 坐标。
-   布局算法就是一个函数，用来给节点添加 x，y 坐标。

布局的指定是通过 Graphin 的 `props.layout` 实现的：

```tsx
<Graphin data={data} layout={{ name: 'force', options: {} }} />
```

## 02. 内置布局

### 01. **circle**

-   名称：圆形布局

-   特点：整体呈现圆形排布。

-   适用场景：当我们找到一群点中的关键节点，它所联系的节点最多，那么利用圆形布局，便可以在中心处轻松找到这个关键节点

使用实例：

<iframe
     src="https://codesandbox.io/embed/data-driven-lc4pn?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-circle"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

圆形布局配置请查看 [API 文档](/zh/docs/api/layout#circleoptions)。


### 02. **concentric**

-   名称： 同心圆布局

-   特点：将节点按照度数排序，节点度数大的一群点会排列在最中心，度数小的节点会分布在最外层。整体呈现同心圆排布

-   适用场景：当我们找到一群点中的关键节点，它所联系的节点最多，那么利用圆形布局，便可以在中心处轻松找到这个关键节点

使用实例：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-circle-ebz5n?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-concentric"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

同心圆布局配置请查看 [API 文档](/zh/docs/api/layout#concentricoptions)。

### 03. **grid**

- 名称：网格布局

- 特点：将节点依次整齐排列，呈现网格状

- 适用场景：节点的位置按照用户自定义后的排序展开，清晰明了，一般用于其他布局的前置分析

使用实例：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-concentric-gfrwn?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-grid"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

网格布局配置请查看 [API 文档](/zh/docs/api/layout#concentricoptions)。

### 04. `radial`

-   名称：迳向布局
-   特点：节点像雷达一样散开，是静态布局里解决交叉问题的主要布局算法
-   适用场景: ??

使用实例：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-concentric-6tn27?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-radial"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

迳向布局配置请查看 [API 文档](/zh/docs/api/layout#radialoptions)。

### 05. `dagre`

-   名称：有向层次布局
-   特点：按照边的方向与节点的层次，呈现树形排列
-   适用场景：当我们需要知道一群数据里的层次结构，上下游关系，那么 dagre 有向层次布局便是非常好的办法。

使用实例：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-radial-bo0bl?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-dagre"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

有向层次布局配置请查看 [API 文档](/zh/docs/api/layout#dagreoptions)。

### 06. `force`

-   名称： 力导布局
-   特点：节点按照自然受力进行分布，节点间模拟电荷斥力保持不相交，边通过弹簧拉力保持不相离，最终在多次动态迭代中，达到一个受力平衡
-   适用场景：想解决点边相交问题的时候，使用力导非常合适。一般作为其他布局的后置布局使用

使用实例：

<iframe
     src="https://codesandbox.io/embed/graphin-layout-dagre-l3s4l?fontsize=14&hidenavigation=0&theme=dark"
     style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;padding:20px;"
     title="graphin-layout-force"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

力导布局配置请查看 [API 文档](/zh/docs/api/layout#forceoptions)。