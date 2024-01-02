### Introduction

Real time video & text communication.

1. go to https://tlightchat.netlify.app
   - (if the Server in https://tlightchat.netlify.app is down, \
      use offline mode in https://tlightchat-offline.netlify.app \
      or https://norlandz.github.io/tlightchat-main-preview/dist/index.html )
2. go to `WebrtcVideoCommunication` in nav bar
3. wait for SignalServer respond
4. wait for page `https://tlightchat.netlify.app/WebrtcVideoCommunication` fully loaded
5. follow instruction on `WebrtcVideoCommunication` -- choose a Peer to Connect with

### Demo image

- ![TLightChat demo - 20231227_170152C ](https://github.com/Norlandz/tlightchat-main-preview/assets/43581880/211d2e8c-2ad6-470d-81a0-1e5492099bad)

- https://github.com/Norlandz/tlightchat-main-preview/assets/43581880/a648a74c-b45a-42d2-b299-bd5560e1f72b


### Internal design

// todo (i will go brief on this, since i went some detailed on the other project, but was not worth it)

#### techstack / servers

- WebRtc -- P2P video connection
- Xstate -- state management
- Websocket (/ Socketio) -- send events
- React -- frontend Ui
- SignalServer -- backend Server
- Aws -- host for the Services
- Netlify -- domain name & reverse proxy

#### main design

\-- \--

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\dataStructure\WebrtcConnectionAnchor.ts`

  central data structure (/ model)

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\WebrtcConnectionService.ts`

  central service (-- app logic; webrtc connection; state management; event dispatch;)

\--

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\panel\WebrtcConnectionAnchorGridPanel.tsx`

  central panel for video connection 

  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\panel\VideoConnectionControlPanel.tsx`

  central panel for video connection control

\-- \--

- `H:\Using\TLightChat\tlightchat-main\src\SignalServer.ts`

  SignalServer

\-- \--

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication`

  main folder for webrtcVideoCommunication

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\xstate`

  state machine 

- `H:\Using\TLightChat\tlightchat-main\src\session\AppSession.ts` \
  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\service\EventEmitterNested_forWebrtcConnection.ts` \
  `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\App_WebrtcVideoCommunication_connectToServer.tsx`

  session management

- `H:\Using\TLightChat\tlightchat-main\src\webrtcVideoCommunication\redux`

  redux

#### demo image design -- state machine; class uml;

- ![tlightchat xstate 20231124_0230_11488](https://github.com/Norlandz/tlightchat-main-preview/assets/43581880/1cef95c9-1af3-420b-80ac-4410a7473b5f)
  <img src="https://github.com/Norlandz/tlightchat-main-preview/assets/43581880/3eed77d7-8525-432a-8387-7870e68cbcc8" alt="tlightchat xstate 20231227_161601C P2" style="width: 500px;">
  <img src="https://github.com/Norlandz/tlightchat-main-preview/assets/43581880/a4c9ff49-523f-4162-baff-d6c5ea8662af" alt="tlightchat xstate 20231227_161601C P1" style="width: 500px;">

- 

### Problems facing

#### Domain name & Websocket 

- domain name is "borrowed" from Netlify (I have no money to buy a domain name) \
  //repeat: Aws is the actual place where all the Services are hosted \
  //repeat: Netlify serves as a reverse proxy
- since Im using a reverse proxy, there is an issue with the Websocket 

#### Security 

- **do not post any important information** on the Chat -- this is insecure, though it appears to be https (+ some other things) \
  (the database may be destroyed when server is down)

### Note

- this is an experimental project

#### Auth0 SignUp
you can create a Test account to signup in Auth0 \
__(the database may be destroyed when server is down) \
or just stay in Anonymous mode 


### Version & Update
...
