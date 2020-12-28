import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors,GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons'

const iconLoader = Graphin.registerFontFamily(IconLoader)
const iconValue = iconLoader.home
const { ZoomCanvas } = Behaviors;

const defaultIcon = {
  type: 'font',
  /** 根据类型，填写对应的值 */
  value: iconValue,
  /** 图标大小 */
  size: 12,
  /** 图标填充颜色 / 文本填充色 / 图片此属性无效 */
  fill: 'green',
  fontFamily: 'graphin'
}
const  EventCenter =()=>{
  const { graph } = React.useContext(GraphinContext)
  useEffect(()=>{
    graph.on('node:mouseenter',(evt)=>{
      graph.setItemState(evt.item, 'hover', true)
    })

    graph.on('node:mouseleave',(evt)=>{
      graph.setItemState(evt.item, 'hover', false)
    })
  },[])
 
  return null
}

const defaultBadge = [
  {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'RT',
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'font',
    value: iconValue,
    // type = image 时表示图片的宽度和高度
    size: [20, 10],
    /** 徽标填充色 */
    fill: 'pink',
    /** 徽标描边色 */
    stroke: 'green',
    /** 徽标内文本的颜色 */
    color: '#000',
    fontSize: 12,
    padding: 2,
    offset: [0, 0]
  },
  {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'LB',
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'text',
    value: '12',
    // type = image 时表示图片的宽度和高度
    size: 20,
    /** 徽标填充色 */
    fill: 'pink',
    /** 徽标描边色 */
    stroke: 'green',
    /** 徽标内文本的颜色 */
    color: '#000',
    fontSize: 12,
    padding: 0,
    offset: [0, 0]
  },
  {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'RB',
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'image',
    value: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
    // type = image 时表示图片的宽度和高度
    size: 10,
    /** 徽标填充色 */
    fill: 'pink',
    /** 徽标描边色 */
    stroke: 'green',
    padding: 5,
    offset: [0, 0]
  },
  {
    /** 放置的位置，ef：LT（left top）左上角 */
    position: 'LT',
    /** 类型可以为字体图标，可以为网络图片，可以为纯文本 */
    type: 'text',
    value: '999+',
    // type = image 时表示图片的宽度和高度
    size: [25, 15],
    /** 徽标填充色 */
    fill: 'pink',
    color: '#000',
    /** 徽标描边色 */
    stroke: 'green',
    padding: 5,
    offset: [3, 3]
  }
]

const data = Utils.mock(10)
  .circle()
  .graphinMock(null, defaultIcon as any);
const layout = {
  type: 'circular',
};


export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled={true} />
        <EventCenter />
      </Graphin>
    </div>
  );
};
