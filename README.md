## Graphin

## 总览

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

关于 Graphin 与 G6 的定位问题：Graphin 专注在关系可视分析领域，它是一个关系分析工具。上层服务关系网络，知识图谱，金融反欺诈等业务。基于 G6 的图可视化能力，结合 React 框架的优势，为用户提供工程方案，产品能力，简单易用的开发体验

![graphin and g6](https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*zAbfSp28qFoAAAAAAAAAAABkARQnAQ)

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
