import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
interface IDemoProps {}

const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);
const iconIndex = ['home', 'company', 'eye', 'user', 'circle', 'plus'];
Graphin.registerNode('custom-node', {
  draw(cfg, group) {
    const { icon } = cfg.style;
    const keyshape = group.addShape('circle', {
      attrs: {
        id: 'circle-floor',
        x: 0,
        y: 0,
        r: 20,
        stroke: 'red',
        strokeWidth: 4,
      },
      draggable: true,
    });
    const text = group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fontSize: 20,
        fill: 'red',
        text: icons[icon],
        fontFamily,
        textAlign: 'center',
        textBaseline: 'middle',
        cursor: 'pointer',
      },
      draggable: true,
      name: 'text',
    });
    return keyshape;
  },
});

const data = Utils.mock(10)
  .random()
  .graphin();
data.nodes.forEach((node, index) => {
  node.type = 'custom-node';
  node.shape = 'custom-node';
  node.style = {
    ...node.style,
    icon: iconIndex[index] || 'home',
  };
});
data.edges = [];

console.log('icons', icons.home, data);
const Demo: React.FunctionComponent<IDemoProps> = props => {
  return (
    <div>
      <Graphin data={data} layout={{ type: 'grid' }}></Graphin>
    </div>
  );
};

export default Demo;
