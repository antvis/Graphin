const calcByteLength = (str: string | number): number => {
  return Array.from(String(str)).reduce((acc, curr) => {
    if (curr.charCodeAt(0) > 255) {
      return acc + 2;
    }
    return acc + 1;
  }, 0);
};
export default calcByteLength;
