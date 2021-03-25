import { Input } from 'antd';
import * as React from 'react';

interface BasicProps {}

const Basic: React.FunctionComponent<BasicProps> = props => {
  return (
    <div>
      <Input placeholder="source" style={{ marginBottom: '5px' }} />
      <Input placeholder="target" />
    </div>
  );
};

export default Basic;
