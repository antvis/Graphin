import React, { useState } from 'react';
import { Select, Input, Button } from 'antd';
import nodeTypes from '@service/Mock/nodeTypes';
import { GraphData } from '@antv/g6/lib/types';
import { Item } from '@com';
import service from '@service';
import { NormalProps, NormalState } from './interface';
import { NodeData } from '../../types';
import './index.less';

const { TextArea } = Input;
const SelectOption = Select.Option;

const Normal: React.FC<NormalProps> = props => {
    const { dispatch, graph } = props;
    const [state, setState] = useState<NormalState>({
        type: 'company',
        params: '',
    });
    const { type = 'company', params = '', errormsg = '' } = state;
    const handleClick = async () => {
        if (!params) {
            setState({
                ...state,
                errormsg: 'id不能为空',
            });
            return;
        }
        setState({ ...state, params: '' });
        const ids = params.split(',');
        const data = (await service.queryNodes(ids, type)) as NodeData[];
        const preData = graph.save();
        const { nodes, edges } = preData as GraphData;

        dispatch({
            type: 'graph/addNodes',
            payload: {
                nodes: [...nodes, ...data],
                edges,
            },
        });
    };
    const handleChangeNodeId = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, params: e.target.value, errormsg: '' });
    };
    return (
        <div>
            <Item title="实体类型">
                <Select
                    placeholder="请选择实体类型"
                    style={{ width: '100%' }}
                    value={type}
                    onChange={(value: string) => {
                        setState({ ...state, type: value });
                    }}
                >
                    {nodeTypes.map(item => {
                        const { nodeType, name } = item;
                        return (
                            <SelectOption key={nodeType} value={nodeType}>
                                {name}
                            </SelectOption>
                        );
                    })}
                </Select>
            </Item>
            <Item title="输入ID">
                <TextArea
                    rows={4}
                    placeholder="请输入ID, 多个的话用逗号分隔"
                    value={params}
                    onChange={handleChangeNodeId}
                />
            </Item>
            {errormsg && <span className="error_msg">{errormsg}</span>}
            <Item title="">
                <Button style={{ width: '100%' }} onClick={handleClick}>
                    增量添加节点
                </Button>
            </Item>
        </div>
    );
};

export default Normal;
