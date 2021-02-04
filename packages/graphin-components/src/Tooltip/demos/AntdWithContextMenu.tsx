import * as React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
import { Popover, Card } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const nodeSize = 40;
const tooltipStyles = {
  height: `${nodeSize}px`,
  width: `${nodeSize}px`,
  background: 'transparent',
};

const CustomContextMenu = props => {
  console.log(props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { visible, position } = props;
  if (visible) {
    // const { x, y } = position;
    return (
      <div
        style={{
          position: 'absolute',
          left: 0, // x,
          top: 0, // y,
        }}
      >
        <Card title="Card"> contextMenu</Card>
      </div>
    );
  }
  return null;
};
const AntdTooltip = () => {
  const [state, setState] = React.useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const { visible } = state;

  const handleContextMenu = (e: Event) => {
    e.preventDefault();
    setState(preState => {
      return {
        ...preState,
        visible: true,
      };
    });
  };

  const { tooltip } = React.useContext(GraphinContext);
  const context = tooltip.node;
  const { item, x, y } = context;
  const model = item && item.getModel();

  return (
    // @ts-ignore
    <div onContextMenu={handleContextMenu}>
      <Popover placement="topLeft" title={model.id} content={content}>
        <div style={tooltipStyles} />
      </Popover>
      <CustomContextMenu visible={visible} position={{ x, y }} />
    </div>
  );
};

const TooltipDemo: React.FunctionComponent = () => {
  return (
    <div>
      <Graphin data={Utils.mock(10).circle().graphin()}>
        <Tooltip
          bindType="node"
          style={{
            ...tooltipStyles,
            transform: `translate(-${nodeSize / 2}px,-${nodeSize / 2}px)`,
            // 用户只需要将这个颜色去掉即可
            // background: 'red',
          }}
        >
          <AntdTooltip />
        </Tooltip>
      </Graphin>
    </div>
  );
};

export default TooltipDemo;
