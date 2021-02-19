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

// 引入资源文件
import iconLoader from '@antv/graphin-icons';
import '@antv/graphin-icons/dist/index.css';

// 注册到 Graphin 中
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

// 使用图标
const data = {
  nodes: [
    {
      id: 'node-1',
      style: {
        icon: {
          type: 'font', // 指定图标为Font类型
          fontFamily: fontFamily, // 指定FontFamily
          value: icons.home, // 指定图标的值
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
