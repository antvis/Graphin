import React from 'react';
import { FoldingPanel, Property } from '@com';

import { GrapheneState } from '../../types';

interface NodeAttrProps {
    state: GrapheneState;
}

const NodeAttr: React.FC<NodeAttrProps> = props => {
    const { state } = props;
    const { selectedNodes } = state;
    const properties = selectedNodes[0].properties.map(property => {
        const { code, name, value } = property;
        return <Property key={code} name={name} value={value} />;
    });
    const source = [
        {
            title: '基础信息',
            children: properties,
        },
    ];
    return (
        <div>
            <FoldingPanel data={source} />
        </div>
    );
};

export default NodeAttr;
