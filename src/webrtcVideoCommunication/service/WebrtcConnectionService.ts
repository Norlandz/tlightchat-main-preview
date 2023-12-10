import { SignalserverWebsocketMsg, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { initRun } from '../../InitRun';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { RootState } from '../redux/ReduxStore';
import { videoConnectionLinkageDraftCurrSelected_ref } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import {
  EventData,
  SCXML,
  SingleOrArray,
  State,
  Event,
  MarkAllImplementationsAsProvided,
  ResolveTypegenMeta,
  BaseActionObject,
  interpret,
  DefaultContext,
  StateSchema,
  EventObject,
  Typestate,
  TypegenDisabled,
  Interpreter,
  ActorRef,
} from 'xstate';
import {
  WebrtcConnectionStateMachineContext,
  WebrtcConnectionStateMachineEvent,
  WebrtcConnectionStateMachineEvent_AbstractBase,
  WebrtcConnectionStateMachineEvent_ReceiveCommon,
  WebrtcConnectionStateMachineEvent_ReceiveOfferSent,
  WebrtcConnectionStateMachineEvent_SendCommon,
  WebrtcConnectionStateMachineEvent_SendOfferSent,
  WebrtcConnectionStateMachineService,
  WebrtcConnectionStateMachineTypestate,
  typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveCommon,
  typeguardUnsafe__has_signalserverWebsocketMsg,
  typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer,
  webrtcConnectionStateMachine,
} from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from '../xstate/WebrtcConnectionStateMachineEventName';
import { isBuiltInEvent } from 'xstate/lib/utils';
import XstateSendUtil, { onEvent_check_ReceivedEventIsProper } from '../../util/xstate/XstateSendUtil';
import { WebrtcConnectionAnchorLocationSpecial } from './WebrtcConnectionService_lv1Abstract_WebrtcLowlevel';
import { WebrtcConnectionService_lv2Abstract_OfferPlainSignal } from './WebrtcConnectionService_lv2Abstract_OfferPlainSignal';
import { StateMachineFactory_forWebrtcConnection } from './StateMachineFactory_forWebrtcConnection';

   
    
        
        
                         
                         
         
    
        
      

                
                  
         
                         
                         
         
    
        
              
   
export class WebrtcConnectionService extends WebrtcConnectionService_lv2Abstract_OfferPlainSignal {
                             
                                                                             
                                                                                                                   
            
             

                 
                                                                             

  public goOnline() {
    this.listen__offerPlainSignal_Sent();                                                                              
                                                 
    this.doAndSend__webrtcConnectionAnchor_Online();
  }

  public goOffline() {
                                                                                                                                           
                                                                                                                                                
    this.doAndSend__webrtcConnectionAnchor_Offline();
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt_root.remove_AllListeners_allDepth();                                                                                                                                                                      
  }

          
                         
                                                                         
                                                             
                                                                                                            
                                                                                                                    
                                                                                                                        
                                                                                                                                                                       
                                                   
                                                         
                                                                                                                                                                  
        
                                                                                                                            
                                                                                                                                                                       
                                                                                                                                                                 
        
      

                 

                                           
                                                                                     
                                                                         
                                           
    
                
                                                                
                                                                      
                    

           
                                     
                                                           
                                                                                                           
                                                                                   
       
                                                                                              
                                                                                                                                                                                                                
                                                                  
                                                                                                                                                                                                            
       
                                                          
                                                                                                                                 
                                                                                        
                                                                                                                               
                                                                                              
                                                                  
                                                                               
                                                                                              
                                                                
                                           
                                                                              
                                                     
                                                                                                          
                                                                                                                                   
                                                                        
                                                                                                                                                                 
                                                                                                                                                                 
                                                                 
                                                                                            
                                                                                            
       
                                                                                                                       
                                                                                                                                              
                                                                                  
       
                     
                                                                                           
                                                                                       
                                                                    
           

  public sendConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();

                                                  
                                                                                                                         
                                                                                
                                                                                                                       
                                                                                      
                                                          
                                                                       
                                                                                      
                                                        
                                   
                                                                      
                                             
                                                                                                  
                                                                                                                           
                                                                
                                                                                                                                                         
                                                                                                                                                         
                                                         
                                                                                       
                                                                                       
                                                               

                                                                                      
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    emt_root.remove_AllListeners_beyondIncludeDepth2nd();                                           
    emt_root.create_nested(WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer));

    this.listen__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);                               
    this.listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);                                                      
    this.send__offerPlainSignal_Sent(webrtcConnectionAnchorLocation_peer);
  }

                                                                                                
  public acceptConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
                                                                       
    this.unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    this.listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.listen__offerDescription_Sent(webrtcConnectionAnchorLocation_peer);                                                                       
    this.send__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
  }

  public send_cancelConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
                                                                                                                                               
                                                                                                                                               
    this.unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer);
    this.unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
    this.send__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
  }

  public send_declineConnectionOffer(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    this.unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer);
    this.send__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer);
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
  }

  public send_closeConnection() {
    if (this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
    const webrtcConnectionAnchorLocation_peer = this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer;
                                                                                                                                             
    this.unlisten__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    this.send__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer);
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
                                                   
  }
             

                    
                                                                             
  public receiveConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                
                                                                   
                                                                             
    const eventEmitterNested = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
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
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
  }

  public receive_declineConnectionOffer(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__offerPlainSignal_Accepted(signalserverWebsocketMsg.msgFrom);
    this.unlisten__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
    this.receive__offerPlainSignal_Declined(signalserverWebsocketMsg.msgFrom);
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
  }

  public receive_closeConnection(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.unlisten__webrtcConnection_Closed(signalserverWebsocketMsg.msgFrom);
    this.receive__webrtcConnection_Closed();
    const emt_root = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom);
    emt_root.remove_Listener_ofGivenSessionId(sessionId);                        
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
                                                                                                                                                 
                                                                                                                                                 
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

                                                                                                                                              
  protected listen__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
                                                                                                               
    const cleanup_Listener = () => {
                                                                                                                                                 
                                                                                                                                                 
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.offerPlainSignal_Declined;
                                                                                                               
    const cleanup_Listener = () => {
                                                                                                                                                 
                                                                                                                                                 
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }

  protected listen__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const webrtcConnectionEventType = WebrtcConnectionEventType.webrtcConnection_Closed;
                                                                                                               
    const cleanup_Listener = () => {
                                                                                                                                               
    };
    this.listen_propagator_Xstate_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, cleanup_Listener);
  }
             

                     
                                                                 
                                                                                                                                              
                                                                                                                                                                                            
                                                                                
      
        
                                    
  private unlisten__offerPlainSignal_Accepted(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Accepted;
    const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__offerPlainSignal_Cancelled(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Cancelled;
    const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__offerPlainSignal_Declined(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.offerPlainSignal_Declined;
    const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
  private unlisten__webrtcConnection_Closed(webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
    const eventType_ToDel = WebrtcConnectionEventType.webrtcConnection_Closed;
    const emt = initRun.socketioClient_forWebrtcConnection.get_emt_WebrtcConnectionAnchor(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
    const sessionId_Within = WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
    emt.remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel, sessionId_Within);
  }
             

                                                       
                                                                             

                          
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  private readonly stateMachineFactory_forWebrtcConnection = new StateMachineFactory_forWebrtcConnection(this);
  private readonly actorXst_WebrtcConnection = this.stateMachineFactory_forWebrtcConnection.create_and_start();
             

                                           
  private receive_propagator_Xstate_Common_helper(eventTypeNameXst_receive: WebrtcConnectionStateMachineEventTypeName, signalserverWebsocketMsg: SignalserverWebsocketMsg) {
                                      
    if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent,   
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
                                     
    else if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Accepted,
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Cancelled,
        WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Declined,
      ].includes(eventTypeNameXst_receive)
    ) {
                                                                                                                  
                                                         
          
                                                                                                                                                                                          
      const actorXst_ProcessSendReceiveOffer = this.actorXst_WebrtcConnection.machine.context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(
        WebrtcConnectionAnchorLocation.toSessionIdWithPeer(this.webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self, signalserverWebsocketMsg.msgFrom)
      );
      if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
                                                                              

      const eventXst: WebrtcConnectionStateMachineEvent_ReceiveCommon = {
        type: eventTypeNameXst_receive,
        signalserverWebsocketMsg,
      };
      XstateSendUtil.sendProperEvent(actorXst_ProcessSendReceiveOffer, eventXst);
    } else {
      throw new TypeError(typeof eventTypeNameXst_receive + ' ' + eventTypeNameXst_receive);
    }
  }
             

                                          

                                  
                                                                        
    
                                                                                                                                                  
                                                                                                                                                       
                                         
                                                                      
  private listen_propagator_Xstate_Common_helper(
    webrtcConnectionEventType: WebrtcConnectionEventType,
                                                                          
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | WebrtcConnectionAnchorLocationSpecial.ListenFromAllLocation,
    cleanup_Listener?: () => void
  ) {
                                                
                                                                                                
    const mpp_webrtcConnectionEventType_vs_xstateEventType_receive = new Map<WebrtcConnectionEventType, WebrtcConnectionStateMachineEventTypeName>([
      [WebrtcConnectionEventType.offerPlainSignal_Sent, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent],
      [WebrtcConnectionEventType.offerPlainSignal_Accepted, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Accepted],
      [WebrtcConnectionEventType.offerPlainSignal_Cancelled, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Cancelled],
      [WebrtcConnectionEventType.offerPlainSignal_Declined, WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Declined],
      [WebrtcConnectionEventType.webrtcConnection_Closed, WebrtcConnectionStateMachineEventTypeName.evx_receive__connection_Closed],
                                                                                                                                            
    ]);

    const eventTypeNameXst_receive = mpp_webrtcConnectionEventType_vs_xstateEventType_receive.get(webrtcConnectionEventType);
    if (eventTypeNameXst_receive == null) throw new TypeError();

    const callback_AppLogic_insideListener = async (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
      if (cleanup_Listener) {
        cleanup_Listener();
      }

               
      this.receive_propagator_Xstate_Common_helper(eventTypeNameXst_receive, signalserverWebsocketMsg);
    };
    this.listen_Common_helper(webrtcConnectionEventType, webrtcConnectionAnchorLocation_peer, callback_AppLogic_insideListener);
  }

             

                                        
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
                                                     
    if (
      [
        WebrtcConnectionStateMachineEventTypeName.evx__goOnline,   
        WebrtcConnectionStateMachineEventTypeName.evx__goOffline,
      ].includes(eventTypeNameXst_send)
    ) {
      if (webrtcConnectionAnchorLocation_peer !== undefined) throw new TypeError();
      const eventXst: WebrtcConnectionStateMachineEvent_AbstractBase = {
        type: eventTypeNameXst_send,
      };
      return XstateSendUtil.detmCanSend_or_send(this.actorXst_WebrtcConnection, eventXst, mode_CheckCanSend);
                                                                                                                                  
    } else {
      if (webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
                                        
      if (
        [
          WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent,   
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
                                                                                                                                         
          };
          return XstateSendUtil.detmCanSend_or_send(this.actorXst_WebrtcConnection, eventXst, mode_CheckCanSend);
        }
      }
                                       
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
             

             
}

                                                                                  
                                                 

                                                      

                                                                      
                                                             

                                                                                                                      

                                             

                                               
                                                                                                                                        
                                                                              
