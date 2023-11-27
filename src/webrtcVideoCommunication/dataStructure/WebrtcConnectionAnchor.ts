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
    this.webrtcConnectionAnchorLocation_self = new WebrtcConnectionAnchorLocation(
      signalserverWebsocketClientId_self_sessionReactApp,
                                             
      uuidv4() as WebrtcConnectionAnchorId
    );
  }

     
                                                                                              
                                                                                        
                                                                             
     
  public webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null = null;
  public rtcPeerConnection: RTCPeerConnection | null = null;
  public mediaStream_self: MediaStream | null = null;
  public mediaStream_peer: MediaStream | null = null;

                                                                        
                                                                                                                                              
  public set_mediaStreamLocalSelf_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;
  public set_mediaStreamRemotePeer_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

             
     
                                                                                                                            
                                                                    
     
  readonly offerSentList = new OfferSentList();
  readonly offerReceivedList = new OfferReceivedList();
  readonly offerConnectedList = new OfferConnectedList();

             
                                                                                  
                                                                                                                                
                                                                                                                                         
  private readonly mppSocketioListenerCleanup = new Map<SignalserverWebsocketMsgType | WebrtcConnectionEventType, (...args: any[]) => void>();
  public add_Listener_toCleanup(socketio_eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType, socketio_listener: (...args: any[]) => void) {
    if (this.mppSocketioListenerCleanup.has(socketio_eventType)) throw new Error('Socketio Listener already registered :: ' + socketio_eventType);
    this.mppSocketioListenerCleanup.set(socketio_eventType, socketio_listener);
  }
  public cleanup_Listener_ofGivenEventType(socket_client: Socket, socketio_eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType) {
    const socketIo_listener = this.mppSocketioListenerCleanup.get(socketio_eventType);
    if (socketIo_listener === undefined) throw new TypeError();
    socket_client.off(socketio_eventType, socketIo_listener);
    this.mppSocketioListenerCleanup.delete(socketio_eventType);
  }
  public cleanup_AllListener_except(socket_client: Socket, arr_socketio_eventType_Except: (SignalserverWebsocketMsgType | WebrtcConnectionEventType)[]) {
    if (this.mppSocketioListenerCleanup.size === 0) throw new TypeError('Sure?');
    for (const [socketio_eventType, socketIo_listener] of this.mppSocketioListenerCleanup) {
      if (!arr_socketio_eventType_Except.includes(socketio_eventType)) {
        socket_client.off(socketio_eventType, socketIo_listener);
        this.mppSocketioListenerCleanup.delete(socketio_eventType);
      }
    }
                                                                       
                                               
  }

             
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
