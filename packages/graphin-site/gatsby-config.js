// eslint-disable-next-line @typescript-eslint/no-var-requires
const { repository } = require('./package.json');

module.exports = {
    plugins: [
        {
            resolve: '@antv/gatsby-theme-antv',
            options: {
                GATrackingId: `UA-148148901-8`,
                pathPrefix: '/graphin',
            },
        },
    ],
    // Customize your site metadata:
    siteMetadata: {
        title: 'Graphin',
        description: 'the react toolkit for graph analysis based on g6',
        githubUrl: repository.url,
        navs: [
            {
                slug: 'docs/manual/introduction',
                title: {
                    zh: '使用文档',
                    en: 'Documentation',
                },
            },
            {
                slug: 'docs/api/graphin',
                title: {
                    zh: 'API 文档',
                    en: 'API docs',
                },
            },
            {
                slug: 'GraphinStudio',
                title: {
                    zh: 'GraphinStudio',
                    en: 'GraphinStudio',
                },
            },
        ],
        docs: [
            {
                slug: 'manual',
                title: {
                    zh: '使用文档',
                    en: 'docs',
                },
                redirect: 'introduction',
                order: 0,
            },

            {
                slug: 'manual/main-concepts',
                title: {
                    zh: '核心概念',
                    en: 'Main Concepts',
                },
                order: 3,
            },
            {
                slug: 'manual/advanced-guides',
                title: {
                    zh: '进阶指导',
                    en: 'Advanced Guides',
                },
                order: 4,
            },
            {
                slug: 'manual/readme',
                title: {
                    zh: '文档大纲',
                    en: 'readme',
                },
                order: 5,
            },
        ],
    },
};
