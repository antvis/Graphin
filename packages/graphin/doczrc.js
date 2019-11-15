import rules from './webpack.rules';
export default {
    public: './public',
    src: './src/documents',
    files: '**/*.{md,markdown,mdx}',
    dest: '.docz',
    port: 8888,
    typescript: true,
    /** theme :https://github.com/doczjs/docz/tree/master/core/gatsby-theme-docz */

    // menu: ["Graphin", "Components"],
    theme: 'docz-theme-ztopia',
    themeConfig: {
        colors: {
            blackLight: '#242635', // sidebar background (dark), table header background (dark), preview handle background (dark), <blockquote> background, <code> background
            black: '#151725', // page background (dark)
            blackDark: '#0e1019', // text
            whiteLight: '#fcfcfd', // text
            white: '#ffffff', // page background (light)
            whiteDark: '#f5f7f9', // sidebar background (light), table header background (light), preview handle background (light), <blockquote> background, <code> background
            grey: '#d1d4db', // table border, preview border, preview handle bars
            primaryLight: '#d9eaff', // sidebar menu item (hovered)
            primary: '#006fff', // brand background, link, thematic break, preview error type, props table property name, <h1>, <blockquote> border left, search result
            primaryDark: '#0046a3', // link (hovered)
            secondary: '#62ddbd', // props table shape type, brand background, <hr>, search result
            highlight: '#ec5564', // matched search query
            error: 'rgba(200,0,0,0.8)', // preview error background
        },
        fonts: {
            body: 'Lato, sans-serif',
            title: 'Oswald, sans-serif',
        },
        logo: {
            src: './public/graphene.svg',
            width: 30,
        },
    },

    /** webpack */
    modifyBundlerConfig: config => {
        config.module.rules.push(...rules);
        config.resolve.alias.react = require.resolve('react');
        return config;
    },
};
