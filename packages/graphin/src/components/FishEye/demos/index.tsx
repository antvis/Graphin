import type { ContextMenuValue } from '@antv/graphin';
import Graphin, { Components, Utils } from '@antv/graphin';
import { Menu } from 'antd';
import React from 'react';

const { ContextMenu, FishEye } = Components;
const MyMenu = ({ value, onClick }: { value: ContextMenuValue; onClick: () => void }) => {
  const handleClick = () => {
    onClick();
    value.onClose();
  };
  return (
    <Menu>
      <Menu.Item onClick={handleClick}>开启 FishEye</Menu.Item>
    </Menu>
  );
};

// Do not forget to import CSS

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
          {value => {
            return <MyMenu value={value} onClick={handleClick} />;
          }}
        </ContextMenu>
        <FishEye options={{}} visible={visible} handleEscListener={handleClose} />
      </Graphin>
    </div>
  );
};
export default App;
