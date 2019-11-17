import React from 'react';
import ToolBar from '../../Components/ToolBar';
import './index.less';
import diffuseOperator from './diffuse.operator';
import { GrapheneState } from '../../types';

export interface OperatorBarProps {
    dispatch: (props: any) => any; // eslint-disable-line
    graphRef?: any; // eslint-disable-line
    state: GrapheneState;
}
const OperatorBar: React.FC<OperatorBarProps> = props => {
    const { dispatch, graphRef } = props;
    const apis = graphRef.current.getApis();

    const menus = [
        {
            id: 'addNode',
            name: '添加实体',
            icon: 'file-add',
            onClick: () => {
                dispatch({
                    type: 'graph/drawer',
                    payload: {
                        title: '添加实体',
                        type: 'addNodes',
                        visible: true,
                        width: 450,
                        closeMask: true,
                    },
                });
            },
        },
        {
            id: 'search',
            name: '搜索',
            icon: 'search',
            onClick: () => {
                dispatch({
                    type: 'graph/searchBar',
                    payload: {
                        visible: true,
                    },
                });
            },
        },
        // {
        //     id: 'filter',
        //     name: '图筛选',
        //     icon: 'filter',
        //     disabled: true,
        // },

        {
            id: 'divider1',
            isDivider: true,
        },
        {
            id: 'diffuse',
            name: '关系扩散',
            icon: 'deployment-unit',
            onClick: () => {
                diffuseOperator(props);
            },
        },
        // {
        //     id: 'discover',
        //     name: '关系发现',
        //     disabled: true,
        //     icon: 'eye',
        // },
        // {
        //     id: 'analyse',
        //     name: '社群分析',
        //     disabled: true,
        //     icon: 'gateway',
        // },
        {
            id: 'divider2',
            isDivider: true,
        },

        {
            id: 'save',
            name: '保存',
            icon: 'save',
            onClick: () => {
                dispatch({
                    type: 'graph/modal',
                    payload: {
                        title: '保存画布',
                        type: 'save',
                        visible: true,
                        handleOk: () => {
                            // eslint-disable-next-line no-console
                            console.log('save graph');
                        },
                    },
                });
            },
        },
        {
            id: 'clear',
            name: '清空',
            icon: 'delete',
            onClick: () => {
                dispatch({
                    type: 'graph/modal',
                    payload: {
                        title: '清空画布',
                        type: 'clear',
                        visible: true,
                        handleOk: () => {
                            apis.clear();
                            // eslint-disable-next-line no-console
                            console.log('clear graph');
                        },
                    },
                });
            },
        },
        {
            id: 'setting',
            name: '设置',
            icon: 'setting',
            onClick: () => {
                dispatch({
                    type: 'graph/drawer',
                    payload: {
                        title: '设置',
                        type: 'setting',
                        visible: true,
                        width: 350,
                        closeMask: true,
                    },
                });
            },
        },
    ];
    return (
        <div>
            <ToolBar data={menus} className="operator-bar" />;
        </div>
    );
};

export default OperatorBar;
