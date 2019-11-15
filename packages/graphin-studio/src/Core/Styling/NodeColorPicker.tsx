import React, { useState } from 'react';
import { GraphNode } from '@antv/graphin';
import ColorPicker from './ColorPicker';
import Storage from '../../Service/Storage/index';
import { StylingProps } from './interface';
import { BizType } from '../../Custom/config';

const NodeColorPicker: React.FC<StylingProps> = props => {
    const storage = new Storage('graphin-studio');
    const bizTypes = storage.get('bizTypes') as BizType[];

    const initialNodeState = bizTypes.map(item => {
        return {
            type: item.type,
            name: item.name,
            color: item.style.primaryColor,
        };
    });
    const [state, setState] = useState({
        nodeTypes: initialNodeState,
    });
    const { nodeTypes } = state;

    const onChange = (type: string, color: string) => {
        const nodes = nodeTypes.map(node => {
            if (node.type === type) {
                return {
                    ...node,
                    color,
                };
            }
            return node;
        });
        setState({
            nodeTypes: nodes,
        });

        const newBizTypes = bizTypes.map(item => {
            if (item.type === type) {
                return {
                    ...item,
                    style: {
                        ...item.style,
                        primaryColor: color,
                    },
                };
            }
            return item;
        });

        storage.set('bizTypes', newBizTypes);
        const matchBizType = newBizTypes.find(item => item.type === type);

        /** 调用G6的API实现刷新 */
        const { graph } = props;
        const graphNodes = graph.get('nodes') as GraphNode[];

        graphNodes.forEach(node => {
            const nodeType = node.get('model').data.type;
            if (type === nodeType) {
                /**  只更新需要更新的节点类型 */
                graph.update(node, {
                    style: matchBizType.style,
                });
            }
        });
        /** end */
    };

    return (
        <div>
            {nodeTypes.map(bizType => {
                const { type, name, color } = bizType;
                return <ColorPicker key={type} type={type} name={name} onChange={onChange} defaultColor={color} />;
            })}
        </div>
    );
};

export default NodeColorPicker;
