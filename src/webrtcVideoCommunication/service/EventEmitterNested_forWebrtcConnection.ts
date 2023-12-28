import { EventEmitter } from 'events';
// Uncaught TypeError: Class extends value #<Object> is not a constructor or null
// Module "events" has been externalized for browser compatibility. Cannot access "events.EventEmitter" in client code

import * as socketIoClient from 'socket.io-client';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { SignalserverWebsocketMsg, SignalserverWebsocketMsgType, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';
import { plainToInstance } from 'class-transformer';
import { UserAuth0Id, UserWeb } from '../../user/UserWeb';
import * as auth0React from '@auth0/auth0-react';

// ;moved; import { SignalserverWebsocketMsgType, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';@¦// ;moved; import { EventEmitterNested_forWebrtcConnection } from './EventEmitterNested_forWebrtcConnection';@¦// ;moved; @¦// ;moved; type ListenerTopicType = WebrtcConnectionEventType; // SignalserverWebsocketMsgType@¦// ;moved; @¦// ;moved; class ListenerNode {@¦// ;moved;   sessionId: string | null = null;@¦// ;moved; @¦// ;moved;   // well this wont be used on socket io so...@¦// ;moved;   readonly emt: EventEmitterNested_forWebrtcConnection;@¦// ;moved;   readonly listenerTopicType: ListenerTopicType;@¦// ;moved;   readonly listener: (...args: any[]) => void | Promise<void>;@¦// ;moved; @¦// ;moved;   constructor(emt: EventEmitterNested_forWebrtcConnection, listenerTopicType: ListenerTopicType, listener: (...args: any[]) => void | Promise<void>) {@¦// ;moved;     this.emt = emt;@¦// ;moved;     this.listenerTopicType = listenerTopicType;@¦// ;moved;     this.listener = listener;@¦// ;moved;   }@¦// ;moved; }@¦// ;moved; @¦// ;moved; @¦// ;moved; //   // ########@¦// ;moved; // @¦// ;moved; //   // ;design; ok dk design of the mpp of listeners, the hierachal thing,@¦// ;moved; //   // ;design; then just say , just encapsulate it & let mess inside; only expose necessary methods then ...@¦// ;moved; //   // dk then Set is.. said messy design on .. (db .. hum @¦// ;moved; // @¦// ;moved; //   // readonly socketIoCleanupList: [Socket, any, (...args: any[]) => void][] = [];@¦// ;moved; //   // readonly socketIoCleanupList: [SignalserverWebsocketMsgType | WebrtcConnectionEventType , (...args: any[]) => void][] = [];@¦// ;moved; //   // readonly mppSocketioListenerCleanup = new Map<(...args: any[]) => void, SignalserverWebsocketMsgType | WebrtcConnectionEventType>();@¦// ;moved; //   private readonly mppSocketioListenerCleanup = new Map<SignalserverWebsocketMsgType | WebrtcConnectionEventType, (...args: any[]) => void | Promise<void>>();@¦// ;moved; //   /** @deprecated access in debug only */@¦// ;moved; //   public get_mppSocketioListenerCleanup() {@¦// ;moved; //     return this.mppSocketioListenerCleanup;@¦// ;moved; //   }@¦// ;moved; //   public add_Listener_toCleanup(socketio_eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType, socketio_listener: (...args: any[]) => void | Promise<void>) {@¦// ;moved; //     if (this.mppSocketioListenerCleanup.has(socketio_eventType)) throw new Error('Socketio Listener already registered :: ' + socketio_eventType);@¦// ;moved; //     this.mppSocketioListenerCleanup.set(socketio_eventType, socketio_listener);@¦// ;moved; //   }@¦// ;moved; //   public cleanup_Listener_ofGivenEventType(socket_client: Socket, socketio_eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType, strictMode = true) {@¦// ;moved; //     const socketIo_listener = this.mppSocketioListenerCleanup.get(socketio_eventType);@¦// ;moved; //     if (strictMode && socketIo_listener === undefined) throw new TypeError();@¦// ;moved; //     socket_client.off(socketio_eventType, socketIo_listener);@¦// ;moved; //     this.mppSocketioListenerCleanup.delete(socketio_eventType);@¦// ;moved; //   }@¦// ;moved; //   public cleanup_AllListener_except(socket_client: Socket, arr_socketio_eventType_Except: (SignalserverWebsocketMsgType | WebrtcConnectionEventType)[]) {@¦// ;moved; //     if (this.mppSocketioListenerCleanup.size === 0) throw new TypeError('Sure?');@¦// ;moved; //     for (const [socketio_eventType, socketIo_listener] of this.mppSocketioListenerCleanup) {@¦// ;moved; //       if (!arr_socketio_eventType_Except.includes(socketio_eventType)) {@¦// ;moved; //         socket_client.off(socketio_eventType, socketIo_listener);@¦// ;moved; //         this.mppSocketioListenerCleanup.delete(socketio_eventType);@¦// ;moved; //       }@¦// ;moved; //     }@¦// ;moved; //     // this.webrtcConnectionAnchor_self.socketIoCleanupList.length = 0;@¦// ;moved; //     // this.mppSocketioListenerCleanup.clear();@¦// ;moved; //   }@¦// ;moved; @¦// ;moved; export class ListenerMaintainer {@¦// ;moved;   // private readonly mppSocketioListenerCleanup = new Map<string, ListenerNode>();@¦// ;moved;   private readonly gp_listenerNode = new Set<ListenerNode>();@¦// ;moved; @¦// ;moved;   public add_Listener_toCleanup(emt: EventEmitterNested_forWebrtcConnection, socketio_eventType: ListenerTopicType, socketio_listener: (...args: any[]) => void | Promise<void>, sessionId?: string) {@¦// ;moved;     const listenerNode = new ListenerNode(emt, socketio_eventType, socketio_listener);@¦// ;moved;     if (sessionId) {@¦// ;moved;       listenerNode.sessionId = sessionId;@¦// ;moved;     }@¦// ;moved;     this.gp_listenerNode.add(listenerNode);@¦// ;moved;   }@¦// ;moved; @¦// ;moved;   public cleanup_Listener_ofGivenEventType(eventType: ListenerTopicType, strictMode = true) {@¦// ;moved;     for (const listenerNode of this.gp_listenerNode) {@¦// ;moved;       if (listenerNode.listenerTopicType === eventType) {@¦// ;moved;         listenerNode.emt.off(eventName, listener); // TODO@¦// ;moved;         this.gp_listenerNode.delete(listenerNode);@¦// ;moved;       }@¦// ;moved;     }@¦// ;moved;   }@¦// ;moved; @¦// ;moved;   public cleanup_Listener_ofGivenSessionId(sessionId: string) {@¦// ;moved;     for (const listenerNode of this.gp_listenerNode) {@¦// ;moved;       if (listenerNode.sessionId === sessionId) {@¦// ;moved;         listenerNode.emt.off(eventName, listener); // TODO@¦// ;moved;         this.gp_listenerNode.delete(listenerNode);@¦// ;moved;       }@¦// ;moved;     }@¦// ;moved;   }@¦// ;moved; @¦// ;moved;   public cleanup_AllListener() {}@¦// ;moved; }@¦

type ListenerTopicType = WebrtcConnectionEventType; // SignalserverWebsocketMsgType

class ListenerNode {
  sessionId: string | null = null;

  // well this wont be used on socket io so...
  readonly emt: EventEmitterNested_forWebrtcConnection;
  readonly listenerTopicType: ListenerTopicType;
  readonly listener: (...args: any[]) => void | Promise<void>;

  constructor(emt: EventEmitterNested_forWebrtcConnection, listenerTopicType: ListenerTopicType, listener: (...args: any[]) => void | Promise<void>) {
    this.emt = emt;
    this.listenerTopicType = listenerTopicType;
    this.listener = listener;
  }
}

// EventEmitterLocalDispatcher_forWebrtcConnectionAnchor
// EventEmitterNested
// @messy forgot how java do this?...
// aga composition & delegate
abstract class EventEmitterNested<TyEmt extends EventEmitterNested<TyEmt>> extends EventEmitter {
  // protected readonly mpp_emt = new Map<string, EventEmitterNested>();
  protected readonly mpp_emt = new Map<string, TyEmt>();
  protected readonly gp_listenerNode = new Set<ListenerNode>();

  /** @deprecated use the custum one (unless you know the internal design) */ public emit               = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore
  /** @deprecated use the custum one (unless you know the internal design) */ public on                 = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore
  /** @deprecated use the custum one (unless you know the internal design) */ public off                = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore
  /** @deprecated use the custum one (unless you know the internal design) */ public addListener        = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore
  /** @deprecated use the custum one (unless you know the internal design) */ public removeListener     = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore
  /** @deprecated use the custum one (unless you know the internal design) */ public removeAllListeners = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); }; // prettier-ignore

  protected emit_ori = super.emit;
  protected addListener_ori = super.addListener;
  protected removeListener_ori = super.removeListener;
  protected removeAllListeners_ori = super.removeAllListeners;
}

