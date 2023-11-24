import React from 'react';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEventType,
  WebrtcConnectionEvent,
} from './messageSchema/WebSocketMessage';
import {
  WebrtcConnectionAnchorLocation,
  WebrtcConnectionAnchorId,
  SignalserverWebsocketClientId
} from './dataStructure/WebrtcConnectionAnchor';
import { SocketioClientUtil } from '../util/socketio/SocketioUtil';
import { useStateRef } from '../util/reactjs/useStateRef';
import { WebrtcConnectionAnchor, get_WebrtcConnectionAnchor_withNoPeer, get_webrtcConnectionAnchor_pc, get_WebrtcConnectionAnchor_self } from './dataStructure/WebrtcConnectionAnchor';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../main';
import { WebrtcConnectionAnchorIdContext } from './reactContext/WebrtcConnectionAnchorIdContext';
import { WebrtcConnectionAnchorGridPanel } from './panel/WebrtcConnectionAnchorGridPanel';
import { RTCSessionDescriptionInit_plain, cancel_publish_localWebcamVideoStream } from './panel/WebrtcConnectionLobbyUserListPanel';
import * as ClassTransformer from 'class-transformer';
import 'reflect-metadata';
import { LobbyUserList, LobbyUserStatus } from './dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from './simple/reactContextCss/WebcamGridPanelCssStyleContext';

                                                                         
                                                     
                                                 
                                              

               

let count_Render_debug = 0;

