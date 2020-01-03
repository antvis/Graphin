import Graphin from '../Graphin';
import { ExtendedGraph } from '../types';

const getContainerSize = (el: HTMLDivElement) => {
  const { clientWidth, clientHeight } = el;
  return {
    width: clientWidth,
    height: clientHeight,
  };
};

const handleResize = (graphin: Graphin) => {
  const { graphDOM, graph } = graphin;
  const { width, height } = getContainerSize(graphDOM!);
  graph!.set('width', width);
  graph!.set('height', height);
  const canvas = graph!.get('canvas');
  if (canvas) {
    canvas.changeSize(width, height);
    (graph as ExtendedGraph).autoPaint();
    graphin.setState({
      width,
      height,
    });
  }
};
export default handleResize;
