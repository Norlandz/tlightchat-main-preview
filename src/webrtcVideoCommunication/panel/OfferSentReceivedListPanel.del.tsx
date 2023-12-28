import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { RootState } from '../redux/ReduxStore';
import styles from '../../scss/index.module.css';
import { slice_webrtcConnectionAnchorLocation_peer_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { TitleCollapse } from '../../utilComponent/materialui/TitleCollapse';
import { CollapseAuto } from '../../utilComponent/materialui/CollapseAuto';

               
                                                                                                                                                      

export const OfferSentReceivedListPanel: React.FC = () => {
                                                                                               
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector(
    (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self
  );
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector(
    (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer
  );
  const dispatch = ReactRedux.useDispatch();

  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) return 'webrtcConnectionAnchorLocation_self == null -- nothing is seleted';
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
                                                                                                                                                
                                                                                                                 
  return (
    <Box className={styles.css_GeneralShadowBox}>
      <Box id={styles.cssId_offerSendList} className={styles.css_GeneralShadowBox}>
        <CollapseAuto title={<TitleCollapse>offer sent:</TitleCollapse>}>
          <ul>
            {Array.from(webrtcConnectionAnchor_self.offerSentList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgTo, mpp_webrtcConnectionAnchorId_peer]) => {
              return (
                <li key={signalserverWebsocketClientId_peer_msgTo}>
                  <FormControl>
                    <FormLabel>
                      msgTo: <code>{signalserverWebsocketClientId_peer_msgTo}</code>
                    </FormLabel>
                    <RadioGroup>
                      {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                        if (!signalserverWebsocketMsg) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                        if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                        if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                        const webrtcConnectionAnchorLocation_peer_acceptor = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgTo, webrtcConnectionAnchorId_peer);
                        return (
                          <div key={webrtcConnectionAnchorId_peer}>
                            <FormControlLabel
                              control={<Radio sx={{ '&, &.Mui-checked': { color: 'olive' } }} />}
                              value={webrtcConnectionAnchorId_peer}
                                                                                                          
                              label={`${webrtcConnectionAnchorId_peer} ${webrtcConnectionAnchorId_peer ===webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer?.webrtcConnectionAnchorId ? 'connected *<' : ''}`}
                              checked={webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_acceptor)}
                              onClick={() =>
                                dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_acceptor))
                              }
                            />
                            <Box component='pre' sx={{ width: '250px', height: '20px', resize: 'both', overflow: 'auto' }}>{JSON.stringify(signalserverWebsocketMsg, undefined, 2)}</Box>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </li>
              );
            })}
          </ul>
        </CollapseAuto>
      </Box>

      <Box id={styles.cssId_lobbyUserList} className={styles.css_GeneralShadowBox}>
        <CollapseAuto title={<TitleCollapse>offer received:</TitleCollapse>}>
          {                                                                        }
          <ul>
            {Array.from(webrtcConnectionAnchor_self.offerReceivedList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
              return (
                <li key={signalserverWebsocketClientId_peer_msgFrom}>
                  <FormControl>
                    <FormLabel>
                      msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                    </FormLabel>
                    <RadioGroup>
                      {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                        if (!signalserverWebsocketMsg) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                        if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                        if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                        const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);
                        return (
                          <div key={webrtcConnectionAnchorId_peer}>
                            <FormControlLabel
                              control={<Radio sx={{ '&, &.Mui-checked': { color: 'olive' } }} />}
                              value={webrtcConnectionAnchorId_peer}
                              label={`${webrtcConnectionAnchorId_peer} ${webrtcConnectionAnchorId_peer ===webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer?.webrtcConnectionAnchorId ? 'connected *<' : ''}`}
                              checked={webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_initiator)}
                              onClick={() =>
                                dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator))
                              }
                            />
                            <Box component='pre' sx={{ width: '250px', height: '20px', resize: 'both', overflow: 'auto' }}>{JSON.stringify(signalserverWebsocketMsg, undefined, 2)}</Box>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </li>
              );
            })}
          </ul>
        </CollapseAuto>
      </Box>

      <Box id={styles.cssId_offerConnectedList} className={styles.css_GeneralShadowBox}>
        <CollapseAuto title={<TitleCollapse>offer connected:</TitleCollapse>}>
          <ul>
            {Array.from(webrtcConnectionAnchor_self.offerConnectedList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
              return (
                <li key={signalserverWebsocketClientId_peer_msgFrom}>
                  <FormControl>
                    <FormLabel>
                      msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                    </FormLabel>
                    <RadioGroup>
                      {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                        if (!signalserverWebsocketMsg) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                        if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                        if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                        if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                        const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);
                        return (
                          <div key={webrtcConnectionAnchorId_peer}>
                            <FormControlLabel
                              control={<Radio sx={{ '&, &.Mui-checked': { color: 'olive' } }} />}
                              value={webrtcConnectionAnchorId_peer}
                              label={`${webrtcConnectionAnchorId_peer} ${webrtcConnectionAnchorId_peer ===webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer?.webrtcConnectionAnchorId ? 'connected *<' : ''}`}
                              checked={webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_initiator)}
                              onClick={() =>
                                dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator))
                              }
                            />
                            <Box component='pre' sx={{ width: '250px', height: '20px', resize: 'both', overflow: 'auto' }}>{JSON.stringify(signalserverWebsocketMsg, undefined, 2)}</Box>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </li>
              );
            })}
          </ul>
        </CollapseAuto>
      </Box>
    </Box>
  );
};