export class EventEmitterNested_forWebrtcConnection extends EventEmitterNested<EventEmitterNested_forWebrtcConnection> {
  // TODO this should not be exposed
  public create_nested(sessionId: string) {
    if (this.mpp_emt.has(sessionId)) throw new TypeError();
    const emt_child = new EventEmitterNested_forWebrtcConnection();
    this.mpp_emt.set(sessionId, emt_child);
    // return emt_child;
  }

  // the procedure flow of this directly goes to the next function ...
  public emit_custom(eventType_NestedListener: WebrtcConnectionEventType, signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) {
    // TODO validate
    if (signalserverWebsocketMsg_jsobj.msgFrom == null) throw new TypeError();
    if (signalserverWebsocketMsg_jsobj.msgTo == null) throw new TypeError();

    if (eventType_NestedListener === WebrtcConnectionEventType.offerPlainSignal_Sent) {
      // ;moved aga; // dk @messy
      // ;moved aga; // wait... this is all about receiving .. there is no send ....
      // ;moved aga; // or even move to inside the state machine .... in the service method ..
      // ;moved aga; this.mpp_eventEmitterNested.set(
      // ;moved aga;   WebrtcConnectionAnchorLocation.toSessionIdWithPeer(signalserverWebsocketMsg_jsobj.msgTo, signalserverWebsocketMsg_jsobj.msgFrom),
      // ;moved aga;   new EventEmitterNested_forWebrtcConnection()
      // ;moved aga; );

      this.emit_ori(eventType_NestedListener, signalserverWebsocketMsg_jsobj);
    } else if (
      [
        WebrtcConnectionEventType.offerPlainSignal_Accepted,
        WebrtcConnectionEventType.offerDescription_Sent,
        WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent,
        WebrtcConnectionEventType.iceCandidate_Sent,
        WebrtcConnectionEventType.webrtcConnection_Closed,
        WebrtcConnectionEventType.offerPlainSignal_Cancelled,
        WebrtcConnectionEventType.offerPlainSignal_Declined,
      ].includes(eventType_NestedListener)
    ) {
      const emt = this.mpp_emt.get(WebrtcConnectionAnchorLocation.toSessionIdWithPeer(signalserverWebsocketMsg_jsobj.msgTo, signalserverWebsocketMsg_jsobj.msgFrom));
      if (emt == null) throw new TypeError();
      emt.emit_ori(eventType_NestedListener, signalserverWebsocketMsg_jsobj);
    } else {
      throw new TypeError();
    }
  }

