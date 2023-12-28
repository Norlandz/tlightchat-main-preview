import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../aa_simple/compnent/WebcamVideo';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../scss/index.module.css';
import { WebrtcConnectionStateMachineEventTypeName } from '../service/xstate/WebrtcConnectionStateMachineEventName';
import { slice_webrtcConnectionAnchorLocation_self_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { SignalserverWebsocketClientId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { AppSessionRef } from '../../session/AppSession';
import { SocketioClientSession_forWebrtcConnection } from '../service/EventEmitterNested_forWebrtcConnection';
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, Radio, RadioGroup, Slider, TextField, Tooltip } from '@mui/material';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';

                           
                           

                                                                                                                                                                                                                                
const WebrtcConnectionAnchorRcomp: React.FC<{
  webrtcConnectionAnchor_self: WebrtcConnectionAnchor;
  mode_FocusPeer_rst: boolean;

  height_ConnectionAnchor_rst: number;
}> = ({ webrtcConnectionAnchor_self, mode_FocusPeer_rst, height_ConnectionAnchor_rst }) => {
                               
                            
                                                                                                                       
                                                                                                                         
                                                          
  const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(webrtcConnectionAnchor_self.mediaStream_self);
  const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(webrtcConnectionAnchor_self.mediaStream_peer);
  webrtcConnectionAnchor_self.set_mediaStreamLocalSelf_rst = set_mediaStreamLocalSelf_rst;
  webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = set_mediaStreamRemotePeer_rst;

  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
                                                    
                                                                                                           
  const connectionAnchorName_peer_rst =
    webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null
      ? 'null'
      : lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer)?.connectionAnchorName;

  const mediaStreamLocalSelf_currSel_rst                = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);                   
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self );                   
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer );                   
  const dispatch = ReactRedux.useDispatch();

  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);

                                                         
                                                          
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
  webrtcConnectionService.dispatch_redux = dispatch;

                                                                                   
                                                                                                                      

                                                                         
                                                                                   
                                                                                                  

                                     

                         
  function link_mediaStreamLocalSelf_with_webrtcConnectionAnchor() {
                                         
                                                                                                           
                                                                                                                                                    
    webrtcConnectionAnchor_self.mediaStream_self = mediaStreamLocalSelf_currSel_rst;
    set_mediaStreamLocalSelf_rst(webrtcConnectionAnchor_self.mediaStream_self);
  }

  function select_webrtcConnectionAnchor_self__link_Vid() {
    if (webrtcConnectionAnchor_self.mediaStream_self === null) {
      link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();
    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    dispatch(slice_webrtcConnectionAnchorLocation_self_currSel.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

                                                                                  
                                                                                                                                      
                                   
  if (webrtcConnectionAnchor_self.mediaStream_self === null && mediaStreamLocalSelf_currSel_rst !== null) {
    link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();
  }
                         
                                                                                                                            
                                        
                                                                                                                                                                                                                                                                                                                                                    
  React.useEffect(() => {
    if (webrtcConnectionAnchor_self.webrtcConnectionService.get_CurrXstate().matches('stage__NewVideoConnectionLinkageSetup')) {
      webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
      dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());                 
      forceRerender('dummyAction');
    }
  }, [dispatch, webrtcConnectionAnchor_self.webrtcConnectionService, webrtcConnectionService]);
  React.useEffect(() => {
    dispatch(slice_webrtcConnectionAnchorLocation_self_currSel.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }, []);

                             

                                                                                                                                               
                                                                                         
                                                                                           
                                           
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        height: height_ConnectionAnchor_rst,
        width: '400px',
      }}
      className={styles.css_WebrtcConnectionAnchorRcomp}
    >
      {mode_FocusPeer_rst ? (
        <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'row', resize: 'both', overflow: 'auto' }}>
          <WebcamVideo webcamVideoStream={mediaStreamRemotePeer_rst} />
        </div>
      ) : (
        <>
          {                                                                                         }
          {                                                                             }
          {                                                                                                          }
          <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'row', resize: 'both', overflow: 'auto' }}>
            <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'row', resize: 'both', overflow: 'auto' }}>
              <WebcamVideo webcamVideoStream={mediaStreamLocalSelf_rst} />
            </div>
            <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'row', resize: 'both', overflow: 'auto' }}>
              <WebcamVideo webcamVideoStream={mediaStreamRemotePeer_rst} />
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <FormControlLabel
              control={<Radio sx={{ '&, &.Mui-checked': { color: 'burlywood' } }} />}
              value={webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId}
              label={`${webrtcConnectionAnchor_self.connectionAnchorName_self} ${webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId} | ${connectionAnchorName_peer_rst}`}
              checked={webrtcConnectionAnchorLocation_self_currSel_rst?.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId}
              onClick={select_webrtcConnectionAnchor_self__link_Vid}
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                console.log('//todo change mediastream after connected ');
                link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();
              }}
            >
              change MediaStream to curr Selected
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

                       
                       

