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
  options: LegendOption[];
  onChange?: (checked: LegendOption, newOptions: LegendOption[], props: any) => any; // eslint-disable-line
}

const Legend: React.FunctionComponent<LegendProps> = (props) => {
  const { onChange = () => {}, options: originalOptions } = props;
  // eslint-disable-next-line react/destructuring-assignment

  const mergedOptions: { (options: LegendOption[]): LegendOption[] } = (options) =>
    options.map((c) => {
      const { checked } = c;
      return {
        ...c,
        checked: typeof checked === 'boolean' ? checked : true,
      };
    });
  const [options, setOptions] = React.useState(mergedOptions(originalOptions));

  useEffect(() => setOptions(mergedOptions(originalOptions)), [originalOptions]);

  const handleClick = (option: LegendOption) => {
    const checkedValue = { ...option, checked: !option.checked };
    const result = options.map((c) => {
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
          <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            key={option.value}
            onClick={() => {
              handleClick(option);
            }}
            className="item"
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

export default Legend;
