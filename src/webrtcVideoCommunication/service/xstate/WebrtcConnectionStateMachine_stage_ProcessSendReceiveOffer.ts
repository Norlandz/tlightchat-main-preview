import { createMachine, interpret, assign, sendParent, pure, SingleOrArray, EventObject, AnyEventObject } from 'xstate';
// import { Typegen0 } from './WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen';
import { WebrtcConnectionStateMachineEvent, WebrtcConnectionStateMachineEvent_AbstractBase } from './WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from './WebrtcConnectionStateMachineEventName';
import { SignalserverWebsocketMsg } from '../../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../../messageSchema/WebrtcConnectionAnchorLocation';

export type WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer = {
  // evx_fromParent_stageReadySendReceiveOffer: WebrtcConnectionStateMachineEventName.evx_send__offer_Sent | WebrtcConnectionStateMachineEventName.evx_receive__offer_Sent | null;
};

export type WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer = {
  // adsadsadasd: { data: void };
  proceedConnectionOffer: { data: void }; // @messy type still
};
export type WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer = {
  value: any;
  context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer;
};

// ########

// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; function send_EventBackTo_ParentActorXst(context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, event: WebrtcConnectionStateMachineEvent) {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;   console.log('send_EventBackTo_ParentActorXst')
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;   console.log(event)
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;   sendParent({ type: event.type, msg: event.msg });
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;   // 1. can be react stale state pb // 1. can be just sendParent scope is wrong  1. dk how to see error when event is not sent properly
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;   // seems like send to parent is ignored ? (beside stale or other org fix slice pb)
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; }
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // @note,solve: []
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // @note,solve: The `send(...)` and `sendParent(...)` action creators do *not* imperatively send events to machines. They are pure functions that return an action object describing what is to be sent, e.g., `{ type: 'xstate.send', event: ... }`. An [interpreter](https://xstate.js.org/docs/guides/interpretation.html) will read these objects and then send them.
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // @note,solve: <>
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // @note,solve: https://xstate.js.org/docs/guides/communication.html#invoking-machines
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;;
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // thinking a way to HOC / nest a function inside ... but
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; //   sendParent({ type: event.type, msg: event.msg }).apply(this, [context, event, _meta]);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; //   // sendParent({ type: event.type, msg: event.msg })(context, event, _meta);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; //
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // []
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // const sendToAllSampleActors = pure((context, event) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // <>
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ;; // https://xstate.js.org/docs/guides/actions.html#pure-action
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; const send_EventBackTo_ParentActorXst = pure<WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, WebrtcConnectionStateMachineEvent>(
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   (context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, event: WebrtcConnectionStateMachineEvent) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     console.log('G2', 'send_EventBackTo_ParentActorXst', event);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     return sendParent({
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       type: event.type,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       // @ts-ignore
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       signalserverWebsocketMsg: event.signalserverWebsocketMsg as SignalserverWebsocketMsg,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       // @ts-ignore
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       webrtcConnectionAnchorLocation_peer: event.webrtcConnectionAnchorLocation_peer as WebrtcConnectionAnchorLocation,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       // @ts-ignore
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       offerNegotiationSessionId: event.offerNegotiationSessionId as string,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     });
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // event schema is diff, not sure those typecheck allow
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   }
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; );
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; // ########
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; export const webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer = createMachine<
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   WebrtcConnectionStateMachineEvent,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   WebrtcConnectionStateMachineTypestate_stage_ProcessSendReceiveOffer,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   Typegen0
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; >({
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMBOAXAxgYQHsA7IsHLAS2IGUsBDLMAWTpwAsLSB9WemLgPJEANpzAA6XnX4YwdCAE8eYIhC6ycYCgDcwXLgQBmhsBi7UVWAMRhtAD2Wr9Rk2YtEsAbQAMAXUSgAA4EsBSUxAEgdogALABMAMzicd6pCQkA7AAcCTExWQCMADQgCogArOUF4gCcceXedd4JAGwFBVnlAL5dJaiYuIQkZOFEtAzMrBzcUvxCoqSSfHqy8kqwKmoaWrrOxqbmljb26mQ7egb7bpY+-kggwaGjkdEI8UkpaZk5eYUlZQgChlyuIMnEYjVyukWuVEjUYj0+uhsPhiKRyFQxvRGCx2GIeMtBCIxEtpHoNk5Lq5Dh5jg5tjoLi4DgBBHCaQKMCC3SKPMKYl6ISHVBqpQpZPLlNpZf6xLJxWotLIS4FxDI1ZVxFqIkD9FFDdGjcY4qb42Z6eYk82ONRUg7uay2BwU23Msx4OhETTCYSQHn3PnPe6vPLecRZFpauIdDJtAo1Vqyt7lDLh4HeZXKiE1bzdXq65GDNEjTHGyZ4maEy2La0uvbUh1006aRn1g4AETICz9fl5IX5EWDsQSIvquc6LTqCRqSdaSXlDU6GXSEfqOr1ReGGJo2PL03JVeJNcJzfObbMbI5XP0rFGVggxAknG0BAA1hIN6it0bd7j9wSySJbtSX4U9WztC92TATlIBvbciAQZ8CBwBhMVuf0gn7INQFeAo1QVFIWhHFMc3KGIChaJN3nEdIagyDNYUSFIpXXQsv0NUtf1NStAOrCRrTA3YIJpR0TjrYTL2grkMIeLCBSHBBJxqcRI3lZoKJzGJYSTApvBiGjdO8NVshI7xslYgZ2JLHcJj-M1D2AgSGSEt0RKbZymSuLgPS9MAfR7O5MKeeScNiRJklSZpvlyfJilKRAtWUjJ0wXeVly0jILP1Yt4LLOyeLmI9+JPDzzzcp0bTKzscG7blewDOTB1Ct58lBVJdIKFM8hHGIMiTQoVIyCEGmjcj2i0np8yIAgIDgSJPwNaysVs7iD14oq+2CpqokQABaSj4oQfass3DibJNCs1sKxzCVWRRKtK4SHU2gciEFN44h0jpxG8Fpfvo+jRUKGoTqs3KuMugDrqtQlxNc56Gq2t6FPo-SOgKBJPnIuiRyo+UVMjFMql6yNl21fMFpyn8Vsh60+JAi5HtcySYNtW8QtkpH3rw+oVKBv7mmjTqqKG8QOlyeN2kMui8yRSzFvBmn-zpoqGf0JmvIRoLXvepTkkJiUKISCNYyTFIklaNJGlaGoYzzHogA */
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   id: 'webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   context: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // evx_fromParent_stageReadySendReceiveOffer: null,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // type: 'parallel',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // entry: ['goOnline'],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   initial: 'stage_process_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // tsTypes: {} as import('./WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen').Typegen0, // seems only this can auto trigger generate .....
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // strict: true,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   predictableActionArguments: true,
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   states: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     stage_process_send_receive__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_send__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage_send__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // actions: ['sendConnectionOffer', (context, event, _event) => console.log(_event)],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_receive__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // actions: ['receiveConnectionOffer', (context, event, _event) => console.log(_event)],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     stage_send__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_receive__offer_Accepted: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__connection_Established',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // actions: ['proceedConnectionOffer'], // async ...
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__receive__offer_Accepted__action',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_send__offer_Cancelled: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_receive__offer_Declined: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // stage__receive__offer_Accepted__action: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //   invoke: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //     src: 'proceedConnectionOffer',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //     onDone: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //       // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__connection_Established', // REVIEW
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //       target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //       actions: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //         'send_cancelConnectionOffer',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //         (context: WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer, event, _meta) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //           console.log('_actionMeta.state.event.data.msg', _meta.state.event.data.msg);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //           sendParent({ type: event.type, msg: _meta.state.event.data.msg }); // @messy // FIXMEX
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //       ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     //   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     stage__receive__offer_Sent: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_send__offer_Accepted: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__connection_Established',// REVIEW
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_receive__offer_Cancelled: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         evx_send__offer_Declined: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // target: '#webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage_ready_send_receive__offer_Sent',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           target: 'stage__OfferNegotiationSessionCompleted',
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           actions: [send_EventBackTo_ParentActorXst],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     stage__OfferNegotiationSessionCompleted: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       type: 'final', // Do i need to stop self?
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       entry: [
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         (context, event, _meta) => {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           console.log('G2', 'final stage__OfferNegotiationSessionCompleted', event);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // seems this prints the last event (curr event dont have)
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];           // console.log(_meta.state.value);
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];         },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];       ],
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];     },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // on: {
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   //  [WebrtcConnectionStateMachineEventName.evx__goOffline]: 'stage__offlineCleanup',// REVIEW
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;];   // },
// ;archived[design decide finner direct inner ins machine call; need use v5 catch even;]; });

