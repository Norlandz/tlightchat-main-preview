import './mainPreImport';

import React from 'react';
import ReactDOM from 'react-dom/client';
// import * as ReactDOM from 'react-dom/client'; // Jest need this, actually its import pb Jest shouldnt come here
import App from './App';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { MuiTheme } from './cssTheme/MuiTheme';

// ;moved; const initRun = new InitRun();
// ;moved; await initRun.run_withTimeout(1000);
// ;moved;
// ;moved; const signalserverWebsocketClientId_self_sessionReactApp = await initRun.promise_signalserverWebsocketClientId_self_sessionReactApp; // aga multi await on same Promise is fine
// ;moved; console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self_sessionReactApp);
// ;movedl export { initRun };
// ;movedl export { signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg };

// const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN ?? (() => { throw new TypeError(); })(); // prettier-ignore
// const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID ?? (() => { throw new TypeError(); })(); // prettier-ignore
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN as string ?? (() => { throw new TypeError(); })(); // prettier-ignore
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID as string ?? (() => { throw new TypeError(); })(); // prettier-ignore
const AUTH0_redirect_uri = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={MuiTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: AUTH0_redirect_uri,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
);

// still, use global field or use local var
// and the each Anchor has own Service ... nested session
// // said local feels more safe & was the way doing & spring inject
// // global is more convenient ; easy to find import ref
// // dont see local much better
// f say & f j b p what sssssss , just if go with the ref , then that say must use ref holder or local .. well if use function call...
// dont think possible .... the redux doesnt work in that way

// []
// When you do a new redux state, with empty content, you basically still have the previous states in memory, and you could theoretically access the data from them. Refreshing the browser IS your safest bet
// <>
// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store

// JavaScript Refresh Page – How to Reload a Page in JS
// https://www.freecodecamp.org/news/javascript-refresh-page-how-to-reload-a-page-in-js/
//
// javascript - How to refresh a Page using react-route Link - Stack Overflow
// https://stackoverflow.com/questions/41481522/how-to-refresh-a-page-using-react-route-link

// 1. structure wont change . still kindaj ust htat
// only that init place may change but wont matter
// 1. redux & oop things just not fit
// 1. the use of refresh

// 1. top lv await
// 1. the throw of session is not the AppSession, its just the user session ...
// AppSessionRef.appSession.init(1000);
