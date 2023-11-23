/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ContextMenuValue } from '@antv/graphin';
import Graphin, { Components, Utils } from '@antv/graphin';
import { Menu } from 'antd';
import React from 'react';

const { Hull, ContextMenu } = Components;

const Demo = () => {
  const [hullOptions, setOptions] = React.useState([
    {
      members: ['node-1', 'node-2', 'node-9'], // 必须参数
    },
    {
      members: ['node-3', 'node-4'],
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    },
  ]);
  const handleChangeHull = (itemProps: ContextMenuValue) => {
    // @ts-ignore
    const nodes = (itemProps.selectedItems && itemProps.selectedItems.nodes) || [];
    const members = nodes.map((item: any) => {
      return item.get('id');
    }) as string[];

    const newHullOptions = {
      members,
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
    };
    setOptions([
      // @ts-ignore
      ...hullOptions,
      // @ts-ignore
      newHullOptions,
    ]);
  };

  return (
    <div className="App">
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <ContextMenu bindType="canvas">
          {(itemProps: ContextMenuValue) => {
            return (
              <Menu>
                <Menu.Item
                  key="hull"
                  onClick={() => {
                    handleChangeHull(itemProps);
                  }}
                >
                  使用轮廓包裹
                </Menu.Item>
              </Menu>
            );
          }}
        </ContextMenu>
        {/* @ts-ignore */}
        <Hull options={hullOptions} />
      </Graphin>
    </div>
  );
};
export default Demo;
