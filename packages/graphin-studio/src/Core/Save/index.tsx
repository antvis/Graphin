import React from 'react';
import { Graph } from '@antv/g6';
import './index.less';

interface SaveProps {
    graph?: Graph;
}

const Save: React.FC<SaveProps> = props => {
    const { graph } = props;

    const url = graph.toDataURL() as string;
    return (
        <div className="graphin-studio-save">
            <img src={url} alt="" width="100%" />
        </div>
    );
};

export default Save;
