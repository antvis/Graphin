import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import iconLoader from '@antv/graphin-icons'

// Graphin.registerFontFamily(iconLoader)
const loader = iconLoader()
console.log(loader)

const { ZoomCanvas } = Behaviors;

const defaultIcon = {
  type: 'image',
  /** 根据类型，填写对应的值 */
  value: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
  /** 图标大小 */
  size: 12,
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: 'green',
  fontFamily: 'graphin'
}

const defaultBadge = {
  /** 放置的位置，ef：LT（left top）左上角 */
  position: 'LT',
  /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
  type: 'text',
  value: 'badge',
  // type = image 时表示图片的宽度和高度
  size: 10,
  /** 徽标填充色 */
  fill: 'pink',
  /** 徽标描边色 */
  stroke: 'green',
  /** 徽标内文本的颜色 */
  color: '#ccc',
  fontSize: 12
}

const data = Utils.mock(10)
  .circle()
  .graphinMock(null, defaultIcon as any, null);
const layout = {
  type: 'circular',
};

console.log('data', data)

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled={true} />
      </Graphin>
    </div>
  );
};
