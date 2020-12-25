import * as React from 'react';
import Graphin from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
interface IDemoProps {}

const icons = Graphin.registerFontFamily(iconLoader);

console.log('icons', icons.home);

const Demo: React.FunctionComponent<IDemoProps> = props => {
  return <div></div>;
};

export default Demo;
