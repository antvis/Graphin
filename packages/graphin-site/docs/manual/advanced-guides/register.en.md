---
title: Register
order: 1
---

Graphin provides a declarative way to extend the NodeShape. In addition, Graphin also supports direct configuration of G6. Mainly supports custom interactions (behavior), custom edges, custom edges. This gives users the ability to extend the interaction and edge of G6.

Register is passed to the component via props :

```tsx
<Graphin register={
    nodeShape: () => {},
    edgeShape: () => {},
    behavior: () => {}
}></Graphin>
```

The specific API of register is as follows:


```ts
register?: {
    /** 通过G6原生方法，注册节点 */
    nodeShape?: (G6: G6Type) => Register[];
    /** 通过G6原生方法，注册边 */
    edgeShape?: (G6: G6Type) => Register[];
    /** 通过G6原生方法，注册事件 */
    behavior?: (G6: G6Type) => BehaviorRegister[];
};
```

```ts
interface Register {
    /** 节点名称 */
    name: string;
    /** register执行函数,参数为G6对象 */
    register: (G6: G6Type) => void;
}
```

```ts
interface BehaviorRegister extends Register {
    options: any;
    mode: string;
}
```

As you can see, whether it's a custom behavior or a custom edge, it's registered with a function. This function takes a G6 constructor and returns an array. Each array represents a node/edge/behavior to be registered. The behavior is registered with one more option and mode field than the node and edge.


```ts
register: {
    nodeShape: (G6) => [{
        name: "custom",
        register: () => {
            G6.registerNode("custom", () => {})  // 详见 G6 registerNode 文档
        }
    }],
    edgeShape: (G6) => [{
        name: "custom",
        register: () => {
            G6.registerEdge("custom", () => {})  // 详见 G6 registerEdge 文档
        }
    }],
    behavior: (G6) => [{
        mode: "default",  // 详见 G6 的 mode 文档
        options: {}
        name: "custom",
        register: () => {
            G6.registerBehavior("custom", () => {})  // 详见 G6 registerBehavior 文档
        }
    }],
}
```

**G6 related Docs**

-   [Custom Node](https://www.yuque.com/antv/g6/self-node)
-   [Custom Side](https://www.yuque.com/antv/g6/self-edge)
-   [Custom Behavior](https://www.yuque.com/antv/g6/self-behavior)

