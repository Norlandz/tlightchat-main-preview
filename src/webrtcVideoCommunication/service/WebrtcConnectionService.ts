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
import { initRun } from '../../main';         
import { rtcConfig } from '../../InitRun';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { AppDispatch, RootState } from '../redux/ReduxStore';
import { videoConnectionLinkageDraftCurrSelected_ref } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';
import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { EventData, SCXML, SingleOrArray, State, Event, MarkAllImplementationsAsProvided, ResolveTypegenMeta, BaseActionObject, interpret } from 'xstate';
import {
  WebrtcConnectionStateMachineContext,
  WebrtcConnectionStateMachineEvent,
  WebrtcConnectionStateMachineService,
  WebrtcConnectionStateMachineTypestate,
  webrtcConnectionStateMachine,
} from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventName, onEvent_check_ReceivedEventIsProper } from '../xstate/WebrtcConnectionStateMachineEventName';
import { isBuiltInEvent } from 'xstate/lib/utils';

                                                                                                                                     

class WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
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

    this.webrtcConnectionAnchor_self.cleanup_AllListener_except(initRun.socket, [WebrtcConnectionEventType.offerPlainSignal_Sent, WebrtcConnectionEventType.offerPlainSignal_Cancelled]);                

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

  protected listen__offerDescription_Accepted_answerDescription_Sent(pc: RTCPeerConnection, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent;
                                                                                                               
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      await this.receive__offerDescription_Accepted_answerDescription_Sent(pc, signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }

  protected async accept__offerDescription_Sent(pc: RTCPeerConnection, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                               
                                              
                                                                                                                                                  
                                                                                                                                                          
                                                                                                                                                              
                                                                          
         
                                                                                                                                                                                                                
                                                                                 
                                                                                   
                                                                           
                                                     
                                                                               
                                                                                                                                                      

    this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer = signalserverWebsocketMsg.msgFrom;
    this.webrtcConnectionAnchor_self.offerConnectedList.move_OfferConnected(signalserverWebsocketMsg, this.webrtcConnectionAnchor_self.offerReceivedList);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());                                                                                                            

    const offerDescription_plain = signalserverWebsocketMsg.msgData as RTCSessionDescriptionInit_plain;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));
  }
             

            
  protected socketEmit_PeerLoc_clientSide_helper(eventType: WebrtcConnectionEventType, msgData: any, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation): SignalserverWebsocketMsg {
                                                                                                                          
                                                                                                                                                                                                                                                                     
    const webrtcConnectionEvent = new WebrtcConnectionEvent(eventType, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(SignalserverWebsocketMsgType.webrtcConnectionEvent_Category, msgData, webrtcConnectionEvent, this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation);                   
    initRun.socket.emit(eventType, signalserverWebsocketMsg);
    return signalserverWebsocketMsg;
  }

  protected validate_signalserverWebsocketMsg_Common_helper(
    signalserverWebsocketMsg_jsobj: unknown,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation
  ) {
                          
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) return;                                                                           
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
    callback_insideListener?: ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => Promise<void>) | ((signalserverWebsocketMsg: SignalserverWebsocketMsg) => void)
  ) {
    const socketio_listener = async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = this.validate_signalserverWebsocketMsg_Common_helper(signalserverWebsocketMsg_jsobj, webrtcConnectionAnchorLocation_peer);
      if (!signalserverWebsocketMsg) return;

      if (callback_insideListener) {
        await callback_insideListener(signalserverWebsocketMsg);
      }
    };
    initRun.socket.on(webrtcConnectionEventType, socketio_listener);
    this.webrtcConnectionAnchor_self.add_Listener_toCleanup(webrtcConnectionEventType, socketio_listener);
  }
             
}

enum WebrtcConnectionAnchorLocationSpecial {
  ListenFromAllLocation = 'ListenFromAllLocation',
}

class WebrtcConnectionService_lv2Abstract_OfferPlainSignal extends WebrtcConnectionService_lv1Abstract_WebrtcLowlevel {
            
