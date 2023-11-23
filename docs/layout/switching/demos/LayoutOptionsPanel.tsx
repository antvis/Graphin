import * as React from 'react';
import { Option } from './network-layouts';
import { Slider, Switch, Row, Col, InputNumber, Select } from 'antd';

interface LayoutOptionsPanelProps {
  options: Option[];
  /** 布局类型 */
  type: string;
  /** 回调函数 */
  handleChange: (type: string, options: unknown) => void;
}

const getAntdComponent = (option: Option, props) => {
  const { onChange, value } = props;

  const { min = 0, max = 500, component, key, enums, step = 1 } = option;

  if (component === 'slider') {
    return {
      component: Slider,
      props: {
        min,
        max,
        onChange: val => {
          onChange(key, val);
        },
        value,
        step,
      },
    };
  }
  if (component === 'input') {
    return {
      component: InputNumber,
      props: {
        onChange: val => {
          onChange(key, val);
        },
        value,
      },
    };
  }
  if (component === 'switch') {
    return {
      component: Switch,
      props: {
        onChange: checked => {
          onChange(key, checked);
        },
        checked: value,
        step: 0.01,
      },
    };
  }
  if (component === 'select') {
    return {
      component: Select,
      props: {
        options: enums,
        onChange: checked => {
          onChange(key, checked);
        },
      },
    };
  }
  if (component === 'text') {
    return {
      component: () => <span>暂时无配置信息</span>,
      props: {},
    };
  }
};

const dumpOptions: Option[] = [
  {
    key: 'work-in-progress',
    component: 'text',
    title: 'WIP',
    defaultValue: '',
  },
];
const LayoutOptionsPanel: React.FunctionComponent<LayoutOptionsPanelProps> = props => {
  const { options: OPTIONS = dumpOptions, type, handleChange } = props;

  const [options, setOptions] = React.useState({});
  const defaultOptions = OPTIONS.map(c => {
    const { key, defaultValue } = c;
    return { [key]: defaultValue };
  }).reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
    };
  }, {});

  const onChange = (key, val) => {
    const newOptions = {
      ...defaultOptions,
      ...options,
      [key]: val,
    };
    setOptions(newOptions);
    if (handleChange) {
      handleChange(type, newOptions);
    }
  };
  console.log(options);

  return (
    <Row>
      {OPTIONS.map(item => {
        const { title, defaultValue, key } = item;
        const value = options[key];
        const { component: Component, props: ComponentProps } = getAntdComponent(item, {
          onChange,
          value: value === undefined ? defaultValue : value,
        });
        return (
          <>
            <Col span={8}>{title}</Col>
            <Col span={16}>
              <Component {...ComponentProps} />
            </Col>
          </>
        );
      })}
    </Row>
  );
};

export default LayoutOptionsPanel;
