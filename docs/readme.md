### Introduction

Real time video & text communication.

1. go to tlightchat.netlify.app
   - (if the Server in https://tlightchat.netlify.app is down, 
      use offline mode in https://tlightchat-offline.netlify.app
      or https://norlandz.github.io/tlightchat-main-preview/dist/index.html )
2. go to `WebrtcVideoCommunication` in nav bar
3. wait for SignalServer respond
4. wait for `WebrtcVideoCommunication` fully loaded
5. follow instruction on `WebrtcVideoCommunication` -- choose a Peer to Connect with

### Demo image




### Internal design

// todo (i will go brief on this, since i went some detailed on the other project, but was not worth it)

#### techstack / servers

- Vite -- frontend Ui 
- WebRtc -- P2P video connection
- Xstate -- state management & event dispatch
- SignalServer -- backend Server -- uses Websocket
- Aws -- host for the Services
- Netlify -- domain name & reverse proxy

#### main design

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\dataStructure\WebrtcConnectionAnchor.ts`

  central data structure (/ model)

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\WebrtcConnectionService.ts`

  central service (-- app logic; webrtc connection; state management; event dispatch;)

\--

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\panel\WebrtcConnectionAnchorGridPanel.tsx`

  central panel for video connection 

  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\panel\VideoConnectionControlPanel.tsx`

  central panel for video connection control

\--
\--

- `H:\Using\TLightChat\tlightchat-main\src\SignalServer.ts`

  SignalServer

\--
\--

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication`

  main folder for webrtcVideoCommunication

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\xstate`

  state machine 

- `H:\Using\TLightChat\tlightchat-main\src\session\AppSession.ts`
  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\EventEmitterNested_forWebrtcConnection.ts`
  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\App_WebrtcVideoCommunication_connectToServer.tsx`

  session management

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\redux`

  redux

#### demo image design -- state machine; class uml;



### Problems facing

#### Domain name & Websocket 

- domain name is "borrowed" from Netlify (I have no money to buy a domain name)
  //repeat: Aws is the actual place where all the Services are hosted 
  //repeat: Netlify serves as a reverse proxy
- since Im using a reverse proxy, there is a issue with the Websocket 

#### Security 

- this is an experimental project
- do not post any important information on the Chat -- this is insecure, though it appears to be https 
  (the database may be destroyed when server is down)