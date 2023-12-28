import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
  SignalserverWebsocketMsgReceiverType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { rtcConfig } from '../../session/AppSession';
import { AppDispatch } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import { plainToInstance } from 'class-transformer';
import { SocketioClientSession_forWebrtcConnection } from './EventEmitterNested_forWebrtcConnection';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';

// @design-dk[categorize function in a class]: let be with private / namespace / inner class / extends class / another class / others
export class WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
  constructor(
    protected readonly webrtcConnectionAnchor_self: WebrtcConnectionAnchor, // // TODO this state changes ... // FIXME stale_state problem ... // protected readonly dispatch: AppDispatch, // protected readonly send_webrtcConnection_xst: unknown, // TODO
    protected readonly socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection
  ) {}

  // ############
  // @messy
  public dispatch_redux: AppDispatch = () => {
    throw new Error('dispatch_redux not initalized');
  };

  // ############
  // SECTION
  // @: cannot use function -- cuz only lambda function can have declaration order & that makes sure webrtcConnectionAnchor_self is not null
  // nvm ... now its ok ttt
  protected create_webrtcConnection() {
    // ;wrong; // This is wrong for the side accepting the offer
    // ;wrong; if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    // // @: the old pb ... should not set connected yet ... //
    // webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer;
    const pc = new RTCPeerConnection(rtcConfig);
    this.webrtcConnectionAnchor_self.rtcPeerConnection = pc;
    if (this.webrtcConnectionAnchor_self.mediaStream_self == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.mediaStream_peer = new MediaStream();
    if (this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst(this.webrtcConnectionAnchor_self.mediaStream_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    return pc;
  }

  // yeah multi offer -- then the prev one accept the peerconnection -- conflict now ..
  // should ban multi offer // -- the key pb is not me, but the pc need send description ...
  // TODO @design
  // TODO @code_order ...
  protected close_webrtcConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = null;

    if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.rtcPeerConnection.close();
    this.webrtcConnectionAnchor_self.rtcPeerConnection = null;

    // ;dont need; this.webrtcConnectionAnchor_self.mediaStream_self = null;
    this.webrtcConnectionAnchor_self.mediaStream_peer = null;
    if (this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst(null);
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = null;

    // this.webrtcConnectionAnchor_self.cleanup_AllListener_except(initRun.socketioClient_forWebrtcConnection.socket, [
    //   WebrtcConnectionEventType.offerPlainSignal_Sent,
    //   WebrtcConnectionEventType.offerPlainSignal_Cancelled,
    // ]); // TODOX Not all

    // ;moved, dk design; const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    // ;moved, dk design; if (emt == null) throw new TypeError();
    // ;moved, dk design; emt.cleanup_AllListeners_IncludeNested();

    // the other 2 should be emptyed when connected .. but wel
    this.webrtcConnectionAnchor_self.offerConnectedList.clear();

    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp()); // @ aga, code_after_setstate pb just, as more understood React -- should be fine -- just a marker to fiber
  }
  // !SECTION
  // SECTION
  protected readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc: RTCPeerConnection) {
    if (this.webrtcConnectionAnchor_self.mediaStream_self == null) throw new TypeError(); // @duplicate_code-repeat_check
    for (const track of this.webrtcConnectionAnchor_self.mediaStream_self.getTracks()) {
      const rtcRtpSender = pc.addTrack(track, this.webrtcConnectionAnchor_self.mediaStream_self);
    }
    pc.ontrack = (event) => {
      if (this.webrtcConnectionAnchor_self.mediaStream_peer == null) throw new TypeError();
      for (const track of event.streams[0].getTracks()) {
        this.webrtcConnectionAnchor_self.mediaStream_peer.addTrack(track);
      }
    };
  }
  protected readyOn__publish_Icecandidate(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    pc.onicecandidate = (event) => {
      if (event.candidate === null) return;

      // ; toJSON vs JSON.stringify em
      const eventType = WebrtcConnectionEventType.iceCandidate_Sent;
      const msgData = event.candidate.toJSON();
      this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
    };
  }

  // TODO must clean up, otherwise multi listener will break the app
  protected listen__iceCandidate_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.iceCandidate_Sent;
    // const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
      await pc.addIceCandidate(new RTCIceCandidate(signalserverWebsocketMsg.msgData as RTCIceCandidateInit));
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }
  // !SECTION
  // SECTION
  // ##
  protected async send__offerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    //? why need to extract, not just send the whole offer?
    const offerDescription_plain: RTCSessionDescriptionInit_plain = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    const eventType = WebrtcConnectionEventType.offerDescription_Sent;
    const msgData = offerDescription_plain;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected async send__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answerDescription_plain: RTCSessionDescriptionInit_plain = {
      sdp: answerDescription.sdp,
      type: answerDescription.type,
    };

    const eventType = WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent;
    const msgData = answerDescription_plain;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  // ##
  protected async receive__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    // // @messy @code_order
    // listen__webrtcConnection_Closed(pc);
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.moveToSelfWithUpdate_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerSentList);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp()); // @ aga, code_after_setstate pb just, as more understood React -- should be fine -- just a marker to fiber

    if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
    if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
    const answerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(answerDescription_plain));
  }

  protected async accept__offerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    // // // @messy @code_order
    // // listen__webrtcConnection_Closed(pc);
    // // if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError(); // @duplicate_code-repeat_check
    // if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer == null) throw new TypeError(); // @duplicate_code-repeat_check
    // this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer;
    // dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    // //
    // //       const mppSignalserverWebsocketMsgId = this.webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer);
    // //       if (mppSignalserverWebsocketMsgId == null) throw new TypeError();
    // //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // //       const ssss = mppSignalserverWebsocketMsgId.values().next();
    // //       if (ssss.done) throw new TypeError();
    // //       const signalserverWebsocketMsg_fromPeer = ssss.value; // FIXMEX
    // const signalserverWebsocketMsg = this.webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.moveToSelfWithUpdate_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerReceivedList);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp()); // @ aga, code_after_setstate pb just, as more understood React -- should be fine -- just a marker to fiber

    const offerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));
  }
  // !SECTION
  // SECTION
  protected static ackCallback(serverAckMsg: string): void {
    console.log(serverAckMsg);
  }

  protected socketEmit_PeerLoc_clientSide_helper(eventType: WebrtcConnectionEventType, msgData: any, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation): SignalserverWebsocketMsg {
    // if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    // if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer.__typeDiscriminatorForClassTransformer === undefined) throw new TypeError('Someone pass in a jsobj but pretended to be a Class... -- classtransformer will fail on this');
    const webrtcConnectionEvent = new WebrtcConnectionEvent(eventType, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation); // prettier-ignore
    // this.socketioClientSession_forWebrtcConnection.socket.emit(eventType, signalserverWebsocketMsg, WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback);
    void SocketioClientUtil.emitWithAckError(
      this.socketioClientSession_forWebrtcConnection.socket,
      undefined,
      eventType,
      WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback,
      signalserverWebsocketMsg
    );
    return signalserverWebsocketMsg;
  }

  protected validate_signalserverWebsocketMsg_SelfAndPeerLocationMustMatch(
    signalserverWebsocketMsg_jsobj: unknown,
    // webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation
  ) {
    // @todo fix this type
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) return; // not for this webrtcConnectionAnchorId, so ignore it // @performance_fix

    if (signalserverWebsocketMsg.msgFrom == null) throw new TypeError();
    if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    if (webrtcConnectionAnchorLocation_peer !== WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation) {
      if (!signalserverWebsocketMsg.msgFrom.equals(webrtcConnectionAnchorLocation_peer)) {
        // only listen to specific peer, if not from that peer sth is wrong // TODO think
        // cuz didnt throw error cuz closed quickly
        // but the scaling is howdo i test that ????
        console.error(`!(${signalserverWebsocketMsg.msgFrom}).equals(${webrtcConnectionAnchorLocation_peer})`);
        return;
      }
    }

    return signalserverWebsocketMsg;
  }

  protected listen_Common_helper(
    webrtcConnectionEventType: WebrtcConnectionEventType,
    // webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation,
    callback_AppLogic_insideListener: ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => Promise<void>) | ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => void)
  ) {
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_SelfAndPeerLocationMustMatch(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      await callback_AppLogic_insideListener(signalserverWebsocketMsg);
    };
    // initRun.socketioClient_forWebrtcConnection.socket.on(webrtcConnectionEventType, socketio_listener);
    const emt = this.socketioClientSession_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt.addListener_custom(
      webrtcConnectionEventType,
      webrtcConnectionAnchorLocation_peer === WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation
        ? null
        : WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer),
      socketio_listener
    );
    // this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }
  // !SECTION
}

export enum WebrtcConnectionAnchorLocationSpecial {
  ListenFromAllLocation = 'ListenFromAllLocation',
}
