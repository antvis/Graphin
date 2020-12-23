---
title: MiniMap 小地图
order: 2
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# MiniMap

MiniMap 小地图导航 是一种常见的交互组件，当数据量很大， 小地图导航可以让用户看到当前画布内容位于全局的什么位置，从而不丢失分析的全局感，是非常有效的组件

## 功能特性

- MiniMap 技术底座应该是 G6.MiniMap，可以通过组件内部 didmount 的时候 addPlugins 的方式注入
- 支持用户定制样式，调整位置

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { MiniMap } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const data = Utils.mock(10).graphin();
const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <MiniMap styles={} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
