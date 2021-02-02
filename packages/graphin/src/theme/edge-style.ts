const defaultEdgeTheme = {
  primaryEdgeColor: '#ddd',
  edgeSize: 1,
  mode: 'light',
};

export interface EdgeTheme {
  /** 节点的大小 */
  edgeSize: number;
  /** 主要颜色 */
  primaryEdgeColor: string;
  /** 主题模式： 'light' | 'dark' */
  mode: 'light' | 'dark';
}

const getEdgeStyleByTheme = (inputTheme: EdgeTheme) => {
  const { edgeSize, primaryEdgeColor, mode } = {
    ...defaultEdgeTheme,
    ...inputTheme,
  };

  const Colors = {
    light: {
      stroke: primaryEdgeColor,
      label: primaryEdgeColor,
      disabled: '#ddd',
    },
    dark: {
      stroke: primaryEdgeColor,
      label: primaryEdgeColor,
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
        strokeOpacity: 1,
        lineAppendWidth: 9,
        cursor: 'pointer',
      },
      halo: {
        // stroke: Color.stroke,
        visible: false,
        cursor: 'pointer',
        strokeOpacity: 0.4,
      },
      label: {
        value: '',
        position: 'top',
        fill: Color.label,
        fontSize: 12,
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
  return defaultStyle;
};

export default getEdgeStyleByTheme;
