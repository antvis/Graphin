// 资源地址：https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3381398&keyword=&project_type=&page=

import { createFromIconfontCN } from '@ant-design/icons';
import { loadFontJson, loadUnicodeFont, type FontJson } from './loader';
import { registerFontFamily } from './registerFontFamily';

export const fontFamily = 'iconfont';

// --- 注册 font icon ---

let icons = registerFontFamily(() => ({ fontFamily, glyphs: [] }));
let glyphs: FontJson['glyphs'] = [];

async function loadFontsJson(ids: string[]) {
  const fonts = await Promise.all(ids.map(id => loadFontJson(id)));
  // 合并所有字体
  const _glyphs = fonts.reduce((acc, curr) => {
    acc.push(...curr.glyphs);
    return acc;
  }, [] as FontJson['glyphs']);

  glyphs = _glyphs;
  icons = registerFontFamily(() => ({
    fontFamily,
    glyphs: _glyphs.map(item => {
      return {
        ...item,
        name: item.font_class, //统一为font class
      };
    }),
  }));
  return icons;
}

// --- 注册 antd iconfont ---
const registeredIds = new Set<string>();
const builtInIconFontId = 'font_3381398_29c1c449r6f';
const getIconfontScriptUrl = (id: string) => `//at.alicdn.com/t/a/${id}.js`;

async function loadUnicodeFonts(ids: string[]) {
  await Promise.all(ids.map(id => loadUnicodeFont(id)));
}

export async function registerIconFonts(ids: string[] = [builtInIconFontId]) {
  const unregisteredIds = ids.filter(id => !registeredIds.has(id));

  if (!unregisteredIds.length) return icons;

  // register
  createFromIconfontCN({
    scriptUrl: unregisteredIds.map(getIconfontScriptUrl),
  });

  const [ICONS] = await Promise.all([loadFontsJson(unregisteredIds), loadUnicodeFonts(unregisteredIds)]);
  unregisteredIds.forEach(id => registeredIds.add(id));
  return ICONS;
}

export function getFontIcons() {
  return icons;
}
