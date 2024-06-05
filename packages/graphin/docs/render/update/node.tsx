import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import iconLoader from '@antv/graphin-icons';

const icons = Graphin.registerFontFamily(iconLoader);

const { Menu } = ContextMenu;

const data = Utils.mock(5).circle().graphin();
const layout = {
  type: 'graphin-force',
  preset: {
    type: 'random',
  },
};

const UpdateNode = () => {
  const { graph } = React.useContext(GraphinContext);
  const handleChange = (option, item) => {
    console.log(option, item);
    // 方法一：直接更新，不持久化到数据中
    if (item.id === 'node-0') {
      graph.updateItem(item.id, {
        style: {
          // @ts-ignore
          label: {
            value: 'node-0: update keyshape size,fill,stroke',
          },
          keyshape: {
            size: 80,
            stroke: '#ff9f0f',
            fill: '#ff9f0ea6',
          },
        },
      });
    }
    if (item.id === 'node-1') {
      graph.updateItem(item.id, {
        style: {
          // @ts-ignore
          label: {
            value: 'update label offset/ color',
            offset: [100, 0],
            position: 'right',
            fill: 'red',
          },
        },
      });
    }
    if (item.id === 'node-2') {
      graph.updateItem(item.id, {
        style: {
          // @ts-ignore
          label: {
            value: 'update icon to home',
          },
          icon: {
            type: 'font',
            fontFamily: 'graphin',
            value: icons.home,
          },
        },
      });
    }
    if (item.id === 'node-3') {
      graph.updateItem(item.id, {
        style: {
          // @ts-ignore
          label: {
            value: 'update halo hidden',
          },
          halo: {
            visible: false,
          },
          status: {
            hover: {
              halo: {
                visible: false,
              },
            },
            selected: {
              halo: {
                visible: false,
              },
            },
          },
        },
      });
    }
    if (item.id === 'node-4') {
      graph.updateItem(item.id, {
        style: {
          // @ts-ignore
          label: {
            value: 'update badges',
          },
          badges: [
            {
              position: 'RT',
              type: 'text',
              value: Math.round(Math.random() * 100),
              size: [20, 20],
              color: '#fff',
              fill: 'red',
              fillOpacity: 0.6,
            },
          ],
        },
      });
    }
  };
  return (
    <ContextMenu bindType="node">
      <Menu bindType="node" options={[{ name: 'update' }]} onChange={handleChange} />
    </ContextMenu>
  );
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <UpdateNode />
      </Graphin>
    </div>
  );
};
