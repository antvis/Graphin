import ActivateRelations from './ActivateRelations';
import BrushSelect from './BrushSelect';
import ClickSelect from './ClickSelect';
import DragCanvas from './DragCanvas';
import DragCombo from './DragCombo';
import DragNode from './DragNode';
import Hoverable from './Hoverable';
import LassoSelect from './LassoSelect';
import OrbitCanvas3D from './OrbitCanvas3D';
import ResizeCanvas from './ResizeCanvas';
import ZoomCanvas from './ZoomCanvas';
import ZoomCanvas3D from './ZoomCanvas3D';
export default {
  /** 内置 */
  DragCanvas,
  ZoomCanvas,
  ClickSelect,
  BrushSelect,
  DragNode,
  ResizeCanvas,
  LassoSelect,
  DragCombo,

  /** 可选 */
  ActivateRelations,
  Hoverable,
  ZoomCanvas3D,
  OrbitCanvas3D,
};
export { default as registerBehavior } from './registerBehavior';
export { default as useBehaviorHook } from './useBehaviorHook';
