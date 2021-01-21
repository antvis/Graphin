import { GraphinContext } from '@antv/graphin';
import React, { useEffect } from 'react';
import './index.less';

export interface LegendOption {
  /** 标签 */
  label: string;
  /** 颜色 */
  color: string;
  /** 值 */
  value: string;
  /** 是否选中 */
  checked?: boolean;
}
export interface LegendProps {
  style?: React.CSSProperties;
  onChange?: (checked: LegendOption, newOptions: LegendOption[], props: any) => any; // eslint-disable-line
}

const LegendNode: React.FunctionComponent<LegendProps> = (props) => {
  const {
    legend,
    // apis,
    graph,
  } = React.useContext(GraphinContext);
  // 依然存在两个legend，graphin.context只是一个全局对象
  const { onChange = () => {}, style } = props;

  const { options: defaultOptions, dataMap } = legend.node;
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

  console.log('options', options);

  const handleClick = (option: LegendOption) => {
    const checkedValue = { ...option, checked: !option.checked };
    const result = options.map((c) => {
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

    nodes.forEach((node) => {
      graph.setItemState(node.id, 'active', checkedValue.checked);
      graph.setItemState(node.id, 'inactive', !checkedValue.checked);
    });

    /** 给用户的回调函数 */
    onChange(checkedValue, result, props);
  };
  console.log('%c legend Content', 'color:red');

  return (
    <ul className="graphin-components-legend-content" style={style}>
      {options.map((option: LegendOption) => {
        const { label, checked, color } = option;
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
            <span className="dot" style={{ background: checked ? color : '#ddd' }} />
            <span className="label" style={{ color: checked ? '#000000d9' : '#ddd' }}>
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default LegendNode;
