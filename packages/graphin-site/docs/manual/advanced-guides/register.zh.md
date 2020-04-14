---
title: Register 注册接口
order: 1
---

Graphin 提供了声明式的 NodeShape 扩展方式。除此之外，Graphin 也支持直接传入 G6 的配置。主要支持自定义交互（behavior），自定义边，自定义边。这让用户对 G6 的交互和边有了扩展能力。

register 是通过 props 传入组件的：

```tsx
<Graphin register={
    nodeShape: () => {},
    edgeShape: () => {},
    behavior: () => {}
}></Graphin>
```

register 的具体 API 如下：

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

可以看到，不管是自定义 behavior 还是自定义边，都是通过一个函数注册的。这个函数接收 G6 构造函数，然后返回一个数组。每个数组代表一个要注册的节点/边/行为。其中行为的注册比节点和边要多一个 options 和 mode 字段。

注册返回的 Register 类型中，register 函数就是真正进行注册的地方：

```ts
register: {
    nodeShape: (G6) => [{
        name: "custom",
        register: () => {
            G6.registerNode("custom", {})  // 详见 G6 registerNode 文档
        }
    }],
    edgeShape: (G6) => [{
        name: "custom",
        register: () => {
            G6.registerEdge("custom", {})  // 详见 G6 registerEdge 文档
        }
    }],
    behavior: (G6) => [{
        mode: "default",  // 详见 G6 的 mode 文档
        options: {}
        name: "custom",
        register: () => {
            G6.registerBehavior("custom", {})  // 详见 G6 registerBehavior 文档
        }
    }],
}
```

**G6 相关文档**

-   [自定义节点](https://www.yuque.com/antv/g6/self-node)
-   [自定义边](https://www.yuque.com/antv/g6/self-edge)
-   [自定义行为](https://www.yuque.com/antv/g6/self-behavior)