export default function AppSemantic_OLD() {
  const [count_debug, setCount_debug] = React.useState(1);           
  console.log('count_Render :: ' + ++count_Render_debug);           

  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error(signalserverWebsocketClientId_self_sessionReactApp_errMsg);

  const [mpp_webrtcConnectionAnchorId_self_rst, set_mpp_webrtcConnectionAnchorId_self_rst, mpp_webrtcConnectionAnchorId_self_rref] = useStateRef<Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor>>( new Map() );                   
                                                                                                                                                                                                                      
  const [lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref] = useStateRef<LobbyUserList>(new LobbyUserList());
                                                                                                                                                                                                                                                                                         

                 
  const [height_WebrtcConnectionAnchorRcomp, set_height_WebrtcConnectionAnchorRcomp] = React.useState<number | null>(null);
                  

                                         
                                                                                  
       
                                                                                                                       
       
                                                                   
                                                                                     
  React.useMemo(() => {
                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    SocketioClientUtil.onOnlyOnce(initRun.socket, SignalserverWebsocketMsgType.lobbyUserList, (lobbyUserList_jsobj) => {
      const lobbyUserList = ClassTransformer.plainToInstance(LobbyUserList, lobbyUserList_jsobj as unknown);
      set_lobbyUserList_rst(lobbyUserList);
    });

          

    SocketioClientUtil.onOnlyOnce(initRun.socket, WebrtcConnectionEventType.offerSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                                                            

      if (webrtcConnectionEvent.msg.msgTo === null || webrtcConnectionEvent.msg.msgTo === undefined) throw new TypeError();
      const WebrtcConnectionAnchor_self_acceptor = get_webrtcConnectionAnchor_withNoPeer(mpp_webrtcConnectionAnchorId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
                                                                                                                                                                         
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionAnchor_self_acceptor);
                                                                                     

      WebrtcConnectionAnchor_self_acceptor.offerReceivedList.add_OfferReceived(webrtcConnectionEvent);

      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
                                                                                                               
                                                                           
                                                                                                                                                    
                                                                              
                                                                                                  
        
                                                                                                                                                                           
                                                                       
                                                                                                                     
                                                                                                                                                                        
                  
                                                                                                                                              
                                                                              
                                                                                                                                                                      
                  
    });

    SocketioClientUtil.onOnlyOnce(initRun.socket, WebrtcConnectionEventType.answerSent, async (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                           

      if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
      const WebrtcConnectionAnchor_self_initiator = get_webrtcConnectionAnchor_withNoPeer(mpp_webrtcConnectionAnchorId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
      await WebrtcConnectionAnchor_self_initiator.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain));
      WebrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_peer = webrtcConnectionEvent.msg.msgFrom;
                                                                                                                                                                           
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionAnchor_self_initiator);
                                                                                     

                                                                              
                                                                            
                                                   
                                                                                                                                                                                            
                                                                        
                                 
            
                                                                   
                                                                                                                                                                                                                                  
                                                                                                                     
                                                                                              
                                                                                                                        
                                                                           
                                                                                                                                            
                                                    
           
                                                                                                                                                                                                                                                                                                                                            
           
                                                     
                                                      
                                                                                       
                                                                                 
      if (WebrtcConnectionAnchor_self_initiator.rtcPeerConnection.iceConnectionState !== 'new') console.error(webrtcConnectionAnchor_self_initiator.rtcPeerConnection.iceConnectionState);

      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));

                                                                                                                
                                                                                                                                                                       
                                                                                                                                        
                                                                                                                                                                                                                                                                                          
                                                                                 
                  
    });

                                                                  
    SocketioClientUtil.onOnlyOnce(initRun.socket, SignalserverWebsocketMsgType.iceCandidate, async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = ClassTransformer.plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
      if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                                                     
      const pc = get_WebrtcConnectionAnchor_pc(mpp_webrtcConnectionAnchorId_self_rref.current, signalserverWebsocketMsg.msgTo);
      await pc.addIceCandidate(new RTCIceCandidate(signalserverWebsocketMsg.msgData as RTCIceCandidateInit));
                                                                                                    
                                                                              
                                                                                                            
                               
      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
    });

    SocketioClientUtil.onOnlyOnce(initRun.socket, WebrtcConnectionEventType.closeSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      for (const [webrtcConnectionAnchorId_self, WebrtcConnectionAnchor_self] of mpp_webrtcConnectionAnchorId_self_rref.current) {
        WebrtcConnectionAnchor_self.offerReceivedList.remove_OfferSentReceived_ifHas(webrtcConnectionEvent.msg.msgFrom);
        WebrtcConnectionAnchor_self.offerSentList.remove_OfferSentReceived_ifHas(webrtcConnectionEvent.msg.msgFrom);

        initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionAnchor_self);                        
      }

      if (webrtcConnectionEvent.msg.msgTo !== null) {
                             
        if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new TypeError();
        if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) {
                                                                                                                                            
                                                                                              
        } else {
          const pc = get_WebrtcConnectionAnchor_pc(mpp_webrtcConnectionAnchorId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
          pc.close();
          pc.dispatchEvent(new Event('connectionstatechange-closed-bypassbug'));          

                                                                                                                                                                         
                                                                                                             
                                                                                                                                                                       
                                                                                                                 
          if (!mpp_webrtcConnectionAnchorId_self_rref.current.delete(webrtcConnectionEvent.msg.msgTo!.webrtcConnectionAnchorId)) throw new TypeError();
        }
      }

      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
    });

    SocketioClientUtil.onOnlyOnce(initRun.socket, WebrtcConnectionEventType.cancelSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      const WebrtcConnectionAnchor_self_acceptor = get_webrtcConnectionAnchor_self(mpp_webrtcConnectionAnchorId_self_rref.current, webrtcConnectionEvent.msg.msgTo!.webrtcConnectionAnchorId);
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionAnchor_self_acceptor);
      WebrtcConnectionAnchor_self_acceptor.offerReceivedList.remove_OfferSentReceived(webrtcConnectionEvent.msg.msgFrom);

      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
    });

                                            
    SocketioClientUtil.onOnlyOnce(initRun.socket, WebrtcConnectionEventType.declineSent, async (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
      const WebrtcConnectionAnchor_self_initiator = get_webrtcConnectionAnchor_withNoPeer(mpp_webrtcConnectionAnchorId_self_rref.current, webrtcConnectionEvent.msg.msgTo);

                                                           
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionAnchor_self_initiator);                        

      await WebrtcConnectionAnchor_self_initiator.rtcPeerConnection.setLocalDescription(undefined);             
      WebrtcConnectionAnchor_self_initiator.offerSentList.remove_OfferSentReceived(webrtcConnectionEvent.msg.msgFrom);

      cancel_publish_localWebcamVideoStream(WebrtcConnectionAnchor_self_initiator.rtcPeerConnection);

      set_mpp_webrtcConnectionAnchorId_self_rst(new Map(mpp_webrtcConnectionAnchorId_self_rref.current));
    });

                                                                                                                                    
                                                                                                      
      
                                             
                                                                                  
                                                                                  
                                                                                                                          
      
                                                                                    
                                             
  }, []);

  return (
    <>
      <WebrtcConnectionAnchorIdContext.Provider
        value={{
          mpp_webrtcConnectionAnchorId_self_rst,
          set_mpp_webrtcConnectionAnchorId_self_rst,
          mpp_webrtcConnectionAnchorId_self_rref,
          lobbyUserList_rst,
          set_lobbyUserList_rst,
          lobbyUserList_rref,
        }}
      >
        <WebcamGridPanelCssStyleContext.Provider value={{ height_WebrtcConnectionAnchorRcomp, set_height_WebrtcConnectionAnchorRcomp }}>
          <WebrtcConnectionAnchorGridPanel />
          {                                                                                                                                                                                                                                          }
        </WebcamGridPanelCssStyleContext.Provider>
      </WebrtcConnectionAnchorIdContext.Provider>
      <div>
        <button onClick={() => setCount_debug((count) => count + 1)}>count is {count_debug}</button>
        {                                                         }
        <button onClick={() => initRun.socket.emit(SignalserverWebsocketMsgType.testMessage, 'Test Msg from Client')}>socket.emit(XXX, 'Test Msg from Client')</button>
        <button onClick={() => initRun.socket.disconnect()}>socket.disconnect()</button>
        <button onClick={() => initRun.socket.connect()}>socket.connect()</button>
      </div>
    </>
  );
}

                    
                                           
                                       
                         
                                                          
                                        
                              
        
    
                                                                                                                  
                        

     
                                                                                                                                               
     
                                                   
       
