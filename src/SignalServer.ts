                                                   
                                        
                                                                                                                                                                                                                                        
import express from 'express';
import cors from 'cors';
import * as Socketio from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import 'reflect-metadata';
import { SignalserverWebsocketMsgType, SignalserverWebsocketMsg, WebrtcConnectionEventType, WebrtcConnectionEvent } from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import {
  WebrtcConnectionAnchorLocation,
  WebrtcConnectionAnchorId,
  SignalserverWebsocketClientId,
  WebrtcConnectionAnchorLocationId,
} from './webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { LobbyUserList, LobbyUserStatus } from './webrtcVideoCommunication/dataStructure/LobbyUserList';
import dayjs from 'dayjs';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import util from 'util';
import { WebrtcConnectionAnchor } from './webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';
import { arrayRemove } from './util/general/ArrayUtil';

console.log('>---<');

const app = express();
const server = http.createServer(app);
                                                            
                                       
     
                                                         
     
                                                           
                                       
                                                                                                                                                                 
                                                                                                                                                                
                                         
                                                                        
const io = new Socketio.Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://admin.socket.io'],
    credentials: true,
  },
});

     
                      
                                  
     
                                                          
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));

                                                                                                 
                                                                                                                 
  
                                                                                                                                        
                                                                                                                      
     
                              
                                    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

               

     
                           
                                          
                                    
       
     
                                                                
                                                                   
   
                                                                            
  
   
function sockeioErrorHandlerWrapper(listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
                                                                                                                                  
  return async (...args: any[]) => {
                        
    try {
      await listener(...(args as unknown[]));
    } catch (error) {
      console.error(error);
    }
  };
}
function sockeioAckWrapper(eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
                                                                                                                                  
                                                                                    
  return async (...args_withAckCallback: any[]) => {
                                        
                                                        
                                                                 
    const args_normal = args_withAckCallback.slice(0, -1);
                               
    await listener(...(args_normal as unknown[]));
                                                     
    const ackCallback = args_withAckCallback[args_withAckCallback.length - 1] as (serverAckMsg: string) => void;
                                                                                         
    ackCallback(`serverAckMsg: eventType: ${eventType}, args_normal: ${util.inspect(args_normal, false, 1, false)}`);
  };
}

function socketioCommonWrapper(eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
  return sockeioErrorHandlerWrapper(sockeioAckWrapper(eventType, listener));
}
function socketio_on_Common_helper(socket: Socketio.Socket, eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)) {
  socket.on(eventType, socketioCommonWrapper(eventType, listener));
}

               
const lobbyUserList = new LobbyUserList();
                   
const mpp_reactSocketioSessionId_vs_socketIoServerSide = new Map<SignalserverWebsocketClientId, Socketio.Socket>();

const mpp_webrtcConnectionAnchor_Waiting = new Map<WebrtcConnectionAnchorLocationId, WaitingInfo>();
const mpp_webrtcConnectionAnchor_Left = new Map<WebrtcConnectionAnchorLocationId, void>();
class WaitingInfo {
  constructor(
    public readonly arr_WaitFor_Tot: readonly WebrtcConnectionAnchorLocationId[],
    public readonly ackCallback: (serverAckMsg: string) => void,
    public readonly arr_WaitFor_Rest: WebrtcConnectionAnchorLocationId[]
  ) {}
}

