# Overview

🧐 Identify slow tests during development

📚 Create json and csv report of test fields and execution times

```bash
npm i https://github.com/gditdevelopment/idl-custom-jest-reporter.git#main
```

# Development instructions

1. Clone the repository
2. Navigate to the core directory with `cd idl-custom-jest-reporter/src/core`
3. Install required packages with `npm install`
4. Make changes to source code in the `./src` directory
5. From the `./core` directory, run `npm run build`
6. Copy the `./dist` directory into the `@jest-performance-reporter/core` module you would like to update
7. TODO: Figure out how to install module directly from this github repo

# Setup

## Uploading results to s3 bucket
If you would like to upload the csv results to an s3 bucket:
1. Set the environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`. The access key and secret key must have PutObject permissions for the bucket located AWS_REGION.
2. Add the line `"s3BucketName": s3_bucket_name` to the configuration options for the reporter, in the same location as csvReportPath. Replace s3_bucket_name with the name of the s3 bucket that you would like to upload your csv file to.
3. Ensure the AWS SDK v2 for Javascript (`npm i aws-sdk`) has been installed on your system. This is not bundled in the reporter.

## Enabling reporter
Configure jest to use this reporter via the jest section in the package.json or your jest config. A jest.config.js file that enables the reporter is provided in the module when installed.

```json
"moduleNameMapper": {
  "axios": "axios/dist/node/axios.cjs"
},
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
