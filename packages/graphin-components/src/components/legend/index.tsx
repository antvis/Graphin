import React from 'react';
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
  options: LegendOption[];
  onChange?: (checked: LegendOption, newOptions: LegendOption[], props: any) => any;
}

const Legend: React.FunctionComponent<LegendProps> = props => {
  const { onChange = () => {} } = props;
  const mergedOptions = props.options.map(c => {
    const { checked } = c;
    return {
      ...c,
      checked: typeof checked === 'boolean' ? checked : true,
    };
  });
  const [options, setOptions] = React.useState(mergedOptions);

  const handleClick = (option: LegendOption) => {
    const checkedValue = { ...option, checked: !option.checked };
    const result = options.map(c => {
      const matched = c.value === option.value;
      return matched ? checkedValue : c;
    });
    setOptions(result);
    onChange(checkedValue, result, props);
  };

  return (
    <ul className="graphin-components-legend">
      {options.map((option: LegendOption) => {
        const { label, checked, color } = option;
        return (
          <li
            key={option.value}
            onClick={() => {
              handleClick(option);
            }}
            className="item"
          >
            <span className="dot" style={{ background: checked ? color : '#ddd' }}></span>
            <span className="label" style={{ color: checked ? '#000000d9' : '#ddd' }}>
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Legend;
