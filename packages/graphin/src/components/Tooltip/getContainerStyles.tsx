import { Graph } from '@antv/g6';
import type { TooltipProps } from './index';

function getTooltipPlacement(graph: Graph, x: number, y: number): TooltipProps['placement'] {
  const canvas = graph.get('canvas')
  const width = canvas.get('width');
  const height = canvas.get('height');
  
  const pointerTop = y <= height / 4;
  const pointerBottom = y >= 3 * height / 4;
  const pointerLeft = x <= width / 4;
  const pointerRight = x >= 3 * width / 4;

  if (pointerLeft && pointerTop) {
    return 'bottom-right';
  }
  if (pointerRight && pointerTop) {
    return 'bottom-left';
  }
  if (pointerLeft && pointerBottom) {
    return 'top-right'
  }
  if (pointerRight && pointerBottom) {
    return 'top-left';
  }
  if (pointerTop) {
    return 'bottom';
  }
  if (pointerBottom) {
    return 'top';
  }
  if (pointerLeft) {
    return 'right';
  }
  if (pointerRight) {
    return 'left';
  }
  return 'center';
}

const getContainerStyles = ({
  graph,
  placement,
  nodeSize,
  x,
  y,
  bindType = 'node',
  visible,
}: {
  graph: Graph,
  visible: boolean;
  placement: TooltipProps['placement'];
  nodeSize: number;
  x: number;
  y: number;
  bindType: string;
}) => {
  if (bindType === 'edge') {
    if (visible) {
      return {
        left: x,
        top: y,
      };
    }
    return {
      visibility: 'hidden',
      left: x,
      top: y,
    };
  }

  if (placement === 'auto') {
    placement = getTooltipPlacement(graph, x, y);
  }

  if (placement === 'top') {
    if (visible) {
      return {
        left: x,
        top: y - nodeSize / 2,
        opacity: 1,
        transform: 'translate(-50%,calc(-100% - 6px))',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      visibility: 'hidden',
      left: 0,
      top: 0,
      opacity: 0,
      transform: 'translate(-50%,-100%)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'bottom') {
    if (visible) {
      return {
        left: x,
        top: y + nodeSize / 2,
        opacity: 1,
        transform: 'translate(-50%,6px)',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      visibility: 'hidden',
      left: x,
      top: y + nodeSize / 2,
      opacity: 0,
      transform: 'translate(-50%,0px)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'left') {
    if (visible) {
      return {
        left: x - nodeSize / 2,
        top: y,
        transform: 'translate(calc(-100% - 6px),-50%)',
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      visibility: 'hidden',
      opacity: 0,
      left: x - nodeSize / 2,
      top: y,
      transform: 'translate(-100%,-50%)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'right') {
    if (visible) {
      return {
        left: x + nodeSize / 2,
        top: y,
        transform: 'translate(6px,-50%)',
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      visibility: 'hidden',
      left: x + nodeSize / 2,
      top: y,
      transform: 'translate(0,-50%)',
      opacity: 0,
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'top-left') {
    if (visible) {
      return {
        left: x - nodeSize / 2,
        top: y - nodeSize / 2,
        opacity: 1,
        transform: 'translate(calc(-100% - 6px),calc(-100% - 6px))',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x - nodeSize / 2,
      top: y - nodeSize / 2,
      opacity: 0,
      transform: 'translate(-100%,-100%)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'top-right') {
    if (visible) {
      return {
        left: x + nodeSize / 2,
        top: y - nodeSize / 2,
        opacity: 1,
        transform: 'translate(6px,calc(-100% - 6px))',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x + nodeSize / 2,
      top: y - nodeSize / 2,
      opacity: 0,
      transform: 'translate(0,-100%)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'bottom-left') {
    if (visible) {
      return {
        left: x - nodeSize / 2,
        top: y + nodeSize / 2,
        opacity: 1,
        transform: 'translate(calc(-100% - 6px),6px)',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x - nodeSize / 2,
      top: y + nodeSize / 2,
      opacity: 0,
      transform: 'translate(-100%,0px)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }

  if (placement === 'bottom-right') {
    if (visible) {
      return {
        left: x + nodeSize / 2,
        top: y + nodeSize / 2,
        opacity: 1,
        transform: 'translate(6px,6px)',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x + nodeSize / 2,
      top: y + nodeSize / 2,
      opacity: 0,
      transform: 'translate(0,0)',
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }
  if (placement === 'center') {
    if (visible) {
      return {
        left: x,
        top: y,
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      visibility: 'hidden',
      left: x,
      top: y,
      opacity: 0,
      transition: 'opacity 0.5s,transform 0.5s',
    };
  }

  return {
    left: x,
    top: y,
  };
};

export default getContainerStyles;
