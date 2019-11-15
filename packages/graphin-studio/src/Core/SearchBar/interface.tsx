import { GrapheneState } from '../../types';

export interface SearchValue {
    [propName: string]: any; // eslint-disable-line
}

export interface ContentProps {
    searchWords: string;
    item: SearchValue;
    highlight: (searchWords: string, str: string) => string;
}

export interface SearchBarContainerBarProps {
    apis?: any; // eslint-disable-line
    dispatch?: (props: any) => any; // eslint-disable-line
    state: GrapheneState;
    graphVars?: { [propName: string]: any }; // eslint-disable-line
}
