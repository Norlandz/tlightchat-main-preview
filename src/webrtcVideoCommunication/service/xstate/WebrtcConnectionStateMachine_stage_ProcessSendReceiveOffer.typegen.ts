
                                                                     

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "proceedConnectionOffer": "done.invoke.webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.stage__receive__offer_Accepted__action:invocation[0]";
        };
        missingImplementations: {
          actions: "acceptConnectionOffer" | "receive_cancelConnectionOffer" | "receive_declineConnectionOffer" | "send_cancelConnectionOffer" | "send_declineConnectionOffer";
          delays: never;
          guards: never;
          services: "proceedConnectionOffer";
        };
        eventsCausingActions: {
          "acceptConnectionOffer": "evx_send__offer_Accepted";
"receive_cancelConnectionOffer": "evx_receive__offer_Cancelled";
"receive_declineConnectionOffer": "evx_receive__offer_Declined";
"send_cancelConnectionOffer": "evx_send__offer_Cancelled";
"send_declineConnectionOffer": "evx_send__offer_Declined";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "proceedConnectionOffer": "evx_receive__offer_Accepted";
        };
        matchesStates: "stage__OfferNegotiationSessionFailed" | "stage__OfferNegotiationSessionSucceeded" | "stage__receive__offer_Accepted__action" | "stage__receive__offer_Sent" | "stage_process_send_receive__offer_Sent" | "stage_send__offer_Sent";
        tags: never;
      }
  