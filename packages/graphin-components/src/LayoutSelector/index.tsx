// import * as Graphin from '@antv/graphin';
import React from 'react';

export interface LayoutItem {
  component: React.ReactNode;
  key: string;
  label: string;
  labelZh: string;
  description?: string;
  defaultValue?: string | boolean | number[] | number | null;
  options?: {
    label: string | null;
    value: string | null;
  }[];
  isSwitch?: boolean;
  inputLabel?: string[];
  max?: number;
  min?: number;
  size?: string;
  step?: number;
  isPx?: boolean;
}
export interface LayoutConfig {
  title: string;
  type: string;
  icon?: React.ReactNode;
  items: LayoutItem[];
}

interface LayoutSelectorProps {
  layoutConfig?: {
    [key: string]: LayoutConfig[];
  };
  /**
   * @description 可以放置自定义组件
   */
  children?: React.ReactChildren | JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}

const LayoutConfigPanel: React.FC<LayoutSelectorProps> = ({ style, children }) => {
  // const graphin = useContext(Graphin.GraphinContext)

  // graphin.layoutSeletor = {
  //   ...graphin.layoutSeletor
  // }
  return (
    <div className="graphin-components-layoutselector" style={style}>
      {children}
    </div>
  );
};

export default LayoutConfigPanel;
