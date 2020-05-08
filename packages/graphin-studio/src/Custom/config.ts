import nodeTypes from '../Service/Mock/nodeTypes';

const colors = [
  '#515151',
  '#9900EF',
  '#FF6900',
  '#00D084',
  '#ABB8C3',
  '#0693E3',
  '#FF7A45',
  '#9254DE',
  '#FF4D4F',
  '#73D13D',
  '#F759AC',
  '#FFA941',
  '#35CFC9',
  '#FFC53D',
  '#40A9FF',
  '#597EF7',
  '#FFEC3E',
  '#BAE637',
];
const floorRandom = (number: number) => {
  return Math.floor(Math.random() * number);
};
const randomColor = (opacity = 1) => {
  const r = floorRandom(255);
  const g = floorRandom(255);
  const b = floorRandom(255);
  const color = `rgba(${r},${g},${b},${opacity})`;
  return color;
};

const style = {
  /** 节点的大小 */
  nodeSize: 20,
  /** 节点的主要颜色 */
  primaryColor: '#9900EF',
  /** 文本的字体大小 */
  fontSize: 12,
  /** 文本的字体颜色 */
  fontColor: '#3b3b3b',
  /** dark 置灰 */
  dark: '#eee',
  line: {
    color: '#9900EF',
  }
};
export interface BizType {
  /** 节点的类型 */
  type: string;
  /** 节点的类型名称 */
  name: string;
  /** 节点的样式 */
  style: any; // eslint-disable-line
}

const bizTypes: BizType[] = nodeTypes.map((node, index) => {
  return {
    type: node.nodeType,
    name: node.name,
    style: {
      ...style,
      ...{
        primaryColor: colors[index] || randomColor(),
        line: {
          color: colors[index] || randomColor(),
        }
      }
    },
  };
});

export { colors, bizTypes };
