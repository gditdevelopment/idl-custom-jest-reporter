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
}

export const extractJestReports = (testData) => {
  const { testResults } = testData;
  testResults.forEach((result) => {
    console.log("RESULT: ");
    console.log(result);
    console.log(result.testResults[0].ancestorTitles);
  })
  console.log('--------------TEST RESULTS------------------');
  console.log(testResults);
  const determineStatus = (testResult) => {
    if (testResult.duration == null && testResult.status == 'pending')
      return 'skipped'
    else
      return testResult.status
  };
  const results = testResults.map((testResult) => ({
    testFilePath: testResult.testFilePath,
    testResults: testResult.testResults
      .map((testResult) => ({
        duration: testResult.duration == null ? -1 : testResult.duration,
        suiteName: testResult.ancestorTitles[0],
        testName: testResult.title,
        status: determineStatus(testResult),
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
