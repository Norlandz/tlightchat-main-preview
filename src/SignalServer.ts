                                  
                                        
                                        
                                      
import './dotenvPreImport';                                                                                    

                                                   
                                        
                                                                                                                                                                                                                                        
import express from 'express';
import cors from 'cors';
import * as socketioServer from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import http from 'http';
import 'reflect-metadata';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEventType,
  WebrtcConnectionEvent,
  SignalserverWebsocketMsgReceiverType,
} from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import {
  WebrtcConnectionAnchorLocation,
  WebrtcConnectionAnchorId,
  SignalserverWebsocketClientId,
  WebrtcConnectionAnchorLocationId,
} from './webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { LobbyUserList, ConnectionAnchorOnlineStatus } from './webrtcVideoCommunication/dataStructure/LobbyUserList';
import dayjs from 'dayjs';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import util from 'util';
import { WebrtcConnectionAnchor } from './webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';
import { arrayRemove } from './util/general/ArrayUtil';
import { UserAuth0Id, UserWeb, UserWebId } from './user/UserWeb';
import { ChatMessageInfo, ChatMsgType } from './webrtcVideoCommunication/messageSchema/ChatMessageInfo';
import * as prismaClientNs from '@prisma/client';
                                                              

import { z } from 'zod';
import * as socketioClient from 'socket.io-client';
import { AckData } from './util/socketio/SocketioUtil';
import * as auth0React from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

                                                
                                              
                       
     
                                                                                                                                                                                                                                                                                          
   
                                                                                     
     
                                                                                          
                                                                                
                                                         
                                              
                                                                                   
             
                                                                                                                                                                                                                                                                                                                                             
           
                                                                                                                                                        
           
                                                                                                                                                                                                                                                                                                                                                                                             
             
                                                                                          
                                                                                      
                                                                                                                                
console.log('>---<');

                                         
                                                       
                                                 
                                                       
                                                         
                                                       
const prisma = new prismaClientNs.PrismaClient();
const app = express();
const server = http.createServer(app);
                                                            
                                       
     
                                                         
     
                                                           
                                       
                                                                                                                                                                 
                                                                                                                                                                
                                         
                                                                        
                                                                               
     
                                                                     
     
                                                                                                         
                                                                                                                        
                                                                              
                                                
                                                                                                                                     
                                                     
     
                     
     
                                                                                         
const ARR_VITE_DOMAIN = JSON.parse(
                                                                                                                
  (process.env.ARR_VITE_DOMAIN) ?? (() => { throw new TypeError(); })()                   
) as string[];
                                                              
                                                                                           
                                                                                                                             
                                     
z.array(z.string().url()).parse(ARR_VITE_DOMAIN);
console.log('ARR_VITE_DOMAIN', ARR_VITE_DOMAIN);
if (process.env.configGuard_dotenvFlow_Overwrite !== 'configGuard_dotenvFlow_Overwrite .env.local') throw new TypeError();
const io = new socketioServer.Server(server, {
  cors: {
                                                                                                                      
    origin: [...ARR_VITE_DOMAIN, 'https://admin.socket.io'],
    credentials: true,
  },
});

     
                      
                                  
     
                                                          
                                                                                                          
app.use(cors({ origin: [...ARR_VITE_DOMAIN] }));

                                                                                                 
                                                                                                                 
  
                                                                                                                                        
                                                                                                                      
     
                              
                                    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

               
const router = express.Router();
app.use('/v1/clientapi', router);

const router_arr_userWeb = express.Router();
router.use('/users', router_arr_userWeb);
const router_arr_chatMessageInfo = express.Router();
router.use('/arr_chatMessageInfo', router_arr_chatMessageInfo);

const schema_UserWeb = z
  .object({
    userWebId: z.string().uuid(),
    userAuth0Id: z.number().nullish(),
    username: z.string(),
    email: z.string().email(),
    creationTime: z.date(),
    lastLoginTime: z.date().nullish(),
    rank: z.number().nullish(),
    det_Anonymous: z.boolean(),
                                                                                  
                                                                                
    seq_debug: z.number().nullish(),
  })
  .strict();

