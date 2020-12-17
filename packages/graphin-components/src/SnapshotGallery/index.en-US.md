---
title: SnapshotGallery
group:
  path: /analysis
  title: Analytical Component
nav:
  title: Components
  path: /components
  order: 1
---

# SnapshotGallery

SnapshotGallery consists of a series of saved snapshots from a user's analysis, which Graphin refers to as a Snapshot Gallery. Compared to the traditional single snapshot feature, the Snapshot Gallery allows for snippets of snapshots to be saved on the system for analysts to be able to look back and review. The Snapshot Gallery is more visual and better integrated with the analyst workflow than the "Undo Redo" function in the toolbar.

## Features

- SnapshotGallery has built-in state management and listens to Graphin's built-in events to store the required data
- A start event is triggered when the user clicks on the icon or uses the "Command+G" keyboard shortcut. This takes a screenshot and adds it to the analysis gallery.
- Clicking the snapshot in the gallery will cause the snapshot object to be displayed on the canvas
- The gallery can be scrolled or minimized

## Reference

> We welcome the Github community to discuss the component design and implementation, and build an open-source solution together.

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { SnapshotGallery, Toolbar } from '@antv/graphin-components';
import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

/** The following is pseudo-code of the controlled mode. SnapshotGallery should have in-built save and redo functionalities **/
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
  const handleSnapshotChange = (value) => {
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
