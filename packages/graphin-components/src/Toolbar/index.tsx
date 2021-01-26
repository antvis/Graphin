import React, { useEffect } from 'react';
import * as Graphin from '@antv/graphin';
import ToolBarContent from './content';

const { GraphinContext } = Graphin;

interface IG6GraphEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const defaultStyle: React.CSSProperties = {
  width: 200,
  background: '#fff',
};

interface ToolBarProps {
  children: React.ReactChildren | JSX.Element;
  style?: React.CSSProperties;
  direction?: 'vertical' | 'horizontal';
  x?: number;
  y?: number;
}

interface State {
  /** 当前状态 */
  direction?: 'vertical' | 'horizontal';
  x: number;
  y: number;
}

let containerRef: HTMLDivElement | null;

const ToolBar: React.FunctionComponent<ToolBarProps> & { ToolBarContent: typeof ToolBarContent } = props => {
  const { children, style, direction = 'horizontal', x = 0, y = 0 } = props;
  const graphin = React.useContext(GraphinContext);
  const { graph } = graphin;

  const [state, setState] = React.useState<State>({
    direction: 'horizontal',
    x,
    y,
  });

  const { x: stateX, y: stateY } = state;

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    left: stateX,
    top: stateY,
  };

  /** 将一些方法和数据传递给子组件 */
  graphin.toolbar = {
    ...graphin.toolbar,
  };

  return (
    <>
      <div
        ref={node => {
          containerRef = node;
        }}
        className="graphin-components-toolbar"
        style={{ ...defaultStyle, ...style, ...positionStyle }}
        key="graphin-components-toolbar"
      >
        {children}
      </div>
    </>
  );
};

ToolBar.ToolBarContent = ToolBarContent;

export default ToolBar;
