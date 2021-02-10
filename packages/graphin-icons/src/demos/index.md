---
title: 字体图标
order: 3
group:
  path: /render
  title: 元素渲染
nav:
  path: /graphin
  order: 3
---

## 为什么我们推荐字体图标

对于图分析应用而言，图标能够区分节点的类型，即美观也实用。在开发过程中，语义性表达较好，同时和图片相比，它最大的优势是网络请求少，只需要一次加载字体文件即可.

## 使用官网图标

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

## 官网图标枚举

> 这是 Graphin 官方提供的图标，可以`右键菜单 选择复制`选中的图标名称。因为字体图标文件体积比较大，我们采用拆包机制，用户可以按需引入 '@antv/graphin-icons'

<code src='./index.tsx'>