  // idk seems no need manual on listen at each step , but overall enable? dk design messy brain ..
  // dk nah no init() for loop ... use custom on ..
  public addListener_custom(
    eventType_NestedListener: WebrtcConnectionEventType,
    sessionIdWithPeer: string | null,
    listener: (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => void | Promise<void>
  ) {
    if (eventType_NestedListener === WebrtcConnectionEventType.offerPlainSignal_Sent) {
      if (!(sessionIdWithPeer === null)) throw new TypeError();

      this.addListener_ori(eventType_NestedListener, listener);
      this.add_Listener_toCleanup(eventType_NestedListener, listener);
    } else if (
      [
        WebrtcConnectionEventType.offerPlainSignal_Accepted,
        WebrtcConnectionEventType.offerDescription_Sent,
        WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent,
        WebrtcConnectionEventType.iceCandidate_Sent,
        WebrtcConnectionEventType.webrtcConnection_Closed,
        WebrtcConnectionEventType.offerPlainSignal_Cancelled,
        WebrtcConnectionEventType.offerPlainSignal_Declined,
      ].includes(eventType_NestedListener)
    ) {
      if (sessionIdWithPeer == null) throw new TypeError();
      // console.log(this.mpp_emt);
      const eventEmitterNested_forWebrtcConnection = this.mpp_emt.get(sessionIdWithPeer);
      if (eventEmitterNested_forWebrtcConnection == null) throw new TypeError();
      eventEmitterNested_forWebrtcConnection.addListener_ori(eventType_NestedListener, listener);
      eventEmitterNested_forWebrtcConnection.add_Listener_toCleanup(eventType_NestedListener, listener, sessionIdWithPeer);
      // seem only go with lv2 , not general...
    } else {
      throw new TypeError();
    }
    // super.on(eventType_NestedListener, listener);
  }

  // ############

  // ##

  /**
   * <strike>for now the design require sessionId be globally unique, not just inside the nested lv -- for org ... but messy still
   * no this is leveled em
   * @ deprecated
   */
  // private readonly gp_sessionId = new Set<string>();

  private add_Listener_toCleanup(socketio_eventType: ListenerTopicType, socketio_listener: (...args: any[]) => void | Promise<void>, sessionId?: string) {
    const listenerNode = new ListenerNode(this, socketio_eventType, socketio_listener);
    if (sessionId) {
      // if (this.gp_sessionId.has(sessionId)) throw new TypeError();
      // this.gp_sessionId.add(sessionId);
      listenerNode.sessionId = sessionId;
    }
    this.gp_listenerNode.add(listenerNode);
  }

  // ##

  private remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel: ListenerTopicType) {
    for (const listenerNode of this.gp_listenerNode) {
      if (listenerNode.listenerTopicType === eventType_ToDel) {
        if (listenerNode.emt !== this) throw new TypeError();
        if (this.listeners(listenerNode.listenerTopicType).length === 0) throw new TypeError();
        this.removeListener_ori(listenerNode.listenerTopicType, listenerNode.listener);
        this.gp_listenerNode.delete(listenerNode);
        // if (listenerNode.sessionId) {
        //   this.gp_sessionId.delete(listenerNode.sessionId);
        // }
        // should i remove the root if its empty . cuz for sessionId that is true...
      }
    }
  }

