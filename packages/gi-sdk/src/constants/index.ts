import { WidgetItem } from '../types';

export const BASIC_WIDGETS: WidgetItem[] = [
  {
    name: 'Interaction',
    solt: 'canvas',
  },
  {
    name: 'Toolbar',
    solt: 'canvas',
  },
  {
    name: 'Minimap',
    solt: 'canvas',
  },
  {
    name: 'ContextMenu',
    solt: 'canvas',
  },
];

export const PATH_PREFIX = {
  widgets: 'application.spec.widgets',
  graph: 'application.spec.graph',
};

export const PREFIX = 'gi';
export const HEADER_HEIGHT = 48;
export const SIDER_WIDTH = 354;
