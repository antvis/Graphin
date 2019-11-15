/** 默认节点样式 */
const defaultStyle = {
    /** 节点的大小 */
    nodeSize: 20,
    /** 节点的主要颜色 */
    primaryColor: '#9900EF',
    /** 文本的字体大小 */
    fontSize: 12,
    /** 文本的字体颜色 */
    fontColor: '#3b3b3b',
    /** dark 置灰 */
    dark: '#eee',
};
type Style = typeof defaultStyle;
const renderNodeShape = (node: any) => {
    const { primaryColor, nodeSize, fontColor, fontSize, dark } = {
        ...defaultStyle,
        ...node.style,
    } as Style;

    const iconSize = nodeSize / 2;
    const fontPosition = nodeSize * 1.4;
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
            {
                shape: 'Marker',
                attrs: {
                    id: 'node-icon',
                    symbol: node.data.type,
                    x: 0,
                    y: 0,
                    r: iconSize,
                    fill: primaryColor,
                },
            },
            {
                shape: 'text',
                attrs: {
                    id: 'text-desc',
                    text: node.data.label,
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
