import hexToRgba, { hexToRgbaToHex } from './utils/hexToRgba';
import G6 from '@antv/g6';

interface ColorSetType {
  activeFill: string;
  activeStroke: string;
  comboActiveFill: string;
  comboActiveStroke: string;
  comboDisableFill: string;
  comboDisableStroke: string;
  comboHighlightFill: string;
  comboHighlightStroke: string;
  comboInactiveFill: string;
  comboInactiveStroke: string;
  comboMainFill: string;
  comboMainStroke: string;
  comboSelectedFill: string;
  comboSelectedStroke: string;
  disableFill: string;
  disableStroke: string;
  edgeActiveStroke: string;
  edgeDisableStroke: string;
  edgeHighlightStroke: string;
  edgeInactiveStroke: string;
  edgeMainStroke: string;
  edgeSelectedStroke: string;
  highlightFill: string;
  highlightStroke: string;
  inactiveFill: string;
  inactiveStroke: string;
  mainFill: string;
  mainStroke: string;
  selectedFill: string;
  selectedStroke: string;
}

export const TREE_LAYOUTS = ['dendrogram', 'compactBox', 'mindmap', 'indented'];

export const DEFAULT_THEME = {
  mode: 'light',
  primaryColor: '#269a99', // '#3D76DD',
  nodeSize: 26,
  edgeSize: 1,
  edgePrimaryColor: '#ddd',
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
          visible: true,
        },
      },
    },
  };
  return {
    defaultNodeStyle: { type: defaultStyle.type, style: defaultStyle.style },
    defaultNodeStatusStyle: { status: defaultStyle.status },
  };
};

export const genDefaultEdgeStyle = ({ edgeSize = 0.1, edgePrimaryColor = '#ddd', mode = 'light' }: ThemeType) => {
  const Colors = {
    light: {
      stroke: edgePrimaryColor,
      label: edgePrimaryColor,
    },
    dark: {
      stroke: edgePrimaryColor,
      label: edgePrimaryColor,
    },
  };
  const Color = Colors[mode];
  const defaultStyle = {
    type: 'graphin-line',
    style: {
      stroke: Color.stroke,
      lineWidth: edgeSize,
      opacity: 0.9,
      labelCfg: {
        fill: Color.label,
        fontSize: 12,
      },
    },
    status: {
      selected: {
        stroke: 'red',
        animation: {
          repeat: true,
        },
      },
      hover: {
        stroke: '#ddd',
      },
    },
  };
  return {
    defaultEdgeStyle: { type: defaultStyle.type, style: defaultStyle.style },
    defaultEdgeStatusStyle: { status: defaultStyle.status },
  };
};

export const getDefaultStyleByTheme = (inputTheme: ThemeType) => {
  const theme = { ...DEFAULT_THEME, ...inputTheme };
  const { mode, primaryColor, nodeSize } = theme;
  const isLight = mode === 'light';
  // const darkBackColor = '#5F95FF';
  // const disableColor = '#777';
  // const lightColorSet = G6.Util.getColorSetsBySubjectColors(
  //   [primaryColor],
  //   darkBackColor,
  //   'light',
  //   disableColor,
  // )[0] as ColorSetType;
  // const darkColorSet = G6.Util.getColorSetsBySubjectColors(
  //   [primaryColor],
  //   darkBackColor,
  //   'dark',
  //   disableColor,
  // )[0] as ColorSetType;
  // console.log(lightColorSet, darkColorSet);

  const defaultCombo = {
    type: 'circle',
    labelCfg: {
      position: 'top',
    },
  };

  if (isLight) {
    return {
      primaryColor,
      nodeSize,
      mode: 'light',
      background: '#fff',
      ...genDefaultNodeStyle(theme),
      ...genDefaultEdgeStyle(theme),
      defaultCombo,
    };
  }
  // dark
  return {
    primaryColor,
    nodeSize,
    mode: 'dark',
    background: '#000',
    ...genDefaultNodeStyle(theme),
    ...genDefaultEdgeStyle(theme),
    defaultCombo,
  };
};
