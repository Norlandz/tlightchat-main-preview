                                                   
import express from 'express';
                                        
import cors from 'cors';
import * as socketIo from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import * as ClassTransformer from 'class-transformer';
import 'reflect-metadata';
                                                                                                                                                                                                                                        

                                       
                               

import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionPointLocation,
  WebrtcConnectionPointId,
  SignalserverWebsocketClientId,
  WebrtcConnectionEventType,
  WebrtcConnectionEvent,
} from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import moment from 'moment';
import { LobbyUserList, LobbyUserStatus } from './webrtcVideoCommunication/dataStructure/LobbyUserList';

console.log('>---<');

const app = express();
const server = http.createServer(app);
                                                            
                                       
     
                                                         
     
                                                           
                                       
                                                                                                                                                                 
                                                                                                                                                                
                                         
                                                                        
const io = new socketIo.Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://admin.socket.io'],
    credentials: true,
  },
});

     
                      
                                  
     
                                                          
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));

                                                                                                 
                                                                                                                 
  
                                                                                                                                        
                                                                                                                      
     
                              
                                    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

                                                                                                                           
                                                                                                                                   
const lobbyUserList = new LobbyUserList();
                   
const mpp_reactSocketioSessionId_vs_socketIoServerSide = new Map<SignalserverWebsocketClientId, socketIo.Socket>();
                                                        

let count_Connections = 0;
io.on('connection', webSocketOnConnection);
function webSocketOnConnection(socket: socketIo.Socket) {
  count_Connections++;
                                                              
                                   
                                             

                                                                      

                                      
                                                                                                  
                               
                                                                                                           
                                                
                                                                          
                                                                                        
               
                                                                
        
              
        

                                                                                                                           
                                                                                              
                                                 
                                                                               
                                                                        
  const signalserverWebsocketClientId_self_existingPriorReconnect = socket.handshake.auth.signalserverWebsocketClientId_self as SignalserverWebsocketClientId | undefined;
  const signalserverWebsocketClientId_self = signalserverWebsocketClientId_self_existingPriorReconnect || (`${moment().format('MMDDHHmmssSSS')}_${count_Connections}` as SignalserverWebsocketClientId);
  console.log(`io.on('connection', `, socket.id, signalserverWebsocketClientId_self);
  console.log('io.sockets.sockets.size', io.sockets.sockets.size);                                                                                                                             

  if (signalserverWebsocketClientId_self_existingPriorReconnect === undefined) {
    socket.emit(SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, signalserverWebsocketClientId_self);
    mpp_reactSocketioSessionId_vs_socketIoServerSide.set(signalserverWebsocketClientId_self, socket);
  }

  function get_socketPeerId(signalserverWebsocketClientId: SignalserverWebsocketClientId) {
    const socket_peer = mpp_reactSocketioSessionId_vs_socketIoServerSide.get(signalserverWebsocketClientId);
    if (socket_peer === null || socket_peer === undefined) throw new TypeError();
    return socket_peer.id;
  }

                                          
                                                                                                                       
  lobbyUserList.add_signalserverWebsocketClientId(signalserverWebsocketClientId_self);

                                                                                                            
  socket.on(WebrtcConnectionEventType.connectionCreatedSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
                                                                                                                                     
    const webrtcConnectionEvent = webrtcConnectionEvent_jsobj;
                                                                                       
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();
                                                                                                                                         
                                                                                            
                                                                                                                                                                                                                                                        
                                                                                                                            
    lobbyUserList.add_webrtcConnectionPointId(webrtcConnectionEvent.msg.msgFrom);
    lobbyUserList.get_lobbyUserInfo(webrtcConnectionEvent.msg.msgFrom).lobbyUserStatus = LobbyUserStatus.available;

                                                                                                                                                                       
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
                                                                                                                          
                                                                                         
                                                                     
  });

                  
                                                                                                                                                                                                               
                                  
                                                                                                                                                                      

  socket.on(WebrtcConnectionEventType.offerSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);
                                                                                                       
                                                                                                                      
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
  });

  socket.on(WebrtcConnectionEventType.answerSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                                      
    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);

                                                                           
                                  
                          
                                                                                                           
                                                                                                                                                                                                                       
                                                                                                         
                                                                                  
                                  
                                                                                                         
    lobbyUserList.get_lobbyUserInfo(webrtcConnectionEvent.msg.msgFrom).lobbyUserStatus = LobbyUserStatus.occupied;
    lobbyUserList.get_lobbyUserInfo(webrtcConnectionEvent.msg.msgTo!).lobbyUserStatus = LobbyUserStatus.occupied;
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
  });

  socket.on(SignalserverWebsocketMsgType.iceCandidate, (signalserverWebsocketMsg: SignalserverWebsocketMsg) => {
    socket.to(get_socketPeerId(signalserverWebsocketMsg.msgTo!.signalserverWebsocketClientId)).emit(SignalserverWebsocketMsgType.iceCandidate, signalserverWebsocketMsg);
  });

        
  socket.on(WebrtcConnectionEventType.closeSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();

                                                                                                                                                               
    io.emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);

                                                                                      
                                                                                                        
                                         
                                                                                                                                
    lobbyUserList.remove_webrtcConnectionPointId(webrtcConnectionEvent.msg.msgFrom);
    if (webrtcConnectionEvent.msg.msgTo !== null) {
                                                                                                                                  
      lobbyUserList.remove_webrtcConnectionPointId(webrtcConnectionEvent.msg.msgTo);
    }

    io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
  });

        
  socket.on(WebrtcConnectionEventType.cancelSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();

    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);

                                                                                                                                                      
                                                                                                            
  });

        
  socket.on(WebrtcConnectionEventType.declineSent, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();

    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);

                                                                                                                                                      
                                                                                                            
  });

        
                                                                                                                                                                                  
                                                                                                                                                                        
  socket.on('disconnect', (reason) => {
    console.log(`socket.on('disconnect', `, signalserverWebsocketClientId_self, reason);

                                                                                                                           

                                                      
    lobbyUserList.remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self);
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
  });

        
  socket.on(SignalserverWebsocketMsgType.heartbeat, (count_heartbeat: number) => {});
  socket.on(SignalserverWebsocketMsgType.testMessage, (data) => console.log(data));

                                             

        
  socket.on(WebrtcConnectionEventType.offerSentPlain, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();
    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(webrtcConnectionEvent.eventType, webrtcConnectionEvent);
  });

  socket.on(WebrtcConnectionEventType.oneTimeSessionMailbox, (eventSessionMailboxId: string, webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
    if (webrtcConnectionEvent.msg.msgFrom.signalserverWebsocketClientId !== signalserverWebsocketClientId_self) throw new TypeError();
    console.log(eventSessionMailboxId)
    if (eventSessionMailboxId == null) throw new TypeError();
    socket.to(get_socketPeerId(webrtcConnectionEvent.msg.msgTo!.signalserverWebsocketClientId)).emit(eventSessionMailboxId, webrtcConnectionEvent);
  });
}

               

instrument(io, { auth: false });

               
const router = express.Router();
app.use('/v1', router);

router.get('/test/users/:username', (req, res, next) => { res.send(req.params.username); });                   
                             
                                                  
                                                                       
                                                                         
                     
      
  

                     
server.listen(3000, () => {
  console.log('App started on port 3000');
});
