import { createMachine, interpret, assign, spawn, ActorRefWithDeprecatedState, send, sendTo, Interpreter, MarkAllImplementationsAsProvided, ResolveTypegenMeta, BaseActionObject } from 'xstate';
import { SignalserverWebsocketMsg } from '../../messageSchema/WebSocketMessage';
                                                                                                               
                                                                                                                                                                           
import {
  WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer,
  webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer,
} from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer';
import { WebrtcConnectionStateMachineEventTypeName } from './WebrtcConnectionStateMachineEventName';
import { WebrtcConnectionAnchorLocation } from '../../messageSchema/WebrtcConnectionAnchorLocation';
import { StateMachineFactory_forWebrtcConnection } from '../StateMachineFactory_forWebrtcConnection';

                                                      
                 
                                         
                                                                       
              
                                                                                                                                                     
                                                                                                                                                              
                                   
                                                                           
                                           
                                                                             
                            
                                                                                
                                             
                            
                                                                            
          
        
                                                                                                                                                                           
       
     

export type WebrtcConnectionStateMachineContext = {
  readonly msg_dummyTestDebug: string;
  readonly stateMachineFactory_forWebrtcConnection: StateMachineFactory_forWebrtcConnection;
       
                                                         
       
                                                                                         
                                                                                                         
  readonly mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: Map<string, ReturnType<typeof spawn<typeof webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer>>>;
};

export interface WebrtcConnectionStateMachineEvent_AbstractBase {
  readonly type: keyof typeof WebrtcConnectionStateMachineEventTypeName;
}

                                                       
                         
export interface WebrtcConnectionStateMachineEvent_ReceiveCommon extends WebrtcConnectionStateMachineEvent_AbstractBase {
                                                                             
  readonly signalserverWebsocketMsg: SignalserverWebsocketMsg;
}
export interface WebrtcConnectionStateMachineEvent_ReceiveOfferSent extends WebrtcConnectionStateMachineEvent_ReceiveCommon {
  readonly type: WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent;
  readonly offerNegotiationSessionId: string;
}

export interface WebrtcConnectionStateMachineEvent_SendCommon extends WebrtcConnectionStateMachineEvent_AbstractBase {
                                                                                                                                                                 
  readonly webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation;
}
export interface WebrtcConnectionStateMachineEvent_SendOfferSent extends WebrtcConnectionStateMachineEvent_SendCommon {
  readonly type: WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent;
  readonly offerNegotiationSessionId: string;
}

                                                                                                                   
       
       
                                                                                                  
                                                                                                                      
                                                                                                                    
      
      
                  
    

     
                                                      
                                                                
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveCommon(body: any): body is WebrtcConnectionStateMachineEvent_ReceiveCommon {
  if (body == null) return false;
  for (const key in body) {
                                                    
    if (!['type', 'signalserverWebsocketMsg'].includes(key) || key == null) return false;
  }
  return true;
}
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveOfferSent(body: any): body is WebrtcConnectionStateMachineEvent_ReceiveOfferSent {
  if (body == null) return false;
  for (const key in body) {
                                                    
    if (!['type', 'signalserverWebsocketMsg', 'offerNegotiationSessionId'].includes(key) || key == null) return false;
  }
  return true;
}
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_SendOfferSent(body: any): body is WebrtcConnectionStateMachineEvent_SendOfferSent {
  if (body == null) return false;
  for (const key in body) {
                                                    
    if (!['type', 'webrtcConnectionAnchorLocation_peer', 'offerNegotiationSessionId'].includes(key) || key == null) return false;
  }
  return true;
}
export function typeguard__has_offerNegotiationSessionId(body: any): body is { offerNegotiationSessionId: string } {
  if (body == null) return false;
  return typeof body.offerNegotiationSessionId === 'string';
}
export function typeguardUnsafe__has_signalserverWebsocketMsg(body: any): body is { signalserverWebsocketMsg: SignalserverWebsocketMsg } {
  if (body == null) return false;
  return typeof body.signalserverWebsocketMsg !== 'undefined';
}
export function typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(body: any): body is { webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation } {
  if (body == null) return false;
  return typeof body.webrtcConnectionAnchorLocation_peer !== 'undefined';
}

