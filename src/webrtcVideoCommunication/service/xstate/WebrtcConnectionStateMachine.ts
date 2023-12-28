import { createMachine, interpret, assign, spawn, ActorRefWithDeprecatedState, send, sendTo, Interpreter, MarkAllImplementationsAsProvided, ResolveTypegenMeta, BaseActionObject } from 'xstate';
import { SignalserverWebsocketMsg } from '../../messageSchema/WebSocketMessage';
// import { Typegen0 as Typegen0__WebrtcConnectionStateMachine } from './WebrtcConnectionStateMachine.typegen';
// import { Typegen0 as Typegen0__WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer } from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen';
import {
  WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
  WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer,
  webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer,
} from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer';
import { WebrtcConnectionStateMachineEventTypeName } from './WebrtcConnectionStateMachineEventName';
import { WebrtcConnectionAnchorLocation } from '../../messageSchema/WebrtcConnectionAnchorLocation';
import { StateMachineFactory_forWebrtcConnection } from '../StateMachineFactory_forWebrtcConnection';

// export type WebrtcConnectionStateMachineContext = {
//   msg: string;
//   // use string... aga js no .equals()
//   readonly mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: Map<
//     string,
//     // ActorRefWithDeprecatedState<WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, WebrtcConnectionStateMachineEvent, any, any>
//     // import { Typegen0 } from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen'; // child state machine es Typegen0, not the parent.
//     ActorRefWithDeprecatedState<
//       WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
//       WebrtcConnectionStateMachineEvent,
//       WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer,
//       ResolveTypegenMeta<
//         Typegen0__WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer,
//         WebrtcConnectionStateMachineEvent,
//         BaseActionObject,
//         WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer
//       >
//     >
//     // Interpreter<WebrtcConnectionStateMachineContext, any, WebrtcConnectionStateMachineEvent, WebrtcConnectionStateMachineTypestate, MarkAllImplementationsAsProvided>
//   >;
// };

export type WebrtcConnectionStateMachineContext = {
  readonly msg_dummyTestDebug: string;
  readonly stateMachineFactory_forWebrtcConnection: StateMachineFactory_forWebrtcConnection;
  // []
  // type T11 = ReturnType<(s: string) => void>;  // void
  // <>
  // https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function
  // readonly mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: Map<string, ReturnType<typeof spawn>>;
  readonly mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: Map<string, ReturnType<typeof spawn<typeof webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer>>>;
};

export interface WebrtcConnectionStateMachineEvent_AbstractBase {
  readonly type: keyof typeof WebrtcConnectionStateMachineEventTypeName;
}

// no default value in interface in Js (unlike Java...)
// no shadow field either
export interface WebrtcConnectionStateMachineEvent_ReceiveCommon extends WebrtcConnectionStateMachineEvent_AbstractBase {
  // readonly __classType: 'WebrtcConnectionStateMachineEvent_ReceiveCommon';
  readonly signalserverWebsocketMsg: SignalserverWebsocketMsg;
}
export interface WebrtcConnectionStateMachineEvent_ReceiveOfferSent extends WebrtcConnectionStateMachineEvent_ReceiveCommon {
  readonly type: WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent;
  readonly offerNegotiationSessionId: string;
}

export interface WebrtcConnectionStateMachineEvent_SendCommon extends WebrtcConnectionStateMachineEvent_AbstractBase {
  /** just specify the peer WebrtcConnectionAnchorLocation, before Socket send, WebrtcConnectionService will generate the appropriate SignalserverWebsocketMsg */
  readonly webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation;
}
export interface WebrtcConnectionStateMachineEvent_SendOfferSent extends WebrtcConnectionStateMachineEvent_SendCommon {
  readonly type: WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent;
  readonly offerNegotiationSessionId: string;
}

