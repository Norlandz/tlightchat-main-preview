import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../index.module.css';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import * as XstateReact from '@xstate/react';
import { WebrtcConnectionStateMachineEvent, webrtcConnectionStateMachine } from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventName } from '../xstate/WebrtcConnectionStateMachineEventName';
import { EventData, SCXML, State, interpret } from 'xstate';
import { slice_webrtcConnectionAnchorLocation_self } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';

               
                                                                                                                                                                                                                                
const WebrtcConnectionAnchorRcomp: React.FC<{ webrtcConnectionAnchor_self: WebrtcConnectionAnchor }> = ({ webrtcConnectionAnchor_self }) => {
                               
  const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(null);
  const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(null);
                            
  webrtcConnectionAnchor_self.set_mediaStreamLocalSelf_rst = set_mediaStreamLocalSelf_rst;
  webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = set_mediaStreamRemotePeer_rst;

  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self);
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer);
  const dispatch = ReactRedux.useDispatch();

                                                         
                                                          
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
  webrtcConnectionService.dispatch_redux = dispatch;

                                                                                   
                                                                                                                      

                                                                         
                                                                                   
                                                                                                  


                                     

  function select_webrtcConnectionAnchor_self__link_Vid() {
                           
    function link_mediaStreamLocalSelf_with_webrtcConnectionAnchor() {
                                           
                                                                                                             
                                                                                                                                                      
      webrtcConnectionAnchor_self.mediaStream_self = mediaStreamLocalSelf_currSel_rst;
      set_mediaStreamLocalSelf_rst(webrtcConnectionAnchor_self.mediaStream_self);
    }
    link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();

              
                                              
                                                                                                 
                                                                          
           
                                                                                                    
                                                                                                                                                                 
          
                                                                                                                                                                                    
        
                                                                                                                                         
                                                                                                   
                                                                                                           
                                         
                                                 
                                                                                                                                                         
    dispatch(slice_webrtcConnectionAnchorLocation_self.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }

         
                                   
  React.useEffect(() => {
    select_webrtcConnectionAnchor_self__link_Vid();
  }, [mediaStreamLocalSelf_currSel_rst]);                                                                 

                             

  if (signalserverWebsocketClientId_self_sessionReactApp !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                

  return (
    <li
                        
      className={styles.css_WebrtcConnectionAnchorRcomp + ' ' +
                                                              
        (webrtcConnectionAnchorLocation_self_currSel_rst?.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                                                                                                                                                                                                                                                                                                                                 
                                                        
      }
    >
      <button onClick={select_webrtcConnectionAnchor_self__link_Vid}>select_webrtcConnectionAnchor_self</button>
      <WebcamVideo webcamVideoStream={mediaStreamLocalSelf_rst} />
      <WebcamVideo webcamVideoStream={mediaStreamRemotePeer_rst} />
    </li>
  );
};

export const WebrtcConnectionAnchorGridPanel: React.FC = () => {
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const dispatch = ReactRedux.useDispatch();

                     
                                                   
  function add_webrtcConnectionAnchorRcomp() {
    dispatch(slice_mppWebrtcConnectionAnchor.actions.addToMpp(new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp)));
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
