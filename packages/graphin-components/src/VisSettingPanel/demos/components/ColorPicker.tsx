/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  onChange: (color: string) => void;
  color: string;
}
interface ColorPickerState {
  colors: string[];
  visible: boolean;
  value: string;
}
const styles = {
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    padding: '5px',
    border: '5px solid #ddd',
    display: 'inline-block',
    textAlign: 'top',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
};
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
      // visible: false,
      value: value.hex,
    });
  };
  const handleClick = () => {
    setState({
      ...state,
      visible: !state.visible,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const { visible, value } = state;

  return (
    <div>
      <div style={{ ...styles.color, background: value }} onClick={handleClick} />
      <div style={{ display: 'inline-block', paddingLeft: '15px' }}> {value}</div>
      <div style={styles.popover} onClick={handleClose}>
        {visible && <ChromePicker onChange={handleChange} color={color} />}
      </div>
    </div>
  );
};

export default ColorPicker;
