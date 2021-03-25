import { Radio } from 'antd';
import * as React from 'react';

interface BasicProps {}

const Basic: React.FunctionComponent<BasicProps> = props => {
  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>中文</Radio>
        <Radio value={2}>English</Radio>
      </Radio.Group>
    </div>
  );
};

export default Basic;
