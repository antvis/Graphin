import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import { Item } from '@com';
import service from '@service';
import { RandomState, RandomProps } from './interface';

const SelectOption = Select.Option;

const mockTypes = [
    {
        type: 'circle',
        name: '选举连接中心点',
        options: 'node-0',
    },
    {
        type: 'random',
        name: '随机裁剪边',
        options: '0.3',
    },
];

const Random: React.FC<RandomProps> = props => {
    const { dispatch } = props;

    const [state, setState] = useState<RandomState>({
        nodeCount: 10,
        mockType: 'circle',
        options: 'node-0',
    });
    const { mockType = 'circle', nodeCount = 10, options = 'node-0' } = state;
    const handleClick = async () => {
        const data = await service.queryGraph(nodeCount, mockType, options);
        dispatch({
            type: 'graph/changeData',
            payload: data,
        });
    };
    return (
        <div>
            <Item title="节点个数">
                <Input
                    placeholder="输入节点数量"
                    style={{ width: '100%' }}
                    value={nodeCount}
                    onChange={e => {
                        setState({ ...state, nodeCount: Number(e.target.value) });
                    }}
                />
            </Item>
            <Item title="边的连接关系">
                <Select
                    placeholder="请选择边的连接关系"
                    style={{ width: '100%' }}
                    value={mockType}
                    onChange={(value: string) => {
                        setState({
                            ...state,
                            mockType: value,
                            options: mockTypes.filter(mock => mock.type === value)[0].options,
                        });
                    }}
                >
                    {mockTypes.map(item => {
                        const { type, name } = item;
                        return (
                            <SelectOption key={type} value={type}>
                                {name}
                            </SelectOption>
                        );
                    })}
                </Select>
            </Item>
            <Item title={mockType === 'random' ? '随机参数' : '中心点'}>
                <Input
                    placeholder={`输入${mockType === 'random' ? '随机参数' : '中心点'}`}
                    style={{ width: '100%' }}
                    value={options}
                    onChange={e => {
                        setState({ ...state, options: e.target.value });
                    }}
                />
            </Item>
            <Item title="">
                <Button style={{ width: '100%' }} onClick={handleClick}>
                    全量替换节点
                </Button>
            </Item>
        </div>
    );
};

export default Random;
