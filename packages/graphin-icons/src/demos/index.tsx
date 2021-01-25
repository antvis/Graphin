import React from 'react';
import Graphin, { Behaviors, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import { message, Input } from 'antd';
import iconLoader from '@antv/graphin-icons';

import '@antv/graphin-icons/dist/index.css';

const icons = Graphin.registerFontFamily(iconLoader);
const { Menu } = ContextMenu;

const { fontFamily, glyphs } = iconLoader();
const nodes = glyphs.map((glyph) => {
  const { name } = glyph;
  return {
    type: 'graphin-circle',
    style: {
      icon: {
        type: 'font',
        fontFamily,
        value: icons[name],
        size: 40,
      },
      label: {
        value: name,
        fontSize: 8,
        offset: [0, 4],
      },
      keyshape: {
        stroke: '#fff',
        lineWidth: 0,
        fill: 'transparent',
      },
    },
  };
});
const data = { nodes, edges: [] };
const { DragNode } = Behaviors;
const handleChange = (option, item) => {
  const text = item.style.label.value;
  navigator.clipboard.writeText(text).then(
    () => {
      message.success(`Copying icon ${text} to clipboard was successful!`);
    },
    (err) => {
      message.error('Async: Could not copy text: ', err);
    },
  );
};

const Search = (props) => {
  const { style } = props;
  const [state, setState] = React.useState({
    visible: false,
  });
  const { graph } = React.useContext(GraphinContext);
  React.useEffect(() => {
    let isKeyController = false;
    let isKeyF = false;
    graph.on('keydown', (e) => {
      console.log('e', e);
      if (e.key === 'Control') {
        isKeyController = true;
      }
      if (e.key === 'f') {
        isKeyF = true;
      }
      if (isKeyF && isKeyController) {
        setState((preState) => {
          return {
            ...preState,
            visible: true,
          };
        });
      }
      if (e.key === 'Escape') {
        isKeyF = false;
        isKeyController = false;
        setState((preState) => {
          return {
            ...preState,
            visible: false,
          };
        });
      }
    });
    graph.on('keyup', (e) => {
      if (e.key === 'Control') {
        isKeyController = false;
      }
      if (e.key === 'f') {
        isKeyF = false;
      }
    });
  }, []);
  const { visible } = state;
  const styles = {
    position: 'absolute',
    width: '80%',
    top: '0px',
    left: '50%',
    transform: ' translate(-50%, 0)',
    zIndex: 1000,
    boxShadow: `0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)`,
    ...style,
    display: visible ? 'block' : 'none',
  };
  // const maskStyle = {
  //   position: 'absolute',
  //   width: '100%',
  //   top: '0px',
  //   right: '0px',
  //   left: '0px',
  //   bottom: '0px',
  //   zIndex: 999,
  //   background: 'rgba(0,0,0,0.4)',

  // };
  const handleClose = () => {
    setState({ visible: false });
  };
  return (
    // <div style={maskStyle} onClick={handleClose}>
    <div style={styles}>
      <Input placeholder="搜索图标" bordered={false} style={{ height: '80px' }} />
    </div>
    // </div>
  );
};
const Demo = () => {
  return (
    <div style={{ height: 'calc(100vh - 112px)' }}>
      <Graphin data={data} layout={{ type: 'grid', nodeSize: 80 }}>
        <DragNode disabled />
        <ContextMenu bindType="node" style={{ width: '100px' }}>
          <Menu bindType="node" options={[{ name: '复制ICON' }]} onChange={handleChange} />
        </ContextMenu>
        <Search />
      </Graphin>
    </div>
  );
};

export default Demo;