export const WebrtcConnectionAnchorGridPanel: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
                              
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection }) => {
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const dispatch = ReactRedux.useDispatch();

  const [connectionAnchorName_self_rst, set_connectionAnchorName_self_rst] = React.useState<string>(
    AppSessionRef.appSession.debugConfig.connectionAnchorName_debugTest ?? `${AppSessionRef.appSession.debugConfig.prefix_debug}vite${AppSessionRef.appSession.debugConfig.suffix_debug}_cn1`
  );                                                                                                   

                                                                                                    

                     
                                                   
  function add_webrtcConnectionAnchorRcomp() {
    const webrtcConnectionAnchor = new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection);
    if (connectionAnchorName_self_rst !== null) {
      webrtcConnectionAnchor.connectionAnchorName_self = connectionAnchorName_self_rst;
      set_connectionAnchorName_self_rst(
        connectionAnchorName_self_rst.replace(/(?<bf>.*?)(?<seq>\d+)$/g, (match, p1, p2, offset, string, groups) => groups.bf + (parseInt(groups.seq as string) + 1).toString())
      );
    }
                                                                       
    dispatch(slice_mppWebrtcConnectionAnchor.actions.addToMpp(webrtcConnectionAnchor));

    socketioClientSession_forWebrtcConnection.add_emt_WebrtcConnectionAnchor(webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  }
                       
                                                     
                                                

                            
                                         
                                               
                                                              
                                                                                              
                                                                                         
                                 
                             
                                   
  if (mppWebrtcConnectionAnchor_rst.size === 0) {
    void add_webrtcConnectionAnchorRcomp();
  }

                             

  const [mode_FocusPeer_rst, set_mode_FocusPeer_rst] = React.useState<boolean>(false);
  const [height_ConnectionAnchor_rst, set_height_ConnectionAnchor_rst] = React.useState<number>(120);

  return (
    <Box className={styles.css_GeneralShadowBox}>
      <Tooltip title="FocusPeer">
        <IconButton
          children={<PhotoSizeSelectSmallIcon />}
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          onClick={() => set_mode_FocusPeer_rst((mode_FocusPeer_rst) => !mode_FocusPeer_rst)}
        />
      </Tooltip>
      {mode_FocusPeer_rst ? null : (
        <>
          <Button onClick={add_webrtcConnectionAnchorRcomp}>Add ConnectionAnchor</Button>
          <TextField
            id={styles.cssId_connectionAnchorName_input}
            label="ConnectionAnchorName"
            type="text"
            value={connectionAnchorName_self_rst}
            onChange={(ev) => set_connectionAnchorName_self_rst(ev.target.value)}
          />
          <Box sx={{ display: 'inline-flex' }}>
            <TextField
              id={styles.cssId_connectionAnchorName_input}
              label="ConnectionAnchorHeight"
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
              value={height_ConnectionAnchor_rst}
                                                                         
              onChange={(ev) => set_height_ConnectionAnchor_rst(parseInt(ev.target.value))}
                                                                                                                  
            />
            <Slider
                                                    
                                                                  
              sx={{ display: 'inline-block', width: '100px' }}
              min={0}
              max={500}
              step={10}
              value={height_ConnectionAnchor_rst}
              onChange={(ev, num) => set_height_ConnectionAnchor_rst(num as number)}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
          <br />
        </>
      )}
      <FormControl>
        {                 }
        <RadioGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
                               
                              
          }}
        >
          {Array.from(mppWebrtcConnectionAnchor_rst, ([webrtcConnectionAnchorId_self, webrtcConnectionAnchor_self]) => {
                                               
                                          
            if (signalserverWebsocketClientId_self_sessionReactApp !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                
            return (
              <WebrtcConnectionAnchorRcomp
                key={webrtcConnectionAnchorId_self}
                webrtcConnectionAnchor_self={webrtcConnectionAnchor_self}
                mode_FocusPeer_rst={mode_FocusPeer_rst}
                height_ConnectionAnchor_rst={height_ConnectionAnchor_rst}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
