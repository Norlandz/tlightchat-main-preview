               
   
                                                        
                                                                           
   
   
                                             
                                                                                                
                                                                                                                                   
   

declare const WebrtcConnectionAnchorIdSymbol: unique symbol;
export type WebrtcConnectionAnchorId = string & { [WebrtcConnectionAnchorIdSymbol]: never };
declare const SignalserverWebsocketClientIdSymbol: unique symbol;
export type SignalserverWebsocketClientId = string & { [SignalserverWebsocketClientIdSymbol]: never };
declare const MediaStreamIdSymbol: unique symbol;
export type MediaStreamId = string & { [MediaStreamIdSymbol]: never };
declare const WebrtcConnectionAnchorLocationIdSymbol: unique symbol;
export type WebrtcConnectionAnchorLocationId = string & { [WebrtcConnectionAnchorLocationIdSymbol]: never };

export class WebrtcConnectionAnchorLocation {
  constructor(
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly webrtcConnectionAnchorId: WebrtcConnectionAnchorId   
  ) {}

                       
                                                                                               
                                                                                                          
                                                                                                          
  equals(other: WebrtcConnectionAnchorLocation | undefined | null): boolean {
    if (other == null) return false;
    return this.signalserverWebsocketClientId === other.signalserverWebsocketClientId && this.webrtcConnectionAnchorId === other.webrtcConnectionAnchorId;
  }

                                                                              
  public toStringId(): WebrtcConnectionAnchorLocationId {
    return JSON.stringify(this) as WebrtcConnectionAnchorLocationId;
  }

  public static toSessionIdWithPeer(self: WebrtcConnectionAnchorLocation, peer: WebrtcConnectionAnchorLocation): string {
    return self.toStringId() + peer.toStringId();
  }
}
