import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { SignalserverWebsocketMsgType } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
import {
  RootState, 
} from '../redux/ReduxStore';
import { slice_lobbyUserList } from '../redux/slice_lobbyUserList';
import styles from '../../index.module.css';
import { LobbyUserList } from '../dataStructure/LobbyUserList';
import { plainToInstance } from 'class-transformer';
import { slice_webrtcConnectionAnchorLocation_peer } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';

               

export const LobbyUserListPanel: React.FC = () => {
                                                  
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self);
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer);

  const dispatch = ReactRedux.useDispatch();

  React.useEffect(() => {
    const socketio_listener = (lobbyUserList_jsobj: LobbyUserList) => {
      const lobbyUserList = plainToInstance(LobbyUserList, lobbyUserList_jsobj as unknown);
      dispatch(slice_lobbyUserList.actions.overwriteList(lobbyUserList));
    };
    initRun.socket.on(SignalserverWebsocketMsgType.lobbyUserList, socketio_listener);
    return () => {
      initRun.socket.off(SignalserverWebsocketMsgType.lobbyUserList, socketio_listener);
    };
  }, [dispatch]);                              

  let webrtcConnectionAnchor_self: WebrtcConnectionAnchor | undefined;
  if (webrtcConnectionAnchorLocation_self_currSel_rst) {
    webrtcConnectionAnchor_self = mppWebrtcConnectionAnchor_rst.get(webrtcConnectionAnchorLocation_self_currSel_rst.webrtcConnectionAnchorId);
  }

  return (
    <div>
      lobbyUserList:
      <ul>
        {Array.from(lobbyUserList_rst.mpp_signalserverWebsocketClientId, ([signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer]) => {
          return (
            <li
              key={signalserverWebsocketClientId_peer}
                                
                                
              className={signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp ? styles.css_LobbyUserListSelf : undefined                   
              }
            >
              signalserverWebsocketClientId <code>{signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp ? 'self *<' : ''}</code>:{' '}
              <code>{signalserverWebsocketClientId_peer}</code> <br />
              mpp_webrtcConnectionAnchorId:
              <ul>
                {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, lobbyUserInfo_peer]) => {
                  const webrtcConnectionAnchorLocation_peer = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer, webrtcConnectionAnchorId_peer);
                  return (
                    <li
                      key={webrtcConnectionAnchorId_peer}
                                        
                      className={
                                                                       
                                          
                        (webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                        + ' ' +
                        (webrtcConnectionAnchor_self?.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')}
                    >
                      <code>{webrtcConnectionAnchorId_peer}</code> <code>{lobbyUserInfo_peer.lobbyUserStatus}</code>{' '}
                      <code>{webrtcConnectionAnchor_self?.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                      <button
                        disabled={signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp}
                        onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                          dispatch(slice_webrtcConnectionAnchorLocation_peer.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer));
                        }}
                      >
                        select_webrtcConnectionAnchorLocation
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
