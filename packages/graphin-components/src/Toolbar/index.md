---
title: Toolbar 工具栏
order: 3
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# Toolbar

Toolbar 是提供常见分析操作的工具栏。在 Graphin1.x 版本，我们内置了撤销与重做（操作历史）、鱼眼放大镜、画布缩放、全屏、节点聚焦、画布快照下载等功能。但是在一些深度使用的业务中，我们得到的反馈是更希望 Graphin 暴露这些功能的 API，业务要重新设置样式和界面布局。因此在 Graphin2.x 中 Toolbar 将重新设计，定位为工具栏的容器，功能原子化，支持自由组合

<code src='./demos/Antd.tsx'>

## 功能特性

- Toolbar 作为容器组件，功能原子化，支持自由组合
- 内容展示组件：FullSceen，ZoomIn，ZoomOut，DonwLoadFullImage , 取代内置 Redo 和 Undo 功能。
- 支持用户自定义内部展示组件：比如用户将 FishEye 组件集成
- 支持抛出原子化 API，比如 `Graphin.apis.zoomIn()`

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';
const { Menu, Donut } = Toolbar;

const App = () => {
  return (
    <div className="App">
      /** 使用内置的Toolbar原子化组件 **/
      <Graphin data={Utils.mock(10).graphin()}>
        <Toolbar>
          <Toolbar.Item>
            <SceenFullSceen callback={} />
          </Toolbar.Item>

          <Toolbar.Item>
            <ZoomIn callback={} />
          </Toolbar.Item>

          <Toolbar.Item>
            <ZoomOut />
          </Toolbar.Item>

          <Toolbar.Item>
            <DonwLoadFullImage callback={} />
          </Toolbar.Item>
        </Toolbar>
      </Graphin>
      /** 用户完全自己定义,通过useContext拿到Graphin实例 **/
      <Graphin data={Utils.mock(10).graphin()}>
        <Toolbar>
          <FishEye />
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
