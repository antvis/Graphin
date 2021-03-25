module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-shadow': 0,
    'react/button-has-type': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    camelcase: 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/display-name': 'off',
    'react/jsx-props-no-spreading': 0,
    'operator-assignment': 0,
    'react/no-did-update-set-state': 0,
    'consistent-return': 0,
    'react/sort-comp': 0,
    'no-plusplus': 'off', // i++
    radix: 'off', // parseInt Missing radix parameter
    'no-restricted-properties': 'off', // Math.pow(10, 2) === 10**2
    'import/order': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
