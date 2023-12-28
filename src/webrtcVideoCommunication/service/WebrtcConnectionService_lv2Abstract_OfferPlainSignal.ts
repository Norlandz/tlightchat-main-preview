import { SignalserverWebsocketMsgType, SignalserverWebsocketMsg, WebrtcConnectionEventType, SignalserverWebsocketMsgReceiverType } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { WebrtcConnectionService_lv1Abstract_WebrtcLowlevel } from './WebrtcConnectionService_lv1Abstract_WebrtcLowlevel';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';

export class WebrtcConnectionService_lv2Abstract_OfferPlainSignal extends WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
  // SECTION
  protected doAndSend__webrtcConnectionAnchor_Online() {
    // @: aga, no need update lobbyUserList, just send the event & subscribe the update
    const eventType = SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online;
    const msgData = {
      customName: this.webrtcConnectionAnchor_self.connectionAnchorName_self, // FIXME the date need know & type
    };
    // >"
    //     const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, t
    // <>
    // H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ts
    //
    // OKnot much those msg data sent ..
    const msgTo = null;
    const msgReceiverType = SignalserverWebsocketMsgReceiverType.allWebrtcConnectionAnchorLocation;
    const webrtcConnectionEvent = undefined;
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, msgTo, msgReceiverType); // prettier-ignore
    // this.socketioClientSession_forWebrtcConnection.socket.emit(eventType, signalserverWebsocketMsg, WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback);
    void SocketioClientUtil.emitWithAckError(
      this.socketioClientSession_forWebrtcConnection.socket,
      undefined,
      eventType,
      WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback,
      signalserverWebsocketMsg
    );
  }

  protected doAndSend__webrtcConnectionAnchor_Offline() {
    const eventType = SignalserverWebsocketMsgType.webrtcConnectionAnchor_Offline;
    const msgData = null;
    const msgTo = null;
    const msgReceiverType = SignalserverWebsocketMsgReceiverType.allWebrtcConnectionAnchorLocation;
    const webrtcConnectionEvent = undefined;
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, msgTo, msgReceiverType); // prettier-ignore
    // this.socketioClientSession_forWebrtcConnection.socket.emit(eventType, signalserverWebsocketMsg, WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback);
    void SocketioClientUtil.emitWithAckError(
      this.socketioClientSession_forWebrtcConnection.socket,
      undefined,
      eventType,
      WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback,
      signalserverWebsocketMsg
    );
  }
  // !SECTION
  // SECTION
  protected send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
    const msgData = null;
    const signalserverWebsocketMsg = this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.webrtcConnectionAnchor_self.offerSentList.add_OfferSent(signalserverWebsocketMsg);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }

  protected receive__offerPlainSignal_Sent(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.webrtcConnectionAnchor_self.offerReceivedList.add_OfferReceived(signalserverWebsocketMsg);
    // @performance-concern
    // @: its not the force refresh pb .. im not even basing of that state -- i was using the nested properties inside ...
    // ~~~~// aga store that func inside?  emmm the meaning of local ... // cant think of @pb-thought[a map of component with local states to share to other components] // that array setstae sync can be a method but not wise ...
    // @messy
    // REVIEW
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }

  protected send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    const msgData = null;
    const signalserverWebsocketMsg = this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected async receive__offerPlainSignal_Accepted__sendOfferDescription(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const pc = this.create_webrtcConnection();
    this.readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc);
    this.readyOn__publish_Icecandidate(pc, webrtcConnectionAnchorLocation_peer);

    this.listen__iceCandidate_Sent(pc, webrtcConnectionAnchorLocation_peer); // @code_order-should_move_before

    // @design-dk[encapsulate / expose, inside or outside, grouping, entry exit] // this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.listen__offerDescription_Accepted_answerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
    await this.send__offerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
  }

  protected listen__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
      emt.remove_Listener_ofGivenEventType_allDepth(webrtcConnectionEventType);

      await this.receive__offerDescription_Accepted_answerDescription_Sent(pc, signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }

  protected async receive__offerDescription_Sent__sendAnswerDescription(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    const pc = this.create_webrtcConnection();
    this.readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc);
    this.readyOn__publish_Icecandidate(pc, signalserverWebsocketMsg.msgFrom);

    this.listen__iceCandidate_Sent(pc, signalserverWebsocketMsg.msgFrom);
    // @design-dk[encapsulate / expose, inside or outside, grouping, entry exit] // this.listen__webrtcConnection_Closed(signalserverWebsocketMsg.msgFrom);
    await this.accept__offerDescription_Sent(pc, signalserverWebsocketMsg);
    await this.send__offerDescription_Accepted_answerDescription_Sent(pc, signalserverWebsocketMsg.msgFrom);
  }

  protected listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Sent;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      // this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socketioClient_forWebrtcConnection.socket, WebrtcConnectionEventType.offerDescription_Sent);
      const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
      emt.remove_Listener_ofGivenEventType_allDepth(webrtcConnectionEventType);

      await this.receive__offerDescription_Sent__sendAnswerDescription(signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }
  // !SECTION
  // SECTION
  protected send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());

    const eventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected receive__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    try {
      this.webrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    } catch (error) {
      if (!(error instanceof NoSuchItemException)) throw error;
      // incase some random ppl send msg to this listener // ... (emm later todo)
      console.error(error); // how do i know if more some exception is nested inside --- well still pb then
    }
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }

  protected send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());

    const eventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected receive__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    // TODO // @pb: cuz didnt clean up the listeners -- this is removed multiple times
    this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }
  // !SECTION
  // SECTION
  protected send__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.webrtcConnection_Closed;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.close_webrtcConnection();

    // const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    // emt.remove_AllListeners_allDepth();
  }
  protected receive__webrtcConnection_Closed() {
    this.close_webrtcConnection();

    // const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    // emt.remove_AllListeners_allDepth();
  }
  // !SECTION
}
