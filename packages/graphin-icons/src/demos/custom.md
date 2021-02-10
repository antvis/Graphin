---
title: 自定义图标
order: 1
group:
  path: /register
  title: 自定义机制
nav:
  path: /graphin
  order: 3
---

## 自定义图标

真实项目中，我们需要根据业务情况自定义图标，Graphin 推荐用户直接 Fork [@antv/graphin-icons](https://github.com/antvis/Graphin/tree/master/packages/graphin-icons)项目，从而完成自己的自定义图标。步骤如下

## 资源准备

- 登陆[IconFont](https://www.iconfont.cn/) 网站
- 选择你需要的图标，收藏入项目，然后点击下载

![icons](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*a5c8TrD_4H0AAAAAAAAAAAAAARQnAQ)

- 如上图所示，将上图 `UniCode` 里的代码拷贝到`iconfont.css`中，将下载解压后的文件中的`iconfont.json`文件拷贝到你的项目中
- 这样资源准备工作就就就绪了。

## 代码步骤

```jsx | pure
import React from 'react';
import Graphin from '@antv/graphin';

// 引入资源文件
import './iconfont.css';
import fonts from './iconfont.json';

// 生成iconLoader函数
const iconLoader = () => {
  return {
    fontFamily: 'iconfont',
    glyphs: fonts.glyphs,
  };
};

// 注册到 Graphin 中
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

// 使用图标
const data = {
  nodes: glyphs.map(glyph => {
    return {
      id: `node-${glyph.name}`,
      style: {
        icon: {
          type: 'font', // 指定图标为Font类型
          fontFamily, // 指定FontFamily
          value: icons[glyph.name], // 指定图标的值
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

## 实现效果

<code src='./custom-font-icon/index.tsx'>
