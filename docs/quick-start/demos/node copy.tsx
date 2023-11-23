import React from 'react';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
import { Row, Col, Card } from 'antd';

const icons = Graphin.registerFontFamily(iconLoader);

const md = `

- keyshape：是节点的主要形状，即圆形容器，可以在这里设置节点的大小，border，填充色
- label：是节点的标签，可以设置标签的值 和样式：放置方位，大小，字体颜色，偏移位置
- icon：是节点的中心 ICON 区域，icon 可以是图片，可以是文本，也可以是字体图标。
- badges：是节点的徽标区域，是一个数组，可以分别在不同方位放置，其内容区域可以是文本，数字，也可以是图标。
- halo：是节点的光环，在节点交互过程中（hover，selected，disabled，active）等，可以打开光环，默认是隐藏的，也可以自定义
- status：是节点的交互样式，默认 Graphin 已经内置了交互样式（即将 halo 图形显示出来），也可以自定义

不过不要被这么多参数吓住了，Graphin 内置了 Utils.genDefaultNodeStyle 工具函数，帮助我们快速根据主题样式生成这些配置参数，也可以通过 <Graphin defaultNode={{Utils.genDefaultNodeStyle()}}>  将所有节点都设置上一个默认的样式，这快在我们自定义样式章节会详细说明。下图是一些展示案例，我们可以跳过配置细节。大致有个初步映像：Graphin 内置的节点样式是可以一份配置文件解决许多样式自定义问题～
`;
const defaultStyle = {
  keyshape: {
    lineWidth: 3,
    size: 80,
    stroke: '#FF6A00',
    fill: Utils.hexToRgbaToHex('#FF6A00', 0.2),
    opacity: 1,
    cursor: 'pointer',
  },
  label: {
    /** label的名称 */
    value: '节点-0',
    /** 展示位置  'top' | 'bottom' | 'left' | 'right' | 'center'; */
    position: 'top',
    /** 文本填充色 */
    fill: '#000',
    /** 文本大小 */
    fontSize: 16,
    fontFamily: 'normal',
    textAlign: 'center',
    /** 文本在各自方向上的偏移量，主要为了便于调整文本位置 */
    offset: 0,
  },
  icon: {
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 'font' | 'image' | 'text' */
    type: 'font',
    /** 根据类型，填写对应的值 */
    value: icons.user,
    /** 图标大小 */
    size: 40,
    fill: '#FF6A00',
    fontFamily: 'graphin',
  },
  badges: [
    {
      /** 放置的位置，ef：LT（left top）左上角 */
      position: 'RT',
      /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
      type: 'text',
      value: '10',
      // type = image 时生效，表示图片的宽度和高度
      size: [25, 25],
      /** 徽标填充色 */
      fill: Utils.hexToRgbaToHex('#FF6A00', 1),
      /** 徽标描边色 */
      stroke: '',
      /** 徽标内文本的颜色 */
      color: '#fff',
      fontSize: 14,
      fontFamily: '',
      // badge 中文本距离四周的偏移量
      padding: 0,
      // badge 在 x 和 y 方向上的偏移量
      offset: [0, 0],
    },
    {
      /** 放置的位置，ef：LT（left top）左上角 */
      position: 'LB',
      /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
      type: 'text',
      value: 'Pin',
      // type = image 时生效，表示图片的宽度和高度
      size: [25, 25],
      /** 徽标填充色 */
      fill: Utils.hexToRgbaToHex('#FF6A00', 1),
      /** 徽标描边色 */
      stroke: '',
      /** 徽标内文本的颜色 */
      color: '#fff',
      fontSize: 12,
      fontFamily: '',
      // badge 中文本距离四周的偏移量
      padding: 0,
      // badge 在 x 和 y 方向上的偏移量
      offset: [0, 0],
    },
  ],
  halo: {
    fill: Utils.hexToRgbaToHex('#FF6A00', 0.2),
    opacity: 1,
    visible: false,
    cursor: 'pointer',
  },
  status: {
    hover: {
      halo: {
        visible: true,
      },
    },
    selected: {
      halo: {
        visible: true,
      },
      keyshape: {
        lineWidth: 10,
      },
    },
  },
};

const style2 = Utils.genDefaultNodeStyle({
  nodeSize: 40,
  primaryColor: '#FF6A00',
  mode: 'light',
});
console.log('style2', style2);
const data = {
  nodes: [
    {
      id: 'node-0',
      x: 200,
      y: 240,
      style: defaultStyle,
    },
    {
      id: 'node-1',
      x: 300,
      y: 300,
      style: Utils.deepMerge({}, style2.defaultNodeStyle.style, {
        label: {
          value: '节点-1',
        },

        icon: {
          type: 'text',
          value: '图标',
          fontSize: 12,
        },
      }),
    },
    {
      id: 'node-2',
      x: 300,
      y: 150,
      style: {
        keyshape: {
          size: 50,
        },
        label: {
          position: 'right',
          value: '节点-2',
          offset: [5, 5],
        },
        icon: {
          /** 类型可以为字体图标，可以为网络图片，可以为纯文本 'font' | 'image' | 'text' */
          type: 'image',
          /** 根据类型，填写对应的值 */
          value: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          /** 图标大小 */
          size: [20, 20],
        },
      },
    },
  ],
  edges: [],
};

const { ZoomCanvas } = Behaviors;

export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="关系数据" bodyStyle={{ height: '554px', overflow: 'scroll' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="可视化结果">
            <Graphin data={data} layout={{ type: 'preset' }}>
              <ZoomCanvas disabled />
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
