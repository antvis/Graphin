export const registerFontFamily = iconLoader => {
  /**  注册 font icon */
  const iconFont = iconLoader();
  const { glyphs, fontFamily } = iconFont;
  const icons = glyphs.map(item => {
    return {
      name: item.name,
      unicode: String.fromCodePoint(item.unicode_decimal),
    };
  });

  return new Proxy(icons, {
    get: (target, propKey: string) => {
      const matchIcon = target.find(icon => {
        return icon.name === propKey;
      });
      if (!matchIcon) {
        console.error(`%c fontFamily:${fontFamily},does not found ${propKey} icon`);
        return '';
      }
      return matchIcon?.unicode;
    },
  });
};
