// eslint-disable-next-line @typescript-eslint/no-var-requires
const { repository } = require('./package.json');

module.exports = {
    plugins: [
        {
            resolve: '@antv/gatsby-theme-antv',
            options: {
                GATrackingId: `UA-148148901-8`,
            },
        },
    ],
    // Customize your site metadata:
    siteMetadata: {
        title: 'Graphin',
        description: 'the react toolkit for graph analysis based on g6',
        siteUrl: 'https://graphin.antv.vision',
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
                slug: 'examples',
                title: {
                    zh: '组件演示',
                    en: 'Examples',
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
        examples: [
            {
                slug: 'render',
                title: {
                    zh: '数据渲染',
                    en: 'render',
                },
            },
            {
                slug: 'layout',
                title: {
                    zh: '内置布局',
                    en: 'layout',
                },
            },
            {
                slug: 'shape',
                // icon: 'layout', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
                title: {
                    zh: '节点与边',
                    en: 'shape',
                },
            },
            {
                slug: 'case',
                title: {
                    zh: '应用场景',
                    en: 'Case',
                },
            },
        ],
        docsearchOptions: {
            apiKey: '159c16127929bd9fe6a3087f9ddddcb9',
            indexName: 'antv_graphin',
        },
    },
};
