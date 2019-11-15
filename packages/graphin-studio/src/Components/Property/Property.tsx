import React from 'react';
import { Tooltip } from 'antd';
import './index.less';

interface PropertyProps {
    name: string;
    value: string;
}

const Property: React.FC<PropertyProps> = props => {
    const { name, value } = props;
    return (
        <div className="property">
            <span className="title">{`${name}: `}</span>
            <Tooltip title={value}>
                <span className="info">{value}</span>
            </Tooltip>
        </div>
    );
};

export default Property;
