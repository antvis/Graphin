/** @jsxImportSource @emotion/react */
import React from 'react';
import { set } from 'lodash-es';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { useSnapshot } from 'valtio';
import { SDKModel } from '../../model';
import { SIDER_STYLE } from './style';
import { PREFIX } from '../../constants';

export const Sider: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const model = useSnapshot(SDKModel);
  const { open = true } = model.sider || {};

  return (
    <React.Fragment>
      <div className={`${PREFIX}-sider`} css={SIDER_STYLE}>
        <div className={`${PREFIX}-tool`}>
          <div
            className={`${PREFIX}-sider-icon`}
            onClick={() => {
              set(SDKModel, 'sider.open', !open);
            }}
          >
            {open ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
        </div>
        <CSSTransition in={open} classNames="fade" timeout={400} apper="true">
          <div className={`${PREFIX}-sider-content`}>{children}</div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};
