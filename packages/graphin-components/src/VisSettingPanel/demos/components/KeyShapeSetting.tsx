import * as React from 'react';
import Item from './Item';
import GraphinColorPick from './ColorPicker';
import { Slider } from 'antd';
import { NodeStyle } from '@antv/graphin';

// interface KeyShapeStyle {
//   /** 节点的主要容器 */
//   /** 节点的大小 */
//   size: [number] | [number, number];
//   /** 填充色 */
//   fill: string;
//   /** 包围边颜色 */
//   stroke: string;
// }

type KeyShapeStyle = NodeStyle['keyshape'];

interface KeyShapeSettingProps extends KeyShapeStyle {
  handleChange: (schema: { keyshape: Partial<KeyShapeStyle> }) => void;
}

const KeyShapeSetting: React.FunctionComponent<KeyShapeSettingProps> = (props) => {
  const { size = 26, fill, stroke, handleChange } = props;
  return (
    <>
      <Item title="大小">
        <Slider
          defaultValue={size[0] as number}
          onChange={(value) => {
            handleChange({ keyshape: { size: [Number(value)] } });
          }}
        />
      </Item>
      <Item title="描边颜色">
        <GraphinColorPick
          color={stroke as string}
          onChange={(value) => {
            handleChange({ keyshape: { stroke: value } });
          }}
        />
      </Item>
      <Item title="填充色">
        <GraphinColorPick
          color={fill as string}
          onChange={(value) => {
            handleChange({ keyshape: { fill: value } });
          }}
        />
      </Item>
    </>
  );
};

export default KeyShapeSetting;
