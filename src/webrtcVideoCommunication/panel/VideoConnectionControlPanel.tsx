import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../scss/index.module.css';
import { ConnectionAnchorOnlineStatus } from '../dataStructure/LobbyUserList';
import { WebrtcConnectionStateMachineEventTypeName } from '../service/xstate/WebrtcConnectionStateMachineEventName';
import { WebrtcButtonName } from '../service/WebrtcButtonNameType';
import { Box, Button, Divider } from '@mui/material';

               
export const VideoConnectionControlPanel: React.FC = () => {
            

                                                                                                          
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self );                    
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer );                     
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  const dispatch = ReactRedux.useDispatch();                                

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                    
                                                                                     
             

            
  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) {
    return (
      <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        <Box component="pre">You need to select a ConnectionAnchor_self -- to show more Operations on it</Box>
      </Box>
    );
  }
             

            
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
                                                           
                                                                                       
                                            
                                                                                              

  const lobbyUserInfo = lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
  const det_NotOffline = !(lobbyUserInfo === undefined || lobbyUserInfo.connectionAnchorStatus === ConnectionAnchorOnlineStatus.offline);

                                                                                                           
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
                                                                                                                 
                                                                
                                                                                                             
                                                                                                                                                
      

                          
  const jsx_OnlineOffline = (
    <Box>
      <Button
                                                                                                                   
                                                                                                                        
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
      </Button>
      <br />
      <Button
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
      </Button>
    </Box>
  );

  if (webrtcConnectionAnchorLocation_peer_currSel_rst == null) {
    return (
      <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        {jsx_OnlineOffline}
        <Box component="pre">You need to select a Peer -- to show more Operations on it</Box>
      </Box>
    );
  }
             

                                                                                      
                        
                                                                                                                                       
                               
                                                         
                                                                                                                                                                                                
       
                                                                            
                                                                                                                   
                                                                                  

                                                    
                                                                                                    
                                                                                    
                                                                                                                                                                 
    
                                                             
                                                                                    
                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         
                                                                                   
                                                  
                                                                                                    
                                            
                                                                                                                                                                                            
         

            
  const det_HasSentOfferToSomeone        = webrtcConnectionAnchor_self.offerSentList.size_WebrtcConnectionAnchorId !== 0;                   
  const det_AlreadyConnectedToSomeone    = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null;                   
  const det_HasSentOfferToThisPeer       = webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
  const det_HasReceivedOfferFromThisPeer = webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined;                   
             

                                             
  return (
    <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
      {jsx_OnlineOffline}
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
          disabled={
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) || det_HasSentOfferToThisPeer || det_HasReceivedOfferFromThisPeer                   
          }
          className={`${det_HasSentOfferToSomeone || det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline ? styles.css_buttonDisabled_byManualCode : ''} ${
                                                                                                                                                                                             
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) ||
            det_HasSentOfferToThisPeer ||
            det_HasReceivedOfferFromThisPeer
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
                                            
          onClick={() => {
                                                                                                  
                                                           
                                                                                      
                                                                                          
                                                                                                         
                            
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.sendConnectionOffer}
        </Button>
        <br />
        <Button
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
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
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
        </Button>
        <br />
        <Button
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
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
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
        </Button>
      </Box>
      <Box>
        <Button onClick={function remove_webrtcConnectionAnchor_self() {}}>remove_webrtcConnectionAnchor_self</Button>
      </Box>
    </Box>
  );
};

                                                      
      
                  
                
                                                                               
                   
                   
                                           
                                                
