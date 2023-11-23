import React from 'react';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons';
import { Row, Col, Card } from 'antd';

const icons = Graphin.registerFontFamily(iconLoader);
const parimaryColor = '#ff6a00';
const data = {
  nodes: [
    {
      id: 'node-0',
      x: 200,
      y: 240,
      style: {
        // 节点的主要形状，即圆形容器，可以在这里设置节点的大小，border，填充色
        keyshape: {
          /** 容器的宽度 */
          lineWidth: 3,
          /** 节点的大小 */
          size: 80,
          /** 包围边颜色 */
          stroke: parimaryColor,
          /** 填充色 */
          fill: parimaryColor,
          /** 填充色的透明度 */
          fillOpacity: 0.2,
          /** 透明度 */
          opacity: 1,
          /** 鼠标样式 */
          cursor: 'pointer',
        },
        // 是节点的标签，可以设置标签的值 和样式：放置方位，大小，字体颜色，偏移位置
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
          offset: [0, 10],
        },
        // // 是节点的中心 ICON 区域，icon 可以是图片，可以是文本，也可以是字体图标。
        icon: {
          /** 类型可以为字体图标，可以为网络图片，可以为纯文本 'font' | 'image' | 'text' */
          type: 'font',
          /** 根据类型，填写对应的值 */
          value: icons.user,
          /** 图标大小 */
          size: 40,
          /** 字体图标的填充色 */
          fill: parimaryColor,
          /** 字体Family */
          fontFamily: 'graphin',
        },
        // // 节点的徽标区域，是一个数组，可以分别在不同方位放置，其内容区域可以是文本，数字，也可以是图标。
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
            fill: parimaryColor,
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
            fill: Utils.hexToRgbaToHex(parimaryColor, 1),
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
        // // 节点的光环，在节点交互过程中（hover，selected，disabled，active）等，可以打开光环，默认是隐藏的，也可以自定义
        halo: {
          /** 光晕 */
          fill: parimaryColor,
          /** 透明度 */
          fillOpacity: 0.1,
          /** 是否展示 */
          visible: false,
          /** 鼠标Hover上去样式 */
          cursor: 'pointer',
        },
        // 节点的交互样式，默认 Graphin 已经内置了交互样式（即将 halo 图形显示出来），也可以自定义
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
            <pre>
              {`
{
  nodes: [
    {
      id: 'node-0',
      x: 200,
      y: 240,
      style: {
        // 节点的主要形状，即圆形容器，可以在这里设置节点的大小，border，填充色
        keyshape: {
          /** 容器的宽度 */
          lineWidth: 3,
          /** 节点的大小 */
          size: 80,
          /** 包围边颜色 */
          stroke: parimaryColor,
          /** 填充色 */
          fill: Utils.hexToRgbaToHex(parimaryColor, 0.2),
          /** 透明度 */
          opacity: 1,
          /** 鼠标样式 */
          cursor: 'pointer',
        },
        // 是节点的标签，可以设置标签的值 和样式：放置方位，大小，字体颜色，偏移位置
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
        // 是节点的中心 ICON 区域，icon 可以是图片，可以是文本，也可以是字体图标。
        icon: {
          /** 类型可以为字体图标，可以为网络图片，可以为纯文本 'font' | 'image' | 'text' */
          type: 'font',
          /** 根据类型，填写对应的值 */
          value: icons.user,
          /** 图标大小 */
          size: 40,
          /** 字体图标的填充色 */
          fill: parimaryColor,
          /** 字体Family */
          fontFamily: 'graphin',
        },
        // 节点的徽标区域，是一个数组，可以分别在不同方位放置，其内容区域可以是文本，数字，也可以是图标。
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
            fill: Utils.hexToRgbaToHex(parimaryColor, 1),
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
            fill: Utils.hexToRgbaToHex(parimaryColor, 1),
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
        // 节点的光环，在节点交互过程中（hover，selected，disabled，active）等，可以打开光环，默认是隐藏的，也可以自定义
        halo: {
          /** 光晕 */
          fill: Utils.hexToRgbaToHex(parimaryColor, 0.2),
          /** 透明度 */
          opacity: 1,
          /** 是否展示 */
          visible: false,
          /** 鼠标Hover上去样式 */
          cursor: 'pointer',
        },
        // 节点的交互样式，默认 Graphin 已经内置了交互样式（即将 halo 图形显示出来），也可以自定义
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
      },
    },
  ],
  edges: [],
}
  
  `}
            </pre>
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
