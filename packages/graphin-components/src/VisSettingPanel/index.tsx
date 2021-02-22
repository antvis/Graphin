import React from 'react';
import { GraphinContext, NodeStyle } from '@antv/graphin';

interface VisSettingPanelPropsType {
  style?: React.CSSProperties;
}

const boxShadow =
  '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)';
const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  bottom: '0px',
  boxShadow,
  background: '#fff',
  overflowY: 'scroll',
};

const VisSettingPanel: React.FunctionComponent<VisSettingPanelPropsType> = props => {
  const graphin = React.useContext(GraphinContext);

  const { graph } = graphin;
  const { style, children } = props;
  const item = graph.findAllByState('node', 'selected')[0] || graph.getNodes()[0];
  const nodeSchema = item.getModel().style as NodeStyle;
  const handleNodeStyleChange = schema => {
    const selectedNodes = graph.findAllByState('node', 'selected');
    if (selectedNodes.length === 0) {
      // 则认为是全局样式改变
      graph.getNodes().forEach(node => {
        /** 状态有优先级 */
        graph.clearItemStates(node);
        graph.updateItem(node, {
          style: {
            ...schema,
          },
        });
      });
    }

    selectedNodes.forEach(node => {
      graph.updateItem(node, {
        style: {
          ...schema,
        },
      });
      graph.setItemState(node, 'selected', false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node as any).getEdges().forEach(edge => {
        graph.setItemState(edge, 'selected', false);
      });
    });
  };

  graphin.visSettingPanel = {
    nodeStyleSchema: nodeSchema,
    handleNodeStyleChange,
  };

  return <div style={{ ...defaultStyle, ...style }}>{children}</div>;
};

export default VisSettingPanel;