// TODO stricter check ... & enum, interface, string id trick, class serialization instanceof ... all those mess ..
// if (
//   !(
//     typeof (body as WebrtcConnectionStateMachineEvent_ReceiveOfferSent).type !== 'undefined' ||
//     typeof (body as WebrtcConnectionStateMachineEvent_ReceiveOfferSent).signalserverWebsocketMsg !== 'undefined' ||
//     typeof (body as WebrtcConnectionStateMachineEvent_ReceiveOfferSent).offerNegotiationSessionId !== 'undefined'
//   )
// ) {
//   return false;
// }

// >"
// @: yes there is no offerNegotiationSessionId here..
// @: but its provided anyways due to Xstate Event serialization
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveCommon(body: any): body is WebrtcConnectionStateMachineEvent_ReceiveCommon {
  if (body == null) return false;
  for (const key in body) {
    // if (typeof key === 'undefined') return false;
    if (!['type', 'signalserverWebsocketMsg'].includes(key) || key == null) return false;
  }
  return true;
}
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveOfferSent(body: any): body is WebrtcConnectionStateMachineEvent_ReceiveOfferSent {
  if (body == null) return false;
  for (const key in body) {
    // if (typeof key === 'undefined') return false;
    if (!['type', 'signalserverWebsocketMsg', 'offerNegotiationSessionId'].includes(key) || key == null) return false;
  }
  return true;
}
export function typeguardUnsafe__WebrtcConnectionStateMachineEvent_SendOfferSent(body: any): body is WebrtcConnectionStateMachineEvent_SendOfferSent {
  if (body == null) return false;
  for (const key in body) {
    // if (typeof key === 'undefined') return false;
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
  // // simplePrintAndAssignToContextService: { data: string };
  // proceedConnectionOffer: { data: void };
  // // webrtcConnectionStateMachine_stage_Online_dynamicAddListItem: { data: void };
};
export type WebrtcConnectionStateMachineTypestate = {
  value: any;
  context: WebrtcConnectionStateMachineContext;
};

// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // DANGEROUS @atten: comment inside does get removed ...
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // @atten: must use the inside tsTypes for auto typegen refresh...
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // export const webrtcConnectionStateMachine = createMachine<
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; //   WebrtcConnectionStateMachineContext,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; //   WebrtcConnectionStateMachineEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; //   WebrtcConnectionStateMachineTypestate,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; //   WebrtcConnectionStateMachineService,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; //   Typegen0__WebrtcConnectionStateMachine
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // >(
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; export const webrtcConnectionStateMachine = createMachine(
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMBOAXAxgYQHsA7IsHLAS2IGUsBDLMAWTpwAsLSA6WemAfX4A5MMgBqFCGAKESZSsQAynANZ0Y1MFgCuABwDEYAG4APQVAIB5IgBtOYANoAGALqJQugrAoKi7kCaIAIwA7ADMACxcAGwhAKwATNHJ0RFJAJwJADQgAJ6IYQAcYVwhEU4hhYXpVTURcQC+DTmomLiypORURLQMzKwc3LzqYILEdqT6EMRgXJxGBCqzrdj4xJ2+vYws7PY8fKP84-YI8wQ4DN3OLtf+nt6+-oEIoZEx8UkpadGZOfkIhSC7ziTiCQWSSQikQiTRa6FWHXk3S2-V2QwOghw6yRxH4AFFhmg7LA2JBDKZzFYAGZUiaOVx3Lw+bpPAphdJcJyFeJBBLhEJBCp-ApVLhBdIhJxQgXc7khWEgFbtbFdGj0bYDPbDAT8LFyVVEfGE4mkiDksywMBECCYlW+fh4GxeSC3JAge7M4ishBhdmc7lxXn8wUhYUIBLpKJBCI-MpOPlVPkKpVrfWbdWowazbWHPUbbpG+hEigksnGMwYMhgChGXN2guO50QV0eJmPN3PX0crk8vlhAVCvKIBJOJyc9I-KW+2MhcLJ+HKtPIjM7LP7Ea2pe4xuWs0t91tlkdxDVEJcX3xNIhaJxKFcsPlQpcOKFepBF9gkFOMLztqp-Nqn0q5ahiur1tuTq7voDhBG4boeu2oDPKe579refI3nehRhpCpRxJGNRONEhQvukcSNM0ioLv+OI9CumrohuRw0nSjpgHQRB6NBDLwYeXrHi8fZcCR0RoYUI5hDeoZDgg5Rnq+RRhIGkTihE6Q-gqRAEFI8BuimiIGiiwGkIyDxHkhiAALTRGGllxFw6SOU5zlOSE6S-gi4F0UBDHZqBIjiJI0gGb4yhEGoGhaHopmen4AlBJJZ4RkUULvoGcRhA+RGcgk4kRGU3yickHmLgB3kamiflMccJm8WZ-EWeGnwOURgblOkQTFPlYaRNEpQSlKuWOey9TypR+leUZvnrjqea0YWdDFqWEAxYhASIGkPWCs+hSxhEgIBp10QlTRhn0ZVM11luho7pAq3metCCpByhREQkcTER9qXYTJ7IctE778jUYROHEArHeN1EhcuPkXTmYwsfYbEcdFdWxd6govs+o7fvh5EfR9PXiVwERyS+FQkSECSRE0TRAA */
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     id: 'webrtcConnectionStateMachine',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     context: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       msg: 'initMsg',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: new Map(),
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     initial: 'stage__NewVideoConnectionLinkageSetup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     schema: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       context: {} as WebrtcConnectionStateMachineContext,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       events: {} as WebrtcConnectionStateMachineEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       services: {} as WebrtcConnectionStateMachineService,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     tsTypes: {} as import('./WebrtcConnectionStateMachine.typegen').Typegen0, // seems only this can auto trigger generate .....
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // strict: true,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     predictableActionArguments: true,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     states: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__NewVideoConnectionLinkageSetup: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           evx__goOnline: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__online',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             actions: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               'goOnline',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // (context, event, _meta) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   // em that print & debugger is diff thing .. // @atten FIXME
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   console.log(event);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   console.log(_meta);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   console.log(JSON.stringify(event));
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   console.log(JSON.stringify(_meta.state.value));
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // '*': actionMatchUnexpectedEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__online: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         // invoke: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //   src: 'webrtcConnectionStateMachine_stage_Online_dynamicAddListItem',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //   onDone: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //     target: 'stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //     // actions: ['send_connectionEstablished'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         // on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         //   evx__goOffline: 'stage__onlineCleanup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         initial: 'stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         states: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           stage_ready_send_receive__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_send__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine_stage_Online.stage_send__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // actions: ['sendConnectionOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage_process_send_receive__offer_Sent__parentMachineRedelegatedTo',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent), 'sendConnectionOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_receive__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine_stage_Online.stage__receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // actions: ['receiveConnectionOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage_process_send_receive__offer_Sent__parentMachineRedelegatedTo',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: [spawn_actorXst_ProcessSendReceiveOffer(WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent), 'receiveConnectionOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // // ############
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // stage_process_send_receive__offer_Sent__parentMachineRedelegatedTo: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               //   on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_receive__offer_Accepted: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine.stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // actions: ['proceedConnectionOffer'], // async ...
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: 'stage__receive__offer_Accepted__action',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: [printOnAction(undefined, true)],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_send__offer_Cancelled: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: 'stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: ['send_cancelConnectionOffer', printOnAction(undefined, true)],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_receive__offer_Declined: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: 'stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: ['receive_declineConnectionOffer', printOnAction()],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_send__offer_Accepted: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: '#webrtcConnectionStateMachine.stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine.stage__onlineCleanup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: ['acceptConnectionOffer', printOnAction()],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_receive__offer_Cancelled: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: 'stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: ['receive_cancelConnectionOffer', printOnAction()],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               evx_send__offer_Declined: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: 'stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 actions: ['send_declineConnectionOffer', printOnAction()],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // '*': actionMatchUnexpectedEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           stage__receive__offer_Accepted__action: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             invoke: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               src: 'proceedConnectionOffer',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               onDone: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__connection_Established', // REVIEW
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 target: '#webrtcConnectionStateMachine.stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];                 // target: '#webrtcConnectionStateMachine.stage__onlineCleanup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               // '*': actionMatchUnexpectedEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       // stage__onlineCleanup: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //   always: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //     {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       target: 'stage__offlineCleanup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       actions: ['cleanup_AllOtherOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       cond: function detm_LastEventIs_goOffline(context, event, _meta) {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //         return _meta.state.event.type === WebrtcConnectionStateMachineEventTypeName.evx__goOffline;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //     {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       target: 'stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //       actions: ['cleanup_AllOtherOffer'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       //   ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__connection_Established: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         entry: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           (context, event, _meta) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             // @todo cleanup child actors
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           evx__goOffline: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__connection_Closed',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             actions: ['send_closeConnection'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           evx_send__connection_Closed: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__connection_Closed',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             actions: ['send_closeConnection'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           evx_receive__connection_Closed: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__connection_Closed',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             actions: ['receive_closeConnection'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // '*': actionMatchUnexpectedEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__connection_Closed: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         // entry: ['cleanup closeConnection'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         always: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__offlineCleanup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             cond: function detm_LastEventIs_goOffline(context, event, _meta) {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];               return _meta.state.event.type === WebrtcConnectionStateMachineEventTypeName.evx__goOffline;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];             target: 'stage__online',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__offlineCleanup: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         entry: ['goOffline'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         always: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__NewVideoConnectionLinkageSetup',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       stage__UnexpectedEvent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         type: 'final',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   }
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   services: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     webrtcConnectionStateMachine_stage_Online_dynamicAddListItem: async (context, event) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       webrtcConnectionStateMachine_stage_Online;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // }
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   actions: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     simplePrintAndAssignToContext: assign((context, event) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       console.log(context);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       const context_new = { msg: 'assigned Idle: ' + JSON.stringify(event.data as unknown) };
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       console.log(context_new);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       return context_new;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     }),
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   services: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     simplePrintAndAssignToContextService: async () => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //       return 'eventVal_fromVal_simplePrintAndAssignToContextService_thisIsAutoInvokedWhenStageIsReached';
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   guards: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // }
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; );

