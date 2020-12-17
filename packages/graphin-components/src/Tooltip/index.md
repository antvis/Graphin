---
title: Tooltip 提示框
group:
  path: /interaction
  title: 交互组件
nav:
  title: Components
  path: /components
  order: 1
---

# Tooltip

Tooltip 提示框是一种快速浏览信息的交互组件，常用于图的节点和边上。通过鼠标悬停在节点或边上时，出现一个提示框，鼠标移出节点则取消提示框。这在快速查询元素详细信息时非常有帮助。

## 功能特性

- Tooltip 作为容器组件，给内部的组件提供事件唤起和坐标定位功能,提供 Node 和 Edge 两种容器
- 内容展示组件 完全由用户决定

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <Tooltip.Node>
          {(e) => {
            return <CustomContent>{e.item.getModel().name}</CustomContent>;
          }}
        </Tooltip.Node>

        <Tooltip.Edge>
          {(e) => {
            return <CustomContent>{e.item.getModel().name}</CustomContent>;
          }}
        </Tooltip.Edge>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
