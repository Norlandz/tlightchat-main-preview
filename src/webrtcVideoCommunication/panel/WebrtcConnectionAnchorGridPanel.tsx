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

// ########################
// ########################

// @perfomance[nested component & async useEffect, event handler]: (if_I_understood_corretly) nested component makes the React fiber compoare on Component Type fail -- will recreate the component everytime -- bad performance
const WebrtcConnectionAnchorRcomp: React.FC<{
  webrtcConnectionAnchor_self: WebrtcConnectionAnchor;
  mode_FocusPeer_rst: boolean;

  height_ConnectionAnchor_rst: number;
}> = ({ webrtcConnectionAnchor_self, mode_FocusPeer_rst, height_ConnectionAnchor_rst }) => {
  // TODO use from controlpanel
  // shouldnt stale_state_pb
  // ;wrong; const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(null);
  // ;wrong; const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(null);
  // need to use ref -- cuz when unmount the state is lost
  const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(webrtcConnectionAnchor_self.mediaStream_self);
  const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(webrtcConnectionAnchor_self.mediaStream_peer);
  webrtcConnectionAnchor_self.set_mediaStreamLocalSelf_rst = set_mediaStreamLocalSelf_rst;
  webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = set_mediaStreamRemotePeer_rst;

  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  // ~~~~//((seems error throw thne other go offline
  // // ok there are case when the user leave didnt handle that ... , must NoAggresiveThrow // @messy-think
  const connectionAnchorName_peer_rst =
    webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null
      ? 'null'
      : lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer)?.connectionAnchorName;

  const mediaStreamLocalSelf_currSel_rst                = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf); // prettier-ignore
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self ); // prettier-ignore
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer ); // prettier-ignore
  const dispatch = ReactRedux.useDispatch();

  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);

  // those outside inside / maybe parallel is even better
  // that usesate may not even enough; unmount will change
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
  webrtcConnectionService.dispatch_redux = dispatch;

  // @: codeOrderReactHookPreInit -- dont use this until after a desire if statment
  // const [webrtcConnection_xst, send_webrtcConnection_xst] = XstateReact.useMachine(webrtcConnectionStateMachine, );

  // webrtcConnectionService.webrtcConnection_xst = webrtcConnection_xst;
  // webrtcConnectionService.send_webrtcConnection_xst = send_webrtcConnection_xst;
  // since the send here will only update here with a hook ... so better use that map refresh ....

  // ################################

  // TODO move to a place
  function link_mediaStreamLocalSelf_with_webrtcConnectionAnchor() {
    // @think: react rendering order ????
    // if (videoConnectionLinkageDraftCurrSelected_rst.mediaStreamLocalSelf == null) throw new TypeError();
    //I_think,aga cuz mediaStreamLocalSelf_currSel_rst was selected, but still inside a batch, not executed yet, so the local copy here is stale one
    webrtcConnectionAnchor_self.mediaStream_self = mediaStreamLocalSelf_currSel_rst;
    set_mediaStreamLocalSelf_rst(webrtcConnectionAnchor_self.mediaStream_self);
  }

  function select_webrtcConnectionAnchor_self__link_Vid() {
    if (webrtcConnectionAnchor_self.mediaStream_self === null) {
      link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();
    }

    // // @pb[curr Select & local dependency]:@¦    // // immerjs copy -> curr Select actually changes EVERY SINGLE ONE that has dependency on it@¦    // // why inf loop? this state should be the same -- immerjs copy emmm@¦    // if (@¦    //   videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self === null ||@¦    //   !videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self.equals(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self)@¦    // ) {@¦    //   dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));@¦    // }@¦    // // dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchor_self(webrtcConnectionAnchor_self));@¦    // // }, [dispatch, videoConnectionLinkageDraftCurrSelected_rst, webrtcConnectionAnchor_self]);@¦    // // }, []); // bit messy, thought multi call is fine; no -- aga the current selected is not local one@¦    // // ok there was pb first render em@¦    // // better not use call back to make a mess@¦    // videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self;
    dispatch(slice_webrtcConnectionAnchorLocation_self_currSel.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }

  // ;;  // doubt -- if this is unmounted ....@¦  // ;;  const [mediaStreamLocalSelf_firstSel_rst, set_mediaStreamLocalSelf_firstSel_rst] = React.useState<MediaStream | null>(null);@¦  // ;;@¦  // ;;  if (mediaStreamLocalSelf_currSel_rst && mediaStreamLocalSelf_firstSel_rst == null) {@¦  // ;;    set_mediaStreamLocalSelf_firstSel_rst(mediaStreamLocalSelf_currSel_rst);@¦  // ;;  }@¦  // ;;@¦  // ;;  // @userExperience_default_action@¦  // ;;  React.useEffect(() => {@¦  // ;;    // select_webrtcConnectionAnchor_self__link_Vid();@¦  // ;;    // }, [mediaStreamLocalSelf_currSel_rst]); // seems can rerun no pb <strike>// intentional -- just run once@¦  // ;;    select_webrtcConnectionAnchor_self__link_Vid();@¦  // ;;  }, [mediaStreamLocalSelf_firstSel_rst]);@¦  // ;;@¦  // ;;  // @userExperience_default_action@¦  // ;;  React.useEffect(() => {@¦  // ;;    // webrtcConnectionAnchor_self.webrtcConnectionService.actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);@¦  // ;;    webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);@¦  // ;;    dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());@¦  // ;;  }, []);

  // ;not_working; if (webrtcConnectionAnchorLocation_self_currSel_rst === null) {
  // aga the pb of first render does not have sufficient data, worry about other useEffect vs if thing .. (but those logic maybe idk )
  // @userExperience_default_action
  if (webrtcConnectionAnchor_self.mediaStream_self === null && mediaStreamLocalSelf_currSel_rst !== null) {
    link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();
  }
  // TODO fix xstate type
  // console.log(webrtcConnectionAnchor_self.webrtcConnectionService.get_CurrXstate().value) // dk xstate dual representaion
  // @think: is xstate sync or async ...
  // WebrtcConnectionAnchorGridPanel.tsx:89 Warning: Cannot update a component (`WebrtcConnectionAnchorGridPanel`) while rendering a different component (`WebrtcConnectionAnchorRcomp`). To locate the bad setState() call inside `WebrtcConnectionAnchorRcomp`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
  React.useEffect(() => {
    if (webrtcConnectionAnchor_self.webrtcConnectionService.get_CurrXstate().matches('stage__NewVideoConnectionLinkageSetup')) {
      webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
      dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp()); // do_i_need?...
      forceRerender('dummyAction');
    }
  }, [dispatch, webrtcConnectionAnchor_self.webrtcConnectionService, webrtcConnectionService]);
  React.useEffect(() => {
    dispatch(slice_webrtcConnectionAnchorLocation_self_currSel.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }, []);

  // ########################

  // @learn[flex & video height & overflow scrollis the key]: overflow scroll is the key... not jut flex // but that totally removes the height
  // , flexDirection: 'column', ... that makes it align ... need both.. wte; ttt thing ..
  // the other need swap make better emmm... // dk or just use js maybe better dk other lib
  // or just make width height both 100%?..
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
          {/* <div style={{ flexShrink: 2, flexBasis: '50px', display: 'flex', resize: 'both' }}> */}
          {/* <div style={{  display: 'flex', resize: 'both' , overflow: 'scroll' }}> */}
          {/* <div style={{ flexGrow: 1, height: '100px', display: 'flex', resize: 'both', overflowY: 'scroll' }}> */}
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

// ####################
// ####################

export const WebrtcConnectionAnchorGridPanel: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  // isAuthenticated: boolean;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection }) => {
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const dispatch = ReactRedux.useDispatch();

  const [connectionAnchorName_self_rst, set_connectionAnchorName_self_rst] = React.useState<string>(
    AppSessionRef.appSession.debugConfig.connectionAnchorName_debugTest ?? `${AppSessionRef.appSession.debugConfig.prefix_debug}vite${AppSessionRef.appSession.debugConfig.suffix_debug}_cn1`
  ); // default // dk aga forgot where_talked simpler better way for input lable form? (server action?)

  // <strike> @note: cannot use this, this isAuthenticated seems async, very unreliable for rerender

  // REVIEW // @main:
  // TODO modular ui decouple cleanup noreuse need?
  function add_webrtcConnectionAnchorRcomp() {
    const webrtcConnectionAnchor = new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection);
    if (connectionAnchorName_self_rst !== null) {
      webrtcConnectionAnchor.connectionAnchorName_self = connectionAnchorName_self_rst;
      set_connectionAnchorName_self_rst(
        connectionAnchorName_self_rst.replace(/(?<bf>.*?)(?<seq>\d+)$/g, (match, p1, p2, offset, string, groups) => groups.bf + (parseInt(groups.seq as string) + 1).toString())
      );
    }
    // no its the add here is ran; but the cleanup is done later .. why
    dispatch(slice_mppWebrtcConnectionAnchor.actions.addToMpp(webrtcConnectionAnchor));

    socketioClientSession_forWebrtcConnection.add_emt_WebrtcConnectionAnchor(webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  }
  // console.log('zz');
  // console.log('isAuthenticated', isAuthenticated);
  // console.log(mppWebrtcConnectionAnchor_rst);

  // React.useEffect(() => {
  //   add_webrtcConnectionAnchorRcomp();
  // // }, []); // intentional -- just run once
  // // }, [isAuthenticated]); // intentional -- just run once
  // }, [signalserverWebsocketClientId_self_sessionReactApp]); // intentional -- just run once
  // // ok that isAuthenticated took the first mount of this... and later just render ...
  // // wait this indeed ran emmm
  // // @messy ..............
  // @userExperience_default_action
  if (mppWebrtcConnectionAnchor_rst.size === 0) {
    void add_webrtcConnectionAnchorRcomp();
  }

  // ########################

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
              // dk why no convenient way for type? // some just see note
              onChange={(ev) => set_height_ConnectionAnchor_rst(parseInt(ev.target.value))}
              // onChange={(ev) => set_height_ConnectionAnchor_rst((ev.target as HTMLInputElement).valueAsNumber)}
            />
            <Slider
              // aria-label="ConnectionAnchorHeight"
              // getAriaValueText={() => "ConnectionAnchorHeight"}
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
        {/* <FormLabel> */}
        <RadioGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            // height: '120px',
            // width: '400px',
          }}
        >
          {Array.from(mppWebrtcConnectionAnchor_rst, ([webrtcConnectionAnchorId_self, webrtcConnectionAnchor_self]) => {
            // fix this; redux slice asycn rest
            // need vite fast refresh tune
            if (signalserverWebsocketClientId_self_sessionReactApp !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError(); // @doubleCheck
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
