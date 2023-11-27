
                                                                     

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "proceedConnectionOffer": "done.invoke.webrtcConnectionStateMachine.stage__online.stage__receive__offer_Accepted__action:invocation[0]";
        };
        missingImplementations: {
          actions: "acceptConnectionOffer" | "goOffline" | "goOnline" | "receiveConnectionOffer" | "receive_cancelConnectionOffer" | "receive_closeConnection" | "receive_declineConnectionOffer" | "sendConnectionOffer" | "send_cancelConnectionOffer" | "send_closeConnection" | "send_declineConnectionOffer";
          delays: never;
          guards: never;
          services: "proceedConnectionOffer";
        };
        eventsCausingActions: {
          "acceptConnectionOffer": "evx_send__offer_Accepted";
"goOffline": "";
"goOnline": "evx__goOnline";
"receiveConnectionOffer": "evx_receive__offer_Sent";
"receive_cancelConnectionOffer": "evx_receive__offer_Cancelled";
"receive_closeConnection": "evx_receive__connection_Closed";
"receive_declineConnectionOffer": "evx_receive__offer_Declined";
"sendConnectionOffer": "evx_send__offer_Sent";
"send_cancelConnectionOffer": "evx_send__offer_Cancelled";
"send_closeConnection": "evx__goOffline" | "evx_send__connection_Closed";
"send_declineConnectionOffer": "evx_send__offer_Declined";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "proceedConnectionOffer": "evx_receive__offer_Accepted";
        };
        matchesStates: "stage__NewVideoConnectionLinkageSetup" | "stage__UnexpectedEvent" | "stage__connection_Closed" | "stage__connection_Established" | "stage__offlineCleanup" | "stage__online" | "stage__online.stage__receive__offer_Accepted__action" | "stage__online.stage_ready_send_receive__offer_Sent" | { "stage__online"?: "stage__receive__offer_Accepted__action" | "stage_ready_send_receive__offer_Sent"; };
        tags: never;
      }
  