import { interpret } from 'xstate';
import { WebrtcConnectionService } from './WebrtcConnectionService';

import {
  WebrtcConnectionStateMachineEvent_ReceiveCommon,
  typeguardUnsafe__has_signalserverWebsocketMsg,
  typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer,
  webrtcConnectionStateMachine,
} from './xstate/WebrtcConnectionStateMachine';
import { onEvent_check_ReceivedEventIsProper } from '../../util/xstate/XstateSendUtil';
import { webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer } from './xstate/WebrtcConnectionStateMachine_stage_ProcessSendReceiveOffer';

export class StateMachineFactory_forWebrtcConnection {
  constructor(private readonly webrtcConnectionService: WebrtcConnectionService) {}

  private setup_OfferAccept_onlineSession_parentMachine() {
    return webrtcConnectionStateMachine.withConfig(
      {
        actions: {
          // ? @que: aga const in js, can this order & closure really work?
          goOnline: (context, event, _meta) => {
            this.webrtcConnectionService.goOnline();
          },
          goOffline: (context, event, _meta) => {
            this.webrtcConnectionService.goOffline();
          },
          // cleanup_AllOtherOffer: (context, event, _meta) => {
          //   console.log('howwwwwwwwwww')
          //   console.log(event)
          //   // TODO messy
          //   if (typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) {
          //   // if (typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(_meta.state.event)) {
          //     this.webrtcConnectionService.cleanup_AllOtherOffer(event.webrtcConnectionAnchorLocation_peer);
          //   } else {
          //     this.webrtcConnectionService.cleanup_AllOtherOffer();
          //   }
          // },
          // ##
          sendConnectionOffer: (context, event, _meta) => {
            console.log('MU', 'sendConnectionOffer', event);
            // ......... WHY i have to use Redux & immutable & stale state & rerender performance nonsense?!!!!!!!! Just use GLOBAL var ----- its so much better ....... // FIXME
            // this play with global variable feels dangerous -- the disconnect from the peer xstate session & the actual peer send to emmm
            // if (videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer == null) throw new TypeError();
            // this.webrtcConnectionService.sendConnectionOffer(videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer);
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.sendConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
          send_closeConnection: (context, event, _meta) => {
            this.webrtcConnectionService.send_closeConnection();
          },
          // ############
          // FIXME TODO  // @design  dk is this layering good
          // idk , the msg maybe serialized aga?
          // @flow-ex listen > evx_receive__offer_Sent > child actor > parent actor > action receiveConnectionOffer > service receiveConnectionOffer // LINK
          receiveConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            console.log('LR', 'receiveConnectionOffer', event);
            this.webrtcConnectionService.receiveConnectionOffer(event.signalserverWebsocketMsg);
          },
          receive_closeConnection: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
            this.webrtcConnectionService.receive_closeConnection(event.signalserverWebsocketMsg);
          },
        },
      },
      {
        msg_dummyTestDebug: 'init msg_dummyTestDebug',
        mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst: new Map(),
        stateMachineFactory_forWebrtcConnection: this,
      }
    );
  }

  public setup_OfferDecide_eachConnectionSession_childMachine() {
    return webrtcConnectionStateMachine_stage_ProcessSendReceiveOffer.withConfig({
      actions: {
        acceptConnectionOffer: (context, event, _meta) => {
          console.log('MU', 'acceptConnectionOffer', event);
          if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
          this.webrtcConnectionService.acceptConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
        },
        send_cancelConnectionOffer: (context, event, _meta) => {
          if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
          this.webrtcConnectionService.send_cancelConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
        },
        send_declineConnectionOffer: (context, event, _meta) => {
          if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
          this.webrtcConnectionService.send_declineConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
        },
        // ############
        receive_cancelConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
          this.webrtcConnectionService.receive_cancelConnectionOffer(event.signalserverWebsocketMsg);
        },
        receive_declineConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
          this.webrtcConnectionService.receive_declineConnectionOffer(event.signalserverWebsocketMsg);
        },
      },
      services: {
        // @flow-ex: parent evx_receive__offer_Accepted > serviceXst proceedConnectionOffer
        // @messy: the type gurad cannot enfore here ...
        proceedConnectionOffer: async (context, event, _meta) => {
          console.log('LR', 'proceedConnectionOffer', event);
          // @: yes there is no offerNegotiationSessionId here..
          // @: but its provided anyways due to Xstate Event serialization
          // if (!typeguardUnsafe__WebrtcConnectionStateMachineEvent_ReceiveCommon(event)) console.error(event);
          if (!typeguardUnsafe__has_signalserverWebsocketMsg(event)) throw new TypeError(JSON.stringify(event));
          await this.webrtcConnectionService.proceedConnectionOffer(event.signalserverWebsocketMsg);
        },
      },
    });
  }

  public create_and_start() {
    const actorXst_webrtcConnectionStateMachine = interpret(this.setup_OfferAccept_onlineSession_parentMachine());
    onEvent_check_ReceivedEventIsProper(actorXst_webrtcConnectionStateMachine);
    // onTransition vs subscribe ?
    // actorXst_webrtcConnectionStateMachine.onTransition((state) => {
    //   console.log('GG', 'onTransition', state.value, state);
    // });
    actorXst_webrtcConnectionStateMachine.start();
    return actorXst_webrtcConnectionStateMachine;
  }
}
