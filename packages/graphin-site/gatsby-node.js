exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                react: require.resolve('react'),
            },
        },
    });
};
