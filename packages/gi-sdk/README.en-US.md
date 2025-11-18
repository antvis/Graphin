<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<p align="center">
  <a href="https://github.com/antvis/graphin">
    <img width="150" src="https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg">
  </a>
</p>

<h1 align="center">GISDK</h1>

<div align="center">

SDK for Graph Insight Application based on [G6](https://github.com/antvis/G6).

[![Version](https://img.shields.io/npm/v/@antv/gi-sdk)](https://www.npmjs.com/@antv/gi-sdk)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/gi-sdk.svg)](http://npmjs.com/@antv/gi-sdk)

</div>

## ✨ Features

- 🎗️ **React Style**: Comfortable development experience, aligns with the mindset of React users, making it easier to extend components based on React.
- 📜 **Configuration Management**: Fully customize your visual application through configuration files, including metadata, datasets, canvas, and component settings to meet diverse needs.
- 🌐 **Multiple Data Source Support**: Easy integration of diverse data sources, encompassing both local and remote datasets.
- 🧩 **Customizable Component Structure**: Flexible component architecture enabling users to develop and extend custom components and services to meet complex business scenarios.
- 🔌 **Easy to Get Started**: Built-in APIs and Hooks simplify instance retrieval, inter-component communication, and state management.

## 🔨 Installing

You can use `GISDK` as a normal React component, installing it through package managers like NPM or Yarn.

```bash
$ npm install @antv/gi-sdk
# or
$ yarn add @antv/gi-sdk
```

Render your graph application using the configuration file `config` and asset package `assets`.

```jsx
import React from 'react';
import { GISDK } from '@antv/gi-sdk';
import { myAssetPackage } from './assets';
import { config } from './config';
export default () => {
  const assets = [myAssetPackage];
  return <GISDK className="my-graph-application" style={{ height: '80vh' }} config={config} assets={assets} />;
};
```

## 📖 API Reference

| Property           | Description                                                  | Type                                                                                               | Default |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------- |
| className          | Sets the class attribute of the graph application container  | `string`                                                                                           | -       |
| style              | Sets the style properties of the graph application container | `CSSProperties`                                                                                    | -       |
| config             | Configuration description of the graph application           | [`Application`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/spec/application.ts) | -       |
| assets             | Asset packages used to render the graph application          | [`AssetPackage[]`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/types/asset.ts)   | -       |
| initialGlobalState | Initial global extended state                                | [`GlobalModel`](https://github.com/antvis/Graphin/blob/v3/packages/gi-sdk/src/context/types.ts)    | -       |

## ⚡️ Build Your Graph Application

### 1. Configure the Graph Application

Define the version number, metadata, dataset configuration, graph canvas configuration, and components configuration.

```js
const config: Application = {
  version: '0.1',
  metadata: {
    name: 'Test Application',
  },
  dataset: { ... }, // [See 2.1]
  spec: {
    graph: { ... },  // [See 2.2]
    widgets: [ ... ]  // [See 2.3]
  }
 };
```

#### 2.1 Dataset Configuration

Supports two forms: local datasets and remote datasets. Remote datasets need to be used with service assets, and the obtained data will be internally hosted on the graph.

```js
dataset: {
  id: 'local-dataset-id',
  type: 'local',
  data: { /** Graph Data */ },
}
// or
dataset: {
  id: 'remote-dataset-id',
  type: 'remote',
  serviceType: 'FetchData',
  properties: {
    url: 'https://assets.antv.antgroup.com/g6/cluster.json',
  },
}
```

#### 2.2 Graph Canvas Configuration

Refer to the [G6 configuration](https://g6.antv.antgroup.com/) documentation for graph canvas configuration.

```js
spec: {
  graph: {
    /** G6 Options */
  }
}
```

#### 2.3 Component Configuration

Define the collection of components to be mounted on the application and manage parent-child relationships between components through the slot mechanism for flexible layout.

```js
spec: {
  widgets: [
    /** Widgets Configs */
  ];
}
```

> For users upgrading from version 2.x, assets in version 2.x are categorized as layout assets, container assets, self-running assets, and atomic assets. In the new version's design, these concepts are blurred, and they can still be realized through slot-driven rendering and organization of the component tree.

##### Slot Mechanism

Slots are used to insert components into specific positions; through slots, the layout of components can be organized flexibly.

1. **Define Slots**
   Define multiple slots for container components, such as a toolbar. This slot is like a reserved slot waiting for specific components to be inserted.
   ```js
   {
     widgets: [
       {
         id: 'toolbar',
         type: 'Toolbar', // Corresponds to the asset's metadata.name
         slots: {
           default: [ ... ],
         },
       }
     ]
   }
   ```
2. **Bind Components to Slots**
   Bind components to the corresponding slots. Binding is done using the component ID. For example, binding zoom-in and zoom-out components to the toolbar slot.
   ```js
   {
     widgets: [
       {
         id: 'toolbar',
         type: 'Toolbar',
         slots: {
           default: ['zoom-in', 'zoom-out'],
         },
       },
       {
         id: 'zoom-in',
         type: 'ZoomInButton',
       },
       {
         id: 'zoom-out',
         type: 'ZoomOutButton',
       },
     ];
   }
   ```
3. **Specific Implementation in Container Components**
   In the parent component, use the `slotElements` property to insert child components into the corresponding slots.
   ```jsx
   export default (props) => {
     const { slotElements } = props;
     return <div className="toolbar">{slotElements.default}</div>;
   };
   ```

### 2. Render the Graph Application

```jsx
import React from 'react';
import { GISDK } from '@antv/gi-sdk';
import GICoreAssets from '@antv/gi-core-assets'; // Official core asset package
import { MyAssetPackage } from './asset'; // Local asset package
import { config } from './config';
export default function () {
  const assets = [GICoreAssets, MyAssetPackage];
  return <GISDK config={config} assets={assets} />;
}
```

> For complete example code, see [demo](https://github.com/antvis/Graphin/tree/v3/packages/gi-core-assets/docs)

## 🔮 Custom Asset Development

Assets are the fundamental units for building graph applications. If the official assets do not meet your business needs, you can create custom assets.
Assets are divided into two categories: components (widgets) and services.

### Asset Development Process

#### Component Asset Development

Here is a simple example of component asset development:

```plaintext
├─widgets
│ ├─Toolbar
│ │ ├─index.tsx         // Entry file for component asset
│ │ ├─Component.tsx     // Component file
│ │ ├─Component.less    // Component style file, optional
│ ├─index.ts            // Entry file for the asset package
```

Entry file for the component asset Toolbar:

```jsx
import React from 'react';
import type { ImplementWidget } from '@antv/gi-sdk';
export const Toolbar: ImplementWidget = {
  version: '0.1',
  metadata: {
    name: 'Toolbar',
    displayName: 'Toolbar',
  },
  component: () => {
    return <div>Toolbar</div>
  },
};
```

#### Service Asset Development

Service assets are used to define data fetching modules. Here is a simple example of service asset development:

```plaintext
├─services
│ ├─fetch-data
│ │ ├─index.ts // Entry file for service asset
│ │ ├─service.ts // Service file
```

Entry file for the service asset FetchData:

```jsx
import type { ImplementService } from '@antv/gi-sdk';
export const FetchData: ImplementService = {
  version: '0.1',
  metadata: {
    name: 'FetchData',
    description: 'Fetch data via fetch',
  },
  service: ({ properties: { url } }) => {
    return fetch(url).then((res) => res.json());
  },
};
```

#### Asset Packaging

The official core asset package `@antv/gi-core-assets` is available for direct use. Example of a custom asset package:

```jsx
import type { AssetPackage } from '@antv/gi-sdk';
import { Toolbar } from './widgets';
import { FetchData } from './services';
export const MyAssetPackage: AssetPackage = {
  version: '0.1',
  metadata: {
    name: 'MyAssetPackage',
    displayName: 'Test Asset Package',
  },
  widgets: [ Toolbar, ... ],
  services: [ FetchData, ... ],
};
```

### Hooks

GISDK provides the following hooks for use during **asset development**.

### Graph-Related

- `useGraph()`: Get and update the graph instance.
  ```jsx
  import { useGraph } from '@antv/gi-sdk';
  export default () => {
    const [graphInstance, setGraphInstance] = useGraph();
  };
  ```
- `useGraphOptions()`: Get and update graph configuration options.
  ```jsx
  import { useGraphOptions } from '@antv/gi-sdk';
  export default () => {
    const [options, updateOptions] = useGraphOptions();
  };
  ```

### Inter-Component Communication

- `useGlobalModel(key?)`: Manage global extended state, allowing state sharing between different components.
  ```jsx
  import { useGlobalModel } from '@antv/gi-sdk';
  export default () => {
    const [globalModel, setGlobalModel] = useGlobalModel();
    const [a, setA] = useGlobalModel('a');
  };
  ```
- `useEventSubscribe(evt, callback, once?)`: Subscribe to events and listen for specific event-triggered callbacks.
  ```jsx
  import { useEventSubscribe } from '@antv/gi-sdk';
  export default () => {
    useEventSubscribe('update', () => {...});
  };
  ```
- `useEventPublish()`: Publish events to notify other components.
  ```jsx
  import { useEventPublish } from '@antv/gi-sdk';
  export default () => {
    const emit = useEventPublish();
    const triggerChange = () => {
      emit('update');
    };
  };
  ```
- `useWidgetProps(widgetId)`: Get and update component properties.
  ```jsx
  import { useWidgetProps } from '@antv/gi-sdk';
  export default () => {
    const [panelProps, updatePanelProps] = useWidgetProps('panel');
  };
  ```

### Registration Mechanism

- `useRegistryManager()`: Manage dynamic registration of components and services.
  ```jsx
  import { useRegistryManager } from '@antv/gi-sdk';
  export default () => {
    const registryManager = useRegistryManager();
    const fetchDataService = registryManager.getService('FetchData').service;
  };
  ```
