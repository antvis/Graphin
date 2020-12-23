---
title: ContextMenu 右键菜单
order: 0
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# ContextMenu 右键菜单

ContextMenu 是右键菜单，通常是对节点进行进一步操作的组件。例如：通过右键菜单实现节点的复制、删除、反选等。同时，用户也可以对选中的节点进行进一步打标、分析、关系扩散、数据请求等高级的交互行为。图分析产品中的右键菜单往往是和浏览器网页的右键菜单交互与展示形式保持一致，但在展示形式上也可以有更多特殊的设计，如仪表盘形状的菜单

## 功能特性

- ContextMenu 作为容器组件，给内部的组件提供事件唤起和坐标定位功能
- 内部展示组件，可选 Menu（菜单样式） 和 Donut（甜甜圈样式） 两种组件
- 支持用户自定义内部展示组件

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## demo

<code src='./demos/ContextMenu' >
<code src='./demos/AntdMenu' >

<code src='./demos/PieMenu' >

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';
const { Menu, Donut } = ContextMenu;

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <Menu.Item>menu item</Menu.Item>
        </ContextMenu>
      </Graphin>

      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <Donut.Item>donut item</Donut.Item>
        </ContextMenu>
      </Graphin>

      <Graphin data={Utils.mock(10).graphin()}>
        <ContextMenu>
          <CustomContent>custom content</CustomContent>
        </ContextMenu>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
