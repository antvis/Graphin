---
title: Analysis component
order: 5
---

## \<Toolbar /> 

Props：

|   Property        | Type                                                       | Required | Description                                                      |
| ------------- | ---------------------------------------------------------- | -------- | --------------------------------------------------------- |
| bindType      | 'node' \| 'edge' \| 'canvas'                               | no       | type of the monitor target and the default value is node                        |
| graph         | Graph                                                      | no       | G6 Instance                                                   |
| options       | [MenuItemType](#menuitemtype)[]                            | no       | configuration of menu                                               |
| render        | (props: [RenderProps](#renderprops)) => React.ReactElement | no       |  rendering function of custom menu                                     |
| onContextmenu | (e: G6Event, graph: Graph) => boolean;                     | no       | The hook function of the right-click menu. Return false if you want to prevent appearing of the menu  |

注意：options 和 render 必须提供一个。

### RenderProps

Argument of render function which extends Props of Toolbar:

|   Property  | Type         | Required | Description                 |
| ------- | ------------ | -------- | -------------------- |
| onClose | ( ) => void; | no       | Called when closing menu |

### MenuItemType

configuration of MenuItem

|   Property        | Type                                                        | Required | Description                |
| ------------- | ----------------------------------------------------------- | -------- | ------------------- |
| key           | string                                                      | **yes**   | key of React component     |
| visible       | boolean                                                     | no       | Whether the item is visible or not            |
| iconType      | string                                                      | no       | antd icon Type      |
| title         | string                                                      | no       | text of item          |
| width         | number                                                      | no       | width of item            |
| height        | number                                                      | no       | height of item            |
| onClick       | (props: [ContainerProps](#containerprops)) => void;         | no       | Called when clicking item            |
| useCustomIcon | boolean                                                     | no       | Whether to use custom icon |
| render        | (props: [ContainerProps](#containerprops)) => ReactElement; | no       | custom rendering function      |

### ContainerProps

arguments of Clicking and rendering MenuItem

|   Property  | Type                             | Required | Description                 |
| ------- | -------------------------------- | -------- | -------------------- |
| graph   | Graph                            | no       | G6 instance             |
| menu    | [MenuItemType](#menuitemtype)[ ] | no       | configuration of menu           |
| onClose | ( ) => void;                     | no       | Called when closing menu |

## \<ContextMenu /> component

Props：

|   Property    | Type                                                             | Required | Description                                                 |
| --------- | ---------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| graphDOM  | HTMLElement                                                      | **yes**   | Mounted DOM of G6 which will be injected to children of Graphin automatically |
| graph     | Graph                                                            | no       | G6 instance                                             |
| apis      | [Apis](/zh/docs/api/graphin/#apis)                               | no       | Graphin API                                          |
| className | string                                                           | no       | className                                                 |
| graphVars | { width?: number; height: number; }                              | no       | graph infomation of G6                                          |
| direction | horizontal \| vertical                                           | no       | Direction of Toolbar                                    |
| render    | (props: [RenderProps](#renderprops)) => [MenuItem](#menuitem)[ ] | no       | custom rendering function of menu                          |

### MenuItem

|   Property        | Type                   | Required | Description                     |
| ------------- | ---------------------- | -------- | ------------------------ |
| id            | string                 | **yes**   | Unique identifier                 |
| name          | string                 | **yes**   | display text of menu               |
| icon          | string                 | **yes**   | icon Type（antd） of menu |
| action        | horizontal \| vertical | **yes**   | Called when clicking items            |
| disabled      | boolean                | no       | Whether disabled select           |
| style         | CSSProperties          | no       | custom style               |
| renderTooltip | () => ReactElement;    | no       | custom rendering function of tooltip    |

### RenderProps

|   Property     | Type                                | Required | Description                 |
| ---------- | ----------------------------------- | -------- | -------------------- |
| toolbarCfg | [MenuItem](#menuitem)[]             | **yes**   | Default configuration of toolbar |
| graph      | Graph                               | no       | G6 instance              |
| apis       | [Apis](/zh/docs/api/graphin/#apis)  | no       | Graphin API          |  |
| graphVars  | { width?: number; height: number; } | no       | Graph infomation of G6          |
| direction  | horizontal \| vertical              | no       | Direction of Toolbar    |
