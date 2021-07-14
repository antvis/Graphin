---
title: 贡献指南
order: 2
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

> 本指南参考自 [Ant Design](https://ant.design/docs/react/contributing-cn)

这篇指南会指导你如何为 Graphin 贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 开发 Graphin

Graphin 采用 lerna 管理仓库，packages 中包含以下 5 个 package：

```bash
/packages
    graphin
    graphin-components
    graphin-icons
    graphin-studio
    graphin-site
```

他们依次对应的包名与解释如下：

| 包名                                                                                                  | 说明                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [@antv/graphin](https://github.com/antvis/graphin/tree/master/packages/graphin)                       | Graphin 中的图分析内核，基于 G6 封装 的 React 组件     |
| [@antv/graphin-components](https://github.com/antvis/graphin/tree/master/packages/graphin-components) | Graphin 中的图分析组件                                 |
| [@antv/graphin-icons](https://github.com/antvis/graphin/tree/master/packages/graphin-icons)           | Graphin 内置图标                                       |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin 文档官网                                       |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | Graphin 演示 DEMO：基于 Graphin 实现的通用关系分析平台 |

- 设置 npmClient

在 lerna.json 中设置你的 npmClient 为 yarn

```json
// ./lerna.json
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "version": "0.0.0"
}
```

- 安装依赖

在`该项目根目录`下安装 node_modules

```bash
yarn
```

- 安装各 packages 的依赖

> ⚠️ 特别注意

安装各个包的依赖之前，需要在`graphin-components`中，需要做一个特殊的处理，将 package.json 中的 graphin 依赖，从`peerDependencies`中移动到`dependencies`中，这样才能在`npm run bootstrap`的时候，可以链接上依赖。源代码为了发布需要是[这样的](https://github.com/antvis/Graphin/blob/master/packages/graphin-components/package.json#L57)，需要改为下面的（此操作仅在第一次安装依赖时候使用）

```json
 "dependencies": {
    "@antv/util": "^2.0.10",
    "@antv/graphin": "^2.0.0"
  },
  "peerDependencies": {
    "react": "^16.x",
    "react-dom": "^16.x"
  },
```

然后在`该项目根目录`下，启动 lerna 的 bootstrap，lerna 自动安装好各个 packages 的依赖，安装好后，可以发现各个 packages 中就存在自己的 node_modules 了

```bash
npm run bootstrap
```

- 启动 graphin ， graphin-components ，graphin-icons 的本地编译

在`该项目根目录`启动 graphin， graphin-components 和 graphin-icons 的本地编译.

注意 ⚠️ 因为 packages 中各个包 存在依赖关系，比如 graphin-components 就依赖 graphin 的打包产物，且 打包启动的速度不一样，因此需要我们先把 packages/graphin 包启动后，再启动 packages/graphin-components .启动完毕后，也可以在 vscode 中重启 ts 编译器，从而确保各个依赖关系 ts 可以推断找到

```bash
npm run graphin //本地编译`@antv/graphin`的产物
npm run components //本地编译`@antv/graphin-components`的产物
npm run icons //本地编译`@antv/graphin-icons`的产物
```

- 启动 Graphin 官方站点

graphin 使用 dumi 进行站点构建，因此我们可以在`该项目根目录`，启动 `npm run docs` ,即可在本地看到官方站点

```bash
npm run docs
```

## Graphin 与 G6 兼容版本对照表

| Graphin 版本 | G6 版本 |
| ------------ | ------- |
| before 1.0.1 | 3.1.9   |
| ^1.0.2       | ^3.2.0  |
| 1.4.6        | ^3.8.0  |
| 2.0.0        | ^4.1.8  |

## 行为准则

我们有一份[行为准则](https://github.com/antvis/graphin/blob/develop/CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会放在 GitHub 上。不管是核心团队的成员还是外部贡献者的 pull request 都需要经过同样流程的 review。

## 分支管理

基于我们的 发布周期，我们长期维护两个分支 master 和 feature。如果你要修一个 bug，那么请发 pull request 到 master；如果你要提一个增加新功能的 pull request，那么请基于 feature 分支来做。

## Bugs

我们使用 GitHub Issues 来做 bug 追踪。 如果你想要你发现的 bug 被快速解决，最好的办法就是通过我们提供的 [issue 模板](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=bug_report.md&title=) 来提 issue。并且能使用这个 Code Sandbox [模板](https://codesandbox.io/s/data-driven-3o71b) 来提供重现。

在你报告一个 bug 之前，请先确保已经搜索过已有的 issue 和阅读了我们的 常见问题。

## 新增功能

如果你有改进我们的 API 或者新增功能的想法，我们同样推荐你使用我们提供的 [issue 模板](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=feature_request.md&title=) 来新建一个添加新功能的 issue。

## 第一次贡献

如果你还不清楚怎么在 GitHub 上提 Pull Request ，可以阅读下面这篇文章来学习：

[如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

为了能帮助你开始你的第一次尝试，我们用 [good first issues](https://github.com/antvis/graphin/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) 标记了一些比较比较容易修复的 bug 和小功能。这些 issue 可以很好地做为你的首次尝试。

如果你打算开始处理一个 issue，请先检查一下 issue 下面的留言以确保没有别人正在处理这个 issue。如果当前没有人在处理的话你可以留言告知其他人你将会处理这个 issue，以免别人重复劳动。

如果之前有人留言说会处理这个 issue 但是一两个星期都没有动静，那么你也可以接手处理这个 issue，当然还是需要留言告知其他人。

## Pull Request

Graphin 团队会关注所有的 pull request，我们会 review 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

在你发送 Pull Request 之前，请确认你是按照下面的步骤来做的：

基于 [正确的分支](/zh/docs/manual/Contributing#分支管理) 做修改。

在项目根目录下运行了 npm install 和 npm run bootstrap。

如果你修复了一个 bug 或者新增了一个功能，请确保写了相应的测试，这很重要。

确认所有的测试都是通过 npm run test 来运行的。

运行 npm test -- -u 来更新 jest snapshot 并且把这些更新也提交上来（如果有的话）。

确保你的代码通过了 lint 检查 npm run lint. 小贴士: Lint 会在你 git commit 的时候自动运行（通过 Git Hooks）。

给 Graphin 发送 pull request：

### 开发流程

在你 clone 了 Graphin 的代码并且使用 npm install 和 npm run bootstrap 安装完依赖后，你还可以运行下面几个常用的命令：

npm run start 在本地运行 Graphin 和 Graphin Components 的构建

npm run studio 在本地运行 Graphin Studio 的网站。

npm run lint 检查代码风格。

npm run test 运行测试。

npm run build 编译 Graphin 和 Graphin Components 代码到 dist 目录。
