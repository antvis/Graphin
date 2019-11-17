## Graphin

Graphin uses the lerna package management mechanism, and the package contains the following 4 packages.

```bash
/packages
    Graphin
    Graphin-components
    Graphin-studio
    Graphin-site
```

They correspond to the package name and explanation as follows

| Package Name             | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| @antv/graphin            | A react component based on G6 for graph analysis                       |
| @antv/graphin-components | Graphin analysis components                                            |
| @antv/graphin-site       | Graphin document website                                               |
| Graphin-studio           | Graphin Demo : Generic relationship analysis platform based on Graphin |

### Quick start

-   Set npmClient

Set your npmClient in lerna.json, friends in China can set [cnpm](https://www.npmjs.com/package/cnpm)

```json
// ./lerna.json
{
    "packages": ["packages/*"],
    "npmClient": "cnpm",
    "version": "0.0.0"
}
```

-   Installation dependencies

```bash
cnpm i
```

-   Install dependencies for each package

```bash
npm run bootstrap
```

-   Start the local compilation of graphin and graphin-components

```bash
npm run start
```

> after `npm run start`

-   View the demo example of graphin-studio

```bash
npm run studio
```

-   View graphin-site's gatsby official

```bash
npm run site
```

### Working with documents

-   [Introduction to Graphin](https://antvis.github.io/graphin/zh/docs/manual/introduction)
-   [Getting started quickly](https://antvis.github.io/graphin/zh/docs/manual/getting-started)
-   [API documentation](https://antvis.github.io/graphin/zh/docs/api/graphin)
-   [GraphinStudio](https://antvis.github.io/graphin/zh/GraphinStudio)
