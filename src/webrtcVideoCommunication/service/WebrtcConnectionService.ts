import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
  SignalserverWebsocketMsgReceiverType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { initRun } from '../../main';
import { rtcConfig } from '../../InitRun';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { AppDispatch, RootState, sliceMppWebrtcConnectionAnchor } from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';
import { NoSuchItemException } from '../../exception/NoSuchItemException';

                                                                                                                                     

class WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
  constructor(
    protected readonly webrtcConnectionAnchor_self: WebrtcConnectionAnchor,   
                                  
    protected readonly dispatch: AppDispatch
  ) {}

            
                                                                                                                                            
                           
  protected create_webrtcConnection() {
                                                                
                                                                                                                                  
                                                               
                                                                                                                                                         
    const pc = new RTCPeerConnection(rtcConfig);
    this.webrtcConnectionAnchor_self.rtcPeerConnection = pc;
    if (this.webrtcConnectionAnchor_self.mediaStream_self == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.mediaStream_peer = new MediaStream();
    if (this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst(this.webrtcConnectionAnchor_self.mediaStream_peer);
    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
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

    this.webrtcConnectionAnchor_self.cleanup_AllListener_except(initRun.socket, [WebrtcConnectionEventType.offerPlainSignal_Sent, WebrtcConnectionEventType.offerPlainSignal_Cancelled]);                

    this.webrtcConnectionAnchor_self.offerConnectedList.clear();

    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            
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
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
      await pc.addIceCandidate(new RTCIceCandidate(signalserverWebsocketMsg.msgData as RTCIceCandidateInit));
    };
    const webrtcConnectionEventType = WebrtcConnectionEventType.iceCandidate_Sent;
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }

  protected send__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.webrtcConnection_Closed;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.close_webrtcConnection();
  }
  protected listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.webrtcConnection_Closed;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.webrtcConnection_Closed);

      this.close_webrtcConnection();
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }
             

            
  protected listen__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent);

                              
                                             
      this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
      this.webrtcConnectionAnchor_self.offerConnectedList.move_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerSentList);
      this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            

      if (this.webrtcConnectionAnchor_self.rtcPeerConnection == null) throw new TypeError();
      if (this.webrtcConnectionAnchor_self.rtcPeerConnection !== pc) throw new TypeError();
      const answerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
      await pc.setRemoteDescription(new RTCSessionDescription(answerDescription_plain));
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }

  protected async accept__offerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                               
                                              
                                                                                                                                                  
                                                                                                                                                          
                                                                                                                                                              
                                                                          
         
                                                                                                                                                                                                                
                                                                                 
                                                                                   
                                                                           
                                                     
                                                                               
                                                                                                                                                      

    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.move_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerReceivedList);
    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            

    const offerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));
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
             

            
  protected socketEmit_PeerLoc_clientSide_helper(eventType: WebrtcConnectionEventType, msgData: any, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation): SignalserverWebsocketMsg {
                                                                                                                          
                                                                                                                                                                                                                                                                     
    const webrtcConnectionEvent = new WebrtcConnectionEvent(eventType, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation);                   
    initRun.socket.emit(eventType, signalserverWebsocketMsg);
    return signalserverWebsocketMsg;
  }

  protected validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj: unknown, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | 'ListenFromAllLocation') {                       
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) return;                                                                           
    if (webrtcConnectionAnchorLocation_peer !== 'ListenFromAllLocation') {
                                                                                       
      if (!signalserverWebsocketMsg.msgFrom.equals(webrtcConnectionAnchorLocation_peer)) {
        console.error(`!(${signalserverWebsocketMsg.msgFrom}).equals(${webrtcConnectionAnchorLocation_peer})`);
        return;
      }
    }
    return signalserverWebsocketMsg;
  }
             
}

