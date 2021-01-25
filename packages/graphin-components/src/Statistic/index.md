---
title: Statistic 画布统计
group:
  path: /mark
  title: 标示组件
  order: 1
nav:
  title: Components
  path: /components
  order: 1
---

# Statistic 画布统计

类似 antd 的 [Statistic 统计数值] (https://ant.design/components/statistic-cn/),Graphin 中也需要一个实时统计画布节点信息的组件。

## 功能特性

- 基础功能
  - 统计当前画布的节点数量，边数量
- 高级功能
  - 迭代式布局中（如力导向布局），还可以提供布局时间与进度
  - 在一些大图场景下，还需要监控浏览器的内存，网络等系统监控信息。

## 参考资料

![GraphStudio设计](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*xiXPRJAq3S4AAAAAAAAAAAAAARQnAQ)

欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Statistic } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  return (
    <div className="App">
      <Graphin data={data}>
        <Statistic />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
