import Graphin from './Graphin';
export { default as Compatible } from './compatible';
export { default as Components } from './components';
export * as Utils from './utils';
export type GraphinData = any;

export type EdgeStyle = any;
export type IUserNode = any;
export type Layout = any;
export type IUserEdge = any;
export type ContextMenuValue = any;

export type GraphData = any;
export type NodeConfig = any;

export { Extensions, Graph, extend } from '@antv/g6';
export type { IG6GraphEvent, IGraph } from '@antv/g6';

export { GraphinContext, useGraphin } from './useGraphin';
export type { GraphinContextType } from './useGraphin';

export const registerNode = () => {};
//@ts-ignore
export const registerEdge = () => {};

export { registerFontFamily } from './icon/registerFontFamily';
export { getFontIcons, registerIconFonts } from './icon/registerIconFonts';

export { default as Behaviors, registerBehavior, useBehaviorHook } from './behaviors';

export default Graphin;
