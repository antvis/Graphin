// module.exports = {
//     parser: '@typescript-eslint/parser', // Specifies the ESLint parser
//     extends: [

//         'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
//         'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
//         'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
//     ],
//     parserOptions: {
//         ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
//         sourceType: 'module', // Allows for the use of imports
//         ecmaFeatures: {
//             jsx: true, // Allows for the parsing of JSX
//         },
//     },
//     rules: {
//         "@typescript-eslint/no-explicit-any":"warn",
//         "react/prop-types":0,
//         "@typescript-eslint/explicit-function-return-type":"warn"
//         // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
//         // e.g. "@typescript-eslint/explicit-function-return-type": "off",
//     },
//     settings: {
//         react: {
//             version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
//         },
//     },
// };

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
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 2,
        'react/display-name': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-props-no-spreading': 0,
        'operator-assignment': 0,
    },
};
