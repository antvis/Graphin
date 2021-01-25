---
title: CreateEdge 边建联组件
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# CreateEdge 边建联组件

CreateEdge 边建联组件 是一种常见的交互组件。当我们的图分析过程中，需要建立新的图模型，边的创建就尤为关键。一般用户的操作路径是这样的，点击 `编辑ICON` 的 button，激活边建联模式，鼠标 hover 到节点上的时候，能够呈现`+`号，提示用户当前可以连线。连线默认采用`click`的方式，点击另一个节点后即可建立边，整个过程可以参考 G6 的`create-edge`实现：https://g6.antv.vision/zh/examples/interaction/createEdge#click

## 功能特性

- CreateEdge 表现层为一个容器组件，children 可以存放`edit-icon`，用户点击即可激活边建联模式
- 做好体验优化：鼠标 hover 的节点状态，鼠标指示样式，全局状态提示等
- 需要一个回调函数：onChange，传递最新的画布数据 data，可以让用户自主选择同步到 Graphin.props.data

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { CreateEdge } from '@antv/graphin-components';

const { BreathingLamp } = CreateEdge;

const App = () => {
  const handleChange = (value: GraphData) => {};

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        /** 可以将此功能集成在Toolbar中 **/
        <Toolbar>
          <Toolbar.Item>
            <CreateEdge onChange={handleChange}>建立关系</CreateEdge>
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
