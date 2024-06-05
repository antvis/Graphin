<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<p align="center">
  <a href="https://github.com/antvis/graphin">
    <img width="150" src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg">
  </a>
</p>
<h1 align="center">Graphin</h1>

<div align="center">

A lighteight React toolkit for graph analysis based on [G6](https://github.com/antvis/G6).

[![Version](https://img.shields.io/npm/v/@antv/graphin)](https://www.npmjs.com/@antv/graphin)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/graphin.svg)](http://npmjs.com/@antv/graphin)
![Latest commit](https://badgen.net/github/last-commit/antvis/graphin)

</div>


## ✨ 功能特性

- 🎨 **轻量级**：不做过度封装，尽量保持 [G6](https://github.com/antvis/G6) 能力同步，尽量不新增概念，整体核心代码 <200 行。
- 🎗️ **React 风格**：舒心的开发体验，符合 React 用户心智，基于 React 扩展组件更容易。
- 🚀 **丰富组件**：丰富的组件，源于业务沉淀，让用户定制自己的图应用更快更容易。

![component](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*cGzHQK4MGToAAAAAAAAAAAAAARQnAQ)


## 🔨 快速使用

把 `graphin` 当作一个普通的 React 组件来使用即可，通过 NPM 或 Yarn 等包管理器来安装。

```bash
$ npm install @antv/graphin
```

```bash
$ yarn add @antv/graphin
```

成功安装之后，可以通过 import 导入 `Graphin` 组件。

```jsx
import React from 'react';
import { Graphin } from '@antv/graphin';

export function Demo() {
  return (
    <Graphin
      id="my-graphin-demo"
      className="my-graphin-container"
      style={{ width: '100%', height: '100%' }}
      options={{
        data,
        node: {
          style: {
            labelText: (d) => d.id,
          },
          palette: {
            type: 'group',
            field: 'cluster',
          },
        },
        layout: {
          type: 'd3force',
          collide: {
            strength: 0.5,
          },
        },
        behaviors: ['zoom-canvas', 'drag-canvas'],
        animation: true,
      }}
    >
    </Graphin>
    />
  );
}
```


## 📖 API Reference

| Property | Description                                                                                                     | Type                     | Default |
| -------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| id       | 设置图画布容器的 id 属性。                                                                                          | `string`                 | -       |
| className| 设置图画布容器的 class 属性。                                                                                       | `string`                 | -       |
| style    | 设置图画布容器的 style  样式属性。                                                                                   | `CSSProperties`          | -       |
| options  | 设置图画布的配置项，参考 [G6 配置](https://g6.antv.antgroup.com/) 文档，在 `graph.setOptions(options)` 中调用          | `GraphOptions` \| `null` | -       |
| onInit   | 当图实例初始化之后调用，在 `new Graph()` 之后。                                                                       | `(graph: Graph) => void` | -       |
| onReady  | 当图实例渲染完成之后调用，在 `graph.render()` 之后。                                                                  | `(graph: Graph) => void` | -       |
| onDestroy| 当图实例被销毁的时候调用，在 `graph.destroy()` 之后。                                                                 | `() => {}` | -           |


## 🗂 Examples

- [Creating Graph](#creating-graph)
- [Fetching Data](#updating-data)
- [Handling Events](#handling-events)
- [Customizing Component](#customizing-component)
- [Styling Container](#styling-container)
- [Using hooks](#using-hooks)


## 📮 贡献

- **问题反馈**：使用过程遇到的 `graphin` 的问题，欢迎提交 Issue，并附上可以复现问题的最小案例代码。
- **贡献指南**：如何参与到 `graphin` 的[开发和贡献](./CONTRIBUTING.md)。
- **想法讨论**：在 GitHub Discussion 上或者钉钉群里面讨论。

<div>
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CQoGSoFBzaUAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yXJGSY8RC68AAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
</div>


## 📄 License

[MIT](./LICENSE).
