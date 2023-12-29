import { EventEmitter } from 'events';
                                                                                 
                                                                                                                      

import * as socketIoClient from 'socket.io-client';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { SignalserverWebsocketMsg, SignalserverWebsocketMsgType, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';
import { plainToInstance } from 'class-transformer';
import { UserAuth0Id, UserWeb } from '../../user/UserWeb';
import * as auth0React from '@auth0/auth0-react';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

type ListenerTopicType = WebrtcConnectionEventType;                                

class ListenerNode {
  sessionId: string | null = null;

                                              
  readonly emt: EventEmitterNested_forWebrtcConnection;
  readonly listenerTopicType: ListenerTopicType;
  readonly listener: (...args: any[]) => void | Promise<void>;

  constructor(emt: EventEmitterNested_forWebrtcConnection, listenerTopicType: ListenerTopicType, listener: (...args: any[]) => void | Promise<void>) {
    this.emt = emt;
    this.listenerTopicType = listenerTopicType;
    this.listener = listener;
  }
}

                                                        
                     
                                     
                             
abstract class EventEmitterNested<TyEmt extends EventEmitterNested<TyEmt>> extends EventEmitter {
                                                                        
  protected readonly mpp_emt = new Map<string, TyEmt>();
  protected readonly gp_listenerNode = new Set<ListenerNode>();

                                                                              public emit               = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   
                                                                              public on                 = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   
                                                                              public off                = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   
                                                                              public addListener        = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   
                                                                              public removeListener     = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   
                                                                              public removeAllListeners = (arg: never) => { throw new Error('use the custum one (unless you know the internal design)'); };                   

  protected emit_ori = super.emit;
  protected addListener_ori = super.addListener;
  protected removeListener_ori = super.removeListener;
  protected removeAllListeners_ori = super.removeAllListeners;
}

export class EventEmitterNested_forWebrtcConnection extends EventEmitterNested<EventEmitterNested_forWebrtcConnection> {
                                    
  public create_nested(sessionId: string) {
    if (this.mpp_emt.has(sessionId)) throw new TypeError();
    const emt_child = new EventEmitterNested_forWebrtcConnection();
    this.mpp_emt.set(sessionId, emt_child);
                        
  }

                                                                      
  public emit_custom(eventType_NestedListener: WebrtcConnectionEventType, signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) {
                    
    if (signalserverWebsocketMsg_jsobj.msgFrom == null) throw new TypeError();
    if (signalserverWebsocketMsg_jsobj.msgTo == null) throw new TypeError();

    if (eventType_NestedListener === WebrtcConnectionEventType.offerPlainSignal_Sent) {
                                 
                                                                                    
                                                                                              
                                                     
                                                                                                                                                        
                                                                   
                       

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
                                   
      const eventEmitterNested_forWebrtcConnection = this.mpp_emt.get(sessionIdWithPeer);
      if (eventEmitterNested_forWebrtcConnection == null) throw new TypeError();
      eventEmitterNested_forWebrtcConnection.addListener_ori(eventType_NestedListener, listener);
      eventEmitterNested_forWebrtcConnection.add_Listener_toCleanup(eventType_NestedListener, listener, sessionIdWithPeer);
                                               
    } else {
      throw new TypeError();
    }
                                                    
  }

                 

       

     
                                                                                                                                  
                          
                 
     
                                                       

  private add_Listener_toCleanup(socketio_eventType: ListenerTopicType, socketio_listener: (...args: any[]) => void | Promise<void>, sessionId?: string) {
    const listenerNode = new ListenerNode(this, socketio_eventType, socketio_listener);
    if (sessionId) {
                                                                     
                                          
      listenerNode.sessionId = sessionId;
    }
    this.gp_listenerNode.add(listenerNode);
  }

       

  private remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel: ListenerTopicType) {
    for (const listenerNode of this.gp_listenerNode) {
      if (listenerNode.listenerTopicType === eventType_ToDel) {
        if (listenerNode.emt !== this) throw new TypeError();
        if (this.listeners(listenerNode.listenerTopicType).length === 0) throw new TypeError();
        this.removeListener_ori(listenerNode.listenerTopicType, listenerNode.listener);
        this.gp_listenerNode.delete(listenerNode);
                                        
                                                              
            
                                                                                    
      }
    }
  }

                                                                                                       
                                                         
                                                                            
                                                                
                                                     
                                                       
                                                                                                                        
                                                                                          
                                                     
          
        
      

  public remove_Listener_ofGivenEventType_allDepth(eventType_ToDel: ListenerTopicType) {
                         
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
      emt_currChild.remove_Listener_ofGivenEventType_allDepth(eventType_ToDel);
    }

    this.remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel);
  }

       

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

       

                                    
  public remove_Listener_ofGiven_EventType_inGiven_SessionId_onlyShallow(eventType_ToDel: ListenerTopicType, sessionId_Within: string) {
    const emt = this.mpp_emt.get(sessionId_Within);
    if (emt == null) throw new TypeError();
    emt.remove_Listener_ofGivenEventType_onlyDepth1st(eventType_ToDel);
      
                                                             
                                  
                                                            
                                                        
                                            
                                               
        
  }

             

  private get_AllListeners_recursive_helper(arr_AllListeners: ListenerNode[]) {
    for (const listenerNode of this.gp_listenerNode) {
      arr_AllListeners.push(listenerNode);
    }
    for (const [sessionId_currChild, emt_currChild] of this.mpp_emt) {
                                                                    
      emt_currChild.get_AllListeners_recursive_helper(arr_AllListeners);
    }
  }

  public get_AllListeners() {
    const arr_AllListeners: ListenerNode[] = [];
    this.get_AllListeners_recursive_helper(arr_AllListeners);
    return arr_AllListeners;
  }
}

