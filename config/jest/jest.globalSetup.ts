// import { GlobalConfig } from 'jest';
// import { Config } from 'jest';
// import { Config, GlobalConfig } from '@jest/types';
import { Config } from '@jest/types';

export default async function (globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
  // console.log('>> jest.globalSetup.ts');
  // console.log(projectConfig.rootDir);
  // console.log(projectConfig.globalSetup);
  // // ;not array; if (projectConfig.globalSetup != null && projectConfig.globalSetup.length !== 0) console.log(projectConfig.globalSetup[0]);
  // console.log(projectConfig.setupFiles);
  // console.log(projectConfig.setupFilesAfterEnv);
  // console.log(projectConfig.testMatch);
  // console.log(projectConfig.testPathIgnorePatterns);
  // console.log(globalConfig.testPathPattern);
  // // globalThis.__MONGOD__ = mongod;
}

// https://jestjs.io/docs/configuration#globalsetup-string
// https://stackoverflow.com/questions/48318230/configure-jest-global-tests-setup-with-ts-file
// ~~~// aga some missed put ref res ...
// https://github.com/jestjs/jest/blob/main/packages/jest-types/src/Config.ts
