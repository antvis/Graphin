import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './index.less';

const CheckboxGroup = Checkbox.Group;

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
    label: React.ReactNode;
    value: CheckboxValueType;
    disabled?: boolean;
}

export interface CheckboxProps {
    /** 指定可选项  */
    options?: Array<CheckboxOptionType | string>;
    /** 被选中时调用  */
    checkedList?: Array<CheckboxValueType>;
    /** 变化时回调函数  */
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
    /** 栅格占位格数 */
    span?: number;
    /**
     * <@default=true>
     * 是否需要全选项
     */
    isSelectAll?: boolean;
}

interface InitialState {
    indeterminate: boolean;
    checkAll: boolean;
}

const EnhancedCheckbox: React.SFC<CheckboxProps> = props => {
    const { options = [], checkedList = [], onChange, span, isSelectAll = true } = props;

    const [state, setState] = useState<InitialState>({
        indeterminate: true,
        checkAll: false,
    });
    const { indeterminate, checkAll } = state;

    useEffect(() => {
        let isPart = true;
        let isAll = false;
        switch (true) {
            case checkedList.length === options.length:
                isPart = false;
                isAll = true;
                break;
            case checkedList.length === 0:
                isPart = false;
                break;
            default:
                break;
        }

        setState({
            indeterminate: isPart,
            checkAll: isAll,
        });
    }, [checkedList.length, options.length]);

    const onChangeValue = (value: Array<CheckboxValueType>): void => {
        if (onChange) {
            onChange(value);
        }
        setState({
            indeterminate: !!value.length && value.length < options.length,
            checkAll: value.length === options.length,
        });
    };

    const onCheckAllChange = (e: CheckboxChangeEvent): void => {
        const isCheckAll = e.target.checked;
        if (onChange) {
            const allCheckedList = options.map(item => (typeof item === 'string' ? item : item.value));
            // isCheckAll ? onChange(allCheckedList) : onChange([]);
            if (isCheckAll) {
                onChange(allCheckedList);
            } else {
                onChange([]);
            }
        }

        setState({
            indeterminate: false,
            checkAll: isCheckAll,
        });
    };

    const filterValue = (): Array<CheckboxValueType> => {
        return checkedList.filter(v => {
            const allCheckedList = options.map(item => (typeof item === 'string' ? item : item.value));
            return allCheckedList.includes(v);
        });
    };

    return (
        <div className="enhanced_checkbox_wrapper">
            <Checkbox
                className="all_select"
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                style={{ display: isSelectAll ? 'inine-block' : 'none' }}
            >
                全选
            </Checkbox>
            <CheckboxGroup value={filterValue()} onChange={onChangeValue}>
                <Row>
                    {isSelectAll ? <Col className="single_checkbox" /> : null}
                    {options.map(item => {
                        const value = typeof item === 'string' ? item : item.value;
                        const label = typeof item === 'string' ? item : item.label;
                        return (
                            <Col key={String(value)} span={span || undefined} className="single_checkbox">
                                <Checkbox value={value}>{label}</Checkbox>
                            </Col>
                        );
                    })}
                </Row>
            </CheckboxGroup>
        </div>
    );
};

export default EnhancedCheckbox;
