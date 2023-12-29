import { Transform, Type, plainToInstance } from 'class-transformer';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import 'reflect-metadata';

import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { UserWeb } from '../../user/UserWeb';

                                                                 
                                                                                         
export enum ConnectionAnchorOnlineStatus {
  online = 'online',
  occupied = 'occupied',             
  offline = 'offline',
                       
                                 
                       
}
                                                                                  

                                                                            
                                              
                          
                                     

                                                                                                   
export class ConnectionAnchorOnlineInfo {
  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation;

  constructor(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchorLocation_self = webrtcConnectionAnchorLocation_self;
  }

                                                
                                                                                                                  
                          
                  
                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                    

  public connectionAnchorStatus = ConnectionAnchorOnlineStatus.offline;
  public connectionAnchorName: string | null = null;                                                 
}

export class SocketClientOnlineInfo {
  @Type(() => UserWeb)
  public readonly userWeb: UserWeb;
  constructor(userWeb: UserWeb) {
    this.userWeb = userWeb;
  }

        
                                                                  
        
                                                                                                       
                
                   
                                                                                                                       
                               
                                               
                                                                                                 
                                                                                                                       
                                                                          
                        
                                                                                                         
                     
                                             
                       
                                                                                                                                        
                                                                                                               
                   
                 
               
             
           
         
                            
      
                                                                                                                                                  
                                                                                                                                                       
                                                      
      

                        
  @Transform(
    (tinfo) => {
      const value = tinfo.value as Record<WebrtcConnectionAnchorId, ConnectionAnchorOnlineInfo> ?? (() => { throw new TypeError(); })();                   
      return new Map(Object.entries(value).map(([webrtcConnectionAnchorId, lobbyUserInfo]) => [webrtcConnectionAnchorId, plainToInstance(ConnectionAnchorOnlineInfo, lobbyUserInfo)]));
    },
    { toClassOnly: true }
  )
  public readonly mpp_WebrtcConnectionAnchorOnlineInfo = new Map<WebrtcConnectionAnchorId, ConnectionAnchorOnlineInfo>();
}

                                                                                
                                                                                                            
  
                      
                               
                
  
                                                   
                                                             
                                                      
               
                                                                                                                       
                                                                                                                                             
                                                                                                                              
                                                                                   
                                                                                                 
                                                                                                                                            

export class LobbyUserList {
  @Transform(
    (tinfo) => {
                                                                                                                                                            
                                                                                                                                    
                                                                                                                                                                                                          
      const value = tinfo.value as Record<SignalserverWebsocketClientId, SocketClientOnlineInfo> ?? (() => { throw new TypeError(); })();                   
      return new Map(Object.entries(value).map(([signalserverWebsocketClientId, socketClientOnlineInfo]) => [signalserverWebsocketClientId, plainToInstance(SocketClientOnlineInfo, socketClientOnlineInfo)]));                   
    },
    { toClassOnly: true }
  )
  private readonly _mpp_signalserverWebsocketClientId = new Map<SignalserverWebsocketClientId, SocketClientOnlineInfo>();
  public get mpp_signalserverWebsocketClientId(): ReadonlyMap<SignalserverWebsocketClientId, SocketClientOnlineInfo> {
    return this._mpp_signalserverWebsocketClientId;
  }

  add_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId, user: UserWeb) {
                                                                                                                                           
    this._mpp_signalserverWebsocketClientId.set(signalserverWebsocketClientId_self, new SocketClientOnlineInfo(user));
  }
  remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.delete(signalserverWebsocketClientId_self);
  }

  add_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo === undefined) throw new TypeError();
    if (socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.has(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
    const lobbyUserInfo = new ConnectionAnchorOnlineInfo(webrtcConnectionAnchorLocation);
    socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.set(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId, lobbyUserInfo);              
  }

  remove_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo === undefined) throw new TypeError();
    if (!socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.delete(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
  }

     
    
                                          
             
                                                                                                      
     
  public get_lobbyUserInfo(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo == null) throw new NoSuchItemException();
    const lobbyUserInfo = socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)!;
    if (lobbyUserInfo == null) throw new NoSuchItemException();
    return lobbyUserInfo;
                                                          
                        
                                                                                                   
                                                                                                              
                                                                       
                                                       
                                                                
                     
        
  }

                                                                                                                                                                        
  public get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    return this._mpp_signalserverWebsocketClientId
      .get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId)
      ?.mpp_WebrtcConnectionAnchorOnlineInfo.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId);
  }
}
