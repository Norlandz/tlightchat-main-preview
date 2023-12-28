import { setImmediate } from 'timers'; // https://github.com/prisma/prisma/issues/8558
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

// jest.useFakeTimers();

// ############
{
  // prettier-ignore
  Object.defineProperty(window, 'MediaStream', {
    // writable: true,
    value: jest.fn(() => ({
      // active: false,
      id: uuidv4(), // this is used as key in React list...
      onaddtrack: jest.fn(), onremovetrack: jest.fn(), clone: jest.fn(), getAudioTracks: jest.fn(), getTrackById: jest.fn(), getVideoTracks: jest.fn(), removeTrack: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn(),
      getTracks: jest.fn(() => []), 
      addTrack: jest.fn((track: MediaStreamTrack) => track.id),
    })),
  });

  const spy_getLocalMediaStream = jest.spyOn(InitRun.prototype, 'getLocalMediaStream').mockImplementation(async () => new MediaStream());
  // spy_getLocalMediaStream.mockRestore();

  // ~/putback/ https://stackoverflow.com/questions/57424190/referenceerror-mediastream-is-not-defined-in-unittest-with-jest https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // https://jestjs.io/docs/es6-class-mocks // ~~~// dk feels not doing better than the simple way
  // prettier-ignore
  Object.defineProperty(window, 'RTCPeerConnection', {
  // writable: true,
  value: jest.fn(() => ({
    canTrickleIceCandidates: null, connectionState: null, currentLocalDescription: null, currentRemoteDescription: null, iceConnectionState: null, iceGatheringState: null, localDescription: null, onconnectionstatechange: null, ondatachannel: null, onicecandidate: null, onicecandidateerror: null, oniceconnectionstatechange: null, onicegatheringstatechange: null, onnegotiationneeded: null, onsignalingstatechange: null, ontrack: null, pendingLocalDescription: null, pendingRemoteDescription: null, remoteDescription: null, sctp: null, signalingState: null, 
    addTransceiver: jest.fn(), createDataChannel: jest.fn(), getConfiguration: jest.fn(), getStats: jest.fn(), getTransceivers: jest.fn(), restartIce: jest.fn(), setConfiguration: jest.fn(), 
    //
    createOffer: jest.fn(() => ({ sdp: 'mock offerDescription.sdp', type: 'mock offerDescription.type' })),
    createAnswer: jest.fn(() => ({ sdp: 'mock answerDescription.sdp', type: 'mock answerDescription.type' })),
    //
    setLocalDescription: jest.fn(),
    setRemoteDescription: jest.fn((description: RTCSessionDescriptionInit) => JSON.stringify(description)),
    //
    getReceivers: jest.fn(),
    getSenders: jest.fn(() => []),
    addTrack: jest.fn(),
    removeTrack: jest.fn(),
    addIceCandidate: jest.fn(),
    //
    close: jest.fn(),
    //
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

  // jest.mock('moduleName', () => {
  //   return {
  //     MediaStream: MediaStreamMock,
  //   };
  // })
  // mock first to wrap then provide to jsdom ?
  // module thing; file path thing ; auto , learn , default func es6 , / createMockFromModule  nah wel brain and shit

  Object.defineProperty(window, 'RTCSessionDescription', {
    // writable: true,
    value: jest.fn(() => ({
      sdp: 'mock RTCSessionDescription sdp',
      type: 'mock RTCSessionDescription type',
    })),
  });
}

// ############

async function sleep(time: number = timeout_DebugWait_AfterATestCompleted) {
  await act(async () => await new Promise((r) => setTimeout(r, time))); // need wrap inside cuz meantime the socket is running
}

// ############
class ComponentRefCommon {
  //
  public readonly elt_lobbyUserList: HTMLElement;
  public readonly elt_offerSendList: HTMLElement;
  public readonly elt_offerReceivedList: HTMLElement;
  public readonly elt_offerConnectedList: HTMLElement;
  //
  // public readonly webrtcConnectionAnchor_self_firstSel: WebrtcConnectionAnchor;
  //
  public readonly elt_VideoConnectionLinkageDraftControlPanel: HTMLElement;
  public readonly eltButton_sendConnectionOffer: HTMLButtonElement;
  public readonly eltButton_acceptConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_cancelConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_declineConnectionOffer: HTMLButtonElement;
  public readonly eltButton_send_closeConnection: HTMLButtonElement;

  // @duplicated_code just to ensure the names are same
  // similar duplicate var anme in type in React prop
  // typescript - Destructured parameter properties in constructor - Stack Overflow
  // https://stackoverflow.com/questions/43838202/destructured-parameter-properties-in-constructor
  // Type definition in object literal in TypeScript - Stack Overflow
  // https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript
  // ;; assign types to destructured variables without duplication typescript github issue - Google 搜索
  // ;; https://www.google.ca/search?q=assign+types+to+destructured+variables+without+duplication+typescript+github+issue&newwindow=1&sca_esv=589431296&sxsrf=AM9HkKnCYp5mKV02gRdXG7iRwtBFRw1Xng%3A1702150225855&ei=UcB0ZbrWM-GgptQPl9GMmAw&ved=0ahUKEwj6wsPci4ODAxVhkIkEHZcoA8MQ4dUDCBA&uact=5&oq=assign+types+to+destructured+variables+without+duplication+typescript+github+issue&gs_lp=Egxnd3Mtd2l6LXNlcnAiUmFzc2lnbiB0eXBlcyB0byBkZXN0cnVjdHVyZWQgdmFyaWFibGVzIHdpdGhvdXQgZHVwbGljYXRpb24gdHlwZXNjcmlwdCBnaXRodWIgaXNzdWVI9D5QzxRYxT1wA3gBkAEAmAGDAaAB7A6qAQQyMS4zuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICCBAAGIAEGKIEwgIIEAAYiQUYogTCAgQQIRgK4gMEGAAgQYgGAZAGBw&sclient=gws-wiz-serp
  // ;; Destructuring with type annotations · Issue #7576 · microsoft/TypeScript
  // ;; https://github.com/microsoft/TypeScript/issues/7576
  // ;; Easier destructuring with type annotations on binding patterns · Issue #29526 · microsoft/TypeScript
  // ;; https://github.com/microsoft/TypeScript/issues/29526
  // ;; FAQ · microsoft/TypeScript Wiki
  // ;; https://github.com/Microsoft/TypeScript/wiki/FAQ#why-cant-i-use-x-in-the-destructuring-function-f-x-number------
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

  // @todo aga those import makes parallel run of test fail; only single run each time is possible at current stage
  public static async setup_beforeEach_PlayerGoOnline() {
    // #>>> render app
    const user = userEvent.setup();
    const renderResult = render(<App />);

    // #>>> wait for state update + useEffect + async (fetch) code is done App
    // await act(async () => await new Promise((r) => setTimeout(r, 2000)));
    // wait for main page first item show up (socketio to signalserver)
    // ;; await waitFor(() => renderResult.getByText(/add_webrtcConnectionAnchorRcomp/), { container: renderResult.container, timeout: timeout_AppInitMainPage_WaitForSocketioSignalserver }); // must throw to retry
    // ;; result call vs passing in elt emmmm well that snapshot should and more em
    await findByText(renderResult.container, /add_webrtcConnectionAnchorRcomp/, undefined, { timeout: timeout_AppInitMainPage_WaitForSocketioSignalserver });
    // wait for Player_self online (async useEffect done)
    await findByText(renderResult.container, /self \*</, undefined, { timeout: timeout_PlayerSelfGoOnline });

    // #>>>
    const elt_lobbyUserList = await renderResult.findByText(/lobbyUserList/); // @todo better use document not container, else it can be a stale element...

    // #>>>
    // idk useSelector? or just global store? no_knowlres // https://stackoverflow.com/questions/65698109/how-to-test-redux-state-update-with-react-testing-library-and-jest
    const mppWebrtcConnectionAnchor_entries = store.getState().reducer_mppWebrtcConnectionAnchor.entries();
    const first = mppWebrtcConnectionAnchor_entries.next();
    if (first.done) throw new TypeError();
    const [_, webrtcConnectionAnchor_self_firstSel] = first.value;

    // #>>>
    const arr_eltButton_SelectPeer = await findAllByRole<HTMLButtonElement>( elt_lobbyUserList, 'button', { name: 'select_webrtcConnectionAnchorLocation_peer' }, { timeout: timeout_WaitForAnyPeerToGoOnline } ); // prettier-ignore
    console.log(printHtmlHltAnsi(elt_lobbyUserList)); // can see each other already hum

    expect(arr_eltButton_SelectPeer).not.toHaveLength(0);
    // for (elt_curr of arr_elt_SelectPeer) {
    const eltButton_SelectPeer = arr_eltButton_SelectPeer[0];

    // #>>>
    await user.click(eltButton_SelectPeer);
    const cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);

    return {
      renderResult,
      user,
      cpf,
      webrtcConnectionAnchor_self_firstSel,
    };
  }

  /**
   * yes, need refresh the upper general ones too
   */
  public static async refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult: RenderResult): Promise<ComponentRefCommon> {
    // #>>>
    const elt_lobbyUserList = await findByText(renderResult.container, /lobbyUserList/);

    const elt_VideoConnectionLinkageDraftControlPanel = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_VideoConnectionLinkageDraftControlPanel}`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const elt_offerSendList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerSendList}`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const elt_offerReceivedList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerReceivedList}`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const elt_offerConnectedList = renderResult.container.querySelector<HTMLElement>(`#${styles.cssId_offerConnectedList}`) ?? (() => { throw new TypeError(); })(); // prettier-ignore
    // queryByAttribute('id', renderResult.container, styles.cssId_VideoConnectionLinkageDraftControlPanel);
    // console.log(printHtmlHltAnsi(elt_VideoConnectionLinkageDraftControlPanel));

    const eltButton_sendConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.sendConnectionOffer));
    const eltButton_acceptConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.acceptConnectionOffer));
    const eltButton_send_cancelConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_cancelConnectionOffer));
    const eltButton_send_declineConnectionOffer = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_declineConnectionOffer));
    const eltButton_send_closeConnection = await findByText<HTMLButtonElement>(elt_VideoConnectionLinkageDraftControlPanel, new RegExp(WebrtcButtonName.send_closeConnection));
    // expect(this.eltButton_sendConnectionOffer).not.toBe(null);

    return new ComponentRefCommon({
      //
      elt_lobbyUserList,
      elt_offerSendList,
      elt_offerReceivedList,
      elt_offerConnectedList,
      //
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
    const eltButton_SelectPeer_parentContainer = elt_customName.parentElement ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const eltButton_SelectPeer = await findByText(eltButton_SelectPeer_parentContainer, 'select_webrtcConnectionAnchorLocation_peer', undefined);
    return eltButton_SelectPeer;
  }

  // ############

  //
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
  //
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
  //
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
  //
  public buttonStatus_P1_send_closeConnection_P2() {
    this.buttonStatus_InitialStatus();
  }
  public buttonStatus_P2_receive_closeConnection_P1() {
    this.buttonStatus_InitialStatus();
  }

  // ############

  public async expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel: WebrtcConnectionAnchor) {
    expect(webrtcConnectionAnchor_self_firstSel.rtcPeerConnection).toBe(null);
    expect(webrtcConnectionAnchor_self_firstSel.mediaStream_peer).toBe(null);
  }

  public async expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel: WebrtcConnectionAnchor) {
    await waitFor(
      // @atten: need to wait bit longer, because 2nd round trip for underlying offerDescription need to be sent, // well better wrap in waitFor? instead of a sleep?..
      () => {
        // @pb,aga: unable to check MediaStream cuz this class is not implemented in Jsdom (aga dk why those can be in browser but not in Nodejs...)
        // @pb,aga: https://stackoverflow.com/questions/61813319/check-state-of-a-component-using-react-testing-library
        // @pb,aga: Enzyme is dead, said
        if (webrtcConnectionAnchor_self_firstSel.mediaStream_peer == null) throw new TypeError();
        if (webrtcConnectionAnchor_self_firstSel.rtcPeerConnection == null) throw new TypeError();
        // cuz that no call to peer so that on track wont call ...
        // expect((webrtcConnectionAnchor_self_firstSel.mediaStream_peer.addTrack as jest.Mock<(track: MediaStreamTrack) => string>).mock.calls.length).not.toBe(0);
        // expect(webrtcConnectionAnchor_self_firstSel.rtcPeerConnection.connectionState).toBe('connected');
        // TODO
      },
      {
        timeout: timeout_WaitForUnderyingOfferAnswerDescriptionSent,
      }
    );
  }

  // ############

  public static async waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation, arr_WaitFor: WebrtcConnectionAnchorLocation[]) {
    // ;del; console.log('socketio_reqres_await_timeout_pb exec_-2');
    // ((ocassionally shows the act pb, better wrap in
    // actually why need // ok its actually the socket close ...
    await act(async () => {
      // @atten: // okok only 0 throws 1 passes -- cuz when 1 done it left & 0 wont able to find 1 ... (that fast ...)
      // ok there are case when the user leave didnt handle that ...
      // ;ref;     const webrtcConnectionEvent = new WebrtcConnectionEvent(eventType, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
      // ;ref;     const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation); // prettier-ignore
      // ;ref;     initRun.socketioClient_forWebrtcConnection.socket.emit(eventType, signalserverWebsocketMsg, WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback);
      // if (webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      const eventType = SignalserverWebsocketMsgType.waitForOtherIns_FinishTestCheck_ThenLeave;
      // const msgData = [webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer];
      const msgData: WebrtcConnectionAnchorLocationId[] = arr_WaitFor.map(e => e.toStringId()) as WebrtcConnectionAnchorLocationId[];
      const signalserverWebsocketMsg = new SignalserverWebsocketMsg( eventType, msgData, undefined, webrtcConnectionAnchorLocation_self, null, SignalserverWebsocketMsgReceiverType.signalserver ); // prettier-ignore
      // initRun.socketioClient_forWebrtcConnection.socket.timeout(timeout_waitForOtherIns_FinishTestCheck_ThenLeave).emit(eventType, signalserverWebsocketMsg, (err: unknown, serverAckMsg: string) => {@¦      //   if (err) {@¦      //     console.error('the server did not acknowledge the event in the given delay');@¦      //   } else {@¦      //     console.log(serverAckMsg);@¦      //   }@¦      // });
      // emitWithAck vs emit .. // otherwise its async & out of order // the documenation just unclear ...
      // ;del; console.log('socketio_reqres_await_timeout_pb exec_-1');
      try {
        const serverAckMsg = (await initRun.socketioClientSession_forWebrtcConnection.socket
          .timeout(timeout_waitForOtherIns_FinishTestCheck_ThenLeave)
          .emitWithAck(eventType, signalserverWebsocketMsg)) as string;
        console.log(serverAckMsg);
      } catch (error) {
        throw new Error(`the server did not acknowledge the event in the given delay ${timeout_waitForOtherIns_FinishTestCheck_ThenLeave} :: ` + error);
        // sth is wrong with the waiting? timeout here?...
        // seems must so the error position can show in log
        // 1. seems its the reference of the ackCallback is wrong ... 
        // 1. though should just throw okok that cts exec is cuz its afterAll -- run even after exception ..
      }
      // ;del; console.log('socketio_reqres_await_timeout_pb exec_1');
    });
    // ;del; console.log('socketio_reqres_await_timeout_pb exec_2');
    // the pb is that the await for req-res in socketio is actually fake the order is still wrong
    // wait seems more of jest async test pb?
  }
}

