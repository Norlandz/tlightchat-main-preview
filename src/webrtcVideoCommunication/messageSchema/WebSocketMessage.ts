import { Type } from 'class-transformer';
import 'reflect-metadata';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorLocation } from './WebrtcConnectionAnchorLocation';
// import { nanoid } from '@reduxjs/toolkit'; // @pb: wont work outside of tsx scope ...
import { v4 as uuidv4 } from 'uuid';

export enum SignalserverWebsocketMsgType {
  signalserverWebsocketClientId_self = 'signalserverWebsocketClientId_self',
  webrtcConnectionAnchor_Online = 'webrtcConnectionAnchor_Online',
  webrtcConnectionAnchor_Offline = 'webrtcConnectionAnchor_Offline',
  lobbyUserList = 'lobbyUserList',
  //
  webrtcConnectionEvent_Category = 'webrtcConnectionEvent_Category',
  //
  heartbeat = 'heartbeat',
  testMessage = 'testMessage',
  //
  waitForOtherIns_FinishTestCheck_ThenLeave = 'waitForOtherIns_FinishTestCheck_ThenLeave',
  //
  chatMessage = 'chatMessage',
}

export enum SignalserverWebsocketMsgReceiverType {
  webrtcConnectionAnchorLocation = 'webrtcConnectionAnchorLocation',
  allWebrtcConnectionAnchorLocation = 'allWebrtcConnectionAnchorLocation',
  signalserver = 'signalserver', // doubt is this needed, so far only used in test case ... imean want to encapsulate more to remove this / make use of it?..
  // eventSessionMailbox = 'eventSessionMailbox',
}

// for now for convenience, put on same lv of socket listen ...
export enum WebrtcConnectionEventType {
  offerPlainSignal_Sent = 'offerPlainSignal_Sent', // ~~~~// @deps_on_design, for performance / privacy / intuitve structure, just deps. // TODO add design comment
  offerPlainSignal_Accepted = 'offerPlainSignal_Accepted',
  // offer_Received = 'offer_Received',
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
    /**
     * Socketio will listen on this eventMailboxId.
     *
     * For one time session communication.
     * Async Event (cannot use sync req_res).
     * @design dk good or bad
     *
     * // the naming, or call respond id  . hum that send to location emmm
     * // well that once settle , that ignore use peer hum / maybe can[still design may not & b mess
     */
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly eventSessionMailboxId: EventSessionMailboxId,
    /**
     * How long the socketio should keep listening for this eventSessionMailbox.
     * Starting from the eventCreationTime.
     * When the lifetimelength is over, the listener will be removed.
     */
    public readonly eventSessionMailboxLifetimelength: number
  ) {}

  private readonly __typeDiscriminatorForClassTransformer = 'SignalserverClientEventSessionMailbox';

  // /-**@¦  //  * Set this, If want to continue the Session, but change the id to a new(/another) SessionId.@¦  //  *-/@¦  // readonly eventSessionIdSwitchTo: string | undefined;
}

// @deps_on_design-dk determination & categorization (& hierarchy) - for EventReceiverType ; for EventType
// @deps_on_design-dk store sync same event info vs privacy / store diff event info
// @deps_on_design-dk store info about sender / use another msg wapper for the event
export class SignalserverWebsocketMsg {
  readonly uuid = uuidv4();
  @Type(() => Date)
  readonly timeStamp = new Date();

  public readonly msgType: SignalserverWebsocketMsgType;
  public readonly msgData: unknown;
  @Type(() => WebrtcConnectionEvent)
  public readonly webrtcConnectionEvent: WebrtcConnectionEvent | undefined;

  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly msgFrom: WebrtcConnectionAnchorLocation; // @minor: aga said the class instance during transmission is lost ..
  // @dk @Type(() => WebrtcConnectionAnchorLocation | null)
  // @res: Union typescript · Issue #579 · typestack/class-transformer https://github.com/typestack/class-transformer/issues/579  typescript - class transformation of discriminated unions - Stack Overflow https://stackoverflow.com/questions/61443377/class-transformation-of-discriminated-unions  typestack/class-transformer: Decorator-based transformation, serialization, and deserialization between objects and classes. https://github.com/typestack/class-transformer#providing-more-than-one-type-option
  // ~~~// the pb is need add extra property emmm // may do @Transform but too much trouble..
  // I dont want to do typeguard ... just use Es6 class ...
  // @Type(() => Object, {
  //   discriminator: {
  //     property: '__typeDiscriminatorForClassTransformer',
  //     subTypes: [
  //       { value: WebrtcConnectionAnchorLocation, name: 'WebrtcConnectionAnchorLocation' },
  //       { value: SignalserverClientEventSessionMailbox, name: 'SignalserverClientEventSessionMailbox' },
  //     ],
  //   },
  //   // []
  //   // Hint: The same applies for arrays with different sub types. Moreover you can specify `keepDiscriminatorProperty: true` in the options to keep the discriminator property also inside your resulting class.
  //   // <>
  //   // https://github.com/typestack/class-transformer
  //   // ~~~// was suspecting ... but those ... dk why work sometime sometime not
  //   keepDiscriminatorProperty: true,
  // })
  // public readonly msgTo: WebrtcConnectionAnchorLocation | null | SignalserverClientEventSessionMailbox;
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
      // } else if (msgReceiverType === SignalserverWebsocketMsgReceiverType.signalserver) {
        //   if (!(msgTo === null)) throw new TypeError();
      // } else if (msgReceiverType === SignalserverWebsocketMsgReceiverType.eventSessionMailbox) {
      //   if (!(msgTo instanceof SignalserverClientEventSessionMailbox)) throw new TypeError();
    } else if (msgReceiverType === SignalserverWebsocketMsgReceiverType.signalserver) {
      if (!(msgTo === null)) throw new TypeError();
    } else {
      if (msgType === undefined && msgData === undefined && webrtcConnectionEvent === undefined && msgFrom === undefined && msgTo === undefined && msgReceiverType === undefined) {
        // @do_nothing // seems its classTransformer ... // dk why not like Java Reflection ...
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
  // implements CustomEvent {

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

// ############

// seems impossible to generate typeguard .. complex?
export interface RTCSessionDescriptionInit_plain extends RTCSessionDescriptionInit {
  sdp: string | undefined;
  type: RTCSdpType;
}
