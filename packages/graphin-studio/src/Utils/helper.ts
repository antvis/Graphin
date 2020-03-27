/**
 * @example uniqueElementsBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
 * 
 * @param {*} arr 
 * @param {*} fn 
 * @category Utils
 */
const uniqueElementsBy = <T>(
    arr: T[], // eslint-disable-line
    fn: (a: T, b: T) => boolean, // eslint-disable-line
) =>
    arr.reduce((acc, v) => {
        if (!acc.some((x) => fn(v, x))) acc.push(v);
        return acc;
    }, []);

export default uniqueElementsBy;
