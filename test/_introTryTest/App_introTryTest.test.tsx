                                                                                                     
                                                                                          
                                                                       
                                                                    
                                                   
                                                   
               
                                                   
                                                                
               
                                         
                                         
                                                                              
                                                                                           
                                                            
                     
               
                                         
                                                                              
                                                           
                                                            
                     
                   

                                                                   
                              

   
                          
   
import { setImmediate } from 'timers';                                                
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';

import '@testing-library/jest-dom';
import { RenderResult, act, findAllByRole, findByText, prettyDOM, queryByAttribute, render, screen, waitFor } from '@testing-library/react';
                                                
import App from '../../src/App';
import { InitRun, initRun } from '../../src/session/AppSession';
import { store } from '../../src/webrtcVideoCommunication/redux/ReduxStore';
import { videoConnectionLinkageDraftCurrSelected_ref } from '../../src/webrtcVideoCommunication/redux/slice_videoConnectionLinkageDraftCurrSelected';

import util from 'util';

import prettier from 'prettier';
import { PrintUtil } from '../../src/util/print/PrintUtil';
const { printHtmlHltAnsi } = PrintUtil;
import userEvent from '@testing-library/user-event';
import styles from '../src/scss/index.module.css';
import { WebrtcButtonName } from '../../src/webrtcVideoCommunication/service/WebrtcButtonNameType';

                        

  
                  
Object.defineProperty(window, 'MediaStream', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      active: false,
      id: 1,
      onaddtrack: jest.fn(), onremovetrack: jest.fn(), addTrack: jest.fn(), clone: jest.fn(), getAudioTracks: jest.fn(), getTrackById: jest.fn(), getTracks: jest.fn(), getVideoTracks: jest.fn(), removeTrack: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn(),
    })),
  });

                                                                                                                                       
                                                                                                                                               
                                                                                                                                                                 
const spy_getLocalMediaStream = jest.spyOn(InitRun.prototype, 'getLocalMediaStream').mockImplementation(async () => new MediaStream());
                                         

                                                                 
                                                                                
                                                            
                                                                           
                                               
                      
                    
             
                          
      
    

describe('Simple overall test - introTryTest', () => {
  afterEach(() => {
    initRun.socketioClientSession_forWebrtcConnection.socket.close();
  });

                                                                                                                                                                                                                                                                                                                

                                                                                       
                                                                                                                                     
  test('print App, check online', async () => {
                      
                                                                                          
                                
                                          
            
                                                       
                                                         
                                   
                                        

                                           
                                                                 
            
                                                                                                                                                                                                                                                                                                                                                                 
            
                                                                                                                                
                                      
                                                
                                             
                                                                           
                                        

    const renderResult = render(<App />);

                                 
    console.log(renderResult.container.outerHTML);
    expect(renderResult.queryByText(/this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer./)).not.toBe(null);

                                           
                                                                            
                                                                            
    await waitFor(
      () => {
                                                               
                                                    
                                                                                                                                                         
                                                               
        renderResult.getByText(/add_webrtcConnectionAnchorRcomp/);                       
      },
      {
        container: renderResult.container,
        timeout: 2000,
        interval: 100,
      }
    );
                                                     
                                                      
    printHtmlHltAnsi(renderResult.container);
    expect(renderResult.queryByText(/this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer./)).toBe(null);

      
                                                                                                 
    console.log(util.inspect(store.getState().reducer_mppWebrtcConnectionAnchor, false, 1, true));

      
                                                                                          
    console.log(util.inspect(videoConnectionLinkageDraftCurrSelected_ref, false, 1, true));

      
    await waitFor(() => {
                                                                                              
                                                                                                                                      
      renderResult.getByText(/self \*</);
    });
    const eltTx = renderResult.queryByText(/self \*</);                                   
    console.log(eltTx?.outerHTML);
    console.log(eltTx?.nextSibling?.nodeValue);
                                         
    expect(eltTx).not.toBe(null);

      
    console.log(store.getState().reducer_lobbyUserList);

      
                     
    renderResult.debug();
                                                                                                 

                                                                 
                                                  
  });

  test('click and send offer', async () => {
    console.log(
      'make sure: 1. signalserver is online 1. the vite_2 is online ; then you can continue this test.' +
        '\n  // actually, seem only need one vite_1 online (not both) -- cuz this Jest_test creates another vite_test to connect to one vite_1 (can see vite_1 show vite_test is online for a blink)'
    );

    const user = userEvent.setup();
    const renderResult = render(<App />);

           
    const elt_lobbyUserList = await renderResult.findByText(/lobbyUserList/);
                                                 
    console.log(printHtmlHltAnsi(elt_lobbyUserList));

           
    const arr_elt_SelectPeer = await findAllByRole(
      elt_lobbyUserList,
      'button',
      {
        name: /select_webrtcConnectionAnchorLocation_peer/,
      },
      {
        timeout: 2000,
        interval: 100,
      }
    );
    expect(arr_elt_SelectPeer).not.toHaveLength(0);
                                                   
    const elt_SelectPeer = arr_elt_SelectPeer[0];

           
    await user.click(elt_SelectPeer);
                                                 

                                                                             
                                                                                               
                                                                                                     
                           
                                    
    const elt_VideoConnectionLinkageDraftControlPanel = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_VideoConnectionLinkageDraftControlPanel}`);
    if (elt_VideoConnectionLinkageDraftControlPanel == null) throw new TypeError();
                                                                                                            
    console.log(printHtmlHltAnsi(elt_VideoConnectionLinkageDraftControlPanel));

    const eltButton_sendConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.sendConnectionOffer));
    expect(eltButton_sendConnectionOffer).not.toBe(null);
    const eltButton_acceptConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.acceptConnectionOffer));
    expect(eltButton_acceptConnectionOffer).not.toBe(null);
    const eltButton_send_cancelConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_cancelConnectionOffer));
    expect(eltButton_send_cancelConnectionOffer).not.toBe(null);
    const eltButton_send_declineConnectionOffer: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_declineConnectionOffer));
    expect(eltButton_send_declineConnectionOffer).not.toBe(null);
    const eltButton_send_closeConnection: HTMLButtonElement = await findByText(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_closeConnection));
    expect(eltButton_send_closeConnection).not.toBe(null);

    expect(!eltButton_sendConnectionOffer.disabled).toBe(true);
    expect(!eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_cancelConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_closeConnection.disabled).toBe(false);

           
    await user.click(eltButton_sendConnectionOffer);
    expect(!eltButton_sendConnectionOffer.disabled).toBe(false);
    expect(!eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_cancelConnectionOffer.disabled).toBe(true);
    expect(!eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!eltButton_send_closeConnection.disabled).toBe(false);

           
  });
});

                                  
                              
                    
                                                                         
                 

                                                                          

                                              
