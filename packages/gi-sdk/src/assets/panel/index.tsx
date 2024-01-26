import React from 'react';
import { Drawer } from 'antd';
import { useModel } from '../../hooks';
import { PREFIX } from '../../constants';
import './style.less';

export const Panel: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const [model, setModel] = useModel();
  const onClose = () => setModel('panel.open', false);

  return (
    <div className={`${PREFIX}-panel`}>
      <Drawer title="属性面板" placement="right" onClose={onClose} open={model.panel?.open} getContainer={false}>
        {children}
      </Drawer>
    </div>
  );
};
