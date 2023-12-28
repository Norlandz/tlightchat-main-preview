import React, { memo } from 'react';
import { SignalserverWebsocketMsgType } from './messageSchema/WebSocketMessage';
// import { initRun, signalserverWebsocketClientId_self_sessionReactApp, signalserverWebsocketClientId_self_sessionReactApp_errMsg } from '../main';
// import { OfferSentReceivedListPanel } from './panel/OfferSentReceivedListPanel';
import { LobbyUserListPanel } from './panel/LobbyUserListPanel';
import { WebrtcConnectionAnchorGridPanel } from './panel/WebrtcConnectionAnchorGridPanel';
import { MediaStreamLocalSelfGridPanel } from './panel/MediaStreamLocalSelfGridPanel';
import 'reflect-metadata';
import styles from '../scss/index.module.css';
import { VideoConnectionControlPanel } from './panel/VideoConnectionControlPanel';
import { SignalserverWebsocketClientId } from './messageSchema/WebrtcConnectionAnchorLocation';
import { Provider } from 'react-redux';
import { ReduxStore } from '../webrtcVideoCommunication/redux/ReduxStore';
import { SocketioClientSession_forWebrtcConnection } from './service/EventEmitterNested_forWebrtcConnection';
import { AppBar, Box, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Step, StepLabel, Stepper, Toolbar, Typography } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import BugReportIcon from '@mui/icons-material/BugReport';
import { VideogameAssetOutlined, ViewSidebar } from '@mui/icons-material';
import { TextChatGridPanel } from './panel/TextChatGridPanel';
import { UserWeb, UserWebId } from '../user/UserWeb';
import ChatIcon from '@mui/icons-material/Chat';

let count_Render_debug = 0;

export const App_WebrtcVideoCommunication_semantic: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  reduxStore: ReduxStore;
  // isAuthenticated: boolean;
  userWeb_self: UserWeb;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection, reduxStore, userWeb_self }) => {
  // ############
  const [count_debug, setCount_debug] = React.useState(1); // @debug;
  console.log('count_Render :: ' + ++count_Render_debug); // @debug;

  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error();
  // ;archived; useEffect @stale_state_pb

  // ############
  const [show_MediaStreamLocalSelfGridPanel_rst, set_show_MediaStreamLocalSelfGridPanel_rst] = React.useState(true);
  const [show_LobbyUserListPanel_rst, set_show_LobbyUserListPanel_rst] = React.useState(true);
  // const [show_OfferSentReceivedListPanel_rst, set_show_OfferSentReceivedListPanel_rst] = React.useState(true);
  const [show_VideoConnectionControlPanel_rst, set_show_VideoConnectionControlPanel_rst] = React.useState(true);
  const [show_TextChat_rst, set_show_TextChat_rst] = React.useState(true);
  const [show_DebugPanel_rst, set_show_DebugPanel_rst] = React.useState(false);

  // ############

  const jsx_DebugPanel = (
    <div style={{ display: show_DebugPanel_rst ? undefined : 'none' }}>
      <button onClick={() => setCount_debug((count) => count + 1)}>count is {count_debug}</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.emit(SignalserverWebsocketMsgType.testMessage, 'Test Msg from Client')}>socket.emit(xxx, 'Test Msg from Client')</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.disconnect()}>socket.disconnect()</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.connect()}>socket.connect()</button>
    </div>
  );

  // ############

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Video Connection</Typography>
          <span style={{ flexGrow: 5 }} />
        </Toolbar>
      </AppBar>
      <Stepper_VideoConnect />
      <PanelVisbilityController
        set_show_MediaStreamLocalSelfGridPanel_rst={set_show_MediaStreamLocalSelfGridPanel_rst}
        set_show_LobbyUserListPanel_rst={set_show_LobbyUserListPanel_rst}
        set_show_VideoConnectionControlPanel_rst={set_show_VideoConnectionControlPanel_rst}
        set_show_TextChat_rst={set_show_TextChat_rst}
        set_show_DebugPanel_rst={set_show_DebugPanel_rst}
      />

      <Provider store={reduxStore.store}>
        <div style={{ display: show_MediaStreamLocalSelfGridPanel_rst ? undefined : 'none' }}>
          <MediaStreamLocalSelfGridPanel signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp} />
        </div>
        <WebrtcConnectionAnchorGridPanel
          signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
          socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
          // isAuthenticated={isAuthenticated}
        />
        <div style={{ display: show_LobbyUserListPanel_rst ? undefined : 'none' }}>
          <LobbyUserListPanel
            signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
            socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
          />
          {/* <OfferSentReceivedListPanel /> */}
        </div>
        <div style={{ display: show_VideoConnectionControlPanel_rst ? undefined : 'none' }}>
          <VideoConnectionControlPanel />
        </div>
        <div style={{ display: show_TextChat_rst ? undefined : 'none' }}>
          <TextChatGridPanel
            signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
            socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
            userWeb_self={userWeb_self}
          />
        </div>
      </Provider>

      {jsx_DebugPanel}
      <div id="scrollAfterEnd" className={styles.scrollAfterEnd}></div>
    </>
  );
};

