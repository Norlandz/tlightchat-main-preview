import React from 'react';
import { SignalserverWebsocketMsgType } from './messageSchema/WebSocketMessage';
                                                                                                                                                    
import { OfferSentReceivedListPanel } from './panel/OfferSentReceivedListPanel';
import { LobbyUserListPanel } from './panel/LobbyUserListPanel';
import { WebrtcConnectionAnchorGridPanel } from './panel/WebrtcConnectionAnchorGridPanel';
import { MediaStreamLocalSelfGridPanel } from './panel/MediaStreamLocalSelfGridPanel';
import 'reflect-metadata';
import styles from '../index.module.css';
import { VideoConnectionLinkageDraftControlPanel } from './panel/VideoConnectionLinkageDraftControlPanel';
import { initRun, rtcConfig } from '../InitRun';
import { SignalserverWebsocketClientId } from './messageSchema/WebrtcConnectionAnchorLocation';

let count_Render_debug = 0;

export const AppSemantic: React.FC<{ signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId }> = ({ signalserverWebsocketClientId_self_sessionReactApp }) => {
  const [count_debug, setCount_debug] = React.useState(1);           
  console.log('count_Render :: ' + ++count_Render_debug);           

                                                                                                                                                

                                         

  return (
    <>
      <MediaStreamLocalSelfGridPanel />
      <WebrtcConnectionAnchorGridPanel signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp} />
      <LobbyUserListPanel signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp} />
      <OfferSentReceivedListPanel />
      <VideoConnectionLinkageDraftControlPanel />

      <div>
        <button onClick={() => setCount_debug((count) => count + 1)}>count is {count_debug}</button>
        <button onClick={() => initRun.socketioClient_forWebrtcConnection.socket.emit(SignalserverWebsocketMsgType.testMessage, 'Test Msg from Client')}>socket.emit(XXX, 'Test Msg from Client')</button>
        <button onClick={() => initRun.socketioClient_forWebrtcConnection.socket.disconnect()}>socket.disconnect()</button>
        <button onClick={() => initRun.socketioClient_forWebrtcConnection.socket.connect()}>socket.connect()</button>
      </div>
      <div id="scrollAfterEnd" className={styles.scrollAfterEnd}></div>
    </>
  );
};
