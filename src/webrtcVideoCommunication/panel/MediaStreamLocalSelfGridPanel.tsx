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

               
const MediaStreamLocalSelfRcomp: React.FC<{ mediaStreadLocalSelf: MediaStream }> = ({ mediaStreadLocalSelf }) => {
  const dispatch = ReactRedux.useDispatch();

  function selectCtrl_mediaStreadLocalSelf() {
    dispatch(slice_mediaStreamLocalSelf_currSel.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
  }

                                   
  React.useEffect(() => {
    selectCtrl_mediaStreadLocalSelf();
  }, []);                                

        
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);

                                                                                                     
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
        {                                                                                                                                  }
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

                                                                                           
                                                                                                         
       
                                                               
       
                                                                           
       
                                                                      
    
                                                                   
       
                                                                                                                
                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                 
  const [mediaStreamSrcFile_rst, set_mediaStreamSrcFile_rst] = React.useState<MediaStreamSrcFile | null>(null);
                                                                                                                            
                                                                                                                                

  async function add_mediaStreamLocalSelfRcomp() {
                                                                                                                                                                            
                                                                                        
                                                             
                                                                                                                                                                     
                                                                                                                                                     
    const mediaStream = await AppSessionRef.appSession.debugConfig.getLocalMediaStream(mediaStreamSrcFile_rst);        
    dispatch(slice_mppMediaStreamLocalSelf.actions.addToMpp(mediaStream));
  }

                                
                                                                                               
                                                
                                                
                                   
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
                                                   
        value={mediaStreamSrcFile_rst ?? ''}                                   
        onChange={(ev) => {
                                                                                                                                                                                                           
                                                                      
          if (ev.target.value === '') {
            console.warn(`this actually shouldnt happen -- cuz now the MenuItem key={'null'} is removed -- this only exist in default value, not selectable`);
            set_mediaStreamSrcFile_rst(null);
          } else {
            set_mediaStreamSrcFile_rst(ev.target.value as MediaStreamSrcFile);
          }
        }}
        sx={{ minWidth: 150 }}
      >
        {                                                                   }
        {                                                    }
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
                                                                                                    
                                                  
        >
          {Array.from(mppMediaStreamLocalSelf_rst, ([mediaStreadLocalSelfId, mediaStreadLocalSelf]) => {
            return <MediaStreamLocalSelfRcomp key={mediaStreadLocalSelf.id} mediaStreadLocalSelf={mediaStreadLocalSelf} />;
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
