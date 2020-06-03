import { Item } from '@antv/g6/lib/types';

/** G6 没有暴露这个类型 */
export interface G6Event extends MouseEvent {
  item: Item;
  target: Event['target'];
  action?: string;
}

type CanvasKey = keyof Canvas;

export interface Canvas {
  get(key: CanvasKey): Canvas[CanvasKey];
  width: number;
  height: number;
}
