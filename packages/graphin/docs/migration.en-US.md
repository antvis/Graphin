---
title: Migration
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

From V1 to V2

Compared with version 1.0, 2.0 has fully supported and upgraded the capabilities of G6: registration mechanism, layout mechanism, element styles, etc... and develop consistently with G6 in order to support tree diagrams, and construct better componentization solutions.

### Layout

- The configuration is consistent with the G6 layout, you can use [G6 Layout Configuration](https://g6.antv.vision/zh/docs/api/graphLayout/guide)
- The usage is consistent with G6 layout, layout.options needs to be deconstructed

```jsx | pure
//v1
<Graphin data={data} layout={{ name:'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name:'grid', ...options }} />
```

### Data

- Network graph data: The data structure of Graphin2.0 remains unchanged, but the data content has undergone some changes. New status fields and style fields are added to facilitate business processing. For details, see:
- Tree graph data: Graphin2.0 supports tree graphs. If the data structure is tree, TreeGraph will be rendered internally.

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

### Behaviours

The interactive behavours and component's attribute configuration requires to be introduced in G6 through modes in the previous version in order to drive the data. After upgrades to the version 2.0, there is no need to import these configurations with modes.

### Extend

The extend interface is completely removed from Graphin. Previously, nodeShape, icon, layout can be implemented through the `Graphin.register` interface. The `extend` props had completely removed in the version 2.0.

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
Graphin.registerFontFamily(iconloader); // View Custom Icon for more information
```

- Extend marker (completely removed)

### Register

Fully consistent with G6 registration mechanism

```tsx | pure
// Register the node, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registernodenodename-options-extendednodename for details
Graphin.registerNode();

// Register edge, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registeredgeedgename-options-extendededgename for details
Graphin.registerEdge();

// Register Combo, refer to https://g6.antv.vision/zh/docs/api/registerItem#g6registercombocomboname-options-extendedcomboname for details
Graphin.registerCombo();

// Register layout, please refer to https://g6.antv.vision/zh/docs/api/registerLayout#g6registerlayoutlayoutname-layout
Graphin.registerLayout();

// Registration behavior, refer to https://g6.antv.vision/zh/docs/api/Behavior for details
Graphin.registerBehavior();
```
