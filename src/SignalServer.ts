// // import dotenv from 'dotenv';
// import dotenvFlow from 'dotenv-flow';
// // dotenv.config({ override: true });
// dotenvFlow.config({ debug: true });
import './dotenvPreImport'; // ... must this ... before everything // could be the prisma env( init that too.. 

// import WebSocket, { WebSocketServer } from 'ws';
// import bodyParser from 'body-parser';
// no_idea import { AllButLast, DecorateAcknowledgements, DecorateAcknowledgementsWithMultipleResponses, DefaultEventsMap, EventNames, EventParams, EventsMap, FirstArg, Last, StrictEventEmitter } from "@socket.io/dist/typed-events";
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
// import { default as prismaClientNs } from '@prisma/client';

import { z } from 'zod';
import * as socketioClient from 'socket.io-client';
import { AckData } from './util/socketio/SocketioUtil';
import * as auth0React from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

// How to deploy express.js on Netlify - YouTube
// https://www.youtube.com/watch?v=hQAu0YEIF0g
// netlify-lambda emmmm
// []
// Netlify hosting is for the Jamstack, as they say, i.e. only static files, no processing on the server. The idea is to make use of other mechanisms to get your data dynamically, such as APIs hosted elsewhere, which you query straight from the browser, or when you build your site.
// 
// Most likely you actually had to deploy your express.js app as a Netlify Function, 
// <>
// https://stackoverflow.com/questions/59868667/how-to-deploy-express-js-server-to-netlify
// ~~~// always say need confirmation ... and this just wel.. thought server em 
// not_sure some say other can or separate dkdk but suck 
// Host a dynamic website for free? : r/webdev
// https://www.reddit.com/r/webdev/comments/key11k/host_a_dynamic_website_for_free/
// ;learn; []
// ;learn; There are frameworks that bundle all this together for you, but since you are asking about them separately I’m going to assume that you have a SPA react app (like those that used to be created by Create React Application), and a Node.js backend likely using express. Let me know if I got either of these assumptions wrong.
// ;learn; 
// ;learn; If the above is true, you likely develop running two servers, but your front end has a “build step” defined which will produce static assets.
// ;learn; 
// ;learn; If all of the above is true, then all that is needed to be done is have the backend “build” script defined in package.json to invoke the front end build script (as well as any backend build processes should you be using something like typescript). And for the output of the front-end build script to be placed where the express server will serve this content statically.
// ;learn; <>
// ;learn; https://community.fly.io/t/deploying-react-js-front-end-w-node-js-backend/15345
// ;learn; feels this hack : "build": "concurrently \"pnpm sigs\" \"pnpm vite:build\""
//   ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
// just del and reinstall the lock file (not vite, dk ts or ..
// []
// 12:15:05 AM: $ pnpm run vite:build
// 12:15:05 AM: > tlightchat-main@0.0.0 vite:build /opt/build/repo
// 12:15:05 AM: > tsc && vite build
// 12:15:09 AM: __mocks__/RTCPeerConnection.ts(46,3): error TS2416: Property "createAnswer" in type "RTCPeerConnectionMock" is not assignable to the same property in base type "RTCPeerConnection".
// <>
// https://app.netlify.com/sites/precious-mermaid-f619e3/deploys/658d042e06910f6d8d48d08f
console.log('>---<');

