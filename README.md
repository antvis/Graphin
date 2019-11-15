## Graphin

Graphin 采用 lerna 包管理，分为以下 4 个包

-   graphin
-   graphin-components
-   graphin-studio
-   graphin-site

### Get Started

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
