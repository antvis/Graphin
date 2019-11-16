---
title: Register
order: 3
---

`<Graphin/>` 组件 `props.register` 配置。用于直接使用 G6 API 来自定义布局/NodeShape 和行为。

|   属性    | 类型                                | 是否必选 | 说明                       |
| --------- | ----------------------------------- | -------- | -------------------------- |
| nodeShape | (G6) => [Register](#register)[]          | 否       | 自定义 G6 NodeShape        |
| edgeShape | (G6) => [Register](#register)[]          | 否       | 自定义 G6EdgeShape         |
| behavior  | (G6) => [BehaviorRegister](#behaviorregister)[]; | 否       | 自定义 G6 行为（behavior） |

### Register

|   属性   | 类型                  | 是否必选 | 说明                              |
| -------- | --------------------- | -------- | --------------------------------- |
| name     | string                | 是       | 节点名称                          |
| register | (G6: G6Type) => void; | 是       | register 执行函数，参数为 G6 对象 |

### BehaviorRegister

|   属性   | 类型                  | 是否必选 | 说明                              |
| -------- | --------------------- | -------- | --------------------------------- |
| name     | string                | 是       | 行为名称                          |
| register | (G6: G6Type) => void; | 是       | register 执行函数，参数为 G6 对象 |
| options  | any                   | 是       | 行为配置项                        |
| mode     | string                | 是       | 模式                              |
