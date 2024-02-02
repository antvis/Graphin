/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Drawer } from 'antd';
import { useModel } from '../../hooks';
import { PREFIX } from '../../constants';

export const Panel: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const [model, setModel] = useModel();
  const onClose = () => setModel('panel.open', false);
  return (
    <div
      className={`${PREFIX}-panel`}
      css={css`
        position: relative;
      `}
    >
      <Drawer title="属性面板" placement="right" onClose={onClose} open={model.panel?.open} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};