  // public remove_Listener_ofGivenArrEventType_onlyShallow(arr_eventType_ToDel: ListenerTopicType[]) {
  //   for (const listenerNode of this.gp_listenerNode) {
  //     if (arr_eventType_ToDel.includes(listenerNode.listenerTopicType)) {
  //       if (listenerNode.emt !== this) throw new TypeError();
  //       // FIXMEX need check inside nested one ...
  //       // or maybe just let whole session gone emmm
  //       if (!(this.listeners(listenerNode.listenerTopicType).includes(listenerNode.listener))) throw new TypeError();
  //       this.removeListener_ori(listenerNode.listenerTopicType, listenerNode.listener);
  //       this.gp_listenerNode.delete(listenerNode);
  //     }
  //   }
  // }

  public remove_Listener_ofGivenEventType_allDepth(eventType_ToDel: ListenerTopicType) {
    //  strictMode = true
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      emt_currChild.remove_Listener_ofGivenEventType_allDepth(eventType_ToDel);
    }

    this.remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel);
  }

  // ##

  public remove_AllListeners_allDepth() {
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      emt_currChild.remove_AllListeners_allDepth();
    }
    this.removeAllListeners_ori();
    this.gp_listenerNode.clear();
    this.mpp_emt.clear();
  }

  public remove_AllListeners_beyondIncludeDepth2nd() {
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      emt_currChild.remove_AllListeners_allDepth();
    }
  }

  public remove_Listener_ofGivenSessionId(sessionId_ToDel: string) {
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      if (sessionId_currChild === sessionId_ToDel) {
        emt_currChild.remove_AllListeners_allDepth();
        this.mpp_emt.delete(sessionId_currChild);
      }
    }

    for (const listenerNode of this.gp_listenerNode) {
      if (listenerNode.sessionId) {
        throw new TypeError('Currently the nested structure is not used for more than 2 depth... this class impl is too general for such case, need restruct a finer one');
      }
      if (listenerNode.sessionId === sessionId_ToDel) {
        throw new TypeError('Currently not designed in this way, the sessionid should be unique globally, || if del sessionId, del the whole nest tree, not just inside');

        if (listenerNode.emt !== this) throw new TypeError();
        this.removeListener_ori(listenerNode.listenerTopicType, listenerNode.listener);
        this.gp_listenerNode.delete(listenerNode);
      }
    }
  }

  // ##

  // TODO this should not be exposed
  public remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel: ListenerTopicType, sessionId_Within: string) {
    const emt = this.mpp_emt.get(sessionId_Within);
    if (emt == null) throw new TypeError();
    emt.remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel);
    //
    // welll that cancel unlisten .. that removes the session
    // but the truth is still need
    // its not that it cancel its just transit to next stage
    // @design-dk maybe manually remove session then ...
    // if (emt.gp_listenerNode.size === 0) {
    //   this.mpp_emt.delete(sessionId_Within);
    // }
  }

  // ########

  private get_AllListeners_recursive_helper(arr_AllListeners: ListenerNode[]) {
    for (const listenerNode of this.gp_listenerNode) {
      arr_AllListeners.push(listenerNode);
    }
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      // arr_AllListeners.push(...emt_currChild.get_AllListeners());
      emt_currChild.get_AllListeners_recursive_helper(arr_AllListeners);
    }
  }

  public get_AllListeners() {
    const arr_AllListeners: ListenerNode[] = [];
    this.get_AllListeners_recursive_helper(arr_AllListeners);
    return arr_AllListeners;
  }
}