const VITE_SIGNALSERVER_ADDRESS = import.meta.env.VITE_SIGNALSERVER_ADDRESS as string ?? (() => { throw new TypeError(); })();                   
console.log('VITE_SIGNALSERVER_ADDRESS', VITE_SIGNALSERVER_ADDRESS);

export class SocketioClientSession_forWebrtcConnection {
                         

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

                         

     
                              
     
                                     
                                             
                                                     
  readonly socket: socketIoClient.Socket;

  constructor() {
                                                                             
                                                                                           
                                 
                                                        
                                                                                              
                                                                                                         
                                                     
                              
    this.socket = socketIoClient.io(VITE_SIGNALSERVER_ADDRESS, {
                    
                            
                                 
                                    
      reconnectionAttempts: 8,
    });
  }

          
                                                                                                  
                                                                    
                                                                              
                              
                                                                  
  private _signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId | null = null;
  get signalserverWebsocketClientId_self_sessionReactApp() {
    return this._signalserverWebsocketClientId_self_sessionReactApp;
  }

  async init(userAuth0: auth0React.User | undefined) {
    if (this.status_running) throw new TypeError();
    this.status_running = true;
                                                                    
                                                                               
          
      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                                                                              
                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                     
                                                                               
                                                                                                                                                                                                  
                                                                                                                             
                                    
                                                     
                  
                                                            
                 
               

                            
            
                                    
                                                       
                                                                                               
                        
                                                                                                            
        
                                              
                                                                                                                                                      
    const data = (await SocketioClientUtil.emitWithAckError(this.socket, 1000, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, undefined, userAuth0)) as {
      signalserverWebsocketClientId_self: SignalserverWebsocketClientId;
      userWeb: Record<string, any>;
    };

    this._signalserverWebsocketClientId_self_sessionReactApp = data.signalserverWebsocketClientId_self;
    const userWeb = plainToInstance(UserWeb, data.userWeb);

    const listen_dispatch_webrtcConnectionEvent = () => {
                                                             
      for (const eventType of Object.values(WebrtcConnectionEventType)) {
                        

        this.socket.on(eventType, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
                          
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
                                                
  }
}
