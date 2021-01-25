---
title: Sheetbar 多画布
group:
  path: /analysis
  title: 分析配套
  order: 3
nav:
  title: Components
  path: /components
  order: 3
---

# Sheetbar 多画布

类似 excel 表格那样的 sheet 页签，支持多画布操作和用户的二次分析

## 功能特性

## 参考资料

欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Sheetbar } from '@antv/graphin-components';
// Do not forget to import CSS

const App = () => {
  return (
    <div className="App">
      <Sheetbar>
        <Sheetbar.Item>
          <Graphin data={Utils.mock(10).graphin()}></Graphin>
        </Sheetbar.Item>
        <Sheetbar.Item>
          <Graphin data={Utils.mock(4).graphin()}></Graphin>
        </Sheetbar.Item>
      </Sheetbar>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
