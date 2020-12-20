import TreeCollapse from './TreeCollapse';
import DragCanvas from './DragCanvas';
import ZoomCanvas from './ZoomCanvas';

const Behaviors: {
  TreeCollapse: typeof TreeCollapse;
  DragCanvas: typeof DragCanvas;
  ZoomCanvas: typeof ZoomCanvas;
} = {
  TreeCollapse,
  DragCanvas,
  ZoomCanvas,
};

export default Behaviors;
