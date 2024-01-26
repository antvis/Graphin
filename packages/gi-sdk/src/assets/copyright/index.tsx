import React from 'react';
import { useModel } from '../../hooks';
import { PREFIX } from '../../constants';
import './style.less';

export const Copyright: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const [model, setModel] = useModel();
  const onClose = () => setModel('panel.open', false);

  return <div className={`${PREFIX}-copyright`}>{children}</div>;
};
