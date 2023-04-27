import { TestResult } from '../core/jest-mapping';
const { createObjectCsvWriter } = require('csv-writer');

export const saveCsvReport = async (testResults: TestResult[], path: string) => {
  const csvWriter = createObjectCsvWriter({
    path,
    alwaysQuote: true,
    header: [
      { id: 'all', title: 'ALL' },
      { id: 'testName', title: 'TESTNAME' },
      { id: 'suiteName', title: 'SUITENAME' },
      { id: 'duration', title: 'DURATION' },
      { id: 'status', title: 'STATUS' },
      { id: 'numSuitePassingTests', title: 'SUITEPASSINGTESTS' },
      { id: 'numSuiteFailingTests', title: 'SUITEFAILINGTESTS' },
      { id: 'numSuiteSkippedTests', title: 'SUITESKIPPEDTESTS' },
      { id: 'suiteStartTime', title: 'SUITESTARTTIME' },
      { id: 'suiteEndTime', title: 'SUITEENDTIME' },
      { id: 'suiteDuration', title: 'SUITEDURATION' },
      { id: 'suiteSlowWarning', title: 'SUITESLOWWARNING' },
      { id: 'failureMessage', title: 'FAILUREMESSAGE' },
      { id: 'testFilePath', title: 'TESTFILEPATH' },
      { id: 'testLocationInResults', title: 'TESTLOCATIONINRESULTS' }
    ]
  });

  return csvWriter.writeRecords(testResults);
};
