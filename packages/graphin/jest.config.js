const { jsWithTs: tsjPreset } = require('ts-jest/presets'); // eslint-disable-line

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  // transform: {
  //     '^.+\\.tsx?$': 'ts-jest',
  // },
  transform: tsjPreset.transform,
  testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //   setupFiles: ['jest-canvas-mock'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mock__/styleMock.ts',
  },
};
