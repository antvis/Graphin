import Graphin, { Behaviors, Utils } from '@antv/graphin';

import React, { useEffect } from 'react';

const { ZoomCanvas, Hoverable } = Behaviors;

const data = Utils.mock(5).circle().graphin();

data.edges = [];

data.nodes[0].style = {
  keyshape: {
    size: 40,
    stroke: 'red',
    fill: 'red',
    fillOpacity: 0.2,
  },
  label: {
    value: '默认的类型：graphin-circle',
  },
  badges: [
    {
      position: 'RT',
      type: 'text',
      value: 8,
      size: [15, 15],
      fill: 'red',
      color: '#fff',
    },
  ],
};

data.nodes[1].style = {
  // 参数参考：https://g6-next.antv.antgroup.com/zh/examples/item/defaultNodes/#radiusRect
  type: 'rect-node',
  keyShape: {
    radius: 4,
  },
  labelShape: {
    text: 'rect-node',
    position: 'bottom',
    maxWidth: '500%',
  },
  labelBackgroundShape: {},
};

data.nodes[2].style = {
  // 配置参数：https://g6-next.antv.antgroup.com/zh/examples/item/defaultNodes/#circle
  type: 'circle-node',
  labelShape: {
    text: 'circle-node',
    position: 'bottom',
    maxWidth: '500%',
  },
  badgeShapes: [
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
  ],
};
data.nodes[3].data = {
  /**
   * 甜甜圈内径在 keyShape 半径的占比，取值为 0-1，默认 0.6
   * The ratio of the inner diameter of the donut to the radius of the keyShape, the value is 0-1
   */
  innerSize: 0.6,
  /**
   * 甜甜圈字段，每个字段必须为 [key: string]: number
   * Donut fields, each field must be [key: string]: number
   */
  donutAttr: {
    income: 80,
    outcome: 40,
    unknown: 45,
  },
  /**
   * 甜甜圈颜色映射，字段名与 attrs 中的字段名对应。不指定则使用默认色板
   * A donut colormap with field names corresponding to those in attrs. If not specified, the default swatch will be used
   */
  donutColorMap: {
    income: '#78D3F8',
    outcome: '#F08BB4',
    unknown: '#65789B',
  },
};
data.nodes[3].style = {
  type: 'donut-node',
  labelShape: {
    text: 'donut-node',
    position: 'bottom',
    maxWidth: '500%',
  },
  iconShape: {
    img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
    width: 20,
    height: 20,
  },
  keyShape: {
    r: 30,
  },
  /** Shapes of donut */
  donutShapes: {
    innerSize: { fields: ['innerSize'], formatter: model => model.data.innerSize },
    attrs: {
      fields: ['donutAttr'],
      formatter: model => model.data.donutAttr,
    },

    colorMap: {
      fields: ['donutColorMap'],
      formatter: model => {
        console.log('model', model);
        return model.data.donutColorMap;
      },
    },
  },
};

data.nodes[4].style = {
  // 配置参数：https://g6-next.antv.antgroup.com/zh/examples/item/defaultNodes/#image
  type: 'image-node',
  keyShape: {
    src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
  },
  labelShape: {
    text: 'image-node',
    position: 'bottom',
    maxWidth: '500%',
  },
};

console.log(data);

const layout = {
  type: 'grid',
};

export default () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
