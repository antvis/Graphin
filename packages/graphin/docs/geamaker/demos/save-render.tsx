import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { icons } from './utils';
import { ContextMenu, FishEye } from '@antv/graphin-components';
import hexToRgba from '../../../src/utils/hexToRgba';

const { Menu } = ContextMenu;

const AlibabaColor = '#FF6A00';
/** 转化函数 */
const trans = data => {
  const nodes = data.nodes.map(node => {
    return {
      ...node,
      type: 'graphin-circle',
      style: {
        fill: '#ffb897',
        strokeWidth: 2,
        stroke: AlibabaColor,
        size: [30, 30],
        label: {
          value: '',
          fill: '#666',
        },
        icon: {
          // fontFamily: 'graphin',
          type: 'text',
          value: `${node.id}`,
          fill: '#000',
          size: 14,
        },
        badges: [],
      },
    };
  });
  const edges = data.edges.map(edge => {
    return {
      ...edge,
      size: 1,
      color: '#666',
      label: edge.id,
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#666', // '#545872',
        },
      },
    };
  });
  return {
    nodes,
    edges,
  };
};
export default () => {
  const [state, setState] = React.useState({ data: { nodes: [], edges: [] }, visible: false });
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then(res => res.json())
      .then(res => {
        setState(preState => {
          return {
            ...preState,
            data: trans(res),
          };
        });
      });
  }, []);

  const { data, visible } = state;
  const handleClose = () => {
    setState(preState => {
      return {
        ...preState,
        visible: false,
      };
    });
  };
  const handleOpen = () => {
    setState(preState => {
      return {
        ...preState,
        visible: true,
      };
    });
  };

  return (
    <div>
      <Graphin
        data={data}
        layout={{ type: 'force', preset: { type: 'grid' }, defSpringLen: () => 100 }}
        style={{
          background: '#fff', // '#17113f'
        }}
        height={1000}
      >
        <ContextMenu bindType="canvas">
          <Menu bindType="canvas">
            <Menu.Item onClick={handleOpen}>开启 FishEye</Menu.Item>
          </Menu>
        </ContextMenu>
        {/* <FishEye options={{ showLabel: true }} visible={visible} handleEscListener={handleClose} /> */}
      </Graphin>
    </div>
  );
};
