---
title: Migration
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

From V1 to V2

Compared with version 1.0, 2.0 has fully supported and upgraded the capabilities of G6: registration mechanism, layout mechanism, element styles, etc. are consistent with G6, support tree diagrams, and better componentization solutions

### layout layout

-The configuration is consistent with the G6 layout, so you can use [G6 Layout Configuration](https://g6.antv.vision/en/docs/api/graphLayout/guide)
-Usage is consistent with G6 layout, layout.options needs to be deconstructed

```jsx | pure
//v1
<Graphin data={data} layout={{ name:'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name:'grid', ...options }} />
```

### data data

- Network graph data: The data structure of Graphin2.0 remains unchanged, but the data content has undergone some changes. New status fields and style fields are added to facilitate business processing. For details, see:
- Tree graph data: Graphin2.0 supports tree graphs. If the data structure is tree, TreeGraph will be rendered internally

```jsx | pure
const data = {
  nodes: [
    {
      id: 'node-1',
      // style field
      style: {
        label: {
          value: 'node-1-label',
        },
      },
      // status field
      status: {
        selected: true,
      },
    },
  ],
};

<Graphin data={data} />;
```

### behavior

Interactive behaviors, previously needed to be introduced in G6 through modes, support componentized introduction in Graphin, and support component attribute configuration to complete data drive. When upgrading the V2 version, there is no need to perceive this

### extend

The extend interface is completely removed from Graphin. Previously, nodeShape, icon, layout can be implemented through the `Graphin.register` interface. `extend.marker` completely removed

- Expand node

```tsx | pure
// v1
<Graphin extend={{ nodeShape: renderNodeShape }} />;

// v2
Graphin.registerNode(renderNodeShape);
```

- Extend layout

```tsx | pure
// layout
<Graphin extend={{ nodeShape: customLayout }} />;

// v2
Graphin.registerLayout(customLayout);
```

- Extend icon

```tsx | pure
// layout
<Graphin extend={{ icon: customIconFunction }} />;

// v2
Graphin.reigsterFontFamily(iconloader); // View details Custom icon
```

- Extend marker (completely removed)

### register

Fully consistent with G6 registration mechanism

```tsx | pure
// Register the node, refer to https://g6.antv.vision/en/docs/api/registerItem#g6registernodenodename-options-extendednodename for details
Graphin.registerNode();

// Register edge, refer to https://g6.antv.vision/en/docs/api/registerItem#g6registeredgeedgename-options-extendededgename for details
Graphin.registerEdge();

// Register Combo, refer to https://g6.antv.vision/en/docs/api/registerItem#g6registercombocomboname-options-extendedcomboname for details
Graphin.registerCombo();

// Register layout, please refer to https://g6.antv.vision/en/docs/api/registerLayout#g6registerlayoutlayoutname-layout
Graphin.registerLayout();

// Registration behavior, refer to https://g6.antv.vision/en/docs/api/Behavior for details
Graphin.registerBehavior();
```
