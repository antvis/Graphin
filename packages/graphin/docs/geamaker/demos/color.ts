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
    mainFill: '#e91e63',
  },
  {
    mainFill: '#d05ce3',
  },
  {
    mainFill: '#9a67ea',
  },
  {
    mainFill: '#607d8b',
  },
  {
    mainFill: '#3f51b5',
  },
  {
    mainFill: '#2196f3',
  },
  {
    mainFill: '#62efff',
  },
  {
    mainFill: '#4caf50',
  },
  {
    mainFill: '#ff9800',
  },
  {
    mainFill: '#795548',
  },
  {
    mainFill: '#ff5722',
  },

  // #00e676
];
const clusterColorMap = new Map();
export { clusterColorMap, colorSets };
