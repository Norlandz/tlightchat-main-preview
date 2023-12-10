import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { WebcamVideo } from '../simple/compnent/WebcamVideo';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../index.module.css';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import * as XstateReact from '@xstate/react';
import { WebrtcConnectionStateMachineEvent, webrtcConnectionStateMachine } from '../xstate/WebrtcConnectionStateMachine';
import { WebrtcConnectionStateMachineEventTypeName } from '../xstate/WebrtcConnectionStateMachineEventName';
import { EventData, SCXML, State, interpret } from 'xstate';
import { slice_webrtcConnectionAnchorLocation_self_currSel } from '../redux/slice_videoConnectionLinkageDraftCurrSelected';
import { SignalserverWebsocketClientId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { initRun } from '../../InitRun';

               
                                                                                                                                                                                                                                
const WebrtcConnectionAnchorRcomp: React.FC<{ webrtcConnectionAnchor_self: WebrtcConnectionAnchor }> = ({ webrtcConnectionAnchor_self }) => {
                               
                            
  const [mediaStreamLocalSelf_rst, set_mediaStreamLocalSelf_rst] = React.useState<MediaStream | null>(null);
  const [mediaStreamRemotePeer_rst, set_mediaStreamRemotePeer_rst] = React.useState<MediaStream | null>(null);
  webrtcConnectionAnchor_self.set_mediaStreamLocalSelf_rst = set_mediaStreamLocalSelf_rst;
  webrtcConnectionAnchor_self.set_mediaStreamRemotePeer_rst = set_mediaStreamRemotePeer_rst;

  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
                                                    
                                                                                                           
  const customName_peer_rst =
    webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer == null ? 'null' : lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer)?.customName;

  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self );                   
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer );                   
  const dispatch = ReactRedux.useDispatch();

                                                         
                                                          
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
  webrtcConnectionService.dispatch_redux = dispatch;

                                                                                   
                                                                                                                      

                                                                         
                                                                                   
                                                                                                  

                                     

                         
  function link_mediaStreamLocalSelf_with_webrtcConnectionAnchor() {
                                         
                                                                                                           
                                                                                                                                                    
    webrtcConnectionAnchor_self.mediaStream_self = mediaStreamLocalSelf_currSel_rst;
    set_mediaStreamLocalSelf_rst(webrtcConnectionAnchor_self.mediaStream_self);
  }
  function select_webrtcConnectionAnchor_self__link_Vid() {
    link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();

              
                                              
                                                                                                 
                                                                          
           
                                                                                                    
                                                                                                                                                                 
          
                                                                                                                                                                                    
        
                                                                                                                                         
                                                                                                   
                                                                                                           
                                         
                                                 
                                                                                                                                                         
    dispatch(slice_webrtcConnectionAnchorLocation_self_currSel.actions.select_webrtcConnectionAnchorLocation_self(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self));
  }

                                       
  const [mediaStreamLocalSelf_firstSel_rst, set_mediaStreamLocalSelf_firstSel_rst] = React.useState<MediaStream | null>(null);

  if (mediaStreamLocalSelf_currSel_rst && mediaStreamLocalSelf_firstSel_rst == null) {
    set_mediaStreamLocalSelf_firstSel_rst(mediaStreamLocalSelf_currSel_rst);
  }

         
                                   
  React.useEffect(() => {
                                                      
                                                                                                               
    select_webrtcConnectionAnchor_self__link_Vid();
  }, [mediaStreamLocalSelf_firstSel_rst]);

                                   
  React.useEffect(() => {
                                                                                                                                                               
    webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
    dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
  }, []);

                             

  return (
    <li
                        
      className={styles.css_WebrtcConnectionAnchorRcomp + ' ' +
                                                              
        (webrtcConnectionAnchorLocation_self_currSel_rst?.webrtcConnectionAnchorId === webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId ? styles.css_VideoConnectionLinkageDraftCurrSelected : '')
                                                                                                                                                                                                                                                                                                                                 
                                                        
      }
    >
      <button onClick={select_webrtcConnectionAnchor_self__link_Vid}>select_webrtcConnectionAnchor_self</button>
      <WebcamVideo webcamVideoStream={mediaStreamLocalSelf_rst} />
      <WebcamVideo webcamVideoStream={mediaStreamRemotePeer_rst} />
      <br />
      <code>customName_self: {webrtcConnectionAnchor_self.customName_self}</code> | <code>customName_peer: {customName_peer_rst}</code>
    </li>
  );
};

export const WebrtcConnectionAnchorGridPanel: React.FC<{ signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId }> = ({
  signalserverWebsocketClientId_self_sessionReactApp,
}) => {
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const dispatch = ReactRedux.useDispatch();

  const [customName_self_rst, set_customName_self_rst] = React.useState<string>(initRun.webrtcConnectionAnchor_customName_debugTest || `${initRun.prefix_debug}vite${initRun.suffix_debug}_cn1`);                                                                                                   

                     
                                                   
  function add_webrtcConnectionAnchorRcomp() {
    const webrtcConnectionAnchor = new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp);
    if (customName_self_rst !== null) {
      webrtcConnectionAnchor.customName_self = customName_self_rst;
      set_customName_self_rst(customName_self_rst.replace(/(?<bf>.*?)(?<seq>\d+)$/g, (match, p1, p2, offset, string, groups) => groups.bf + (parseInt(groups.seq as string) + 1).toString()));
    }
    dispatch(slice_mppWebrtcConnectionAnchor.actions.addToMpp(webrtcConnectionAnchor));
    initRun.socketioClient_forWebrtcConnection.add_emt_WebrtcConnectionAnchor(webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  }

                                   
  React.useEffect(() => {
    add_webrtcConnectionAnchorRcomp();
  }, []);                                

  return (
    <div style={{ border: '1px solid black' }}>
      <button onClick={add_webrtcConnectionAnchorRcomp}>add_webrtcConnectionAnchorRcomp</button>
      <input id={styles.cssId_webrtcConnectionAnchor_customName} type="text" value={customName_self_rst} onChange={(e) => set_customName_self_rst(e.target.value)} />
      <ul>
        {Array.from(mppWebrtcConnectionAnchor_rst, ([webrtcConnectionAnchorId_self, webrtcConnectionAnchor_self]) => {
          if (signalserverWebsocketClientId_self_sessionReactApp !== webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();                
          return <WebrtcConnectionAnchorRcomp key={webrtcConnectionAnchorId_self} webrtcConnectionAnchor_self={webrtcConnectionAnchor_self} />;
        })}
      </ul>
    </div>
  );
};
