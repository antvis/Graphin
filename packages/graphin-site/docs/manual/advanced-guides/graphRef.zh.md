---
title: Graphin 实例接口
order: 2
---

在一些特殊情况下，我们需要直接访问 Graphin 实例，来获取一些信息，或者直接对 G6 实例进行操作。这个时候我们可以通过 ref 来获取 Graphin 的实例：

```tsx
const Graphene = (props: GraphProps) => {
    const graphRef = useRef(null);

    return <Graphin data={data} ref={graphRef}></Graphin>;
};
```

## 01. APIs 接口：

通过 `graphinRef.current.apis` 可以访问到 Graphin 内部的一组 API。这组 API 同样可以在 Graphin 组件中获取到。

APIs 的具体接口：

|   属性    | 类型                                                                                                                                              | 说明                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| search    | (words: string) => Node[]                                                                                                                         | 搜索节点，关键词可以为 id，label，或者 property 的值 |
| highlight | (nodeIds: string[]) => void                                                                                                                       | 高亮节点                                             |
| clear     | () => void                                                                                                                                        | 重置 Graphin                                         |
| getInfo   | { layouts: { desc:string;icon:string;name:string}[], count: { nodes: number;edges:number; } }                                                     | 渲染数据                                             |
| history   | { redo: () => void;undo: () => void;save: () => void;getInfo: () => { currentStep:number;allStep:number;disableRedo:number;disableUndo:number;};} | 操作历史                                             |

## 02. G6 Graph 实例

通过 `graphinRef.current.graph`，可以获取到 Graphin 中实例化的 G6 实例。

这适用于需要监听 G6 内部事件等等场景。通常来说不推荐使用这种方式来做 hack，因为这跳出了 Graphin 的整个生命周期，可能会和 Graphin 本身产生一些冲突。