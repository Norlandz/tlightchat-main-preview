import * as React from 'react';
import * as ReactRedux from 'react-redux';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEventType,
  SignalserverWebsocketMsgReceiverType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import { get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { MppWebrtcConnectionAnchor } from '../dataStructure/MppWebrtcConnectionAnchor';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchorId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../../main';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import * as XstateReact from '@xstate/react';
import { WebrtcConnectionStateMachineEvent, webrtcConnectionStateMachine } from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventName } from '../xstate/WebrtcConnectionStateMachineEventName';
import { EventData, SCXML, State, interpret } from 'xstate';

               
export const VideoConnectionLinkageDraftControlPanel: React.FC = () => {
            

                                                                                                          
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector(
    (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self
  );
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector(
    (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer
  );
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  const dispatch = ReactRedux.useDispatch();                                 

                       
  React.useEffect(() => {
    if (webrtcConnectionAnchorLocation_self_currSel_rst == null) return;
    const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
    const actorXst_webrtcConnectionStateMachine = webrtcConnectionAnchor_self.webrtcConnectionService.actorXst_webrtcConnectionStateMachine;

    actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventName.evx__goOnline);
    dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }, [webrtcConnectionAnchorLocation_self_currSel_rst])

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                    
                                                                                     
             

            
  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) {
    return (
      <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
        <pre>{'webrtcConnectionAnchorLocation_self == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

            
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
                                                           
                                                                                       
                                            
                                                                                              

  const lobbyUserInfo = lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
  const det_NotOffline = !(lobbyUserInfo === undefined || lobbyUserInfo.lobbyUserStatus === LobbyUserStatus.offline);

                                                                                                           
  const actorXst_webrtcConnectionStateMachine = webrtcConnectionAnchor_self.webrtcConnectionService.actorXst_webrtcConnectionStateMachine;
                                                             
  function name2event(wwebrtcConnectionStateMachineEventName: WebrtcConnectionStateMachineEventName) {
    return { type: wwebrtcConnectionStateMachineEventName, msg: null as unknown as SignalserverWebsocketMsg, offerNegotiationSessionId: '' };
  }

                          
  const jsx_OnlineOffline = (
    <div>
      <button
                                                                                                                   
                                                                                                                        
        disabled={det_NotOffline}
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
          !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventName.evx__goOnline)) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
                                       
                                                
          actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventName.evx__goOnline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOnline
      </button>
      <br />
      <button
        disabled={!det_NotOffline}   
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
          !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventName.evx__goOffline)) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
                                                 
          actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventName.evx__goOffline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOffline
      </button>
    </div>
  );

  if (webrtcConnectionAnchorLocation_peer_currSel_rst == null) {
    return (
      <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
        {jsx_OnlineOffline}
        <pre>{'webrtcConnectionAnchorLocation_peer == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

                                                                                   
                     
                                                                                                                                    
                            
  const get_actorXst_ProcessSendReceiveOffer = () => {
    return actorXst_webrtcConnectionStateMachine.getSnapshot().context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(webrtcConnectionAnchorLocation_peer_currSel_rst.toString());
  };
                                                                         
                                                                                                                
                                                                               

                                                    
                                                                                                    
                                                                                    
                                                                                                                                                                 
    
                                                             
                                                                                    
                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         
                                                                                   
                                                  
                                                                                                    
                                            
                                                                                                                                                                                            
         

            
  const det_HasSentOfferToSomeone        = webrtcConnectionAnchor_self.offerSentList.size_WebrtcConnectionAnchorId !== 0;                   
  const det_AlreadyConnectedToSomeone    = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null;                   
  const det_HasSentOfferToThisPeer       = webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
  const det_HasReceivedOfferFromThisPeer = webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
             

                                             
  return (
    <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
      {jsx_OnlineOffline}
      <div>
        <button
          disabled={det_HasSentOfferToSomeone || det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventName.evx_send__offer_Sent)) ? styles.css_buttonDisabled_byXstate : ''
          }`}
                                            
          onClick={() => {
                                                                                               
            actorXst_webrtcConnectionStateMachine.send({
              type: WebrtcConnectionStateMachineEventName.evx_send__offer_Sent,
              msg: 'dummy' as unknown as SignalserverWebsocketMsg,
              offerNegotiationSessionId: webrtcConnectionAnchorLocation_peer_currSel_rst.toString(),
            });          
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          sendConnectionOffer
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventName.evx_send__offer_Accepted)) ? styles.css_buttonDisabled_byXstate : ''
          }`}
          onClick={() => {
                                                                                                 
                                                                                                                                                            
                                                           
                                                                                      
                                                                     
                                                                                                       
                  
            const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventName.evx_send__offer_Accepted);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          acceptConnectionOffer
        </button>
      </div>
      <div>
        <button
          disabled={!det_HasSentOfferToThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventName.evx_send__offer_Cancelled)) ? styles.css_buttonDisabled_byXstate : ''
          }`}
          onClick={() => {
                                                                                                 
            console.log('CA bf', actorXst_webrtcConnectionStateMachine.getSnapshot().value);
            console.log('CA bf', get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.value);
            const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventName.evx_send__offer_Cancelled);
            console.log('CA af', get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.value);
            console.log('CA af', actorXst_webrtcConnectionStateMachine.getSnapshot().value);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          send_cancelConnectionOffer
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventName.evx_send__offer_Declined)) ? styles.css_buttonDisabled_byXstate : ''
          }`}
          onClick={() => {
                                                                                                  
            const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventName.evx_send__offer_Declined);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          send_declineConnectionOffer
        </button>
      </div>
      <div>
        <button
          disabled={!det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventName.evx_send__connection_Closed)) ? styles.css_buttonDisabled_byXstate : ''
          }`}
          onClick={() => {
                                                        
            actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventName.evx_send__connection_Closed);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          send_closeConnection
        </button>
      </div>
      <div>
        <button onClick={function remove_webrtcConnectionAnchor_self() {}}>remove_webrtcConnectionAnchor_self</button>
      </div>
    </div>
  );
};

                                                      
      
                  
                
                                                                               
                   
                   
                                           
                                                
