// const defaultComboTheme = {
//   primaryComboColor: '#FF6A00',
//   comboSize: 20,
//   mode: 'light',
// };

export interface ComboTheme {
  /** 节点的大小 */
  comboSize: number;
  /** 主要颜色 */
  primaryComboColor: string;
  /** 主题模式： 'light' | 'dark' */
  mode: 'light' | 'dark';
}

const getComboStyleByTheme = () =>
  // inputTheme: ComboTheme
  {
    // const { comboSize, primaryComboColor, mode } = {
    //   ...defaultEdgeTheme,
    //   ...inputTheme,
    // };

    // const Colors = {
    //   light: {
    //     stroke: primaryComboColor,
    //     label: primaryComboColor,
    //     disabled: '#ddd',
    //   },
    //   dark: {
    //     stroke: primaryComboColor,
    //     label: primaryComboColor,
    //     disabled: '#ddd3',
    //   },
    // };
    // const Color = Colors[mode];

    const defaultStyle = {
      type: 'circle',
      style: {
        labelCfg: {
          position: 'top',
        },
      },
      status: {},
    };
    return defaultStyle;
  };

export default getComboStyleByTheme;
