import React from 'react';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionPointLocation,
  WebrtcConnectionPointId,
  SignalserverWebsocketClientId,
  WebrtcConnectionEventType,
  WebrtcConnectionEvent,
} from './messageSchema/WebSocketMessage';
import { SocketioClientUtil } from '../util/socketio/SocketioUtil';
import { useStateRef } from '../util/reactjs/useStateRef';
import { WebrtcConnectionLinkage, get_webrtcConnectionLinkage_withNoPeer, get_webrtcConnectionLinkage_pc, get_webrtcConnectionLinkage_self } from './dataStructure/WebrtcConnectionLinkage';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../main';
import { WebrtcConnectionPointIdContext } from './reactContext/WebrtcConnectionPointIdContext';
import { WebrtcConnectionPointGridPanel } from './panel/WebrtcConnectionPointGridPanel';
import { RTCSessionDescriptionInit_plain, cancel_publish_localWebcamVideoStream } from './panel/WebrtcConnectionLobbyUserListPanel';
import * as ClassTransformer from 'class-transformer';
import 'reflect-metadata';
import { LobbyUserList, LobbyUserStatus } from './dataStructure/LobbyUserList';
import { WebcamGridPanelCssStyleContext } from './simple/reactContextCss/WebcamGridPanelCssStyleContext';

                                                                         
                                                     
                                                 
                                              

               

let count_Render_debug = 0;

