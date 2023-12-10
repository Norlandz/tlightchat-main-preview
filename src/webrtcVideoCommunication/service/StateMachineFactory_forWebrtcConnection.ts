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
import { WebrtcConnectionService } from './WebrtcConnectionService';
import {
  SignalserverWebsocketMsg,
  WebrtcConnectionEventType,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  WebrtcConnectionStateMachineEvent_ReceiveCommon,
  typeguardUnsafe__has_signalserverWebsocketMsg,
  typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer,
  webrtcConnectionStateMachine,
} from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from '../xstate/WebrtcConnectionStateMachineEventName';
import XstateSendUtil, { onEvent_check_ReceivedEventIsProper } from '../../util/xstate/XstateSendUtil';
import { WebrtcConnectionService_lv2Abstract_OfferPlainSignal } from './WebrtcConnectionService_lv2Abstract_OfferPlainSignal';

export class StateMachineFactory_forWebrtcConnection {
  constructor(private readonly webrtcConnectionService: WebrtcConnectionService) {}

  private create() {
    const actorXst_webrtcConnectionStateMachine = interpret(
      webrtcConnectionStateMachine.withConfig({
        actions: {
                                                                           
          goOnline: (context, event, _meta) => {
            this.webrtcConnectionService.goOnline();
          },
          goOffline: (context, event, _meta) => {
            this.webrtcConnectionService.goOffline();
          },
                                                                
                                           
                                 
                            
                                                                                     
                                                                                                    
                                                                                                               
                       
                                                                      
                
               
               
          sendConnectionOffer: (context, event, _meta) => {
            console.log('MU', 'sendConnectionOffer', event);
                                                                                                                                                                                 
                                                                                                                                           
                                                                                                                                  
                                                                                                                                                 
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.sendConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
          acceptConnectionOffer: (context, event, _meta) => {
            console.log('MU', 'acceptConnectionOffer', event);
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.acceptConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
          send_closeConnection: (context, event, _meta) => {
            this.webrtcConnectionService.send_closeConnection();
          },
          send_cancelConnectionOffer: (context, event, _meta) => {
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.send_cancelConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
          send_declineConnectionOffer: (context, event, _meta) => {
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.send_declineConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
                         
                                                             
                                                
                                                                                                                                                            
          receiveConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            console.log('LR', 'receiveConnectionOffer', event);
            this.webrtcConnectionService.receiveConnectionOffer(event.signalserverWebsocketMsg);
          },
          receive_cancelConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            this.webrtcConnectionService.receive_cancelConnectionOffer(event.signalserverWebsocketMsg);
          },
          receive_declineConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            this.webrtcConnectionService.receive_declineConnectionOffer(event.signalserverWebsocketMsg);
          },
          receive_closeConnection: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            this.webrtcConnectionService.receive_closeConnection(event.signalserverWebsocketMsg);
          },
        },
        services: {
                                                                                             
                                                          
          proceedConnectionOffer: async (context, event, _meta) => {
            console.log('LR', 'proceedConnectionOffer', event);
                                                                  
                                                                            
                                                                                                                  
            if (!typeguardUnsafe__has_signalserverWebsocketMsg(event)) throw new TypeError(JSON.stringify(event));
            await this.webrtcConnectionService.proceedConnectionOffer(event.signalserverWebsocketMsg);
          },
        },
      })
    );
    return actorXst_webrtcConnectionStateMachine;
  }

  public create_and_start() {
    const actorXst_webrtcConnectionStateMachine = this.create();
    onEvent_check_ReceivedEventIsProper(actorXst_webrtcConnectionStateMachine);
    actorXst_webrtcConnectionStateMachine.start();
    return actorXst_webrtcConnectionStateMachine;
  }

}
