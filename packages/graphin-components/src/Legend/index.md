---
title: Legend 图例
group:
  path: /mark
  title: 标示组件
  order: 1
nav:
  title: Components
  path: /components
  order: 1
---

# Legend

Legend 图例是一种常见的图分析配套组件，通常将节点和边分类后进行染色，方便用户交互分析。其中点击图例有两种逻辑，一是高亮，即高亮选中的图例所对应的节点；二是过滤，即将未选中的节点隐藏。

<code src='./demos/index.tsx'>

## 功能特性

- 支持用户自定义 legend 的颜色映射
- 点击交互：支持高亮，支持节点隐藏 两种模式

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

- Graphin 现在的 legend：https://graphin.antv.vision/zh/examples/components/legend

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Legend } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Legend />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
