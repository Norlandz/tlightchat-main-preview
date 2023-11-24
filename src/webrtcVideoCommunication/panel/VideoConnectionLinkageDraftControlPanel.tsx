import * as React from 'react';
import * as ReactRedux from 'react-redux';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEventType,
  SignalserverWebsocketMsgReceiverType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchorId, MppWebrtcConnectionAnchor, get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../../main';
import { RootState, sliceMppWebrtcConnectionAnchor } from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';

               
export const VideoConnectionLinkageDraftControlPanel: React.FC = () => {
            
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducerMppWebrtcConnectionAnchor);
  const videoConnectionLinkageDraftCurrSelected_rst = ReactRedux.useSelector((state: RootState) => state.reducerVideoConnectionLinkageDraftCurrSelected);
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducerLobbyUserList);
  const dispatch = ReactRedux.useDispatch();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                    
                                                                                     
             

            
  if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self == null) {
    return (
      <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
        <pre>{'webrtcConnectionAnchorLocation_self == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

            
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self);
  const webrtcConnectionService = new WebrtcConnectionService(webrtcConnectionAnchor_self, dispatch);

  const lobbyUserInfo = lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
  const det_NotOffline = !(lobbyUserInfo === undefined || lobbyUserInfo.lobbyUserStatus === LobbyUserStatus.offline);

                          
  const jsx_OnlineOffline = (
    <div>
      <button
                                                                                                                   
                                                                                                                        
        disabled={det_NotOffline}
        onClick={() => {
                                       
          webrtcConnectionService.goOnline();
        }}
      >
        goOnline
      </button>
      <br />
      <button
        disabled={!det_NotOffline}   
        onClick={() => {
          webrtcConnectionService.goOffline();
        }}
      >
        goOffline
      </button>
    </div>
  );

  if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer == null) {
    return (
      <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
        {jsx_OnlineOffline}
        <pre>{'webrtcConnectionAnchorLocation_peer == null -- you must selet one to operate on'}</pre>
      </div>
    );
  }
             

  const webrtcConnectionAnchorLocation_peer = videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer;

                                                    
                                                                                                    
                                                                                    
                                                                                                                                                                 
    
                                                             
                                                                                    
                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
         
                                                                                   
                                                  
                                                                                                    
                                            
                                                                                                                                                                                            
         

            
  const det_HasSentOfferToSomeone = webrtcConnectionAnchor_self.offerSentList.size_WebrtcConnectionAnchorId !== 0;
  const det_AlreadyConnectedToSomeone = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null;
  const det_HasSentOfferToThisPeer =
    webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer) !== undefined;
  const det_HasReceivedOfferFromThisPeer =
    webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer) !== undefined;
             

  return (
    <div className={styles.css_VideoConnectionLinkageDraftControlPanel}>
      {jsx_OnlineOffline}
      <div>
        <button
          disabled={det_HasSentOfferToSomeone || det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}
                                            
          onClick={() => webrtcConnectionService.sendConnectionOffer(webrtcConnectionAnchorLocation_peer)}
        >
          sendConnectionOffer
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          onClick={() => webrtcConnectionService.acceptConnectionOffer(webrtcConnectionAnchorLocation_peer)}
        >
          acceptConnectionOffer
        </button>
      </div>
      <div>
        <button
          disabled={!det_AlreadyConnectedToSomeone || !det_NotOffline}   
          onClick={() => webrtcConnectionService.closeConnection()}
        >
          closeConnection
        </button>
      </div>
      <div>
        <button
          disabled={!det_HasSentOfferToThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          onClick={() => webrtcConnectionService.cancelConnectionOffer(webrtcConnectionAnchorLocation_peer)}
        >
          cancelConnectionOffer
        </button>
        <br />
        <button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline}   
          onClick={() => webrtcConnectionService.declineConnectionOffer(webrtcConnectionAnchorLocation_peer)}
        >
          declineConnectionOffer
        </button>
      </div>
      <div>
        <button onClick={function remove_webrtcConnectionAnchor_self() {}}>remove_webrtcConnectionAnchor_self</button>
      </div>
    </div>
  );
};

                                                      
      
                  
                
                                                                               
                   
                   
                                           
                                                