  protected send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
    const msgData = null;
    const signalserverWebsocketMsg = this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.webrtcConnectionAnchor_self.offerSentList.add_OfferSent(signalserverWebsocketMsg);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }

  protected receive__offerPlainSignal_Sent(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.webrtcConnectionAnchor_self.offerReceivedList.add_OfferReceived(signalserverWebsocketMsg);
                           
                                                                                                                          
                                                                                                                                                                                                                                    
             
             
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

    this.listen__iceCandidate_Sent(pc, webrtcConnectionAnchorLocation_peer);                                  
                                                                                                                                                              

    this.listen__offerDescription_Accepted_answerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
    await this.send__offerDescription_Sent(pc, webrtcConnectionAnchorLocation_peer);
  }

  protected async receive__offerDescription_Sent__sendAnswerDescription(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    const pc = this.create_webrtcConnection();
    this.readyOn__publish_LocalMeidaStreamTrack__subscribe_RemoteMeidaStreamTrack(pc);
    this.readyOn__publish_Icecandidate(pc, signalserverWebsocketMsg.msgFrom);

    this.listen__iceCandidate_Sent(pc, signalserverWebsocketMsg.msgFrom);
                                                                                                                                                           

    await this.accept__offerDescription_Sent(pc, signalserverWebsocketMsg);
    await this.send__offerDescription_Accepted_answerDescription_Sent(pc, signalserverWebsocketMsg.msgFrom);
  }

  protected listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerDescription_Sent;
                                                                                                               
    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerDescription_Sent);

      await this.receive__offerDescription_Sent__sendAnswerDescription(signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }
             

            
  protected send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());

    const eventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);
  }

  protected receive__offerPlainSignal_Cancelled(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    try {
      this.webrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgFrom);
    } catch (error) {
      if (!(error instanceof NoSuchItemException)) throw error;
                                                                                 
      console.error(error);                                                                                
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
                                                                                      
    this.webrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
    this.dispatch_redux(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }
             

            
  protected send__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType = WebrtcConnectionEventType.webrtcConnection_Closed;
    const msgData = null;
    this.socketEmit_PeerLoc_clientSide_helper(eventType, msgData, webrtcConnectionAnchorLocation_peer);

    this.close_webrtcConnection();
  }
  protected receive__webrtcConnection_Closed() {
    this.close_webrtcConnection();
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
    this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
    this.listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer);                                                                       
  }

  public send_cancelConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    this.send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
  }

  public send_declineConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
  }

  public send_closeConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.webrtcConnection_Closed);
    this.send__webrtcConnection_Closed(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer);
  }

                                                                             

           
                                        
                                           
                                         
           
                                             
                                                                                                                                                                                      
                     
                                                                                                                                                                                                                             
                                                                                                                                          
                                        
                                                                                                                       
                                      
                
                                           
                                         
           
                                             
                                        
                                                                                                                                                                                        
        
                
                                                                   
       

  public readonly actorXst_webrtcConnectionStateMachine = (() => {
    const actorXst_webrtcConnectionStateMachine_L = interpret(
      webrtcConnectionStateMachine.withConfig({
        actions: {
                                                                           
          goOnline: (context, event, actionMeta) => {
            this.goOnline();
          },
          goOffline: (context, event, actionMeta) => {
            this.goOffline();
          },
          sendConnectionOffer: (context, event, actionMeta) => {
            console.log('MU', 'sendConnectionOffer', event);
                                                                                                                                                                                 
            if (videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
            this.sendConnectionOffer(videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer);
          },
          acceptConnectionOffer: (context, event, actionMeta) => {
            console.log('MU', 'acceptConnectionOffer', event);
            if (videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
            this.acceptConnectionOffer(videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer);
          },
          send_closeConnection: (context, event, actionMeta) => {
            this.send_closeConnection();
          },
          send_cancelConnectionOffer: (context, event, actionMeta) => {
            if (videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
            this.send_cancelConnectionOffer(videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer);
          },
          send_declineConnectionOffer: (context, event, actionMeta) => {
            if (videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
            this.send_declineConnectionOffer(videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer);
          },
                         
                                                             
                                                
                                                                                                                                                            
          receiveConnectionOffer: (context, event, actionMeta) => {
            console.log('LR', 'receiveConnectionOffer', event);
            this.receiveConnectionOffer(event.msg);
          },
          receive_cancelConnectionOffer: (context, event, actionMeta) => {
            this.receive_cancelConnectionOffer(event.msg);
          },
          receive_declineConnectionOffer: (context, event, actionMeta) => {
            this.receive_declineConnectionOffer(event.msg);
          },
          receive_closeConnection: (context, event, actionMeta) => {
            this.receive_closeConnection(event.msg);
          },
        },
        services: {
          proceedConnectionOffer: async (context, event, actionMeta) => {
            console.log('LR', 'proceedConnectionOffer', event);
            await this.proceedConnectionOffer(event.msg);
          },
        },
      })
    );
    onEvent_check_ReceivedEventIsProper(actorXst_webrtcConnectionStateMachine_L);
    actorXst_webrtcConnectionStateMachine_L.start();
    return actorXst_webrtcConnectionStateMachine_L;
  })();

                                              
  private static readonly mpp_webrtcConnectionEventType_vs_xstateEventType_receive = new Map<WebrtcConnectionEventType, WebrtcConnectionStateMachineEventName>([
    [WebrtcConnectionEventType.offerPlainSignal_Sent, WebrtcConnectionStateMachineEventName.evx_receive__offer_Sent],
    [WebrtcConnectionEventType.offerPlainSignal_Accepted, WebrtcConnectionStateMachineEventName.evx_receive__offer_Accepted],
    [WebrtcConnectionEventType.offerPlainSignal_Cancelled, WebrtcConnectionStateMachineEventName.evx_receive__offer_Cancelled],
    [WebrtcConnectionEventType.offerPlainSignal_Declined, WebrtcConnectionStateMachineEventName.evx_receive__offer_Declined],
    [WebrtcConnectionEventType.webrtcConnection_Closed, WebrtcConnectionStateMachineEventName.evx_receive__connection_Closed],
                                                                                                                                          
  ]);

                                  
                                                                        
    
                                                                                                                                                  
                                                                                                                                                       
                                         
                                                                      
  private listen_propagator_Xstate_Common_helper(
    webrtcConnectionEventType: WebrtcConnectionEventType,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation,
    cleanup_Listener?: () => void
  ) {
    const xstateEventType_receive = WebrtcConnectionService.mpp_webrtcConnectionEventType_vs_xstateEventType_receive.get(webrtcConnectionEventType);
    if (xstateEventType_receive == null) throw new TypeError();

    const callback_appLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      if (cleanup_Listener) {
        cleanup_Listener();
      }

               

      if (
        [
          WebrtcConnectionStateMachineEventName.evx_receive__offer_Accepted,
          WebrtcConnectionStateMachineEventName.evx_receive__offer_Cancelled,
          WebrtcConnectionStateMachineEventName.evx_receive__offer_Declined,
        ].includes(xstateEventType_receive)
      ) {
                                                                                                                                                                                            
        const actorXst_ProcessSendReceiveOffer = this.actorXst_webrtcConnectionStateMachine.machine.context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(
          signalserverWebsocketMsg.msgFrom.toString()
        );
        if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
                                                                        

        actorXst_ProcessSendReceiveOffer.send({
          type: xstateEventType_receive,
          msg: signalserverWebsocketMsg,
          offerNegotiationSessionId: 'DummyNotNeed',
        });
      } else {
                                           
        this.actorXst_webrtcConnectionStateMachine.send({
          type: xstateEventType_receive,
          msg: signalserverWebsocketMsg,
                                                       
          offerNegotiationSessionId: xstateEventType_receive === WebrtcConnectionStateMachineEventName.evx_receive__offer_Sent ? signalserverWebsocketMsg.msgFrom.toString() : 'DummyNotNeed',
        });
      }
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_appLogic_insideListener);
  }

  protected listen__offerPlainSignal_Sent() {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Sent;
    const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = undefined;
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Accepted;
                                                                                                               
    const cleanup_Listener = () => {
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

                                                                                                                                              
  protected listen__offerPlainSignal_Cancelled() {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const webrtcConnectionAnchorLocation_peer = WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation;
    const cleanup_Listener = undefined;
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
                                                                                                               
    const cleanup_Listener = () => {
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Accepted);
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.offerPlainSignal_Declined);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.webrtcConnection_Closed;
                                                                                                               
    const cleanup_Listener = () => {
      this.webrtcConnectionAnchor_self.cleanup_Listener_ofGivenEventType(initRun.socket, WebrtcConnectionEventType.webrtcConnection_Closed);
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

                                                                             

  public receiveConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.receive__offerPlainSignal_Sent(signalserverWebsocketMsg);
  }

  public async proceedConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.listen__webrtcConnection_Closed(signalserverWebsocketMsg.msgFrom);
    await this.receive__offerPlainSignal_Accepted__sendOfferDescription(signalserverWebsocketMsg.msgFrom);
  }

  public receive_cancelConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.receive__offerPlainSignal_Cancelled(signalserverWebsocketMsg);
  }

  public receive_declineConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.receive__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
  }

  public receive_closeConnection(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.receive__webrtcConnection_Closed();
  }
}

                                                                                  
                                                 

                                                      

                                                                      
                                                             

                                                                                                                      

                                             