export class SocketioClientSession_forWebrtcConnection {
  // ####################

  private readonly mpp_emt_WebrtcConnectionAnchorMsgReceiver = new Map<WebrtcConnectionAnchorId, EventEmitterNested_forWebrtcConnection>();

  public get_emt_WebrtcConnectionAnchor(webrtcConnectionAnchorId: WebrtcConnectionAnchorId): EventEmitterNested_forWebrtcConnection {
    const emt = this.mpp_emt_WebrtcConnectionAnchorMsgReceiver.get(webrtcConnectionAnchorId);
    if (emt == null) throw new TypeError();
    return emt;
  }

  public add_emt_WebrtcConnectionAnchor(webrtcConnectionAnchorId: WebrtcConnectionAnchorId) {
    if (this.mpp_emt_WebrtcConnectionAnchorMsgReceiver.has(webrtcConnectionAnchorId)) throw new TypeError();
    this.mpp_emt_WebrtcConnectionAnchorMsgReceiver.set(webrtcConnectionAnchorId, new EventEmitterNested_forWebrtcConnection());
  }

  public remove_emt_WebrtcConnectionAnchor(webrtcConnectionAnchorId: WebrtcConnectionAnchorId) {
    if (!this.mpp_emt_WebrtcConnectionAnchorMsgReceiver.delete(webrtcConnectionAnchorId)) throw new TypeError();
  }

  // ####################

  /**
   * WebSocket to SignalServer
   */
  // triv? seems connected right here
  // just if can achieve sequential step em .
  // const ws = new WebSocket('ws://localhost:8080');
  readonly socket: socketIoClient.Socket;

  constructor() {
    // javascript - How configure reconnecting in socket.io? - Stack Overflow
    // https://stackoverflow.com/questions/11632969/how-configure-reconnecting-in-socket-io
    // Client options | Socket.IO
    // https://socket.io/docs/v4/client-options/#retries
    // javascript - Differences between io() and io.connect() using socket.io - Stack Overflow
    // https://stackoverflow.com/questions/45521544/differences-between-io-and-io-connect-using-socket-io
    // 1. dk why no url provide, maybe later provided
    // 1. retries vs reconnect
    this.socket = socketIoClient.io('http://localhost:3000', {
      // retries: 5,
      // reconnection: true,
      // reconnectionDelay: 1000,
      // reconnectionDelayMax: 5000,
      reconnectionAttempts: 8,
    });
  }

