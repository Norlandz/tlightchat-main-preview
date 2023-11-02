import { Transform, Type, plainToInstance } from 'class-transformer';
import { SignalserverWebsocketClientId, SignalserverWebsocketMsg, WebrtcConnectionPointId, WebrtcConnectionPointLocation } from '../messageSchema/WebSocketMessage';
import 'reflect-metadata';

import { NoSuchItemException } from '../../exception/NoSuchItemException';

                                                                 
                                                                                         
export enum LobbyUserStatus {
                       
                         
  available = 'available',
  occupied = 'occupied',             
  closed = 'closed',
                                 
                       
}
                                                                                  

                                                                            
                                              
                          
                                     

                                                                                                   
export class LobbyUserInfo {
  @Type(() => WebrtcConnectionPointLocation)
  public readonly webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation;

  constructor(webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation) {
    this.webrtcConnectionPointLocation_self = webrtcConnectionPointLocation_self;
  }

  @Type(() => WebrtcConnectionPointLocation)
  private _webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation | null = null;                  
                       
               
  public get webrtcConnectionPointLocation_peer(): WebrtcConnectionPointLocation | null { return this._webrtcConnectionPointLocation_peer; }                   
  public set webrtcConnectionPointLocation_peer(value: WebrtcConnectionPointLocation) { if (value === null) throw new TypeError(); if (this._webrtcConnectionPointLocation_peer !== null) throw new Error('Immutable Value Once Set'); this._webrtcConnectionPointLocation_peer = value; }                   

  public lobbyUserStatus = LobbyUserStatus.available;
}

export class LobbyUserList {
     
                                                               
     
                                                                                                   
  @Transform(
    (tinfo) => {
                                                                                                                    
                            
                                            
                                                                                              
      const value = tinfo.value as Map<SignalserverWebsocketClientId, Map<WebrtcConnectionPointId, LobbyUserInfo>>;
      if (value === null || value === undefined) throw new TypeError();
      return new Map(
        Object.entries(value).map(([signalserverWebsocketClientId, mpp_webrtcConnectionPointId]) => {
          return [
            signalserverWebsocketClientId,
            new Map(
              Object.entries(mpp_webrtcConnectionPointId as ArrayLike<unknown>).map(([webrtcConnectionPointId, lobbyUserInfo]) => {
                return [webrtcConnectionPointId, plainToInstance(LobbyUserInfo, lobbyUserInfo as unknown)];
              })
            ),
          ];
        })
      );
    },
    { toClassOnly: true }
  )
  private readonly _mpp_signalserverWebsocketClientId = new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionPointId, LobbyUserInfo>>();
  public get mpp_signalserverWebsocketClientId(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionPointId, LobbyUserInfo>> {
    return this._mpp_signalserverWebsocketClientId;
  }

  add_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.set(signalserverWebsocketClientId_self, new Map<WebrtcConnectionPointId, LobbyUserInfo>());
  }
  remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.delete(signalserverWebsocketClientId_self);
  }

  add_webrtcConnectionPointId(webrtcConnectionPointLocation: WebrtcConnectionPointLocation) {
    const mpp_webrtcConnectionPointId = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionPointLocation.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId === undefined) throw new TypeError();
    if (mpp_webrtcConnectionPointId.has(webrtcConnectionPointLocation.webrtcConnectionPointId)) throw new TypeError();
    const lobbyUserInfo = new LobbyUserInfo(webrtcConnectionPointLocation);
    mpp_webrtcConnectionPointId.set(webrtcConnectionPointLocation.webrtcConnectionPointId, lobbyUserInfo);              
  }

  remove_webrtcConnectionPointId(webrtcConnectionPointLocation: WebrtcConnectionPointLocation) {
    const mpp_webrtcConnectionPointId = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionPointLocation.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId === undefined) throw new TypeError();
    if (!mpp_webrtcConnectionPointId.delete(webrtcConnectionPointLocation.webrtcConnectionPointId)) throw new TypeError();
  }

     
    
                                         
             
                                                                                                      
     
  public get_lobbyUserInfo(webrtcConnectionPointLocation: WebrtcConnectionPointLocation) {
                                                          
    const lobbyUserInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionPointLocation.signalserverWebsocketClientId)!.get(webrtcConnectionPointLocation.webrtcConnectionPointId)!;
    if (lobbyUserInfo === null || lobbyUserInfo === undefined) throw new NoSuchItemException();
    return lobbyUserInfo;
                                                                                                                                                                                   
  }
}
