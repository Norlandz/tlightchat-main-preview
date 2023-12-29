import { Type } from 'class-transformer';
import 'reflect-metadata';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorLocation } from './WebrtcConnectionAnchorLocation';
                                                                                        
import { v4 as uuidv4 } from 'uuid';

export enum SignalserverWebsocketMsgType {
  signalserverWebsocketClientId_self = 'signalserverWebsocketClientId_self',
  webrtcConnectionAnchor_Online = 'webrtcConnectionAnchor_Online',
  webrtcConnectionAnchor_Offline = 'webrtcConnectionAnchor_Offline',
  lobbyUserList = 'lobbyUserList',
    
  webrtcConnectionEvent_Category = 'webrtcConnectionEvent_Category',
    
  heartbeat = 'heartbeat',
  testMessage = 'testMessage',
    
  waitForOtherIns_FinishTestCheck_ThenLeave = 'waitForOtherIns_FinishTestCheck_ThenLeave',
    
  chatMessage = 'chatMessage',
}

export enum SignalserverWebsocketMsgReceiverType {
  webrtcConnectionAnchorLocation = 'webrtcConnectionAnchorLocation',
  allWebrtcConnectionAnchorLocation = 'allWebrtcConnectionAnchorLocation',
  signalserver = 'signalserver',                                                                                                                             
                                                 
}

                                                               
export enum WebrtcConnectionEventType {
  offerPlainSignal_Sent = 'offerPlainSignal_Sent',                                                                                                                 
  offerPlainSignal_Accepted = 'offerPlainSignal_Accepted',
                                       
  offerDescription_Sent = 'offerDescription_Sent',
  offerDescription_Accepted_answerDescription_Sent = 'offerDescription_Accepted_answerDescription_Sent',
  iceCandidate_Sent = 'iceCandidate_Sent',
  offerPlainSignal_Cancelled = 'offerPlainSignal_Cancelled',
  offerPlainSignal_Declined = 'offerPlainSignal_Declined',
  webrtcConnection_Closed = 'webrtcConnection_Closed',
}

declare const eventSessionMailboxIdSymbol: unique symbol;
export type EventSessionMailboxId = string & { [eventSessionMailboxIdSymbol]: never };

export class SignalserverClientEventSessionMailbox {
  constructor(
       
                                                   
      
                                          
                                             
                             
      
                                                                          
                                                                                                    
       
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly eventSessionMailboxId: EventSessionMailboxId,
       
                                                                                
                                           
                                                                     
       
    public readonly eventSessionMailboxLifetimelength: number
  ) {}

  private readonly __typeDiscriminatorForClassTransformer = 'SignalserverClientEventSessionMailbox';

                                                                                                                                                                                   
}

                                                                                                          
                                                                                   
                                                                                    
export class SignalserverWebsocketMsg {
  readonly uuid = uuidv4();
  @Type(() => Date)
  readonly timeStamp = new Date();

  public readonly msgType: SignalserverWebsocketMsgType;
  public readonly msgData: unknown;
  @Type(() => WebrtcConnectionEvent)
  public readonly webrtcConnectionEvent: WebrtcConnectionEvent | undefined;

  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly msgFrom: WebrtcConnectionAnchorLocation;                                                                      
                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                             
                                                           
                          
                       
                                                            
                    
                                                                                             
                                                                                                           
           
         
            
                                                                                                                                                                                                                    
            
                                                        
                                                                                  
                                       
       
                                                                                                          
  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly msgTo: WebrtcConnectionAnchorLocation | null;
  public readonly msgReceiverType: SignalserverWebsocketMsgReceiverType | null;

  constructor(
    msgType: SignalserverWebsocketMsgType,
    msgData: unknown,
    webrtcConnectionEvent: WebrtcConnectionEvent | undefined,
    msgFrom: WebrtcConnectionAnchorLocation,
    msgTo: WebrtcConnectionAnchorLocation | null,
    msgReceiverType: SignalserverWebsocketMsgReceiverType
  ) {
    if (msgReceiverType === SignalserverWebsocketMsgReceiverType.webrtcConnectionAnchorLocation) {
      if (!(msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    } else if (msgReceiverType === SignalserverWebsocketMsgReceiverType.allWebrtcConnectionAnchorLocation) {
      if (!(msgTo === null)) throw new TypeError();
                                                                                            
                                                          
                                                                                                   
                                                                                                
    } else if (msgReceiverType === SignalserverWebsocketMsgReceiverType.signalserver) {
      if (!(msgTo === null)) throw new TypeError();
    } else {
      if (msgType === undefined && msgData === undefined && webrtcConnectionEvent === undefined && msgFrom === undefined && msgTo === undefined && msgReceiverType === undefined) {
                                                                                               
      } else {
        console.error(msgReceiverType);
        console.error(msgTo);
        throw new TypeError();
      }
    }

    this.msgType = msgType;
    this.msgData = msgData;
    this.webrtcConnectionEvent = webrtcConnectionEvent;
    this.msgFrom = msgFrom;
    this.msgTo = msgTo;
    this.msgReceiverType = msgReceiverType;
  }
}

export class WebrtcConnectionEvent {
                             

  readonly eventType: WebrtcConnectionEventType;
  readonly uuid = uuidv4();
  @Type(() => Date)
  readonly timeStamp = new Date();
  @Type(() => WebrtcConnectionAnchorLocation)
  readonly creator: WebrtcConnectionAnchorLocation | null;

  constructor(eventType: WebrtcConnectionEventType, creator: WebrtcConnectionAnchorLocation | null) {
    this.eventType = eventType;
    this.creator = creator;
  }
}

               

                                                     
export interface RTCSessionDescriptionInit_plain extends RTCSessionDescriptionInit {
  sdp: string | undefined;
  type: RTCSdpType;
}
