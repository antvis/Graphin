import * as React from 'react';
import Item from './Item';
import GraphinColorPick from './ColorPicker';
import { Slider } from 'antd';
import { NodeStyle } from '@antv/graphin';

type haloStyle = NodeStyle['halo'];

interface HaloSettingProps extends haloStyle {
  handleChange: (schema: { halo: Partial<haloStyle> }) => void;
}

const HaloSetting: React.FunctionComponent<HaloSettingProps> = (props) => {
  const { size, fill, stroke, handleChange } = props;
  return (
    <React.Fragment>
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
          color={stroke}
          onChange={(value) => {
            handleChange({ halo: { stroke: value } });
          }}
        />
      </Item>
      <Item title="填充色">
        <GraphinColorPick
          color={fill}
          onChange={(value) => {
            handleChange({ halo: { fill: value } });
          }}
        />
      </Item>
    </React.Fragment>
  );
};

export default HaloSetting;
