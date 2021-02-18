---
title: BigGraph Exploration
group:
  path: /database
  title: Graph database
  order: 0
nav:
  path: /solution
  order: 4
---

> Note ⚠️: This solution is still under development. Welcome to share ideas with us on [github issue](https://github.com/antvis/Graphin/issues/211)

## BigGraph exploration

### problem analysis

The amount of original data in the graph database is often very large, and the readability of the data obtained by this query brings great challenges. In addition to data filtering at the service layer, the front-end can also aggregate nodes through some clustering algorithms, and then drill down for dynamic exploration through data drilling.

### solution

| Solutions                                                 | Technical Solutions                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Node aggregation, front-end algorithm                     | louvain algorithm aggregation `const {louvain} = G6.Algorithm`                        |
| Reduce visual interference and see details clearly        | Fisheye magnifier `<FishEye />`                                                       |
| Reduce visual interference, see the whole picture clearly | MiniMap navigation `<MiniMap/>`                                                       |
| Node classification: color attribute mapping              | Legend Component `<Legend />`                                                         |
| Drill down to explore                                     | Graphin progressive force guidance layout `<Graphin layout={{type:"graphin-force"}}>` |

<br />
<code src='./index.tsx'>
