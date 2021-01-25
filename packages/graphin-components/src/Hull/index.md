---
title: Hull 轮廓包裹
group:
  path: /mark
  title: 标示组件
  order: 1
nav:
  title: Components
  path: /components
  order: 1
---

# Hull 轮廓包裹

Hull 轮廓包裹，是常见的一种图分析组件，可以将所属在一组的节点描边产生轮廓，从而在视觉上区分分组，轮廓组件不破坏原先的节点布局，是一种高效简单的分析组件

## Demo

<code src='./demos/Simple.tsx'></code>

<API src='./index.tsx'></API>

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Hull } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  const hullOptions = [
    {
      members: ['node-1', 'node-2', 'node-7'], // 必须参数
    },
    {
      members: ['node-4', 'node-5'],
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    },
  ];
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Hull options={hullOptions} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

## 功能特性

- 技术底座和 G6.Hull 保持一致
- 支持多个轮廓
- 支持用户自定义样式

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。
