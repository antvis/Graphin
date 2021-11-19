export const uniqBy = (
  arr: any[], // eslint-disable-line
  fn: (a: any, b: any) => boolean, // eslint-disable-line
) =>
  arr.reduce((acc, v) => {
    // @ts-ignore
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
