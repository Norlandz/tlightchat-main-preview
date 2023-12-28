// import '../src/mainPreImport';
// import { signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../main';
import { App_WebrtcVideoCommunication_semantic } from '../webrtcVideoCommunication/App_WebrtcVideoCommunication_semantic';

import * as React from 'react';
import { SignalserverWebsocketClientId } from '../webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { AppSessionRef } from '../session/AppSession';
import { WaitTooLongException } from '../exception/WaitTooLongException';
import { useAuth0 } from '@auth0/auth0-react';
import { UserAuth0Id, UserWeb } from '../user/UserWeb';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0_debugDomain } from '../utilComponent/auth0/useAuth0_debugDomain';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';

// ;; // let firstRun_firstLogin_messy = true;
// ;; // let signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId | null = null;
// ;;
// ;; let isAuthenticated_ignoreIsLoading: boolean | null = null;
// ;; let justRunThisOnce_onStartup_onLoginChange_DontRerunOnUnmouunt_ReactRouterAlwaysUnmount = false;
// ;;
// ;; function App_WebrtcVideoCommunication_connectToServer_L() {
// ;;   const [_forceUpdate, set_signalserverWebsocketClientId_self_sessionReactApp] = React.useState<SignalserverWebsocketClientId | null>(null);
// ;;   // const [signalserverWebsocketClientId_self_sessionReactApp_forceUpdate, set_signalserverWebsocketClientId_self_sessionReactApp] = React.useState<SignalserverWebsocketClientId | null>(signalserverWebsocketClientId_self_sessionReactApp);
// ;;
// ;;   // []
// ;;   // Unfortunately this is not supported at this time. Feature: Allow multiple custom domains for the same tenant Description: Currently auth0 only allows one custom domain.
// ;;   // <>
// ;;   // https://www.google.ca/search?q=auth0+allow+multiple+domain&newwindow=1&sca_esv=592409533&sxsrf=AM9HkKlq8EQV4YY1ySEvTp1MV47HMJu39Q%3A1703046787921&ei=g26CZY3hN_20ptQPhKuj6AQ&ved=0ahUKEwjNrtHWl52DAxV9mokEHYTVCE0Q4dUDCBA&uact=5&oq=auth0+allow+multiple+domain&gs_lp=Egxnd3Mtd2l6LXNlcnAiG2F1dGgwIGFsbG93IG11bHRpcGxlIGRvbWFpbjIFECEYoAFIqB9QAFjtGHAAeAGQAQCYAWKgAcULqgECMjG4AQPIAQD4AQHCAggQABiABBjLAcICBBAAGB7CAgYQABgIGB7CAggQABiABBiiBMICBxAhGKABGAriAwQYACBBiAYB&sclient=gws-wiz-serp
// ;;
// ;;   // // 1. maybe check inside the smaller component
// ;;   // // 1. can use the same React App, no need reload the socket for Anony vs Login User
// ;;   const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();
// ;;   // // 1. say the detect of prev anon, if now login then reload
// ;;   // // better just reload aall , logout cleanup all
// ;;   // // dk other miss
// ;;   // console.log('>> isAuthenticated ::', isAuthenticated, 'isLoading ::', isLoading);
// ;;   if (isLoading) {
// ;;     // eslint-disable-next-line no-self-assign
// ;;     isAuthenticated_ignoreIsLoading = isAuthenticated_ignoreIsLoading;
// ;;   } else {
// ;;     isAuthenticated_ignoreIsLoading = isAuthenticated;
// ;;   }
// ;;
// ;;   //
// ;;   // 1. home
// ;;   // 1. webcam
// ;;   // 1. anony
// ;;   // 1. all Redux , initRun setup
// ;;   // 1. Login
// ;;   // ????
// ;;   // refresh -> auto anony
// ;;   // self rebuilt -> suck
// ;;   // manual login ...
// ;;   // session design vs other idfk
// ;;   //
// ;;   // in Anony -> Login -> need clear old shit -> refresh -> am i login? & auto anony
// ;;   //
// ;;   // eithre manual login ; or my brain cant tihnk  idk , cant deal with manual session reset too stupid in js  ;
// ;;   // now saying the better desing... yeah manullsession .... the pb is just the js side ......
// ;;   // just saying the type assertion is forcing to use local var instead of global var session access.. dk good bad still ...
// ;;
// ;;   React.useEffect(() => {
// ;;     console.log('>> useEffect connect to Server > isAuthenticated ::', isAuthenticated, 'isLoading ::', isLoading, 'isAuthenticated_ignoreIsLoading ::', isAuthenticated_ignoreIsLoading); // indeed executed twice ; isAuthenticated false first time, even if the User should be in cached session
// ;;     if (isAuthenticated_ignoreIsLoading === null) return;
// ;;     if (isLoading) throw new TypeError();
// ;;     // unmount & then later is Authenticated make this run again... aga need stop the unmount...
// ;;     if (justRunThisOnce_onStartup_onLoginChange_DontRerunOnUnmouunt_ReactRouterAlwaysUnmount) return;
// ;;     justRunThisOnce_onStartup_onLoginChange_DontRerunOnUnmouunt_ReactRouterAlwaysUnmount = true;
// ;;     // FIXME
// ;;     // its not just here, the component inside will execute things too...
// ;;     // really need a way to remove those useEffect -- let the user default action be on the outside ..
// ;;     async function setup_socketio() {
// ;;       if (AppSessionRef.appSession.hasUserSession) {
// ;;         await AppSessionRef.appSession.terminate_CurrUserSession();
// ;;       }
// ;;       // ReactDOM.flushSync(() => {
// ;;       try {
// ;;         let userWeb;
// ;;         if (!isAuthenticated) {
// ;;           userWeb = new UserWeb(uuidv4(), 'Anonymous', true);
// ;;         } else {
// ;;           if (user == null) throw new TypeError();
// ;;           if (user.sub == null) throw new TypeError(); // idk  https://stackoverflow.com/questions/66654820/how-to-get-users-id-from-auth0-in-react
// ;;           if (user.nickname == null) throw new TypeError();
// ;;           userWeb = new UserWeb(user.sub, user.nickname);
// ;;         }
// ;;         // TODO why that is gone now everythign em
// ;;
// ;;         await AppSessionRef.appSession.init_NewUserSession(1000, userWeb);
// ;;
// ;;         const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection;
// ;;         if (socketioClientSession_forWebrtcConnection == null) throw new TypeError();
// ;;         const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp;
// ;;         if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new TypeError();
// ;;         set_signalserverWebsocketClientId_self_sessionReactApp(signalserverWebsocketClientId_self_sessionReactApp); // aga multi await on same Promise is fine
// ;;         console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self_sessionReactApp);
// ;;       } catch (error) {
// ;;         if (!(error instanceof WaitTooLongException)) throw error;
// ;;         console.error(error);
// ;;       }
// ;;     }
// ;;     void setup_socketio();
// ;;   }, [isAuthenticated_ignoreIsLoading]);
// ;;   // yeah this check ignores the local browser session ... so will always go with Anonymous // wait no
// ;;   // actually the login seems reload whole page.. makes this has no point?...
// ;;   // lag pb too ...
// ;;   // }, [isAuthenticated]); not good -- this unmount mount will exec the thing aga ...
// ;;
// ;;   // reactjs - React Router avoid unmounting - Stack Overflow
// ;;   // https://stackoverflow.com/questions/50697741/react-router-avoid-unmounting
// ;;   //
// ;;   // why React-Router destroy component instead of just hide it · Issue #4988 · remix-run/react-router
// ;;   // https://github.com/remix-run/react-router/issues/4988
// ;;
// ;;   if (error) return <div>{error.message}</div>;
// ;;   if (isLoading) return <div>Loading ...</div>;
// ;;   // if (!isAuthenticated) return <div>Not authenticated</div>;
// ;;   // if (user == null) throw new TypeError();
// ;;
// ;;   const errMsg =
// ;;     'this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer.' +
// ;;     '\n// currently await is used by force before <App /> renders -- this component will only execute when signalserverWebsocketClientId_self_sessionReactApp is assigned, so you shouldnt see this line ';
// ;;
// ;;   if (!AppSessionRef.appSession.hasUserSession) {
// ;;     return (
// ;;       <>
// ;;         <div>TODO some button to trigger ; or just wait </div>
// ;;       </>
// ;;     );
// ;;   } else {
// ;;     const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection;
// ;;     if (socketioClientSession_forWebrtcConnection == null) throw new TypeError();
// ;;     const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp;
// ;;     if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new TypeError();
// ;;     const reduxStore = AppSessionRef.appSession.reduxStore;
// ;;     if (reduxStore == null) throw new TypeError();
// ;;
// ;;     return (
// ;;       <>
// ;;         <h2>Video Connection with Webrtc</h2>
// ;;         <App_WebrtcVideoCommunication_semantic
// ;;           signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
// ;;           socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
// ;;           reduxStore={reduxStore}
// ;;           // isAuthenticated={isAuthenticated}
// ;;         />
// ;;       </>
// ;;     );
// ;;   }
// ;; }

