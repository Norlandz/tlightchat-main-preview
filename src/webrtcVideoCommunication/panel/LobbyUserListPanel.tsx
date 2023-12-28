import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { SignalserverWebsocketMsgType } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { WebrtcConnectionAnchor, get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState } from '../redux/ReduxStore';
import { slice_lobbyUserList } from '../redux/slice_lobbyUserList';
import styles from '../../scss/index.module.css';
import { LobbyUserList } from '../dataStructure/LobbyUserList';
import { plainToInstance } from 'class-transformer';
import { slice_userWebId_peer_currSel, slice_userWeb_peer_currSel, slice_webrtcConnectionAnchorLocation_peer_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { SocketioClientSession_forWebrtcConnection } from '../service/EventEmitterNested_forWebrtcConnection';
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { CollapseAuto } from '../../utilComponent/materialui/CollapseAuto';
import { TitleCollapse } from '../../utilComponent/materialui/TitleCollapse';
import SendIcon from '@mui/icons-material/Send';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { green, orange, pink, purple } from '@mui/material/colors';

// ############

export const LobbyUserListPanel: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection }) => {
  // @: no need update -- delegate to signalserver
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self ); // prettier-ignore
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer ); // prettier-ignore

  const dispatch = ReactRedux.useDispatch();

  React.useEffect(() => {
    const socketio_listener = (lobbyUserList_jsobj: LobbyUserList) => {
      // why did i get the result before then? ... the change of that store still em
      const lobbyUserList = plainToInstance(LobbyUserList, lobbyUserList_jsobj);
      dispatch(slice_lobbyUserList.actions.overwriteList(lobbyUserList));
    };

    socketioClientSession_forWebrtcConnection.socket.on(SignalserverWebsocketMsgType.lobbyUserList, socketio_listener);
    return () => {
      socketioClientSession_forWebrtcConnection.socket.off(SignalserverWebsocketMsgType.lobbyUserList, socketio_listener);
    };
  }, [dispatch, socketioClientSession_forWebrtcConnection.socket]); //@dk how dispatch wil change

  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) {
    return (
      <Box id={styles.cssId_lobbyUserList} className={styles.css_GeneralShadowBox}>
        <Box component="pre">You need to select a ConnectionAnchor_self -- to show more Operations on it</Box>
      </Box>
    );
  }
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);

  //       <Accordion> // Just those dealing with inconsistent..
  return (
    <Box id={styles.cssId_lobbyUserList} className={styles.css_GeneralShadowBox}>
      <CollapseAuto title={<TitleCollapse>lobby user list:</TitleCollapse>}>
        <ul>
          {Array.from(lobbyUserList_rst.mpp_signalserverWebsocketClientId, ([signalserverWebsocketClientId_peer, socketClientOnlineInfo]) => {
            const det_IsSelf = signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp;

            if (det_IsSelf) {
              // remove self from the .. why though. ok was just the button select ok
              return (
                <li key={signalserverWebsocketClientId_peer} className={styles.css_LobbyUserListSelf}>
                  <code>{socketClientOnlineInfo.userWeb.username}</code> <code>{socketClientOnlineInfo.userWeb.userWebId}</code> <code>{signalserverWebsocketClientId_peer}</code> <code>{'self *<'}</code>
                  <br />
                  <FormControl>
                    <RadioGroup>
                      {Array.from(socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo, ([webrtcConnectionAnchorId_peer, lobbyUserInfo_peer]) => {
                        return (
                          <div key={webrtcConnectionAnchorId_peer}>
                            <FormControlLabel
                              control={<span></span>}
                              value={webrtcConnectionAnchorId_peer}
                              label={`${lobbyUserInfo_peer.connectionAnchorName} ${webrtcConnectionAnchorId_peer} ${lobbyUserInfo_peer.connectionAnchorStatus}`}
                              disabled={true}
                              // onClick={() => {}}
                            />
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </li>
              );
            } else {
              return (
                <li key={signalserverWebsocketClientId_peer}>
                  <code>{socketClientOnlineInfo.userWeb.username}</code> <code>{socketClientOnlineInfo.userWeb.userWebId}</code> <code>{signalserverWebsocketClientId_peer}</code>
                  <br />
                  <FormControl>
                    <RadioGroup>
                      {Array.from(socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo, ([webrtcConnectionAnchorId_peer, lobbyUserInfo_peer]) => {
                        // @performance: how to avoid nested loop -- before everything just linear, now need compare ...
                        const signalserverWebsocketMsg_Sent = webrtcConnectionAnchor_self.offerSentList.mpp_OfferSentReceived.get(signalserverWebsocketClientId_peer)?.get(webrtcConnectionAnchorId_peer); // prettier-ignore
                        const signalserverWebsocketMsg_Received = webrtcConnectionAnchor_self.offerReceivedList.mpp_OfferSentReceived.get(signalserverWebsocketClientId_peer)?.get(webrtcConnectionAnchorId_peer); // prettier-ignore
                        const signalserverWebsocketMsg_Connected = webrtcConnectionAnchor_self.offerConnectedList.mpp_OfferSentReceived.get(signalserverWebsocketClientId_peer)?.get(webrtcConnectionAnchorId_peer); // prettier-ignore

                        if (signalserverWebsocketMsg_Sent !== undefined) {
                          if (!signalserverWebsocketMsg_Sent) throw new TypeError();
                          if (signalserverWebsocketMsg_Sent.msgTo == null) throw new TypeError();
                          if (!(signalserverWebsocketMsg_Sent.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                          // if equal then wrong
                          if (signalserverWebsocketMsg_Sent.msgTo.signalserverWebsocketClientId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError(); // prettier-ignore
                          if (signalserverWebsocketMsg_Sent.msgTo.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError(); // prettier-ignore
                        }
                        if (signalserverWebsocketMsg_Received !== undefined) {
                          if (!signalserverWebsocketMsg_Received) throw new TypeError();
                          if (signalserverWebsocketMsg_Received.msgTo == null) throw new TypeError();
                          if (!(signalserverWebsocketMsg_Received.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                          // if not equal then wrong
                          if (signalserverWebsocketMsg_Received.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError(); // prettier-ignore
                          if (signalserverWebsocketMsg_Received.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError(); // prettier-ignore
                        }
                        if (signalserverWebsocketMsg_Connected !== undefined) {
                          if (!signalserverWebsocketMsg_Connected) throw new TypeError();
                          if (signalserverWebsocketMsg_Connected.msgTo == null) throw new TypeError();
                          if (!(signalserverWebsocketMsg_Connected.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                          // same as Received, cuz the `moveToSelfWithUpdate_OfferConnected` move with update -- takes offer with msgFrom peer, not msgTo peer
                          if (signalserverWebsocketMsg_Connected.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError(); // prettier-ignore
                          if (signalserverWebsocketMsg_Connected.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError(); // prettier-ignore
                        }

                        const webrtcConnectionAnchorLocation_peer_currInLobby = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer, webrtcConnectionAnchorId_peer);
                        const det_SentTo = webrtcConnectionAnchorLocation_peer_currInLobby.equals(signalserverWebsocketMsg_Sent?.msgTo);
                        const det_ReceivedFrom = webrtcConnectionAnchorLocation_peer_currInLobby.equals(signalserverWebsocketMsg_Received?.msgFrom);
                        const det_ConnectedWith = webrtcConnectionAnchorLocation_peer_currInLobby.equals(signalserverWebsocketMsg_Connected?.msgFrom);
                        const det_CurrSel = webrtcConnectionAnchorLocation_peer_currInLobby.equals(webrtcConnectionAnchorLocation_peer_currSel_rst);
                        // idk better em ; or miss & still // may say the custom name those thing ...

                        return (
                          <div
                            key={webrtcConnectionAnchorId_peer}
                            // (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                          >
                            <FormControlLabel
                              control={<Radio sx={{ '&, &.Mui-checked': { color: 'olive' } }} />}
                              value={webrtcConnectionAnchorId_peer}
                              label={`${lobbyUserInfo_peer.connectionAnchorName} ${webrtcConnectionAnchorId_peer} ${lobbyUserInfo_peer.connectionAnchorStatus}`}
                              //   // @pb: this is checking class instance ref ...
                              // not sure this check for multi instance now // should check -- to sync with offer received list
                              checked={det_CurrSel}
                              onClick={() => {
                                dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_currInLobby));
                                dispatch(slice_userWebId_peer_currSel.actions.select_userWebId_peer(socketClientOnlineInfo.userWeb.userWebId));
                                dispatch(slice_userWeb_peer_currSel.actions.select_userWeb_peer(socketClientOnlineInfo.userWeb));
                              }}
                            />
                            {det_SentTo && <PhoneForwardedIcon sx={{ color: orange[500] }} />}
                            {det_ReceivedFrom && <RingVolumeIcon sx={{ color: green[500] }} />}
                            {det_ConnectedWith && <PermPhoneMsgIcon sx={{ color: purple[500] }} />}
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </li>
              );
            }
          })}
        </ul>
      </CollapseAuto>
    </Box>
  );
};

// TODO
// emmm that allow later send and accept .. dk before should not allow but hum
// also this seems no error emmm
// said -- clear all other offer & xstate clean up thing
