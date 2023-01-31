export const reportFileName = 'performance-report.json';

export interface Report {
  testFilePath: string;
  testResults: TestResult[];
}

export interface TestResult {
  duration: number;
  suiteName: string;
  testName: string;
  status: 'failed' | 'passed' | 'pending' | 'skipped';
  numSuitePassingTests: number;
  numSuiteFailingTests: number;
  numSuiteSkippedTests: number;
  suiteStartTime: number;
  suiteEndTime: number;
  suiteDuration: number;
  suiteSlowWarning: boolean;
  failureMessage: string;
  testFilePath: string;
}

export const extractJestReports = (testData) => {
  const { testResults } = testData;
  const determineStatus = (testResult) => {
    if (testResult.duration == null && testResult.status == 'pending')
      return 'skipped'
    else
      return testResult.status
  };
  const results = testResults.map((testResult) => ({
    testFilePath: testResult.testFilePath,
    testResults: testResult.testResults
      .map((test) => ({
        duration: test.duration == null ? -1 : test.duration,
        suiteName: test.ancestorTitles[0],
        testName: test.title,
        status: determineStatus(test),
        numSuitePassingTests: testResult.numPassingTests,
        numSuiteFailingTests: testResult.numFailingTests,
        numSuiteSkippedTests: testResult.numPendingTests,
        suiteStartTime: testResult.perfStats.start,
        suiteEndTime: testResult.perfStats.end,
        suiteDuration: testResult.perfStats.runtime,
        suiteSlowWarning: testResult.perfStats.slow,
        failureMessage: test.failureMessages.toString().replace(/\n/g, '\\n') || '',
        testFilePath: testResult.testFilePath
      })),
  }));
  return mapTestReports(results);
};

const mapTestReports = (reports: Report[]) => {
  const testResults: TestResult[] = [];

  reports.forEach((report) => {
    report.testResults.forEach((testResult) => testResults.push(testResult));
  });
  return testResults;
};
