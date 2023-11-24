                                                   
                                        
                                                                                                                                                                                                                                        
import express from 'express';
import cors from 'cors';
import * as Socketio from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import 'reflect-metadata';
import { SignalserverWebsocketMsgType, SignalserverWebsocketMsg, WebrtcConnectionEventType, WebrtcConnectionEvent } from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorLocation, WebrtcConnectionAnchorId, SignalserverWebsocketClientId } from './webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';
import { LobbyUserList, LobbyUserStatus } from './webrtcVideoCommunication/dataStructure/LobbyUserList';
import dayjs from 'dayjs';
import { instanceToPlain, plainToInstance } from 'class-transformer';

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
      await listener(...args as unknown[]);
    } catch (error) {
      console.error(error);
    }
  };
}

               
const lobbyUserList = new LobbyUserList();
                   
const mpp_reactSocketioSessionId_vs_socketIoServerSide = new Map<SignalserverWebsocketClientId, Socketio.Socket>();

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

        
                                                                                                            
  socket.on(
    SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
                                                                                          
      const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
      if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
      lobbyUserList.add_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.online;
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );
  socket.on(
    SignalserverWebsocketMsgType.webrtcConnectionAnchor_Offline,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
      if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
                                                                                         
                                                                                                          
                                           
                                                           
      lobbyUserList.remove_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );

                  
                                                                                                                                                                                                                  
    
                                     
                                                                                                                                                                         

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

  socket.on(
    WebrtcConnectionEventType.offerPlainSignal_Sent,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                            
                                                                                             
    })
  );

  socket.on(
    WebrtcConnectionEventType.offerPlainSignal_Accepted,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                             
                                    
                            
                                                                                                             
                                                                                                                                                                                                                         
                                                                                                           
                                                                                    
                                    
      if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.occupied;
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).lobbyUserStatus = LobbyUserStatus.occupied;
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );

  socket.on(
    WebrtcConnectionEventType.offerDescription_Sent,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
    })
  );
  socket.on(
    WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
    })
  );
  socket.on(
    WebrtcConnectionEventType.iceCandidate_Sent,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
    })
  );

        
  socket.on(
    WebrtcConnectionEventType.webrtcConnection_Closed,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
      if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.online;
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).lobbyUserStatus = LobbyUserStatus.online;
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );

        
  socket.on(
    WebrtcConnectionEventType.offerPlainSignal_Cancelled,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                                                       
                                                                                                              
    })
  );

        
  socket.on(
    WebrtcConnectionEventType.offerPlainSignal_Declined,
    sockeioErrorHandlerWrapper((signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj);
                                                                                                                                                       
                                                                                                              
    })
  );

        
                                                                                                                                                                                  
                                                                                                                                                                        
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
}

               

instrument(io, { auth: false });

               
const router = express.Router();
app.use('/v1', router);

router.get('/test/users/:username', (req, res, next) => { res.send(req.params.username); });                   
                             
                                                  
                                                                       
                                                                         
                     
      
  

                     
server.listen(3000, () => {
  console.log('App started on port 3000');
});

                                                                                                             
