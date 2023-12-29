import { ActionMeta, ActorRef, ActorRefWithDeprecatedState, DefaultContext, EventObject, Interpreter, State, StateSchema, TypegenDisabled, Typestate } from 'xstate';
import { isBuiltInEvent } from 'xstate/lib/utils';

                      

export default class XstateSendUtil {
  public static sendProperEvent<
    TContext = DefaultContext,
    TStateSchema extends StateSchema = any,
    TEvent extends EventObject = EventObject,
    TTypestate extends Typestate<TContext> = {
      value: any;
      context: TContext;
    },
    TResolvedTypesMeta = TypegenDisabled
  >(
    actorXst:   
    | Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta>   
      | ActorRef<TEvent, State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>>,
    event: TEvent
  ) {
    const state = actorXst.getSnapshot();
    if (state == null) {
      console.error(`actorXst.getSnapshot() === null :: actorXst.id: ${actorXst.id}, event: '${event}'.`);
    } else {
      if (!state.can(event)) {
        console.error(
          `Machine '${state.machine?.id}' at current state stage '${JSON.stringify(state.value)}' does not process event '${event.type}'.` +   
            `\nThe list of allowed events are: ${state.nextEvents}` +
            `\nActor '${actorXst.id}'`
        );
      }
    }
    actorXst.send(event);
  }

                                                    
  public static detmCanSend_or_send<
    TContext = DefaultContext,
    TStateSchema extends StateSchema = any,
    TEvent extends EventObject = EventObject,
    TTypestate extends Typestate<TContext> = {
      value: any;
      context: TContext;
    },
    TResolvedTypesMeta = TypegenDisabled,
    TCheckCanSend extends boolean = false
  >(
    actorXst:   
    | undefined   
      | Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta>
      | ActorRef<TEvent, State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>>,
    eventXst: TEvent,
    mode_CheckCanSend: TCheckCanSend
  ): TCheckCanSend extends true ? boolean : void;

  public static detmCanSend_or_send<
    TContext = DefaultContext,
    TStateSchema extends StateSchema = any,
    TEvent extends EventObject = EventObject,
    TTypestate extends Typestate<TContext> = {
      value: any;
      context: TContext;
    },
    TResolvedTypesMeta = TypegenDisabled
  >(
    actorXst:   
    | undefined   
      | Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta>
      | ActorRef<TEvent, State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>>,
    eventXst: TEvent,
    mode_CheckCanSend: boolean
  ): boolean | void {
                                                              
    if (mode_CheckCanSend) {
      if (actorXst === undefined) return false;
      if (actorXst === null) throw new TypeError();       
    } else {
      if (actorXst == null) throw new TypeError();
    }

    const state = actorXst.getSnapshot();
    if (state == null) {
      throw new TypeError();
                      
    }

    if (mode_CheckCanSend === true) {
      return state.can(eventXst);
    } else if (mode_CheckCanSend === false) {
      XstateSendUtil.sendProperEvent(actorXst, eventXst);
    } else {
      throw new TypeError();
    }
  }
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

         

                                                                                                                                    
                                        

     
                                                                                                                                                            
  
                  
  
                                                                                                          
     
                                    
  
                 
  
     
                                                                                                                                                                                                                        
     
                                                                       
