import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { GrapheneState } from '../../types';

interface ClearProps {
    state: GrapheneState;
}

const Clear: React.FC<ClearProps> = () => {
    return (
        <div>
            <InfoCircleOutlined /> 清空当前画布
        </div>
    );
};

export default Clear;
