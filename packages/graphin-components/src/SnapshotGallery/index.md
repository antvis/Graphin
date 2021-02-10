---
title: SnapshotGallery 快照画廊
group:
  path: /analysis
  title: 分析配套
  order: 3
nav:
  title: 分析组件
  path: /components
  order: 3
---

# SnapshotGallery 快照画廊

SnapshotGallery 快照画廊是由一系列分析结果快照保存组成的事件长廊，Graphin 形象地称之为快照画廊。与传统单一的快照功能相比，快照画廊能够将片断的分析快照保存在系统上，以供分析师能够回看和二次分析。相比工具栏里的“撤销回退”功能，快照画廊更佳可视化，与分析系统集成度更佳。

## 功能特性

- SnapshotGallery 内置 state，能够监听 Graphin 的内置事件，从而将需要的数据存储起来
- 提供启动事件，点击 icon 或者直接键盘事件“Command+G”截图，缓动画加入分析长廊。
- 点击长廊的每个快照，可以激活画布，快速复现快照
- 长廊提供滚动，向下拉宽等交互

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { SnapshotGallery, Toolbar } from '@antv/graphin-components';

/** 以下为受控模式，伪代码。Graphin 封装的 SnapshotGallery 应该将 save 和 redo 全部内置 **/
const App = () => {
  const [state, setState] = React.useState({
    data: Utils.mock(10).graphin(),
    history: [{}],
  });
  const { data, history } = state;

  const handleAddSnapshot = () => {
    const newShapshot = graph.save();
    setState({
      history: [...history, newShapshot],
    });
  };
  const handleSnapshotChange = value => {
    setState({
      data: value,
    });
  };

  return (
    <div className="App">
      <Graphin data={data}>
        <button onClick={handleAddSnapshot}> add snapshot ；或者直接通过键盘事件启动快照长廊 </button>
        <SnapshotGallery ref={snapshotRef} history={history} onChange={handleSnapshotChange} />
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
