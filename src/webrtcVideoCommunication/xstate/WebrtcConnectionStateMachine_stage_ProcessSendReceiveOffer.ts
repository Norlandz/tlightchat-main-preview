import { createMachine, interpret, assign, sendParent, pure, SingleOrArray, EventObject, AnyEventObject } from 'xstate';
import { Typegen0 } from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen';
import { WebrtcConnectionStateMachineEvent } from './WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from './WebrtcConnectionStateMachineEventName';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';

export type WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer = {
                                                                                                                                                                                  
};

export type WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer = {
                                 
};
export type WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer = {
  value: any;
  context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer;
};

           

                                                                                                                                                                      
                                                      
                          
                                                         
                                                                                                                                             
                                                                                          
       
     
                        
                                                                                                                                                                                                                                                                                                                                                                               
                        
                                                                                            
     
                                                               
                                                                                                 
                                                                                      
        
           
                                                                 
           
                                                                   
const send_EventBackTo_ParentActorXst = pure<WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, WebrtcConnectionStateMachineEvent>(
  (context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, event: WebrtcConnectionStateMachineEvent) => {
    console.log('G2', 'send_EventBackTo_ParentActorXst', event);
    return sendParent({
      type: event.type,
                   
      signalserverWebsocketMsg: event.signalserverWebsocketMsg as SignalserverWebsocketMsg,
                   
      webrtcConnectionAnchorLocation_peer: event.webrtcConnectionAnchorLocation_peer as WebrtcConnectionAnchorLocation,
                   
      offerNegotiationSessionId: event.offerNegotiationSessionId as string,
    });
                                                           
  }
);

           

export const webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer = createMachine<
  WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineEvent,
  WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
  Typegen0
>({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  id: 'webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer',
  context: {
                                                       
  },
                      
                         
  initial: 'stage_process_send_receive__offer_Sent',
                                                                                                                                                               
                  
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
                                                                                                                 
                                                              
                                                                                                                          
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
        evx_send__offer_Cancelled: {
                                                                                                                        
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
        evx_receive__offer_Declined: {
                                                                                                                        
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
      },
    },
                                                
                  
                                         
                    
                                                                                                                              
                                                               
                       
                                            
                                                                                                              
                                                                                             
                                                                                                       
                 
               
             
           
         
    stage__receive__offer_Sent: {
      on: {
        evx_send__offer_Accepted: {
                                                                                                                          
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
        evx_receive__offer_Cancelled: {
                                                                                                                        
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
        evx_send__offer_Declined: {
                                                                                                                        
          target: 'stage__OfferNegotiationSessionCompleted',
          actions: [send_EventBackTo_ParentActorXst],
        },
      },
    },

    stage__OfferNegotiationSessionCompleted: {
      type: 'final',                           
      entry: [
        (context, event, _meta) => {
          console.log('G2', 'final stage__OfferNegotiationSessionCompleted', event);
                                                                    
                                            
        },
      ],
    },
  },
          
                                                                                               
       
});
