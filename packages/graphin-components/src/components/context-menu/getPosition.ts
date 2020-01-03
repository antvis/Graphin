import { Graph } from '@antv/g6';
import { MenuStyle } from './useContextmenu';
import { G6Event, Canvas } from './types';

type Position = {
  x: number;
  y: number;
};

type CanvasBox = {
  canvasWidth: number;
  canvasHeight: number;
};

type MenuBox = {
  menuWidth: number;
  menuHeight: number;
};

const calculate = (
  position: Position,
  { canvasBox, menuBox }: { canvasBox: CanvasBox; menuBox: MenuBox },
): Position => {
  const { menuWidth, menuHeight } = menuBox;
  const { canvasWidth, canvasHeight } = canvasBox;
  let { x, y } = position;
  if (menuHeight + y > canvasHeight) {
    y -= menuHeight;
  }
  if (menuWidth + x > canvasWidth) {
    x -= menuWidth;
  }

  return {
    x,
    y,
  };
};

const getPosition = (graph: Graph, e: G6Event, menuItem: MenuStyle): Position => {
  // FIXME G6 getBBox 类型不正确
  const { maxY, minX } = e.item.getBBox() as any; // eslint-disable-line
  const canvasXY = graph.getCanvasByPoint(minX, maxY);
  const canvas = graph.get('canvas') as Canvas;

  const menuBox = {
    menuWidth: menuItem.width,
    menuHeight: menuItem.height,
  };
  const canvasBox = {
    canvasWidth: canvas.get('width') as number,
    canvasHeight: canvas.get('height') as number,
  };
  const { x, y } = calculate(canvasXY, { menuBox, canvasBox });
  return {
    x,
    y,
  };
};

export default getPosition;
