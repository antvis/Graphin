import React from 'react';
import { Icon } from 'antd';
import { GrapheneState } from '../../types';

interface ClearProps {
    state: GrapheneState;
}

const Clear: React.FC<ClearProps> = () => {
    return (
        <div>
            <Icon type="info-circle" /> 清空当前画布
        </div>
    );
};

export default Clear;
