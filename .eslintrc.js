module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jsdoc/recommended-error'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-console': 'error',
    noImplicitAny: 0, // 允许 any
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    'jsdoc/check-param-names': 1,
    'jsdoc/require-description': 1,
    'jsdoc/require-jsdoc': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-type': 0,
    'jsdoc/require-param': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 0,
    'jsdoc/require-returns': 1,
  },
};
