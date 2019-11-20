import fonts from '../fonts/iconfont.json';

interface Icon {
    font_class: string;
    unicode_decimal: number;
}

const icons = fonts.glyphs.map((icon: Icon) => {
    return {
        name: icon.font_class,
        unicode: String.fromCodePoint(icon.unicode_decimal),
    };
});

export default (type: string, fontFamily: string) => {
    const matchIcon = icons.find(icon => {
        return icon.name === type;
    }) || { unicode: String.fromCodePoint(59302), name: 'thumbs-up' };
    return matchIcon.unicode;
};
