/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const defaultContext = {
  visible: false,
  x: 0,
  y: 0,
  bindType: 'node',
};
export interface IG6GraphEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface ContextMenuContextType {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: IG6GraphEvent['item'];
  bindType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// @ts-ignore
const ContextMenuContext: React.Context<ContextMenuContextType> = React.createContext(defaultContext as ContextMenuContextType);

export default ContextMenuContext;

