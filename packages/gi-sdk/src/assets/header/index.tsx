/** @jsxImportSource @emotion/react */
import React from 'react';
import { SIDER_STYLE } from './style';
import { PREFIX } from '../../constants';

export const Header: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;

  return (
    <div className={`${PREFIX}-header`} css={SIDER_STYLE}>
      {children}
    </div>
  );
};
