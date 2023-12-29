import { createMachine, interpret, assign, sendParent, pure, SingleOrArray, EventObject, AnyEventObject } from 'xstate';
                                                                                                   
import { WebrtcConnectionStateMachineEvent, WebrtcConnectionStateMachineEvent_AbstractBase } from './WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from './WebrtcConnectionStateMachineEventName';
import { SignalserverWebsocketMsg } from '../../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../../messageSchema/WebrtcConnectionAnchorLocation';

export type WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer = {
                                                                                                                                                                                  
};

export type WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer = {
                                 
  proceedConnectionOffer: { data: void };                     
};
export type WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer = {
  value: any;
  context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer;
};

           

                                                                                                                                                                                                                                                                 
                                                                                                                                                 
                                                                                                                     
                                                                                                                                                    
                                                                                                                                                                                                                                        
                                                                                                                                                                                     
                                                                                                  
                                                                                                
                                                                                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                   
                                                                                                                                                                                       
                                                                                                
                                                                                                                                                          
                                                                                                                                                                                            
                                                                                                                                                                                 
                                                                                                   
                                                                                                      
                                                                                                                                                            
                                                                                                      
                                                                                                                                                              
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                        
                                                                                                                                                           
                                                                                                                  
                                                                                                                  
                                                                                                              
                                                                                                                                                                                      
                                                                                                              
                                                                                                                                                                                                                  
                                                                                                              
                                                                                                                                                                      
                                                                                                  
                                                                                                                                                      
                                                                                              
                                                                                             
                                                                                          
                                                                                                      
                                                                                          
                                                                                                                                                                                   
                                                                                                                                                               
                                                                                                                               
                                                                                                                                                                 
                                                                                                                                                               
                                                                                                     
                                                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                              
                                                                                                       
                                                                                                                                                  
                                                                                               
                                                                                                                 
                                                                                                                    
                                                                                                                                               
                                                                                                                                                                                                                                                          
                                                                                                             
                                                                                                                              
                                                                                                      
                                                                                                                                        
                                                                                                      
                                                                                                                          
                                                                                                                                      
                                                                                                                                                                                          
                                                                                                     
                                                                                                                             
                                                                                                                                          
                                                                                                                                                                                             
                                                                                                     
                                                                                                   
                                                                                                 
                                                                                          
                                                                                                                        
                                                                                                      
                                                                                                                                 
                                                                                                                                                                                                            
                                                                                                                                                         
                                                                                                                                                                                                                     
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                                               
                                                                                                                                                                                                                   
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                                                 
                                                                                                                                                                                                                   
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                   
                                                                                                 
                                                                                                                                           
                                                                                                             
                                                                                                                                    
                                                                                                               
                                                                                                                                                                                                                         
                                                                                                                                                          
                                                                                                                  
                                                                                                                                       
                                                                                                                                                                                                         
                                                                                                                                                                                        
                                                                                                                                                                                                  
                                                                                                            
                                                                                                          
                                                                                                        
                                                                                                      
                                                                                                    
                                                                                                                            
                                                                                                      
                                                                                                                              
                                                                                                                                                                                                                     
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                                                  
                                                                                                                                                                                                                   
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                                              
                                                                                                                                                                                                                   
                                                                                                                                                       
                                                                                                                                                
                                                                                                     
                                                                                                   
                                                                                                 
                                                                                          
                                                                                                                                         
                                                                                                                                          
                                                                                                         
                                                                                                                               
                                                                                                                                                                               
                                                                                                                                                               
                                                                                                                                       
                                                                                                     
                                                                                                   
                                                                                                 
                                                                                               
                                                                                                     
                                                                                                                                                                                          
                                                                                                  
                                                                                              

export const webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer = createMachine({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  id: 'webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer',
  context: {
                                                       
  },
                      
                         
  initial: 'stage_process_send_receive__offer_Sent',
  schema: {
    context: {} as WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
    events: {} as WebrtcConnectionStateMachineEvent,
    services: {} as WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
  },
  tsTypes: {} as import('./WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen').Typegen0,
                  
  predictableActionArguments: true,
  states: {
    stage_process_send_receive__offer_Sent: {
      on: {
        evx_send__offer_Sent: {
          target: 'stage_send__offer_Sent',
        },
        evx_receive__offer_Sent: {
          target: 'stage__receive__offer_Sent',
        },
      },
    },

    stage_send__offer_Sent: {
      on: {
        evx_receive__offer_Accepted: {
          target: 'stage__receive__offer_Accepted__action',
        },
        evx_send__offer_Cancelled: {
          target: 'stage__OfferNegotiationSessionFailed',
          actions: ['send_cancelConnectionOffer'],
        },
        evx_receive__offer_Declined: {
          target: 'stage__OfferNegotiationSessionFailed',
          actions: ['receive_declineConnectionOffer'],
        },
      },
    },
    stage__receive__offer_Accepted__action: {
      invoke: {
        src: 'proceedConnectionOffer',
        onDone: {
          target: 'stage__OfferNegotiationSessionSucceeded',
        },
      },
    },
    stage__receive__offer_Sent: {
      on: {
        evx_send__offer_Accepted: {
          target: 'stage__OfferNegotiationSessionSucceeded',
          actions: ['acceptConnectionOffer'],
        },
        evx_receive__offer_Cancelled: {
          target: 'stage__OfferNegotiationSessionFailed',
          actions: ['receive_cancelConnectionOffer'],
        },
        evx_send__offer_Declined: {
          target: 'stage__OfferNegotiationSessionFailed',
          actions: ['send_declineConnectionOffer'],
        },
      },
    },

    stage__OfferNegotiationSessionSucceeded: {
      type: 'final',                           
      entry: [
        (context, event, _meta) => {
          console.log('G2', 'final stage__OfferNegotiationSessionSucceeded', event);
                                                                    
                                            
        },
                                                                                                    
                                                                     
                                              
                                                                          
                                                                                                                           
        sendParent({ type: WebrtcConnectionStateMachineEventTypeName.evx__OfferNegotiationSessionSucceeded } as WebrtcConnectionStateMachineEvent_AbstractBase),
      ],
    },
    stage__OfferNegotiationSessionFailed: {
      type: 'final',                           
      entry: [
        (context, event, _meta) => {
          console.log('G2', 'final stage__OfferNegotiationSessionFailed', event);
        },
        sendParent({ type: WebrtcConnectionStateMachineEventTypeName.evx__OfferNegotiationSessionFailed } as WebrtcConnectionStateMachineEvent_AbstractBase),
      ],
    },
  },
          
                                                                                               
       
});
