import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useGlobalModel } from '@antv/gi-sdk';
import type { PropsWithChildren } from 'react';
import React, { useMemo } from 'react';
import { WIDGET_PREFIX } from '../../constant';

export interface SidePanelProps {
  /**
   * 侧边栏宽度
   */
  width?: number;
}

export const SidePanel: React.FC<PropsWithChildren<SidePanelProps>> = React.memo((props) => {
  const { children, width = 350 } = props;
  const [sider, updateSider] = useGlobalModel<{sider:boolean}>('sider');
  const siderWidth = useMemo(() => (sider ? width : 0), [sider, width]);

  const toggleSidePanelCollapsed = () => {
    updateSider((prev) => !prev);
  };

  return (
    <div className={`${WIDGET_PREFIX}-side-panel`}>
      <div className={`${WIDGET_PREFIX}-side-panel-content`} style={{ width: siderWidth }}>
        {children}
      </div>

      <div className={`${WIDGET_PREFIX}-side-panel-icon-container`}>
        <div className={`${WIDGET_PREFIX}-side-panel-icon`} onClick={toggleSidePanelCollapsed}>
          {sider ? <LeftOutlined /> : <RightOutlined />}
        </div>
      </div>
    </div>
  );
});
