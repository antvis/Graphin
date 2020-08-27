import { Graph } from '@antv/g6';
import { MenuStyle } from './use-context-menu';
import { G6Event, Canvas } from './types';

interface Position {
  x: number;
  y: number;
}

interface CanvasBox {
  canvasWidth: number;
  canvasHeight: number;
}

interface MenuBox {
  menuWidth: number;
  menuHeight: number;
}

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

const getItemPosition = (graph: Graph, e: G6Event, menuItem: MenuStyle) => {
  const { maxY, minX } = e.item.getBBox(); // eslint-disable-line
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCanvasPosition = (_graph: Graph, e: G6Event, _menuItem: MenuStyle) => {
  return {
    x: e.x,
    y: e.y,
  };
};

const getPosition = (graph: Graph, e: G6Event, menuItem: MenuStyle): Position => {
  if (e.item) return getItemPosition(graph, e, menuItem);
  return getCanvasPosition(graph, e, menuItem);
};

export default getPosition;
