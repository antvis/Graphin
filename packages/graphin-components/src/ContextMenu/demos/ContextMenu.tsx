import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';

const { Menu } = ContextMenu;

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(5).circle().graphin()} layout={{ type: 'graphin-force' }}>
        <ContextMenu>
          <Menu>
            <Menu.Item>menu item</Menu.Item>
            <Menu.Item>menu item</Menu.Item>
          </Menu>
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