export type WebrtcConnectionStateMachineEvent =
  | WebrtcConnectionStateMachineEvent_AbstractBase
  | WebrtcConnectionStateMachineEvent_ReceiveCommon
  | WebrtcConnectionStateMachineEvent_ReceiveOfferSent
  | WebrtcConnectionStateMachineEvent_SendCommon
  | WebrtcConnectionStateMachineEvent_SendOfferSent;

export type WebrtcConnectionStateMachineService = {
                                                               
                                            
                                                                                     
};
export type WebrtcConnectionStateMachineTypestate = {
  value: any;
  context: WebrtcConnectionStateMachineContext;
};

                                                                                                                                                   
                                                                                                                                                             
                                                                                          
                                                                                                                                                        
                                                                                                                                    
                                                                                                                                  
                                                                                                                                      
                                                                                                                                    
                                                                                                                                      
                                                                                                
                                                                                                                                                     
                                                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                  
                                                                                                         
                                                                                                                
                                                                                                                                                                
                                                                                                 
                                                                                                                                                
                                                                                                        
                                                                                                                                                    
                                                                                                                                                 
                                                                                                                                                     
                                                                                                 
                                                                                                                                                                  
                                                                                                                                                                                                                           
                                                                                                               
                                                                                                                                
                                                                                                        
                                                                                                                                         
                                                                                                        
                                                                                                                     
                                                                                                                               
                                                                                                                 
                                                                                                                    
                                                                                                                                        
                                                                                                                                                                          
                                                                                                                                 
                                                                                                                                 
                                                                                                                                                 
                                                                                                                                                             
                                                                                                              
                                                                                                         
                                                                                                       
                                                                                                                                        
                                                                                                     
                                                                                                   
                                                                                          
                                                                                                                 
                                                                                                               
                                                                                                                                                                            
                                                                                                                 
                                                                                                                                                  
                                                                                                                                                     
                                                                                                          
                                                                                                        
                                                                                          
                                                                                                           
                                                                                                                                               
                                                                                                        
                                                                                          
                                                                                                                                                   
                                                                                          
                                                                                                            
                                                                                                                                            
                                                                                                            
                                                                                                                                
                                                                                                                                                                                          
                                                                                                                                               
                                                                                                                                                                                           
                                                                                                                                                                                                                                                    
                                                                                                           
                                                                                                                                   
                                                                                                                                                                                              
                                                                                                                                                  
                                                                                                                                                                                           
                                                                                                                                                                                                                                                          
                                                                                                           
                                                                                                                
                                                                                                              
                                                                                                                           
                                                                                                                                                                                 
                                                                                                                   
                                                                                                                                       
                                                                                                                                                                                    
                                                                                                                                                               
                                                                                                                                                            
                                                                                                                                                     
                                                                                                           
                                                                                                                                     
                                                                                                                                                          
                                                                                                                                                                
                                                                                                                                                                                   
                                                                                                           
                                                                                                                                       
                                                                                                                                                          
                                                                                                                                                                
                                                                                                                                                                        
                                                                                                           
                                                                                                                                    
                                                                                                                                                                                 
                                                                                                                                                                
                                                                                                                                                                           
                                                                                                                                                               
                                                                                                           
                                                                                                                                        
                                                                                                                                                          
                                                                                                                                                                
                                                                                                                                                                       
                                                                                                           
                                                                                                                                    
                                                                                                                                                          
                                                                                                                                                                
                                                                                                                                                                     
                                                                                                           
                                                                                                                                            
                                                                                                         
                                                                                                       
                                                                                                                                              
                                                                                                                
                                                                                                                                       
                                                                                                                  
                                                                                                                                                                                                                            
                                                                                                                                                                                 
                                                                                                                                                                           
                                                                                                           
                                                                                                         
                                                                                                            
                                                                                                                                            
                                                                                                         
                                                                                                       
                                                                                                     
                                                                                                   
                                                                                          
                                                                                                                           
                                                                                                               
                                                                                                         
                                                                                                                                          
                                                                                                                                             
                                                                                                                                                                            
                                                                                                                                                                                                       
                                                                                                            
                                                                                                          
                                                                                                         
                                                                                                                                                  
                                                                                                                                             
                                                                                                          
                                                                                                        
                                                                                                      
                                                                                          
                                                                                                                                 
                                                                                                           
                                                                                                                                 
                                                                                                                                    
                                                                                                       
                                                                                                     
                                                                                                        
                                                                                                                      
                                                                                                                                          
                                                                                                                                         
                                                                                                       
                                                                                                                                   
                                                                                                                                          
                                                                                                                                         
                                                                                                       
                                                                                                                                      
                                                                                                                                          
                                                                                                                                            
                                                                                                       
                                                                                                                                        
                                                                                                     
                                                                                                   
                                                                                          
                                                                                                                            
                                                                                                                                         
                                                                                                            
                                                                                                      
                                                                                                                                       
                                                                                                                                                                         
                                                                                                                                                                                                    
                                                                                                         
                                                                                                       
                                                                                                      
                                                                                                                               
                                                                                                       
                                                                                                     
                                                                                                   
                                                                                          
                                                                                                                         
                                                                                                                        
                                                                                                            
                                                                                                                                                     
                                                                                                     
                                                                                                   
                                                                                          
                                                                                                                          
                                                                                                                 
                                                                                                   
                                                                                                 
                                                                                              
                                                                                          
                                                                                                 
                                                                                                             
                                                                                                                                                                                             
                                                                                                                                                
                                                                                                      
                                                                                                    
                                                                                                 
                                                                                                 
                                                                                                            
                                                                                                                                                               
                                                                                                                           
                                                                                                                                                                                             
                                                                                                                               
                                                                                                                         
                                                                                                       
                                                                                                    
                                                                                                             
                                                                                                                                                       
                                                                                                                                                                                                         
                                                                                                      
                                                                                                    
                                                                                                           
                                                                                                    
                                                                                                 
                                                                                             

                                                                                                                               
                                                  

     
                                                                        
  
                                                                                                                                                
     
                                                                             
                                                                                                                                                                                                   

export const webrtcConnectionStateMachine = createMachine({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  id: 'webrtcConnectionStateMachine',
                       
                              
                                                                              
               
  initial: 'stage__NewVideoConnectionLinkageSetup',
  schema: {
    context: {} as WebrtcConnectionStateMachineContext,
    events: {} as WebrtcConnectionStateMachineEvent,
    services: {} as WebrtcConnectionStateMachineService,
  },
  tsTypes: {} as import('./WebrtcConnectionStateMachine.typegen').Typegen0,
                  
  predictableActionArguments: true,
  states: {
    stage__NewVideoConnectionLinkageSetup: {
      on: {
        evx__goOnline: {
          target: 'stage__online',
          actions: [
            'goOnline',
                                           
                                                                             
                                    
                                    
                                                    
                                                                
                 
          ],
        },
      },
    },

                                       

    stage__online: {
      initial: 'stage_ready_send_receive__offer_Sent',
      states: {
        stage_ready_send_receive__offer_Sent: {
          on: {
            evx_send__offer_Sent: {
              actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent), 'sendConnectionOffer'],
            },
            evx_receive__offer_Sent: {
              actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent), 'receiveConnectionOffer'],
            },
                                                       
                                                                                       
                                                          
                 
            evx__OfferNegotiationSessionSucceeded: {
              target: '#webrtcConnectionStateMachine.stage__connection_Established',
            },
            evx__OfferNegotiationSessionFailed: {
                                                                                       
              target: 'stage_ready_send_receive__offer_Sent',
            },
          },
        },
      },
    },
    stage__connection_Established: {
      entry: [
        (context, event, _meta) => {
                                       
        },
      ],
      on: {
        evx__goOffline: {
          target: 'stage__connection_Closed',
          actions: ['send_closeConnection'],
        },
        evx_send__connection_Closed: {
          target: 'stage__connection_Closed',
          actions: ['send_closeConnection'],
        },
        evx_receive__connection_Closed: {
          target: 'stage__connection_Closed',
          actions: ['receive_closeConnection'],
        },
                                           
      },
    },

    stage__connection_Closed: {
                                            
      always: [
        {
          target: 'stage__offlineCleanup',
          cond: function detm_LastEventIs_goOffline(context, event, _meta) {
            return _meta.state.event.type === WebrtcConnectionStateMachineEventTypeName.evx__goOffline;
          },
        },
        {
          target: 'stage__online',
        },
      ],
    },

    stage__offlineCleanup: {
      entry: ['goOffline'],
      always: {
        target: 'stage__NewVideoConnectionLinkageSetup',
      },
    },

                                
                       
         
  },
});

