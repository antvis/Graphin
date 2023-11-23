---
title: 自定义元素
order: 0
group:
  path: /register
  title: 自定义机制
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## 【推荐】Github 提 ISSUE

当 Graphin 内置的节点`graphin-circle` 和 内置的边`graphin-line`不满足需求的时候，推荐做法是[github](https://github.com/antvis/Graphin/issues)提 issue 。目前 Graphin 内置的元素都是通过多方业务实践，总结出来的一套元素规范。因此我们更希望有更多的业务反馈加入，完善这个规范。

## 【兼容】通过 G6.registerNode 注册节点

熟悉 G6 的朋友应该知道，整个图元素都是 G6 的[注册机制](https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/custom-node)完成的。Graphin 当然也支持自定义节点。用户可以直接通过`Graphin.reigsterNode()`完成注册。内部实现源码如下：

```jsx | pure
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };
```

<code src='./register-node.tsx'>

## 【兼容】通过 G6.registerEdge 注册边

其实注册边的情景并不多，而且相对于节点的定制，边的定制往往设计很多`path`的计算,因此在实际使用中,如果内置的边不满足需求的情况下，优先提 ISSUE，寻求官方支持哈

<code src='./register-edge.tsx'>

## 【兼容】通过 G6.registerCombo 注册 Combo

如上述自定义节点和边一样，依旧可以参考 G6 文档 [custom-combo](https://g6.antv.vision/zh/docs/manual/middle/elements/combos/custom-combo) 轻松实现自定义 Combo
