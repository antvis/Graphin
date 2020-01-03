/* eslint-disable */

export const getCanvasEventCount = (getByTestId: any) => {
  let canvas = getByTestId('custom-element').firstChild as HTMLCanvasElement;
  let ctx = canvas.getContext('2d') as any;
  return ctx.__getEvents().length;
};

export const getCanvasPathCount = (getByTestId: any) => {
  let canvas = getByTestId('custom-element').firstChild as HTMLCanvasElement;
  let ctx = canvas.getContext('2d') as any;
  return ctx.__getPath().length;
};

export const wait = (time = 100) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
