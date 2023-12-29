import React, { memo } from 'react';
import { SignalserverWebsocketMsgType } from './messageSchema/WebSocketMessage';
                                                                                                                                                    
                                                                                   
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
                              
  userWeb_self: UserWeb;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection, reduxStore, userWeb_self }) => {
                 
  const [count_debug, setCount_debug] = React.useState(1);           
  console.log('count_Render :: ' + ++count_Render_debug);           

  if (signalserverWebsocketClientId_self_sessionReactApp == null) throw new Error();
                                         

                 
  const [show_MediaStreamLocalSelfGridPanel_rst, set_show_MediaStreamLocalSelfGridPanel_rst] = React.useState(true);
  const [show_LobbyUserListPanel_rst, set_show_LobbyUserListPanel_rst] = React.useState(true);
                                                                                                                 
  const [show_VideoConnectionControlPanel_rst, set_show_VideoConnectionControlPanel_rst] = React.useState(true);
  const [show_TextChat_rst, set_show_TextChat_rst] = React.useState(true);
  const [show_DebugPanel_rst, set_show_DebugPanel_rst] = React.useState(false);

                 

  const jsx_DebugPanel = (
    <div style={{ display: show_DebugPanel_rst ? undefined : 'none' }}>
      <button onClick={() => setCount_debug((count) => count + 1)}>count is {count_debug}</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.emit(SignalserverWebsocketMsgType.testMessage, 'Test Msg from Client')}>socket.emit(xxx, 'Test Msg from Client')</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.disconnect()}>socket.disconnect()</button>
      <button onClick={() => socketioClientSession_forWebrtcConnection.socket.connect()}>socket.connect()</button>
    </div>
  );

                 

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
                                              
        />
        <div style={{ display: show_LobbyUserListPanel_rst ? undefined : 'none' }}>
          <LobbyUserListPanel
            signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
            socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
          />
          {                                    }
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

               
                                                                
const PanelVisbilityController: React.FC<{
  set_show_MediaStreamLocalSelfGridPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_LobbyUserListPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_VideoConnectionControlPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_TextChat_rst: React.Dispatch<React.SetStateAction<boolean>>;
  set_show_DebugPanel_rst: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ set_show_MediaStreamLocalSelfGridPanel_rst, set_show_LobbyUserListPanel_rst, set_show_VideoConnectionControlPanel_rst, set_show_TextChat_rst, set_show_DebugPanel_rst }) => {
  const [show, set_show] = React.useState<boolean>(true);
                                              
                       
  const actions = [
    { icon: <VideoLibraryIcon />,       name: 'MediaStream',        onClick: () => set_show_MediaStreamLocalSelfGridPanel_rst(show => !show) },
    { icon: <VideoChatIcon />,          name: 'ConnectionAnchor',   onClick: () => { console.log('// Do nothing')} },
    { icon: <VideoCameraFrontIcon />,   name: 'LobbyUserList',      onClick: () => set_show_LobbyUserListPanel_rst(show => !show) },
    { icon: <VideogameAssetOutlined  />,name: 'ControlPanel',       onClick: () => set_show_VideoConnectionControlPanel_rst(show => !show) },
    { icon: <ChatIcon />,               name: 'TextChat',           onClick: () => set_show_TextChat_rst(show => !show) },
    { icon: <BugReportIcon />,          name: 'DebugPanel',         onClick: () => set_show_DebugPanel_rst(show => !show) },
  ];                   
  return (
    <SpeedDial
      ariaLabel="SpeedDial PanelVisbilityController"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={
        <SpeedDialIcon
          ref={(elt: HTMLElement | null | any) => {
                                                                                                              
                                                                                                                             
                 
                                                               
                                        
                 
                                                                                     
                                       
                                         
                                             
                                                                                           
                                                                                                                    
                                                                                                    
                                                                                     
                                                             
                                             
                               
                                                           
                                                                                       
            if (elt instanceof HTMLElement) {
              if (elt.parentElement instanceof HTMLButtonElement) {
                elt.parentElement.onclick = () => set_show((show) => !show);
              } else {
                console.warn('internal structure of material-ui SpeedDialIcon is changed, hack doesnt work, fall back to default handling');
                elt.onclick = () => set_show((show) => !show);
              }
            } else if (elt === null) {
                                                        
            } else {
                                         
                                                   
              console.error('I may use the ref wrong in react,, to access to the dom element...');
            }
          }}
                                                      
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
                                                                                                  
                                                                     
                                                                                                              
                                                                     
                                                                                                                                                                                                
                                                                                        
            action.onClick();
          }}
                         
        />
      ))}
    </SpeedDial>
  );
});
