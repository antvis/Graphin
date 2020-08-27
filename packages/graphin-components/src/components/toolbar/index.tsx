import React, { ReactElement, CSSProperties } from 'react';
import { Graph } from '@antv/g6';

import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  ZoomOutOutlined,
  ZoomInOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Tooltip, Button, Popover, Progress } from 'antd';

import useFullscreen from './use-fullscreen';
import useZoom from './use-zoom';
import './index.less';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;

/**
 * @param {*} props 支持 刷新/放大/缩小/全屏 四功能
 */
interface MenuItem {
  id: string;
  name: string;
  icon: ReactElement;
  disabled?: boolean;
  style?: object;
  action: () => void;
  renderTooltip?: () => ReactElement;
}

export interface RenderProps {
  toolbarCfg: MenuItem[];
  graph?: Graph;
  apis?: any; // eslint-disable-line
  graphVars?: {
    width?: number;
    height?: number;
  };
  direction?: string; // 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
}

export type Tdirection = 'horizontal' | 'vertical';
export interface ToolbarProps {
  style?: CSSProperties;
  graphDOM?: HTMLElement;
  graph: Graph;
  apis?: any; // eslint-disable-line
  className?: string;
  graphVars?: {
    width?: number;
    height?: number;
  };
  direction?: Tdirection; // 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
  render?(props: RenderProps): MenuItem[];
}

const defaultStyle: CSSProperties = {
  position: 'absolute',
  top: '48px',
  left: '48px',
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { graph, className = '', render, graphVars = {}, apis, direction = 'vertical', style } = props;
  const { history } = apis;
  const { width = 0, height = 0 } = graphVars;
  const graphinContainer = document.getElementById('graphin-container') as HTMLElement;

  const [fullscreen, toggleFullscreen] = useFullscreen(graphinContainer);
  const [zoom, handleZoom] = useZoom(1);
  const handleGraphZoom = (isZoom: boolean, _curZoom) => {
    // eslint-disable-line
    const center = {
      x: width / 2,
      y: height / 2,
    };
    const newZoom = handleZoom(isZoom);
    graph.zoomTo(newZoom, center); // eslint-disable-line
  };

  const historyInfo = history.getInfo();
  const curZoom = graph?.getZoom().toFixed(2);
  let buttonCfg: MenuItem[] = [
    {
      id: 'fullscreen',
      name: fullscreen ? '还原' : '全屏',
      icon: fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
      disabled: false,
      action: toggleFullscreen,
    },
    {
      id: 'zoomIn',
      name: '放大',
      icon: <ZoomInOutlined />,
      disabled: zoom >= MAX_ZOOM,
      action: () => handleGraphZoom(true, curZoom),
    },
    {
      id: 'zoomOut',
      name: '缩小',
      icon: <ZoomOutOutlined />,
      disabled: zoom <= MIN_ZOOM,
      action: () => handleGraphZoom(false, curZoom),
    },
    {
      id: 'undo',
      name: `撤销操作,进度:${historyInfo.currentStep} / ${historyInfo.allStep}`,
      icon: <UndoOutlined />,
      disabled: false,
      action: () => {
        history.undo();
      },
      style: {},
      renderTooltip: () => {
        const { currentStep, allStep } = historyInfo;
        const percent = Math.round((currentStep / allStep) * 100);
        return (
          <div>
            <Progress percent={percent} showInfo={false} />
          </div>
        );
      },
    },
    {
      id: 'redo',
      name: `重做操作,进度:${historyInfo.currentStep} / ${historyInfo.allStep}`,
      icon: <RedoOutlined />,
      disabled: false,
      action: () => {
        history.redo();
      },
      style: {},
      renderTooltip: () => {
        const { currentStep, allStep } = historyInfo;
        const percent = Math.round((currentStep / allStep) * 100);
        return (
          <div>
            <Progress percent={percent} showInfo={false} />
          </div>
        );
      },
    },
  ];

  if (render) {
    buttonCfg = render({
      toolbarCfg: buttonCfg,
      graph,
      graphVars,
      apis,
      direction,
    });
  }

  const placement = direction === 'vertical' ? 'right' : 'bottom';

  return (
    <div>
      <div className={`zoom-toolbar ${direction} ${className}`} style={style || defaultStyle}>
        {buttonCfg.map((item) => {
          /** 需要自定义渲染 */
          if (item.renderTooltip) {
            return (
              <Popover
                placement={placement}
                content={item.renderTooltip()}
                title={item.name}
                trigger="hover"
                key={item.id}
              >
                <Button onClick={item.action} disabled={item.disabled} style={item.style}>
                  {item.icon}
                </Button>
              </Popover>
            );
          }
          return (
            <Tooltip placement={placement} title={item.name} key={item.id}>
              <Button onClick={item.action} disabled={item.disabled} style={item.style}>
                {item.icon}
              </Button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
