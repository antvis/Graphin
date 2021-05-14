---
title: Contribution Guide
order: 2
group:
  path: /quick-start
  order: 0
nav:
  path: /graphin
---

> This guide is referenced from [Ant Design](https://ant.design/docs/react/contributing-cn)

The following is a set of guidelines for contributing to Graphin. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Develop Graphin

Graphin use lerna to manage this repo. This repo contains the following packages:

```bash
/packages
    graphin
    graphin-components
    graphin-studio
    graphin-site
```

Please checkout the specific package：

| Package Name                                                                                          | Description                                                       |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [@antv/graphin](https://github.com/antvis/graphin/tree/master/packages/graphin)                       | Core React component of Graphin                                   |
| [@antv/graphin-components](https://github.com/antvis/graphin/tree/master/packages/graphin-components) | Graphin components                                                |
| [@antv/graphin-icons](https://github.com/antvis/graphin/tree/master/packages/graphin-icons)           | Graphin official icons                                            |
| [@antv/graphin-site](https://github.com/antvis/graphin/tree/master/packages/graphin-site)             | Graphin documentation website                                     |
| [graphin-studio](https://github.com/antvis/graphin/tree/master/packages/graphin-studio)               | A Graphin demo: generic graph analysis workbench based on Graphin |

- Set up npmClient

Set your npmClient to yarn in lerna.json

```json
// ./lerna.json
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "version": "0.0.0"
}
```

- Installation dependencies

Install node_modules in the `root directory of the project`

```bash
yarn
```

- Install the dependencies of each package

> ⚠️ Special attention

Before installing the dependencies of each package, you need to do a special treatment in `graphin-components`, move the graphin dependencies in package.json from `peerDependencies` to `dependencies`, so that you can run bootstrap in `npm run bootstrap`, you can link to the dependency. The source code needs to be [such](https://github.com/antvis/Graphin/blob/master/packages/graphin-components/package.json#L57) in order to publish, it needs to be changed to the following (this operation is only in Used when installing dependencies for the first time)

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

Then in the `root directory of the project`, start lerna's bootstrap, lerna automatically installs the dependencies of each package, after installation, you can find that each package has its own node_modules

```bash
npm run bootstrap
```

- Start local compilation of graphin, graphin-components, graphin-icons

Start the local compilation of graphin, graphin-components and graphin-icons in `the project root directory`.

Note ⚠️ Because each package in the packages has a dependency relationship, for example, `graphin-components` depends on the packaged product of graphin, and the packaging startup speed is different, so we need to start the `packages/graphin` package first, and then start `packages/graphin-components`. After startup, you can also restart the ts compiler in vscode to ensure that each dependency ts can be inferred and found

```bash
npm run graphin // Local compilation of the product of `@antv/graphin`
npm run components // locally compile the product of `@antv/graphin-components`
npm run icons // Locally compiled product of `@antv/graphin-icons`
```

- Launch Graphin official site

Graphin uses dumi to build the site, so we can start `npm run docs` in the `root directory of the project` to see the official site locally

```bash
npm run docs
```

## Graphin and G6 compatible table

| Graphin Version | G6 Version |
| --------------- | ---------- |
| before 1.0.1    | 3.1.9      |
| ^1.0.2          | ^3.2.0     |
| 1.4.6           | ^3.8.0     |
| 2.0.0           | ^4.1.8     |

## Code of Conduct

We have adopted a [Code of Conduct](https://github.com/antvis/graphin/blob/develop/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full document to understand the adoption and standards of our project.

## Open Development

All work on Graphin are develop directly on GitHub. Both core team members and external contributors requires to create pull requests and undergo the our review process.

## Branch Organization

According to our release schedule, we maintain two branches, master and feature. If you send a bugfix pull request, please set the target branch to the master, if it's a feature pull request, please create a feature branch.

## Bugs

We are using GitHub Issues for bug tracking. The fastest way to get your bug fixed is using our [issue helper](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=bug_report.md&title=) and provide reproduction steps with the Codesandbox [template](https://codesandbox.io/s/data-driven-3o71b).

Before you report a bug, please make sure you've searched exists issues, and read through our FAQ.

## Proposing a Change

If you intend to change the public API or introduce new feature, we recommend to use our [issue template](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=feature_request.md&title=) to create a feature request issue.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://segmentfault.com/a/1190000000736629)

In order to help you familiar with our contribution process, we have a list of [good first issues](https://github.com/antvis/graphin/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that contain bugs or small features that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If no one is working on the issue, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If someone had create an issue but doesn't follow up for more than two weeks, it's fine to take over it but you should still leave a comment.

## Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

Before submitting a pull request, please make sure the following is done:

Fork the repository and create your branch from the [correct branch](/en/docs/manual/contributing#Branch Organization).

Run npm install in the repository root.

If you've fixed a bug or added code that should be tested, add tests!

Ensure the test suite passes (npm run test).

Run npm test -- -u to update the jest snapshots and commit these changes as well (if there are any updates).

Make sure your code lints (npm run lint). Tip: Lint runs automatically when you git commit (Use Git Hooks).

Sending a Pull Request to Graphin:

### Development Workflow

After cloning Graphin, run npm install and npm run bootstrap to fetch its dependencies. Then, you can run several commands:

npm run start runs Graphin and Graphin Components.

npm run studio runs Graphin Studio locally.

npm run lint checks the code style.

npm run test runs the complete test suite.

npm run build compiles Graphin and Graphin Components code to the dist directory.