// (not version thing; just design thing, the encapsulate.. seem do need fine access to pass event to inner machine instance ..
// ; dk more ; and wel said & just m said thing ..

// []
// transitions can either be an **internal** or **external** transition:
//
// *   An internal transition will *neither* exit nor reenter itself, so the state node's `entry` and `exit` actions will not be executed again.
// <>
// https://xstate.js.org/docs/guides/actions.html#actions-on-self-transitions
// evx__OfferNegotiationSessionFailed: { must have a target, else // error XstateSendUtil.ts:170 Machine 'webrtcConnectionStateMachine' does not accept event 'evx__OfferNegotiationSessionFailed'.

export const webrtcConnectionStateMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMBOAXAxgYQHsA7IsHLAS2IGUsBDLMAWTpwAsLSA6WemAfX4A5MMgBqFCGAKESZSsQAynANZ0Y1MFgCuABwDEYAG4APQVAIB5IgBtOYANoAGALqJQugrAoKi7kCaIAIxBAMwArFyhAByhACwA7E7hCeEAbEEATNEANCAAnogAtCGRmQCcCUEJVeHRcU6haWkAvi15qJi4sqTkVES0DMysHNy86mCCxHZjfJMYYHQQ+fywYEQQ-As4YBRGk-wEAGZHYBj8mkRYhqar65uHJ2cX61jObkggnt6+-oEIQSccTiXBCTgq4Pi0QScTyhQQ8VCXGSNUSmScaSc5VCQLaHXQ2HwxF6vkGjBY7HsPDmU1sVPGAgWSxWaw2WzIu32Uye50u12MZm2nIOx1OvNe7383x8-T+wVC1S44XKQTiMWhMWqsIKiERyJSMIS6Mx2LxIE6hJ68n6ZOGlNmE1pMzA1MdTOWdzZQr2Ip5LyuNzM-EsPJEFkoDBtcG8NG0OB2kEgks+0t+n3+IRCUTi0XCOfRmRzWThiHCTmiXHqZcLaUS4VCoTNFu6xOtNHo5JG9JphzpDsZiw9rM23q5jzF-v5t2DobA4YokZo0f6ADE6BQbEnXFKvDLiHKAWlyk4uAlyml6pk0jCj-ESwgyxWq05kmlMqFMhVG+1zQSW3I+nbIYKVGF0GQOHBW0Aoh+AAUXGNA7FgNhIEDcwrBOZ1kw8Xc01ADMMhPcpCwSUJymiaIKjfBJ72ic8uExQEGlIz8FWiJs-yJADSQ7O1QNdAR+Eg7j+jghCkJQiA0OHQRhJJUS8BsLwtw+HCflldNgiBIIoixcJMgNIJsWBWinB0oJwgs2IqjSHFmg4rouPkoDO3tMCezktsYPg+hEIoZDUIFdkdh9WSoN8fhFOUiBsK+XCNPw+VMgSLhPwvBIMnI6F31M8zLLzcFz0BN8HMtcKbV4kDu0dITyuISKlLWKTYtTBKAlLctT2abILKCKtyPvYidOBHMgWVLI0jqUr-2cgZKq7fsILqmCoqa-QHCCVS4vU-dNIfBIKycGpUkqGFc1Ve963KLhKk-NUqmBcjymmpyvNtKrFu5I5nUUxYiD0dbtxTeLdsShA4ls08iuvBsMRVIJ7yKHFTzCBVrzrcoIdxM0iAIKR4E+ZtXug96FrAHcdr8Pav1BEiqj00IMvCRGcRSqF9OxL8GlrF6rRJ+a3IEg4RHESRpD53xlCINQNC0PQKb3KmwcBPqGMBcIrticpsURzIjIY0j63iMyaiCeyfyJiWKuAsmhadewFbw9qEG1tJQUBCF3xzUjynvBpT3LLIKmY2Ggl55bScF8D7c+90WXuYLhS+54+UdtqM3RJEGghmJlVs+t7yyCsYgVProgvHEjPYi3OKtly+OqwTPOgsTfIkyA09B52QjiSI6ko7I0YiK971rNmfaNAy+uaMOa8cuu5ptqOPOWhros7pXneaa60qqKorwiI1aM-G6yKO6Jkm1tU4nDkT64+9yatFH7Nzof7dA3g94nMunAXKesmb3niFEFiFlMaqhfPWNobQgA */
  id: 'webrtcConnectionStateMachine',
  // ;moved; context: {
  // ;moved;   msg: 'initMsg',
  // ;moved;   mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: new Map(),
  // ;moved; },
  initial: 'stage__NewVideoConnectionLinkageSetup',
  schema: {
    context: {} as WebrtcConnectionStateMachineContext,
    events: {} as WebrtcConnectionStateMachineEvent,
    services: {} as WebrtcConnectionStateMachineService,
  },
  tsTypes: {} as import('./WebrtcConnectionStateMachine.typegen').Typegen0,
  // strict: true,
  predictableActionArguments: true,
  states: {
    stage__NewVideoConnectionLinkageSetup: {
      on: {
        evx__goOnline: {
          target: 'stage__online',
          actions: [
            'goOnline',
            // (context, event, _meta) => {
            //   // em that print & debugger is diff thing .. // @atten FIXME
            //   console.log(event);
            //   console.log(_meta);
            //   console.log(JSON.stringify(event));
            //   console.log(JSON.stringify(_meta.state.value));
            // },
          ],
        },
      },
    },

    // '*': actionMatchUnexpectedEvent,

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
            // evx__OfferNegotiationSessionCompleted: {
            //   target: '#webrtcConnectionStateMachine.stage__connection_Established',
            //   // actions: [printOnAction('Why nnooo')],
            // },
            evx__OfferNegotiationSessionSucceeded: {
              target: '#webrtcConnectionStateMachine.stage__connection_Established',
            },
            evx__OfferNegotiationSessionFailed: {
              // target: '#webrtcConnectionStateMachine.stage__connection_Established',
              target: 'stage_ready_send_receive__offer_Sent',
            },
          },
        },
      },
    },
    stage__connection_Established: {
      entry: [
        (context, event, _meta) => {
          // @todo cleanup child actors
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
        // '*': actionMatchUnexpectedEvent,
      },
    },

    stage__connection_Closed: {
      // entry: ['cleanup closeConnection'],
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

    // stage__UnexpectedEvent: {
    //   type: 'final',
    // },
  },
});

