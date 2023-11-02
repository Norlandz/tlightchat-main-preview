import React from 'react';
import { WebrtcConnectionPointLocation, WebrtcConnectionPointId, SignalserverWebsocketClientId, SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionLinkage } from '../dataStructure/WebrtcConnectionLinkage';
import { RefObjectWrapper } from '../../util/reactjs/useStateRef';
import { LobbyUserList } from '../dataStructure/LobbyUserList';

export const WebrtcConnectionPointIdContext = React.createContext<{
     
                                                
                                                          
  
                                                                                                           
                                                                                          
    
                                                    

                                                                         
                                                                  
                                                                                    
                                                    
   
  mpp_webrtcConnectionPointId_self_rst: Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>;
  set_mpp_webrtcConnectionPointId_self_rst: React.Dispatch<React.SetStateAction<Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>>> | null;
  mpp_webrtcConnectionPointId_self_rref: RefObjectWrapper<Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>> | null;

                                                                                  
                                                                                                                                   
                                                                                                            
     
                                                                                            
                         
     
  lobbyUserList_rst: LobbyUserList;
  set_lobbyUserList_rst: React.Dispatch<React.SetStateAction<LobbyUserList>> | null;
  lobbyUserList_rref: RefObjectWrapper<LobbyUserList> | null;

                                                                                                                                          
                                                                                                                                                                                           
                                                                                                                                                                    
}>({
  mpp_webrtcConnectionPointId_self_rst: new Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>(),
  set_mpp_webrtcConnectionPointId_self_rst: null,
  mpp_webrtcConnectionPointId_self_rref: null,
                                                  
                                                      
                                                   
  lobbyUserList_rst: new LobbyUserList(),
  set_lobbyUserList_rst: null,
  lobbyUserList_rref: null,
                                                                                                                                                
                                                        
                                                     
});