// @pb[login data load - refresh vs manual session] 1. home
// @pb[login data load - refresh vs manual session] 1. webcam
// @pb[login data load - refresh vs manual session] 1. anony
// @pb[login data load - refresh vs manual session] 1. all Redux , initRun setup
// @pb[login data load - refresh vs manual session] 1. Login
// @pb[login data load - refresh vs manual session] ????
// @pb[login data load - refresh vs manual session] refresh -> auto anony
// @pb[login data load - refresh vs manual session] self rebuilt -> suck
// @pb[login data load - refresh vs manual session] manual login ...
// @pb[login data load - refresh vs manual session] session design vs other idfk
// @pb[login data load - refresh vs manual session]
// @pb[login data load - refresh vs manual session] in Anony -> Login -> need clear old shit -> refresh -> am i login? & auto anony
// @pb[login data load - refresh vs manual session]
// @pb[login data load - refresh vs manual session] eithre manual login ; or my brain cant tihnk  idk , cant deal with manual session reset too stupid in js  ;
// @pb[login data load - refresh vs manual session] now saying the better desing... yeah manullsession .... the pb is just the js side ......
// @pb[login data load - refresh vs manual session] just saying the type assertion is forcing to use local var instead of global var session access.. dk good bad still ...

// ;archived[init twice; async pb; bad check hasSession]; export function App_WebrtcVideoCommunication_connectToServer() {
// ;archived[init twice; async pb; bad check hasSession];   const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];   const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];   if (error) return <div>{error.message}</div>;
// ;archived[init twice; async pb; bad check hasSession];   if (isLoading) return <div>Auth0 Loading ...</div>;
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];   // idk dont ask
// ;archived[init twice; async pb; bad check hasSession];   // eslint-disable-next-line react-hooks/rules-of-hooks
// ;archived[init twice; async pb; bad check hasSession];   // React.useEffect(() => {
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];   async function init_NewUserSession_socketio() {
// ;archived[init twice; async pb; bad check hasSession];     if (AppSessionRef.appSession.hasUserSession) {
// ;archived[init twice; async pb; bad check hasSession];       await AppSessionRef.appSession.terminate_CurrUserSession();
// ;archived[init twice; async pb; bad check hasSession];     }
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];     let userWeb;
// ;archived[init twice; async pb; bad check hasSession];     if (!isAuthenticated) {
// ;archived[init twice; async pb; bad check hasSession];       userWeb = new UserWeb(uuidv4(), 'Anonymous', true);
// ;archived[init twice; async pb; bad check hasSession];     } else {
// ;archived[init twice; async pb; bad check hasSession];       if (user == null) throw new TypeError();
// ;archived[init twice; async pb; bad check hasSession];       if (user.sub == null) throw new TypeError();
// ;archived[init twice; async pb; bad check hasSession];       if (user.nickname == null) throw new TypeError();
// ;archived[init twice; async pb; bad check hasSession];       userWeb = new UserWeb(user.sub, user.nickname);
// ;archived[init twice; async pb; bad check hasSession];     }
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];     try {
// ;archived[init twice; async pb; bad check hasSession];       await AppSessionRef.appSession.init_NewUserSession(1000, userWeb);
// ;archived[init twice; async pb; bad check hasSession];     } catch (error) {
// ;archived[init twice; async pb; bad check hasSession];       if (!(error instanceof WaitTooLongException)) throw error;
// ;archived[init twice; async pb; bad check hasSession];       console.error(error);
// ;archived[init twice; async pb; bad check hasSession];     }
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];     const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection ?? (() => { throw new TypeError(); })(); // prettier-ignore
// ;archived[init twice; async pb; bad check hasSession];     const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp ?? (() => { throw new TypeError(); })(); // prettier-ignore
// ;archived[init twice; async pb; bad check hasSession];     console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self_sessionReactApp);
// ;archived[init twice; async pb; bad check hasSession];     forceRerender('dummyAction');
// ;archived[init twice; async pb; bad check hasSession];   }
// ;archived[init twice; async pb; bad check hasSession];
// ;archived[init twice; async pb; bad check hasSession];   if (!AppSessionRef.appSession.hasUserSession) {
// ;archived[init twice; async pb; bad check hasSession];     // @pb[useEffect dependency array hassle vs manual click button]
// ;archived[init twice; async pb; bad check hasSession];     // @userExperience_default_action
// ;archived[init twice; async pb; bad check hasSession];     // @todo if use act() & access function inside a compononet
// ;archived[init twice; async pb; bad check hasSession];     void init_NewUserSession_socketio();
// ;archived[init twice; async pb; bad check hasSession];     return (
// ;archived[init twice; async pb; bad check hasSession];       <>
// ;archived[init twice; async pb; bad check hasSession];         <div>init_NewUserSession_socketio ing ...</div>
// ;archived[init twice; async pb; bad check hasSession];         {/* <button onClick={init_NewUserSession_socketio}>init_NewUserSession_socketio</button> */}
// ;archived[init twice; async pb; bad check hasSession];       </>
// ;archived[init twice; async pb; bad check hasSession];     );
// ;archived[init twice; async pb; bad check hasSession];   }

