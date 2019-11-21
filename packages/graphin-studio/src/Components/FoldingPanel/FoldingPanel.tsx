import React from 'react';
import { Collapse } from 'antd';
import './FoldingPanel.less';

const { Panel } = Collapse;

export type Types = {
    title: string;
    children: React.ReactNode;
};

export interface FoldingPanelProps {
    /** 数据源  */
    data: Types[];
}

/**
 * 接收一个数组，数组内为若干个对象，每个对象有两个属性
 * @param  {string} title       每个面板的标题及key值
 * @param  {ReactNode} children 面板内渲染的内容
 */
const FoldingPanel: React.SFC<FoldingPanelProps> = props => {
    // 默认展开所有子项
    const getActiveKeys = (data: Types[]): string[] => {
        const initialValue: string[] = [];
        const newData = data.slice();
        return newData.reduce((a, b) => a.concat([b.title]), initialValue); // 返回所有key值
    };
    const { data } = props;

    return (
        <Collapse className="panel" bordered={false} defaultActiveKey={getActiveKeys(data)} expandIconPosition="right">
            {(data || []).map(item => {
                const header = (
                    <div className="name">
                        <span className="mark" />
                        {item.title}
                    </div>
                );
                return (
                    <Panel header={header} key={item.title}>
                        {item.children}
                    </Panel>
                );
            })}
        </Collapse>
    );
};

export default FoldingPanel;
