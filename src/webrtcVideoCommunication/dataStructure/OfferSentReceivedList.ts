import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { SignalserverWebsocketMsg, WebrtcConnectionEvent, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

                                       
                                                                                                                                                                
                                                                                                                                                                           
                                                 
             
         
                       
                                                                            
                                                                     
                                                                  
                                                                                                                                 
             
         
                              
         
                               
                                                                                                                                                                            
                                                                            
                                                           
                                                                                                
         
                                                                             
                                                                                                                                                                                                                                                                                                    
                                                                                                                               
                                                                    
                                                                                                                               
                                                                                                                            
               
                                                                                                           
                                               
                                                                           
                                                                                                        
               
                                                                                         
                                                                                                                                                              
             
         
                                                                                    
                                                                                 
                                                                                                                                 
                                                                    
                                                                                                    
                                                  
                 
                      
                                                
               
             
         
                                                                                       
                                                                                                                                 
                                                                    
                                                                                                    
                      
                                 
               
             
         
                                                                                          
                                                                                                                                  
                                                                                                     
                                                                                                                                                                      
                        
                                                                                                                                
                                                                                               
                                                                                              
                     
                   
                 
               
             
         
                                                                              
                                                                                                                                 
                                                                                         
                                                                                               
             
                                                                                               
                                                                                 
                                                                                                                                       
             
         
                                                              
                                                      
             
         
                                                         
                           
                                                                                                                             
                                                               
               
                          
             
           
         
                                                                    
                                                                               
                                                                            
             
           
         
                                                                        
                                                                                   
                                                                              
             
           

class OfferSentReceivedList {
  protected readonly _mpp_OfferSentReceived: Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>>;
  get mpp_OfferSentReceived(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>> {
    return this._mpp_OfferSentReceived;
  }

             
  constructor(offerSentReceivedList_new?: OfferSentReceivedList) {
    this._mpp_OfferSentReceived = offerSentReceivedList_new
      ? offerSentReceivedList_new._mpp_OfferSentReceived
      : new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>>();
  }

                    

                     
  protected add_OfferSentReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg, varName_msgToFrom: keyof SignalserverWebsocketMsg & ('msgTo' | 'msgFrom')) {
    const msgToFrom = signalserverWebsocketMsg[varName_msgToFrom];
    if (msgToFrom == null) throw new TypeError();
    if (!(msgToFrom instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();

                                                                   
                                                                                                                                                                                                                                                                                          
    let mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer === undefined) {
      mpp_webrtcConnectionAnchorId_peer = new Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>();
      this._mpp_OfferSentReceived.set(msgToFrom.signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer);
    }
    if (mpp_webrtcConnectionAnchorId_peer.has(msgToFrom.webrtcConnectionAnchorId)) throw new TypeError();
    mpp_webrtcConnectionAnchorId_peer.set(msgToFrom.webrtcConnectionAnchorId, signalserverWebsocketMsg);
  }

                                                                          
  remove_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
      if (!mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId)) {
        throw new NoSuchItemException();
      }
    } else {
      throw new NoSuchItemException();
    }
  }

  remove_OfferSentReceived_ifHas(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
      return mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId);
    } else {
      return undefined;
    }
  }

  removeAllExcept_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      if (signalserverWebsocketClientId_peer !== msgToFrom.signalserverWebsocketClientId) {
        this._mpp_OfferSentReceived.delete(signalserverWebsocketClientId_peer);                                                                             
      } else {
        for (const [webrtcConnectionAnchorId_peer, signalserverWebsocketMsg] of mpp_webrtcConnectionAnchorId_peer) {
          if (webrtcConnectionAnchorId_peer !== msgToFrom.webrtcConnectionAnchorId) {
            mpp_webrtcConnectionAnchorId_peer.delete(webrtcConnectionAnchorId_peer);
          }
        }
      }
    }
  }

  toList(): WebrtcConnectionAnchorLocation[] {
    const list: WebrtcConnectionAnchorLocation[] = [];
    for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      for (const [webrtcConnectionAnchorId_peer, signalserverWebsocketMsg] of mpp_webrtcConnectionAnchorId_peer) {
        list.push(new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer, webrtcConnectionAnchorId_peer));
      }
    }
    return list;
  }

  clear() {
    this._mpp_OfferSentReceived.clear();
  }

  get_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer === undefined) throw new TypeError();
    const signalserverWebsocketMsg_fromPeer = mpp_webrtcConnectionAnchorId_peer.get(msgToFrom.webrtcConnectionAnchorId);
    if (signalserverWebsocketMsg_fromPeer === undefined) throw new TypeError();
    return signalserverWebsocketMsg_fromPeer;
  }
  get_OfferSentReceived_NoAggresiveThrow(msgToFrom: WebrtcConnectionAnchorLocation) {
                                                                         
    return this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId)?.get(msgToFrom.webrtcConnectionAnchorId);
  }

  get size_SignalserverWebsocketClientId(): number {
    return this._mpp_OfferSentReceived.size;
  }

  get size_WebrtcConnectionAnchorId(): number {
    let size = 0;
    for (const [signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      size += mpp_webrtcConnectionAnchorId_peer.size;
    }
    return size;
  }
}

export class OfferSentList extends OfferSentReceivedList {
  add_OfferSent(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgTo');
  }
}

export class OfferReceivedList extends OfferSentReceivedList {
  add_OfferReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom');
  }
}

export class OfferConnectedList extends OfferSentReceivedList {
     
                                
                                                                                                                                                                                             
                                                                            
                                                                                                                          
     
  moveToSelfWithUpdate_OfferConnected(signalserverWebsocketMsg: SignalserverWebsocketMsg, offerSentReceivedList: OfferSentReceivedList) {
                                                            
                                                                                                                
                                                                                        
                                                                                           
                                                                       
                                                                                          
                                                                                           
        
    offerSentReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgFrom);
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom');                  
  }
}
