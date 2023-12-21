/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { INode } from "@antv/g6"
import { GraphinContext } from '../../index';
import './index.less';
import type { LegendChildrenProps, OptionType } from './typing';

const LegendNode: React.FunctionComponent<LegendChildrenProps> = props => {
  const { graph, theme } = React.useContext(GraphinContext);

  const { options: defaultOptions, dataMap, onChange } = props;

  const { mode } = theme;

  const [state, setState] = React.useState({
    options: defaultOptions,
  });

  /** 更新state依赖 */
  useEffect(() => {
    setState({
      options: defaultOptions,
    });
  }, [defaultOptions]);

  const { options } = state;

  const handleClick = (option: OptionType) => {
    const checkedValue = { ...option, checked: !option.checked };
    const result = options.map((c: any) => {
      const matched = c.value === option.value;
      return matched ? checkedValue : c;
    });
    setState({
      options: result,
    });
    const nodes = dataMap.get(checkedValue.value);

    /** highlight */
    // const nodesId = nodes.map((c) => c.id);
    // apis.highlightNodeById(nodesId);


    // @ts-ignore
    nodes.forEach((node: any) => {
      graph.setItemState(node.id, 'active', checkedValue.checked);
      graph.setItemState(node.id, 'inactive', !checkedValue.checked);
      const { id } = node;
      const item = graph.findById(id) as INode;
      if (item.getType() !== 'node') {
        return;
      }
      const edges = item.getEdges();
      edges.forEach(edge => {
        graph.setItemState(edge, 'normal', checkedValue.checked);
        graph.setItemState(edge, 'inactive', !checkedValue.checked);
      })
    });

    onChange(checkedValue, result);
  };

  return (
    <ul className="graphin-components-legend-content">
      {options.map((option: OptionType) => {
        const { label, checked, color } = option;
        const dotColors = {
          light: {
            active: color,
            inactive: '#ddd',
          },
          dark: {
            active: color,
            inactive: '#2f2f2f',
          },
        };
        const labelColor = {
          light: {
            active: '#000',
            inactive: '#ddd',
          },
          dark: {
            active: '#fff',
            inactive: '#2f2f2f',
          },
        };
        const status = checked ? 'active' : 'inactive';

        return (
          <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            key={option.value}
            className="item"
            onClick={() => {
              handleClick(option);
            }}
            onKeyDown={() => {
              handleClick(option);
            }}
          >
            <span className="dot" style={{ background: dotColors[mode][status] }} />
            <span className="label" style={{ color: labelColor[mode][status] }}>
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default LegendNode;
