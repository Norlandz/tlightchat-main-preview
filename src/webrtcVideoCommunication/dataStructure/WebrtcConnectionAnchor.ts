import { OfferConnectedList, OfferReceivedList, OfferSentList } from './OfferSentReceivedList';
import { SignalserverWebsocketMsg, SignalserverWebsocketMsgType, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { AlreadyConnectedWithAPeerException } from '../exception/AlreadyConnectedWithAPeerException';
                                                                                                                  
                                          
                                                                                            
                                             
import { v4 as uuidv4 } from 'uuid';
                                                                                
import io, { Socket } from 'socket.io-client';
                                                                                 
import { EventData, SCXML, State } from 'xstate';
                                                                                                                               
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import { WebrtcConnectionAnchorLocation, SignalserverWebsocketClientId, WebrtcConnectionAnchorId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { MppWebrtcConnectionAnchor } from './MppWebrtcConnectionAnchor';

                            
                                                                                                   

                                                                                                                                        
   
                
                                                                         
                                                               
                                                        
                                                              
                                                           
                                                                                               
                                                                                       
                                                                                                                              
                                                                                     
   
export class WebrtcConnectionAnchor {
             

                                                                                                                                               
  public readonly webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation;

  constructor(signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId) {
    this.webrtcConnectionAnchorLocation_self = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_self_sessionReactApp, uuidv4() as WebrtcConnectionAnchorId);
                                           
  }

     
                                                                                              
                                                                                        
                                                                             
     
  public webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null = null;
  public rtcPeerConnection: RTCPeerConnection | null = null;
  public mediaStream_self: MediaStream | null = null;
  public mediaStream_peer: MediaStream | null = null;
  public customName_self: string | null = null;

                                                                        
                                                                                                                                              
  public set_mediaStreamLocalSelf_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;
  public set_mediaStreamRemotePeer_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

             
     
                                                                                                                            
                                                                    
     
  readonly offerSentList = new OfferSentList();
  readonly offerReceivedList = new OfferReceivedList();
  readonly offerConnectedList = new OfferConnectedList();

             
  public readonly webrtcConnectionService = new WebrtcConnectionService(this);

                                                                                             

             
                                                            
                                                 
                             

             
                                                                                                                                         

             

  toString(): string {
    return JSON.stringify(this);
  }
}

               

export function get_webrtcConnectionAnchor_self_helper(
  mppWebrtcConnectionAnchor_rst: MppWebrtcConnectionAnchor,
  webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation
): WebrtcConnectionAnchor {
  const webrtcConnectionAnchor_self = mppWebrtcConnectionAnchor_rst.get(webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  if (webrtcConnectionAnchor_self == null) throw new TypeError();
  return webrtcConnectionAnchor_self;
}