function printOnAction(msg?: string, mode_PrintEvent: boolean = true) {
  return (context: WebrtcConnectionStateMachineContext, event: WebrtcConnectionStateMachineEvent) => {
    if (msg || mode_PrintEvent) {
      // console.log('printOnAction');
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
      // if (event.msg == null) throw new TypeError();
      // if (event.msg.msgTo == null) throw new TypeError();
      if (!(typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveOfferSent(event) || typeguardUnsafe__WebrtcConnectionStateMachineEvent_SendOfferSent(event))) console.error(event);
      if (!typeguard__has_offerNegotiationSessionId(event)) throw new TypeError(); // wait... typscript can actually narrow down by this?.. hum
      // ;archived; const actorXst = spawn(webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer, {
      if (context.stateMachineFactory_forWebrtcConnection == null) throw new TypeError();
      const actorXst = spawn(context.stateMachineFactory_forWebrtcConnection.setup_OfferDecide_eachConnectionSession_childMachine(), {
        // name: event.msg.msgTo.toString(),
        name: event.offerNegotiationSessionId,
        sync: true, // fail with strict mode / wildcard
      });
      // @todo the new connection from same peer will overwrite the old connection (though current design its fine)
      context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.set(event.offerNegotiationSessionId, actorXst);
      console.log('SP', 'spawn_actorXst_ProcessSendReceiveOffer', actorXst.id, actorXst.getSnapshot()?.value, actorXst);
      // actorXst.subscribe((state) => {
      //   console.log('SN', 'subscribe', state.value, state);
      // });

      // ;not_needed; if (webrtcConnectionStateMachineEventName === WebrtcConnectionStateMachineEventTypeName.evx_receive__offer_Sent) {
      // ;not_needed;   if (!typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveOfferSent(event)) throw new TypeError();
      // ;not_needed;   const eventXst: WebrtcConnectionStateMachineEvent_ReceiveOfferSent = {
      // ;not_needed;     type: webrtcConnectionStateMachineEventName,
      // ;not_needed;     signalserverWebsocketMsg: 'msg is empty cuz button click doesnt put any info inside -- only the service & listener will use put the event.msg' as unknown as SignalserverWebsocketMsg,
      // ;not_needed;     offerNegotiationSessionId: 'DummyNoNeed',
      // ;not_needed;   };
      // ;not_needed;   actorXst.send(eventXst); // dk info diff
      // ;not_needed;   // sendTo(actorXst, { type: WebrtcConnectionStateMachineEventName.evx_send__offer_Sent, msg: 'msg is empty cuz button click doesnt put any info inside -- only the service & listener will use put the event.msg' as unknown as SignalserverWebsocketMsg, offerNegotiationSessionId: 'DummyNoNeed' }); // dk info diff
      // ;not_needed;   // can sync & subscribe .. or just directly send to parent ...
      // ;not_needed; } else if (webrtcConnectionStateMachineEventName === WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent) {
      // ;not_needed;   if (!typeguardUnsafe__WebrtcConnectionStateMachineEvent_SendOfferSent(event)) throw new TypeError();
      // ;not_needed;   const eventXst: WebrtcConnectionStateMachineEvent_SendOfferSent = {
      // ;not_needed;     type: webrtcConnectionStateMachineEventName,
      // ;not_needed;     webrtcConnectionAnchorLocation_peer: '',
      // ;not_needed;     offerNegotiationSessionId: 'DummyNoNeed',
      // ;not_needed;   };
      // ;not_needed;   actorXst.send(eventXst);
      // ;not_needed; }
      // @: because the offerNegotiationSessionId has already been obtained, & the msg will only be needed in parent state machine -- in the next action, not in child state machine -- child state machine only switch stage_states, no processing.
      // @: action order messy?
      const eventXst: WebrtcConnectionStateMachineEvent_AbstractBase = {
        type: webrtcConnectionStateMachineEventName,
      };
      actorXst.send(eventXst);

      return context; // @messy... // TODO dk xstate serialization like redux?... or immutability thing?
    }
  );
}

