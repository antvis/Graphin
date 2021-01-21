---
title: Components 分析组件
order: 2
---

分析过程是一个动态交互的过程，对于图分析也不例外。因此我们需要一些分析组件帮助我们辅助分析，这里 Graphin 内置了两款组件：Toolbar 通用工具栏 和 ContextMenu 右键菜单。

> 未来计划新增 MiniMap 缩略图 与 ProptertiesFilter 属性筛选器，从而达到让用户高效分析的目的。

## Toolbar

Toolbar 是提供分析操作的工具栏。内置了撤销重做（操作历史），鱼眼放大镜，画布缩放，全屏，节点聚焦，画布快照下载等等功能。

使用 Toolbar 很简单：

<iframe
     src="https://codesandbox.io/embed/graphin-components-context-menu-render-dyzdq?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-components-toolbar"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

Toolbar 提供了 direction 来控制横向或者纵向显示。我们可以用 render 函数来拓展 Toolbar，就像上面例子中展示的那样。使用 render，我们可以给 Toolbar 添加自定义的功能，比如布局切换等等。


Toolbar 的完整 API 文档请查看[这里](/zh/docs/api/components#toolbar--组件)。
   

## ContextMenu


ContextMenu 是右键菜单组件。通过 options 可以配置菜单的内容：

<iframe
     src="https://codesandbox.io/embed/graphin-options-force-tgpkb?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-components-context-menu"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

我们通常用 ContextMenu 实现节点的复制，删除，反选等等。同时，我们也可以对选择的节点发起新画布分析，或者进行打标，发起关系扩散，数据请求之类的高级自定义行为。这些行为只需要在 MenuItem 的 onClick 回调中实现就可以。

如果想定制下拉菜单的形态，可以使用 render 这个 props 对菜单进行自定义渲染：

<iframe
     src="https://codesandbox.io/embed/graphin-components-context-menu-h80od?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="graphin-components-context-menu-render"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>



ContextMenu 的完整 API 文档请查看[这里](/zh/docs/api/components#contextmenu--组件)。


<!-- ## Toolbar

Toolbar 内置了 4 大功能

#### 功能介绍


-   todo/redo

我们提供了撤销重做的功能，能够让整个分析过程变得可靠，因为用户不必再担心因为误操作而毁坏了之前的分析过程。对于工具型产品，这是基础功能，也是特色功能

-   zoomIn/out 缩小放大功能

在分析过程中，当节点数量的变化，布局的变化，引起一些节点可能不在当前视窗内，这个时候我们就需要缩放功能帮助我们调整视窗的范围，配合画布的拖拽，能让我们不丢失全局（zoomOut），也不损失细节（zoomIn）

-   fullscreen 全屏功能

触发后，整个画布占满浏览器窗口，当你的画布页在业务中占比很小的时候，这将非常有用。

-   foucs 节点聚焦功能

输入节点 ID，将自动对焦到该节点，将和 Search 功能配套起来，支持模糊搜索，快速定位，这将大大提高你的分析效率

-   Snapshot 快照下载
    当你希望保存当前的画布给别人分享，下载快照将会是一个非常有用的功能。 -->

<!-- ## ContextMenu 右键菜单

#### 功能介绍

在画布上，我们在节点上右键菜单，将会出现更多的操作选项，如果说 Toolbar 是针对整个画布的操作，那么 ContextMenu 则是针对单独的节点做操作，对于单个节点，我们通用的分析操作有如下：

-   复制

复制节点 ID，以便于你的后续操作

-   反选

反选节点，这种排除法，是选择其他节点的一种快捷方式

-   删除

删除该节点，删除后，剩余的节点将重新布局，渲染，这在我们做案件排查的时候，删除已经确定的关键节点，重新布局分析能够减少我们的分析干扰。

-   新增画布分析

当我们在前一次分析中筛选出的关键节点，可以通过右键菜单，新建画布分析的方式，在一个新的画布中做二次分析，减少无用信息的干扰

-   业务相关

业务特有的一些针对节点的操作，比如给该节点打标，进行关系扩散，或者发起数据请求什么的 -->
