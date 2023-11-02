import { signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from './main';
import AppSemantic from './webrtcVideoCommunication/AppSemantic';

export default function App() {
  return (
    <>
      <h2>Video Connection with Webrtc</h2>
      {signalserverWebsocketClientId_self_sessionReactApp != null ? <AppSemantic /> : signalserverWebsocketClientId_self_sessionReactApp_errMsg}
    </>
  );
}
