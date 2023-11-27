import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { initRun } from '../../main';
import {
  RootState} from '../redux/ReduxStore';
import { slice_mppMediaStreamLocalSelf } from '../redux/slice_mppMediaStreamLocalSelf';
import styles from '../../index.module.css';
import { slice_mediaStreamLocalSelf } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';

               
const MediaStreamLocalSelfRcomp: React.FC<{ mediaStreadLocalSelf: MediaStream; }> = ({ mediaStreadLocalSelf }) => {
  const dispatch = ReactRedux.useDispatch();

                                   
  React.useEffect(() => {
    dispatch(slice_mediaStreamLocalSelf.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
  }, []);                                


        
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);

  return (
    <li
                        
      className={styles.css_MediaStreamLocalSelfRcomp +
        ' ' +
        (mediaStreamLocalSelf_currSel_rst === mediaStreadLocalSelf ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                                                        
      }
    >
      <button
        onClick={function select_mediaStreadLocalSelf() {
          dispatch(slice_mediaStreamLocalSelf.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
        }}
      >
        select_mediaStreadLocalSelf
      </button>

      <WebcamVideo webcamVideoStream={mediaStreadLocalSelf} />
    </li>
  );
};

export const MediaStreamLocalSelfGridPanel: React.FC = () => {
  const mppMediaStreamLocalSelf_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppMediaStreamLocalSelf);
  const dispatch = ReactRedux.useDispatch();

  const add_mediaStreamLocalSelfRcomp = async () => {
    const mediaStream = await initRun.getLocalMediaStream();        
    dispatch(slice_mppMediaStreamLocalSelf.actions.addToMpp(mediaStream));
  };

                                   
  React.useEffect(() => {
    void add_mediaStreamLocalSelfRcomp();
  }, []);                                

  return (
    <div style={{ border: '1px solid black' }}>
      <button onClick={add_mediaStreamLocalSelfRcomp}>add_mediaStreamLocalSelfRcomp</button>
      <ul>
        {Array.from(mppMediaStreamLocalSelf_rst, ([mediaStreadLocalSelfId, mediaStreadLocalSelf]) => {
          return <MediaStreamLocalSelfRcomp key={mediaStreadLocalSelf.id} mediaStreadLocalSelf={mediaStreadLocalSelf} />;
        })}
      </ul>
    </div>
  );
};
