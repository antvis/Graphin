<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

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


## ✨ Features

- 🎨 **Lightweight**: Avoid excessive encapsulation, strive to keep in sync with G6 capabilities, minimize the introduction of new concepts, with the core code <200 lines.
- 🎗️ **React Style**: Comfortable development experience, aligns with the mindset of React users, making it easier to extend components based on React.
- 🚀 **Rich Components**: Offers a rich set of components, derived from business experiences, making it faster and easier for users to customize their graph applications.

![component](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*cGzHQK4MGToAAAAAAAAAAAAAARQnAQ)


## 🔨 Installing

You can use `graphin` as a normal React component, installing it through package managers like NPM or Yarn.

```bash
$ npm install @antv/graphin
```

```bash
$ yarn add @antv/graphin
```

After successful installation, you can import the `Graphin` component.

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
| id       | the id of container div.                                                                                        | `string`                 | -       |
| className| the class name of container div.                                                                                | `string`                 | -       |
| style    | the style of the container                                                                                      | `CSSProperties`          | -       |
| options  | the [options](https://g6.antv.antgroup.com/) for the visualization, say `graph.setOptions(options)`             | `GraphOptions` \| `null` | -       |
| onInit   | Callback for when the graph is initialized, after new Graph().                                                  | `(graph: G6Graph) => void` | -       |
| onReady  | Callback for when the graph is ready, after graph.render().                                                     | `(graph: G6Graph) => void` | -       |
| onDestroy| Callback for when the graph is destroyed, after graph.destroy().                                                | `() => {}` | -       |


## 🗂 Examples

- [Creating Graph](#creating-graph)
- [Fetching Data](#updating-data)
- [Handling Events](#handling-events)
- [Customizing Component](#customizing-component)
- [Styling Container](#styling-container)
- [Using hooks](#using-hooks)


## 📮 Contributing

- **Issue Reporting**: If you encounter any issues with `graphin` during use, please feel free to submit an issue, along with the minimal sample code that can reproduce the problem.
- **Contribution Guide**: Information on how to get involved in the [development and contribution](./CONTRIBUTING.en-US.md) to `graphin`.
- **Ideas Discussion**: Discuss your ideas on GitHub Discussions or in the DingTalk group.

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CQoGSoFBzaUAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yXJGSY8RC68AAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
</div>

## 📄 License

[MIT](./LICENSE).