// ############
// [[aga nest component & performance compare & conveninent prop access ...
// feels memo not really helping in this case -- its reexecuted every time
// I Was Wrong About Nested React Components - YouTube
// https://www.youtube.com/watch?v=2sAdzy90GtE
// ~~~// well that unmount emmm // just that not just about rerender those prop emmm
// that blink should due to that unmount
const Stepper_VideoConnect: React.FC = React.memo(() => {
  const steps = [
    'Add and select a MediaStream',
    'Add and select a ConnectionAnchor',
    'Go Online',
    'Wait for Peer to go Online',
    'Select a Peer',
    'Send Offer to Peer',
    'Wait for Peer to accept Offer',
    'Connected',
  ];

  const [activeStep, setActiveStep] = React.useState(3);
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          // const stepProps: { completed?: boolean } = {};
          // const labelProps: { optional?: React.ReactNode } = {};
          // if (isStepOptional(index)) labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // if (isStepSkipped(index)) stepProps.completed = false;
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <span style={{ flexGrow: 5 }} />
        <Button variant="text" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="text" disabled={activeStep === steps.length - 1} onClick={handleNext}>
          Next
        </Button>
      </Box>
    </>
  );
});

// ############
// eslint-disable-next-line react-refresh/only-export-components
const PanelVisbilityController: React.FC<{
  set_show_MediaStreamLocalSelfGridPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_LobbyUserListPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_VideoConnectionControlPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_TextChat_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_DebugPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ set_show_MediaStreamLocalSelfGridPanel_rst, set_show_LobbyUserListPanel_rst, set_show_VideoConnectionControlPanel_rst, set_show_TextChat_rst, set_show_DebugPanel_rst }) => {
  const [show, set_show] = React.useState<boolean>(true);
  // <strike> @stale_state_pb @learn_observing
  // reversed order ...
  const actions = [
    { icon: <VideoLibraryIcon />,       name: 'MediaStream',        onClick: () => set_show_MediaStreamLocalSelfGridPanel_rst(show => !show) },
    { icon: <VideoChatIcon />,          name: 'ConnectionAnchor',   onClick: () => { console.log('// Do nothing')} },
    { icon: <VideoCameraFrontIcon />,   name: 'LobbyUserList',      onClick: () => set_show_LobbyUserListPanel_rst(show => !show) },
    { icon: <VideogameAssetOutlined  />,name: 'ControlPanel',       onClick: () => set_show_VideoConnectionControlPanel_rst(show => !show) },
    { icon: <ChatIcon />,               name: 'TextChat',           onClick: () => set_show_TextChat_rst(show => !show) },
    { icon: <BugReportIcon />,          name: 'DebugPanel',         onClick: () => set_show_DebugPanel_rst(show => !show) },
  ]; // prettier-ignore
  return (
    <SpeedDial
      ariaLabel="SpeedDial PanelVisbilityController"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={
        <SpeedDialIcon
          ref={(elt: HTMLElement | null | any) => {
            // javascript - check if an object have all the property of a class in typescript - Stack Overflow
            // https://stackoverflow.com/questions/64078843/check-if-an-object-have-all-the-property-of-a-class-in-typescript
            // []
            // // This stands since the beginning of JavaScript
            // typeof null === 'object';
            // <>
            // https://stackoverflow.com/questions/18808226/why-is-typeof-null-object
            // console.log(typeof elt);
            // console.log(elt === null);
            // if (typeof elt === 'object') {
            // const elt_ = elt as object; // not closure pb... just must use declartion ..
            // Object.getOwnPropertyNames(HTMLElement.prototype).every((property) => Object.hasOwn(elt_, property));
            //               Object.getOwnPropertyNames(HTMLElement.prototype).every((property) => {
            //                 const result = Object.hasOwn(elt as object, property);
            //                 console.log(result, property);
            //                 return result;
            //               })
            // typeof elt === 'object' gives any not object
            // if (elt.parentElement && /^button$/gi.test(elt.parentElement.tagName)) {
            if (elt instanceof HTMLElement) {
              if (elt.parentElement instanceof HTMLButtonElement) {
                elt.parentElement.onclick = () => set_show((show) => !show);
              } else {
                console.warn('internal structure of material-ui SpeedDialIcon is changed, hack doesnt work, fall back to default handling');
                elt.onclick = () => set_show((show) => !show);
              }
            } else if (elt === null) {
              // @do_nothing react thing ... elt is null
            } else {
              // console.log(typeof elt);
              // console.log(elt.constructor.name);
              console.error('I may use the ref wrong in react,, to access to the dom element...');
            }
          }}
          // onClick={() => set_show((show) => !show)}
        />
      }
      open={show}
    >
      {actions.reverse().map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={(ev) => {
            // ;not_good, clicking the icon inside also triggers; () => set_show((show) => !show);
            // ;not_good, clicking the blank region also triggers; []
            // ;not_good, clicking the blank region also triggers; You should use the stopPropagation instead:
            // ;not_good, clicking the blank region also triggers; <>
            // ;not_good, clicking the blank region also triggers; https://stackoverflow.com/questions/61649335/how-do-i-get-material-ui-speeddialaction-onclick-events-to-fire-when-speeddial-i
            // ;not_good, clicking the blank region also triggers; ev.stopPropagation();
            action.onClick();
          }}
          // open={false}
        />
      ))}
    </SpeedDial>
  );
});
