
                                                                     

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.webrtcConnectionStateMachine.stage_connectionClosed:invocation[0]": { type: "done.invoke.webrtcConnectionStateMachine.stage_connectionClosed:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "connectionClosedCleanup": "done.invoke.webrtcConnectionStateMachine.stage_connectionClosed:invocation[0]";
"offlineCleanup": "done.invoke.webrtcConnectionStateMachine.stage__offlineCleanup:invocation[0]";
        };
        missingImplementations: {
          actions: "makeUserOnline_quickSetup" | "onlineSetup";
          delays: never;
          guards: "noNeedGoOffline";
          services: "connectionClosedCleanup" | "offlineCleanup";
        };
        eventsCausingActions: {
          "makeUserOnline_quickSetup": "event__makeUserOnline_quickSetup";
"onlineSetup": "online";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "noNeedGoOffline": "done.invoke.webrtcConnectionStateMachine.stage_connectionClosed:invocation[0]";
        };
        eventsCausingServices: {
          "connectionClosedCleanup": "connectionClosed" | "offline";
"offlineCleanup": "done.invoke.webrtcConnectionStateMachine.stage_connectionClosed:invocation[0]" | "offline";
        };
        matchesStates: "stage__NewVideoConnectionLinkageSetup" | "stage__offlineCleanup" | "stage__online" | "stage__online.stage__ready_receive_offer_Sent__parallel" | "stage__online.stage__ready_receive_offer_Sent__parallel.stage__ready_receive_offer_Sent" | "stage__online.stage__ready_receive_offer_Sent__parallel.stage__receive_offer_Sent" | "stage__online.stage__ready_send_offer_Sent__parallel" | "stage__online.stage__ready_send_offer_Sent__parallel.stage__ready_send_offer_Sent" | "stage__online.stage__ready_send_offer_Sent__parallel.stage__send_offer_Sent" | "stage_connected" | "stage_connectionClosed" | { "stage__online"?: "stage__ready_receive_offer_Sent__parallel" | "stage__ready_send_offer_Sent__parallel" | { "stage__ready_receive_offer_Sent__parallel"?: "stage__ready_receive_offer_Sent" | "stage__receive_offer_Sent";
"stage__ready_send_offer_Sent__parallel"?: "stage__ready_send_offer_Sent" | "stage__send_offer_Sent"; }; };
        tags: never;
      }
  