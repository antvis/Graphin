import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

const defaultNode = {
  type: 'graphin-circle',
  style: {
    keyshape: {
      fill: '#ddd',
      stroke: '#000',
      size: 26,
    },
  },
};

const defaultNodeStatusStyle = {
  status: {
    hover: {
      keyshape: {
        stroke: '#ff0303a6',
        size: 30,
      },
      halo: {
        animate: {
          attrs: ratio => {
            const startR = 20;
            const diff = 26 - startR;
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

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} defaultNode={defaultNode} nodeStateStyles={defaultNodeStatusStyle}>
        <ZoomCanvas />
      </Graphin>
    </div>
  );
};
