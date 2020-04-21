type EdgeTypes = {
  /** 类型名称 */
  name: string;
  /** 类型 */
  nodeType: string;
  children?: Array<EdgeTypes>;
};
const edgeTypes: EdgeTypes[] = [
  { name: '强弱关系', nodeType: 'UID', children: [{ name: '强-综合', nodeType: 'STRONG_SUM' }] },
  { name: '社会关系', nodeType: 'CERTNO', children: [{ name: '弱-社交', nodeType: 'WEAK_SNS' }] },
  { name: '媒介关系', nodeType: 'BANKCARD', children: [{ name: '强-媒介', nodeType: 'STRONG_MEDIA' }] },
];
export default edgeTypes;