// ;sqlite; Prisma Crash Course - YouTube
// ;sqlite; https://www.youtube.com/watch?v=CYH04BJzamo
// ;sqlite; Node JS SQLite Crash Course - YouTube
// ;sqlite; https://www.youtube.com/watch?v=ZRYn6tgnEgM
// ;sqlite; Sql.js - full SQLite in the browser - YouTube
// ;sqlite; https://www.youtube.com/watch?v=0DZ472GiVNw
const prisma = new prismaClientNs.PrismaClient();
const app = express();
const server = http.createServer(app);
// js call `require('XXX')()` as a function? what it means??
// ... dk that admin ui, just cant?????
// []
// It seems you are missing the `credentials: true` part:
// <>
// https://github.com/socketio/socket.io-admin-ui/issues/35
// dk why that is hosted by others? ...
// const io = require('socket.io')(3000, { cors: { origin: ['http://localhost:5173', 'http://localhost:5174', 'https://admin.socket.io'] } }) as socketIo.Server;
// const io = new socketIo.Server(3000, { cors: { origin: ['http://localhost:5173', 'http://localhost:5174', 'https://admin.socket.io'] } }) as socketIo.Server;
// 1. aga 127.0.0.1 cant, must localhost,
// 1. seems only need here (the pb was app listen not express listen ..)
// @que: should i change host file vs change .env for production domain name in
// []
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
// <>
// node.js - How do you load environment variables from .env and .env.local with dotenv? - Stack Overflow
// https://stackoverflow.com/questions/68731242/how-do-you-load-environment-variables-from-env-and-env-local-with-dotenv
// possible to use .env.local to override .env? · Issue #738 · motdotla/dotenv
// https://github.com/motdotla/dotenv/issues/738
// kerimdzhanov/dotenv-flow: Loads environment variables from .env.[development|test|production][.local] files for Node.js® projects.
// https://github.com/kerimdzhanov/dotenv-flow#readme
// []
// { override: true }
// <>
// https://stackoverflow.com/questions/65407397/dotenv-unable-to-overwrite-key-value-pair
const ARR_VITE_DOMAIN = JSON.parse(
  // (import.meta.env.VITE_ARR_VITE_DOMAIN as string) ?? (() => { throw new TypeError(); })() // prettier-ignore
  (process.env.ARR_VITE_DOMAIN) ?? (() => { throw new TypeError(); })() // prettier-ignore
) as string[];
// if (!Array.isArray(ARR_VITE_DOMAIN)) throw new TypeError();
// ;no parsing syntax are diff...; const ARR_VITE_DOMAIN = z.array(z.string().url()).parse(
// ;no parsing syntax are diff...;   (process.env.ARR_VITE_DOMAIN) ?? (() => { throw new TypeError(); })() // prettier-ignore
// ;no parsing syntax are diff...; );
z.array(z.string().url()).parse(ARR_VITE_DOMAIN);
console.log('ARR_VITE_DOMAIN', ARR_VITE_DOMAIN);
if (process.env.configGuard_dotenvFlow_Overwrite !== 'configGuard_dotenvFlow_Overwrite .env.local') throw new TypeError();
const io = new socketioServer.Server(server, {
  cors: {
    // origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://admin.socket.io'],
    origin: [...ARR_VITE_DOMAIN, 'https://admin.socket.io'],
    credentials: true,
  },
});

// []
// var corsOptions = {
//   origin: 'http://example.com',
// <>
// https://expressjs.com/en/resources/middleware/cors.html
// app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'] }));
app.use(cors({ origin: [...ARR_VITE_DOMAIN] }));

// node.js - express throws error as `body-parser deprecated undefined extended` - Stack Overflow
// https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
//
// node.js - What is the meaning of "bodyParser.urlencoded({ extended: true }))" and "bodyParser.json()" in Express.js? - Stack Overflow
// https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
// ..
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ############
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
    // arr_chatMessageInfo_SentFromSelf: z.array(ChatMessageInfoSchema).nullish(),
    // arr_chatMessageInfo_SentToSelf: z.array(ChatMessageInfoSchema).nullish(),
    seq_debug: z.number().nullish(),
  })
  .strict();

const schema_UserAuth0_dto = z
  .object({
    sub: z.string(), // .uuid() not uuid ...
    nickname: z.string(),
    email: z.string().email(),
  })
  .strip();

const schema_ChatMessageInfo_dto = z
  .object({
    uuid: z.string().uuid(),
    creationTime: z.string().datetime(),
    // msgType: z.nativeEnum(prismaClientNs.ChatMsgType),
    msgType: z.nativeEnum(ChatMsgType),
    msgData: z.string(),
    // msgFrom: z.string(),
    msgFromId: z.string(),
    // msgTo: z.string(),
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
    // webrtcConnectionEvent: z.undefined().nullable().or(WebrtcConnectionEventSchema),
    webrtcConnectionEvent: z.any().optional(),
    // TODO
    msgFrom: z.any(),
    msgTo: z.any().nullable(),
    msgReceiverType: z.nativeEnum(SignalserverWebsocketMsgReceiverType).nullable(),
  })
  .strict();

router_arr_userWeb.get('/:username', (req, res, next) => { res.send(req.params.username); }); // prettier-ignore

