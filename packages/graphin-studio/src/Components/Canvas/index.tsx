import Graphin from '@antv/graphin';
import { Tooltip } from '@antv/graphin-components';
import { upperCase } from 'lodash-es';
import * as React from 'react';
import { useSelector } from 'react-redux';
import './index.less';

interface CanvasProps {}

const VisibleComponent = ({ visible, children }) => {
  if (visible) {
    return <>{children}</>;
  }
  return null;
};

const transform = data => {
  const nodes = data.nodes.map(node => {
    return {
      id: node.id,
      data: node,
      type: 'graphin-circle',
    };
  });
  const edges = data.edges.map(edge => {
    return {
      source: edge.source,
      target: edge.target,
      data: edge,
    };
  });
  return {
    nodes,
    edges,
  };
};
const Canvas: React.FunctionComponent<CanvasProps> = props => {
  const state = useSelector(state => state);
  const { data, layout, tooltip } = state;

  const transData = transform(data);
  return (
    <Graphin data={transData} layout={layout} theme={{ mode: 'light' }}>
      <VisibleComponent visible={tooltip.visible}>
        <Tooltip placement={tooltip.placement} hasArrow={tooltip.hasArrow}>
          <Tooltip.Node>
            {model => {
              return (
                <div>
                  <ul className="tooltip-content">
                    {tooltip.keys.map((key: string) => {
                      return (
                        <li key={key}>
                          {upperCase(key)} : {model.data[key]}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }}
          </Tooltip.Node>
        </Tooltip>
      </VisibleComponent>
    </Graphin>
  );
};

export default Canvas;
