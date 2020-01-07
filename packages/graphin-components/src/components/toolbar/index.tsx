import React, { ReactElement, CSSProperties } from 'react';
import { Graph } from '@antv/g6';
import { Tooltip, Button, Icon, Popover, Progress } from 'antd';

import useFullscreen from './useFullscreen';
import useZoom from './useZoom';
import './index.less';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;

/**
 * @param {*} props 支持 刷新/放大/缩小/全屏 四功能
 */
interface MenuItem {
  id: string;
  name: string;
  icon: string;
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
  graphDOM?: HTMLElement;
  graph?: Graph;
  apis?: any; // eslint-disable-line
  className?: string;
  graphVars?: {
    width?: number;
    height?: number;
  };
  direction?: Tdirection; // 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向
  render?(props: RenderProps): MenuItem[];
}

const getToolbarPosition = (graphDOM: HTMLElement, direction: Tdirection): CSSProperties => {
  const { top, left, bottom } = graphDOM.getBoundingClientRect();
  if (direction === 'horizontal') {
    return {
      position: 'fixed',
      left,
      top,
    };
  }
  return {
    position: 'fixed',
    left: left + 30,
    bottom: window.innerHeight - bottom + 30,
  };
};
const Toolbar: React.FC<ToolbarProps> = props => {
  const { graphDOM, graph, className = '', render, graphVars = {}, apis, direction = 'vertical' } = props;
  const { history } = apis;
  const { width = 0, height = 0 } = graphVars;
  const [fullscreen, toggleFullscreen] = useFullscreen(graphDOM);
  const [zoom, handleZoom] = useZoom(1);
  const handleGraphZoom = (isZoom: boolean) => {
    const center = {
      x: width / 2,
      y: height / 2,
    };
    const newZoom = handleZoom(isZoom);
    if (graph) graph.zoomTo(newZoom, center);
  };

  const historyInfo = history.getInfo();

  let buttonCfg: MenuItem[] = [
    {
      id: 'fullscreen',
      name: fullscreen ? '还原' : '全屏',
      icon: fullscreen ? 'fullscreen-exit' : 'fullscreen',
      disabled: false,
      action: toggleFullscreen,
    },
    {
      id: 'zoomIn',
      name: '放大',
      icon: 'zoom-in',
      disabled: zoom >= MAX_ZOOM,
      action: () => handleGraphZoom(true),
    },
    {
      id: 'zoomOut',
      name: '缩小',
      icon: 'zoom-out',
      disabled: zoom <= MIN_ZOOM,
      action: () => handleGraphZoom(false),
    },
    {
      id: 'undo',
      name: `撤销操作,进度:${historyInfo.currentStep} / ${historyInfo.allStep}`,
      icon: 'undo',
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
      icon: 'redo',
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
  const style = getToolbarPosition(graphDOM!, direction);
  return (
    <div>
      <div className={`zoom-toolbar ${direction} ${className}`} style={style}>
        {buttonCfg.map(item => {
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
                  <Icon type={item.icon} />
                </Button>
              </Popover>
            );
          }
          return (
            <Tooltip placement={placement} title={item.name} key={item.id}>
              <Button onClick={item.action} disabled={item.disabled} style={item.style}>
                <Icon type={item.icon} />
              </Button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