// @design-decision[forbidden send multi offer]:
// cuz the design of webrtc need create RTCPeerConnection tp send offer
// + need a list to maintain pending ones & decide
// + better just use text msg to send multi offer & confirm once one has decided to connect #{said} #{dk miss, wording}

// @thought[allow mix stage state tag; stage state allow for listener regsiter & unregister; visualize listener & clean up;]

// //TODO @design[no reuse connection (dont init at create offer?)]

// think then del/ yep if reuse that connection then better new one every time
// think then del/ -- but the pb is that why not a better one just sync setup all at once
// think then del/ -- instead of having to clean up & new one aga
// think then del/ -- reuse things is just bad
// think then del/ ((( thsoe designe already thought thought those suck brain me idfk more
// think then del/
// think then del/ aga the mix state tag thing em
// think then del/
// think then del/ actually is there really mix state? -- welll for this case its single connect emm
// think then del/ yeah there are indeed 2 state there & even interactive clean up others ...

// aga feels should be able to enclose both hum em

// 1. avoid cancel thing - & consistent with webrtc -- just send simple offer then  all in once -- allow extra round trip
// 1. no reuse & no multi offer
// 1. the parallel state should be tht wait for cmd hum
// those mean state ouside inside that no listen -- rt the entry is not there hum tt

