import { OfferReceivedList, OfferSentList } from './OfferSentReceivedList';
import { SignalserverWebsocketClientId, SignalserverWebsocketMsg, WebrtcConnectionPointId, WebrtcConnectionPointLocation } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionEventHistory } from '../manager/WebrtcConnectionEventManager';
import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { AlreadyConnectedWithAPeerException } from '../exception/AlreadyConnectedWithAPeerException';

                                               
     
                                                                                          
  
                                                                                                                                                                                             
     
                                                                                                   
                                  
                            
                                                                                        
    
export class WebrtcConnectionLinkage {
             

  constructor(
    public readonly rtcPeerConnection: RTCPeerConnection,
    public readonly mediaStream_self: MediaStream,
    public readonly mediaStream_peer: MediaStream,   
    public readonly webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation
  ) {}

                                                                                                                                       
                                                                                      
                                                                                     
                                                          
  private _webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation | null = null;                  
     
           
                                                             
                                                                                
    
                   
    
     
               
  public get webrtcConnectionPointLocation_peer(): WebrtcConnectionPointLocation | null { return this._webrtcConnectionPointLocation_peer; }                   
  public set webrtcConnectionPointLocation_peer(value: WebrtcConnectionPointLocation) { if (value === null) throw new TypeError(); if (this._webrtcConnectionPointLocation_peer !== null) throw new Error('Immutable Value Once Set'); this._webrtcConnectionPointLocation_peer = value; }                   

             

                                                                                                                
                                                                  
                  
                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                

  private _jsx_WebrtcConnectionPointRcomp: JSX.Element | null = null;                  
                       
               
  public get jsx_WebrtcConnectionPointRcomp(): JSX.Element | null { return this._jsx_WebrtcConnectionPointRcomp; }                   
  public set jsx_WebrtcConnectionPointRcomp(value: JSX.Element) { if (value === null) throw new TypeError(); if (this._jsx_WebrtcConnectionPointRcomp !== null) throw new Error('Immutable Value Once Set'); this._jsx_WebrtcConnectionPointRcomp = value; }                   

             

     
                                     
     
  readonly webrtcConnectionEventHistory = new WebrtcConnectionEventHistory();

     
                                                                                                                            
     
  readonly offerSentList = new OfferSentList();
  readonly offerReceivedList = new OfferReceivedList();

                                                            
                                                 
                             

             

  toString(): string {
    return JSON.stringify(this);
  }
}

               

                                                       
                                                                        
                                        
                                                            
                                                                                             
                                                                 
      
                             
                                                                
                                                                                                                                 
                                                                
                                                                                
                                                                                                                                         
                                    
         
                                     
              
                                                                                                                   
                                                                                      
                                                                                                                                                                                                              
                                             
             
           
                                                           
         
    
  
                                                                                                        
                                                                                                                                                                                                          
                                                              
                                                                              
                                                                                                                                     
                                                                                                                     
                                                                       
                                                                                                                                                       
                                  
                                                                                                   
                     
                                                                                                                             
                                                                                                                                     
                                                                   
                                                            
          
                                                                                                                                                                                                                                      
                                                                                                                                                                 
          
                                                                         
       
          
                                            
          
                                                                                                         
       
                                                 
                                              
                                      
       
                  
                                                                                                                                     
                  
                                                                                                             
                                                       
                                                                       
                                                                                      
                                               
                                                                
                                                                                                                                                         
                                                                                                                          
                                                                                                                  
                                                                
                                                                                                                                           
                                                      
    
  

                   
export function get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self: Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>, webrtcConnectionPointId_self: WebrtcConnectionPointId) {
  const webrtcConnectionLinkage = mpp_webrtcConnectionPointId_self.get(webrtcConnectionPointId_self);
  if (webrtcConnectionLinkage == null) throw new NoSuchItemException();
  return webrtcConnectionLinkage;
}

export function get_webrtcConnectionLinkage_withNoPeer(
  mpp_webrtcConnectionPointId_self: Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>,
  webrtcConnectionPointLocation: WebrtcConnectionPointLocation
) {
  const webrtcConnectionLinkage = get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self, webrtcConnectionPointLocation.webrtcConnectionPointId);
  if (webrtcConnectionLinkage.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
  return webrtcConnectionLinkage;
}

export function get_webrtcConnectionLinkage_pc(mpp_webrtcConnectionPointId_self: Map<WebrtcConnectionPointId, WebrtcConnectionLinkage>, webrtcConnectionPointLocation: WebrtcConnectionPointLocation) {
  const webrtcConnectionLinkage = get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self, webrtcConnectionPointLocation.webrtcConnectionPointId);
  return webrtcConnectionLinkage.rtcPeerConnection;
}
