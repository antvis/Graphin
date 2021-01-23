import * as React from 'react';
import Item from './Item';
import GraphinColorPick from './ColorPicker';
import { Slider } from 'antd';
import { NodeStyle } from '@antv/graphin';

type HaloStyle = NodeStyle['halo'];

interface HaloSettingProps extends HaloStyle {
  handleChange: (schema: { halo: Partial<HaloStyle> }) => void;
}

const HaloSetting: React.FunctionComponent<HaloSettingProps> = (props) => {
  const { size = 26, fill, stroke, handleChange } = props;

  return (
    <>
      <Item title="大小">
        <Slider
          defaultValue={size[0]}
          onChange={(value) => {
            handleChange({ halo: { size: [Number(value)] } });
          }}
        />
      </Item>
      <Item title="描边颜色">
        <GraphinColorPick
          color={stroke as string}
          onChange={(value) => {
            handleChange({ halo: { stroke: value } });
          }}
        />
      </Item>
      <Item title="填充色">
        <GraphinColorPick
          color={fill as string}
          onChange={(value) => {
            handleChange({ halo: { fill: value } });
          }}
        />
      </Item>
    </>
  );
};

export default HaloSetting;