// ############

// //
const timeout_Multipler_Debug = 1;
// const timeout_Multipler_Debug = 30; // default ones can kill timeout though..
const timeout_DebugWait_AfterATestCompleted = 8000 * timeout_Multipler_Debug;
const timeoutJestTest_OfferCommunicate = 10_000 * timeout_Multipler_Debug;
//
const timeout_AppInitMainPage_WaitForSocketioSignalserver = 2000 * timeout_Multipler_Debug;
const timeout_PlayerSelfGoOnline = 1000 * timeout_Multipler_Debug;
const timeout_WaitForAnyPeerToGoOnline = 1000 * timeout_Multipler_Debug;
//
const timeout_WaitForPlayerPeerToGoOnline = 3000 * timeout_Multipler_Debug;
//
const timeout_WaitForPlayerPeerToSendOffer = 1000 * timeout_Multipler_Debug;
const timeout_WaitForPlayerPeerToAcceptOffer = 1000 * timeout_Multipler_Debug;
const timeout_WaitForUnderyingOfferAnswerDescriptionSent = 1500 * timeout_Multipler_Debug;
//
const timeout_waitForOtherIns_FinishTestCheck_ThenLeave = 1500 * timeout_Multipler_Debug;
const timeout_SomeCleanupActionTriggerStateChange = 1000 * timeout_Multipler_Debug;

