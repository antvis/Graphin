import React from 'react';
import Graphin, { GraphinContext } from '@antv/graphin';

// 引入资源文件
import './iconfont.css';
import fonts from './iconfont.json';

// 生成iconLoader函数
const iconLoader = () => {
  return {
    fontFamily: 'iconfont',
    glyphs: fonts.glyphs,
  };
};

// 注册到 Graphin 中
const { fontFamily, glyphs } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

// 使用图标
const data = {
  nodes: glyphs.map((glyph) => {
    return {
      id: `node-${glyph.name}`,
      style: {
        icon: {
          type: 'font', // 指定图标为Font类型
          fontFamily, // 指定FontFamily
          value: icons[glyph.name], // 指定图标的值
        },
      },
    };
  }),
  edges: [],
};

const FontPaint = () => {
  const { graph } = React.useContext(GraphinContext);
  React.useEffect(() => {
    // Hack 写法，解决第一次加载不绘制 ICON FONT 的 BUG
    setTimeout(() => {
      console.log('paint...');
      graph.getNodes().forEach((node) => {
        // TODO 设置为Normal状态
        graph.setItemState(node, 'selected', true);
      });
      graph.paint();
    }, 16);
  });
  return null;
};
export default () => {
  return (
    <Graphin data={data}>
      <FontPaint />
    </Graphin>
  );
};
