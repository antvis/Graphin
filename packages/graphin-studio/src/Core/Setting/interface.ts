import { Graph } from '@antv/g6';
import { GrapheneState, Dispatch } from '@types';

export interface SettingProps {
  state: GrapheneState;
  dispatch: Dispatch;
  graph?: Graph;
}

export interface ThemeProps {
  dispatch: Dispatch;
  state: GrapheneState;
}

export interface ToolbarConfigProps {
  dispatch: Dispatch;
  state: GrapheneState;
}
