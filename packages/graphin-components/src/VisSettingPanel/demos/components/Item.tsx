import React from 'react';
import { Typography } from 'antd';

const Item = ({ title, children }) => {
  return (
    <div style={{ display: 'flex', margin: '10px 5px' }}>
      <div style={{ flexBasis: '80px' }}>
        <Typography>{title}</Typography>
      </div>
      <div style={{ flex: 'auto' }}>{children}</div>
    </div>
  );
};
export default Item;
