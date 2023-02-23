/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    "reporters": [
      "default",
      [
        "idl-custom-jest-reporter",
        {
          "errorAfterMs": 1000,
          "warnAfterMs": 500,
          "logLevel": "warn",
          "maxItems": 5,
          "csvReportPath": "performance-report.csv",
          "s3BucketName": process.env.BUCKET_NAME
        }
      ]
    ]
  };
};