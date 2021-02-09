---
title: 大图探索
group:
  path: /database
  title: 图数据库
  order: 0
nav:
  title: 领域方案
  path: /case
  order: 4
---

> 注意 ⚠️ ： 该方案还在开发中，欢迎大家在 [github issue](https://github.com/antvis/Graphin/issues/211) 上与我们一起交流想法

## 大图探索

### 问题分析

图数据库中原始的数据量往往非常大，这个查询出来的数据的可读性带来很大的挑战。除了服务层做数据筛选过滤，前端也可以通过一些聚类算法进行节点的聚合，再通过数据下钻的方式，下钻动态探索。

### 解决方案

| 解决方案               | 技术方案                                                         |
| ---------------------- | ---------------------------------------------------------------- |
| 节点聚合，前端算法     | louvain 算法聚合 `const { louvain } = G6.Algorithm`              |
| 减少视觉干扰，看清细节 | 鱼眼放大镜 `<FishEye />`                                         |
| 减少视觉干扰，看清全局 | 小地图导航 `<MiniMap/>`                                          |
| 节点分类：颜色属性映射 | 图例组件 `<Legend />`                                            |
| 下钻探索               | Graphin 渐进力导布局 `<Graphin layout={{type:"graphin-force"}}>` |

<br />
<code src='./index.tsx'>
