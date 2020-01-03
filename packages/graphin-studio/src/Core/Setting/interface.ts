import { Graph } from '@antv/graphin';
import { GrapheneState, Dispatch } from '../../types';

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
