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
    /** register node by using API of G6 */
    nodeShape?: (G6: G6Type) => Register[];
    /** register edge by using API of G6*/
    edgeShape?: (G6: G6Type) => Register[];
    /** register behavior by using API of G6*/
    behavior?: (G6: G6Type) => BehaviorRegister[];
};
```

```ts
interface Register {
    /** name */
    name: string;
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
            G6.registerNode("custom", {})  // see document of G6 registerNode for details
        }
    }],
    edgeShape: (G6) => [{
        name: "custom",
        register: () => {
            G6.registerEdge("custom", {})  // see document of G6 registerEdge for details
        }
    }],
    behavior: (G6) => [{
        mode: "default",  // see document of G6 mode for details
        options: {}
        name: "custom",
        register: () => {
            G6.registerBehavior("custom", {})  // see document of  G6 registerBehavior for details
        }
    }],
}
```

**G6 related Docs**

-   [Custom Node](https://www.yuque.com/antv/g6/self-node)
-   [Custom Side](https://www.yuque.com/antv/g6/self-edge)
-   [Custom Behavior](https://www.yuque.com/antv/g6/self-behavior)

