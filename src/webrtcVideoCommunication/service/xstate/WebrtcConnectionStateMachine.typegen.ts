
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: "goOffline" | "goOnline" | "receiveConnectionOffer" | "receive_closeConnection" | "sendConnectionOffer" | "send_closeConnection";
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "goOffline": "";
"goOnline": "evx__goOnline";
"receiveConnectionOffer": "evx_receive__offer_Sent";
"receive_closeConnection": "evx_receive__connection_Closed";
"sendConnectionOffer": "evx_send__offer_Sent";
"send_closeConnection": "evx__goOffline" | "evx_send__connection_Closed";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "stage__NewVideoConnectionLinkageSetup" | "stage__connection_Closed" | "stage__connection_Established" | "stage__offlineCleanup" | "stage__online" | "stage__online.stage_ready_send_receive__offer_Sent" | { "stage__online"?: "stage_ready_send_receive__offer_Sent"; };
        tags: never;
      }
  