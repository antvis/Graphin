/**
 * @file Icon loader
 */

/**
 * @description 获取图标字体资源的方式，离线方式需要将字体资源放到本地，供私有化部署使用
 */
type Mode = 'online' | 'offline';

export type FontJson = {
  id: string;
  name: string;
  font_family: string;
  css_prefix_text: string;
  description: string;
  glyphs: {
    icon_id: string;
    name: string;
    font_class: string;
    unicode: string;
    unicode_decimal: number;
  }[];
};

/**
 * @description 加载 unicode json 资源
 */
export async function loadFontJson(id: string, mode: Mode = 'online', url?: string): Promise<FontJson> {
  if (mode === 'online') {
    const _url = url || `https://at.alicdn.com/t/a/${id}.json`;
    const json: FontJson = await fetch(_url).then(res => res.json());
    return json;
  }
  /**
   * @description TODO offline
   * @example 私有化部署示例
   *
   * import font from './path/to/font.json';
   * return font;
   */
  return { id: '', name: '', font_family: '', css_prefix_text: '', description: '', glyphs: [] };
}

/**
 * @description 加载 unicode 字体
 */
export async function loadUnicodeFont(id: string, mode: Mode = 'online') {
  if (mode === 'online') {
    const fontList = [
      {
        fontUrl: `//at.alicdn.com/t/a/${id}.woff2`,
        format: 'woff2',
      },
      {
        fontUrl: `//at.alicdn.com/t/a/${id}.woff`,
        format: 'woff',
      },
      {
        fontUrl: `//at.alicdn.com/t/a/${id}.ttf`,
        format: 'truetype',
      },
    ];
    const load = async (fontFamily: string, fontUrl: string) => {
      const font = new FontFace(fontFamily, `url(${fontUrl})`);
      await font.load();
      //@ts-ignore
      document.fonts.add(font);
    };

    await Promise.all(fontList.map(({ fontUrl }) => load('iconfont', fontUrl)));
  } else {
    // TODO: offline
  }
}
