import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';

const iconLoader = Graphin.registerFontFamily(IconLoader);
const iconValue = iconLoader.home;
const { ZoomCanvas } = Behaviors;

const defaultIcon = {
  type: 'font',
  /** 根据类型，填写对应的值 */
  value: iconValue,
  /** 图标大小 */
  size: 12,
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: 'green',
  fontFamily: 'graphin',
};
const EventCenter = () => {
  const { graph } = React.useContext(GraphinContext);
  useEffect(() => {
    // graph.on('node:mouseenter', evt => {
    //   graph.setItemState(evt.item, 'hover', true);
    // });

    // graph.on('node:mouseleave', evt => {
    //   graph.setItemState(evt.item, 'hover', false);
    // });

    graph.on('edge:mouseenter', evt => {
      graph.setItemState(evt.item, 'selected', true);
    });

    graph.on('edge:mouseleave', evt => {
      graph.setItemState(evt.item, 'selected', false);
    });
  }, []);

  return null;
};

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

const defaultEdge = {
  style: {
    stroke: '#000',
  },
  status: {
    selected: {
      stroke: '#ff0303a6',
      animation: {
        repeat: true,
      },
    },
  },
};
const defaultNode = {
  type: 'graphin-circle',
  style: {
    keyshape: {
      fill: '#ddd',
      stroke: '#000',
    },
  },
};
const NodeSize = 26;
const defaultNodeStatusStyle = {
  status: {
    selected: {
      keyshape: {
        stroke: '#ff0303a6',
      },
      halo: {
        animate: {
          attrs: ratio => {
            const startR = 20;
            const diff = NodeSize - startR;
            return {
              r: startR + diff * ratio,
              opacity: 0.5 + 0.5 * ratio,
            };
          },
          duration: 200,
          easing: 'easeCubic',
          delay: 0,
          repeat: false,
        },
      },
    },
  },
};

// @ts-ignore
data.nodes[0].style = {
  keyshape: {
    fill: '#ff0303a6',
  },
};

export default () => {
  return (
    <div>
      <Graphin
        data={data}
        layout={layout}
        defaultEdge={defaultEdge}
        defaultNode={defaultNode}
        nodeStateStyles={defaultNodeStatusStyle}
      >
        <ZoomCanvas />
        <EventCenter />
      </Graphin>
    </div>
  );
};
