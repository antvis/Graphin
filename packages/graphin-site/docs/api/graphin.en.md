---
title: Graphin
order: 1
---

This is the API documentation for the `<Graphin/>` component.

## Props

|   Property   | Type                  | Required | Description          |
| -------- | --------------------- | -------- | ------------- |
| data     | [Data](#data)         | **yes** | node and edge data of graph      |
| layout   | [Layout](#layout)     | no       | configuration of layout     |
| options  | [Options](#option)    | no       |  configuration of G6     |
| ref      | [Ref](#ref)           | no       |  Ref of Graphin    |
| extend   | [Extend](#extend)     | no       | Extended Configuration   |
| register | [Register](#register) | no       | customize NodeShape, EdgeShape and behavior using the G6 API |

## Data

Node and edge data of graph

|   Property | Type                   | Required | Description       |
| ------ | ---------------------- | -------- | ---------- |
| nodes  | [Node[]](#node) | yes       | collection of nodes |
| edges  | [Edge[]](#edge) | yes       | collection of edges   |

### Node

Node

|   Property         | Type                                  | Required | Description                                              |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------- |
| id             | string                              | **yes** | unique id                              |
| data           | [NodeData](#nodedata)                 | **yes** | source data |
| shape          | string                              | no       | type of the node (NodeShape), the default value is `CircleNode`. |
| style          | [NodeDefaultStyle](#nodedefaultstyle) | no       | style information corresponding to NodeShape               |
| x              | number                              | no       | the x coordinate of the node                              |
| y              | number                              | no       | the y coordinate of the node                          |
| layout         | NodeLayoutType                    | no       | layout                                 |
| `[key:string]` | any                                 | no       | custom property              |
|                |

### NodeData

The key-value data that comes with the node. properties are typically returned from the backend, indicating some properties that describe the node.

|   Property         | Type     | Required | Description                    |
| -------------- | -------- | -------- | ----------------------- |
| id             | string | **yes** | unique identifier of a node |
| label          | string | no       | text information of node          |
| properties     | any[]    | no       | node properties              |
| `[key:string]` | any    | no       | Other Properties                 |

### NodeDefaultStyle

Style information corresponding to NodeShape

|   Property       | Default    | Description           |
| ------------ | --------- | -------------- |
| nodeSize     | 20        | size of node     |
| primaryColor | #9900EF | main color of node |
| fontSize     | 12        | font size of text |
| fontColor    | #3b3b3b | font color of text |
| dark         | #eee    | color of the node when it is darkened      |

### Edge

Edge

|   Property         | Type     | Required | Description                         |
| -------------- | -------- | -------- | ---------------------------- |
| data           | { properties: any[], [key: string]:any }     | **yes** | data of edge               |
| source         | string | **yes** | ID of **source node**       |
| target         | string | **yes** | ID of **target node**         |
| shape          | string | no       | edge type, default value is `LineEdge` |
| label          | string | no       | text information of edge                    |
| style          | any    | no       | style of edge                  |
| spring         | number  | no       | spring length of the edge which is used when the layout is force layout     |
| `[key:string]` | any    | no       | custom properties    |

## Layout

Layout configuration, see [Layout](/zh/docs/api/layout) for details.

## Extend

Extended configuration, see [Extend] (/zh/docs/api/extend) for details.


## Register

Register is used to customize NodeShape, EdgeShape and behavior using the G6 API directly. See [Register](/zh/docs/api/register) for details.

## Options

See [G6 Options] (https://www.yuque.com/antv/g6/graph#VjayE) for details.


## Ref

|   Property | Type  | Required | Description        |
| ------ | ----- | -------- | ----------- |
| graph  | [Graph](https://www.yuque.com/antv/g6/graph) | yes       | graph instance of G6 |
| apis   | [Apis](#apis)  | no       | API provided by Graphin        |


### Apis


|   Property    | Type                                                                                                                                              | Description                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| search    | (words: string) => Node[ ]                                                                                                                         | search for nodes, keywords can be id, label, or value of property  |
| highlight | (nodeIds: string[ ]) => void                                                                                                                       | highlight Node                                             |
| clear     | ( ) => void                                                                                                                                        | reset Graphin                                         |
| getInfo   | { layouts: { desc:string;icon:string;name:string}[ ], count: { nodes: number;edges:number; } }                                                     | get rendering data                                            |
| history   | { redo: ( ) => void;undo: ( ) => void;save: ( ) => void;getInfo: ( ) => { currentStep:number;allStep:number;disableRedo:number;disableUndo:number;};} |   History of Operations    


