import React from 'react';
import './index.less';

interface NodeEdgeCountProps {
    apis?: any; // eslint-disable-line
}
const NodeEdgeCount: React.FC<NodeEdgeCountProps> = props => {
    const { apis = {} } = props;
    const { edges, nodes } = apis.getInfo().count;
    return (
        <div>
            <div className="graphin-studio-count">
                <span>节点数量 ({nodes})</span>
                <span className="count-line">|</span>
                <span>边数量 ({edges})</span>
            </div>
        </div>
    );
};

export default NodeEdgeCount;
