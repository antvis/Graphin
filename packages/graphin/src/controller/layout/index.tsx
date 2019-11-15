import dataChecking from './dataChecking';
import { GraphinProps, Data, ForceSimulation, ExendLayout } from '../../types';
import Graphin from '../../Graphin';
import defaultLayouts from './defaultLayouts';

interface LayoutParams {
    data: Data;
    prevProps?: GraphinProps;
}

const layoutInfo = (layouts: ExendLayout[]) => {
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

/**
 *
 * @param graphin Graphin组件对象
 * @param params
 */
const layoutController = (
    graphin: Graphin,
    params: LayoutParams,
): {
    data: Data;
    forceSimulation?: ForceSimulation;
} => {
    const { props, forceSimulation, graph } = graphin;
    const width = graph.get('width');
    const height = graph.get('height');

    const { data: PropsData, prevProps = props } = params;
    let { layout } = props;

    /** 数据的校验  */
    const data = dataChecking(PropsData);

    /** 注册 */
    const { extend = {} } = props;
    const extendLayout = extend.layout || noopLayout;
    const layouts = [...defaultLayouts(graphin, prevProps), ...extendLayout(graphin, prevProps)];

    // eslint-disable-next-line no-param-reassign
    graphin.getLayoutInfo = () => {
        return layoutInfo(layouts);
    };

    /** 当没有节点，则不参加布局 */
    if (data.nodes && data.nodes.length === 0) {
        return {
            data,
        };
    }

    const hasPosition = data.nodes.every(node => {
        return node.x && node.y;
    });

    /** layout不存在，且有位置信息，则认为是save-render操作 */
    if (!(layout && layout.name)) {
        if (hasPosition) {
            return { data };
        }
        layout = { name: 'concentric' };
    }

    /** 重置forceSimulation  */
    if (forceSimulation) {
        forceSimulation.stop();
    }

    /** 设置布局的 options参数 */
    const { name } = layout;
    const options = {
        graph,
        width,
        height,
        data,
        ...layout.options,
    };

    /** 得到当前匹配的布局函数 */
    const matchLayout = layouts.find(item => item.name === name) || {
        name: '',
        icon: '',
        layout: (inputData: Data) => {
            return {
                data: inputData,
            };
        },
    };

    return matchLayout.layout(data, options);
};

export default layoutController;
