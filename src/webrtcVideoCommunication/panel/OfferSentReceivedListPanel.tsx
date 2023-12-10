import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { RootState } from '../redux/ReduxStore';
import styles from '../../index.module.css';
import { slice_webrtcConnectionAnchorLocation_peer_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';

               
                                                                                                                                                      

export const OfferSentReceivedListPanel: React.FC = () => {
                                                                                               
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self);
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer);
  const dispatch = ReactRedux.useDispatch();

  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) return 'webrtcConnectionAnchorLocation_self == null -- nothing is seleted';
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
                                                                                                                                                
                                                                                                                 
  return (
    <div>
      <div id={styles.cssId_offerSendList}>
        offer sent:
        <ul>
          {Array.from(webrtcConnectionAnchor_self.offerSentList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgTo, mpp_webrtcConnectionAnchorId_peer]) => {
            return (
              <li key={signalserverWebsocketClientId_peer_msgTo}>
                msgTo: <code>{signalserverWebsocketClientId_peer_msgTo}</code>
                <ul>
                  {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                    if (!signalserverWebsocketMsg) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                    const webrtcConnectionAnchorLocation_peer_acceptor = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgTo, webrtcConnectionAnchorId_peer);
                    return (
                      <li
                        key={webrtcConnectionAnchorId_peer}
                                          
                        className={
                                            
                          (webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_acceptor) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_acceptor));
                          }}
                        >
                          select_webrtcConnectionAnchorLocation_peer
                        </button>
                        <pre style={{ overflow: 'scroll' }}>{`msg: ${JSON.stringify(signalserverWebsocketMsg)}`}</pre>
                        {       
                                                                                                                                
                                                                                                                                                                                                                   
            
                                                
                                             
                                                                               
                                       }
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <div id={styles.cssId_offerReceivedList}>
        offer received:
        {                                                                        }
        <ul>
          {Array.from(webrtcConnectionAnchor_self.offerReceivedList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
            return (
              <li key={signalserverWebsocketClientId_peer_msgFrom}>
                msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                <ul>
                  {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                    if (!signalserverWebsocketMsg) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                    const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);
                    return (
                      <li
                        key={webrtcConnectionAnchorId_peer}
                                          
                        className={(webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_initiator) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator));
                          }}
                        >
                          select_webrtcConnectionAnchorLocation_peer
                        </button>
                        <pre style={{ overflow: 'scroll' }}>{`msg: ${JSON.stringify(signalserverWebsocketMsg)}`}</pre>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div id={styles.cssId_offerConnectedList}>
        offer connected:
        <ul>
          {Array.from(webrtcConnectionAnchor_self.offerConnectedList.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
            return (
              <li key={signalserverWebsocketClientId_peer_msgFrom}>
                msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                <ul>
                  {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, signalserverWebsocketMsg]) => {
                    if (!signalserverWebsocketMsg) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
                    if (signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                   
                    if (signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();                   
                    const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);
                    return (
                      <li
                        key={webrtcConnectionAnchorId_peer}
                                          
                        className={(webrtcConnectionAnchorLocation_peer_currSel_rst?.equals(webrtcConnectionAnchorLocation_peer_initiator) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(slice_webrtcConnectionAnchorLocation_peer_currSel.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator));
                          }}
                        >
                          select_webrtcConnectionAnchorLocation_peer
                        </button>
                        <pre style={{ overflow: 'scroll' }}>{`msg: ${JSON.stringify(signalserverWebsocketMsg)}`}</pre>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
