---
title: Migration
group:
  path: /quick-start
  order: 0
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

From V1 to V2

Compared with version 1.0, 2.0 has fully supported and upgraded the capabilities of G6: registration mechanism, layout mechanism, element styles, etc... It also integrates consistently with G6 to support tree diagrams, and has better componentize solutions.

### Layout

- The configuration is consistent with the G6 layout, so you can use [G6 Layout Configuration](https://g6.antv.vision/en/docs/api/graphLayout/guide)
- The usage is consistent with G6 layout, layout.options needs to be deconstructed

```jsx | pure
//v1
<Graphin data={data} layout={{ name:'grid', options: options }} />
//v2
<Graphin data={data} layout={{ name:'grid', ...options }} />
```

### Data

- Network graph data: The data structure of Graphin2.0 remains unchanged, but the data content has undergone some changes. New status fields and style fields are added to facilitate business processing. For details, see:
- Tree graph data: Graphin2.0 supports tree graphs. If the data structure is that of a tree, TreeGraph will be rendered internally.

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

Interactive behavours and component's attribute configuration previously required to be added using G6 modes. After upgrades to the version 2.0, there is no need to import these configurations with modes.

### Extend

The extend interface has been removed from Graphin. `Graphin.register` can be used to implement custom changes to nodeShape, icon or layout. The `extend` props has been completely removed in version 2.0.

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
