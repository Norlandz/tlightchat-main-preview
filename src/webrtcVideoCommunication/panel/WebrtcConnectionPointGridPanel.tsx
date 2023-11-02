import React from 'react';
import {
  SignalserverWebsocketMsgType,
  WebrtcConnectionPointLocation,
  WebrtcConnectionPointId,
  SignalserverWebsocketMsg,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
} from '../messageSchema/WebSocketMessage';
import moment from 'moment';
                                                                                                  
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { WebrtcConnectionLinkage } from '../dataStructure/WebrtcConnectionLinkage';
import { initRun, rtcConfig, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../../main';
import { WebrtcConnectionPointIdContext } from '../reactContext/WebrtcConnectionPointIdContext';
import styles from '../../index.module.css';
import { WebrtcConnectionLobbyUserListPanel } from './WebrtcConnectionLobbyUserListPanel';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from '../simple/reactContextCss/WebcamGridPanelCssStyleContext';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

                                                                     
                                            
                                                              
                       
                                                                                                
let count_Render_WebrtcConnectionPointGridPanel_debug = 0;
export const WebrtcConnectionPointGridPanel: React.FC = () => {
  count_Render_WebrtcConnectionPointGridPanel_debug++;
  console.log('count_Render_WebrtcConnectionPointGridPanel :: ' + count_Render_WebrtcConnectionPointGridPanel_debug);
  const { mpp_webrtcConnectionPointId_self_rst, set_mpp_webrtcConnectionPointId_self_rst, mpp_webrtcConnectionPointId_self_rref, lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref, } = React.useContext(WebrtcConnectionPointIdContext);                   
  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error(signalserverWebsocketClientId_self_sessionReactApp_errMsg);

                                                                                                                                                                             

                 
          
                                                                                                                              
                                                                                                                                               
                                                                                                 
  const { height_WebrtcConnectionPointRcomp, set_height_WebrtcConnectionPointRcomp } = React.useContext(WebcamGridPanelCssStyleContext);
                                                                                                                                                          
  if (set_height_WebrtcConnectionPointRcomp === null || set_height_WebrtcConnectionPointRcomp === undefined) throw new TypeError();
                  

  React.useEffect(() => {
    for (let index = 1; index <= initRun.amount_DefaultConnectionPoint_config; index++) {
                                                                                                                                                       
                                                                   
                                                                                                                   
      void create_rtcPeerConnection___signal_peer___addTo_GridPanel();
    }
  }, []);

           
  async function create_rtcPeerConnection___signal_peer___addTo_GridPanel() {
                                                                                                                                                                           
                                                                                                                                                                   
                                                                                                              
                                                                                                  
                                                                                
                                                                                     
                                                                              
                                                                             
                                                                                           
                                                                                  
                                                                       
                                                                                                                                                                  
                                                                 
                                                                                                                                        
              
                                                                                                                   
    const localWebcamVideoStream = await initRun.getLocalMediaStream();
    const remoteWebcamVideoStream = new MediaStream();
    const webrtcConnectionPointId_self = `${initRun.prefix_debug}${moment().format('MMDDHHmmssSSS')}_${++initRun.count_WebrtcConnection}` as WebrtcConnectionPointId;          
    const pc = new RTCPeerConnection(rtcConfig);
    const webrtcConnectionPointLocation_self = new WebrtcConnectionPointLocation(signalserverWebsocketClientId_self_sessionReactApp, webrtcConnectionPointId_self);
    const webrtcConnectionLinkage = new WebrtcConnectionLinkage(pc, localWebcamVideoStream, remoteWebcamVideoStream, webrtcConnectionPointLocation_self);          
    const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionPointLocation_self, null);
                                                                                                                       
                                                                                                                                                                       
    const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.connectionCreatedSent, signalserverWebsocketMsg);          
    initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage);
                                                                           
                                                                                                                                                                     
                                                                                                                              
                                                                                                            
    mpp_webrtcConnectionPointId_self_rst.set(webrtcConnectionPointId_self, webrtcConnectionLinkage);
                                                                                                                                                                                                                           
                                                                                                                                      
              
                              
                                           

                                                                                              
                                        
                                                 
    {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                           
                                                                                         
          
         
                                  
                            
         
                                                                                                                
               
      const WebrtcConnectionPointRcomp: React.FC = () => {
        const { height_WebrtcConnectionPointRcomp, set_height_WebrtcConnectionPointRcomp } = React.useContext(WebcamGridPanelCssStyleContext);                                         

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                        
                                                                                                        
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
                                                      
                                                                                 
          const webrtcConnectionPointLocation_self = webrtcConnectionLinkage.webrtcConnectionPointLocation_self;
          const webrtcConnectionPointLocation_peer = webrtcConnectionLinkage.webrtcConnectionPointLocation_peer;
          if (webrtcConnectionPointLocation_self === null || webrtcConnectionPointLocation_self === undefined) throw new TypeError();
                                                                        
                                                                                                           
                                                                                               
                                                                                                                                                                               
                                                            
                                                                                 
                                                                                 
                                    
                

                                                                    
                 
                                                                                                                                  
                                                                        
                                                                                      
                                                                                       
                                                                                                                            
                                                      
                                                                                                                                                                                                                                                    
          pc.close();          
                                                                   
                                                                                               
                                                                            
          pc.dispatchEvent(new Event('connectionstatechange-closed-bypassbug'));

                                                               
                                                                                                                                                           
                                                                                                                                  
                                                                                                                                                                      
                                                                                                                                      
                                                                                                                              
                                                                                   
                     
                                                                                     
                                                                                                                                                                                   
                                                                                                                                      
                                                                                                  
                                           
                                                                         
                                                                                                                                               
                                      
                                                                                                                                                                                             
                                                                                                                                                   
                                                                                                     
                                   
                 
                                                                     
                                                                                                                                                                                            
                                                                                   
                                                                                                   
                                                                     
                                      
                                                                                                                                                               
                                                                  
                                                                                                                                                                                                                                                                                                            
                                 
                                      
                                                                                                                                                                                                                                    
                                                                                                                                                    
                                                                                                                                                        
          const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer);
          const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.closeSent, signalserverWebsocketMsg);
          initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage);
                                                                              

                                                                                               
                                                                                                                                                                                                                             
                     
                                                                
                                                                                           
                                              
                                                                                                          
                                                                                           
                                                                                               
                                                                                                                                              
                                                                                                                                                                        
                                                                                                               
                                                                                      
          if (mpp_webrtcConnectionPointId_self_rref == null) throw new TypeError();
          if (!mpp_webrtcConnectionPointId_self_rref.current.delete(webrtcConnectionPointLocation_self.webrtcConnectionPointId)) throw new TypeError();
          set_mpp_webrtcConnectionPointId_self_rst!(new Map(mpp_webrtcConnectionPointId_self_rref.current));
        }

                                             
                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        return (
          <div
            style={{
                                                                          
                                                
                                                                                                                          
              ...(height_WebrtcConnectionPointRcomp !== null && { height: height_WebrtcConnectionPointRcomp }),
            }}
            className={styles.css_WebrtcConnectionPointRcomp}
          >
            {                                                                                             }
            <WebcamVideo webcamVideoStream={localWebcamVideoStream} />
            <WebcamVideo webcamVideoStream={remoteWebcamVideoStream} />
            <ul>
              <li>
                webrtcConnectionState_rst: <code>{JSON.stringify(webrtcConnectionState_rst)}</code>
              </li>
              <li>
                webrtcConnectionPointLocation_self:
                <pre>{JSON.stringify({ signalserverWebsocketClientId_self: signalserverWebsocketClientId_self_sessionReactApp, webrtcConnectionPointId_self })}</pre>
              </li>
              <li>
                webrtcConnectionPointLocation_peer:
                <pre>{JSON.stringify(mpp_webrtcConnectionPointId_self_rst.get(webrtcConnectionPointId_self)?.webrtcConnectionPointLocation_peer)}</pre>
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
            <WebrtcConnectionLobbyUserListPanel webrtcConnectionPointLocation_self={webrtcConnectionLinkage.webrtcConnectionPointLocation_self} />
          </div>
        );
      };

                                         
                                                                                                                                                               

      webrtcConnectionLinkage.jsx_WebrtcConnectionPointRcomp = <WebrtcConnectionPointRcomp />;
                                                          
      set_mpp_webrtcConnectionPointId_self_rst!(mpp_webrtcConnectionPointId_self_rst);                                                                         
    }
                                                             
  }

  return (
    <>
      <button onClick={create_rtcPeerConnection___signal_peer___addTo_GridPanel}>add WebrtcConnectionPointRcomp</button>
      <label>
        height_WebrtcConnectionPointRcomp:
        <input type="number" value={height_WebrtcConnectionPointRcomp || ''} onChange={(e) => set_height_WebrtcConnectionPointRcomp(parseInt(e.target.value))} />
      </label>

      <ul style={{ border: '1px solid black' }}>
        {Array.from(mpp_webrtcConnectionPointId_self_rst, ([webrtcConnectionPointId_self, webrtcConnectionLinkage]) => {
          return <li key={webrtcConnectionPointId_self}>{webrtcConnectionLinkage.jsx_WebrtcConnectionPointRcomp}</li>;
        })}
      </ul>
    </>
  );
};
