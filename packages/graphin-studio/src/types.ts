import { Graph } from '@antv/graphin';

export interface NodeLayoutType {
    /** 节点度数 */
    degree?: number;
    /** 力导布局 */
    force?: {
        mass?: number;
    };
    /** 同心圆布局 */
    concentric?: {
        outerR?: number;
        center: {
            x: number;
            y: number;
        };
        theta: number;
    };
}
export interface Node {
    /** 节点源数据 */
    data: {
        /** 唯一标示ID，必选 */
        id: string;
        /** 节点数据类型 */
        type?: string;
        /** 节点文本 */
        label?: string;
        /** 节点属性 */
        properties?: { [key: string]: any }[]; // eslint-disable-line
    };
    /** 唯一标示ID，必选 */
    id: string;
    /** 节点类型 */
    shape?: string;
    /** 节点样式 */
    style?: object;
    /** 节点位置信息 */
    x?: number;
    y?: number;
    /** 内置的布局，追加的额外属性 */
    layout?: NodeLayoutType;
    /** 节点度数 */
    degree?: number;
}

export interface Edge {
    /** 边的数据，必选 */
    data: {
        /** 边的属性 */
        properties?: object[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    /** 边的源节点，必选 */
    source: string;
    /** 边的目标节点，必选 */
    target: string;
    /** 边的类型 */
    shape?: string;

    /** 边的文本 */
    label?: string;
    /** 边的样式 */
    style?: object;
    id?: string;
    /** 边的弹簧长度，力导时使用 */
    spring?: number;
}

export type NodeData = Node['data'];
export type EdgeData = Edge['data'];
export interface NodeModel {
    id: string;
    data: NodeData;
    shapeComponent: {};
    layout: {};
    x?: number;
    y?: number;
    [key: string]: any; // eslint-disable-line
}

export interface EdgeModel {
    data: EdgeData;
    source: string;
    target: string;
    [key: string]: any; // eslint-disable-line
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
}
export interface Layout {
    name: string;
    options?: any; // eslint-disable-line
}

export interface Diffuse {
    start: object[];
    data: GraphData;
}

export interface DrawerProps {
    title?: string;
    type?: string;
    visible: boolean;
    width?: number;
    closeMask?: boolean;
}
export interface ModalProps {
    visible: boolean;
    title?: string;
    type?: string;
    handleOk?: () => void;
}

export interface SearchBarProps {
    visible: boolean;
}

export interface ToolBarProps {
    direction: 'horizontal' | 'vertical';
}

export interface GrapheneState {
    data: GraphData;
    layout: Layout;

    drawer: DrawerProps;
    modal: ModalProps;
    searchBar: SearchBarProps;
    selectedNodes: NodeData[];
    toolbar: ToolBarProps;
    theme: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    graphRef: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        current: any;
    };
}

export interface GraphProps {
    /** 存储整个项目的state状态 */
    store: GrapheneState;
    /** 数据 */
    data: GrapheneState['data'];
    /** 布局 */
    layout: GrapheneState['layout'];
    /** Toolbar工具参数 */
    toolbar: GrapheneState['toolbar'];
    /** 全局的dispatch触发函数 */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: any;
}

export interface GrapheneProps {
    apis: object;
    graph: Graph;
    graphDOM: HTMLDivElement | null;
    graphVars: object;
    handleClose: () => void;
    render: () => void;
}

export interface Dispatch {
    <T>(option: { type: string; payload: T }): void;
}

export interface RenderToolbarProps {
    apis: {
        getInfo: () => {
            layouts: {
                desc: string;
                name: string;
                icon: string;
            }[];
            count: {
                nodes: number;
                edges: number;
            };
        };
        [key: string]: any; // eslint-disable-line
    };
    direction: string;
    graph: Graph;
    graphVars: object;
    toolbarCfg: object[];
}
