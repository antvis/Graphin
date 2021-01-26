import React from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';

const { FitView } = Behaviors;
const { Menu } = ContextMenu;

const data = Utils.mock(5).circle().graphin();
const layout = {
  type: 'concentric',
  minNodeSpacing: 50,
};

const UpdateNode = () => {
  const { graph } = React.useContext(GraphinContext);
  const handleChange = (option, item) => {
    console.log(option, item);
    // 方法一：直接更新，不持久化到数据中
    graph.updateItem(item.id, {
      style: {
        // @ts-ignore
        label: {
          value: 'rename',
        },
        keyshape: {
          size: 80,
        },
      },
    });
  };
  return (
    <ContextMenu bindType="node">
      <Menu bindType="node" options={[{ name: 'RENAME' }]} onChange={handleChange} />
    </ContextMenu>
  );
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <FitView />
        <UpdateNode />
      </Graphin>
    </div>
  );
};
