# Overview

🧐 Identify slow tests during development

📚 Create json and csv report of test fields and execution times

```bash
npm i https://github.com/gditdevelopment/idl-custom-jest-reporter.git#main
```

# Setup

Configure jest to use this reporter via the jest section in the package.json or your jest config.

```json
"reporters": [
  "default",
  [
    "idl-custom-jest-reporter",
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
```

The "default"-reporter creates the default jest output. If you don't need it, of course you can remove it.
