## Graphin

[English README](./README.en-US.md)

Graphin 采用 lerna 包管理机制，packages 中包含以下 4 个 package

```bash
/packages
    graphin
    graphin-components
    graphin-studio
    graphin-site
```

他们依次对应的包名与解释如下

|   包名                   | 说明                                                   |
| ------------------------ | ------------------------------------------------------ |
| @antv/graphin            | Graphin 中的图分析内核，基于 G6 封装 的 React 组件     |
| @antv/graphin-components | Graphin 中的图分析组件                                 |
| @antv/graphin-site       | Graphin 文档官网                                       |
| graphin-studio           | Graphin 演示 DEMO：基于 Graphin 实现的通用关系分析平台 |

### 快速开始

-   设置 npmClient

在 lerna.json 中设置你的 npmClient，中国地区的朋友可以设置 [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
    "packages": ["packages/*"],
    "npmClient": "cnpm",
    "version": "0.0.0"
}
```

-   安装依赖

```bash
cnpm i
```

-   安装各 packages 的依赖

```bash
npm run bootstrap
```

-   启动 graphin 与 graphin-components 的 start 本地编译

```bash
npm run start
```

> 在`npm run start`后

-   查看 graphin-studio 的 demo 示例

```bash
npm run studio
```

-   查看 graphin-sire 的 gatsby 官方

```bash
npm run site
```

### 使用文档

-   [Graphin 简介](https://antvis.github.io/graphin/zh/docs/manual/introduction)
-   [快速上手](https://antvis.github.io/graphin/zh/docs/manual/getting-started)
-   [API 文档](https://antvis.github.io/graphin/zh/docs/api/graphin)
-   [GraphinStudio](https://antvis.github.io/graphin/zh/GraphinStudio)
