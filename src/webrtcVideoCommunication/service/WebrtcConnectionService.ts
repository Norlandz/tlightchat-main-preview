import { SignalserverWebsocketMsg, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import {
  WebrtcConnectionStateMachineEvent_AbstractBase,
  WebrtcConnectionStateMachineEvent_ReceiveCommon,
  WebrtcConnectionStateMachineEvent_ReceiveOfferSent,
  WebrtcConnectionStateMachineEvent_SendCommon,
  WebrtcConnectionStateMachineEvent_SendOfferSent,
} from './xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from './xstate/WebrtcConnectionStateMachineEventName';
import XstateSendUtil from '../../util/xstate/XstateSendUtil';
import { WebrtcConnectionAnchorLocationSpecial } from './WebrtcConnectionService_lv1Abstract_WebrtcLowlevel';
import { WebrtcConnectionService_lv2Abstract_OfferPlainSignal } from './WebrtcConnectionService_lv2Abstract_OfferPlainSignal';
import { StateMachineFactory_forWebrtcConnection } from './StateMachineFactory_forWebrtcConnection';

/**
send
  button
  xstate
    xstate parent machine
    xstate child machine 
  service
  do
  listen
  send

receive (listen)
  service listener
  xstate 
    xstate parent machine
    xstate child machine 
  service
  do
  listen
  send-respond
 */
export class WebrtcConnectionService extends WebrtcConnectionService_lv2Abstract_OfferPlainSignal {
  // SECTION button - trigger
  // ########################################################################
  /** {@link import('../panel/VideoConnectionLinkageDraftControlPanel') VideoConnectionLinkageDraftControlPanel} */
  // buttons
  // !SECTION

  // SECTION send
  // ########################################################################

  public goOnline() {
    this.listen__offerPlainSignal_Sent(); // @code_order-should_move_before // or should i put this as nested listener?
    // this.listen__offerPlainSignal_Cancelled();
    this.doAndSend__webrtcConnectionAnchor_Online();
  }

  public goOffline() {
    // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Sent);
    // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Cancelled);
    this.doAndSend__webrtcConnectionAnchor_Offline();
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt_root.remove_AllListeners_allDepth(); // goOffline // cleanup all // seems like no need cumulative cleanup steps (in the Xstate)... emm wel.. for future complex design this will be insufficient //@design
  }

  // // ##
  // // ANCHOR @messy idk
  // // idk the design, cannot multi offer send, but can multi receive ..
  // // lv of event drivent direct call or dispathc event hum
  // // thats why said better use single connection  // now the sessionId is not unique  // really dk design
  // private cleanup_AllOtherOffer(webrtcConnectionAnchorLocation_peer_ToExclude?: WebrtcConnectionAnchorLocation) {
  //   for (const webrtcConnectionAnchorLocation_peer_curr of this.webrtcConnectionAnchor_self.offerSentList.toList()) {
  //     if (webrtcConnectionAnchorLocation_peer_ToExclude && webrtcConnectionAnchorLocation_peer_curr.equals(webrtcConnectionAnchorLocation_peer_ToExclude)) continue;
  //     /** {@link send_cancelConnectionOffer } */
  //     // /** {@link receive_cancelConnectionOffer } */
  //     this.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled, webrtcConnectionAnchorLocation_peer_curr);
  //   }
  //   for (const webrtcConnectionAnchorLocation_peer_curr of this.webrtcConnectionAnchor_self.offerReceivedList.toList()) {
  //     if (webrtcConnectionAnchorLocation_peer_ToExclude && webrtcConnectionAnchorLocation_peer_curr.equals(webrtcConnectionAnchorLocation_peer_ToExclude)) continue;
  //     this.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined, webrtcConnectionAnchorLocation_peer_curr);
  //   }
  // }

  // ############

  // well this does solve if for that pb;..
  // other pbs the mess of listne -- em actually this structure indeed for one to one
  // the mess iwell is from the req res listen well then need close quick
  // well for inner encapse inner dealt ...
  //
  // the talk of
  // 1. there is no core -- the MediaStream need flexible change
  // the Anchor just a place to communicate & link scattered compnenet
  // (F that dk miss

  // ANCHOR
  // ;aga design; what time to remove
  // ;aga design; once received , or before next action hum
  // ;;   public sendConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
  // ;;     if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
  // ;;
  // ;;     // @: must be placed before -- so the inside one can set the nested listener on it
  // ;;     const eventEmitterNested = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  // ;;     if (eventEmitterNested == null) throw new TypeError();
  // ;;     eventEmitterNested.create_nested(WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer));
  // ;;
  // ;;     // // FIXME why this is removing my listeners?
  // ;;     // // @: seems event in xstate is async... that brings lots pb and may need decouple but dk how-- logic already messy
  // ;;     // // idk maybe put this inside the listener? already nested too much though
  // ;;     // // FIXME listener is a mess .... but even if this refactor wont help that much cuz the design pb still there ...
  // ;;     // console.log(this.webrtcConnectionAnchor_self.get_mppSocketioListenerCleanup());
  // ;;     // /** {@link send_cancelConnectionOffer } */ // FIXME
  // ;;     // this.cleanup_AllOtherOffer(webrtcConnectionAnchorLocation_peer);
  // ;;     // console.log(this.webrtcConnectionAnchor_self.get_mppSocketioListenerCleanup());
  // ;;     // // dk can be child state machine async some where
  // ;;     // // that async can hurt a lot
  // ;;     // // added back here cuz had bug; but now just add another bug...
  // ;;     // // also the event doesnt get delegated
  // ;;     // // ~~~// dk feels just do the cleanup action inside dont use always this desing is idk .. @
  // ;;     // // @refactor_needed_aga // TODO ............. // just that keep talking of multi send receive & listener cleanup now
  // ;;     // // @messy if multi send offer , remove prev listeners ...
  // ;;     // // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted, false);
  // ;;     // // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined, false);
  // ;;     // // @pb nested position of listeners ... dk // TODO
  // ;;     this.unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_others);
  // ;;     this.unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_others);
  // ;;
  // ;;     this.listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer); // @path-main: entry to webrtc
  // ;;     this.listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer); // TODO how do i cleanup the other listener dk Xstate
  // ;;     this.send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer);
  // ;;
  // ;;     // REVIEW
  // ;;     console.log(this.webrtcConnectionAnchor_self.get_mppSocketioListenerCleanup());
  // ;;     // finally confirm not lisening , debug inside no help, just print here ...
  // ;;     // seems its send cancel then it removes other listeners
  // ;;   }

  public sendConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();

    // // FIXME why this is removing my listeners?
    // // @: seems event in xstate is async... that brings lots pb and may need decouple but dk how-- logic already messy
    // // idk maybe put this inside the listener? already nested too much though
    // // FIXME listener is a mess .... but even if this refactor wont help that much cuz the design pb still there ...
    // console.log(this.webrtcConnectionAnchor_self.get_mppSocketioListenerCleanup());
    // /** {@link send_cancelConnectionOffer } */ // FIXME
    // this.cleanup_AllOtherOffer(webrtcConnectionAnchorLocation_peer);
    // console.log(this.webrtcConnectionAnchor_self.get_mppSocketioListenerCleanup());
    // // dk can be child state machine async some where
    // // that async can hurt a lot
    // // added back here cuz had bug; but now just add another bug...
    // // also the event doesnt get delegated
    // // ~~~// dk feels just do the cleanup action inside dont use always this desing is idk .. @
    // // @refactor_needed_aga // TODO ............. // just that keep talking of multi send receive & listener cleanup now
    // // @messy if multi send offer , remove prev listeners ...
    // // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted, false);
    // // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined, false);
    // // @pb nested position of listeners ... dk // TODO
    // this.unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_others);
    // this.unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_others);
    // this.unlisten__offerPlainSignal_Accepted_Declined_All();

    // @: must be placed before -- so the inside one can set the nested listener on it
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt_root.remove_AllListeners_beyondIncludeDepth2nd(); // no need except for cuz not yet created
    emt_root.create_nested(WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer));

    this.listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer); // @path-main: entry to webrtc
    this.listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer); // TODO how do i cleanup the other listener dk Xstate
    this.send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer);
  }

  // @: ok fine the order is not base on self vs peer ; its base on send vs receive . emm j & ..
  public acceptConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    // this.cleanup_AllOtherOffer(webrtcConnectionAnchorLocation_peer);
    this.unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer); // @path-main: entry to webrtc // @minor: yep no cancel from this step
    this.send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
  }

  public send_cancelConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
    // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    this.unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
    this.unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
    this.send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
  }

  public send_declineConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    this.send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
  }

  public send_closeConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    const webrtcConnectionAnchorLocation_peer = this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer;
    // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.webrtcConnection_Closed);
    this.unlisten__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.send__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
    // TODO & said check the goOffline cleanup ...
  }
  // !SECTION

  // SECTION receive
  // ########################################################################
  public receiveConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    // dk @messy
    // wait... this is all about receiving .. there is no send ....
    // or even move to inside the state machine .... in the service method ..
    const eventEmitterNested = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(
      this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId
    );
    if (eventEmitterNested == null) throw new TypeError();
    eventEmitterNested.create_nested(WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom));

    this.listen__offerPlainSignal_Cancelled(signalserverWebsocketMsg.msgFrom);
    this.receive__offerPlainSignal_Sent(signalserverWebsocketMsg);
  }

  public async proceedConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__offerPlainSignal_Accepted(signalserverWebsocketMsg.msgFrom);
    this.unlisten__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
    this.listen__webrtcConnection_Closed(signalserverWebsocketMsg.msgFrom);
    await this.receive__offerPlainSignal_Accepted__sendOfferDescription(signalserverWebsocketMsg.msgFrom);
  }

  public receive_cancelConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__offerPlainSignal_Cancelled(signalserverWebsocketMsg.msgFrom);
    this.receive__offerPlainSignal_Cancelled(signalserverWebsocketMsg.msgFrom);
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
  }

  public receive_declineConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__offerPlainSignal_Accepted(signalserverWebsocketMsg.msgFrom);
    this.unlisten__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
    this.receive__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
  }

  public receive_closeConnection(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__webrtcConnection_Closed(signalserverWebsocketMsg.msgFrom);
    this.receive__webrtcConnection_Closed();
    const emt_root = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId); // cleanup this session
  }
  // !SECTION

  // SECTION listen - trigger
  // ########################################################################
  protected listen__offerPlainSignal_Sent() {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
    const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = undefined;
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = () => {
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  // @code_order // @todo: Xstate also need to clean up not needed listeners -- not just batch clean up -- should do in each stage change step
  protected listen__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = () => {
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = () => {
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.webrtcConnection_Closed;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = () => {
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.webrtcConnection_Closed);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }
  // !SECTION

  // SECTION unlisten
  // private unlisten__offerPlainSignal_Accepted_Declined_All() {
  //   const arr_eventType_ToDel = [WebrtcConnectionEventType.offerPlainSignal_Accepted, WebrtcConnectionEventType.offerPlainSignal_Declined];
  //   const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  //   emt.remove_Listener_ofGivenArrEventType_onlyShallow(arr_eventType_ToDel);
  // }
  // aga
  // TODO this should not be exposed
  private unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Declined;
    const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.webrtcConnection_Closed;
    const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  // !SECTION

  // SECTION state machine & receive listen send helper
  // ########################################################################

  // SECTION state machine
  // @messy@¦  // public webrtcConnection_xst: State<@¦  //   WebrtcConnectionStateMachineContext,@¦  //   WebrtcConnectionStateMachineEvent,@¦  //   any,@¦  //   WebrtcConnectionStateMachineTypestate,@¦  //   ResolveTypegenMeta<import('../xstate/WebrtcConnectionStateMachine.typegen').Typegen0, WebrtcConnectionStateMachineEvent, BaseActionObject, WebrtcConnectionStateMachineService>@¦  // > | null = null;@¦  // // public send_webrtcConnection_xst: (event: SCXML.Event<WebrtcConnectionStateMachineEvent>, payload?: EventData | undefined) => State<WebrtcConnectionStateMachineContext, WebrtcConnectionStateMachineEvent> = () => {@¦  // // public send_webrtcConnection_xst: (event: WebrtcConnectionStateMachineEvent, payload?: EventData | undefined) => unknown = () => {@¦  // public send_webrtcConnection_xst: (@¦  //   event: SCXML.Event<WebrtcConnectionStateMachineEvent> | SingleOrArray<Event<WebrtcConnectionStateMachineEvent>>,@¦  //   payload?: EventData | undefined@¦  // ) => State<@¦  //   WebrtcConnectionStateMachineContext,@¦  //   WebrtcConnectionStateMachineEvent,@¦  //   any,@¦  //   WebrtcConnectionStateMachineTypestate,@¦  //   MarkAllImplementationsAsProvided<@¦  //     ResolveTypegenMeta<import('../xstate/WebrtcConnectionStateMachine.typegen').Typegen0, WebrtcConnectionStateMachineEvent, BaseActionObject, WebrtcConnectionStateMachineService>@¦  //   >@¦  // > = () => {@¦  //   throw new Error('send_webrtcConnection_xst not initalized');@¦  // };
  private readonly stateMachineFactory_forWebrtcConnection = new StateMachineFactory_forWebrtcConnection(this);
  private readonly actorXst_WebrtcConnection = this.stateMachineFactory_forWebrtcConnection.create_and_start();

  public get_CurrXstate() {
    return this.actorXst_WebrtcConnection.getSnapshot();
  }

  // !SECTION

  // SECTION receive helper - state machine
  private receive_propagator_Xstate_Common_helper(eventTypeNameXst_receive: WebrtcConnectionStateMachineEventTypeName, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    // #>>> go to Parent State Machine
    if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent, //
        WebrtcConnectionStateMachineEventTypeName.evx_receive__connection_Closed,
      ].includes(eventTypeNameXst_receive)
    ) {
      if (eventTypeNameXst_receive === WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent) {
        const eventXst: WebrtcConnectionStateMachineEvent_ReceiveOfferSent = {
          type: eventTypeNameXst_receive,
          signalserverWebsocketMsg,
          offerNegotiationSessionId: WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom),
        };
        XstateSendUtil.sendProperEvent(this.actorXst_WebrtcConnection, eventXst);
      } else {
        const eventXst: WebrtcConnectionStateMachineEvent_ReceiveCommon = {
          type: eventTypeNameXst_receive,
          signalserverWebsocketMsg,
        };
        XstateSendUtil.sendProperEvent(this.actorXst_WebrtcConnection, eventXst);
      }
    }
    // #>>> go to Child State Machine
    else if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Accepted,
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Cancelled,
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Declined,
      ].includes(eventTypeNameXst_receive)
    ) {
      // if (eventTypeNameXst_receive === WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Accepted) {
      //   console.log('oooooooooooooooooooooooooooooo');
      // }
      // const actorXst_ProcessSendReceiveOffer = this.webrtcConnection_xst?.context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(signalserverWebsocketMsg.msgFrom.toString());
      const actorXst_ProcessSendReceiveOffer = this.actorXst_WebrtcConnection.machine.context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(
        WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom)
      );
      if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
      // <strike>@: cancel indeed doesnt require the child actor was spawn ...

      const eventXst: WebrtcConnectionStateMachineEvent_ReceiveCommon = {
        type: eventTypeNameXst_receive,
        signalserverWebsocketMsg,
      };
      XstateSendUtil.sendProperEvent(actorXst_ProcessSendReceiveOffer, eventXst);
    } else {
      throw new TypeError(typeof eventTypeNameXst_receive + ' ' + eventTypeNameXst_receive);
    }
  }
  // !SECTION

  // SECTION listen helper - state machine

  // TODO multi click multi listen
  // @pb[single socket listen globally vs multiple socket listen inside]
  //
  // this.webrtcConnectionAnchor_self.unlisten__offer_Sent__plainRequest_NoConnectionSetup = unlisten__offer_Sent__plainRequest_NoConnectionSetup;
  // dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp()); // @messy aga the state access... -- this is for the button disable null check
  // @messy scope & state meorization ...
  // function unlisten__offer_Sent__plainRequest_NoConnectionSetup() {
  private listen_propagator_Xstate_Common_helper(
    webrtcConnectionEventType: WebrtcConnectionEventType,
    // webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation,
    cleanup_Listener?: () => void
  ) {
    // WebrtcConnectionStateMachineEvent['type']
    // private static readonly // for code readablity -- limit the scope (dont care performance)
    const mpp_webrtcConnectionEventType_vs_xstateEventType_receive = new Map<WebrtcConnectionEventType, WebrtcConnectionStateMachineEventTypeName>([
      [WebrtcConnectionEventType.offerPlainSignal_Sent, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent],
      [WebrtcConnectionEventType.offerPlainSignal_Accepted, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Accepted],
      [WebrtcConnectionEventType.offerPlainSignal_Cancelled, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Cancelled],
      [WebrtcConnectionEventType.offerPlainSignal_Declined, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Declined],
      [WebrtcConnectionEventType.webrtcConnection_Closed, WebrtcConnectionStateMachineEventTypeName.evx_receive__connection_Closed],
      // indeed the WebrtcConnectionEventType doesnt really have the property of send/receive ([[was designed in that way for convenience]])
    ]);

    const eventTypeNameXst_receive = mpp_webrtcConnectionEventType_vs_xstateEventType_receive.get(webrtcConnectionEventType);
    if (eventTypeNameXst_receive == null) throw new TypeError();

    const callback_AppLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      if (cleanup_Listener) {
        cleanup_Listener();
      }

      // @messy
      this.receive_propagator_Xstate_Common_helper(eventTypeNameXst_receive, signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_AppLogic_insideListener);
  }

  // !SECTION

  // SECTION send helper - state machine
  private detmCanSend_or_send__propagator_Xstate_Common_helper<TCheckCanSend extends boolean>(
    eventTypeNameXst_send: WebrtcConnectionStateMachineEventTypeName,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | undefined,
    mode_CheckCanSend: TCheckCanSend
  ): TCheckCanSend extends true ? boolean : void;

  private detmCanSend_or_send__propagator_Xstate_Common_helper(
    eventTypeNameXst_send: WebrtcConnectionStateMachineEventTypeName,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | undefined,
    mode_CheckCanSend: boolean
  ): boolean | void {
    // #>>> simple event (go to Parent State Machine)
    if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx__goOnline, //
        WebrtcConnectionStateMachineEventTypeName.evx__goOffline,
      ].includes(eventTypeNameXst_send)
    ) {
      if (webrtcConnectionAnchorLocation_peer !== undefined) throw new TypeError();
      const eventXst: WebrtcConnectionStateMachineEvent_AbstractBase = {
        type: eventTypeNameXst_send,
      };
      return XstateSendUtil.detmCanSend_or_send(this.actorXst_WebrtcConnection, eventXst, mode_CheckCanSend);
      // @: does Xstate really check for other props inside? feel like the webrtcConnectionAnchorLocation_peer is not required ...
    } else {
      if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
      // #>>> go to Parent State Machine
      if (
        [
          WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, //
          WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed,
        ].includes(eventTypeNameXst_send)
      ) {
        if (eventTypeNameXst_send === WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent) {
          const eventXst: WebrtcConnectionStateMachineEvent_SendOfferSent = {
            type: eventTypeNameXst_send,
            webrtcConnectionAnchorLocation_peer,
            offerNegotiationSessionId: WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer),
          };
          return XstateSendUtil.detmCanSend_or_send(this.actorXst_WebrtcConnection, eventXst, mode_CheckCanSend);
        } else {
          const eventXst: WebrtcConnectionStateMachineEvent_SendCommon = {
            type: eventTypeNameXst_send,
            webrtcConnectionAnchorLocation_peer,
            // webrtcConnectionAnchorLocation_peer: 'DummnyNoNeed - For .can() check only.' as unknown as WebrtcConnectionAnchorLocation,
          };
          return XstateSendUtil.detmCanSend_or_send(this.actorXst_WebrtcConnection, eventXst, mode_CheckCanSend);
        }
      }
      // #>>> go to Child State Machine
      else if (
        [
          WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted,
          WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled,
          WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined,
        ].includes(eventTypeNameXst_send)
      ) {
        const actorXst_ProcessSendReceiveOffer = this.actorXst_WebrtcConnection.machine.context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(
          WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer)
        );
        const eventXst: WebrtcConnectionStateMachineEvent_SendCommon = {
          type: eventTypeNameXst_send,
          webrtcConnectionAnchorLocation_peer,
        };
        return XstateSendUtil.detmCanSend_or_send(actorXst_ProcessSendReceiveOffer, eventXst, mode_CheckCanSend);
      } else {
        throw new TypeError(typeof eventTypeNameXst_send + ' ' + eventTypeNameXst_send);
      }
    }
  }

  public can_send_propagator_Xstate_Common_helper(eventTypeNameXst_send: WebrtcConnectionStateMachineEventTypeName, webrtcConnectionAnchorLocation_peer?: WebrtcConnectionAnchorLocation): boolean {
    return this.detmCanSend_or_send__propagator_Xstate_Common_helper(eventTypeNameXst_send, webrtcConnectionAnchorLocation_peer, true);
  }
  public send_propagator_Xstate_Common_helper(eventTypeNameXst_send: WebrtcConnectionStateMachineEventTypeName, webrtcConnectionAnchorLocation_peer?: WebrtcConnectionAnchorLocation): void {
    this.detmCanSend_or_send__propagator_Xstate_Common_helper(eventTypeNameXst_send, webrtcConnectionAnchorLocation_peer, false);
  }
  // !SECTION

  // !SECTION
}

// TODO refactor to one to one; no hierarchal device thign -- then use socket.once
// TODO move to service ; rename Context to redux

// TODO clean up ; psotion ; & xstate ; or all at once

// aga do not update the lobbyUserList -- its signal server es job ...
// nvm that is offerReceivedList ok self maintain yeah rip ok

// TODO cleanup listener; close connection; no multi offer; can reuse (leave ui couple); may bug still (intermediate);

// missing a way to check the connected stage

// 1. dk cant really change that data structure
// there is not really any intergrated unit; just scattered linkage ; the webrtcConnection itself seems just encapsed as unit ok enough?
// 1. the child state machine , maybe can use function or closure from outside
