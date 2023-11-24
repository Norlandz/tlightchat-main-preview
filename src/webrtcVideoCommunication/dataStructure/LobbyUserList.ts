import { Transform, Type, plainToInstance } from 'class-transformer';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from './WebrtcConnectionAnchor';
import 'reflect-metadata';

import { NoSuchItemException } from '../../exception/NoSuchItemException';

                                                                 
                                                                                         
export enum LobbyUserStatus {
  online = 'online',
  occupied = 'occupied',             
  offline = 'offline',
                       
                                 
                       
}
                                                                                  

                                                                            
                                              
                          
                                     

                                                                                                   
export class LobbyUserInfo {
  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation;

  constructor(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchorLocation_self = webrtcConnectionAnchorLocation_self;
  }

                                                
                                                                                                                  
                          
                  
                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                    

  public lobbyUserStatus = LobbyUserStatus.offline;
}

export class LobbyUserList {
     
                                                               
     
                                                                                                    
  @Transform(
    (tinfo) => {
                                                                                                                    
                            
                                            
                                                                                              
      const value = tinfo.value as Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, LobbyUserInfo>>;
      if (value === null || value === undefined) throw new TypeError();
      return new Map(
        Object.entries(value).map(([signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId]) => {
          return [
            signalserverWebsocketClientId,
            new Map(
              Object.entries(mpp_webrtcConnectionAnchorId as ArrayLike<unknown>).map(([webrtcConnectionAnchorId, lobbyUserInfo]) => {
                return [webrtcConnectionAnchorId, plainToInstance(LobbyUserInfo, lobbyUserInfo as unknown)];
              })
            ),
          ];
        })
      );
    },
    { toClassOnly: true }
  )
  private readonly _mpp_signalserverWebsocketClientId = new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, LobbyUserInfo>>();
  public get mpp_signalserverWebsocketClientId(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, LobbyUserInfo>> {
    return this._mpp_signalserverWebsocketClientId;
  }

  add_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.set(signalserverWebsocketClientId_self, new Map<WebrtcConnectionAnchorId, LobbyUserInfo>());
  }
  remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.delete(signalserverWebsocketClientId_self);
  }

  add_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId === undefined) throw new TypeError();
    if (mpp_webrtcConnectionAnchorId.has(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
    const lobbyUserInfo = new LobbyUserInfo(webrtcConnectionAnchorLocation);
    mpp_webrtcConnectionAnchorId.set(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId, lobbyUserInfo);              
  }

  remove_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId === undefined) throw new TypeError();
    if (!mpp_webrtcConnectionAnchorId.delete(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
  }

     
    
                                          
             
                                                                                                      
     
  public get_lobbyUserInfo(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
                                                          
    const lobbyUserInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId)!.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)!;
    if (lobbyUserInfo === null || lobbyUserInfo === undefined) throw new NoSuchItemException();
    return lobbyUserInfo;
  }

                                                                                                                                                                        
  public get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    return this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId)?.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId);
  }
}
