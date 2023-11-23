import { debounce } from 'lodash-es';
import * as React from 'react';
import { GraphinContext } from '../useGraphin';

export interface ResizeCanvasProps {
  graphDOM: HTMLDivElement;
}

const ResizeCanvas: React.FunctionComponent<ResizeCanvasProps> = props => {
  const { graphDOM } = props;
  const graphin = React.useContext(GraphinContext);
  React.useEffect(() => {
    const { graph } = graphin;

    /** 内置 resize */
    const handleResizeEvent = debounce(() => {
      const { clientWidth, clientHeight } = graphDOM;
      graph.set('width', clientWidth);
      graph.set('height', clientHeight);
      const canvas = graph.get('canvas');
      if (canvas) {
        canvas.changeSize(clientWidth, clientHeight);
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

export default ResizeCanvas;
