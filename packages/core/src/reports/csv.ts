import { TestResult } from '../core/jest-mapping';
const { createObjectCsvWriter } = require('csv-writer');

export const saveCsvReport = async (testResults: TestResult[], path: string) => {
  const csvWriter = createObjectCsvWriter({
    path,
    header: [
      { id: 'testName', title: 'TESTNAME' },
      { id: 'suiteName', title: 'SUITENAME' },
      { id: 'duration', title: 'DURATION' },
      { id: 'status', title: 'STATUS' },
    ],
  });

  return csvWriter.writeRecords(testResults);
};
