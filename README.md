# Overview

🧐 Identify slow tests during development

📚 Create json or csv report including the test execution times

```bash
yarn add -DE @jest-performance-reporter/core
```

![Example test run](https://raw.githubusercontent.com/sholzmayer/jest-performance-reporter/c766d041e908170f968a33d0c2b00cabfb111d4f/docs/test-example.png)

# Development instructions

1. Clone the repository
2. Navigate to the core directory with `cd idl-custom-jest-reporter/packages/core`
3. Install required packages with `npm install`
4. Make changes to source code in the `./src` directory
5. From the `./core` directory, run `npm run build`
6. Copy the `./dist` directory into the `@jest-performance-reporter/core` module you would like to update
7. TODO: Figure out how to install module directly from this github repo

# Setup

Configure jest to use this reporter via the jest section in the package.json or your jest config.

```json
{
  "reporters": [
    "default",
    [
      "@jest-performance-reporter/core",
      {
        "errorAfterMs": 1000,
        "warnAfterMs": 500,
        "logLevel": "warn",
        "maxItems": 5,
        "jsonReportPath": "performance-report.json",
        "csvReportPath": "performance-report.csv"
      }
    ]
  ]
}
```

The "default"-reporter creates the default jest output. If you don't need it, of course you can remove it.
