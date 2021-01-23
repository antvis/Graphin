import { NodeStyle } from '.';
import { ComboStyle, EdgeStyle } from './typings/type';
import hexToRgba from './utils/hexToRgba';

// interface ColorSetType {
//   activeFill: string;
//   activeStroke: string;
//   comboActiveFill: string;
//   comboActiveStroke: string;
//   comboDisableFill: string;
//   comboDisableStroke: string;
//   comboHighlightFill: string;
//   comboHighlightStroke: string;
//   comboInactiveFill: string;
//   comboInactiveStroke: string;
//   comboMainFill: string;
//   comboMainStroke: string;
//   comboSelectedFill: string;
//   comboSelectedStroke: string;
//   disableFill: string;
//   disableStroke: string;
//   edgeActiveStroke: string;
//   edgeDisableStroke: string;
//   edgeHighlightStroke: string;
//   edgeInactiveStroke: string;
//   edgeMainStroke: string;
//   edgeSelectedStroke: string;
//   highlightFill: string;
//   highlightStroke: string;
//   inactiveFill: string;
//   inactiveStroke: string;
//   mainFill: string;
//   mainStroke: string;
//   selectedFill: string;
//   selectedStroke: string;
// }

export const TREE_LAYOUTS = ['dendrogram', 'compactBox', 'mindmap', 'indented'];

export const DEFAULT_THEME = {
  mode: 'light',
  primaryColor: '#269a99', // '#3D76DD',
  nodeSize: 26,
  edgeSize: 1,
  edgePrimaryColor: '#ddd',
  background: '#fff',
};

export interface ThemeType {
  /**
   * @description 模式 light | dark
   * @default light
   */
  mode: 'light' | 'dark';
  /**
   * @description 主要的节点颜色
   * @default #269a99
   */
  primaryColor: string;
  /**
   * @description 节点大小
   * @default 26
   */
  nodeSize: number;
  /**
   * @description 边的大小，即边宽：lindwith
   * @default 0.5
   */
  edgeSize: number;
  /**
   * @description 边的主要颜色
   * @default #ddd
   */
  edgePrimaryColor: string;
  /**
   * @description 画布背景色
   */
  background: string;
}

export const genDefaultNodeStyle = ({
  nodeSize = 26,
  primaryColor = '#FF6A00',
  mode = 'light',
  labelSize = 12,
}: {
  nodeSize: number;
  primaryColor: string;
  mode: 'light' | 'dark';
  labelSize?: number;
}) => {
  const Colors = {
    light: {
      fill: hexToRgba(primaryColor, '0.1'),
      stroke: primaryColor,
      icon: primaryColor,
      badge: {
        fill: primaryColor,
        stroke: primaryColor,
        font: '#fff',
      },
      label: '#000',
      disabled: '#ddd',
    },
    dark: {
      fill: hexToRgba(primaryColor, '0.3'),
      stroke: primaryColor,
      icon: '#fff',
      badge: {
        fill: primaryColor,
        stroke: primaryColor,
        font: '#fff',
      },
      label: '#fff',
      disabled: '#ddd3',
    },
  };

  const Color = Colors[mode];

  const defaultStyle = {
    type: 'graphin-circle',
    style: {
      keyshape: {
        size: [nodeSize, nodeSize],
        fill: Color.fill,
        stroke: Color.stroke,
        lineWidth: 1,
        opacity: 1,
        type: 'circle',
      },
      label: {
        position: 'bottom',
        value: '',
        fill: Color.label,
        fontSize: labelSize,
        offset: 0,
      },
      icon: {
        type: 'text',
        value: '',
        size: nodeSize / 2,
        fill: Color.icon,
        offset: [0, 0],
      },
      badges: [],
      halo: {},
    },
    status: {
      selected: {
        halo: {
          visible: true,
        },
        keyshape: {
          lineWidth: 5,
        },
      },
      hover: {
        halo: {
          visible: true,
        },
      },
      active: {
        halo: {
          visible: true,
        },
      },
      inactive: {
        halo: {
          visible: false,
        },
        keyshape: {
          lineWidth: 0,
          fill: Color.disabled,
          stroke: Color.disabled,
        },
        icon: {
          fill: Color.disabled,
        },
        label: {
          fill: Color.disabled,
        },
      },
    },
  };
  return {
    defaultNodeStyle: { type: defaultStyle.type, style: defaultStyle.style },
    defaultNodeStatusStyle: { status: defaultStyle.status },
  };
};

export const genDefaultEdgeStyle = ({ edgeSize = 1, edgePrimaryColor = '#ddd', mode = 'light' }: ThemeType) => {
  const Colors = {
    light: {
      stroke: edgePrimaryColor,
      label: edgePrimaryColor,
      disabled: '#ddd',
    },
    dark: {
      stroke: edgePrimaryColor,
      label: edgePrimaryColor,
      disabled: '#ddd3',
    },
  };
  const Color = Colors[mode];

  const defaultStyle = {
    type: 'graphin-line',
    style: {
      keyshape: {
        type: 'line',
        lineWidth: edgeSize,
        stroke: Color.stroke,
        opacity: 1,
        lineAppendWidth: 9,
        cursor: 'pointer',
      },
      halo: {
        stroke: Color.stroke,
        opacity: 0.4,
        visible: false,
        cursor: 'pointer',
      },
      label: {
        value: '',
        position: 'top',
        fill: Color.label,
        fontSize: '',
        fontFamily: '',
        textAlign: 'center',
      },
    },
    status: {
      hover: {
        halo: {
          visible: true,
        },
      },
      selected: {
        halo: {
          visible: true,
        },
        keyShape: {
          lineWidth: 2,
        },
      },
      disabled: {
        halo: {
          visible: false,
        },
        keyShape: {
          lineWidth: 0.5,
          stroke: Color.disabled,
        },
      },
    },
  };
  return {
    defaultEdgeStyle: { type: defaultStyle.type, style: defaultStyle.style },
    defaultEdgeStatusStyle: { status: defaultStyle.status },
  };
};

export function genDefaultComboStyle() {
  const defaultStyle = {
    type: 'circle',
    style: {
      labelCfg: {
        position: 'top',
      },
    },
    status: {},
  };
  return {
    defaultComboStyle: { type: defaultStyle.type, style: defaultStyle.style },
    defaultComboStatusStyle: { status: defaultStyle.status },
  };
}

export interface ThemeData extends ThemeType {
  defaultNodeStyle: NodeStyle & { type: string };
  defaultNodeStatusStyle: NodeStyle['status'];
  defaultEdgeStyle: EdgeStyle & { type: string };
  defaultEdgeStatusStyle: EdgeStyle['status'];
  defaultComboStyle: ComboStyle & { type: string };
  defaultComboStatusStyle: ComboStyle['status'];
}

export const getDefaultStyleByTheme = (inputTheme: ThemeType | undefined) => {
  const theme = { ...DEFAULT_THEME, ...inputTheme } as ThemeType;
  const isLight = theme.mode === 'light';
  return {
    ...theme,
    background: isLight ? '#fff' : '#000',
    ...genDefaultNodeStyle(theme),
    ...genDefaultEdgeStyle(theme),
    ...genDefaultComboStyle(),
  };
};
