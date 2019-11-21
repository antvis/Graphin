---
title: Contributing
order: 8
icon: none
---

> This guide is referenced from[Ant Design](https://ant.design/docs/react/contributing-cn)

The following is a set of guidelines for contributing to Graphin. Please spend several minutes reading these guidelines before you create an issue or pull request.

## Code of Conduct

We have adopted a [Code of Conduct](https://github.com/antvis/graphin/blob/develop/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Graphin happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Branch Organization

According to our release schedule, we maintain two branches, master and feature. If you send a bugfix pull request, please do it against the master branch, if it's a feature pull request, please do it against the feature branch.

## Bugs

We are using GitHub Issues for bug tracking. The best way to get your bug fixed is using our [issue helper](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=bug_report.md&title=) and provide reproduction steps with this Code Sanbox [template](https://codesandbox.io/s/data-driven-3o71b).

Before you report a bug, please make sure you've searched exists issues, and read our FAQ.

## Proposing a Change

If you intend to change the public API or introduce new feature, we also recommend you use our [issue template](https://github.com/antvis/graphin/issues/new?assignees=&labels=&template=feature_request.md&title=) to create a feature request issue.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://segmentfault.com/a/1190000000736629)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/antvis/graphin/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that contain bugs or small features that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take over it but you should still leave a comment.

## Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

Before submitting a pull request, please make sure the following is done:

Fork the repository and create your branch from the [correct branch](/en/docs/manual/contributing#Branch Organization).

Run npm install in the repository root.

If you've fixed a bug or added code that should be tested, add tests!

Ensure the test suite passes (npm run test). Tip: npm test -- --watch TestName is helpful in development.

Run npm test -- -u to update the jest snapshots and commit these changes as well (if there are any updates).

Make sure your code lints (npm run lint). Tip: Lint runs automatically when you git commit (Use Git Hooks).

Sending a Pull Request to Graphin:

### Development Workflow

After cloning Graphin, run npm install and npm run bootstrap to fetch its dependencies. Then, you can run several commands:

npm run start runs Graphin and Graphin Components.

npm run dev runs Graphin Studio locally.

npm run lint checks the code style.

npm test runs the complete test suite.

npm run build compiles Graphin and Graphin Components code to the dist directory.
