   
                          
   

import '../../src/mainPreImport';
import { store } from '../../src/webrtcVideoCommunication/redux/ReduxStore';

import { setImmediate } from 'timers';                                                
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, prettyDOM, render, screen, waitFor } from '@testing-library/react';
import util from 'util';

import prettier from 'prettier';
                                                                      
                                                                                                                                                                              
                                                                                                                        
                                                                                                                         
                                                 
                                                                                                          
                          
                                                                                                                                                                                                                                                                                                                                                                                                       
                                    
         

import { common, createEmphasize } from 'emphasize';
const emphasize = createEmphasize(common);

import parserHtml from 'prettier/parser-html';

import { PrintUtil } from '../../src/util/print/PrintUtil';
                                     
import App from '../../src/App';
const { printHtmlHltAnsi } = PrintUtil;

                             
                                                                    
  
                                                   
                                    
                      
                                    

const prettierOption_html: prettier.Options = {
  parser: 'html',
                          
  tabWidth: 2,
  printWidth: 162,
                       
  plugins: [parserHtml],                                                    
};

describe('Test Jest Config', () => {
                                                    
                                                    
                                                                      
                                   

                                                                                                          
                                                                                                               
                                                                                                                  
                                                                                                      
  test('import esm module prettier', async () => {
    console.log(await prettier.format(`<div>bbb<code>123</code></div>`, prettierOption_html));
  });

  test('import emphasize', () => {
                                                                                                                                    
                                                             
    const renderResult = render(
      <div className="foo">
        bbb<code style={{ width: '100px' }}>123</code>
        <pre>debug this</pre>
      </div>
    );
                                                      
    console.log(printHtmlHltAnsi(renderResult.container));
  });

  test('call enableMapSet not recognized / @reduxjs/toolkit esm import', () => {
                                            
    console.log(store);
  });

  test('ReferenceError: jest is not defined', () => {
    console.log(jest);
  });


});
