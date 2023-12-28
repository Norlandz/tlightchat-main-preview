import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../aa_simple/compnent/WebcamVideo';
import { AppSessionRef } from '../../session/AppSession';
import { MediaStreamSrcFile } from '../../session/MediaStreamSrcFile';
import { RootState } from '../redux/ReduxStore';
import { slice_mppMediaStreamLocalSelf } from '../redux/slice_mppMediaStreamLocalSelf';
import styles from '../../scss/index.module.css';
import { slice_mediaStreamLocalSelf_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { SignalserverWebsocketClientId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';

// ############
const MediaStreamLocalSelfRcomp: React.FC<{ mediaStreadLocalSelf: MediaStream }> = ({ mediaStreadLocalSelf }) => {
  const dispatch = ReactRedux.useDispatch();

  function selectCtrl_mediaStreadLocalSelf() {
    dispatch(slice_mediaStreamLocalSelf_currSel.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
  }

  // @userExperience-default action
  React.useEffect(() => {
    selectCtrl_mediaStreadLocalSelf();
  }, []); // intentional -- just run once

  // Css
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);

  //repeat: // the other need swap make better emmm... // dk or just use js maybe better dk other lib
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        height: '120px',
        width: '400px',
      }}
      className={styles.css_MediaStreamLocalSelfRcomp}
    >
      <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'row', resize: 'both', overflow: 'auto' }}>
        {/* <div style={{ flexGrow: 1, minHeight: '50px', display: 'flex', flexDirection: 'column', resize: 'both', overflow: 'auto' }}> */}
        <WebcamVideo webcamVideoStream={mediaStreadLocalSelf} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <FormControlLabel
          control={<Radio />}
          value={mediaStreadLocalSelf.id}
          label={mediaStreadLocalSelf.id}
          checked={mediaStreamLocalSelf_currSel_rst === mediaStreadLocalSelf}
          onClick={selectCtrl_mediaStreadLocalSelf}
        />
      </div>
    </Box>
  );
};

export const MediaStreamLocalSelfGridPanel: React.FC<{ signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId }> = ({
  signalserverWebsocketClientId_self_sessionReactApp,
}) => {
  const mppMediaStreamLocalSelf_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppMediaStreamLocalSelf);
  const dispatch = ReactRedux.useDispatch();

  // reactjs - MUI - Select without initial value throws warnings & errors - Stack Overflow
  // https://stackoverflow.com/questions/73591522/mui-select-without-initial-value-throws-warnings-errors
  // []
  // The selected value. Set to `null` to deselect all options.
  // <>
  // https://mui.com/base-ui/react-select/components-api/#select-prop-value
  // []
  // Add the following menu item above where you iterate through users
  //
  // <MenuItem key='clear' value='clear'>Clear selection</MenuItem>
  // <>
  // https://stackoverflow.com/questions/74976865/can-not-deselect-from-mui-select-component-whats-the-right-way
  // chunk-QPHASEO2.js?v=cff0673f:521 Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
  // console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
  const [mediaStreamSrcFile_rst, set_mediaStreamSrcFile_rst] = React.useState<MediaStreamSrcFile | null>(null);
  // const [mediaStreamSrcFile_rst, set_mediaStreamSrcFile_rst] = React.useState<MediaStreamSrcFile | undefined>(undefined);
  // const [mediaStreamSrcFile_rst, set_mediaStreamSrcFile_rst] = React.useState<MediaStreamSrcFile>(MediaStreamSrcFile.payday);

  async function add_mediaStreamLocalSelfRcomp() {
    // even async... adds more complex to debug // by the time old async comes, the slice already emptied ... (still async vs multithread, feels async design just stupid. )
    // maybe need ignore the `}, [signalserverWebsocketClientId_self_sessionReactApp]);`
    // not even need isAuthenticated... just empty ... let be
    // console.log('>> MediaStreamLocalSelfGridPanel > signalserverWebsocketClientId_self_sessionReactApp :: ' + signalserverWebsocketClientId_self_sessionReactApp);
    // console.warn('@need_fix: this works only because the async is messying up -- execute on the old-should-be-cleanup slice after its cleaned up')
    const mediaStream = await AppSessionRef.appSession.debugConfig.getLocalMediaStream(mediaStreamSrcFile_rst); // TODO
    dispatch(slice_mppMediaStreamLocalSelf.actions.addToMpp(mediaStream));
  }

  // ;X; React.useEffect(() => {
  // ;X;   // if (signalserverWebsocketClientId_self_sessionReactApp == null) return; // @messy
  // ;X;   void add_mediaStreamLocalSelfRcomp();
  // ;X; }, []); // intentional -- just run once
  // @userExperience_default_action
  if (mppMediaStreamLocalSelf_rst.size === 0) {
    void add_mediaStreamLocalSelfRcomp();
  }

  return (
    <Box className={styles.css_GeneralShadowBox}>
      <Button onClick={add_mediaStreamLocalSelfRcomp}>Add MediaStream</Button>
      <TextField
        id={styles.cssId_add_mediaStreamLocalSelfRcomp_input}
        label="MediaStream"
        size="small"
        select
        // value={mediaStreamSrcFile_rst ?? 'null'}
        value={mediaStreamSrcFile_rst ?? ''} // just from error, no doc on this
        onChange={(ev) => {
          // console.log(ev.target.value); // logs value={mediaStreamSrcFile} from MenuItem // aga ev.target.value only works for string wel // FormControl that seem same // is it possible for object?...
          // also the auto Detect of MenuItem in TextField select emmm
          if (ev.target.value === '') {
            console.warn(`this actually shouldnt happen -- cuz now the MenuItem key={'null'} is removed -- this only exist in default value, not selectable`);
            set_mediaStreamSrcFile_rst(null);
          } else {
            set_mediaStreamSrcFile_rst(ev.target.value as MediaStreamSrcFile);
          }
        }}
        sx={{ minWidth: 150 }}
      >
        {/* <MenuItem key={'null'} children={'null'} value={undefined} /> */}
        {/* <MenuItem key={''} children={''} value={''} /> */}
        {Object.entries(MediaStreamSrcFile).map(([key, mediaStreamSrcFile]) => (
          <MenuItem key={key} children={key} value={mediaStreamSrcFile} />
        ))}
      </TextField>
      <br />
      <FormControl>
        <RadioGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          // onChange={function select_mediaStreadLocalSelf(ev, mediaStreadLocalSelf: MediaStream) {
          // ok must have value so can click on ..
        >
          {Array.from(mppMediaStreamLocalSelf_rst, ([mediaStreadLocalSelfId, mediaStreadLocalSelf]) => {
            return <MediaStreamLocalSelfRcomp key={mediaStreadLocalSelf.id} mediaStreadLocalSelf={mediaStreadLocalSelf} />;
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