// ########################

describe('Simple overall test', () => {
  beforeAll(() => {
    console.log('make sure: 1. signalserver is online 1. the vite_2 is online ; then you can continue this test.');
  });

  afterEach(async () => {
    // ok its actually the socket close ...
    await act(async () => {
      initRun.socketioClientSession_forWebrtcConnection.socket.close();
      // await new Promise((r) => setTimeout(r, timeout_SomeCleanupActionTriggerStateChange));
      // ;del; console.log('socketio_reqres_await_timeout_pb exec_4');
    });
    // ;del; console.log('socketio_reqres_await_timeout_pb exec_5');
  });

  const vite_tt1_cn1 = 'vite_tt1_cn1';
  const vite_tt2_cn2 = 'vite_tt2_cn1';

  //     "test_vite_tt1": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runTestsByPath ./test/App.test.tsx -t=\"send accept offer communicate simple _II_ vite_tt1\"",
  //     "test_vite_tt2": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runTestsByPath ./test/App.test.tsx -t=\"send accept offer communicate simple _II_ vite_tt2\"",
  //     "test_communicate_tt": "concurrently \"pnpm test_vite_tt1\" \"pnpm test_vite_tt2\"",

  test(
    'send accept offer communicate simple _II_ vite_tt1',
    async () => {
      // #>>>
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

      // #>>>
      await cpf.expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel);

      // send offer
      await user.click(cpf.eltButton_sendConnectionOffer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      await findByText(cpf.elt_offerSendList, /msgTo:/);
      cpf.buttonStatus_P1_sendConnectionOffer_P2();
      preview.debug();

      // wait for peer to accept offer
      // ? the wait here should be sufficient?... cuz the update is until the listener receives it & state all updated ..
      // ;wrong; await waitFor(() => renderResult.getByText(/msgFrom:/), { container: cpf.elt_offerReceivedList, timeout: timeout_WaitForPlayerPeerToSendOffer });
      // https://stackoverflow.com/questions/77632815/what-does-container-option-in-waitfor-in-react-testing-library-do-why-doesnt-i
      // console.log(printHtmlHltAnsi(cpf.elt_offerConnectedList));
      await findByText(cpf.elt_offerConnectedList, /msgFrom:/, undefined, { timeout: timeout_WaitForPlayerPeerToAcceptOffer });
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);

      // elt_offerConnectedList doesnt mean connected, need wait for underlying offerAnswerDescription
      await cpf.expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel);
      cpf.buttonStatus_ConnectionEstablished();
      preview.debug();

      if (webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      await ComponentRefCommon.waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_self, [
        webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer,
      ]);
      // ;del; console.log('socketio_reqres_await_timeout_pb exec_3');
    },
    timeoutJestTest_OfferCommunicate
  );

  test(
    'send accept offer communicate simple _II_ vite_tt2',
    async () => {
      // #>>>
      console.log('vite_tt2');
      // console.log('!!!!!!!!!!! WARNING: console.log() is disabled !!!!!!!!!!');
      // console.error('!!!!!!!!!!! WARNING: console.log() is disabled !!!!!!!!!!');
      // console.log = function () {};
      initRun.webrtcConnectionAnchor_customName_debugTest = vite_tt2_cn2;
      const result_setup_beforeEach_PlayerGoOnline = await ComponentRefCommon.setup_beforeEach_PlayerGoOnline();
      const { renderResult, user, webrtcConnectionAnchor_self_firstSel } = result_setup_beforeEach_PlayerGoOnline;
      let cpf = result_setup_beforeEach_PlayerGoOnline.cpf;

      const eltButton_SelectPeer = await cpf.find_Peer_by_CustomName(vite_tt1_cn1);
      await user.click(eltButton_SelectPeer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      // dont check cuz timing can be off // cpf.buttonStatus_InitialStatus();
      preview.debug();

      // #>>>
      await cpf.expect_ConnectionInitialNullStatus(webrtcConnectionAnchor_self_firstSel);

      // wait for peer to send offer
      await findByText(cpf.elt_offerReceivedList, /msgFrom:/, undefined, { timeout: timeout_WaitForPlayerPeerToSendOffer });
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      cpf.buttonStatus_P2_receiveConnectionOffer_P1();
      preview.debug();

      // accept offer
      await user.click(cpf.eltButton_acceptConnectionOffer);
      cpf = await ComponentRefCommon.refresh_StaleStateElt_after_ClickOnSelectPeer_ReceiveConnSignal(renderResult);
      await findByText(cpf.elt_offerConnectedList, /msgFrom:/);
      // @: aga some local state is optimisitcally updated .... so the wait is inaccurate...
      // ;move; cpf.buttonStatus_ConnectionEstablished();
      // >" Missing onError handler for invocation 'webrtcConnectionStateMachine.stage__online.stage__receive__offer_Accepted__action:invocation[0]', error was 'ReferenceError: RTCPeerConnection is not defined'.
      preview.debug();

      await cpf.expect_ConnectionEstablished(webrtcConnectionAnchor_self_firstSel);
      cpf.buttonStatus_ConnectionEstablished();
      preview.debug();

      if (webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      await ComponentRefCommon.waitForOtherIns_FinishTestCheck_ThenLeave(webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_self, [
        webrtcConnectionAnchor_self_firstSel.webrtcConnectionAnchorLocation_peer,
      ]);
      // ;del; console.log('socketio_reqres_await_timeout_pb exec_3');
    },
    timeoutJestTest_OfferCommunicate
  );
});

// todo run 2 test parallel in jest

// Vite React | Jest Preview
// https://www.jest-preview.com/docs/examples/vite-react
//
// Setup Jest with Vite (featuring SWC) - Blog by hung.dev
// https://hung.dev/posts/jest-vite
// @todo info about jest esm import

// TODO terminal jest log is out of order ...
