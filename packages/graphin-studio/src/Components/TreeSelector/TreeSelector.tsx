import React from 'react';
import { Tree } from 'antd';
import { isEqual, difference } from 'lodash';
import { AntTreeNodeCheckedEvent } from 'antd/es/Tree';
import EnhancedCheckbox from '../EnhancedCheckbox';
import { CheckboxValueType, CheckboxDataProps, TreeDataProps } from './interface';
import getCheckedKeys from './functions/index';
import './TreeSelector.less';

const { TreeNode } = Tree;

interface CheckedKeys {
    checked: Array<string>;
    halfChecked: Array<string>;
}

interface TreeSelectorState {
    checkboxData: Array<CheckboxDataProps>;
    checkedList: Array<CheckboxValueType>;
}

export interface TreeSelectorProps {
    /** 源数据（key 在整个树范围内唯一）  */
    data: Array<TreeDataProps>;
    /** 右侧子节点栅格占位格数  */
    span?: number;
    /** 容器的自定义样式  */
    style?: object;
    /** 左侧树选择框容器的自定义样式  */
    treeStyle?: object;
    /** 默认展开指定的树节点（只能展开一项）  */
    defaultExpandedKey?: string;
    /** （受控）选中树的子节点（注意：子节点 key 传入，父节点自动选中）  */
    checkedList?: Array<CheckboxValueType>;
    /** 选中节点变化时回调  */
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}

class TreeSelector extends React.PureComponent<TreeSelectorProps, TreeSelectorState> {
    childNodes: Array<CheckboxDataProps>;

    treeNodeKeys: Array<CheckboxValueType>;

    childNodeKeys: Array<CheckboxValueType>;

    constructor(props: TreeSelectorProps) {
        super(props);
        this.childNodes = []; // 所有子节点的数据集合
        this.treeNodeKeys = []; // 选中树节点的key
        this.childNodeKeys = []; // 选中子节点的key
        this.state = {
            checkboxData: [], // 子节点数据
            checkedList: [],
        };
    }

    componentDidMount(): void {
        const { data } = this.props;
        this.init(data);
    }

    componentDidUpdate(prevProps: TreeSelectorProps): void {
        // 传入数据变化时，重新初始化数据
        const { data, checkedList } = this.props;
        if (!isEqual(prevProps.data, data)) {
            this.childNodeKeys = checkedList;
            this.init(data);
        }
    }

    // 数据初始化
    init = (data: Array<TreeDataProps>): void => {
        const { defaultExpandedKey } = this.props;
        this.childNodes.splice(0);
        this.renderCheckboxNodes(data);
        const checkboxData = this.childNodes.filter(item => item.key === defaultExpandedKey);
        this.setState({ checkboxData });
        // return checkboxData;
    };

    // 点击树节点
    onSelect = (selectedKeys: Array<string>): void => {
        if (selectedKeys.length) {
            const checkboxData = this.childNodes.filter(item => item.key === selectedKeys[0]);
            this.setState({ checkboxData });
        }
    };

    // 勾选树节点
    onCheck = (checkedKeys: Array<string> | CheckedKeys, e: AntTreeNodeCheckedEvent): void => {
        const { checkedList, onChange } = this.props;
        const checked = checkedKeys instanceof Array ? checkedKeys : checkedKeys.checked;
        const changedKeys = e.checked ? difference(checked, this.treeNodeKeys) : difference(this.treeNodeKeys, checked);
        const checkboxData = this.childNodes.filter(item => changedKeys.includes(item.key));
        const originValues = checkboxData.map(item => item.value);

        if (checkedList) {
            this.childNodeKeys = checkedList;
        }

        if (e.checked) {
            this.childNodeKeys.push(...originValues);
            this.childNodeKeys = [...new Set(this.childNodeKeys)];
        } else {
            this.childNodeKeys = difference(this.childNodeKeys, originValues);
        }

        if (onChange) {
            onChange(this.childNodeKeys);
        }

        this.setState({
            checkboxData,
            checkedList: this.childNodeKeys,
        });
    };

    // 勾选子节点
    onChangeChildKeys = (keys: Array<CheckboxValueType>): void => {
        const { checkedList, onChange } = this.props;

        const { checkboxData } = this.state;
        const originValues = checkboxData.map(item => item.value);
        const changedKeys = difference(originValues, keys);

        if (checkedList) {
            this.childNodeKeys = checkedList;
        }

        this.childNodeKeys.push(...keys);
        this.childNodeKeys = difference([...new Set(this.childNodeKeys)], changedKeys);

        if (onChange) {
            onChange(this.childNodeKeys);
        }

        this.setState({ checkedList: this.childNodeKeys });
    };

    // 根据初始数据得到所有子节点的数据集合
    renderCheckboxNodes = (data: Array<TreeDataProps>, key?: string): void => {
        data.forEach(item => {
            if (item.children) {
                this.renderCheckboxNodes(item.children, item.key);
            } else {
                this.childNodes.push({
                    key,
                    label: item.title,
                    value: item.key,
                });
            }
        });
    };

    renderTreeNodes = (data: Array<TreeDataProps>) =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return null;
        });

    render() {
        const { checkboxData, checkedList: checkedListState } = this.state;
        const { data, span, style, treeStyle, defaultExpandedKey, checkedList: checkedListProps } = this.props;
        // const checkedList = this.props.checkedList ? this.props.checkedList : this.state.checkedList;
        let checkedList = checkedListState;
        if (checkedListProps) {
            checkedList = checkedListProps;
        }
        const checkedKeys = getCheckedKeys(this.childNodes, checkedList);
        this.treeNodeKeys = checkedKeys.checked;
        // console.log("checkedList", checkedList);

        return (
            <div className="tree_selector_wrapper" style={style}>
                <div className="tree_wrapper" style={treeStyle}>
                    <Tree
                        checkable
                        checkStrictly
                        checkedKeys={checkedKeys}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        defaultExpandedKeys={[defaultExpandedKey]}
                    >
                        {this.renderTreeNodes(data)}
                    </Tree>
                </div>
                <div className="line" />
                <div className="checkbox_wrapper">
                    <EnhancedCheckbox
                        options={checkboxData}
                        checkedList={checkedList}
                        onChange={this.onChangeChildKeys}
                        isSelectAll={false}
                        span={span}
                    />
                </div>
            </div>
        );
    }
}

export default TreeSelector;
