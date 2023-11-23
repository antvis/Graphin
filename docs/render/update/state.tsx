import React from 'react';
import Graphin, { Utils, GraphinContext, GraphinData } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import iconLoader from '@antv/graphin-icons';

const icons = Graphin.registerFontFamily(iconLoader);

const layout = {
  type: 'graphin-force',
  preset: {
    type: 'random',
  },
};

type ItemType = 'node' | 'edge' | 'combo';

// TODO：build-in Graphin.Utils
const update = (data: GraphinData, type: ItemType = 'node') => {
  const items = data[`${type}s`];
  return {
    set: (id, model) => {
      const newItems = [];
      items.forEach(item => {
        if (item.id === id) {
          const mergedItem = Utils.deepMix({}, item, model);
          newItems.push(mergedItem);
        } else {
          newItems.push(item);
        }
      });
      return {
        ...data,
        [`${type}s`]: newItems,
      };
    },
  };
};

const UpdateNode = props => {
  const { setData, data } = props;

  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    const handleNodeClick = e => {
      const { id } = e.item.getModel();
      const newData = update(data, 'node').set(id, {
        style: {
          keyshape: {
            size: 40,
          },
          badges: [
            {
              position: 'RT',
              type: 'text',
              value: Math.round(Math.random() * 100),
              size: [20, 20],
              color: '#fff',
              fill: 'red',
            },
          ],
        },
      });
      setData(newData);
    };
    graph.on('node:click', handleNodeClick);
    return () => {
      graph.off('node:click', handleNodeClick);
    };
  }, [setData, data]);
  return null;
};

export default () => {
  const [data, setData] = React.useState(Utils.mock(3).graphin());

  return (
    <div>
      <Graphin data={data} layout={layout}>
        <UpdateNode data={data} setData={setData} />
      </Graphin>
    </div>
  );
};
