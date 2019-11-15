import registerInnerMarker from '../icons/marker';
import { GraphinProps } from '../types';
import compiler from '../shape/render/compiler';
import CircleNode from '../shape/render/CircleNode';
/** register */
import RegisterLineEdge from '../shape/g6/LineEdge';
import graphinHighlight from '../behaviors/graphin-highlight';
// import graphinBrushSelect from '../behaviors/custom-brush-select';

import G6 from '@antv/g6';

const innerRegister = {
    nodeShape: () => {
        return [];
    },
    edgeShape: () => {
        return [
            {
                name: 'LineEdge',
                register: () => {
                    RegisterLineEdge(G6);
                },
            },
        ];
    },
    behavior: () => {
        return [
            {
                name: 'graphin-highlight',
                mode: 'default',
                options: {},
                register: () => {
                    G6.registerBehavior('graphin-highlight', graphinHighlight);
                },
            },
        ];
    },
};

const dumpRegister = () => {
    return [];
};
const dumpExtend = () => {
    return [];
};

const innerExtend = {
    nodeShape: () => {
        return [
            {
                name: 'CircleNode',
                render: CircleNode,
            },
        ];
    },
    marker: () => {
        return [];
    },
};

const toUpperCaseWithFirst = (str: string): string => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
};
const graphinRegister = (props: GraphinProps) => {
    const { extend = {}, register = {}, options = {} } = props;

    const innerBehaviors = innerRegister.behavior().filter(behavior => {
        const behaviorName = behavior.name.split('-')[1];
        const disableName = `disable${toUpperCaseWithFirst(behaviorName)}`;
        return !options[disableName];
    });

    /** 使用G6原生方法得到的 */
    const { nodeShape = dumpRegister, edgeShape = dumpRegister, behavior = dumpRegister } = register;
    const registerNodes = [...innerRegister.nodeShape(), ...nodeShape(G6)];
    const registerEdges = [...innerRegister.edgeShape(), ...edgeShape(G6)];
    const registerBehaviors = [...innerBehaviors, ...behavior(G6)];
    registerNodes.forEach(item => {
        item.register(G6);
    });
    registerEdges.forEach(item => {
        item.register(G6);
    });
    const modes: any[] = [];

    registerBehaviors.forEach(item => {
        item.register(G6);
        const { name, mode } = item;
        try {
            modes.push({
                mode,
                type: name,
                ...item.options,
            });
            // eslint-disable-next-line no-empty
        } catch (error) {}
    });

    const behaviorMode = modes.reduce(
        (acc, curr) => {
            const { mode, ...others } = curr;
            if (!acc[mode]) {
                acc[mode] = [];
            }
            acc[mode].push(others);
            return { ...acc };
        },
        {
            default: [],
        },
    );

    /** 扩展得到的 */
    const { nodeShape: ExNodeShape = dumpExtend, marker: ExMarker = dumpExtend } = extend;

    const extendNodes = [...innerExtend.nodeShape(), ...ExNodeShape()];
    const extendMarker = [...innerExtend.marker(), ...ExMarker()];

    extendNodes.forEach(item => {
        compiler(item);
    });

    registerInnerMarker(extendMarker);

    return behaviorMode;
};
export default graphinRegister;
