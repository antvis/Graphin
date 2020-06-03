import checkData from './dataChecker';
import { GraphinProps, Data, ForceSimulation, ExtendLayout } from '../../types';
import Graphin from '../../Graphin';
import defaultLayouts, { LayoutOption } from './defaultLayouts';

interface LayoutParams {
  data: Data;
  prevProps?: GraphinProps;
}

const layoutInfo = (layouts: ExtendLayout[]) => {
  return layouts.map(item => {
    const { desc, name, icon } = item;
    return {
      desc,
      name,
      icon,
    };
  });
};

const noopLayout = () => {
  return [];
};

const layoutController = (
  graphin: Graphin,
  params: LayoutParams,
): {
  data: Data;
  forceSimulation?: ForceSimulation;
} => {
  const { props, forceSimulation, graph } = graphin;
  const width = graph!.get('width');
  const height = graph!.get('height');

  const { data: PropsData, prevProps = props } = params;
  let { layout } = props;

  // 数据的校验
  const data = checkData(PropsData, {
    edge: {
      autoPoly: !!graphin.g6Options?.autoPolyEdge,
      autoLoop: !!graphin.g6Options?.autoLoopEdge,
    },
  });

  // 重置forceSimulation

  if (forceSimulation) {
    forceSimulation.stop();
  }

  // 注册 Layout
  const { extend = {} } = props;
  const extendLayout = extend.layout || noopLayout;
  const layouts = [...defaultLayouts(graphin, prevProps), ...extendLayout(graphin, prevProps)];

  // eslint-disable-next-line no-param-reassign
  graphin.getLayoutInfo = () => {
    return layoutInfo(layouts);
  };

  // 当没有节点，则不参加布局
  if (data.nodes && data.nodes.length === 0) {
    return {
      data,
    };
  }

  const hasPosition = data.nodes.every(node => {
    return !window.isNaN(Number(node.x)) && !window.isNaN(Number(node.y));
  });

  if (!(layout && layout.name)) {
    // layout不存在，且有位置信息，则认为是 save-render 操作
    if (hasPosition) {
      return { data };
    }
    layout = { name: 'concentric' };
  }

  // 设置布局的 options参数
  const { name } = layout;
  const options = {
    graph,
    width,
    height,
    data,
    ...layout.options,
  };

  // 得到当前匹配的布局函数
  const matchLayout = layouts.find(item => item.name === name) || {
    name: '',
    icon: '',
    layout: (inputData: Data) => {
      return {
        data: inputData,
      };
    },
  };

  const layoutData = matchLayout.layout(data, options as LayoutOption);
  return {
    ...layoutData,
    data: {
      ...layoutData.data,
      combos: data.combos,
    },
  };
};

export default layoutController;
