import { WidgetItem } from '../types';

export const BASIC_WIDGETS: WidgetItem[] = [
  {
    name: 'ClickSelect',
    solt: 'canvas',
  },
  {
    name: 'BrushSelect',
    solt: 'canvas',
  },
  {
    name: 'ClickNode',
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
export const LANGUAGE_LIST = [
  {
    value: 'zh-CN',
    label: '中文',
  },
  {
    value: 'en-US',
    label: 'English',
  },
];
