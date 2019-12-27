module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
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
        'import/no-unresolved': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        'react/display-name': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx', '.js', '.ts'] }],
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
