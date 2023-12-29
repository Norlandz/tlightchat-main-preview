import { setImmediate } from 'timers';                                                
global.setImmediate = setImmediate;

import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { RenderResult, act, findAllByRole, findByText, queryByAttribute, render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import App from '../src/App';
import { InitRun, initRun } from '../src/session/AppSession';
import { store } from '../src/webrtcVideoCommunication/redux/ReduxStore';
import { slice_webrtcConnectionAnchorLocation_peer_currSel, videoConnectionLinkageDraftCurrSelected_ref } from '../src/webrtcVideoCommunication/redux/slice_videoConnectionLinkageDraftCurrSelected';

import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import { PrintUtil } from '../src/util/print/PrintUtil';
const { printHtmlHltAnsi } = PrintUtil;

import styles from '../src/scss/index.module.css';
import { WebrtcButtonName } from '../src/webrtcVideoCommunication/service/WebrtcButtonNameType';
import { slice_mppWebrtcConnectionAnchor } from '../src/webrtcVideoCommunication/redux/slice_mppWebrtcConnectionAnchor';
import { WebrtcConnectionAnchor } from '../src/webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';

import preview from 'jest-preview';
import { SignalserverWebsocketMsg, SignalserverWebsocketMsgReceiverType, SignalserverWebsocketMsgType } from '../src/webrtcVideoCommunication/messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchorLocationId } from '../src/webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';

                        

               
{
                    
  Object.defineProperty(window, 'MediaStream', {
                      
    value: jest.fn(() => ({
                       
      id: uuidv4(),                                        
      onaddtrack: jest.fn(), onremovetrack: jest.fn(), clone: jest.fn(), getAudioTracks: jest.fn(), getTrackById: jest.fn(), getVideoTracks: jest.fn(), removeTrack: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn(),
      getTracks: jest.fn(() => []), 
      addTrack: jest.fn((track: MediaStreamTrack) => track.id),
    })),
  });

  const spy_getLocalMediaStream = jest.spyOn(InitRun.prototype, 'getLocalMediaStream').mockImplementation(async () => new MediaStream());
                                           

                                                                                                                                                                                                                   
                                                                                                  
                    
  Object.defineProperty(window, 'RTCPeerConnection', {
                    
  value: jest.fn(() => ({
    canTrickleIceCandidates: null, connectionState: null, currentLocalDescription: null, currentRemoteDescription: null, iceConnectionState: null, iceGatheringState: null, localDescription: null, onconnectionstatechange: null, ondatachannel: null, onicecandidate: null, onicecandidateerror: null, oniceconnectionstatechange: null, onicegatheringstatechange: null, onnegotiationneeded: null, onsignalingstatechange: null, ontrack: null, pendingLocalDescription: null, pendingRemoteDescription: null, remoteDescription: null, sctp: null, signalingState: null, 
    addTransceiver: jest.fn(), createDataChannel: jest.fn(), getConfiguration: jest.fn(), getStats: jest.fn(), getTransceivers: jest.fn(), restartIce: jest.fn(), setConfiguration: jest.fn(), 
      
    createOffer: jest.fn(() => ({ sdp: 'mock offerDescription.sdp', type: 'mock offerDescription.type' })),
    createAnswer: jest.fn(() => ({ sdp: 'mock answerDescription.sdp', type: 'mock answerDescription.type' })),
      
    setLocalDescription: jest.fn(),
    setRemoteDescription: jest.fn((description: RTCSessionDescriptionInit) => JSON.stringify(description)),
      
    getReceivers: jest.fn(),
    getSenders: jest.fn(() => []),
    addTrack: jest.fn(),
    removeTrack: jest.fn(),
    addIceCandidate: jest.fn(),
      
    close: jest.fn(),
      
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

                                    
               
                                      
         
       
                                               
                                                                                                                     

  Object.defineProperty(window, 'RTCSessionDescription', {
                      
    value: jest.fn(() => ({
      sdp: 'mock RTCSessionDescription sdp',
      type: 'mock RTCSessionDescription type',
    })),
  });
}

               

async function sleep(time: number = timeout_DebugWait_AfterATestCompleted) {
  await act(async () => await new Promise((r) => setTimeout(r, time)));                                                       
}

               
class ComponentRefCommon {
    
  public readonly elt_lobbyUserList: HTMLElement;
  public readonly elt_offerSendList: HTMLElement;
  public readonly elt_offerReceivedList: HTMLElement;
  public readonly elt_offerConnectedList: HTMLElement;
    
                                                                                  
    
  public readonly elt_VideoConnectionLinkageDraftControlPanel: HTMLElement;
  public readonly eltButton_sendConnectionOffer: HTMLButtonElement;
  public readonly eltButton_acceptConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_cancelConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_declineConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_closeConnection: HTMLButtonElement;

                                                       
                                                     
                                                                                   
                                                                                                  
                                                                     
                                                                                                 
                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                
                                                           
                                                                                                            
                                                            
                                       
                                                                                                                        
  constructor({
    elt_lobbyUserList,
    elt_offerSendList,
    elt_offerReceivedList,
    elt_offerConnectedList,
    elt_VideoConnectionLinkageDraftControlPanel,
    eltButton_sendConnectionOffer,
    eltButton_acceptConnectionOffer,
    eltButton_send_cancelConnectionOffer,
    eltButton_send_declineConnectionOffer,
    eltButton_send_closeConnection,
  }: {
    elt_lobbyUserList: HTMLElement;
    elt_offerSendList: HTMLElement;
    elt_offerReceivedList: HTMLElement;
    elt_offerConnectedList: HTMLElement;
    elt_VideoConnectionLinkageDraftControlPanel: HTMLElement;
    eltButton_sendConnectionOffer: HTMLButtonElement;
    eltButton_acceptConnectionOffer: HTMLButtonElement;
    eltButton_send_cancelConnectionOffer: HTMLButtonElement;
    eltButton_send_declineConnectionOffer: HTMLButtonElement;
    eltButton_send_closeConnection: HTMLButtonElement;
  }) {
    this.elt_lobbyUserList = elt_lobbyUserList;
    this.elt_offerSendList = elt_offerSendList;
    this.elt_offerReceivedList = elt_offerReceivedList;
    this.elt_offerConnectedList = elt_offerConnectedList;
    this.elt_VideoConnectionLinkageDraftControlPanel = elt_VideoConnectionLinkageDraftControlPanel;
    this.eltButton_sendConnectionOffer = eltButton_sendConnectionOffer;
    this.eltButton_acceptConnectionOffer = eltButton_acceptConnectionOffer;
    this.eltButton_send_cancelConnectionOffer = eltButton_send_cancelConnectionOffer;
    this.eltButton_send_declineConnectionOffer = eltButton_send_declineConnectionOffer;
    this.eltButton_send_closeConnection = eltButton_send_closeConnection;
  }

                                                                                                                   
  public static async setup_beforeEach_PlayerGoOnline() {
                      
    const user = userEvent.setup();
    const renderResult = render(<App />);

                                                                              
                                                                            
                                                                       
                                                                                                                                                                                                                     
                                                                                   
    await findByText(renderResult.container, /add_webrtcConnectionAnchorRcomp/, undefined, { timeout: timeout_AppInitMainPage_WaitForSocketioSignalserver });
                                                         
    await findByText(renderResult.container, /self \*</, undefined, { timeout: timeout_PlayerSelfGoOnline });

           
    const elt_lobbyUserList = await renderResult.findByText(/lobbyUserList/);                                                                              

           
                                                                                                                                                                            
    const mppWebrtcConnectionAnchor_entries = store.getState().reducer_mppWebrtcConnectionAnchor.entries();
    const first = mppWebrtcConnectionAnchor_entries.next();
    if (first.done) throw new TypeError();
    const [_, webrtcConnectionAnchor_self_firstSel] = first.value;

           
    const arr_eltButton_SelectPeer = await findAllByRole<HTMLButtonElement>( elt_lobbyUserList, 'button', { name: 'select_webrtcConnectionAnchorLocation_peer' }, { timeout: timeout_WaitForAnyPeerToGoOnline } );                   
    console.log(printHtmlHltAnsi(elt_lobbyUserList));                                  

    expect(arr_eltButton_SelectPeer).not.toHaveLength(0);
                                             
    const eltButton_SelectPeer = arr_eltButton_SelectPeer[0];

           
    await user.click(eltButton_SelectPeer);
    const cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);

    return {
      renderResult,
      user,
      cpf,
      webrtcConnectionAnchor_self_firstSel,
    };
  }

     
                                                 
     
  public static async refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult: RenderResult): Promise<ComponentRefCommon> {
           
    const elt_lobbyUserList = await findByText(renderResult.container, /lobbyUserList/);

    const elt_VideoConnectionLinkageDraftControlPanel = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_VideoConnectionLinkageDraftControlPanel}`) ?? (() => { throw new TypeError(); })();                   
    const elt_offerSendList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerSendList}`) ?? (() => { throw new TypeError(); })();                   
    const elt_offerReceivedList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerReceivedList}`) ?? (() => { throw new TypeError(); })();                   
    const elt_offerConnectedList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerConnectedList}`) ?? (() => { throw new TypeError(); })();                   
                                                                                                            
                                                                                  

    const eltButton_sendConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.sendConnectionOffer));
    const eltButton_acceptConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.acceptConnectionOffer));
    const eltButton_send_cancelConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_cancelConnectionOffer));
    const eltButton_send_declineConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_declineConnectionOffer));
    const eltButton_send_closeConnection = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_closeConnection));
                                                                 

    return new ComponentRefCommon({
        
      elt_lobbyUserList,
      elt_offerSendList,
      elt_offerReceivedList,
      elt_offerConnectedList,
        
      elt_VideoConnectionLinkageDraftControlPanel,
      eltButton_sendConnectionOffer,
      eltButton_acceptConnectionOffer,
      eltButton_send_cancelConnectionOffer,
      eltButton_send_declineConnectionOffer,
      eltButton_send_closeConnection,
    });
  }

  public async find_Peer_by_CustomName(webrtcConnectionAnchor_customName: string) {
    const elt_customName = await findByText(this.elt_lobbyUserList, webrtcConnectionAnchor_customName, undefined, { timeout: timeout_WaitForPlayerPeerToGoOnline });
    const eltButton_SelectPeer_parentContainer = elt_customName.parentElement ?? (() => { throw new TypeError(); })();                   
    const eltButton_SelectPeer = await findByText(eltButton_SelectPeer_parentContainer, 'select_webrtcConnectionAnchorLocation_peer', undefined);
    return eltButton_SelectPeer;
  }

                 

    
  public buttonStatus_InitialStatus() {
    expect(!this.eltButton_sendConnectionOffer.disabled).toBe(true);
    expect(!this.eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_cancelConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_closeConnection.disabled).toBe(false);
  }
  public buttonStatus_ConnectionEstablished() {
    expect(!this.eltButton_sendConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_cancelConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_closeConnection.disabled).toBe(true);
  }
    
  public buttonStatus_P1_sendConnectionOffer_P2() {
    expect(!this.eltButton_sendConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_acceptConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_cancelConnectionOffer.disabled).toBe(true);
    expect(!this.eltButton_send_declineConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_closeConnection.disabled).toBe(false);
  }
  public buttonStatus_P1_proceedConnectionOffer_P2() {
    this.buttonStatus_ConnectionEstablished();
  }
  public buttonStatus_P1_send_cancelConnectionOffer_P2() {
    this.buttonStatus_InitialStatus();
  }
  public buttonStatus_P1_receive_declineConnectionOffer_P2() {
    this.buttonStatus_InitialStatus();
  }
    
  public buttonStatus_P2_receiveConnectionOffer_P1() {
    expect(!this.eltButton_sendConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_acceptConnectionOffer.disabled).toBe(true);
    expect(!this.eltButton_send_cancelConnectionOffer.disabled).toBe(false);
    expect(!this.eltButton_send_declineConnectionOffer.disabled).toBe(true);
    expect(!this.eltButton_send_closeConnection.disabled).toBe(false);
  }
  public buttonStatus_P2_acceptConnectionOffer_P1() {
    this.buttonStatus_ConnectionEstablished();
  }
  public buttonStatus_P2_receive_cancelConnectionOffer_P1() {
    this.buttonStatus_InitialStatus();
  }
  public buttonStatus_P2_send_declineConnectionOffer_P1() {
    this.buttonStatus_InitialStatus();
  }
    
  public buttonStatus_P1_send_closeConnection_P2() {
    this.buttonStatus_InitialStatus();
  }
  public buttonStatus_P2_receive_closeConnection_P1() {
    this.buttonStatus_InitialStatus();
  }

                 

  public async expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel: WebrtcConnectionAnchor) {
    expect(webrtcConnectionAnchor_self_firstSel.rtcPeerConnection).toBe(null);
    expect(webrtcConnectionAnchor_self_firstSel.mediaStream_peer).toBe(null);
  }

  public async expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel: WebrtcConnectionAnchor) {
    await waitFor(
                                                                                                                                                                       
      () => {
                                                                                                                                                    
                                                                                                                       
                                        
        if (webrtcConnectionAnchor_self_firstSel.mediaStream_peer == null) throw new TypeError();
        if (webrtcConnectionAnchor_self_firstSel.rtcPeerConnection == null) throw new TypeError();
                                                                  
                                                                                                                                                                    
                                                                                                            
               
      },
      {
        timeout: timeout_WaitForUnderyingOfferAnswerDescriptionSent,
      }
    );
  }

                 

  public static async waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation, arr_WaitFor: WebrtcConnectionAnchorLocation[]) {
                                                                     
                                                      
                                                                
    await act(async () => {
                                                                                                                      
                                                                    
                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                               
                                                                                                                     
      const eventType = SignalserverWebsocketMsgType.waitForOtherIns_FinishTestCheck_ThenLeave;
                                                                                                    
      const msgData: WebrtcConnectionAnchorLocationId[] = arr_WaitFor.map(e => e.toStringId()) as WebrtcConnectionAnchorLocationId[];
      const signalserverWebsocketMsg = new SignalserverWebsocketMsg( eventType, msgData, undefined, webrtcConnectionAnchorLocation_self, null, SignalserverWebsocketMsgReceiverType.signalserver );                   
                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                          
                                                                       
      try {
        const serverAckMsg = (await initRun.socketioClientSession_forWebrtcConnection.socket
          .timeout(timeout_waitForOtherIns_FinishTestCheck_ThenLeave)
          .emitWithAck(eventType, signalserverWebsocketMsg)) as string;
        console.log(serverAckMsg);
      } catch (error) {
        throw new Error(`the server did not acknowledge the event in the given delay ${timeout_waitForOtherIns_FinishTestCheck_ThenLeave} :: ` + error);
                                                          
                                                           
                                                                      
                                                                                                            
      }
                                                                      
    });
                                                                    
                                                                                                 
                                             
  }
}

               

     
const timeout_Multipler_Debug = 1;
                                                                                
