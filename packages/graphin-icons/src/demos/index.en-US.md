---
title: Font Icon
order: 3
group:
  path: /render
  title: Element Rendering
nav:
  path: /graphin
  order: 3
---

## Why We Recommend Font Icons

For graph analysis applications, icons can distinguish the types of nodes, which are both beautiful and practical. In the development process, the semantic expression is better. Compared with pictures, its biggest advantage is that there are fewer network requests and only need to load the font file once.

## Use Official Website Icon

```jsx | pure
import React from 'react';
import Graphin from '@antv/graphin';

// Import resource file
import iconLoader from '@antv/graphin-icons';
import '@antv/graphin-icons/dist/index.css';

// Register in Graphin
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

// Use the icons
const data = {
  nodes: [
    {
      id: 'node-1',
      style: {
        icon: {
          type: 'font', // Assign the icon as a 'font' type
          fontFamily: fontFamily, // Assign 'fontFamily' value
          value: icons.home, // Assign the value of the icon
        },
      },
    },
  ],
};

export default () => {
  return <Graphin data={data} />;
};
```

## Official Website Icon Enumeration

> This is the icon officially provided by Graphin. You can `right-click the menu and select Copy` the selected icon name. Because the font icon file is relatively large, we use an unpacking mechanism, and users can import'@antv/graphin-icons' as needed

<code src='./index.tsx'>
