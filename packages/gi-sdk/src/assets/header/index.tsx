/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useModel } from '../../hooks';
import { PREFIX } from '../../constants';

export const Header: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;

  return (
    <div
      className={`${PREFIX}-header`}
      css={css`
        position: relative;
        box-shadow: var(--box-shadow);
        background-color: var(--background-color);
      `}
    >
      {children}
    </div>
  );
};