class WebrtcConnectionService_lv2Abstract_OfferPlainSignal extends WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
            
  protected send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
    const msgData = null;
    const signalserverWebsocketMsg = this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.webrtcConnectionAnchor_self.offerSentList.add_OfferSent(signalserverWebsocketMsg);
    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }

  protected listen__offerPlainSignal_Sent() {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
                                    
                                                                          
    const socketio_listener = (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
                                                    
                                              
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, 'ListenFromAllLocation');
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.offerReceivedList.add_OfferReceived(signalserverWebsocketMsg);
                             
                                                                                                                            
                                                                                                                                                                                                                                      
               
               
      this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
                                                                                                                                                    
                                                                                                                                                         
                                           
                                                                        
  }

  protected send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    const msgData = null;
    const signalserverWebsocketMsg = this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }
             

            
  protected listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);

      const pc = this.create_webrtcConnection();
      this.readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc);
      this.readyOn__publish_Icecandidate(pc, webrtcConnectionAnchorLocation_peer);

      this.listen__iceCandidate_Sent(pc, webrtcConnectionAnchorLocation_peer);                                  
      this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);

      this.listen__offerDescription_Accepted_answerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
      await this.send__offerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }

  protected listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Sent;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerDescription_Sent);

      const pc = this.create_webrtcConnection();
      this.readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc);
      this.readyOn__publish_Icecandidate(pc, webrtcConnectionAnchorLocation_peer);

      this.listen__iceCandidate_Sent(pc, webrtcConnectionAnchorLocation_peer);
      this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);

      await this.accept__offerDescription_Sent(pc, signalserverWebsocketMsg);
      await this.send__offerDescription_Accepted_answerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }
             

            
  protected send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());

    const eventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

                                                                                                                                              
  protected listen__offerPlainSignal_Cancelled() {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, 'ListenFromAllLocation');
      if (!signalserverWebsocketMsg) return;
      try {
        this.webrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgFrom);
      } catch (error) {
        if (!(error instanceof NoSuchItemException)) throw error;
                                                                                   
        console.error(error);                                                                                
      }
      this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }

  protected send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());

    const eventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);

                                                                                        
      this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
      this.dispatch(sliceMppWebrtcConnectionAnchor.actions.forceRefreshMpp());
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }
             

            
  protected doAndSend__webrtcConnectionAnchor_Online() {
                                                                                       
    const eventType = SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online;
    const msgData = null;
    const msgTo = null;
    const msgReceiverType = SignalserverWebsocketMsgReceiverType.allWebrtcConnectionAnchorLocation;
    const webrtcConnectionEvent = undefined;
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg( SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, msgTo, msgReceiverType );                   
    initRun.socket.emit(eventType, signalserverWebsocketMsg);
  }

  protected doAndSend__webrtcConnectionAnchor_Offline() {
    const eventType = SignalserverWebsocketMsgType.webrtcConnectionAnchor_Offline;
    const msgData = null;
    const msgTo = null;
    const msgReceiverType = SignalserverWebsocketMsgReceiverType.allWebrtcConnectionAnchorLocation;
    const webrtcConnectionEvent = undefined;
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg( SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, msgTo, msgReceiverType );                   
    initRun.socket.emit(eventType, signalserverWebsocketMsg);
  }
             
}

export class WebrtcConnectionService extends WebrtcConnectionService_lv2Abstract_OfferPlainSignal {
  public goOnline() {
    this.listen__offerPlainSignal_Sent();
    this.listen__offerPlainSignal_Cancelled();                                                                              
    this.doAndSend__webrtcConnectionAnchor_Online();
  }

  public goOffline() {
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Sent);
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Cancelled);
    this.doAndSend__webrtcConnectionAnchor_Offline();
  }

  public sendConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer);
                                                      
    this.listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);                               
    this.listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);                                                      
  }

  public acceptConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
    this.listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer);                                                                       
  }

  public closeConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    this.send__webrtcConnection_Closed(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer);
  }

  public cancelConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    this.send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
  }

  public declineConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
  }
}

                                                                                  
                                                 

                                                      

                                                                      
                                                             

                                                                                                                      