import { IconFontMapItem } from '../types';

export const ICON_FONT_FAMILY_MAP: {
  [key: string]: any[];
} = {};

export default (type: string, fontFamily: string) => {
  const selectedIconFont = ICON_FONT_FAMILY_MAP[fontFamily];
  // fontFamily not found
  if (!selectedIconFont) {
    console.warn(`fontFamily ${fontFamily} not found`);
    return '';
  }
  const icons = selectedIconFont.map((icon: IconFontMapItem) => {
    return {
      name: icon.name,
      unicode: String.fromCodePoint(icon.unicode_decimal),
    };
  });

  const matchIcon = icons.find(icon => {
    return icon.name === type;
  }) || { unicode: '', name: '' };

  return matchIcon.unicode;
};
