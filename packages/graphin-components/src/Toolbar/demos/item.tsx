import React, { useState } from 'react';
import { Toolbar, Type } from '@antv/graphin-components';
import Graphin, { Utils } from '@antv/graphin';

import { Button, message } from 'antd';

const handleTest = () => {
  message.info('点击 Test');
};

const handleAdd = () => {
  message.info('点击增加');
};

const ItemDemo = () => {
  const graphinRef = React.useRef(null);
  const [direction, setDirection] = useState<Type.ToolbarDirectionType>('horizontal');

  const handleToggle = () => {
    if (direction === 'horizontal') {
      setDirection('vertical');
    } else if (direction === 'vertical') {
      setDirection('horizontal');
    }
  };

  return (
    <Graphin ref={graphinRef} data={Utils.mock(5).circle().graphin()}>
      <Button onClick={handleToggle} style={{ position: 'absolute', top: 0 }}>
        切换 ToolBar 排布
      </Button>
      <Toolbar direction={direction}>
        <Toolbar.Item onClick={handleTest}>tesst</Toolbar.Item>
        <Toolbar.Item>删除</Toolbar.Item>
        <Toolbar.Item onClick={handleAdd}>增加</Toolbar.Item>
      </Toolbar>
    </Graphin>
  );
};

export default ItemDemo;
