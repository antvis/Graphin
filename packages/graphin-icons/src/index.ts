import fonts from './fonts.json';
import './index.less';

export default () => {
  return [
    {
      fontFamily: 'graphin',
      map: fonts.glyphs,
    },
  ];
};
