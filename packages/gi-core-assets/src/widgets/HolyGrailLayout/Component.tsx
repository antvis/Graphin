/**
 * 圣杯布局资产
 */
import type { ImplementWidgetProps } from '@antv/gi-sdk';
import { GraphContainer } from '@antv/gi-sdk';
import './Component.less';
import type { FloatPanelProps, SidePanelProps } from './components';
import { FloatPanel, Footer, Header, SidePanel } from './components';
import { WIDGET_PREFIX } from './constant';
import { memo } from 'react';

type Slot = 'header' | 'sidePanel' | 'floatPanel' | 'canvas' | 'footer';

export interface HolyGrailLayoutProps extends ImplementWidgetProps<Slot> {
  /**
   * 是否显示头部
   */
  showHeader?: boolean;
  /**
   * 是否显示侧边栏
   */
  showSidePanel?: boolean;
  /**
   * 是否显示浮动面板
   */
  showFloatPanel?: boolean;
  /**
   * 是否显示尾部
   */
  showFooter?: boolean;
  /**
   * 侧边栏属性
   */
  sidePanel?: SidePanelProps;
  /**
   * 浮动面板属性
   */
  floatPanel?: FloatPanelProps;
}

export const HolyGrailLayout: React.FC<HolyGrailLayoutProps> = memo((props) => {
  const { slotElements, showHeader, showFooter, showFloatPanel, showSidePanel, sidePanel, floatPanel } = props;

  return (
    <div className={`${WIDGET_PREFIX}-container`}>
      {showHeader && <Header>{slotElements.header}</Header>}
      <div className={`${WIDGET_PREFIX}-content`}>
        {showSidePanel && <SidePanel {...sidePanel}>{slotElements.sidePanel}</SidePanel>}
        <GraphContainer className={`${WIDGET_PREFIX}-graph-container`} style={{ width: '100%' }}>
          {slotElements.canvas}
          {showFloatPanel && <FloatPanel {...floatPanel}>{slotElements.floatPanel}</FloatPanel>}
        </GraphContainer>
      </div>
      {showFooter && <Footer>{slotElements.footer}</Footer>}
    </div>
  );
});