// ############

// []
// // server or client side
// socket.on("hello", errorHandler(() => {
//   throw new Error("let's panic");
// }));
// <>
// https://socket.io/docs/v4/listening-to-events/#error-handling
// ~~~// aga dk why Expressjs those can throw Error in other thread
/**
 * make sure the server doesnt fail with error on processing socket requests
 *
 */
function sockeioErrorHandlerWrapper(listener: (...args: any[]) => Promise<void> | void): (...args: any[]) => Promise<void> {
  // function sockeioErrorHandlerWrapper(listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
  // function sockeioErrorHandlerWrapper<T extends Promise<void> | void>(listener: (...args: any[]) => T): (...args: any[]) => T {
  return async (...args: any[]) => {
    // console.log(args)
    try {
      await listener(...(args as unknown[]));
    } catch (error) {
      console.error(error);
    }
  };
}

// function sockeioAckWrapper(eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
//   // function sockeioErrorHandlerWrapper<T extends Promise<void> | void>(listener: (...args: any[]) => T): (...args: any[]) => T {
//   // return async (...args: any[], ackCallback: (serverAckMsg: string) => void) => {
//   return async (...args_withAckCallback: any[]) => {
//     // console.log(args_withAckCallback)
//     // console.log(JSON.stringify(args_withAckCallback))
//     // console.log(args_withAckCallback[0].webrtcConnectionEvent)
//     const args_normal = args_withAckCallback.slice(0, -1);
//     // console.log(args_normal)
//     await listener(...(args_normal as unknown[]));
//     // @unsafe ... but its socketio es implementation
//     const ackCallback = args_withAckCallback[args_withAckCallback.length - 1] as (serverAckMsg: string) => void;
//     // ackCallback(`serverAckMsg: received args_normal: ${JSON.stringify(args_normal)}`);
//     ackCallback(`serverAckMsg: eventType: ${eventType}, args_normal: ${util.inspect(args_normal, false, 1, false)}`);
//   };
// }
//
// function socketioCommonWrapper(eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)): (...args: any[]) => Promise<void> {
//   return sockeioErrorHandlerWrapper(sockeioAckWrapper(eventType, listener));
// }
//
// function socketio_on_Common_helper(socket: SocketioServer.Socket, eventType: any, listener: ((...args: any[]) => Promise<void>) | ((...args: any[]) => void)) {
// // function socketio_on_Common_helper(socket: SocketioServer.Socket, eventType: any, ackCallback: (ackData: AckData<string>) => void) {
//   socket.on(eventType, socketioCommonWrapper(eventType, listener));
// }

