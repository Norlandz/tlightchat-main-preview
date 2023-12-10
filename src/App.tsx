                                 
                                                                                                                                          
import { AppSemantic } from './webrtcVideoCommunication/AppSemantic';
import { Provider } from 'react-redux';
import { store } from './webrtcVideoCommunication/redux/ReduxStore';
import * as React from 'react';
import { SignalserverWebsocketClientId } from './webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { initRun, rtcConfig } from './InitRun';
import { WaitTooLongException } from './exception/WaitTooLongException';

export default function App() {
  const [signalserverWebsocketClientId_self_sessionReactApp, set_signalserverWebsocketClientId_self_sessionReactApp] = React.useState<SignalserverWebsocketClientId | null>(null);

  async function setup_socketio() {
    try {
      await initRun.run_withTimeout(1000);
      if (initRun.socketioClient_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp == null) throw new TypeError();
      set_signalserverWebsocketClientId_self_sessionReactApp(initRun.socketioClient_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp);                                           
      console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self_sessionReactApp);
    } catch (error) {
      if (!(error instanceof WaitTooLongException)) throw error;
      console.error(error);
    }
  }

  React.useEffect(() => {
    void setup_socketio();
  }, []);

  const signalserverWebsocketClientId_self_sessionReactApp_errMsg =
    'this componenet wont be rendered, until signalserverWebsocketClientId_self_sessionReactApp is assigned from SignalServer.' +
    '\n// currently await is used by force before <App /> renders -- this component will only execute when signalserverWebsocketClientId_self_sessionReactApp is assigned, so you shouldnt see this line ';

  return (
    <>
      <h2>Video Connection with Webrtc</h2>
      <Provider store={store}>
        {      }
        {signalserverWebsocketClientId_self_sessionReactApp != null ? (
          <AppSemantic signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp} />
        ) : (
          signalserverWebsocketClientId_self_sessionReactApp_errMsg
        )}
      </Provider>
    </>
  );
}
