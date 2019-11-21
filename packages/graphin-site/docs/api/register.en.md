---
title: Register
order: 3
---

The property `register` of  component `<Graphin/>` is used to customize NodeShape, EdgeShape and behavior using the G6 API directly.

|   Property    | Type                                | Required | Description                       |
| --------- | ----------------------------------- | -------- | -------------------------- |
| nodeShape | (G6) => [Register](#register)[]          | no       | Custom NodeShape of G6       |
| edgeShape | (G6) => [Register](#register)[]          | no       | Custom EdgeShape of G6        |
| behavior  | (G6) => [BehaviorRegister](#behaviorregister)[]; | no       | Custom behavior of G6|

### Register

|   Property   | Type                  | Required | Description                              |
| -------- | --------------------- | -------- | --------------------------------- |
| name     | string                | yes       | name of the custom NodeShape or EdgeShape                         |
| register | (G6: G6Type) => void; | yes       | a function to register a NodeShape or EdgeShape,  the argument is G6 |

### BehaviorRegister

|   Property   | Type                  | Required | Description                              |
| -------- | --------------------- | -------- | --------------------------------- |
| name     | string                | yes       | name of the custom behavior                          |
| register | (G6: G6Type) => void; | yes       |  a function to register a behavior, the argument is G6 |
| options  | any                   | yes       | configuration                        |
| mode     | string                | yes       | mode                              |
