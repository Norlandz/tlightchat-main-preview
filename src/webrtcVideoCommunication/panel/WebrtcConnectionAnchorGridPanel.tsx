import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
import { RootState, sliceMppWebrtcConnectionAnchor, sliceVideoConnectionLinkageDraftCurrSelected } from '../reactContext/WebrtcConnectionAnchorIdContext';
import styles from '../../index.module.css';

               
                                                                                                                                                                                                                                
const WebrtcConnectionAnchorRcomp: React.FC<{ webrtcConnectionAnchor_self: WebrtcConnectionAnchor }> = ({ webrtcConnectionAnchor_self }) => {
                               
  const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(null);
  const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(null);
                            
  webrtcConnectionAnchor_self.set_mediaStreamLocalSelf_rst = set_mediaStreamLocalSelf_rst;
  webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = set_mediaStreamRemotePeer_rst;

  const videoConnectionLinkageDraftCurrSelected_rst = ReactRedux.useSelector((state: RootState) => state.reducerVideoConnectionLinkageDraftCurrSelected);
  const dispatch = ReactRedux.useDispatch();

  function select_webrtcConnectionAnchor_self__link_Vid() {
    function link_mediaStreamLocalSelf_with_webrtcConnectionAnchor() {
                                           
                                                                                                             
      webrtcConnectionAnchor_self.mediaStream_self = videoConnectionLinkageDraftCurrSelected_rst.mediaStreamLocalSelf;
      set_mediaStreamLocalSelf_rst(webrtcConnectionAnchor_self.mediaStream_self);
    }
    link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();

           
                                            
                                                                                              
                                                                       
    if (
      videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self === null ||
      !videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self.equals(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self)
    ) {
      dispatch(sliceVideoConnectionLinkageDraftCurrSelected.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
    }
                                                                                                                                      
                                                                                                
                                                                                                        
                                      
                                              
  }

         
                                   
  React.useEffect(() => {
    select_webrtcConnectionAnchor_self__link_Vid();
  }, []);                                                                 

  if (signalserverWebsocketClientId_self_sessionReactApp !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                

  return (
    <li
                        
      className={styles.css_WebrtcConnectionAnchorRcomp + ' ' +
                                                              
        (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self?.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                                                                                                                                                                                                                                                                                                                                 
                                                        
      }
    >
      <button onClick={select_webrtcConnectionAnchor_self__link_Vid}>select_webrtcConnectionAnchor_self</button>
      <WebcamVideo webcamVideoStream={mediaStreamLocalSelf_rst} />
      <WebcamVideo webcamVideoStream={mediaStreamRemotePeer_rst} />
    </li>
  );
};

export const WebrtcConnectionAnchorGridPanel: React.FC = () => {
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducerMppWebrtcConnectionAnchor);
  const dispatch = ReactRedux.useDispatch();

                     
                                                   
  function add_webrtcConnectionAnchorRcomp() {
    dispatch(sliceMppWebrtcConnectionAnchor.actions.addToMpp(new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp)));
  }

                                   
  React.useEffect(() => {
    add_webrtcConnectionAnchorRcomp();
  }, []);                                

  return (
    <div style={{ border: '1px solid black' }}>
      <button onClick={add_webrtcConnectionAnchorRcomp}>add_webrtcConnectionAnchorRcomp</button>
      <ul>
        {Array.from(mppWebrtcConnectionAnchor_rst, ([webrtcConnectionAnchorId_self, webrtcConnectionAnchor_self]) => {
          return <WebrtcConnectionAnchorRcomp key={webrtcConnectionAnchorId_self} webrtcConnectionAnchor_self={webrtcConnectionAnchor_self} />;
        })}
      </ul>
    </div>
  );
};
