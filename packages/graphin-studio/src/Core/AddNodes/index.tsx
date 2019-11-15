import React from 'react';
import FoldingPanel from '../../Components/FoldingPanel/FoldingPanel';
import Normal from './Normal';
import Random from './Random';
import { AddNodesProps } from './interface';

const AddNodes: React.FC<AddNodesProps> = props => {
    const data = [
        {
            title: '增量添加节点',
            children: <Normal {...props} />,
        },
        {
            title: '全量替换节点',
            children: <Random {...props} />,
        },
    ];
    return (
        <div>
            <FoldingPanel data={data} />
        </div>
    );
};

export default AddNodes;
