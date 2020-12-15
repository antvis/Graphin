# MapMode

MapMode 地图模式，功能做完善了可以考虑单独成 packages/graphin-geospatial

## 功能特性

- MapMode 底层需要依赖 @antv/L7，地理数据和关系数据，需要做适配
- 自由切换 地图模式 和 关系图画布模式

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { MapMode } from '@antv/graphin-components';
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <MapMode></MapMode>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