let sn_Session = 0;
let mode_offline_debug = false;

export function App_WebrtcVideoCommunication_connectToServer() {
  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);
  // const [synclock_initingSession_rst, set_synclock_initingSession_rst] = React.useState<boolean>(false);

  const userId_prev = AppSessionRef.appSession.userAuth0Id_curr_crossSessionData;
  const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();

  // const [mode_offline_debug, set_mode_offline_debug] = React.useState<boolean>(false);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Auth0 Loading ...</div>;

  // need place after the loading ... else gets double undefined user ...
  // React randomly rerender billion times .... those checking mechanism just breaks by that .....
  const userId_curr = user?.sub;
  AppSessionRef.appSession.userAuth0Id_curr_crossSessionData = userId_curr;

  async function init_NewUserSession_socketio() {
    // @messy need better mechanism dkdkdk
    // dk perfomrance & safty not brain for & ; said thing
    let snWait = 0;
    while (AppSessionRef.appSession.synclock_initingSession) {
      snWait++;
      if (snWait >= 40) throw new WaitTooLongException('Wait too long for prev session init to finish ...');
      await new Promise((r) => setTimeout(r, 100));
    }
    // set_synclock_initingSession_rst(true);

    AppSessionRef.appSession.synclock_initingSession = true;
    sn_Session++;
    console.log('>> App_WebrtcVideoCommunication_connectToServer > init_NewUserSession_socketio()', sn_Session, dayjs().format('HH:mm:ss.SSS'));
    if (AppSessionRef.appSession.hasUserSession) {
      await AppSessionRef.appSession.terminate_CurrUserSession(sn_Session);
    }

    // ;user should be created in server, not client; let userWeb;
    // ;user should be created in server, not client; if (!isAuthenticated) {
    // ;user should be created in server, not client;   userWeb = new UserWeb(null, 'Anonymous', `Anonymous.${uuidv4()}@example.com`, null, null, true);
    // ;user should be created in server, not client; } else {
    // ;user should be created in server, not client;   if (user == null) throw new TypeError();
    // ;user should be created in server, not client;   if (user.sub == null) throw new TypeError();
    // ;user should be created in server, not client;   if (user.nickname == null) throw new TypeError();
    // ;user should be created in server, not client;
    // ;user should be created in server, not client;   userWeb = new UserWeb(user.sub, user.nickname, user.email ?? `undefined.${uuidv4()}@example.com`, null, null, false);
    // ;user should be created in server, not client; }
    // ;user should be created in server, not client; AppSessionRef.appSession.userWeb_self = userWeb;
    // ;user should be created in server, not client; AppSessionRef.appSession.userWebId_self = userWeb.userWebId;

    // at current stage -- every non-anonymous user must have an auth0 id
    if (isAuthenticated) {
      if (user == null) throw new TypeError();
      if (user.sub == null) throw new TypeError();
      if (user.nickname == null) throw new TypeError();
    }

    try {
      await AppSessionRef.appSession.init_NewUserSession(sn_Session, 1000, user);
    } catch (error) {
      if (!(error instanceof WaitTooLongException)) throw error;
      console.error(error);
    }

    const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp ?? (() => { throw new TypeError(); })(); // prettier-ignore
    const userWebId_self = AppSessionRef.appSession.userWebId_self ?? (() => { throw new TypeError(); })(); // prettier-ignore
    console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ', signalserverWebsocketClientId_self_sessionReactApp, ' userWebId_self :: ', userWebId_self);
    // set_synclock_initingSession_rst(false);
    // @messy @todo maybe need try catch
    AppSessionRef.appSession.synclock_initingSession = false;
    forceRerender('dummyAction'); // dk why i remove this...
  }

  // ############

  if (mode_offline_debug) {
    // { socket: { on: () => {}, off: () => {}, emit: () => {}, }, }
    return (
      <>
        <App_WebrtcVideoCommunication_semantic
          // @ts-expect-error
          signalserverWebsocketClientId_self_sessionReactApp={'fake_offline_mode_debug'}
          // @ts-expect-error
          socketioClientSession_forWebrtcConnection={AppSessionRef.appSession.socketioClientSession_forWebrtcConnection}
          // @ts-expect-error
          reduxStore={AppSessionRef.appSession.reduxStore}
          userWeb_self={new UserWeb(null, 'fake_offline_mode_debug', `fake_offline_mode_debug.${uuidv4()}@example.com`, null, null, true)}
        />
      </>
    );
  }

  const jsx_Initing = (
    <>
      <div>init_NewUserSession_socketio ing ...</div>
      {/* <button onClick={init_NewUserSession_socketio}>init_NewUserSession_socketio</button> */}
      <button
        onClick={() => {
          // set_mode_offline_debug(true);
          mode_offline_debug = true;
          forceRerender('dummyAction');
        }}
      >
        <pre>{'go offline_mode \n-- if this is a static page, the SignalServer wont be running \n& you must go offline_mode \n-- (debug only)'}</pre>
      </button>
    </>
  );

  if (AppSessionRef.appSession.synclock_initingSession) {
    return jsx_Initing;
  }
  if (userId_prev === null || userId_curr !== userId_prev) {
    // @pb[useEffect dependency array hassle vs manual click button]
    // @userExperience_default_action
    // @todo if use act() & access function inside a compononet
    // ? why would even work before .. the authenticate login... that was base on refresh?
    void init_NewUserSession_socketio();
    return jsx_Initing;
  }

  // ############

  const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection ?? (() => { throw new TypeError(); })(); // prettier-ignore
  const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp ?? (() => { throw new TypeError(); })(); // prettier-ignore
  const reduxStore = AppSessionRef.appSession.reduxStore ?? (() => { throw new TypeError(); })(); // prettier-ignore
  const userWeb_self = AppSessionRef.appSession.userWeb_self ?? (() => { throw new TypeError(); })(); // prettier-ignore

  return (
    <>
      <App_WebrtcVideoCommunication_semantic
        signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
        socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
        reduxStore={reduxStore}
        // isAuthenticated={isAuthenticated}
        userWeb_self={userWeb_self}
      />
    </>
  );
}

// // @todo @need_check ...
// const App_WebrtcVideoCommunication_connectToServer = React.memo(App_WebrtcVideoCommunication_connectToServer_L);
// export {App_WebrtcVideoCommunication_connectToServer};
