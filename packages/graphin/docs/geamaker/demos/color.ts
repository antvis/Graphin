import G6 from '@antv/g6';

const darkBackColor = '#5F95FF';
const disableColor = '#777';
const theme = 'light';
const subjectColors = [
  '#5F95FF', // blue
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

// const colorSets = G6.Util.getColorSetsBySubjectColors(subjectColors, darkBackColor, theme, disableColor);

const colorSets = [
  {
    mainFill: '#5b8ff9',
  },
  {
    mainFill: '#5ad8a6',
  },
  {
    mainFill: '#5d7092',
  },
  {
    mainFill: '#f6bd16',
  },
  {
    mainFill: '#e8684a',
  },
  {
    mainFill: '#6dc8ec',
  },
  {
    mainFill: '#9270CA',
  },
  {
    mainFill: '#ff9d4d',
  },
  {
    mainFill: '#269a99',
  },
  {
    mainFill: '#ff99c3',
  },
  {
    mainFill: '#ff5722',
  },
];

const clusterColorMap = new Map();
export { clusterColorMap, colorSets };
