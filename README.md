<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<div  style='display:flex;justify-content: center;'> 
  <span style='width:30px;height:30px;margin:8px;background:url(https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg) no-repeat' ></span>
  <span style='font-weight:500;font-size: 2em;'>Graphin</span>
</div>

<div align="center">

[![Version](https://badgen.net/npm/v/@antv/graphin)](https://www.npmjs.com/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](http://npmjs.com/@antv/graphin)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>

Graphin means Graph Insight (analysis of graphs). It is a library based on [G6](https://github.com/antvis/g6) and [React](https://reactjs.org/) and offers graph analysis ability out of the box.

For more infomation, please check the [Graphin Website](https://graphin.antv.vision/zh).

## ✨ Features

### 🎨 High-value elements, standard style configuration.

Graphin standardizes the visual mapping of graph elements. A Graphin built-in node contains 5 parts: `keyshape`, `label`, `halo`, `icon`, and `badges`, each part can be driven by data. The built-in edges include three parts: `keyshape`, `label`, and `halo`. At the same time, there are also corresponding data style configurations for `label backgrounds` commonly used in business, such as `self-loops`, `polygons`, and `dashed lines`. [Online Experience](https://graphin.antv.vision/graphin/render/node)

![node-style](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*eGi_S5NXE3cAAAAAAAAAAAAAARQnAQ)
![edge-style](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*voNsS4vtKlsAAAAAAAAAAAAAARQnAQ)

### 📦 Automatic layout, easy to deal with complex scenes

Graphin has 10 built-in network graph layouts and 4 tree graph layouts to meet your layout needs for different data types and different analysis scenarios. For `layout switching` in complex business scenarios, `dynamic layouts`, `sub-graph layouts`, etc., can be easily implemented through data-driven layout. [Online Experience](https://graphin.antv.vision/graphin/layout/dynamic-layout)

![node-expand](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*tdcwQYD_FLoAAAAAAAAAAAAAARQnAQ)
![layout-switch](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*ZhBqT4ZONrcAAAAAAAAAAAAAARQnAQ)

### 📝 Delicate interaction, easy to customize

Graphin provides 13 interactive components. Including `canvas zooming`, `panning`, `brush selection`, `lasso select` , `automatic Resize`, and element dragging, selection, hovering, highlighting, expanding and retracting, etc., to meet your interactive needs for different analysis scenarios

### 🚀 Rich components, derived from business precipitation

Currently Graphin provides 7 analysis components: `ContextMenu`, `Tooltip`, `MiniMap`, `Toolbar`, `FishEye`, `Hull`, and `Legend`. 17+ analysis components will be provided in the future
![components](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*XebMSIakucgAAAAAAAAAAAAAARQnAQ)

### ⚙️ Comfortable development experience, in line with React users' minds

![typescript](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xpoaRpOGme4AAAAAAAAAAAAAARQnAQ)

## 🖥 Browser support

- Graphin icon uses [Proxy](https://caniuse.com/?search=Proxy), the font icon may not be displayed correctly on some browsers that do not support Proxy syntax
- The Graphin drawing engine is G6, which relies on the browser API and does not support SSR

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/ master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /> ](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/ safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## 📦 Installation

If you are a web developer using React, then you can use Graphin as a normal React component.

This article uses yarn to install dependencies, and npm is also fine. The following install Graphin's core components `@antv/graphin` and analysis components `@antv/graphin-components`, and Graphin's official icon library `@antv/graphin-icons`

```bash
yarn add @antv/graphin@latest --save
yarn add @antv/graphin-components@latest --save
yarn add @antv/graphin-icons --save
```

## 🔨 Usage

### Use Graphin Core Component

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
// mock data
const data = Utils.mock(10).circle().graphin();
export default () => {
  return <Graphin data={data} />;
};
```

### Use Graphin Analysis Components

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// mock data
const data = Utils.mock(10).circle().graphin();
export default () => {
  return (
    <Graphin data={data}>
      <MiniMap />
    </Graphin>
  );
};
```

### Use Graphin font icon

```tsx | pure
import React from 'react';
import Graphin from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// Import icon resource files
import iconLoader from '@antv/graphin-icons';
// mock data
const data = Utils.mock(10).circle().graphin();
// Register in Graphin
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);
// Use icons
data.nodes.forEach(node => {
  node.style = {
    icon: {
      type: 'font', // Specify the icon to be Font type
      fontFamily: fontFamily, // Specify FontFamily
      value: icons.home, // Specify the value of the icon
    },
  };
});
export default () => {
  return (
    <Graphin data={data}>
      <MiniMap />
    </Graphin>
  );
};
```

## 👨‍💻 Upgrade Guide

If you are a user from Graphin1.x, this [Upgrade Guide](https://graphin.antv.vision/graphin/quick-start/migration) may help you. If you encounter upgrade problems, you can also go to github Mention issue

## ⌨️ Development Guide

If you want to start Graphin locally, you may wish to read this [Contribution Guide](https://graphin.antv.vision/graphin/quick-start/contributing). We hope that more partners will participate in the open source construction of Graphin

## More Info

- [Graphin Introduction](https://graphin.antv.vision/graphin/quick-start/introduction)
- [Quick Start](https://graphin.antv.vision/graphin/quick-start/quick-start)
- [Graphin visual analysis solution](https://graphin.antv.vision/solution/database/graph-database)

## DingTalk

You can scan the QR code to join graphin's group chat

<img src='https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*-qzoTpLg-1cAAAAAAAAAAAAAARQnAQ' alt='DingTalk' width= '300px'/>
```
