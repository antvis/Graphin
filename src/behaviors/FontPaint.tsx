import React from 'react';
import GraphinContext from '../GraphinContext';

const FontPaint = () => {
  const { graph } = React.useContext(GraphinContext);
  React.useEffect(() => {
    // Hack 写法，解决第一次加载不绘制 ICON FONT 的 BUG
    const timer = setTimeout(() => {
      graph.getNodes().forEach((node) => {
        graph.setItemState(node, 'normal', true);
      });
      graph.paint();
    }, 1600);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return null;
};

export default FontPaint;
