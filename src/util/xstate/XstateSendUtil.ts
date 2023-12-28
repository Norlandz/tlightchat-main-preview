import { ActionMeta, ActorRef, ActorRefWithDeprecatedState, DefaultContext, EventObject, Interpreter, State, StateSchema, TypegenDisabled, Typestate } from 'xstate';
import { isBuiltInEvent } from 'xstate/lib/utils';

// "xstate": "^4.38.3"

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
    actorXst: //
    | Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta> //
      | ActorRef<TEvent, State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>>,
    event: TEvent
  ) {
    const state = actorXst.getSnapshot();
    if (state == null) {
      console.error(`actorXst.getSnapshot() === null :: actorXst.id: ${actorXst.id}, event: '${event}'.`);
    } else {
      if (!state.can(event)) {
        console.error(
          `Machine '${state.machine?.id}' at current state stage '${JSON.stringify(state.value)}' does not process event '${event.type}'.` + //
            `\nThe list of allowed events are: ${state.nextEvents}` +
            `\nActor '${actorXst.id}'`
        );
      }
    }
    actorXst.send(event);
  }

  // Conditional Type // need a function declaration
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
    actorXst: //
    | undefined //
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
    actorXst: //
    | undefined //
      | Interpreter<TContext, TStateSchema, TEvent, TTypestate, TResolvedTypesMeta>
      | ActorRef<TEvent, State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>>,
    eventXst: TEvent,
    mode_CheckCanSend: boolean
  ): boolean | void {
    // @: if just check can send -- then this can be null ....
    if (mode_CheckCanSend) {
      if (actorXst === undefined) return false;
      if (actorXst === null) throw new TypeError(); // ...
    } else {
      if (actorXst == null) throw new TypeError();
    }

    const state = actorXst.getSnapshot();
    if (state == null) {
      throw new TypeError();
      // return false;
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
// const arr_XstateBuiltInEvent_custom: string[] = [];

// @messy said
/**
 * @deprecated just check before send is better ...
 * @param actorXst
 */
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
  // // @ts-ignore // @idk_type
  // actorXst.onTransition((state, event) => {
  //   console.log('onTransition', state);
  //   console.log('onTransition', actorXst.getSnapshot());
  //   console.log('onTransition', event);
  //   check_ReceivedEventIsProper(actorXst.getSnapshot(), event);
  // });
  // actorXst.onSend((event: TEvent) => {
  //   console.log('onSend', actorXst.getSnapshot());
  //   console.log('onSend', event);
  //   check_ReceivedEventIsProper(actorXst.getSnapshot(), event);
  // });
  // @ts-ignore // @idk_type
  actorXst.onEvent((event: TEvent) => {
    // console.log('>>CurrState onEvent', actorXst.getSnapshot().value);
    // // console.log('onEvent', actorXst.getSnapshot());
    // console.log('>>PrevState onEvent', actorXst.getSnapshot().history?.value);
    // // console.log('onEvent', actorXst.getSnapshot().historyValue);
    // console.log('>>CurrEvent onEvent', event);
    // // @pb: this onEvent is after state stage changed????......
    // // check_ReceivedEventIsProper(event: EventObject)
    // // check_ReceivedEventIsProper(actorXst.getSnapshot(), event);
    check_ReceivedEventIsProper(actorXst.getSnapshot().history, event);
  });
}

// FIXME still the state using is stale just like onEvent ...
//  // @pb: this onEvent is after state stage changed????......
// F this just wont work with sync , uncaught everything fuck
// cannot catch all wildcard -- it just goes to the end target -- internal events will trigger that too
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
    //
    !state.machine?.events.includes(event.type) &&
    !isBuiltInEvent(event.type)
  ) {
    console.error(
      `Machine '${state.machine?.id}' does not accept event '${event.type}'.` + //
        `\nThe list of allowed events are: ${state.events}`
    );
    return false;
  }

  // const snapshot = actorXst.getSnapshot();
  // @ts-ignore
  if (!state.can(event)) {
    console.error(
      `Machine '${state.machine?.id}' at current state stage '${JSON.stringify(state.value)}' does not process event '${event.type}'.` + //
        `\nThe list of allowed events are: ${state.nextEvents}`
    );
    return false;
  }

  return true;
}

/** @deprecated */
export const actionMatchUnexpectedEvent = {
  target: '#webrtcConnectionStateMachine.stage__UnexpectedEvent',
  actions: [
    function aa<TContext, TEvent extends EventObject>(context: TContext, event: TEvent, _meta: ActionMeta<TContext, TEvent>) {
      if (!check_ReceivedEventIsProper(_meta.state, event)) {
        // console.log('MM', 'unknown event passed', event);
        throw new TypeError();
      }
    },
  ],
  // inf loop seems cuz internal send back to self aga?
  // condition is causing inf loop emmm
  // cond: (context, event, _meta) => {
  //   return !check_ReceivedEventIsProper(_meta.state, event);
  // },
};

// REVIEW

// strict: true, // https://stackoverflow.com/questions/58904591/what-happens-if-you-send-an-event-that-doesnt-exist-in-react-xstate
// does not accept event 'xstate.update'

// []
// ### Use wildcard `*` transitions, not strict mode[](https://stately.ai/docs/migration#use-wildcard--transitions-not-strict-mode "Direct link to heading")
//
// Breaking change
//
// Strict mode is removed. If you want to throw on unhandled events, you should use a wildcard transition:
// <>
// https://stately.ai/docs/migration
//
// more do say em
//
// []
// [Wildcard event descriptors](https://xstate.js.org/docs/guides/transitions.html#wildcard-descriptors) (`"*"`) 4.7+, which match any event if the event is not matched explicitly by any other transition in the state
// <>
// https://xstate.js.org/docs/guides/transitions.html#event-descriptors
