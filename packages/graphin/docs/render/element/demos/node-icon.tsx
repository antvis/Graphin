import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';

const { FontPaint } = Behaviors;

const icons = Graphin.registerFontFamily(IconLoader);

const data = Utils.mock(5)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

data.nodes.forEach(node => {
  node.style = {
    icon: {
      fontFamily: 'graphin',
      type: 'font',
      value: icons.home,
    },
  };
});

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <FontPaint />
      </Graphin>
    </div>
  );
};
