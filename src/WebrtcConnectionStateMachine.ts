import { createMachine, interpret, assign } from 'xstate';

                                                
                                                                       
                                                  
                                                                                                                       

                                                                                                                            

                                                                   

                                                                              
                                                                                         
                                                                 
                                              
                                                                                          
                  
                                                 
                  
                                                                                                    
                                                                                             

                                                  

                                                                                                                         
                               
                                                       
                                                                                    

                                                                                                                      

                                                              
                                                                                                                         

export const webrtcConnectionStateMachine = createMachine(
  {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    context: {
      msg: 'initMsg',
    },
    initial: 'stage__NewVideoConnectionLinkageSetup',
    schema: {
      context: {} as { msg: string },
      events: {} as
        | { type: 'offerSent' }
        | { type: 'offerAccepted' }
        | { type: 'offerCancelled' }
        | { type: 'offerDeclined' }
        | { type: 'offerDebuggingGoAnyStage' }
        | { type: 'connectionClosed' }
        | { type: 'testEvent1' }
        | { type: 'testEvent2' }
        | { type: 'testEvent3' },
                                                                                                      
      services: {} as {
        simplePrintAndAssignToContextService: { data: string };
      },
    },
    tsTypes: {} as import('./WebrtcConnectionStateMachine.typegen').Typegen0,
    id: 'webrtcConnectionStateMachine',
    states: {
      stage__NewVideoConnectionLinkageSetup: {
        on: {
          event__makeUserOnline_quickSetup: {
            target: 'stage__online',
            actions: 'makeUserOnline_quickSetup',
          },

          link_local: {
            target: 'stage__NewVideoConnectionLinkageSetup',
            internal: true,
          },

          online: {
            target: 'stage__online',
            actions: 'onlineSetup',
          },
        },
      },

                                                                                         
      stage__online: {
        type: 'parallel',
        on: {
          offline: 'stage__offlineCleanup',
        },
        states: {
          stage__ready_send_offer_Sent__parallel: {
            initial: 'stage__ready_send_offer_Sent',
            states: {
              stage__ready_send_offer_Sent: {
                on: {
                  send_offer_Sent: {
                    target: '#webrtcConnectionStateMachine.stage__online.stage__ready_send_offer_Sent__parallel.stage__send_offer_Sent',
                  },
                },
              },
              stage__send_offer_Sent: {
                on: {
                  receive_offer_Accepted_answer_Sent: '#webrtcConnectionStateMachine.stage_connected',
                  receive_offer_Declined: '#webrtcConnectionStateMachine.stage__online',
                  send_offer_Cancelled: '#webrtcConnectionStateMachine.stage__online',
                },
              },
            },
          },
          stage__ready_receive_offer_Sent__parallel: {
            initial: 'stage__ready_receive_offer_Sent',
            states: {
              stage__ready_receive_offer_Sent: {
                on: {
                  receive_offer_Sent: {
                    target: '#webrtcConnectionStateMachine.stage__online.stage__ready_receive_offer_Sent__parallel.stage__receive_offer_Sent',
                  },
                },
              },
              stage__receive_offer_Sent: {
                on: {
                  send_offer_Accepted_answer_Sent: '#webrtcConnectionStateMachine.stage_connected',
                  send_offer_Declined: '#webrtcConnectionStateMachine.stage__online',
                  receive_offer_Cancelled: '#webrtcConnectionStateMachine.stage__online',
                },
              },
            },
          },
        },
      },
      stage_connected: {
        on: {
          connectionClosed: 'stage_connectionClosed',
          offline: 'stage_connectionClosed',
        },
      },

      stage_connectionClosed: {
        invoke: {
          src: 'connectionClosedCleanup',
          onDone: [
            {
                                                          
              target: '#webrtcConnectionStateMachine.stage__online',

              cond: 'noNeedGoOffline',
            },
            '#webrtcConnectionStateMachine.stage__offlineCleanup',
          ],
        },
      },

                                             
                          
                                                
        
                            
                                             
                     
                   
                 

                                               
                          
                                               
        
                            
                                             
                     
                   
                 
      stage__offlineCleanup: {
        invoke: {
          src: 'offlineCleanup',
          onDone: {
            target: 'stage__NewVideoConnectionLinkageSetup',
                                                        
          },
        },
      },
    },
  },
  {
    actions: {
      simplePrint: (context, event) => {
        console.log(event);
      },
      simplePrintError: (context, event) => {
        console.error(event);
      },
      simplePrintAndAssignToContext: assign((context, event) => {
        console.log(context);
        const context_new = { msg: 'assigned Idle: ' + JSON.stringify(event.data as unknown) };
        console.log(context_new);
        return context_new;
      }),
    },
    services: {
      simplePrintAndAssignToContextService: async () => {
        return 'eventVal_fromVal_simplePrintAndAssignToContextService_thisIsAutoInvokedWhenStageIsReached';
      },
      offerCancelledService: async () => {
        console.log('clean up cancelled');
      },
      offerDeclinedService: async () => {
        console.log('clean up declined');
      },
    },
  }
);