  // FIXME
  // ok if dont want o use global react state -- use ref ... though the checking is a mess now ...
  // // dk no brain but just say check null every where then ok well
  // its import latency vs must use var vs user online offline mode null check
  // @messy // dk brain really
  // talked prop drilling ; scopred import ; messy other dk ways ;
  private _signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId | null = null;
  get signalserverWebsocketClientId_self_sessionReactApp() {
    return this._signalserverWebsocketClientId_self_sessionReactApp;
  }

  async init(userAuth0: auth0React.User | undefined) {
    if (this.status_running) throw new TypeError();
    this.status_running = true;
    // SocketioClientUtil.onOnlyOnce(this.socket, 'connect', () => {
    //   console.log('socketio connected with socket.id :: ' + this.socket.id);
    // });
    //
    // ;M1; // ;moved,archived;   count_signalserverWebsocketClientId_self_shouldOnlyOnce = 0;@¦  // ;moved,archived;   // if that force to ....... // mem ; ss@¦  // ;moved,archived;   // @messy .... so not_sure .... // can promise be null@¦  // ;moved,archived;   // dk the scope of restriction .........@¦  // ;moved,archived;   // async get_signalserverWebsocketClientId_self() { // dont use `new` ... in a function@¦  // ;moved,archived;   readonly promise_signalserverWebsocketClientId_self_sessionReactApp = new Promise<SignalserverWebsocketClientId>((resolve, reject) => {@¦  // ;moved,archived;     // // life would be so much easier , if@¦  // ;moved,archived;     // // 1. the socket instance is the same (and the socket id .. )@¦  // ;moved,archived;     // // 1. I could just send parameter when reconnect -- now need use `auth` not_sure@¦  // ;moved,archived;     // (aga say just need run once ...@¦  // ;moved,archived;     SocketioClientUtil.onOnlyOnce(this.socket, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, (signalserverWebsocketClientId_self: SignalserverWebsocketClientId) => {@¦  // ;moved,archived;       this.count_signalserverWebsocketClientId_self_shouldOnlyOnce++;@¦  // ;moved,archived;       console.log('socketio assigned signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self);@¦  // ;moved,archived;       if (this.count_signalserverWebsocketClientId_self_shouldOnlyOnce > 1) throw new TypeError();@¦  // ;moved,archived;@¦  // ;moved,archived;       this.socket.auth = {@¦  // ;moved,archived;         signalserverWebsocketClientId_self,@¦  // ;moved,archived;       };@¦  // ;moved,archived;@¦  // ;moved,archived;       // for (const [webrtcConnectionAnchorId_self, WebrtcConnectionAnchor] of mpp_webrtcConnectionAnchorId_self_rst) {@¦  // ;moved,archived;       //   // @concurrent issue? dk js async nature@¦  // ;moved,archived;       //   WebrtcConnectionAnchor.webrtcConnectionAnchorLocation_self = new WebrtcConnectionAnchorLocation(socket.id as SignalserverWebsocketClientId, webrtcConnectionAnchorId_self);@¦  // ;moved,archived;       // }@¦  // ;moved,archived;       // reuse socket id on reconnect, socket.io, node.js - Stack Overflow@¦  // ;moved,archived;       // https://stackoverflow.com/questions/18294620/reuse-socket-id-on-reconnect-socket-io-node-js@¦  // ;moved,archived;       //@¦  // ;moved,archived;       // 1. actually I preserved (forgot to change ) the old way of getting id ...@¦  // ;moved,archived;       // 1. callback is only possible in `emit` .. not on connect@¦  // ;moved,archived;       // 1. query & handshake can pass data unidirection to server only ...@¦  // ;moved,archived;       // // dk but the connect event should be queued up so ..@¦  // ;moved,archived;       // set_signalserverWebsocketClientId_self_rst(signalserverWebsocketClientId_self);@¦  // ;moved,archived;@¦  // ;moved,archived;       // use Promise or constructor readonly@¦  // ;moved,archived;       // ((b... feel that move up a lv is more complex@¦  // ;moved,archived;       resolve(signalserverWebsocketClientId_self);@¦  // ;moved,archived;     });@¦  // ;moved,archived;     // do i have to reject?@¦  // ;moved,archived;   });@¦  // ;moved,archived;   // ~~~~// ok.. this is not assigned by client but the server (indeed unchanged)
    // ;M1; this._signalserverWebsocketClientId_self_sessionReactApp = await new Promise<SignalserverWebsocketClientId>((resolve, reject) => {
    // ;M1;   // ;pb[volatile server msg]; seems server msg are volatile -- not queued up... (maybe that only works when disconnect; not connected but not listen ... )
    // ;M1;   // ;pb[volatile server msg]; ppl seems assume the sync & msg will be passed fast... which is not the case https://stackoverflow.com/questions/31897363/socket-io-server-emit-event-before-client-set-up-listener-for-that-event https://stackoverflow.com/questions/77011736/socket-io-communication-between-server-and-client-not-receveing-messages-from
    // ;M1;   // ;pb[volatile server msg]; better not use on connect -- knowlres before said there is no communicate allow on connect
    // ;M1;   // ;pb[volatile server msg]; better just send another msg on init
    // ;M1;   SocketioClientUtil.onOnlyOnce(this.socket, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, (signalserverWebsocketClientId_self: SignalserverWebsocketClientId) => {
    // ;M1;     console.log('socketio assigned signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self);
    // ;M1;     this.socket.auth = {
    // ;M1;       signalserverWebsocketClientId_self,
    // ;M1;     };
    // ;M1;     resolve(signalserverWebsocketClientId_self);
    // ;M1;   });
    // ;M1; });

    // let ackData: AckData;
    // try {
    //   ackData = await this.socket
    //     .timeout(1000) // double timeout check hum..
    //     .emitWithAck(SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, user);
    // } catch (error) {
    //   throw new Error(`the server did not acknowledge the event in the given delay ${1000} :: ` + error);
    // }
    // if (ackData.error) throw ackData.error;
    // this._signalserverWebsocketClientId_self_sessionReactApp = ackData.data as SignalserverWebsocketClientId; // too many zod validation can do idk
    const data = (await SocketioClientUtil.emitWithAckError(this.socket, 1000, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, undefined, userAuth0)) as {
      signalserverWebsocketClientId_self: SignalserverWebsocketClientId;
      userWeb: Record<string, any>;
    };

    this._signalserverWebsocketClientId_self_sessionReactApp = data.signalserverWebsocketClientId_self;
    const userWeb = plainToInstance(UserWeb, data.userWeb);

    const listen_dispatch_webrtcConnectionEvent = () => {
      // for (const eventType in WebrtcConnectionEventType) {
      for (const eventType of Object.values(WebrtcConnectionEventType)) {
        // in not of ...

        this.socket.on(eventType, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
          // TODO validate
          const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
          if (signalserverWebsocketMsg.msgFrom.webrtcConnectionAnchorId == null) throw new TypeError();
          if (signalserverWebsocketMsg.msgTo?.webrtcConnectionAnchorId == null) throw new TypeError();
          const eventEmitterNested = this.mpp_emt_WebrtcConnectionAnchorMsgReceiver.get(signalserverWebsocketMsg.msgTo.webrtcConnectionAnchorId);
          if (eventEmitterNested == null) throw new TypeError();
          eventEmitterNested.emit_custom(eventType, signalserverWebsocketMsg);
        });
      }
    };
    listen_dispatch_webrtcConnectionEvent();

    const socketIo_heartbeat = () => {
      // @need_know desing of these..
      let count_heartbeat = 0;
      this.scheduler_heartbeat = setInterval(() => {
        count_heartbeat++;
        this.socket.volatile.emit(SignalserverWebsocketMsgType.heartbeat, count_heartbeat);
      }, 2000);
    };
    socketIo_heartbeat();

    return userWeb;
  }

  private status_running = false;
  private scheduler_heartbeat: NodeJS.Timeout | null = null;

  async terminate() {
    if (!this.status_running) throw new TypeError();
    this.socket.disconnect();
    if (this.scheduler_heartbeat == null) throw new TypeError();
    clearInterval(this.scheduler_heartbeat);
    this.status_running = false;
    // console.error('not implemented'); // TODO
  }
}