function socketio_on_Common_helper(
  socket: socketioServer.Socket,
  eventType: SignalserverWebsocketMsgType | WebrtcConnectionEventType,
  // @ts-ignore .. really hate lib that abuse the use of spread operator & arg order
  // listener: ((...args: any[], ackCallback: (ackData: AckData<string>) => void) => Promise<void>) | ((...args: any[], ackCallback: (ackData: AckData<string>) => void) => void)
  listener: (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => Promise<void> | void
) {
  socket.on(eventType, sockeioErrorHandlerWrapper(listener));
}

// ############
const lobbyUserList = new LobbyUserList();
/** onetoone_map */
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
  // @test-learn: const gp_ExistingSocket = new Set<socketIo.Socket>();
  // @test-learn: if (gp_ExistingSocket.has(socket)) throw new TypeError();
  // @test-learn: >> the instance & id are both changed after reconnect

  // btw was saying use .once() ; but this new instance wont even work

  // #>> signalserverWebsocketClientId
  // @knowlres-main: https://socket.io/get-started/private-messaging-part-2/#persistent-session-id
  // io.use((socket, next) => {
  //   const signalserverWebsocketClientId_self = socket.handshake.auth.signalserverWebsocketClientId_self;
  //   if (signalserverWebsocketClientId_self) {
  //     // @think // const session = sessionStore.findSession(sessionID);
  //     socket.signalserverWebsocketClientId_self = signalserverWebsocketClientId_self;
  //   } else {
  //     socket.signalserverWebsocketClientId_self = randomId();
  //   }
  //   next();
  // });

  // ;[solve reconnect another id pb]; a session ID, private, which will be used to authenticate the user upon reconnection
  // ;[solve reconnect another id pb]; https://socket.io/get-started/private-messaging-part-2/
  // was thinking the socket instance, but nah ..
  // actually the use of this inner func has access to the constant reference h
  // rip me seems i forgot the socket.id was the default room number ...
  const signalserverWebsocketClientId_self_existingPriorReconnect = socket.handshake.auth.signalserverWebsocketClientId_self as SignalserverWebsocketClientId | undefined;
  const signalserverWebsocketClientId_self = signalserverWebsocketClientId_self_existingPriorReconnect || (`${dayjs().format('MMDDHHmmssSSS')}_${count_Connections}` as SignalserverWebsocketClientId);

  // #>>
  {
    console.log(`io.on('connection', `, socket.id, signalserverWebsocketClientId_self);
    console.log('io.sockets.sockets.size', io.sockets.sockets.size); // (async () => console.log('io.fetchSockets().length', (await io.fetchSockets()).length))(); // ( aga saysay those async [[

    // this runs on first connection -- server sends back the signalserverWebsocketClientId_self to client; -- does not run on reconnect where client alreayd has the signalserverWebsocketClientId_self
    if (signalserverWebsocketClientId_self_existingPriorReconnect === undefined) {
      // ;M1; socket.emit(SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, signalserverWebsocketClientId_self);
      // ;bk; ;user should be created in server, not client;       socket.on(SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, (user_jsobj: UserWeb, ackCallback: (ackData: AckData<SignalserverWebsocketClientId>) => void) => {
      // ;bk; ;user should be created in server, not client;         console.log(`io.on('connection', > ackCallback`, socket.id, signalserverWebsocketClientId_self);
      // ;bk; ;user should be created in server, not client;         const userWeb = plainToInstance(UserWeb, user_jsobj);
      // ;bk; ;user should be created in server, not client;         // aga the schema bt classtransformer & zod  are diff ... may need to do twice after receive ..
      // ;bk; ;user should be created in server, not client;         // {issues: Array(1), name: 'ZodError'} issues :  Array(1) 0 :  code :  "invalid_type" expected :  "object" message :  "Expected object, received array" path :  [] received :  "array" [[Prototype]] :  Object length :  1
      // ;bk; ;user should be created in server, not client;         // console.log(Array.isArray(user_jsobj));
      // ;bk; ;user should be created in server, not client;         // console.log(user_jsobj); // thought was classtransformer pb ; & dk why didnt error ; not jsut this , and now this input is em
      // ;bk; ;user should be created in server, not client;         // console.log(userWeb);
      // ;bk; ;user should be created in server, not client;         const safeParse = schema_UserWeb.safeParse(userWeb);
      // ;bk; ;user should be created in server, not client;         if (!safeParse.success) {
      // ;bk; ;user should be created in server, not client;           // []
      // ;bk; ;user should be created in server, not client;           // `socket.io` data is serialized as `JSON`, which can only represent plain objects. You will need to serialize any errors into a recognizable plain-object format,
      // ;bk; ;user should be created in server, not client;           // <>
      // ;bk; ;user should be created in server, not client;           // https://stackoverflow.com/questions/20915608/how-to-pass-error-object-to-socket-io-callback
      // ;bk; ;user should be created in server, not client;           // []
      // ;bk; ;user should be created in server, not client;           // Errors passed to middleware callbacks are sent as special connect_error packets to clients.
      // ;bk; ;user should be created in server, not client;           //
      // ;bk; ;user should be created in server, not client;           // Server
      // ;bk; ;user should be created in server, not client;           //
      // ;bk; ;user should be created in server, not client;           // io.of("/chat").use((socket, next) => {
      // ;bk; ;user should be created in server, not client;           //   const err = new Error("not authorized");
      // ;bk; ;user should be created in server, not client;           //   err.data = { content: "Please retry later" }; // additional details
      // ;bk; ;user should be created in server, not client;           //   next(err);
      // ;bk; ;user should be created in server, not client;           // });
      // ;bk; ;user should be created in server, not client;           // <>
      // ;bk; ;user should be created in server, not client;           // https://socket.io/docs/v4/server-api/
      // ;bk; ;user should be created in server, not client;           // []
      // ;bk; ;user should be created in server, not client;           //     res(null, 'Success');
      // ;bk; ;user should be created in server, not client;           // <>
      // ;bk; ;user should be created in server, not client;           // https://socketcluster.io/docs/14.4.2/handling-failure/
      // ;bk; ;user should be created in server, not client;           // how to validate the ackCallback though ....
      // ;bk; ;user should be created in server, not client;
      // ;bk; ;user should be created in server, not client;           ackCallback({ error: safeParse.error });
      // ;bk; ;user should be created in server, not client;           return;
      // ;bk; ;user should be created in server, not client;         }
      // ;bk; ;user should be created in server, not client;         ackCallback({ data: signalserverWebsocketClientId_self });
      // ;bk; ;user should be created in server, not client;
      // ;bk; ;user should be created in server, not client;         // #>> signalserverWebsocketClientId All
      // ;bk; ;user should be created in server, not client;         lobbyUserList.add_signalserverWebsocketClientId(signalserverWebsocketClientId_self, userWeb);
      // ;bk; ;user should be created in server, not client;         io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
      // ;bk; ;user should be created in server, not client;
      // ;bk; ;user should be created in server, not client;         // @messy
      // ;bk; ;user should be created in server, not client;         let arr_signalserverWebsocketClientId_self = mpp_userWebId_vs_reactSocketioSessionId.get(userWeb.userWebId);
      // ;bk; ;user should be created in server, not client;         if (arr_signalserverWebsocketClientId_self === undefined) {
      // ;bk; ;user should be created in server, not client;           arr_signalserverWebsocketClientId_self = [];
      // ;bk; ;user should be created in server, not client;           mpp_userWebId_vs_reactSocketioSessionId.set(userWeb.userWebId, arr_signalserverWebsocketClientId_self);
      // ;bk; ;user should be created in server, not client;         }
      // ;bk; ;user should be created in server, not client;         arr_signalserverWebsocketClientId_self.push(signalserverWebsocketClientId_self);
      // ;bk; ;user should be created in server, not client;       });

      socket.on(
        SignalserverWebsocketMsgType.signalserverWebsocketClientId_self,
        async (
          userAuth0: auth0React.User | undefined | null,
          ackCallback: (ackData: AckData<{ signalserverWebsocketClientId_self: SignalserverWebsocketClientId; userWeb: Record<string, any> }>) => void
        ) => {
          // TODO user
          console.log(`io.on('connection', > ackCallback`, socket.id, signalserverWebsocketClientId_self, userAuth0);

          // ?? passed undefined become null?
          // let userWeb: UserWeb | prismaClientNs.UserWeb;
          let userWeb: UserWeb;
          if (userAuth0 == null || userAuth0.sub === undefined) {
            // must be anonymous -- at current stage -- every non-anonymous user must have an auth0 id, and should be unique ...
            userWeb = new UserWeb(null, 'Anonymous', `Anonymous.${uuidv4()}@example.com`, null, null, true);
            await prisma.userWeb.create({ data: userWeb });
          } else {
            // const userWeb = plainToInstance(UserWeb, user_jsobj);
            // const safeParse = schema_UserWeb.safeParse(userWeb);
            const safeParse = schema_UserAuth0_dto.safeParse(userAuth0);
            //  z
            //   .union([
            //     z.undefined(),
            //     z.object({ sub: z.string().uuid(), nickname: z.string(), email: z.string().email() }),
            //   ])
            // z.optional(z.object({ sub: z.string().uuid(), nickname: z.string(), email: z.string().email() }))
            // z
            //   .object({ sub: z.string().uuid(), nickname: z.string(), email: z.string().email() })
            //   .nullish()
            // ??? no_knowlres deal with undefined
            if (!safeParse.success) return ackCallback({ error: safeParse.error });

            // find userAuth0Id, if not found, create // remember to migrate ...
            const arr_userWeb = await prisma.userWeb.findMany({ where: { userAuth0Id: userAuth0.sub } });
            if (arr_userWeb.length > 1) {
              throw new TypeError();
            } else if (arr_userWeb.length === 1) {
              userWeb = plainToInstance(UserWeb, arr_userWeb[0]); // @need_check not_sure
              // userWeb = arr_userWeb[0];
            } else {
              userWeb = new UserWeb(userAuth0.sub as UserAuth0Id, userAuth0.nickname ?? `undefined`, userAuth0.email ?? `undefined.${uuidv4()}@example.com`, null, null, false);
              await prisma.userWeb.create({ data: userWeb });
            }
          }
          ackCallback({ data: { signalserverWebsocketClientId_self, userWeb: instanceToPlain(userWeb) } });

          // #>> signalserverWebsocketClientId All
          lobbyUserList.add_signalserverWebsocketClientId(signalserverWebsocketClientId_self, userWeb);
          io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));

          // @messy
          let arr_signalserverWebsocketClientId_self = mpp_userWebId_vs_reactSocketioSessionId.get(userWeb.userWebId);
          if (arr_signalserverWebsocketClientId_self === undefined) {
            arr_signalserverWebsocketClientId_self = [];
            mpp_userWebId_vs_reactSocketioSessionId.set(userWeb.userWebId, arr_signalserverWebsocketClientId_self);
          }
          arr_signalserverWebsocketClientId_self.push(signalserverWebsocketClientId_self);
        }
      );
    }
    // @todo @need_check this only run once
    mpp_reactSocketioSessionId_vs_socketIoServerSide.set(signalserverWebsocketClientId_self, socket);
  }

  // #>>
  // the page cannot render when this is not dispatched from socketio server?... should local work though em
  socketio_on_Common_helper(
    socket,
    SignalserverWebsocketMsgType.webrtcConnectionAnchor_Online,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      // ~~~~// for the sake of type safe -- ClassTransformer. for all the message .......
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
      lobbyUserInfo.connectionAnchorName = (signalserverWebsocketMsg.msgData as { customName: string }).customName; // the date need know & type
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
      // remove webrtcConnectionAnchorId of that signalserverWebsocketClientId in the map
      // // when close only the opponent is updated ..... // del that need both remove in signal server em
      // set status no need cuz its gone ..
      // TODO @pb[error handle without stopping the server]
      lobbyUserList.remove_webrtcConnectionAnchorId(signalserverWebsocketMsg.msgFrom);
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    }
  );

  // #>> @delegate
  // @: feels that channel will call to self? ... // no // (btw, why , didnt i already knew at that time,, referring `on`?  well y bit -- cuz the send & receive use same Event name ... (though did know the `to`
  //
  // @: for loop // @knowlres: SE ...
  // @: for (const event of [SignalserverWebsocketMsgType.answerDescription, SignalserverWebsocketMsgType.iceCandidate, SignalserverWebsocketMsgType.offerDescription]) {

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
    // console.log(signalserverWebsocketMsg.msgTo.__typeDiscriminatorForClassTransformer)
    // if (signalserverWebsocketMsg.msgTo.__typeDiscriminatorForClassTransformer === undefined) {
    //   // throw new TypeError('Someone pass in a jsobj but pretended to be a Class... -- classtransformer will fail on this');
    // }
    // console.log(signalserverWebsocketMsg_jsobj.msgTo.__typeDiscriminatorForClassTransformer)
    // if (signalserverWebsocketMsg_jsobj.msgTo.__typeDiscriminatorForClassTransformer === undefined) {
    //   // throw new TypeError('Someone pass in a jsobj but pretended to be a Class... -- classtransformer will fail on this');
    // }
    // console.log(JSON.stringify(signalserverWebsocketMsg).msgTo.__typeDiscriminatorForClassTransformer)
    // if (JSON.stringify(signalserverWebsocketMsg).msgTo.__typeDiscriminatorForClassTransformer === undefined) {
    //   // throw new TypeError('Someone pass in a jsobj but pretended to be a Class... -- classtransformer will fail on this');
    // }
    socket.to(get_socketPeerId(signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId)).emit(signalserverWebsocketMsg.webrtcConnectionEvent.eventType, signalserverWebsocketMsg);
    // socket.to(get_socketPeerId(signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId)).emit(signalserverWebsocketMsg.webrtcConnectionEvent.eventType, instanceToPlain(signalserverWebsocketMsg));
    // socket.to(get_socketPeerId(signalserverWebsocketMsg.msgTo.signalserverWebsocketClientId)).emit(signalserverWebsocketMsg.webrtcConnectionEvent.eventType, signalserverWebsocketMsg_jsobj);
    return signalserverWebsocketMsg;
  }

  socketio_on_Common_helper(socket, WebrtcConnectionEventType.offerPlainSignal_Sent, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
    // TODO lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.available;
    // io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Accepted,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      console.log('WebrtcConnectionEventType.offerPlainSignal_Accepted', signalserverWebsocketClientId_self);
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
      // once sent offer / accept offer, the availablility should be gray out
      // TODO lag & concurrent thing
      // TODO history result
      // well so that said need status .... // and said that needed a complex structure of msg passing em ...
      // well said flatted cannot deal with Map ..., but circular dep // classTransformer cannot nested map , but can simple circular dep , // if define structure -- not `Top Lv Map` , that can actually convert easily
      // wasnt able to test my pull request, cuz flatted didnt transfrom the Map, so dont know my test case
      // no, Socket still too complex to put in .. so ... // well aga desing & [[ ..
      // dk those use reflection ...
      if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError(); // @duplicate_code-repeated_check
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

  // #>>
  socketio_on_Common_helper(socket, WebrtcConnectionEventType.webrtcConnection_Closed, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
    const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
    if (signalserverWebsocketMsg === undefined) return;
    if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError(); // @duplicate_code-repeated_check
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).connectionAnchorStatus = ConnectionAnchorOnlineStatus.online;
    lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgTo).connectionAnchorStatus = ConnectionAnchorOnlineStatus.online;
    io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
  });

  // #>>
  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Cancelled,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
      // lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.available; // for now should not necessary
      // io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
    }
  );

  // #>>
  socketio_on_Common_helper(
    socket,
    WebrtcConnectionEventType.offerPlainSignal_Declined,
    (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (ackData: AckData<string>) => void) => {
      const signalserverWebsocketMsg = socketEmit_PeerLoc_serverSideRedelegate_helper(signalserverWebsocketMsg_jsobj, ackCallback);
      if (signalserverWebsocketMsg === undefined) return;
      // lobbyUserList.get_lobbyUserInfo(signalserverWebsocketMsg.msgFrom).lobbyUserStatus = LobbyUserStatus.available; // for now should not necessary
      // io.emit(SignalserverWebsocketMsgType.lobbyUserList, ClassTransformer.instanceToPlain(lobbyUserList));
    }
  );

  // #>>
  // *   `reason` [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) the reason of the disconnection (either client or server-side)
  // socket.on('close', () => { // seems like never have a close event?...  // Synonym of [socket.disconnect()](https://socket.io/docs/v4/client-api/#socketdisconnect).
  socket.on(
    'disconnect',
    sockeioErrorHandlerWrapper((reason) => {
      console.log(`socket.on('disconnect', `, signalserverWebsocketClientId_self, reason);

      // TODO reconnect should restore the connectionPoint id list though ... // nah id is fixed now // em do need restore em

      // remove signalserverWebsocketClientId in the map
      lobbyUserList.remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self);
      io.emit(SignalserverWebsocketMsgType.lobbyUserList, instanceToPlain(lobbyUserList));
    })
  );

  // #>>
  socket.on(SignalserverWebsocketMsgType.heartbeat, (count_heartbeat: number) => {});
  socket.on(SignalserverWebsocketMsgType.testMessage, (data) => console.log(data));

  // #>>
  socket.on(SignalserverWebsocketMsgType.waitForOtherIns_FinishTestCheck_ThenLeave, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback_input: (serverAckMsg: string) => void) => {
    const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
    const webrtcConnectionAnchorId_input = signalserverWebsocketMsg.msgFrom.toStringId();
    const arr_WaitFor_input = signalserverWebsocketMsg.msgData as WebrtcConnectionAnchorLocationId[];

    // #>>> others before
    {
      for (const [webrtcConnectionAnchor_Waiting, waitingInfo] of mpp_webrtcConnectionAnchor_Waiting.entries()) {
        // TODO check this is correct ( messy trivial design anyways ... )
        // recheck for each player es waiting list // @performnace_pb ...

        arrayRemove(waitingInfo.arr_WaitFor_Rest, webrtcConnectionAnchorId_input);
        if (waitingInfo.arr_WaitFor_Rest.length === 0) {
          const serverAckMsg = 'Wait done';
          waitingInfo.ackCallback(serverAckMsg);

          mpp_webrtcConnectionAnchor_Waiting.delete(webrtcConnectionAnchorId_input);
          mpp_webrtcConnectionAnchor_Left.set(webrtcConnectionAnchorId_input);
        }
      }
    }

    // #>>> self
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

  //   socket.on(SignalserverWebsocketMsgType.waitForOtherIns_FinishTestCheck_ThenLeave, (signalserverWebsocketMsg_jsobj: SignalserverWebsocketMsg, ackCallback: (serverAckMsg: string) => void) => {
  //     const signalserverWebsocketMsg = plainToInstance(SignalserverWebsocketMsg, signalserverWebsocketMsg_jsobj as unknown);
  //     arr_webrtcConnectionAnchorLocation_Waiting.push(JSON.stringify(signalserverWebsocketMsg.msgFrom));
  //     const arr_WaitFor = signalserverWebsocketMsg.msgData as WebrtcConnectionAnchorLocation[];
  //     console.log(`Player: ${JSON.stringify(signalserverWebsocketMsg.msgFrom)} is waiting for ${JSON.stringify(arr_WaitFor)}`); // cuz concurrent receive? one is empty at that time?
  //     arr_arr_EachPlayerIsWaitFor.push(arr_WaitFor);
  //     for (const arr_WaitFor of arr_arr_EachPlayerIsWaitFor) {
  //       // TODO check this is correct ( messy trivial design anyways ... )
  //       // recheck for each player es waiting list // @performnace_pb ...
  //       let det_IncludeAll = true;
  //       for (const webrtcConnectionAnchorLocation_WaitFor of arr_WaitFor) {
  //         if (!arr_webrtcConnectionAnchorLocation_Waiting.includes(JSON.stringify(webrtcConnectionAnchorLocation_WaitFor))) {
  //           // keep waiting
  //           det_IncludeAll = false;
  //           break;
  //         }
  //       }
  //       if (det_IncludeAll) {
  //         const serverAckMsg = 'Wait done. These players are waiting / left -- arr_webrtcConnectionAnchorLocation_Waiting: ' + '\n' + arr_webrtcConnectionAnchorLocation_Waiting;
  //         console.log(serverAckMsg);
  //         ackCallback(serverAckMsg);
  //       }
  //     }
  //   });
  //
  //   socket.on('topicAA', (msg: string, ackCallback: (serverAckMsg: string) => void) => {
  //     const serverAckMsg = 'aaaa ' + msg;
  //     console.log(serverAckMsg);
  //     ackCallback(serverAckMsg);
  //   });

  // ############
  // ############
  // ############
  // ############
  // ############

  socket.on(SignalserverWebsocketMsgType.chatMessage, async (chatMessageInfo_unknown: unknown, ackCallback: (ackData: AckData<string>) => void) => {
    try {
      const safeParse = schema_ChatMessageInfo_dto.safeParse(chatMessageInfo_unknown);
      if (!safeParse.success) return ackCallback({ error: safeParse.error });
      const chatMessageInfo_parsed = safeParse.data;
      // aga those performance think & if only use lobbyUserList ?.. & var nameing & redundant var
      const arr_signalserverWebsocketClientId_peer = mpp_userWebId_vs_reactSocketioSessionId.get(chatMessageInfo_parsed.msgToId as UserWebId) ?? (() => { throw new TypeError(); })(); // prettier-ignore
      for (const signalserverWebsocketClientId_peer of arr_signalserverWebsocketClientId_peer) {
        const socket_peer = mpp_reactSocketioSessionId_vs_socketIoServerSide.get(signalserverWebsocketClientId_peer) ?? (() => { throw new TypeError(); })(); // prettier-ignore
        socket.to(socket_peer.id).emit(SignalserverWebsocketMsgType.chatMessage, chatMessageInfo_parsed);
      }
      ackCallback({ data: 'msg sent' });
      await prisma.chatMessageInfo.create({ data: chatMessageInfo_parsed });
    } catch (error) {
      console.error(error);
    }
  });
}

// ############

instrument(io, { auth: false });

// ############

// not app listen ...
server.listen(3000, () => {
  console.log('App started on port 3000');
});

// @que-old dk why the server just breaks  // but those react wont -- cuz browser event handler diff thread ?
