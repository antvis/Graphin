import _ from 'lodash';
import { CheckboxDataProps, CheckboxValueType } from '../interface';

interface GroupedItemsProps {
    groups: Array<CheckboxDataProps>;
    key: string;
}

// 树节点的勾选状态
const getCheckedKeys = (data: Array<CheckboxDataProps>, checkedList: Array<CheckboxValueType>) => {
    const checked: Array<string> = [];
    const halfChecked: Array<string> = [];
    const groupedItems = _(data)
        .groupBy((item: CheckboxDataProps) => item.key)
        .map((groups: Array<CheckboxDataProps>, key: string) => {
            return {
                key,
                groups,
            };
        })
        .value();

    groupedItems.forEach((item: GroupedItemsProps) => {
        const { groups } = item;
        const filterItems = groups.filter(e => checkedList.includes(e.value));

        if (groups.length === filterItems.length) {
            checked.push(item.key);
        }

        if (filterItems.length && groups.length > filterItems.length) {
            halfChecked.push(item.key);
        }
    });

    return {
        checked,
        halfChecked,
    };
};
export default getCheckedKeys;
