import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { initRun } from '../../main';
import {
  sliceMppMediaStreamLocalSelf,
  RootState, sliceVideoConnectionLinkageDraftCurrSelected
} from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';

               
const MediaStreamLocalSelfRcomp: React.FC<{ mediaStreadLocalSelf: MediaStream; }> = ({ mediaStreadLocalSelf }) => {
  const dispatch = ReactRedux.useDispatch();

                                   
  React.useEffect(() => {
    dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
  }, []);                                


        
  const videoConnectionLinkageDraftCurrSelected_rst = ReactRedux.useSelector((state: RootState) => state.reducerVideoConnectionLinkageDraftCurrSelected);

  return (
    <li
                        
      className={styles.css_MediaStreamLocalSelfRcomp +
        ' ' +
        (videoConnectionLinkageDraftCurrSelected_rst.mediaStreamLocalSelf === mediaStreadLocalSelf ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                                                        
      }
    >
      <button
        onClick={function select_mediaStreadLocalSelf() {
          dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_mediaStreadLocalSelf(mediaStreadLocalSelf));
        }}
      >
        select_mediaStreadLocalSelf
      </button>

      <WebcamVideo webcamVideoStream={mediaStreadLocalSelf} />
    </li>
  );
};

export const MediaStreamLocalSelfGridPanel: React.FC = () => {
  const mppMediaStreamLocalSelf_rst = ReactRedux.useSelector((state: RootState) => state.reducerMppMediaStreamLocalSelf);
  const dispatch = ReactRedux.useDispatch();

  const add_mediaStreamLocalSelfRcomp = async () => {
    const mediaStream = await initRun.getLocalMediaStream();        
    dispatch(sliceMppMediaStreamLocalSelf.actions.addToMpp(mediaStream));
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
