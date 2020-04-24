/* eslint-disable import/prefer-default-export */
export interface NormalizedColor {
  dark: string;
  normal: string;
  reflect: string;
}

function normalizeColor(rgb: string | [number, number, number] | NormalizedColor): NormalizedColor {
  if (Array.isArray(rgb)) {
    return {
      dark: `rgba(${rgb.join(',')}, 0.7)`,
      normal: `rgba(${rgb.join(',')}, 1)`,
      reflect: `rgba(${rgb.join(',')}, 0.1)`,
    };
  }
  if (typeof rgb === 'string') {
    return {
      dark: rgb,
      normal: rgb,
      reflect: rgb,
    };
  }
  return rgb as NormalizedColor;
}

export { normalizeColor };
