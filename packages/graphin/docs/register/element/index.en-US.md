---
title: Custom Element
order: 0
group:
  path: /register
  title: Custom
nav:
  title: 使用文档
  path: /graphin
  order: 1
---

## [Recommended] Github mentions ISSUE

When Graphin's built-in node `graphin-circle` and built-in edge `graphin-line` do not meet the requirements, the recommended way is to [github](https://github.com/antvis/Graphin/issues) to issue an issue. Currently, the built-in elements of Graphin are a set of element specifications summarized through multi-party business practices. Therefore, we hope that more business feedback will be added to improve this specification.

## [Compatible] Register node through G6.registerNode

Friends who are familiar with G6 should guide that the entire graph elements are completed by G6's [register](https://g6.antv.vision/en/docs/manual/middle/elements/nodes/custom-node). Of course Graphin also supports custom nodes. Users can directly complete the registration through `Graphin.reigsterNode()`. The internal source code is as follows:

```jsx | pure
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };
```

<code src='./register-node.tsx'>

## [Compatible] Register edge through G6.registerEdge

In fact, there are not many scenarios for registering edges, and compared to node customization, edge customization often designs a lot of `path` calculations. Therefore, in actual use, if the built-in edges do not meet the needs, give priority to ISSUE and seek Official support

<code src='./register-edge.tsx'>

## [Compatible] Register Combo through G6.registerCombo

Like the above custom nodes and edges, you can still refer to the G6 document [custom-combo](https://g6.antv.vision/en/docs/manual/middle/elements/combos/custom-combo) to easily implement customization Combo
