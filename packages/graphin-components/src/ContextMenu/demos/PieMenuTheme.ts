import { css } from 'styled-components';

const theme = {
  pieMenu: {
    container: css`
      display: inline-block;
      position: ${({ centerX, centerY }) => (centerX || centerY ? 'absolute' : 'relative')};
      top: calc(${({ centerY }) => centerY} - ${({ radius }) => radius});
      left: calc(${({ centerX }) => centerX} - ${({ radius }) => radius});
      border-radius: 50%;
      overflow: hidden;
    `,
    list: css`
      position: relative;
      list-style: none;
      padding: 0;
      margin: 0;
      border-radius: 50%;
      width: calc(2 * ${({ radius }) => radius});
      height: calc(2 * ${({ radius }) => radius});
    `,
    item: css`
      width: ${({ centralAngle }) => (centralAngle > 90 ? '100%' : '50%')};
      height: ${({ centralAngle }) => (centralAngle > 90 ? '100%' : '50%')};
      bottom: ${({ centralAngle }) => (centralAngle > 90 ? '50%' : 'initial')};
      right: ${({ centralAngle }) => (centralAngle > 90 ? '50%' : 'initial')};
      position: absolute;
      transform: rotate(${({ startAngle, endAngle }) => startAngle + endAngle}deg) skew(${({ skew }) => skew}deg);
      transform-origin: bottom right;
      overflow: hidden;
      border: 2px solid radial-gradient(transparent 10 #3477de 100});
    `,
    center: css`
      position: absolute;
      border-radius: 50%;
      background: transparent;
      border: 2px solid #3477de;
      top: calc(50% - ${({ centerRadius }) => centerRadius});
      left: calc(50% - ${({ centerRadius }) => centerRadius});
      width: calc(2 * ${({ centerRadius }) => centerRadius});
      height: calc(2 * ${({ centerRadius }) => centerRadius});
    `,
  },
  slice: {
    container: css`
      cursor: pointer;
      width: 200%;
      height: 200%;
      transform-origin: 50% 50%;
      border-radius: 50%;
      transform: ${({ skew, polar, centralAngle }) =>
        `skew(${-skew}deg) rotate(${(polar ? 90 : centralAngle) / 2 - 90}deg)`};
      color: #000;
      background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, white ${centerRadius}`});
      border: 5px solid #3477de;
      outline: none;
      &:hover {
        color: white;
        background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius},  #3477de ${centerRadius}`});
      }
    `,
    contentContainer: css`
      position: absolute;
      width: 100%;
      text-align: center;
      top: ${({ radius, centralAngle, centerRadius, contentHeight }) =>
        `calc((${centralAngle > 90 ? '50% + ' : ''}${radius} - ${centerRadius}) / 2 - ${contentHeight} / 2)`};
    `,
    content: css`
      display: inline-block;
      transform: rotate(${({ angle }) => -angle}deg);
    `,
  },
};
export default theme;
