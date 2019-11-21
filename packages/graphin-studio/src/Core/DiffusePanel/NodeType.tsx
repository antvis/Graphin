import React from 'react';
import nodeTypes from '@service/Mock/nodeTypes';
import { EnhancedCheckbox } from '@com';
import { TypeProps } from './interface';

const options = nodeTypes.map(item => {
    return {
        label: item.name,
        value: item.nodeType,
    };
});

const NodeType: React.FC<TypeProps> = props => {
    const { value, onChange } = props;
    return <EnhancedCheckbox options={options} checkedList={value} onChange={onChange} />;
};

export default NodeType;
