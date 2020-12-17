---
title: 简单渲染
group:
  path: /
nav:
  title: Graphin
  path: /graphin
  order: 1
---

## React

```jsx
import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
export default () => {
  return (
    <div>
      <Graphin
        data={Utils.mock(10)
          .circle()
          .graphin()}
      />
    </div>
  );
};
```
