const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    // 'src/**/*.ts',
    // '!src/**/@types/*.ts',
    // '!src/**/config/*.ts',
    // '!src/infra/**/*.ts',
    // '!src/core/infra/*.ts',
    // '!src/**/mappers/*.ts',
    // '!src/**/errors/*.ts',
    '<rootDir>/src/modules/**/*.ts'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  preset: 'ts-jest',
  testMatch: [
    "**/*.spec.ts",
  ],
}


