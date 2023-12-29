   
                          
   

import { setImmediate } from 'timers';                                                
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, prettyDOM, render, screen, waitFor } from '@testing-library/react';
import util from 'util';

import { PrintUtil } from '../../src/util/print/PrintUtil';
const { printHtmlHltAnsi } = PrintUtil;

import preview from 'jest-preview';
import React from 'react';

import styles from '../../src/scss/index.module.css';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

describe('Test JestPreview', () => {
  test('simpleTest__introTryTest', () => {
    const renderResult = render(
      <div className="foo">
        bbb<code style={{ width: '100px' }}>123</code>
        <pre>debug this</pre>
        <div>add</div>
        <div>kinda slow</div>
      </div>
    );
                                                      
    console.log(printHtmlHltAnsi(renderResult.container));

    preview.debug();
  });

  function demo_simplePreview_SetCount(testSn: number) {
    return async () => {
      let setCount_U: React.Dispatch<React.SetStateAction<number>> = () => {
        throw new TypeError();
      };

      function App() {
        const [count, setCount] = React.useState<number>(0);
        setCount_U = setCount;

        return (
          <div className="App">
            <p>Hello Vite + React!</p>
            <p>
              <button type="button" data-testid="increase" onClick={() => setCount((count) => count + 1)}>
                count is: <span data-testid="count">{count}</span>
              </button>
            </p>
          </div>
        );
      }

      const renderResult = render(<App />);
      preview.debug();

                                                       
                                                                   

      await act(async () => {
        setCount_U(10 + testSn);
        await new Promise((r) => setTimeout(r, 100 * getRandomInt(10)));
      });
      preview.debug();
      await act(async () => {
        setCount_U(20 + testSn);
        await new Promise((r) => setTimeout(r, 100 * getRandomInt(10)));
      });
      preview.debug();
      await act(async () => {
        setCount_U(30 + testSn);
        await new Promise((r) => setTimeout(r, 100 * getRandomInt(10)));
      });
      preview.debug();
    };
  }

  test('simpleTest__SetCount__2', demo_simplePreview_SetCount(1));
  test('simpleTest__SetCount__3', demo_simplePreview_SetCount(2));

  test.only('simpleTest__CssImport', () => {
    const renderResult = render(
      <div>
        <div className="foo">
          bbb<code className={styles.css_VideoConnectionLinkageDraftCurrSelected}>123</code>
          <pre>debug this</pre>
        </div>
        {                     }
      </div>
    );
                                                    
      
                                                   
                 
                                
                          
                                                                                            
                          
                 
           
         
    console.log(printHtmlHltAnsi(renderResult.container));
    console.log(styles.css_VideoConnectionLinkageDraftCurrSelected);
    preview.debug();
    if (styles.css_VideoConnectionLinkageDraftCurrSelected == null) throw new TypeError();
  });
});
