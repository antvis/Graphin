---
title: 功能概览
order: 0
group:
  path: /quick-start
  title: 快速开始
  order: 0
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 功能概览

<code src='./index.tsx'>

## 组件看板

| 组件            | 分类         | 名称          | 说明                                                 | 进度 / 排期                              |
| --------------- | ------------ | ------------- | ---------------------------------------------------- | ---------------------------------------- |
| Graphin         | 核心组件     | @antv/graphin | 负责数据驱动整个画布：配置，布局，渲染，交互         | <Badge type='success'>done</Badge>       |
| ContextMenu     | 交互组件     | 右键菜单      | 帮助用户进行节点或边操作：打标，扩散，发现           | <Badge type='success'>done</Badge>       |
| Tooltip         | 交互组件     | 提示框        | 帮助用户快速浏览节点或边的信息                       | <Badge type='success'>done</Badge>       |
| MiniMap         | 交互组件     | 小地图        | 帮助用户进行全局导航                                 | <Badge type='success'>done</Badge>       |
| Toolbar         | 交互组件     | 工具栏        | 帮助用户进行画布操作：缩小，放大，全屏               | <Badge type='success'>done</Badge>       |
| RedoUndo        | 交互组件     | 撤销回退      | 帮助用户进行全局导航                                 | <Badge type='info'>version 2.1.0</Badge> |
| FishEye         | 交互组件     | 鱼眼放大镜    | 帮助用户进行查看细节                                 | <Badge type='success'>done</Badge>       |
| CreateEdge      | 交互组件     | 边建联组件    | 帮助用户进行关系建联                                 | <Badge type='info'>version 2.2.0</Badge> |
| Legend          | 标示组件     | 图例          | 帮助用户进行节点和边的类型标示：颜色，大小，属性     | <Badge type='success'>done</Badge>       |
| Hull            | 标示组件     | 轮廓          | 帮助用户进行节点归类示                               | <Badge type='success'>done</Badge>       |
| Statistic       | 标示组件     | 统计面板      | 帮助用户进行画布状态的监控标示                       | <Badge type='info'>version 2.1.0</Badge> |
| SnapshotGallery | 分析配套组件 | 快照画廊      | 提供快照保存复现功能，帮助用户分析过程不中断         | <Badge type='info'>version 2.3.0</Badge> |
| LayoutSelector  | 分析配套组件 | 布局切换器    | 帮助用户切换布局，自主调节参数，从而达到最佳布局效果 | <Badge type='info'>version 2.1.0</Badge> |
| Sheetbar        | 分析配套组件 | 多画布组件    | 帮助用户二次分析，多画布管理                         | <Badge type='info'>version 2.4.0</Badge> |
| TableMode       | 分析配套组件 | 表格模式      | 帮助通过表格查看关系源数据                           | <Badge type='info'>version 2.5.0</Badge> |
| FindPathPanel   | 算法分析组件 | 寻找路径      | 帮助用户计算两个节点间的最短路径和可能路径列表       | <Badge type='info'>version 2.5.0</Badge> |
| MapMode         | 高级分析组件 | 地图模式      | 帮助用户分析地理关系数据                             | <Badge type='info'>version 2.6.0</Badge> |
| Timebar         | 高级分析组件 | 时间轴        | 帮助用户分析时序关系数据                             | <Badge type='info'>version 2.7.0</Badge> |
