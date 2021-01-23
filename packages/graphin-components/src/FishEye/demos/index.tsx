import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu, FishEye } from '@antv/graphin-components';

import '@antv/graphin/dist/index.css';
// Do not forget to import CSS
import '@antv/graphin-components/dist/index.css';

const { Menu } = ContextMenu;
const App = () => {
  const data = Utils.mock(5).circle().graphin();
  const [visible, setVisible] = React.useState(false);
  const handleClick = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="App">
      <Graphin data={data}>
        <ContextMenu bindType="canvas">
          <Menu bindType="canvas">
            <Menu.Item onClick={handleClick}>开启 FishEye</Menu.Item>
          </Menu>
        </ContextMenu>
        <FishEye options={{}} visible={visible} handleEscListener={handleClose} />
      </Graphin>
    </div>
  );
};
export default App;
