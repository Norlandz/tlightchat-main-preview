import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InitRun } from './InitRun';
import { enableMapSet } from 'immer';

const initRun = new InitRun();
await initRun.run_withTimeout(1000);

const signalserverWebsocketClientId_self_sessionReactApp = await initRun.promise_signalserverWebsocketClientId_self_sessionReactApp;                                           
console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self_sessionReactApp);
const signalserverWebsocketClientId_self_sessionReactApp_errMsg =
  'this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer.' +
  '\n// currently await is used by force before <App /> renders -- this component will only execute when signalserverWebsocketClientId_self_sessionReactApp is assigned, so you shouldnt see this line ';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
                       
              
                         
);

export { initRun };
export { signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg };
