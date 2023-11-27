import { createMachine, interpret, assign, spawn, ActorRefWithDeprecatedState, send, sendTo } from 'xstate';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { Typegen0 } from './WebrtcConnectionStateMachine.typegen';
import {
  WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
  webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer,
} from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer';
import { WebrtcConnectionStateMachineEventName } from './WebrtcConnectionStateMachineEventName';

export type WebrtcConnectionStateMachineContext = {
  msg: string;
                                      
  readonly mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: Map<
    string,
    ActorRefWithDeprecatedState<WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, WebrtcConnectionStateMachineEvent, any, any>
  >;
};
export type WebrtcConnectionStateMachineEvent = {
  readonly type: keyof typeof WebrtcConnectionStateMachineEventName;
  readonly msg: SignalserverWebsocketMsg;
  readonly offerNegotiationSessionId: string;
};

export type WebrtcConnectionStateMachineService = {
                                                            
  proceedConnectionOffer: { data: void };
  webrtcConnectionStateMachine_stage_Online_dynamicAddListItem: { data: void };
};
export type WebrtcConnectionStateMachineTypestate = {
  value: any;
  context: WebrtcConnectionStateMachineContext;
};

                                                        
                                                                  

export const webrtcConnectionStateMachine = createMachine<
  WebrtcConnectionStateMachineContext,
  WebrtcConnectionStateMachineEvent,
  WebrtcConnectionStateMachineTypestate,
  WebrtcConnectionStateMachineService,
  Typegen0
>(
  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    id: 'webrtcConnectionStateMachine',
    context: {
      msg: 'initMsg',
      mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: new Map(),
    },
    initial: 'stage__NewVideoConnectionLinkageSetup',
                
                                                            
                                                         
                                                             
         
                                                                          
                                                                                                                                   
                    
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
                                                                                               
                                                    
                actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventName.evx_send__offer_Sent), 'sendConnectionOffer'],
              },
              evx_receive__offer_Sent: {
                                                                                                   
                                                       
                actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventName.evx_receive__offer_Sent), 'receiveConnectionOffer'],
              },
                             
              evx_receive__offer_Accepted: {
                                                                                         
                                                                    
                target: 'stage__receive__offer_Accepted__action',
                actions: [printOnAction(undefined, true)],
              },
              evx_send__offer_Cancelled: {
                                                                  
                                                                     
                actions: ['send_cancelConnectionOffer', printOnAction(undefined, true)],
              },
              evx_receive__offer_Declined: {
                                                                  
                                                                     
                actions: ['receive_declineConnectionOffer', printOnAction()],
              },
              evx_send__offer_Accepted: {
                target: '#webrtcConnectionStateMachine.stage__connection_Established',          
                                                                     
                actions: ['acceptConnectionOffer', printOnAction()],
              },
              evx_receive__offer_Cancelled: {
                                                                  
                                                                     
                actions: ['receive_cancelConnectionOffer', printOnAction()],
              },
              evx_send__offer_Declined: {
                                                                  
                                                                     
                actions: ['send_declineConnectionOffer', printOnAction()],
              },
                                                 
            },
          },
          stage__receive__offer_Accepted__action: {
            invoke: {
              src: 'proceedConnectionOffer',
              onDone: {
                                                                                                                                 
                target: '#webrtcConnectionStateMachine.stage__connection_Established',
              },
            },
            on: {
                                                 
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
            cond: function detm_LastEventIs_goOffline(context, event, _event) {
              return _event.state.event.type === WebrtcConnectionStateMachineEventName.evx__goOffline;
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

      stage__UnexpectedEvent: {
        type: 'final',
      },
    },
  }

      
                  
                                                                                                  
                                                     
           
         
      
      
                 
                                                                    
                                
                                                                                                  
                                    
                              
            
         
                  
                                                            
                                                                                                              
           
         
                
         
      
);

function printOnAction(msg?: string, mode_PrintEvent: boolean = false) {
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
  webrtcConnectionStateMachineEventName: WebrtcConnectionStateMachineEventName.evx_send__offer_Sent | WebrtcConnectionStateMachineEventName.evx_receive__offer_Sent
) {
  return assign<WebrtcConnectionStateMachineContext, WebrtcConnectionStateMachineEvent, WebrtcConnectionStateMachineEvent>(
    (context: WebrtcConnectionStateMachineContext, event: WebrtcConnectionStateMachineEvent) => {
                                                      
                                                            
      const actorXst = spawn(webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer, {
                                            
        name: event.offerNegotiationSessionId,
        sync: true,                                    
      });
      context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.set(event.offerNegotiationSessionId, actorXst);
      console.log('SP', 'spawn_actorXst_ProcessSendReceiveOffer', actorXst.id, actorXst.getSnapshot()?.value, actorXst);
      actorXst.send({
        type: webrtcConnectionStateMachineEventName,
        msg: 'msg is empty cuz button click doesnt put any info inside -- only the service & listener will use put the event.msg' as unknown as SignalserverWebsocketMsg,
        offerNegotiationSessionId: 'DummyNoNeed',
      });                
                                                                                                                                                                                                                                                                                                                            
                                                                    
      return context;                                                                                   
    }
  );
}

                                                
                                                                       
                                                  
                                                                                                                       

                                                                                                                            

                                                                   

                                                                              
                                                                                         
                                                                 
                                              
                                                                                          
                  
                                                 
                  
                                                                                                    
                                                                                             

                                                  

                                                                                                                         
                               
                                                       
                                                                                    

                                                                                                                      

                                                              
                                                                                                                         

                                                                                                
                                                                                  

                                                   
                                                                             
                                                                                                                                                       
                       

                                                                              

                             

                                                                      

                                                                       

                                                             
                                                              

                         
                                                                     
  
                                                                    

                                                                                                                                    
                                        