function printOnAction(msg?: string, mode_PrintEvent: boolean = true) {
  return (context: WebrtcConnectionStateMachineContext, event: WebrtcConnectionStateMachineEvent) => {
    if (msg || mode_PrintEvent) {
                                      
      if (msg) {
        console.log('SP', 'printOnAction', msg);
      }
      if (mode_PrintEvent) {
        console.log('SP', 'printOnAction', event);
      }
    }
  };
}

function spawn_actorXst_ProcessSendReceiveOffer(
  webrtcConnectionStateMachineEventName: WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent | WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent
) {
  return assign<WebrtcConnectionStateMachineContext, WebrtcConnectionStateMachineEvent, WebrtcConnectionStateMachineEvent>(
    (context: WebrtcConnectionStateMachineContext, event: WebrtcConnectionStateMachineEvent) => {
                                                      
                                                            
      if (!(typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveOfferSent(event) || typeguardUnsafe__WebrtcConnectionStateMachineEvent_SendOfferSent(event))) console.error(event);
      if (!typeguard__has_offerNegotiationSessionId(event)) throw new TypeError();                                                             
                                                                                                        
      if (context.stateMachineFactory_forWebrtcConnection == null) throw new TypeError();
      const actorXst = spawn(context.stateMachineFactory_forWebrtcConnection.setup_OfferDecide_eachConnectionSession_childMachine(), {
                                            
        name: event.offerNegotiationSessionId,
        sync: true,                                    
      });
                                                                                                                   
      context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.set(event.offerNegotiationSessionId, actorXst);
      console.log('SP', 'spawn_actorXst_ProcessSendReceiveOffer', actorXst.id, actorXst.getSnapshot()?.value, actorXst);
                                        
                                                              
            

                                                                                                                                        
                                                                                                                               
                                                                                              
                                                                      
                                                                                                                                                                                                                
                                                                   
                          
                                                                
                                                                                                                                                                                                                                                                                                                                              
                                                                                      
                                                                                                                                            
                                                                                                                            
                                                                                           
                                                                      
                                                                  
                                                                   
                          
                                                
                       
                                                                                                                                                                                                                                                    
                               
      const eventXst: WebrtcConnectionStateMachineEvent_AbstractBase = {
        type: webrtcConnectionStateMachineEventName,
      };
      actorXst.send(eventXst);

      return context;                                                                                   
    }
  );
}

                                                
                                                                       
                                                  
                                                                                                                       

                                                                                                                            

                                                                   

                                                                              
                                                                                         
                                                                 
                                              
                                                                                          
                  
                                                 
                  
                                                                                                    
                                                                                             

                                                  

                                                                                                                         
                               
                                                       
                                                                                    

                                                                                                                      

                                                              
                                                                                                                         

                                                                                                
                                                                                  

                                                   
                                                                             
                                                                                                                                                       
                       

                                                                              

                             

                                                                      

                                                                       

                                                             
                                                              

                         
                                                                     
  
                                                                    

                                                                                                                                    
                                        

                                                
                                               
