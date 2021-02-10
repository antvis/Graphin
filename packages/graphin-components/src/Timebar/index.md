---
title: Timebar 时间轴
group:
  path: /special
  title: 特殊分析
nav:
  title: 分析组件
  path: /components
  order: 1
---

# Timebar

Timebar 时间轴 是一种常见的分析组件，可以以时间维度分析图数据。其交互和使用场景是值得探索的方向

## 功能特性

- Timebar 底座可以是 G6.Timebar,也可以是其他组件形式
- 重点看易用性，时间轴事件可以和 Graphin 的画布交互

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Timebar } from '@antv/graphin-components';
// Do not forget to import CSS

const data = Utils.mock(10).graphin();
const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <Timebar data={data} onChange={} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
