import Graphin, { Behaviors, registerIconFonts } from '@antv/graphin';

import React from 'react';

const icons = registerIconFonts();

const { ZoomCanvas, Hoverable } = Behaviors;

const data = {
  nodes: [
    {
      id: 'circle',
      data: {},
    },
    {
      id: 'circle-active',
      data: {},
    },
    {
      id: 'circle-selected',
      data: {},
    },

    {
      id: 'circle-highlight',
      data: {},
    },
    {
      id: 'circle-inactive',
      data: {},
    },
    {
      id: 'circle-badges',
      data: {},
    },
    {
      id: 'circle-anchorShapes',
      data: {},
    },
  ],
};

console.log(data);

const layout = {
  type: 'grid',
};

const nodeMapper = model => {
  const { id, data } = model;

  const config = {
    id,
    data: {
      ...data,
      type: 'circle-node',
      labelShape: {
        text: id,
        position: 'bottom',
        maxWidth: '500%',
      },
      labelBackgroundShape: {},
      iconShape: {
        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      },
      animates: {
        update: [
          {
            fields: ['opacity'],
            shapeId: 'haloShape',
            states: ['selected', 'active'],
          },
          {
            fields: ['lineWidth'],
            shapeId: 'keyShape',
            states: ['selected', 'active'],
          },
        ],
      },
    },
  };
  if (id.includes('badges')) {
    config.data.badgeShapes = [
      {
        text: 'A',
        position: 'rightTop',
      },
      {
        text: 'Important',
        position: 'right',
      },
      {
        text: 'Notice',
        position: 'rightBottom',
      },
    ];
  }
  if (id.includes('anchorShapes')) {
    config.data.anchorShapes = [
      {
        position: [0, 0.5],
      },
      {
        position: [0.5, 0],
      },
      {
        position: [0.5, 1],
      },
      {
        position: [1, 0.5],
      },
    ];
  }
  return config;
};
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} node={nodeMapper}></Graphin>
    </div>
  );
};