const schema_UserAuth0_dto = z
  .object({
    sub: z.string(),                        
    nickname: z.string(),
    email: z.string().email(),
  })
  .strip();

const schema_ChatMessageInfo_dto = z
  .object({
    uuid: z.string().uuid(),
    creationTime: z.string().datetime(),
                                                         
    msgType: z.nativeEnum(ChatMsgType),
    msgData: z.string(),
                           
    msgFromId: z.string(),
                         
    msgToId: z.string(),
    seq_debug: z.number().nullish(),
  })
  .strict();

const schema_SignalserverWebsocketMsg = z
  .object({
    uuid: z.string().uuid(),
    timeStamp: z.date(),
    msgType: z.nativeEnum(SignalserverWebsocketMsgType),
    msgData: z.unknown(),
                                                                                       
    webrtcConnectionEvent: z.any().optional(),
           
    msgFrom: z.any(),
    msgTo: z.any().nullable(),
    msgReceiverType: z.nativeEnum(SignalserverWebsocketMsgReceiverType).nullable(),
  })
  .strict();

router_arr_userWeb.get('/:username', (req, res, next) => { res.send(req.params.username); });                   

               

     
                           
                                          
                                    
       
     
                                                                
                                                                   
   
                                                                            
  
   
function sockeioErrorHandlerWrapper(listener: (...args: any[]) => Promise<void> | void): (...args: any[]) => Promise<void> {
                                                                                                                                                         
                                                                                                                                  
  return async (...args: any[]) => {
                        
    try {
      await listener(...(args as unknown[]));
    } catch (error) {
      console.error(error);
    }
  };
}

                                                                                                                                                              
                                                                                                                                     
                                                                                       
                                                       
                                           
                                                           
                                                                    
                                                             
                                  
                                                     
                                                        
                                                                                                                   
                                                                                            
                                                                                                                        
       
    
  
                                                                                                                                                                  
                                                                               
    
  
                                                                                                                                                                  
                                                                                                                                          
                                                                      
    

