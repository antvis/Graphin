---
title: TodoUndo 撤销回做
group:
  path: /interaction
  title: 交互组件
  order: 0
nav:
  title: Components
  path: /components
  order: 1
---

# TodoUndo

TodoUndo 撤销回做，提供数据的存储能力，可以轻易实现 Todo，Undo 这些产品能力，从而使整个分析过程具备操作容错性。业务层也可以在此组件上添加撤销回退的特殊业务策略

## 功能特性

- TodoUndo 内置 state，能够监听 Graphin 的内置事件，从而将需要的数据存储起来
- 实例提供 undo，todo 原子化 API，用户可以方便操作

## 参考资料

> 欢迎 github 的伙伴 讨论设计和组件方案，开源共建。

## 用法

```tsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { TodoUndo, Toolbar } from '@antv/graphin-components';
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const App = () => {
  const historyRef = React.createRef();

  const handleTodo = () => {
    historyRef.current.todo();
  };
  const handleUndo = () => {
    historyRef.current.undo();
  };

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).graphin()}>
        <TodoUndo ref={historyRef} />
        <Toolbar>
          <Toolbar.Item onClick={handleTodo}>todo</Toolbar.Item>
          <Toolbar.Item onClick={handleUndo}>undo</Toolbar.Item>
        </Toolbar>
      </Graphin>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
