import hexToRgba from '../hexToRgba';

describe('HexToRgba Util', () => {
  it('Should return right result', () => {
    expect(hexToRgba('#123456')).toEqual('rgba(18, 52, 86, 1)');
    expect(hexToRgba('123456')).toEqual('rgba(18, 52, 86, 1)');
    expect(hexToRgba('123')).toEqual('rgba(17, 34, 51, 1)');
  });

  it('Should return right result with alpfa', () => {
    expect(hexToRgba('#123456', '0.5')).toEqual('rgba(18, 52, 86, 0.5)');
  });
});
