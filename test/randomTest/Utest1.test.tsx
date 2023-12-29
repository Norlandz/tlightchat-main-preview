   
                          
   

import { setImmediate } from 'timers';                                                
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, findByText, prettyDOM, render, screen, waitFor } from '@testing-library/react';

                                                              
                                          

describe('RandomTest', () => {
                                          
                                     
                
                            
                                      
                                      
                                        
                   
                            
                                    
                                    
                                      
                   
                 
           
    
                                                                                                                                                
                                                    
    
                       
                  
                                           
             
            
                                 
            
           
          

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

    const elt_div2 = renderResult.container.querySelector<HTMLElement>(`#div2`) ?? (() => { throw new TypeError(); })();                   
                                               

    await findByText(elt_div2, /one/);
  });
});
