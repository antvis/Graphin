import React from 'react';
import { Button } from 'antd';
import { TwitterPicker } from 'react-color';

interface ColorPickerProps {
  onChange: (color: string) => void;
  color: string;
}
interface ColorPickerState {
  colors: string[];
  visible: boolean;
  value: string;
}
const ColorPicker = (props: ColorPickerProps) => {
  const { onChange, color } = props;

  const [state, setState] = React.useState<ColorPickerState>({
    colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3'],
    visible: false,
    value: color,
  });

  const handleChange = (value: { hex: string }) => {
    onChange(value.hex);
    setState({
      ...state,
      visible: false,
      value: value.hex,
    });
  };
  const handleClick = () => {
    setState({
      ...state,
      visible: !state.visible,
    });
  };

  const { visible, colors, value } = state;

  return (
    <div>
      <Button style={{ background: value }} shape="circle" size="small" onClick={handleClick}></Button>
      <div style={{ display: 'inline-block', paddingLeft: '15px' }}> {value}</div>
      {visible && <TwitterPicker width="100%" colors={colors} onChange={handleChange} color={color} />}
    </div>
  );
};

export default ColorPicker;
