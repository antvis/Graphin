---
title: 分析组件
order: 5
---

## \<ContextMenu /> 组件

Props：

|   属性        | 类型                                                       | 是否必选 | 说明                                                      |
| ------------- | ---------------------------------------------------------- | -------- | --------------------------------------------------------- |
| bindType      | 'node' \| 'edge' \| 'canvas'                               | 否       | 事件的监听对象类型，默认值为 node                         |
| graph         | Graph                                                      | 否       | G6 实例                                                   |
| options       | [MenuItemType](#menuitemtype)[]                            | 否       | 菜单项配置                                                |
| render        | (props: [RenderProps](#renderprops)) => React.ReactElement | 否       | 自定义的菜单渲染函数                                      |
| onContextmenu | (e: G6Event, graph: Graph) => boolean;                     | 否       | 右键菜单事件的 hook 函数。返回 false 可以阻止右键菜单出现 |

注意：options 和 render 必须提供一个。

### RenderProps

ContextMenu render 函数的参数。

RenderProps extend 了 ContextMenu 的 Props：

|   属性  | 类型         | 是否必选 | 说明                 |
| ------- | ------------ | -------- | -------------------- |
| onClose | ( ) => void; | 否       | 隐藏右键菜单事件回调 |

### MenuItemType

MenuItem 的配置项

|   属性   | 类型                                                        | 是否必选 | 说明                         |
| -------- | ----------------------------------------------------------- | -------- | ---------------------------- |
| key      | string                                                      | **是**   | React 组件 key               |
| visible  | boolean                                                     | 否       | G6 实例                      |
| iconType | ReactElement/HTMLElement                                    | 否       | icon 实例：@ant-design/icons |
| title    | string                                                      | 否       | 菜单项文本                   |
| width    | number                                                      | 否       | 菜单宽度                     |
| height   | number                                                      | 否       | 菜单高度                     |
| onClick  | (props: [ContainerProps](#containerprops)) => void;         | 否       | 点击回调                     |
| render   | (props: [ContainerProps](#containerprops)) => ReactElement; | 否       | 自定义渲染函数               |

### ContainerProps

MenuItem 点击和渲染函数的参数

|   属性  | 类型                             | 是否必选 | 说明                 |
| ------- | -------------------------------- | -------- | -------------------- |
| graph   | Graph                            | 否       | G6 实例              |
| menu    | [MenuItemType](#menuitemtype)[ ] | 否       | 菜单项配置           |
| onClose | ( ) => void;                     | 否       | 隐藏右键菜单事件回调 |

## \<Toolbar /> 组件

Props：

|   属性    | 类型                                                             | 是否必选 | 说明                                                 |
| --------- | ---------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| graphDOM  | HTMLElement                                                      | **是**   | G6 挂载的 DOM 节点，Graphin 组件的子组件会被自动注入 |
| graph     | Graph                                                            | 否       | G6 实例                                              |
| apis      | [Apis](/zh/docs/api/graphin/#apis)                               | 否       | Graphin API                                          |
| className | string                                                           | 否       | 类名                                                 |
| graphVars | { width?: number; height: number; }                              | 否       | G6 图表信息                                          |
| direction | horizontal \| vertical                                           | 否       | Toolbar 布局方向                                     |
| render    | (props: [RenderProps](#renderprops)) => [MenuItem](#menuitem)[ ] | 否       | 自定义工具栏菜单渲染函数                             |

### MenuItem

|   属性        | 类型                     | 是否必选 | 说明                         |
| ------------- | ------------------------ | -------- | ---------------------------- |
| id            | string                   | **是**   | 唯一标识                     |
| name          | string                   | **是**   | 菜单项文本                   |
| icon          | ReactElement/HTMLElement | 否       | icon 实例：@ant-design/icons |
| action        | horizontal \| vertical   | **是**   | 点击事件回调                 |
| disabled      | boolean                  | 否       | 是否禁用菜单项               |
| style         | CSSProperties            | 否       | 自定义样式                   |
| renderTooltip | () => ReactElement;      | 否       | 自定义工具栏渲染函数         |

### RenderProps

|   属性     | 类型                                | 是否必选 | 说明                 |
| ---------- | ----------------------------------- | -------- | -------------------- |
| toolbarCfg | [MenuItem](#menuitem)[]             | **是**   | 默认的工具栏配置数组 |
| graph      | Graph                               | 否       | G6 实例              |
| apis       | [Apis](/zh/docs/api/graphin/#apis)  | 否       | Graphin API          |  |
| graphVars  | { width?: number; height: number; } | 否       | G6 图表信息          |
| direction  | horizontal \| vertical              | 否       | Toolbar 布局方向     |
