# FishEye

FishEye 鱼眼放大镜，是常见的一种图分析配套组件，用于查看局部细节，当图的节点和边很多的时候，很有效果。

## 功能特性

- 支持 G6.FishEye 的全部能力
- 支持 键盘事件 和 鼠标事件 唤起鱼眼放大镜
- 支持 快速集成到 Toolbar

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { FishEye } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <FishEye />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
