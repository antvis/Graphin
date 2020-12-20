import * as React from 'react';
import GraphinContext from './GraphinContext';
import { debounce } from '@antv/util';

interface Props {
  graphDOM: HTMLDivElement;
}
const Events: React.FunctionComponent<Props> = props => {
  const { graphDOM } = props;
  const graphin = React.useContext(GraphinContext);
  React.useEffect(() => {
    console.log('%c build-in events', 'color:lightgreen');
    const { graph } = graphin;

    /** 内置 resize */
    const handleResizeEvent = debounce(() => {
      const { clientWidth, clientHeight } = graphDOM;
      graph.set('width', clientWidth);
      graph.set('height', clientHeight);
      const canvas = graph.get('canvas');
      if (canvas) {
        canvas.changeSize(clientWidth, clientHeight);
        graph.autoPaint();
      }
    }, 200);

    /** 内置 drag force node */

    window.addEventListener('resize', handleResizeEvent, false);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, false);
    };
  }, []);

  return null;
};

export default Events;
