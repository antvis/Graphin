import type { TooltipProps } from './index';

const getContainerStyles = ({
  placement,
  nodeSize,
  x,
  y,
  bindType = 'node',
  visible,
}: {
  visible: boolean;
  placement: TooltipProps['placement'];
  nodeSize: number;
  x: number;
  y: number;
  bindType: string;
}) => {
  if (bindType === 'edge') {
    return {
      left: x,
      top: y,
    };
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
      left: 0,
      top: 0,
      opacity: 0.5,
      transform: 'translate(-50%,-100%)',
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
      left: x,
      top: y + nodeSize / 2,
      opacity: 0.5,
      transform: 'translate(-50%,0px)',
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
      opacity: 0,
      left: x - nodeSize / 2,
      top: y,
      transform: 'translate(-100%,-50%)',
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
      left: x + nodeSize / 2,
      top: y,
      transform: 'translate(0,-50%)',
      opacity: 0,
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
      left: x,
      top: y,
      opacity: 0,
    };
  }

  return {
    left: x,
    top: y,
  };
};

export default getContainerStyles;
