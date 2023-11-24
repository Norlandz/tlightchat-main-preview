import React from 'react';
import { SignalserverWebsocketMsgType } from './messageSchema/WebSocketMessage';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../main';
import { OfferSentReceivedListPanel } from './panel/OfferSentReceivedListPanel';
import { LobbyUserListPanel } from './panel/LobbyUserListPanel';
import { WebrtcConnectionAnchorGridPanel } from './panel/WebrtcConnectionAnchorGridPanel';
import { MediaStreamLocalSelfGridPanel } from './panel/MediaStreamLocalSelfGridPanel';
import 'reflect-metadata';
import styles from '../index.module.css';
import { VideoConnectionLinkageDraftControlPanel } from './panel/VideoConnectionLinkageDraftControlPanel';

let count_Render_debug = 0;

export default function AppSemantic() {
  const [count_debug, setCount_debug] = React.useState(1);           
  console.log('count_Render :: ' + ++count_Render_debug);           

  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error(signalserverWebsocketClientId_self_sessionReactApp_errMsg);

                                         

  return (
    <>
      <MediaStreamLocalSelfGridPanel />
      <WebrtcConnectionAnchorGridPanel />
      <LobbyUserListPanel />
      <OfferSentReceivedListPanel />
      <VideoConnectionLinkageDraftControlPanel />

      <div>
        <button onClick={() => setCount_debug((count) => count + 1)}>count is {count_debug}</button>
        <button onClick={() => initRun.socket.emit(SignalserverWebsocketMsgType.testMessage, 'Test Msg from Client')}>socket.emit(XXX, 'Test Msg from Client')</button>
        <button onClick={() => initRun.socket.disconnect()}>socket.disconnect()</button>
        <button onClick={() => initRun.socket.connect()}>socket.connect()</button>
      </div>
      <div id="scrollAfterEnd" className={styles.scrollAfterEnd}></div>
    </>
  );
}
