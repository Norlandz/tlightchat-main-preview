import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebrtcConnectionAnchorLocation, get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState, sliceVideoConnectionLinkageDraftCurrSelected } from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';

               
                                                                                                                                                      

export const OfferSentReceivedListPanel: React.FC = () => {
                                                                                               
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducerMppWebrtcConnectionAnchor);
  const videoConnectionLinkageDraftCurrSelected_rst = ReactRedux.useSelector((state: RootState) => state.reducerVideoConnectionLinkageDraftCurrSelected);
  const dispatch = ReactRedux.useDispatch();

  if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self == null) return 'webrtcConnectionAnchorLocation_self == null -- nothing is seleted';
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self);
                                                                                                                                                
                                                                                                                 
  return (
    <div>
      <div>
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
                                            
                          (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer?.equals(webrtcConnectionAnchorLocation_peer_acceptor) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_acceptor));
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

      <div>
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
                                          
                        className={(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer?.equals(webrtcConnectionAnchorLocation_peer_initiator) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator));
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
      
      <div>
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
                                          
                        className={(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer?.equals(webrtcConnectionAnchorLocation_peer_initiator) ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                          + ' ' +
                          (webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? styles.css_webrtcConnectionAnchor_peer_connected : '')
                                                                          
                        }
                      >
                        <code>{webrtcConnectionAnchorId_peer}</code> <code>{webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer ? 'connected *<' : ''}</code>{' '}
                        <button
                          onClick={async function select_webrtcConnectionAnchorLocation_peer() {
                            dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchorLocation_peer(webrtcConnectionAnchorLocation_peer_initiator));
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
