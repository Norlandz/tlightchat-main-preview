// import type { Config } from 'jest';

// export default async (): Promise<Config> => {
// const config: Config = {
//  Error: Jest: Failed to parse the TypeScript config file
// Vscode ext doesnt support ts?... // https://marketplace.visualstudio.com/items?itemName=kavod-io.vscode-jest-test-adapter

/** @type {import('jest').Config} */
const config = {
  // verbose: true,
  // roots: ['<rootDir>/src'], // , '<rootDir>/test'],
  // testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  // // https://stackoverflow.com/questions/70725063/ts-jest-wont-accept-top-level-awaits-with-nodejs-16-typescript
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  // preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  // testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useESM: true, // said this 'ts-jest', {useESM: true}, & extensionsToTreatAsEsm: ['.ts', '.tsx'], are needed for emphasize ansi import (but not yet for prettier import)
      },
    ],
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css', // order doesnt matter seems (sometimes?..) // https://github.com/nvh95/jest-preview/discussions/308
    // ;not_needed[jest-preview css]; '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': [ 'jest-preview/transforms/file', { useESM: true, }, ],
    // ;not_needed[jest-preview css]; ;not_working; // maybe order matter?
    // ;not_needed[jest-preview css]; '^.+\\.(css)$': 'jest-preview/transforms/css',
    // ;not_needed[jest-preview css]; '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file', // sometimes the css is printed as trace log , when sth is modied, tried, random ..
    // ;not_needed[jest-preview css]; '^.+\\.(css|scss|sass)$': './config/jest/cssTransform.cjs', // cjs must... else default export / esm thing
    // ;not_needed[jest-preview css]; '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': './config/jest/fileTransform.cjs',
    // '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    // '^.+\\.(ts|tsx|js|jsx)$': 'jest-esm-transformer',
  },
  setupFiles: ['<rootDir>/config/jest/jest.setupFiles.ts'], // less used
  setupFilesAfterEnv: [
    // '@testing-library/jest-dom',
    // "@testing-library/jest-dom/extend-expect",
    '<rootDir>/config/jest/jest.setupFilesAfterEnv.ts',
  ],
  globalSetup: '<rootDir>/config/jest/jest.globalSetup.ts',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    // '^(\\.{1,2}/.*)\\.js$': '$1',
    // ;[jest-preview need remove this]; '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // https://www.jest-preview.com/docs/getting-started/installation/#3-if-you-use-css-modules-make-sure-it-doesnt-get-ignored
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    // uuid: require.resolve('uuid'),
    '^uuid$': 'uuid', // https://stackoverflow.com/questions/73203367/jest-syntaxerror-unexpected-token-export-with-uuid-library
    // need close and restart the watch...
    // ;not_working; '@reduxjs/toolkit': '@reduxjs/toolkit',
  },
  // REVIEW
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // no .js .jsx
  // transformIgnorePatterns: ['node_modules'],
  // transformIgnorePatterns: [], // wait for 4min? not_helping anyways
  testPathIgnorePatterns: [
    // // []
    // // A regexp pattern string that is matched against all tests paths before executing the test. On Windows, you will need to use `/` as a path separator or escape `\` as `\\`.
    // // <>
    // // https://jestjs.io/docs/cli#--testpathpatternregex
    // ~~~// still confusing regex ... 
    // '<rootDir>/test/Config.test.tsx' // flag doesnt overwrite this ...
    '/node_modules/',
    '<rootDir>/_saveUsing/',
    '<rootDir>/\\.git/',
    '<rootDir>/\\.next/',
    '<rootDir>/test/_introTryTest/',
    // '<rootDir>/test/randomTest/', // idk why I cannot use empty string like "--testPathIgnorePatterns="... waste my time
  ],
};

export default config;
