type NodeTypes = {
    /** 类型名称 */
    name: string;
    /** 类型 */
    nodeType: string;
};
const nodeTypes: NodeTypes[] = [
    { name: '公司', nodeType: 'company' },
    { name: '手机号码', nodeType: 'phone' },
    { name: '邮箱', nodeType: 'mail' },
];
export default nodeTypes;
