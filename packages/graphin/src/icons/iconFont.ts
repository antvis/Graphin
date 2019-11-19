import fonts from '../fonts/iconfont.json';

const icons = fonts.glyphs.map(icon => {
    return {
        name: icon.name,
        unicode: String.fromCodePoint(icon.unicode_decimal), // `\u${icon.unicode}`,
    };
});

export default (type: string) => {
    const matchIcon = icons.find(icon => {
        return icon.name === type;
    }) || { unicode: String.fromCodePoint(58882), name: 'graphin' };
    return matchIcon.unicode;
};
