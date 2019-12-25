import { Node, NodeStyle, NodeShapeFunction } from '../../types';
import iconFont from '../../icons/iconFont';

const defaultStyle: NodeStyle = {
    nodeSize: 20,
    primaryColor: '#9900EF',
    fontSize: 12,
    fontColor: '#3b3b3b',
    dark: '#eee',
    fontFamily: 'graphin',
};

const renderNodeShape: NodeShapeFunction = (node: Node) => {
    const mergedStyle: Partial<NodeStyle> = {
        ...defaultStyle,
        ...node.style,
    };

    const { primaryColor, nodeSize, fontColor, fontSize, dark, fontFamily, icon } = mergedStyle as NodeStyle;

    const iconSize = nodeSize;
    const fontPosition = nodeSize! * 1.4;

    return {
        shape: 'CircleNode',
        shapeComponents: [
            {
                shape: 'circle',
                attrs: {
                    id: 'circle-container',
                    x: 0,
                    y: 0,
                    r: nodeSize,
                    fill: '#fff',
                    stroke: primaryColor,
                    cursor: 'pointer',
                    lineWidth: 2,
                },
            },
            // G6 iconfont 方案。https://www.yuque.com/antv/g6/acaihu
            {
                shape: 'text',
                attrs: {
                    id: 'node-icon',
                    x: 0,
                    y: 0,
                    fontSize: iconSize,
                    fill: primaryColor,
                    text: iconFont(icon || node.data.type || '', fontFamily!),
                    fontFamily,
                    textAlign: 'center',
                    textBaseline: 'middle',
                },
            },
            {
                shape: 'text',
                attrs: {
                    id: 'text-desc',
                    text: node.label || node.data.label,
                    x: 0,
                    y: fontPosition,
                    cursor: 'pointer',
                    fontSize,
                    fill: fontColor,
                    fontWeight: 'lighter',
                    fontFamily: 'Courier New',
                    textAlign: 'center',
                    textBaseline: 'top',
                },
            },
        ],
        state: {
            selected: {
                'circle-container': {
                    stroke: primaryColor,
                    // fill: '#000',
                    animate: {
                        attrs: {
                            lineWidth: 6,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 2,
                            shadowColor: '#fff',
                            repeat: false, // 循环
                        },
                        duration: 200,
                        easing: 'easeCubic',
                        callback: null,
                        delay: 0,
                    },
                },
            },
            // 'highlight.light': {
            //     'circle-container': {
            //         stroke: primaryColor,
            //         fill: '#ddd',
            //     },
            // },
            'highlight.dark': {
                'circle-container': {
                    fill: dark,
                    stroke: dark,
                },
                'node-icon': {
                    fill: dark,
                },
                'text-desc': {
                    fill: dark,
                },
            },
        },
    };
};
export default renderNodeShape;
