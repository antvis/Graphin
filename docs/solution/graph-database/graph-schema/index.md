---
title: 数据建模
group:
  path: /database
  title: 图数据库
  order: 0
nav:
  title: 领域方案
  path: /solution
  order: 4
---

> 注意 ⚠️ ： 该方案还在开发中，欢迎大家在 [github issue](https://github.com/antvis/Graphin/issues/211) 上与我们一起交流想法

## 数据建模

## 问题分析

数据建模：传统的建模方式是通过填写表单来创建点边，这种方案存在的问题是建模效率低及无法直观地看清楚图模型的关联关系，如何提升建模效率及直观地展示图模型中的关系是我们需要重点解决的问题。

## 解决方案：可视化建模

通过可视化的方式来完成点边的创建，可以有效提升建模的效率，并让提高了模型的可读性。可视化建模方案主要包括图模型的创建、管理及交互三个方面。

| 解决方案           | 技术方案                                                                          |
| ------------------ | --------------------------------------------------------------------------------- |
| 动态添加节点和边   | 数据驱动 `<Graphin data={{nodes:[...newNodes],edges:[...newEdges]}}/>`            |
| 自动处理多边和自环 | 工具函数：`Graphin.Utils.processEdges(edges,{poly,loop})`                         |
| 更新节点信息       | 样式数据驱动 `graph.updateItem('node',{style:{keyshape,halo,label,badges,icon}})` |
| 更新边信息         | 样式数据驱动 `graph.updateItem('edge',{style:{keyshape,halo,label}})`             |
| 布局保持稳定       | 布局数据驱动`<Graphin layout={{type:"preset"}}/>`                                 |
| 辅助工具           | 工具栏`<Toolbar />` 右键菜单`<ContextMenu />`                                     |

> 注意 ⚠️ ： 通过右键菜单可以添加节点，和选择需要建立的边，更多功能还在开发中...

<code src='./index.tsx'>
