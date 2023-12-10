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
import { initRun, rtcConfig } from '../../InitRun';
import { AppDispatch } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import { plainToInstance } from 'class-transformer';

                                                                                                                                     
export class WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
  constructor(
    protected readonly webrtcConnectionAnchor_self: WebrtcConnectionAnchor                                                                                                                                                                                  
  ) {}

                 
           
  public dispatch_redux: AppDispatch = () => {
    throw new Error('dispatch_redux not initalized');
  };

                 
            
                                                                                                                                            
                           
  protected create_webrtcConnection() {
                                                                
                                                                                                                                  
                                                               
                                                                                                                                                         
    const pc = new RTCPeerConnection(rtcConfig);
    this.webrtcConnectionAnchor_self.rtcPeerConnection = pc;
    if (this.webrtcConnectionAnchor_self.mediaStream_self == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.mediaStream_peer = new MediaStream();
    if (this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst(this.webrtcConnectionAnchor_self.mediaStream_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    return pc;
  }

                                                                                       
                                                                                            
                 
                         
  protected close_webrtcConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = null;

    if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.rtcPeerConnection.close();
    this.webrtcConnectionAnchor_self.rtcPeerConnection = null;

                                                                            
    this.webrtcConnectionAnchor_self.mediaStream_peer = null;
    if (this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst(null);
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = null;

                                                                                                                       
                                                         
                                                              
                           

                                                                                                                                                                                                               
                                                                 
                                                                   

                                                              
    this.webrtcConnectionAnchor_self.offerConnectedList.clear();

    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            
  }
             
            
  protected readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc: RTCPeerConnection) {
    if (this.webrtcConnectionAnchor_self.mediaStream_self == null) throw new TypeError();                                
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

                                      
      const eventType = WebrtcConnectionEventType.iceCandidate_Sent;
      const msgData = event.candidate.toJSON();
      this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
    };
  }

                                                                    
  protected listen__iceCandidate_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.iceCandidate_Sent;
                                                                                                               
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
      await pc.addIceCandidate(new RTCIceCandidate(signalserverWebsocketMsg.msgData as RTCIceCandidateInit));
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }
             
            
       
  protected async send__offerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

                                                           
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

       
  protected async receive__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                            
                                           
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.move_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerSentList);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            

    if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
    if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
    const answerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(answerDescription_plain));
  }

  protected async accept__offerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                               
                                              
                                                                                                                                                  
                                                                                                                                                          
                                                                                                                                                              
                                                                          
         
                                                                                                                                                                                                                
                                                                                 
                                                                                   
                                                                           
                                                     
                                                                               
                                                                                                                                                      
    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.move_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerReceivedList);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            

    const offerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));
  }
             
            
  protected static ackCallback(serverAckMsg: string): void {
    console.log(serverAckMsg);
  }

  protected socketEmit_PeerLoc_clientSide_helper(eventType: WebrtcConnectionEventType, msgData: any, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation): SignalserverWebsocketMsg {
                                                                                                                          
                                                                                                                                                                                                                                                                     
    const webrtcConnectionEvent = new WebrtcConnectionEvent(eventType, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation);                   
    initRun.socketioClient_forWebrtcConnection.socket.emit(eventType, signalserverWebsocketMsg, WebrtcConnectionService_lv1Abstract_WebrtcLowlevel.ackCallback);
    return signalserverWebsocketMsg;
  }

  protected validate_signalserverWebsocketMsg_SelfAndPeerLocationMustMatch(
    signalserverWebsocketMsg_jsobj: unknown,
                                                                          
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation
  ) {
                          
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) return;                                                                           

    if (signalserverWebsocketMsg.msgFrom == null) throw new TypeError();
    if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    if (webrtcConnectionAnchorLocation_peer !== WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation) {
      if (!signalserverWebsocketMsg.msgFrom.equals(webrtcConnectionAnchorLocation_peer)) {
                                                                                         
                                                   
                                                    
        console.error(`!(${signalserverWebsocketMsg.msgFrom}).equals(${webrtcConnectionAnchorLocation_peer})`);
        return;
      }
    }

    return signalserverWebsocketMsg;
  }

  protected listen_Common_helper(
    webrtcConnectionEventType: WebrtcConnectionEventType,
                                                                           
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation,
    callback_AppLogic_insideListener: ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => Promise<void>) | ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => void)
  ) {
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_SelfAndPeerLocationMustMatch(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      await callback_AppLogic_insideListener(signalserverWebsocketMsg);
    };
                                                                                                          
    const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt.addListener_custom(
      webrtcConnectionEventType,
      webrtcConnectionAnchorLocation_peer === WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation
        ? null
        : WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer),
      socketio_listener
    );
                                                                                                             
  }
             
}

export enum WebrtcConnectionAnchorLocationSpecial {
  ListenFromAllLocation = 'ListenFromAllLocation',
}
