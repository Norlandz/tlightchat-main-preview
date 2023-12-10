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
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import * as XstateReact from '@xstate/react';
import { WebrtcConnectionStateMachineEvent, webrtcConnectionStateMachine } from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from '../xstate/WebrtcConnectionStateMachineEventName';
import { EventData, SCXML, State, interpret } from 'xstate';
import { WebrtcButtonName } from '../service/WebrtcButtonNameType';

               
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                    
                                                                                     
             

            
  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) {
    return (
      <div id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        <pre>{'webrtcConnectionAnchorLocation_self == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

            
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
                                                           
                                                                                       
                                            
                                                                                              

  const lobbyUserInfo = lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
  const det_NotOffline = !(lobbyUserInfo === undefined || lobbyUserInfo.lobbyUserStatus === LobbyUserStatus.offline);

                                                                                                           
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
                                                                                                                 
                                                                
                                                                                                             
                                                                                                                                                
      

                          
  const jsx_OnlineOffline = (
    <div>
      <button
                                                                                                                   
                                                                                                                        
        disabled={det_NotOffline}
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                    
          !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
                                       
                                                   
                                                                                                                 
          webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOnline
      </button>
      <br />
      <button
        disabled={!det_NotOffline}   
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                     
          !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOffline) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
                                                    
                                                                                                                  
          webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOffline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOffline
      </button>
    </div>
  );

  if (webrtcConnectionAnchorLocation_peer_currSel_rst == null) {
    return (
      <div id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        {jsx_OnlineOffline}
        <pre>{'webrtcConnectionAnchorLocation_peer == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

                                                                                      
                        
                                                                                                                                       
                               
                                                         
                                                                                                                                                                                                
       
                                                                            
                                                                                                                   
                                                                                  

                                                    
                                                                                                    
                                                                                    
                                                                                                                                                                 
    
                                                             
                                                                                    
                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         
                                                                                   
                                                  
                                                                                                    
                                            
                                                                                                                                                                                            
         

            
  const det_HasSentOfferToSomeone        = webrtcConnectionAnchor_self.offerSentList.size_WebrtcConnectionAnchorId !== 0;                   
  const det_AlreadyConnectedToSomeone    = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null;                   
  const det_HasSentOfferToThisPeer       = webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
  const det_HasReceivedOfferFromThisPeer = webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
             

                                             
  return (
    <div id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
      {jsx_OnlineOffline}
      <div>
        <button
          disabled={
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) || det_HasSentOfferToThisPeer || det_HasReceivedOfferFromThisPeer                    
          }
          className={`${det_HasSentOfferToSomeone || det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                             
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) || det_HasSentOfferToThisPeer || det_HasReceivedOfferFromThisPeer
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
                                            
          onClick={() => {
                                                                                                  
                                                           
                                                                                      
                                                                                          
                                                                                                         
                            
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.sendConnectionOffer}
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                                    
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
                                                                                                    
                                                                                                                                                               
                                                              
                                                                                         
                                                                        
                                                                                                          
                     
                                                                                               
                                                                                   
                                                                                                                         
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.acceptConnectionOffer}
        </button>
      </div>
      <div>
        <button
          disabled={!det_HasSentOfferToThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                                     
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
                                                                                                    
                                                                                               
                                                                                                  
                                                                                               
                                                                                   
                                                                                                                          
                                                                                                  
                                                                                               
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_cancelConnectionOffer}
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                                    
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
                                                                                                     
                                                                                               
                                                                                   
                                                                                                                         
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_declineConnectionOffer}
        </button>
      </div>
      <div>
        <button
          disabled={!det_AlreadyConnectedToSomeone || !det_NotOffline}   
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                                    
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
                                                        
                                                                                                                                 
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_closeConnection}
        </button>
      </div>
      <div>
        <button onClick={function remove_webrtcConnectionAnchor_self() {}}>remove_webrtcConnectionAnchor_self</button>
      </div>
    </div>
  );
};

                                                      
      
                  
                
                                                                               
                   
                   
                                           
                                                