export default function AppSemantic() {
  const [count_debug, setCount_debug] = React.useState(1);           
  console.log('count_Render :: ' + ++count_Render_debug);           

  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error(signalserverWebsocketClientId_self_sessionReactApp_errMsg);

  const [mpp_webrtcConnectionPointId_self_rst, set_mpp_webrtcConnectionPointId_self_rst, mpp_webrtcConnectionPointId_self_rref] = useStateRef<Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>>( new Map() );                   
                                                                                                                                                                                                                      
  const [lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref] = useStateRef<LobbyUserList>(new LobbyUserList());
                                                                                                                                                                                                                                                                                        

                 
  const [height_WebrtcConnectionPointRcomp, set_height_WebrtcConnectionPointRcomp] = React.useState<number | null>(null);
                  

                                         
                                                                                  
       
                                                                                                                       
       
                                                                   
                                                                                     
  React.useMemo(() => {
                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    SocketioClientUtil.onExclusive(initRun.socket, SignalserverWebsocketMsgType.lobbyUserList, (lobbyUserList_jsobj) => {
      const lobbyUserList = ClassTransformer.plainToInstance(LobbyUserList, lobbyUserList_jsobj as unknown);
      set_lobbyUserList_rst(lobbyUserList);
    });

          

    SocketioClientUtil.onExclusive(initRun.socket, WebrtcConnectionEventType.offerSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                                                            

      if (webrtcConnectionEvent.msg.msgTo === null || webrtcConnectionEvent.msg.msgTo === undefined) throw new TypeError();
      const webrtcConnectionLinkage_self_acceptor = get_webrtcConnectionLinkage_withNoPeer(mpp_webrtcConnectionPointId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
                                                                                                                                                                          
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, webrtcConnectionLinkage_self_acceptor);
                                                                                      

      webrtcConnectionLinkage_self_acceptor.offerReceivedList.add_OfferReceived(webrtcConnectionEvent);

      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));
                                                                                                               
                                                                           
                                                                                                                                                    
                                                                              
                                                                                                  
        
                                                                                                                                                                          
                                                                      
                                                                                                                   
                                                                                                                                                                       
                  
                                                                                                                                            
                                                                              
                                                                                                                                                                      
                  
    });

    SocketioClientUtil.onExclusive(initRun.socket, WebrtcConnectionEventType.answerSent, async (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                           

      if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
      const webrtcConnectionLinkage_self_initiator = get_webrtcConnectionLinkage_withNoPeer(mpp_webrtcConnectionPointId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
      await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain));
      webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_peer = webrtcConnectionEvent.msg.msgFrom;
                                                                                                                                                                            
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, webrtcConnectionLinkage_self_initiator);
                                                                                      

                                                                              
                                                                           
                                                   
                                                                                                                                                                                              
                                                                       
                                 
            
                                                                   
                                                                                                                                                                                                                                  
                                                                                                                    
                                                                                              
                                                                                                                        
                                                                           
                                                                                                                                            
                                                    
           
                                                                                                                                                                                                                                                                                                                                            
           
                                                     
                                                      
                                                                                       
                                                                                 
      if (webrtcConnectionLinkage_self_initiator.rtcPeerConnection.iceConnectionState !== 'new') console.error(webrtcConnectionLinkage_self_initiator.rtcPeerConnection.iceConnectionState);

      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));

                                                                                                              
                                                                                                                                                                      
                                                                                                                                          
                                                                                                                                                                                                                                                                                         
                                                                                
                  
    });

                                                                  
    SocketioClientUtil.onExclusive(initRun.socket, SignalserverWebsocketMsgType.iceCandidate, async (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = ClassTransformer.plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
      if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
                                                     
      const pc = get_webrtcConnectionLinkage_pc(mpp_webrtcConnectionPointId_self_rref.current, signalserverWebsocketMsg.msgTo);
      await pc.addIceCandidate(new RTCIceCandidate(signalserverWebsocketMsg.msgData as RTCIceCandidateInit));
                                                                                                    
                                                                              
                                                                                                            
                               
      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));
    });

    SocketioClientUtil.onExclusive(initRun.socket, WebrtcConnectionEventType.closeSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      for (const [webrtcConnectionPointId_self, webrtcConnectionLinkage_self] of mpp_webrtcConnectionPointId_self_rref.current) {
        webrtcConnectionLinkage_self.offerReceivedList.remove_OfferSentReceived_ifHas(webrtcConnectionEvent.msg.msgFrom);
        webrtcConnectionLinkage_self.offerSentList.remove_OfferSentReceived_ifHas(webrtcConnectionEvent.msg.msgFrom);

        initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, webrtcConnectionLinkage_self);                        
      }

      if (webrtcConnectionEvent.msg.msgTo !== null) {
                             
        if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new TypeError();
        if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) {
                                                                                                                                            
                                                                                              
        } else {
          const pc = get_webrtcConnectionLinkage_pc(mpp_webrtcConnectionPointId_self_rref.current, webrtcConnectionEvent.msg.msgTo);
          pc.close();
          pc.dispatchEvent(new Event('connectionstatechange-closed-bypassbug'));          

                                                                                                                                                                         
                                                                                                           
                                                                                                                                                                     
                                                                                                               
          if (!mpp_webrtcConnectionPointId_self_rref.current.delete(webrtcConnectionEvent.msg.msgTo!.webrtcConnectionPointId)) throw new TypeError();
        }
      }

      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));
    });

    SocketioClientUtil.onExclusive(initRun.socket, WebrtcConnectionEventType.cancelSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      const WebrtcConnectionLinkage_self_acceptor = get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self_rref.current, webrtcConnectionEvent.msg.msgTo!.webrtcConnectionPointId);
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, WebrtcConnectionLinkage_self_acceptor);
      WebrtcConnectionLinkage_self_acceptor.offerReceivedList.remove_OfferSentReceived(webrtcConnectionEvent.msg.msgFrom);

      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));
    });

                                            
    SocketioClientUtil.onExclusive(initRun.socket, WebrtcConnectionEventType.declineSent, async (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

      if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
      const webrtcConnectionLinkage_self_initiator = get_webrtcConnectionLinkage_withNoPeer(mpp_webrtcConnectionPointId_self_rref.current, webrtcConnectionEvent.msg.msgTo);

                                                           
      initRun.webrtcConnectionEventManager.receiveEvent(webrtcConnectionEvent, webrtcConnectionLinkage_self_initiator);                        

      await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setLocalDescription(undefined);             
      webrtcConnectionLinkage_self_initiator.offerSentList.remove_OfferSentReceived(webrtcConnectionEvent.msg.msgFrom);

      cancel_publish_localWebcamVideoStream(webrtcConnectionLinkage_self_initiator.rtcPeerConnection);

      set_mpp_webrtcConnectionPointId_self_rst(new Map(mpp_webrtcConnectionPointId_self_rref.current));
    });

                                                                                                                                    
                                                                                                      
      
                                             
                                                                                  
                                                                                  
                                                                                                                          
      
                                                                                    
                                             
  }, []);

  return (
    <>
      <WebrtcConnectionPointIdContext.Provider
        value={{
          mpp_webrtcConnectionPointId_self_rst,
          set_mpp_webrtcConnectionPointId_self_rst,
          mpp_webrtcConnectionPointId_self_rref,
          lobbyUserList_rst,
          set_lobbyUserList_rst,
          lobbyUserList_rref,
        }}
      >
        <WebcamGridPanelCssStyleContext.Provider value={{ height_WebrtcConnectionPointRcomp, set_height_WebrtcConnectionPointRcomp }}>
          <WebrtcConnectionPointGridPanel />
          {                                                                                                                                                                                                                                         }
        </WebcamGridPanelCssStyleContext.Provider>
      </WebrtcConnectionPointIdContext.Provider>
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

                    
                                           
                                       
                         
                                                          
                                        
                              
        
    
                                                                                                                  
                        

     
                                                                                                                                               
     
                                                   
       
