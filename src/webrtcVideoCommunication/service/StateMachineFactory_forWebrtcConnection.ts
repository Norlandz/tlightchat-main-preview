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
                                                                           
          goOnline: (context, event, _meta) => {
            this.webrtcConnectionService.goOnline();
          },
          goOffline: (context, event, _meta) => {
            this.webrtcConnectionService.goOffline();
          },
                                                                
                                           
                                 
                            
                                                                                     
                                                                                                    
                                                                                                               
                       
                                                                      
                
               
               
          sendConnectionOffer: (context, event, _meta) => {
            console.log('MU', 'sendConnectionOffer', event);
                                                                                                                                                                                 
                                                                                                                                           
                                                                                                                                  
                                                                                                                                                 
            if (!typeguardUnsafe__has_webrtcConnectionAnchorLocation_peer(event)) throw new TypeError(JSON.stringify(event));
            this.webrtcConnectionService.sendConnectionOffer(event.webrtcConnectionAnchorLocation_peer);
          },
          send_closeConnection: (context, event, _meta) => {
            this.webrtcConnectionService.send_closeConnection();
          },
                         
                                                             
                                                
                                                                                                                                                            
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
                       
        receive_cancelConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
          this.webrtcConnectionService.receive_cancelConnectionOffer(event.signalserverWebsocketMsg);
        },
        receive_declineConnectionOffer: (context, event: WebrtcConnectionStateMachineEvent_ReceiveCommon, _meta) => {
          this.webrtcConnectionService.receive_declineConnectionOffer(event.signalserverWebsocketMsg);
        },
      },
      services: {
                                                                                           
                                                        
        proceedConnectionOffer: async (context, event, _meta) => {
          console.log('LR', 'proceedConnectionOffer', event);
                                                                
                                                                          
                                                                                                                
          if (!typeguardUnsafe__has_signalserverWebsocketMsg(event)) throw new TypeError(JSON.stringify(event));
          await this.webrtcConnectionService.proceedConnectionOffer(event.signalserverWebsocketMsg);
        },
      },
    });
  }

  public create_and_start() {
    const actorXst_webrtcConnectionStateMachine = interpret(this.setup_OfferAccept_onlineSession_parentMachine());
    onEvent_check_ReceivedEventIsProper(actorXst_webrtcConnectionStateMachine);
                                  
                                                                      
                                                               
          
    actorXst_webrtcConnectionStateMachine.start();
    return actorXst_webrtcConnectionStateMachine;
  }
}
