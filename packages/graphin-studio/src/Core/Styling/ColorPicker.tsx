import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { ColorPickerProps, ColorProps, ColorSpanProps } from './interface';

const ColorSpan = (props: ColorSpanProps) => {
    const { color, onClick } = props;
    const styles = {
        background: color,
        height: '20px',
        width: '20px',
        borderRadius: '4px',
    };
    const text = '';
    return (
        <div role="button" tabIndex={0} style={styles} onClick={onClick} onKeyPress={onClick}>
            {text}
        </div>
    );
};

const ColorPicker: React.FC<ColorPickerProps> = props => {
    const { defaultColor } = props;
    const [state, setState] = useState({
        color: defaultColor,
        isOpen: false,
    });
    const { type, name } = props;
    const { color, isOpen } = state;

    const toogleColorPicker = () => {
        setState({
            ...state,
            isOpen: !isOpen,
        });
    };
    const changeColor = (e: ColorProps) => {
        setState({
            ...state,
            color: e.hex,
        });

        props.onChange(props.type, e.hex);
    };

    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
    };
    return (
        <div>
            <div style={styles}>
                {name} {type}
                <ColorSpan isOpen={isOpen} color={color} onClick={toogleColorPicker} />
            </div>
            {isOpen && <TwitterPicker color={color} onChangeComplete={changeColor} />}
        </div>
    );
};

export default ColorPicker;