let count_Connections = 0;
io.on('connection', webSocketOnConnection);
function webSocketOnConnection(socket: Socketio.Socket) {
  count_Connections++;
                                                                       
                                                                           
                                                                       

                                                                      

                                      
                                                                                                  
                               
                                                                                                           
                                                
                                                                          
                                                                                        
               
                                                                
        
              
        

                                                                                                                           
                                                                                              
                                                 
                                                                               
                                                                        
  const signalserverWebsocketClientId_self_existingPriorReconnect = socket.handshake.auth.signalserverWebsocketClientId_self as SignalserverWebsocketClientId | undefined;
  const signalserverWebsocketClientId_self = signalserverWebsocketClientId_self_existingPriorReconnect || (`${dayjs().format('MMDDHHmmssSSS')}_${count_Connections}` as SignalserverWebsocketClientId);

        
  {
    console.log(`io.on('connection', `, socket.id, signalserverWebsocketClientId_self);
    console.log('io.sockets.sockets.size', io.sockets.sockets.size);                                                                                                                             

                                                                                                                                                                                                        
    if (signalserverWebsocketClientId_self_existingPriorReconnect === undefined) {
      socket.emit(SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, signalserverWebsocketClientId_self);
      mpp_reactSocketioSessionId_vs_socketIoServerSide.set(signalserverWebsocketClientId_self, socket);
    }

                                            
    lobbyUserList.add_signalserverWebsocketClientId(signalserverWebsocketClientId_self);
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  }

        
                                                                                                            
  socketio_on_Common_helper(socket, SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
                                                                                        
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
    lobbyUserList.add_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
    const lobbyUserInfo = lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom);
    lobbyUserInfo.lobbyUserStatus = LobbyUserStatus.online;
    lobbyUserInfo.customName = signalserverWebsocketMsg.msgData.customName as string;                                   
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

  socketio_on_Common_helper(socket, SignalserverWebsocketMsgType.webrtcConnectionAnchor_Offline, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
                                                                                       
                                                                                                        
                                         
                                                         
    lobbyUserList.remove_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

                  
                                                                                                                                                                                                                  
    
                                     
                                                                                                                                                                         

  function socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj: any) {
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    if (signalserverWebsocketMsg.msgTo == null) throw new TypeError();
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    if (signalserverWebsocketMsg.webrtcConnectionEvent == null) throw new TypeError();

    function get_socketPeerId(signalserverWebsocketClientId: SignalserverWebsocketClientId) {
      const socket_peer = mpp_reactSocketioSessionId_vs_socketIoServerSide.get(signalserverWebsocketClientId);
      if (socket_peer === null || socket_peer === undefined) throw new TypeError();
      return socket_peer.id;
    }
                                                                                         
                                                                                                 
                                                                                                                                
        
                                                                                               
                                                                                                       
                                                                                                                                
        
                                                                                                         
                                                                                                                 
                                                                                                                                
        
    socket.to(get_socketPeerId(signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId)).emit(signalserverWebsocketMsg.webrtcConnectionEvent.eventType, signalserverWebsocketMsg);
                                                                                                                                                                                                           
                                                                                                                                                                                                
    return signalserverWebsocketMsg;
  }

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                          
                                                                                           
  });

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Accepted, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    console.log('WebrtcConnectionEventType.offerPlainSignal_Accepted', signalserverWebsocketClientId_self);
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                           
                                  
                          
                                                                                                           
                                                                                                                                                                                                                       
                                                                                                         
                                                                                  
                                  
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.occupied;
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).lobbyUserStatus = LobbyUserStatus.occupied;
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerDescription_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    console.log('WebrtcConnectionEventType.offerDescription_Sent', signalserverWebsocketClientId_self);
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
  });

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    console.log('WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent', signalserverWebsocketClientId_self);
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
  });

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.iceCandidate_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
  });

        
  socketio_on_Common_helper(socket, WebrtcConnectionEventType.webrtcConnection_Closed, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.online;
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).lobbyUserStatus = LobbyUserStatus.online;
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

        
  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Cancelled, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                                                     
                                                                                                            
  });

        
  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Declined, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                                                     
                                                                                                            
  });

        
                                                                                                                                                                                  
                                                                                                                                                                        
  socket.on(
    'disconnect',
    sockeioErrorHandlerWrapper((reason) => {
      console.log(`socket.on('disconnect', `, signalserverWebsocketClientId_self, reason);

                                                                                                                             

                                                        
      lobbyUserList.remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self);
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );

        
  socket.on(SignalserverWebsocketMsgType.heartbeat, (count_heartbeat: number) => {});
  socket.on(SignalserverWebsocketMsgType.testMessage, (data) => console.log(data));

        
  socket.on(SignalserverWebsocketMsgType.waitForOtherIns_FinishTestCheck_ThenLeave, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback_input: (serverAckMsg: string) => void) => {
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    const webrtcConnectionAnchorId_input = signalserverWebsocketMsg.msgFrom.toStringId();
    const arr_WaitFor_input = signalserverWebsocketMsg.msgData as WebrtcConnectionAnchorLocationId[];

                         
    {
      for (const [webrtcConnectionAnchor_Waiting, waitingInfo] of mpp_webrtcConnectionAnchor_Waiting.entries()) {
                                                                          
                                                                         

        arrayRemove(waitingInfo.arr_WaitFor_Rest, webrtcConnectionAnchorId_input);
        if (waitingInfo.arr_WaitFor_Rest.length === 0) {
          const serverAckMsg = 'Wait done';
          waitingInfo.ackCallback(serverAckMsg);

          mpp_webrtcConnectionAnchor_Waiting.delete(webrtcConnectionAnchorId_input);
          mpp_webrtcConnectionAnchor_Left.set(webrtcConnectionAnchorId_input);
        }
      }
    }

                
    {
      const arr_WaitFor_Tot = [...arr_WaitFor_input];
      const arr_WaitFor_Rest = [...arr_WaitFor_input];
      const waitingInfo_input = new WaitingInfo(arr_WaitFor_Tot, ackCallback_input, arr_WaitFor_Rest);

      for (const webrtcConnectionAnchor_Waiting of mpp_webrtcConnectionAnchor_Waiting.keys()) {
        arrayRemove(arr_WaitFor_Rest, webrtcConnectionAnchor_Waiting);
        if (arr_WaitFor_Rest.length === 0) {
          break;
        }
      }

      for (const webrtcConnectionAnchor_Left of mpp_webrtcConnectionAnchor_Left.keys()) {
        arrayRemove(arr_WaitFor_Rest, webrtcConnectionAnchor_Left);
        if (arr_WaitFor_Rest.length === 0) {
          break;
        }
      }

      if (arr_WaitFor_Rest.length === 0) {
        const serverAckMsg = 'Wait done';
        ackCallback_input(serverAckMsg);

        mpp_webrtcConnectionAnchor_Left.set(webrtcConnectionAnchorId_input);
      } else {
        mpp_webrtcConnectionAnchor_Waiting.set(webrtcConnectionAnchorId_input, waitingInfo_input);
      }
    }
  });

                                                                                                                                                                                                     
                                                                                                                               
                                                                                                           
                                                                                                  
                                                                                                                                                                                        
                                                       
                                                                 
                                                                             
                                                                            
                                     
                                                                              
                                                                                                                                
                              
                                      
                     
              
            
                                
                                                                                                                                                                                    
                                       
                                       
            
          
          
    
                                                                                           
                                            
                                   
                                   
          
}

               

instrument(io, { auth: false });

               
const router = express.Router();
app.use('/v1', router);

router.get('/test/users/:username', (req, res, next) => { res.send(req.params.username); });                   
                             
                                                  
                                                                       
                                                                         
                     
      
  

                     
server.listen(3000, () => {
  console.log('App started on port 3000');
});

                                                                                                             