function socketio_on_Common_helper(
  socket: socketioServer.Socket,
  eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType,
                                                                                    
                                                                                                                                                                                 
  listener: (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => Promise<void> | void
) {
  socket.on(eventType, sockeioErrorHandlerWrapper(listener));
}

               
const lobbyUserList = new LobbyUserList();
                   
const mpp_reactSocketioSessionId_vs_socketIoServerSide = new Map<SignalserverWebsocketClientId, socketioServer.Socket>();
const mpp_userWebId_vs_reactSocketioSessionId = new Map<UserWebId, SignalserverWebsocketClientId[]>();

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
function webSocketOnConnection(socket: socketioServer.Socket) {
  count_Connections++;
                                                                       
                                                                           
                                                                       

                                                                      

                                      
                                                                                                  
                               
                                                                                                           
                                                
                                                                          
                                                                                        
               
                                                                
        
              
        

                                                                                                                           
                                                                                              
                                                 
                                                                               
                                                                        
  const signalserverWebsocketClientId_self_existingPriorReconnect = socket.handshake.auth.signalserverWebsocketClientId_self as SignalserverWebsocketClientId | undefined;
  const signalserverWebsocketClientId_self = signalserverWebsocketClientId_self_existingPriorReconnect || (`${dayjs().format('MMDDHHmmssSSS')}_${count_Connections}` as SignalserverWebsocketClientId);

        
  {
    console.log(`io.on('connection', `, socket.id, signalserverWebsocketClientId_self);
    console.log('io.sockets.sockets.size', io.sockets.sockets.size);                                                                                                                             

                                                                                                                                                                                                        
    if (signalserverWebsocketClientId_self_existingPriorReconnect === undefined) {
                                                                                                                               
                                                                                                                                                                                                                                                
                                                                                                                                                                     
                                                                                                                          
                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                
                                                                                                               
                                                                                                                                                                                                     
                                                                                             
                                                                                                                         
                                                                                              
                                                                            
                                                                                                                                                                                                                                          
                                                                            
                                                                                                                                                                     
                                                                            
                                                                                                                                                                     
                                                                         
                                                                                
                                                                         
                                                                                                                
                                                                                                                    
                                                                                                                                               
                                                                                      
                                                                             
                                                                            
                                                                                                               
                                                                            
                                                                                                   
                                                                            
                                                                                                                                
                                                                                                                     
                                                            
                                                                                                               
                                                                              
                                                                      
                                                                                                                               
                                                            
                                                                                                             
                                                                                                                                                                  
                                                                                                                                                         
                                                            
                                                                              
                                                                                                                                                                                 
                                                                                                                                
                                                                                                                   
                                                                                                                                                                              
                                                                      
                                                                                                                                                     
                                                                      

      socket.on(
        SignalserverWebsocketMsgType.signalserverWebsocketClientId_self,
        async (
          userAuth0: auth0React.User | undefined | null,
          ackCallback: (ackData: AckData<{ signalserverWebsocketClientId_self: SignalserverWebsocketClientId; userWeb: Record<string, any> }>) => void
        ) => {
                      
          console.log(`io.on('connection', > ackCallback`, socket.id, signalserverWebsocketClientId_self, userAuth0);

                                             
                                                           
          let userWeb: UserWeb;
          if (userAuth0 == null || userAuth0.sub === undefined) {
                                                                                                                                
            userWeb = new UserWeb(null, 'Anonymous', `Anonymous.${uuidv4()}@example.com`, null, null, true);
            await prisma.userWeb.create({ data: userWeb });
          } else {
                                                                    
                                                                   
            const safeParse = schema_UserAuth0_dto.safeParse(userAuth0);
                 
                         
                                 
                                                                                                         
                   
                                                                                                                
                
                                                                                                     
                           
                                                  
            if (!safeParse.success) return ackCallback({ error: safeParse.error });

                                                                                
            const arr_userWeb = await prisma.userWeb.findMany({ where: { userAuth0Id: userAuth0.sub } });
            if (arr_userWeb.length > 1) {
              throw new TypeError();
            } else if (arr_userWeb.length === 1) {
              userWeb = plainToInstance(UserWeb, arr_userWeb[0]);                        
                                          
            } else {
              userWeb = new UserWeb(userAuth0.sub as UserAuth0Id, userAuth0.nickname ?? `undefined`, userAuth0.email ?? `undefined.${uuidv4()}@example.com`, null, null, false);
              await prisma.userWeb.create({ data: userWeb });
            }
          }
          ackCallback({ data: { signalserverWebsocketClientId_self, userWeb: instanceToPlain(userWeb) } });

                                                  
          lobbyUserList.add_signalserverWebsocketClientId(signalserverWebsocketClientId_self, userWeb);
          io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));

                   
          let arr_signalserverWebsocketClientId_self = mpp_userWebId_vs_reactSocketioSessionId.get(userWeb.userWebId);
          if (arr_signalserverWebsocketClientId_self === undefined) {
            arr_signalserverWebsocketClientId_self = [];
            mpp_userWebId_vs_reactSocketioSessionId.set(userWeb.userWebId, arr_signalserverWebsocketClientId_self);
          }
          arr_signalserverWebsocketClientId_self.push(signalserverWebsocketClientId_self);
        }
      );
    }
                                           
    mpp_reactSocketioSessionId_vs_socketIoServerSide.set(signalserverWebsocketClientId_self, socket);
  }

        
                                                                                                            
  socketio_on_Common_helper(
    socket,
    SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
                                                                                          
      const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj);
      const safeParse = schema_SignalserverWebsocketMsg.safeParse(signalserverWebsocketMsg);
      if (!safeParse.success) {
        ackCallback({ error: safeParse.error });
        return undefined;
      }
      ackCallback({ data: 'signalserverWebsocketMsg_jsobj validated' });
      if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
      lobbyUserList.add_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
      const lobbyUserInfo = lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom);
      lobbyUserInfo.connectionAnchorStatus = ConnectionAnchorOnlineStatus.online;
      lobbyUserInfo.connectionAnchorName = (signalserverWebsocketMsg.msgData as { customName: string }).customName;                             
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    }
  );

  socketio_on_Common_helper(
    socket,
    SignalserverWebsocketMsgType.webrtcConnectionAnchor_Offline,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj);
      const safeParse = schema_SignalserverWebsocketMsg.safeParse(signalserverWebsocketMsg);
      if (!safeParse.success) {
        ackCallback({ error: safeParse.error });
        return undefined;
      }
      ackCallback({ data: 'signalserverWebsocketMsg_jsobj validated' });
      if (signalserverWebsocketMsg.msgTo !== null) throw new TypeError();
                                                                                         
                                                                                                          
                                           
                                                           
      lobbyUserList.remove_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    }
  );

                  
                                                                                                                                                                                                                  
    
                                     
                                                                                                                                                                         

  function socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj: any, ackCallback: (ackData: AckData<string>) => void) {
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    const safeParse = schema_SignalserverWebsocketMsg.safeParse(signalserverWebsocketMsg);
    if (!safeParse.success) {
      ackCallback({ error: safeParse.error });
      return undefined;
    }
    ackCallback({ data: 'signalserverWebsocketMsg_jsobj validated' });
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

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
                                                                                                                          
                                                                                           
  });

  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Accepted,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      console.log('WebrtcConnectionEventType.offerPlainSignal_Accepted', signalserverWebsocketClientId_self);
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
                                                                             
                                    
                            
                                                                                                             
                                                                                                                                                                                                                         
                                                                                                           
                                                                                    
                                    
      if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).connectionAnchorStatus = ConnectionAnchorOnlineStatus.occupied;
      lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).connectionAnchorStatus = ConnectionAnchorOnlineStatus.occupied;
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    }
  );

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerDescription_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    console.log('WebrtcConnectionEventType.offerDescription_Sent', signalserverWebsocketClientId_self);
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
  });

  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      console.log('WebrtcConnectionEventType.offerDescription_Accepted_answerDescription_Sent', signalserverWebsocketClientId_self);
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
    }
  );

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.iceCandidate_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
  });

        
  socketio_on_Common_helper(socket, WebrtcConnectionEventType.webrtcConnection_Closed, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();                                  
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).connectionAnchorStatus = ConnectionAnchorOnlineStatus.online;
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).connectionAnchorStatus = ConnectionAnchorOnlineStatus.online;
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

        
  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Cancelled,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
                                                                                                                                                       
                                                                                                              
    }
  );

        
  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Declined,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
                                                                                                                                                       
                                                                                                              
    }
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

                                                                                                                                                                                                     
                                                                                                                               
                                                                                                           
                                                                                                  
                                                                                                                                                                                        
                                                       
                                                                 
                                                                             
                                                                            
                                     
                                                                              
                                                                                                                                
                              
                                      
                     
              
            
                                
                                                                                                                                                                                    
                                       
                                       
            
          
          
    
                                                                                           
                                            
                                   
                                   
          

                 
                 
                 
                 
                 

  socket.on(SignalserverWebsocketMsgType.chatMessage, async (chatMessageInfo_unknown: unknown, ackCallback: (ackData: AckData<string>) => void) => {
    try {
      const safeParse = schema_ChatMessageInfo_dto.safeParse(chatMessageInfo_unknown);
      if (!safeParse.success) return ackCallback({ error: safeParse.error });
      const chatMessageInfo_parsed = safeParse.data;
                                                                                                  
      const arr_signalserverWebsocketClientId_peer = mpp_userWebId_vs_reactSocketioSessionId.get(chatMessageInfo_parsed.msgToId as UserWebId) ?? (() => { throw new TypeError(); })();                   
      for (const signalserverWebsocketClientId_peer of arr_signalserverWebsocketClientId_peer) {
        const socket_peer = mpp_reactSocketioSessionId_vs_socketIoServerSide.get(signalserverWebsocketClientId_peer) ?? (() => { throw new TypeError(); })();                   
        socket.to(socket_peer.id).emit(SignalserverWebsocketMsgType.chatMessage, chatMessageInfo_parsed);
      }
      ackCallback({ data: 'msg sent' });
      await prisma.chatMessageInfo.create({ data: chatMessageInfo_parsed });
    } catch (error) {
      console.error(error);
    }
  });
}

               

instrument(io, { auth: false });

               

                     
server.listen(3000, () => {
  console.log('App started on port 3000');
});

                                                                                                             
