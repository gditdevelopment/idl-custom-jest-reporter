import { AggregatedResult, Reporter, TestContext } from '@jest/reporters';
import { extractJestReports } from './core/jest-mapping';
import { saveCsvReport } from './reports/csv';
import { saveJsonReport } from './reports/json';
import { uploadToS3 } from './reports/s3';
import { printTestResults } from './reports/terminal';
import { LogLevelOptions } from './reports/terminal/log';

const setupAndRun = async (data: {
  testData: AggregatedResult;
  options: {
    jsonReportPath?: string;
    csvReportPath?: string;
    s3BucketName?: string;
  } & LogLevelOptions;
  skipFileReport: boolean;
}) => {
  const { testData, options, skipFileReport } = data;
  const { warnAfterMs, errorAfterMs, logLevel, maxItems, jsonReportPath, csvReportPath, s3BucketName } = options;
  const reports = extractJestReports(testData);

  printTestResults(reports, { errorAfterMs, warnAfterMs, logLevel, maxItems });
  !skipFileReport && jsonReportPath && saveJsonReport(reports, jsonReportPath);
  !skipFileReport && csvReportPath && (await saveCsvReport(reports, csvReportPath));
  !skipFileReport && s3BucketName && (await uploadToS3(s3BucketName, csvReportPath));
};

export default class JestPerformanceReporter implements Reporter {
  constructor(
    public jestOptions: { watch: boolean; watchAll: boolean },
    public reporterOptions: any
  ) {}

  onRunComplete(testContexts: Set<TestContext>, results: AggregatedResult) {
    setupAndRun({
      testData: results,
      options: this.reporterOptions,
      skipFileReport: this.jestOptions.watch || this.jestOptions.watchAll,
    });
  }

  onRunStart() {}

  getLastError() {}
}
