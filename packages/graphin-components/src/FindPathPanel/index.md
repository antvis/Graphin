---
title: FindPathPanel 寻找路面板
group:
  path: /analysis
  title: 分析组件
nav:
  title: Components
  path: /components
  order: 1
---

# FindPathPanel

FindPathPanel 寻找路径组件 是一种算法分析组件。当我们多选的时候，选中节点达到两个的时候了，该组件会呈现为呼吸灯提示，点击即可打开面板。在面板上，画布中选中的两个节点会作为 source 和 target 节点（当然也支持类似高德路线那样，点击箭头切换起始方向），下面会出现一个路径 List 列表，起始第一个路径为 最短路径，其余的路径是两个点经过的路径，按照节点个数倒叙排序

## 功能特性

- FindPathPanel 内置监听事件，当选中节点为 2 个的时候，呼吸灯打开，提示用户当前可以使用此分析组件
- 原子化的 API 均由 graphin.graph 提供，各种路径分析算法

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { FindPathPanel } from '@antv/graphin-components';
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const { BreathingLamp } = FindPathPanel;

const App = () => {
  const handleCloseCallback = () => {};

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <FindPathPanel onClose={handleCloseCallback} />
        <Toolbar>
          <Toolbar.Item>
            <BreathingLamp />
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