const timeout_DebugWait_AfterATestCompleted = 8000 * timeout_Multipler_Debug;
const timeoutJestTest_OfferCommunicate = 10_000 * timeout_Multipler_Debug;
  
const timeout_AppInitMainPage_WaitForSocketioSignalserver = 2000 * timeout_Multipler_Debug;
const timeout_PlayerSelfGoOnline = 1000 * timeout_Multipler_Debug;
const timeout_WaitForAnyPeerToGoOnline = 1000 * timeout_Multipler_Debug;
  
const timeout_WaitForPlayerPeerToGoOnline = 3000 * timeout_Multipler_Debug;
  
const timeout_WaitForPlayerPeerToSendOffer = 1000 * timeout_Multipler_Debug;
const timeout_WaitForPlayerPeerToAcceptOffer = 1000 * timeout_Multipler_Debug;
const timeout_WaitForUnderyingOfferAnswerDescriptionSent = 1500 * timeout_Multipler_Debug;
  
const timeout_waitForOtherIns_FinishTestCheck_ThenLeave = 1500 * timeout_Multipler_Debug;
const timeout_SomeCleanupActionTriggerStateChange = 1000 * timeout_Multipler_Debug;

                           

describe('Simple overall test', () => {
  beforeAll(() => {
    console.log('make sure: 1. signalserver is online 1. the vite_2 is online ; then you can continue this test.');
  });

  afterEach(async () => {
                                           
    await act(async () => {
      initRun.socketioClientSession_forWebrtcConnection.socket.close();
                                                                                              
                                                                      
    });
                                                                    
  });

  const vite_tt1_cn1 = 'vite_tt1_cn1';
  const vite_tt2_cn2 = 'vite_tt2_cn1';

                                                                                                                                                                                          
                                                                                                                                                                                          
                                                                                             

  test(
    'send accept offer communicate simple _II_ vite_tt1',
    async () => {
             
      console.log('vite_tt1');
      initRun.webrtcConnectionAnchor_customName_debugTest = vite_tt1_cn1;
      const result_setup_beforeEach_PlayerGoOnline = await ComponentRefCommon.setup_beforeEach_PlayerGoOnline();
      const { renderResult, user, webrtcConnectionAnchor_self_firstSel } = result_setup_beforeEach_PlayerGoOnline;
      let cpf = result_setup_beforeEach_PlayerGoOnline.cpf;
      preview.debug();

      const eltButton_SelectPeer = await cpf.find_Peer_by_CustomName(vite_tt2_cn2);
      await user.click(eltButton_SelectPeer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      cpf.buttonStatus_InitialStatus();
      preview.debug();

             
      await cpf.expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel);

                   
      await user.click(cpf.eltButton_sendConnectionOffer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      await findByText(cpf.elt_offerSendList, /msgTo:/);
      cpf.buttonStatus_P1_sendConnectionOffer_P2();
      preview.debug();

                                      
                                                                                                                         
                                                                                                                                                                  
                                                                                                                                    
                                                                   
      await findByText(cpf.elt_offerConnectedList, /msgFrom:/, undefined, { timeout: timeout_WaitForPlayerPeerToAcceptOffer });
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);

                                                                                                      
      await cpf.expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel);
      cpf.buttonStatus_ConnectionEstablished();
      preview.debug();

      if (webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      await ComponentRefCommon.waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_self, [
        webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer,
      ]);
                                                                      
    },
    timeoutJestTest_OfferCommunicate
  );

  test(
    'send accept offer communicate simple _II_ vite_tt2',
    async () => {
             
      console.log('vite_tt2');
                                                                                  
                                                                                    
                                      
      initRun.webrtcConnectionAnchor_customName_debugTest = vite_tt2_cn2;
      const result_setup_beforeEach_PlayerGoOnline = await ComponentRefCommon.setup_beforeEach_PlayerGoOnline();
      const { renderResult, user, webrtcConnectionAnchor_self_firstSel } = result_setup_beforeEach_PlayerGoOnline;
      let cpf = result_setup_beforeEach_PlayerGoOnline.cpf;

      const eltButton_SelectPeer = await cpf.find_Peer_by_CustomName(vite_tt1_cn1);
      await user.click(eltButton_SelectPeer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
                                                                              
      preview.debug();

             
      await cpf.expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel);

                                    
      await findByText(cpf.elt_offerReceivedList, /msgFrom:/, undefined, { timeout: timeout_WaitForPlayerPeerToSendOffer });
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      cpf.buttonStatus_P2_receiveConnectionOffer_P1();
      preview.debug();

                     
      await user.click(cpf.eltButton_acceptConnectionOffer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      await findByText(cpf.elt_offerConnectedList, /msgFrom:/);
                                                                                            
                                                         
                                                                                                                                                                                                                   
      preview.debug();

      await cpf.expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel);
      cpf.buttonStatus_ConnectionEstablished();
      preview.debug();

      if (webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      await ComponentRefCommon.waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_self, [
        webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer,
      ]);
                                                                      
    },
    timeoutJestTest_OfferCommunicate
  );
});

                                   

                            
                                                        
  
                                                          
                                   
                                   

                                             
