import { normalizeColor } from './utils';

export const GREY = normalizeColor([30, 32, 45]);
export const EDGE_LINE_DEFAULT_COLOR = normalizeColor([46, 138, 230]);
export const EDGE_LABEL_DEFAULT_COLOR = normalizeColor([222, 255, 240]);
export const HIDDEN_LABEL_COLOR = normalizeColor([238, 238, 238]);
export const HIDDEN_LINE_COLOR = normalizeColor([238, 238, 238]);
export const PRIMARY_NODE_COLOR = normalizeColor([230, 46, 169]);

export const DEFAULT_ICON_FONT_FAMILY = 'graphin';

export enum EnumNodeAndEdgeStatus {
  NORMAL = 'normal',
  SELECTED = 'selected',
  LIGHT = 'highlight.light',
  DARK = 'highlight.dark',
  HOVERED = 'hovered',
}
