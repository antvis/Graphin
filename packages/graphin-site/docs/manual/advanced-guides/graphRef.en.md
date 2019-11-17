---
title: Graphin
order: 2
---

In some special cases, we need to access the Graphin instance directly to get some information, or to directly operate on the G6 instance. At this point we can get an instance of Graphin via ref:

```tsx
const Graphene = (props: GraphProps) => {
    const graphRef = useRef(null);

    return <Graphin data={data} ref={graphRef}></Graphin>;
};
```

## 01. APIs:

A set of APIs inside Graphin is accessible via `graphinRef.current.apis`. This set of APIs is also available in the Graphin component.

APIs:

|   Attribute    | Type                                                                                                                                              | Description                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| search    | (words: string) => Node[]                                                                                                                         | Search for nodes, keywords can be id, label, or property values |
| highlight | (nodeIds: string[]) => void                                                                                                                       | Highlight Node                                             |
| clear     | () => void                                                                                                                                        | Reset Graphin                                         |
| getInfo   | { layouts: { desc:string;icon:string;name:string}[], count: { nodes: number;edges:number; } }                                                     | Rendering Data                                              |
| history   | { redo: () => void;undo: () => void;save: () => void;getInfo: () => { currentStep:number;allStep:number;disableRedo:number;disableUndo:number;};} | Operation History                                             |

## 02. G6 Graph instance

With `graphinRef.current.graph`, you can get an instance of G6 instantiated in Graphin.

This applies to scenes where you need to monitor some internal events of G6. This is generally not recommended for hacks since this jumps out of Graphin's entire lifecycle and may create some conflicts with Graphin itself.