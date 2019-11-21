import fonts from '../fonts/iconfont.json';
import { IconFontMapItem, ExtendIcon } from '../types';

const ICON_FONT_FAMILY_MAP: {
    [key: string]: IconFontMapItem[];
} = {};

export const registerFontFamily = (extendIcons: ExtendIcon[]): void => {
    ICON_FONT_FAMILY_MAP.graphin = fonts.glyphs as IconFontMapItem[];
    extendIcons.forEach(item => {
        ICON_FONT_FAMILY_MAP[item.fontFamily] = item.map;
    });
};

export default (type: string, fontFamily: string) => {
    const icons = ICON_FONT_FAMILY_MAP[fontFamily].map((icon: IconFontMapItem) => {
        return {
            name: icon.name,
            unicode: String.fromCodePoint(icon.unicode_decimal),
        };
    });

    const matchIcon = icons.find(icon => {
        return icon.name === type;
    }) || { unicode: String.fromCodePoint(59302), name: 'thumbs-up' };
    return matchIcon.unicode;
};
