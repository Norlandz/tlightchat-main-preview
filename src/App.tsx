import { signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from './main';
import AppSemantic from './webrtcVideoCommunication/AppSemantic';
import { Provider } from 'react-redux';
import { store } from './webrtcVideoCommunication/reactContext/WebrtcConnectionAnchorIdContext';

export default function App() {
  return (
    <>
      <h2>Video Connection with Webrtc</h2>
      <Provider store={store}>
        {      }
        {signalserverWebsocketClientId_self_sessionReactApp != null ? <AppSemantic /> : signalserverWebsocketClientId_self_sessionReactApp_errMsg}
      </Provider>
    </>
  );
}