// cuz use no pre webrtc setup -- just plain signal -- to simplify work -- the xstate & multi offer  said need rethink

// need think is that id or address --- which is disposble ...
// feels current manage is fine , that just throw the lowest lv of webrtc ; the id address can preserve just that -- tttt

// @que: aga why has a type prop & know inside ? is this a fixed syntax? what about bare string?
// @not_sure,no_knowlres: syntax for parallel (hierarchical states & inital state)

//                   evx_receive__offer_Declined: {
//                     target: '#webrtcConnectionStateMachine.stage__online',
//                     // actions: [''], // @design-pb: delegate to listener? @messy // dk logic can be too complex to handle inside xstate machine emm
//                   },

// | { type: 'evx__connection_Closed'; msg: SignalserverWebsocketMsg }; // emm

// TODO offline inother state

// aga now the msg send made a bit async out of order idk ... // @todo

// Dont use typesafe ---- the Xstate is very buggy on typesafe it sucks

// TODO fix the action expose in parent & child machine thing
// TODO guard against event from child machine vs manual event

// wait ok so just fixed?
// so last night was not able just cuz that ? ... & what other fixes?
//
// just added some auto say & now the cancel no; but other seem fine

// strict: true, // https://stackoverflow.com/questions/58904591/what-happens-if-you-send-an-event-that-doesnt-exist-in-react-xstate
// does not accept event 'xstate.update'

//TODO once received cannot send offer to others
// that allow close connection to others too...
