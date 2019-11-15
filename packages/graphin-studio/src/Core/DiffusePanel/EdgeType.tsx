import React from 'react';
import edgeTypes from '@service/Mock/edgeTypes';
import { TreeSelector } from '@com';
import { TypeProps } from './interface';

const relationTypeData = edgeTypes.map(item => {
    return {
        title: item.name,
        key: item.nodeType,
        children: item.children && item.children.map(ele => ({ title: ele.name, key: ele.nodeType })),
    };
});

const EdgeType: React.FC<TypeProps> = props => {
    const { value, onChange } = props;
    return (
        <TreeSelector
            data={relationTypeData}
            defaultExpandedKey={relationTypeData[0].key}
            onChange={onChange}
            checkedList={value}
        />
    );
};

export default EdgeType;
