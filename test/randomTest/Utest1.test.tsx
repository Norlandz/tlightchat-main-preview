/**
 * @jest-environment jsdom
 */

import { setImmediate } from 'timers'; // https://github.com/prisma/prisma/issues/8558
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, findByText, prettyDOM, render, screen, waitFor } from '@testing-library/react';

// import { PrintUtil } from '../../src/util/print/PrintUtil';
// const { printHtmlHltAnsi } = PrintUtil;

describe('RandomTest', () => {
  //   test('simpleTest__1', async () => {
  //     const renderResult = render(
  //       <div>
  //         <div id="div1">
  //           <code>search one</code>
  //           <code>search two</code>
  //           <code>search three</code>
  //         </div>
  //         <div id="div2">
  //           <code>find one</code>
  //           <code>find two</code>
  //           <code>find three</code>
  //         </div>
  //       </div>
  //     );
  //
  //     const elt_div2 = renderResult.container.querySelector<HTMLElement>(`#div2`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
  //     // console.log(printHtmlHltAnsi(elt_div2));
  //
  //     await waitFor(
  //       () => {
  //         renderResult.getByText(/one/);
  //       },
  //       {
  //         container: elt_div2,
  //       }
  //     );
  //   });

  test('simpleTest__2', async () => {
    const renderResult = render(
      <div>
        <div id="div1">
          <code>search one</code>
          <code>search two</code>
          <code>search three</code> 
        </div>
        <div id="div2">
          <code>find one</code>
          <code>find two</code>
          <code>find three</code>
        </div>
      </div>
    );

    const elt_div2 = renderResult.container.querySelector<HTMLElement>(`#div2`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
    // console.log(printHtmlHltAnsi(elt_div2));

    await findByText(elt_div2, /one/);
  });
});
