import { ActionMeta, BaseActionObject, EventObject, Interpreter, State, StateSchema, TypegenDisabled, Typestate } from 'xstate';
import { isBuiltInEvent } from 'xstate/lib/utils';

export enum WebrtcConnectionStateMachineEventName {
  evx__goOnline = 'evx__goOnline',
  evx__goOffline = 'evx__goOffline',
  evx_send__offer_Sent = 'evx_send__offer_Sent',
  evx_receive__offer_Sent = 'evx_receive__offer_Sent',
  evx_send__offer_Accepted = 'evx_send__offer_Accepted',
  evx_receive__offer_Accepted = 'evx_receive__offer_Accepted',
  evx_send__offer_Cancelled = 'evx_send__offer_Cancelled',
  evx_receive__offer_Cancelled = 'evx_receive__offer_Cancelled',
  evx_send__offer_Declined = 'evx_send__offer_Declined',
  evx_receive__offer_Declined = 'evx_receive__offer_Declined',
  evx_send__connection_Closed = 'evx_send__connection_Closed',
  evx_receive__connection_Closed = 'evx_receive__connection_Closed',
}

const arr_XstateBuiltInEvent_custom: RegExp[] = [/^xstate\.init$/, /^xstate\.update$/, /^done\.invoke\./];
                                                      

               
export function onEvent_check_ReceivedEventIsProper<
  TContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TResolvedTypesMeta = TypegenDisabled
>(actorXst: Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta>) {
                               
                                              
                                          
                                                           
                                          
                                                                  
        
                                         
                                                     
                                    
                                                                  
        
                            
  actorXst.onEvent((event: TEvent) => {
    console.log('>>CurrState onEvent', actorXst.getSnapshot().value);
                                                      
    console.log('>>PrevState onEvent', actorXst.getSnapshot().history?.value);
                                                                   
    console.log('>>CurrEvent onEvent', event);
                                                               
                                                      
                                                                  
    check_ReceivedEventIsProper(actorXst.getSnapshot().history, event);
  });
}

                                                             
                                                               
                                                             
                                                                                                       
function check_ReceivedEventIsProper<
  TContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TResolvedTypesMeta = TypegenDisabled
>(state: State<TContext, TEvent, TStateSchema, TTypestate, TResolvedTypesMeta> | undefined, event: TEvent): boolean {
  if (arr_XstateBuiltInEvent_custom.some((item) => item.test(event.type))) {
    return true;
  }

  if (state === undefined) {
    console.error(`history state is undefined? event '${event.type}'.`);
    return false;
  }

  if (
      
    !state.machine?.events.includes(event.type) &&
    !isBuiltInEvent(event.type)
  ) {
    console.error(
      `Machine '${state.machine?.id}' does not accept event '${event.type}'.` +   
        `\nThe list of allowed events are: ${state.events}`
    );
    return false;
  }

                                             
               
  if (!state.can(event)) {
    console.error(
      `Machine '${state.machine?.id}' at current state stage '${JSON.stringify(state.value)}' does not process event '${event.type}'.` +   
        `\nThe list of allowed events are: ${state.nextEvents}`
    );
    return false;
  }

  return true;
}

export const actionMatchUnexpectedEvent = {
  target: '#webrtcConnectionStateMachine.stage__UnexpectedEvent',
  actions: [
    function aa<TContext, TEvent extends EventObject>(context: TContext, event: TEvent, _meta: ActionMeta<TContext, TEvent>) {
      if (!check_ReceivedEventIsProper(_meta.state, event)) {
                                                            
        throw new TypeError();
      }
    },
  ],
                                                       
                                       
                                       
                                                               
       
};

         

                                                                                                                                    
                                        

     
                                                                                                                                                            
  
                  
  
                                                                                                          
     
                                    
  
                 
  
     
                                                                                                                                                                                                                        
     
                                                                       
