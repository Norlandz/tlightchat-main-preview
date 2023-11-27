               
   
                                                        
                                                                           
   
   
                                             
                                                                                                
                                                                                                                                   
   

declare const webrtcConnectionAnchorIdSymbol: unique symbol;
export type WebrtcConnectionAnchorId = string & { [webrtcConnectionAnchorIdSymbol]: never; };
declare const signalserverWebsocketClientIdSymbol: unique symbol;
export type SignalserverWebsocketClientId = string & { [signalserverWebsocketClientIdSymbol]: never; };
declare const mediaStreamIdSymbol: unique symbol;
export type MediaStreamId = string & { [mediaStreamIdSymbol]: never; };

export class WebrtcConnectionAnchorLocation {
  constructor(
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly webrtcConnectionAnchorId: WebrtcConnectionAnchorId   
  ) { }

                       
                                                                                               
                                                                                                          
                                                                                                          
  equals(other: WebrtcConnectionAnchorLocation): boolean {
    return this.signalserverWebsocketClientId === other.signalserverWebsocketClientId && this.webrtcConnectionAnchorId === other.webrtcConnectionAnchorId;
  }
  toString(): string {
    return JSON.stringify(this);
  }
}
