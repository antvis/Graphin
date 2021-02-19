---
title: Custom FontIcon
order: 1
group:
  path: /register
  title: Custom
nav:
  path: /graphin
  order: 3
---

## Custom FontIcon

In real projects, we need to customize the icons according to the business situation. Graphin recommends that users directly Fork [@antv/graphin-icons](https://github.com/antvis/Graphin/tree/master/packages/graphin-icons) project To complete your own custom icon. Proceed as follows

## Resource preparation

- Log in to the [IconFont](https://www.iconfont.cn/) website
- Select the icon you need, add it to the item, and click download

![icons](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*a5c8TrD_4H0AAAAAAAAAAAAAARQnAQ)

- As shown in the figure above, copy the code in the `UniCode` in the figure above to `iconfont.css`, and copy the `iconfont.json` file in the downloaded and decompressed file to your project
- Then the resource preparation is ready.

## Steps

```jsx | pure
import React from 'react';
import Graphin from '@antv/graphin';

// Import resource files
import './iconfont.css';
import fonts from './iconfont.json';

// Generate iconLoader function
const iconLoader = () => {
  return {
    fontFamily: 'iconfont',
    glyphs: fonts.glyphs,
  };
};

// Register to Graphin
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

// Use icons
const data = {
  nodes: glyphs.map(glyph => {
    return {
      id: `node-${glyph.name}`,
      style: {
        icon: {
          type: 'font', // Specify the icon to be Font type
          fontFamily, // Specify FontFamily
          value: icons[glyph.name], // Specify the value of the icon
        },
      },
    };
  }),
  edges: [],
};

export default () => {
  return <Graphin data={data} />;
};
```

## Demo

<code src='./custom-font-icon/index.tsx'>
