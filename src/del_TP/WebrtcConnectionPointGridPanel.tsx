import * as React from 'react';
import * as ReactRedux from 'react-redux';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
  SignalserverWebsocketMsgReceiverType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchorId, get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import moment from 'moment';
                                                                                                  
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { initRun, rtcConfig, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../../main';
import sliceMppMediaStreamLocalSelf, {
  RootState,
  WebrtcConnectionAnchorIdContext,
  sliceLobbyUserList,
  sliceMppWebrtcConnectionAnchor,
  sliceVideoConnectionLinkageDraftCurrSelected,
  store,
} from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';
import { WebrtcConnectionLobbyUserListPanel } from './WebrtcConnectionLobbyUserListPanel';
import { LobbyUserList, LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';
import { plainToInstance } from 'class-transformer';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

                                                                     
                                            
                                                              
                       
                                                                                                
let count_Render_WebrtcConnectionAnchorGridPanel_debug = 0;
export const WebrtcConnectionAnchorGridPanel_OLD: React.FC = () => {
  count_Render_WebrtcConnectionAnchorGridPanel_debug++;
  console.log('count_Render_WebrtcConnectionAnchorGridPanel :: ' + count_Render_WebrtcConnectionAnchorGridPanel_debug);
  const { mpp_webrtcConnectionAnchorId_self_rst, set_mpp_webrtcConnectionAnchorId_self_rst, mpp_webrtcConnectionAnchorId_self_rref, lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref, } = React.useContext(WebrtcConnectionAnchorIdContext);                   
  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error(signalserverWebsocketClientId_self_sessionReactApp_errMsg);

                                                                                                                                                                               

                 
          
                                                                                                                              
                                                                                                                                               
                                                                                                 
  const { height_WebrtcConnectionAnchorRcomp, set_height_WebrtcConnectionAnchorRcomp } = React.useContext(WebcamGridPanelCssStyleContext);
                                                                                                                                                            
  if (set_height_WebrtcConnectionAnchorRcomp === null || set_height_WebrtcConnectionAnchorRcomp === undefined) throw new TypeError();
                  

  React.useEffect(() => {
    for (let index = 1; index <= initRun.amount_DefaultConnectionPoint_config; index++) {
                                                                                                                                                       
                                                                   
                                                                                                                  
      void create_rtcPeerConnection___signal_peer___addTo_GridPanel();
    }
  }, []);

           
  async function create_rtcPeerConnection___signal_peer___addTo_GridPanel() {
                                                                                                                                                                              
                                                                                                                                                                      
                                                                                                              
                                                                                                  
                                                                                
                                                                                     
                                                                              
                                                                             
                                                                                           
                                                                                  
                                                                       
                                                                                                                                                                  
                                                                 
                                                                                                                                        
              
                                                                                                                   
    const localWebcamVideoStream = await initRun.getLocalMediaStream();
    const remoteWebcamVideoStream = new MediaStream();
    const webrtcConnectionAnchorId_self = `${initRun.prefix_debug}${moment().format('MMDDHHmmssSSS')}_${++initRun.count_WebrtcConnection}` as WebrtcConnectionAnchorId;          
    const pc = new RTCPeerConnection(rtcConfig);
    const webrtcConnectionAnchorLocation_self = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_self_sessionReactApp, webrtcConnectionAnchorId_self);
    const webrtcConnectionAnchor = new WebrtcConnectionAnchor(pc, localWebcamVideoStream, remoteWebcamVideoStream, webrtcConnectionAnchorLocation_self);          
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionAnchorLocation_self, null);
                                                                                                                        
                                                                                                                                                                      
    const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.connectionCreatedSent, signalserverWebsocketMsg);          
    initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor);
                                                                          
                                                                                                                                                                     
                                                                                                                              
                                                                                                            
    mpp_webrtcConnectionAnchorId_self_rst.set(webrtcConnectionAnchorId_self, webrtcConnectionAnchor);
                                                                                                                                                                                                                              
                                                                                                                                      
              
                              
                                           

                                                                                               
                                        
                                                 
    {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                            
                                                                                         
          
         
                                  
                            
         
                                                                                                                 
               
      const WebrtcConnectionAnchorRcomp: React.FC = () => {
        const { height_WebrtcConnectionAnchorRcomp, set_height_WebrtcConnectionAnchorRcomp } = React.useContext(WebcamGridPanelCssStyleContext);                                         

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                        
                                                                                                        
        const [webrtcConnectionState_rst, set_webrtcConnectionState_rst] = React.useState<RTCPeerConnectionState>(pc.connectionState);

        React.useEffect(() => {
                                                          
          function listen_set_webrtcConnectionState_rst(event?: Event) {
            set_webrtcConnectionState_rst(pc.connectionState);
          }

          pc.addEventListener('connectionstatechange', listen_set_webrtcConnectionState_rst);
          pc.addEventListener('connectionstatechange-closed-bypassbug', listen_set_webrtcConnectionState_rst);
                                                    

                                                                                                                                                                                                                                                                                         
                                                                      
                                                             
                                                                                                          
                                                                                                        
          return () => {
            pc.removeEventListener('connectionstatechange', listen_set_webrtcConnectionState_rst);
            pc.removeEventListener('connectionstatechange-closed-bypassbug', listen_set_webrtcConnectionState_rst);
          };
        }, []);
                                                                                     
             
                                                                                                                                                                                                                         
             
                                                    
             
                                                                                                                                                                                                                        
             
                                                          
                                                                                                                                                                                   

                 
        function close_rtcPeerConnection___signal_peer___removeFrom_GridPanel() {
                                                      
                                                                                
          const webrtcConnectionAnchorLocation_self = webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self;
          const webrtcConnectionAnchorLocation_peer = webrtcConnectionAnchor.webrtcConnectionAnchorLocation_peer;
          if (webrtcConnectionAnchorLocation_self === null || webrtcConnectionAnchorLocation_self === undefined) throw new TypeError();
                                                                        
                                                                                                           
                                                                                               
                                                                                                                                                                                
                                                            
                                                                                   
                                                                                   
                                    
                

                                                                    
                 
                                                                                                                                    
                                                                        
                                                                                      
                                                                                       
                                                                                                                            
                                                      
                                                                                                                                                                                                                                                    
          pc.close();          
                                                                   
                                                                                               
                                                                            
          pc.dispatchEvent(new Event('connectionstatechange-closed-bypassbug'));

                                                                
                                                                                                                                                             
                                                                                                                                   
                                                                                                                                                                     
                                                                                                                                      
                                                                                                                             
                                                                                  
                     
                                                                                    
                                                                                                                                                                                   
                                                                                                                                        
                                                                                                  
                                           
                                                                          
                                                                                                                                                 
                                      
                                                                                                                                                                                             
                                                                                                                                                  
                                                                                                    
                                   
                 
                                                                     
                                                                                                                                                                                            
                                                                                   
                                                                                                   
                                                                     
                                      
                                                                                                                                                               
                                                                  
                                                                                                                                                                                                                                                                                                            
                                 
                                      
                                                                                                                                                                                                                                    
                                                                                                                                                      
                                                                                                                                                        
          const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
          const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.closeSent, signalserverWebsocketMsg);
          initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor);
                                                                             

                                                                                               
                                                                                                                                                                                                                             
                     
                                                                
                                                                                           
                                              
                                                                                                          
                                                                                           
                                                                                               
                                                                                                                                                
                                                                                                                                                                           
                                                                                                                 
                                                                                      
          if (mpp_webrtcConnectionAnchorId_self_rref == null) throw new TypeError();
          if (!mpp_webrtcConnectionAnchorId_self_rref.current.delete(webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId)) throw new TypeError();
          set_mpp_webrtcConnectionAnchorId_self_rst!(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
        }

                                             
                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        return (
          <div
            style={{
                                                                          
                                                
                                                                                                                          
              ...(height_WebrtcConnectionAnchorRcomp !== null && { height: height_WebrtcConnectionAnchorRcomp }),
            }}
            className={styles.css_WebrtcConnectionAnchorRcomp}
          >
            {                                                                                             }
            <WebcamVideo webcamVideoStream={localWebcamVideoStream} />
            <WebcamVideo webcamVideoStream={remoteWebcamVideoStream} />
            <ul>
              <li>
                webrtcConnectionState_rst: <code>{JSON.stringify(webrtcConnectionState_rst)}</code>
              </li>
              <li>
                webrtcConnectionAnchorLocation_self:
                <pre>{JSON.stringify({ signalserverWebsocketClientId_self: signalserverWebsocketClientId_self_sessionReactApp, webrtcConnectionAnchorId_self })}</pre>
              </li>
              <li>
                webrtcConnectionAnchorLocation_peer:
                <pre>{JSON.stringify(mpp_webrtcConnectionAnchorId_self_rst.get(webrtcConnectionAnchorId_self)?.webrtcConnectionAnchorLocation_peer)}</pre>
              </li>
              <li>
                <button
                  onClick={
                    (event) => { for (const track of localWebcamVideoStream.getTracks()) { track.enabled = !track.enabled; } }                   
                  }
                >
                  hide selfCam (on selfView & peerView)
                </button>
                <button
                  onClick={
                    (event) => { for (const track of remoteWebcamVideoStream.getTracks()) { track.enabled = !track.enabled; } }                   
                  }
                >
                  hide peerCam (on selfView)
                </button>
                <button onClick={close_rtcPeerConnection___signal_peer___removeFrom_GridPanel}>pc.close()</button>
                {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                }
              </li>
            </ul>
            <WebrtcConnectionLobbyUserListPanel webrtcConnectionAnchorLocation_self={webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self} />
          </div>
        );
      };

                                         
                                                                                                                                                                   

      webrtcConnectionAnchor.jsx_WebrtcConnectionAnchorRcomp = <WebrtcConnectionAnchorRcomp />;
                                                           
      set_mpp_webrtcConnectionAnchorId_self_rst!(mpp_webrtcConnectionAnchorId_self_rst);                                                                         
    }
                                                              
  }

  return (
    <>
      <button onClick={create_rtcPeerConnection___signal_peer___addTo_GridPanel}>add WebrtcConnectionAnchorRcomp</button>
      <label>
        height_WebrtcConnectionAnchorRcomp:
        <input type="number" value={height_WebrtcConnectionAnchorRcomp || ''} onChange={(e) => set_height_WebrtcConnectionAnchorRcomp(parseInt(e.target.value))} />
      </label>

      <ul style={{ border: '1px solid black' }}>
        {Array.from(mpp_webrtcConnectionAnchorId_self_rst, ([webrtcConnectionAnchorId_self, webrtcConnectionAnchor]) => {
          return <li key={webrtcConnectionAnchorId_self}>{webrtcConnectionAnchor.jsx_WebrtcConnectionAnchorRcomp}</li>;
        })}
      </ul>
    </>
  );
};
