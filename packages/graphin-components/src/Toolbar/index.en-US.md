---
title: Toolbar
group:
  path: /interaction
  title: Interactive Component
nav:
  title: Components
  path: /components
  order: 1
---

# Toolbar

Toolbar makes common analysis operations easily accessible. In Graphin version 1.x, we built in undo and redo, fisheye magnifier, canvas zoom, full screen, node focus, canvas snapshot download, etc. However we got feedback from some businesses that they would prefer Graphin to expose the API for these features and allow the business to customize the style and interface layout. Therefore, in Graphin 2.x, Toolbar will be redesigned and positioned as a container for various toolbar operations.

## Features

- Toolbar takes the form of a container which supports a variety of functions and operations
- Content display components: FullSceen, ZoomIn, ZoomOut, DonwLoadFullImage, replacing the built-in Redo and Undo functions.
- Support for user-defined components: e.g. integrating the FishEye component
- Support for APIs such as `Graphin.apis.zoomIn()`

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

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
      /** Use the built-in Toolbar component **/
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
      /** User-defined, get Graphin instance by useContext **/
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
