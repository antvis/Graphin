---
title: LayoutSelector 布局切换器
group:
  path: /analysis
  title: 分析配套
  order: 3
nav:
  title: Components
  path: /components
  order: 3
---

# LayoutSelector 布局切换器

LayoutSelector 布局切换器，是常见的一种图分析配套组件，通过切换布局的类型，同时支持用户自定义调参，以此达到最好的布局效果

## 功能特性

- 支持布局切换
- 支持用户自定义配置布局的参数

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

- ![](https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*cMRqTbym2dcAAAAAAAAAAAAAARQnAQ)

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { LayoutSelector } from '@antv/graphin-components';
// Do not forget to import CSS
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  const [layout, setLayout] = React.useState({ name: 'force', options: {} });
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()} layout={layout}>
        <LayoutSelector value={layout} onChange={setLayout} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