export const webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMBOAXAxgYQHsA7IsHLAS2IGUsBDLMAWTpwAsLSB9WemLgAoYCOOLGpgiEAEpkwFAG5gA8gDNVYDADpedfgAdho2LB6SIXDHMVguXAus1cJRLAGIwCgB5mpdhxoYzpJYANoADAC6iKD6BLAUlMQxIF6IALQAjAAcAOxa2QBMACwArLnFlYW5uQDMuYUANCAAnoiFhaVapZmZtQBsAJzZ2YOZ-eHhpQC+082omLiEJGRJRLQMzKwc3Lr8QiJiLjLWSmqBOny2hocmvhZWojb+jkEu7p4+j-JKL4HBrgi0SQIDiCTWKTSCGKg3CWk6E1q4VhSP6lVyzTaCA6xXhg1ypVKg2K2X6hUyU1m83Q2HwxFI5Co63ojBY7E4tj2tgOxnE5lkTzOr0uek55j+TneHm8llOtnsry4AEEcKJ9IwIECUmDEkzIRkkfkptlwv1SYNapUTcVMYhaoNBlo0ZlOjDcuFMvjMrkqSAFrTlgy1htWdsOTwroIjEd+XLzpoRfxYOKFf8pZ97hKgng6ERRAAbfOQLUgnUQkFQ2q1LQE5Fo+2TYqFU22hD9BoFDqZQk1eq1TLFX3+pb01ZMkNbdm7SM8mNSAU-FTCrmZ1OSkLSr5yrNcAAiZHzHM1UW18V1yQr7Ud4SKzc6DpypJJrdyZu6tUJeQ6VYHtSHNJHFZGRoFlJx2TkZ2jExjgXGx420FdZUFeUAicFU1Q1OxWDWNwIGIMAtE4BQCAAawI4c6SA4NQLZcCI1FKNbj5ec42XSMkMXHd0LAdVICw4CiAQIiRAYJkgRLWIz3LUAoXSJE4UKH9TQpdsCW7VsiWrb0CUKE1wmKWpCkGfp-0WSig3HGiw2nBjZ2g2NkPgxN5W+Z41zeDcM2TPx3OVVUeI1CTQSkvVL2hD0tG7btdKbYohiMjFWjtYyClfH9e2qQpTIDUcBInWjwxXOzmJORy2IYji3NQjzXE3Srfl8nM8zAQtixPUsQovGTEHbXEJhyfpu1KKsiVKF9CUivJslKQa4sGRTMmywCLJAzYCps-YoJK2ChQuRDXIa6qAQ+GVvIsXz9xwQ9SGPYFJPBULurbPItA-AbilfV8DNbfpSkKbopjGXITVyT0CVmOYQCIAgIDgFIKMDMdVtDKcINsraYNYwJTwerrUgNYka1GQyySMmaXVbJsnQHbsyl6YYPUWyGEdy6i1ustHNqYzGyr2yMbl5TMDpQxV3hx88iH1BAXUybphhKYoXXCZsLVbPoFNGbt8VqUkiVJJbzKR5l2dR+iud5HnFyclczp3MWOtxyWwvSO9IvCeoZo+70H1bQy4W7fpA7i4b6n6eoDcRvKrNNoqMYcq3yv4eqRf+bjePO7DHuCx2pbkuKiYtQpScGcmmiS6Fsllso5qL3SijiiPWcsk26Nj7n47gxOXO3Xz7fuiWpZJOEdcVmab3dYGKl9zotGMy19ImSvfqZ6kzMjtmUdbyD25Y3mE0Q+CADkwCgAhKFEmgxHHABXfzIEgcXpPxhAXcrp1jObD78TGMp+jVqZcTkiKKMSupRkThB9MzAChso4t0KtvC2Hddr73YkfE+Z8KAX3WFfYgAAxOgFAiwQEflnKEZJcT9g+sDcYN5sgfjVh0bINYyjugmKad2TYIbTCAA */
  id: 'webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer',
  context: {
    // evx_fromParent_stageReadySendReceiveOffer: null,
  },
  // type: 'parallel',
  // entry: ['goOnline'],
  initial: 'stage_process_send_receive__offer_Sent',
  schema: {
    context: {} as WebrtcConnectionStateMachineContext_stage_ProcessSendReceiveOffer,
    events: {} as WebrtcConnectionStateMachineEvent,
    services: {} as WebrtcConnectionStateMachineService_stage_ProcessSendReceiveOffer,
  },
  tsTypes: {} as import('./WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.typegen').Typegen0,
  // strict: true,
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
      type: 'final', // Do i need to stop self?
      entry: [
        (context, event, _meta) => {
          console.log('G2', 'final stage__OfferNegotiationSessionSucceeded', event);
          // seems this prints the last event (curr event dont have)
          // console.log(_meta.state.value);
        },
        // okok indeed cuz that didnt send to parent to say that established ; now its disabled okok
        // @todo: get final state with sync?<, instead of manual send
        // 1. aga sendparent is an action ....
        // 1. that my statement of fixed just idk ... was not this anyways
        // no if its cancel or decline, & (any child machine) send this, parent will go to next stage .. that is wrong ... 
        sendParent({ type: WebrtcConnectionStateMachineEventTypeName.evx__OfferNegotiationSessionSucceeded } as WebrtcConnectionStateMachineEvent_AbstractBase),
      ],
    },
    stage__OfferNegotiationSessionFailed: {
      type: 'final', // Do i need to stop self?
      entry: [
        (context, event, _meta) => {
          console.log('G2', 'final stage__OfferNegotiationSessionFailed', event);
        },
        sendParent({ type: WebrtcConnectionStateMachineEventTypeName.evx__OfferNegotiationSessionFailed } as WebrtcConnectionStateMachineEvent_AbstractBase),
      ],
    },
  },
  // on: {
  //  [WebrtcConnectionStateMachineEventName.evx__goOffline]: 'stage__offlineCleanup',// REVIEW
  // },
});
