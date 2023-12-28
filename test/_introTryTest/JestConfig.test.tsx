/**
 * @jest-environment jsdom
 */

import '../../src/mainPreImport';
import { store } from '../../src/webrtcVideoCommunication/redux/ReduxStore';

import { setImmediate } from 'timers'; // https://github.com/prisma/prisma/issues/8558
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, prettyDOM, render, screen, waitFor } from '@testing-library/react';
import util from 'util';

import prettier from 'prettier';
// ;; eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// ;; const prettier = require('prettier'); // >" You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/ecmascript-modules
// ;; ;not_working; npx --experimental-vm-modules jest --runTestsByPath ./test/App.test.tsx -t="print App, check online"
// ;; ;not_working; >"  throw new Error('Socketio Event already registered.'); // sth is triggering the code to run twice
// ;; ;not_working; not even mention top lv await
// ;; <strike>dk Jest just sucks . everything just not supported . how can this thing still be used today?
// ;; ok its node & npx pb
// @: actually extensionsToTreatAsEsm: ['.ts', '.tsx'], && 'ts-jest', { useESM: true, }, are both needed too in some cases... not just  node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runTestsByPath ./test/App.test.tsx -t="print App, check online" // https://stackoverflow.com/questions/68520619/jest-typescript-with-es-module-in-node-modules-error-must-use-import-to-load-e
// TODO no sth config is still wrong
// REVIEW

import { common, createEmphasize } from 'emphasize';
const emphasize = createEmphasize(common);

import parserHtml from 'prettier/parser-html';

import { PrintUtil } from '../../src/util/print/PrintUtil';
// import { App } from '../src/main';
import App from '../../src/App';
const { printHtmlHltAnsi } = PrintUtil;

// import jsdom from "jsdom";
// const { JSDOM } = jsdom; // dont use destructurtion on import ...
//
// import { TextEncoder, TextDecoder } from 'util';
// global.TextEncoder = TextEncoder;
// // @ts-expect-error
// global.TextDecoder = TextDecoder;

const prettierOption_html: prettier.Options = {
  parser: 'html',
  // filepath: 'foo.html',
  tabWidth: 2,
  printWidth: 162,
  // singleQuote: true,
  plugins: [parserHtml], // https://github.com/prettier/prettier/issues/9801
};

describe('Test Jest Config', () => {
  // ;test vscode debug output; test('asdf', () => {
  // ;test vscode debug output;   expect(1).toBe(1);
  // ;test vscode debug output;   console.log({ asda: 'aaaaaaaaaa' });
  // ;test vscode debug output; });

  // ;not_working;[no] node ./node_modules/jest/bin/jest.js --runTestsByPath ./test/Config.test.tsx -t=cfa
  // ;not_working[...well..]; npx --experimental-vm-modules jest --runTestsByPath ./test/Config.test.tsx -t=cfa
  // node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runTestsByPath ./test/Config.test.tsx -t=cfa
  // dont ask me about npx... // so this is the whole pb ... nothing other messy need to deal with ...
  test('import esm module prettier', async () => {
    console.log(await prettier.format(`<div>bbb<code>123</code></div>`, prettierOption_html));
  });

  test('import emphasize', () => {
    // const dom = new JSDOM(`<!DOCTYPE html><div class="foo">bbb<code style="width: 100px">123</code><pre>debug this</pre></div>`);
    // printHtmlHltAnsi(dom.window.document.documentElement);
    const renderResult = render(
      <div className="foo">
        bbb<code style={{ width: '100px' }}>123</code>
        <pre>debug this</pre>
      </div>
    );
    // console.log(prettyDOM(renderResult.container));
    console.log(printHtmlHltAnsi(renderResult.container));
  });

  test('call enableMapSet not recognized / @reduxjs/toolkit esm import', () => {
    // const renderResult = render(<App />);
    console.log(store);
  });

  test('ReferenceError: jest is not defined', () => {
    console.log(jest);
  });


});
