---
title: Data modeling
group:
  path: /database
  title: Graph Database
  order: 0
nav:
  title: Solution
  path: /solution
  order: 4
---

> Note ⚠️: This solution is still under development. Welcome to share ideas with us on [github issue](https://github.com/antvis/Graphin/issues/211)

## Data Modeling

## problem analysis

Data modeling: The traditional modeling method is to create a point edge by filling in a form. The problem with this solution is that the modeling efficiency is low and the association relationship of the graph model cannot be seen intuitively. How to improve the modeling efficiency and display intuitively The relationship in the graph model is a problem we need to focus on.

## Solution: Visual Modeling

To complete the creation of points and edges through visualization, it can effectively improve the efficiency of modeling and improve the readability of the model. The visual modeling program mainly includes three aspects: the creation, management and interaction of the graph model.

| Solutions                                       | Technical Solutions                                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| Dynamically add nodes and edges                 | Data-driven `<Graphin data={{nodes:[...newNodes],edges:[...newEdges]}}/>`              |
| Automatic processing of polygons and self-loops | Tool function: `Graphin.Utils.processEdges(edges,{poly,loop})`                         |
| Update node information                         | Style data driven `graph.updateItem('node',{style:{keyshape,halo,label,badges,icon}})` |
| Update edge information                         | Style data driven `graph.updateItem('edge',{style:{keyshape,halo,label}})`             |
| Layout remains stable                           | Layout data-driven `<Graphin layout={{type:"preset"}}/>`                               |
| Auxiliary Tools                                 | Toolbar `<Toolbar />` Right-click menu `<ContextMenu />`                               |

> Note ⚠️: You can select the edge to be created through the right-click menu, more functions are still under development...

<code src='./index.tsx'>
