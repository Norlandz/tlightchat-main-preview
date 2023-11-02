import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';

export enum SignalserverWebsocketMsgType {
                   
                     
                 
  signalserverWebsocketClientId_self = 'signalserverWebsocketClientId_self',
                                                                                 
                                                                                 
                                                                                                 
  lobbyUserList = 'lobbyUserList',
                                                                                                
                                             
  iceCandidate = 'iceCandidate',
                                           
  heartbeat = 'heartbeat',
  testMessage = 'testMessage',
}

   
                                                        
                                                                           
   
   
                                            
                                                                                                
                                                                                                                                   
   
declare const webrtcConnectionPointIdSymbol: unique symbol;
export type WebrtcConnectionPointId = string & { [webrtcConnectionPointIdSymbol]: never };
declare const signalserverWebsocketClientIdSymbol: unique symbol;
export type SignalserverWebsocketClientId = string & { [signalserverWebsocketClientIdSymbol]: never };

export class WebrtcConnectionPointLocation {
  constructor(
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly webrtcConnectionPointId: WebrtcConnectionPointId   
  ) {}
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
export class SignalserverWebsocketMsg {
                                                      
  public readonly msgData: unknown;

  @Type(() => WebrtcConnectionPointLocation)
  public readonly msgFrom: WebrtcConnectionPointLocation;                                                              
  @Type(() => WebrtcConnectionPointLocation)                                                        
  public readonly msgTo: WebrtcConnectionPointLocation | null;

  constructor(msgData: unknown, msgFrom: WebrtcConnectionPointLocation, msgTo: WebrtcConnectionPointLocation | null) {
    this.msgData = msgData;
    this.msgFrom = msgFrom;
    this.msgTo = msgTo;
  }
}

               

export enum WebrtcConnectionEventType {
  connectionCreatedSent = 'connectionCreatedSent',
  offerSent = 'offerSent',
                                     
  answerSent = 'answerSent',
                                       
  closeSent = 'closeSent',
                                     
  cancelSent = 'cancelSent',
                                       
  declineSent = 'declineSent',
  offerSentPlain = 'offerSentPlain',
  offerAcceptedPlain = 'offerAcceptedPlain',
  oneTimeSessionMailbox = "oneTimeSessionMailbox"
}

export class WebrtcConnectionEvent {
                             
     
                                                 
    
                                        
                                           
                           
    
                                                                        
                                                                                                  
     
  readonly eventSessionMailboxId: string | undefined;
                                                                                                                                                                                   
  
     
                                                                              
                                         
                                                                   
     
  readonly eventSessionMailboxLifetimelength: number | undefined;

  readonly uuid = uuidv4();
  @Type(() => Date)
  readonly timeStamp = new Date();
  readonly eventType: WebrtcConnectionEventType;
  @Type(() => SignalserverWebsocketMsg)
  readonly msg: SignalserverWebsocketMsg;

  constructor(eventType: WebrtcConnectionEventType, msg: SignalserverWebsocketMsg, eventSessionMailboxId?: string, eventSessionMailboxLifetimelength?: number) {
    this.eventType = eventType;
    this.msg = msg;

    this.eventSessionMailboxId = eventSessionMailboxId;
    this.eventSessionMailboxLifetimelength = eventSessionMailboxLifetimelength;
  }
}
