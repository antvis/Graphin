import svg2marker from 'svg2marker';
import G6 from '@antv/g6';
import DEFAULT_ICONS from './inner';

export interface IconType {
  name: string;
  path: string;
}

export interface IconMap {
  [key: string]: { path: string };
}

export default (customIcons: IconType[]) => {
  const CUSTOM_ICONS: IconMap =
    customIcons &&
    customIcons.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: {
          path: curr.path,
        },
      };
    }, {});
  const icons = { ...DEFAULT_ICONS, ...CUSTOM_ICONS };
  Object.keys(icons).forEach(key => {
    G6.G.Marker.Symbols[key] = svg2marker(icons[key].path);
  });
};
