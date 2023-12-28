import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { get_webrtcConnectionAnchor_self_helper } from '../dataStructure/WebrtcConnectionAnchor';
import { RootState } from '../redux/ReduxStore';
import { slice_mppWebrtcConnectionAnchor } from '../redux/slice_mppWebrtcConnectionAnchor';
import styles from '../../scss/index.module.css';
import { ConnectionAnchorOnlineStatus } from '../dataStructure/LobbyUserList';
import { WebrtcConnectionStateMachineEventTypeName } from '../service/xstate/WebrtcConnectionStateMachineEventName';
import { WebrtcButtonName } from '../service/WebrtcButtonNameType';
import { Box, Button, Divider } from '@mui/material';

// ############
export const VideoConnectionControlPanel: React.FC = () => {
  // SECTION

  // FIXME dont use any hook here -- this is NOT LOCAL state of a component -- this is CURR selected state
  const mppWebrtcConnectionAnchor_rst = ReactRedux.useSelector((state: RootState) => state.reducer_mppWebrtcConnectionAnchor);
  const mediaStreamLocalSelf_currSel_rst = ReactRedux.useSelector((state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf);
  const webrtcConnectionAnchorLocation_self_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self ); // prettier-ignore 
  const webrtcConnectionAnchorLocation_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer ); // prettier-ignore  
  const lobbyUserList_rst = ReactRedux.useSelector((state: RootState) => state.reducer_lobbyUserList);
  const dispatch = ReactRedux.useDispatch(); // FIXME stale state in service

  // ;archived; // @userExperience-default action@¦  // ;archived; // ~~~~// this is not working, cuz first run has nothing, later rerender this will not run@¦  // ;archived; // @messy: [conditional useEffect vs function order] // dk why can call in this line, cuz closure?@¦  // ;archived; // dont think useCallback would work -- cuz every thing is changing ...@¦  // ;archived; // TODOX @not_sure@¦  // ;archived; React.useEffect(useEffectCallback_forCodeOrder, [useEffectCallback_forCodeOrder]);@¦  // ;archived;@¦  // ;archived;   // @pb: cannot quick setup due to scope ....@¦  // ;archived;   const detDisable__link_mediaStreamLocalSelf_with_webrtcConnectionAnchor = !(webrtcConnectionAnchor_self.mediaStream_self !== videoConnectionLinkageDraftCurrSelected_rst.mediaStreamLocalSelf);@¦  // ;archived;   const detDisable__doAndSend__webrtcConnectionAnchor_Online = !(lobbyUserInfo === undefined || lobbyUserInfo.lobbyUserStatus === LobbyUserStatus.offline);@¦  // ;archived;   const detDisable__makeUserOnline_quickSetup = detDisable__link_mediaStreamLocalSelf_with_webrtcConnectionAnchor || detDisable__doAndSend__webrtcConnectionAnchor_Online;@¦  // ;archived;@¦  // ;archived;   function useEffectCallback_forCodeOrder() {@¦  // ;archived;     if (videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_self == null) {@¦  // ;archived;       // @do_nothing@¦  // ;archived;     } else {@¦  // ;archived;       if (!detDisable__makeUserOnline_quickSetup) {@¦  // ;archived;         link_mediaStreamLocalSelf_with_webrtcConnectionAnchor();@¦  // ;archived;       }@¦  // ;archived;     }@¦  // ;archived;   }
  // nooooo said this is currSelect -- state is not local for this component only ..
  // fine this will every rerender -- but make that method disabled when already ran.
  // !SECTION

  // SECTION
  if (webrtcConnectionAnchorLocation_self_currSel_rst == null) {
    return (
      <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        <Box component="pre">You need to select a ConnectionAnchor_self -- to show more Operations on it</Box>
      </Box>
    );
  }
  // !SECTION

  // SECTION
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self_helper(mppWebrtcConnectionAnchor_rst, webrtcConnectionAnchorLocation_self_currSel_rst);
  // webrtcConnectionAnchor_self.dispatch_redux = dispatch;
  // webrtcConnectionAnchor_self.send_webrtcConnection_xst = send_webrtcConnection_xst;
  // // @performance: new one every time ...
  // const webrtcConnectionService = new WebrtcConnectionService(webrtcConnectionAnchor_self);

  const lobbyUserInfo = lobbyUserList_rst.get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_self);
  const det_NotOffline = !(lobbyUserInfo === undefined || lobbyUserInfo.connectionAnchorStatus === ConnectionAnchorOnlineStatus.offline);

  // const webrtcConnection_xst = webrtcConnectionAnchor_self.webrtcConnectionService.webrtcConnection_xst;
  const webrtcConnectionService = webrtcConnectionAnchor_self.webrtcConnectionService;
  // const actorXst_webrtcConnectionStateMachine = webrtcConnectionService.actorXst_webrtcConnectionStateMachine;
  // // if (webrtcConnection_xst == null) throw new TypeError();
  // function name2event(wwebrtcConnectionStateMachineEventName: WebrtcConnectionStateMachineEventTypeName) {
  //   return { type: wwebrtcConnectionStateMachineEventName, msg: null as unknown as SignalserverWebsocketMsg, offerNegotiationSessionId: '' };
  // }

  // TODO @duplicated_code
  const jsx_OnlineOffline = (
    <Box>
      <Button
        // aga can be a stale state from server // well disable when even undefined -- cuz server not reachable ...
        // yep need the other to get in so that is updated ... // no when not connected, need be able to make online ...
        disabled={det_NotOffline}
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
          // !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventTypeName.evx__goOnline)) ? styles.css_buttonDisabled_byXstate : ''
          !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
          // @: js function this ref pb
          // // webrtcConnectionService.goOnline();
          // actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
          webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOnline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOnline
      </Button>
      <br />
      <Button
        disabled={!det_NotOffline} //
        className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
          // !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventTypeName.evx__goOffline)) ? styles.css_buttonDisabled_byXstate : ''
          !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOffline) ? styles.css_buttonDisabled_byXstate : ''
        }`}
        onClick={() => {
          // // webrtcConnectionService.goOffline();
          // actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventTypeName.evx__goOffline);
          webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx__goOffline);
          dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
        }}
      >
        goOffline
      </Button>
    </Box>
  );

  if (webrtcConnectionAnchorLocation_peer_currSel_rst == null) {
    return (
      <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
        {jsx_OnlineOffline}
        <Box component="pre">You need to select a Peer -- to show more Operations on it</Box>
      </Box>
    );
  }
  // !SECTION

  // // const actorXst_ProcessSendReceiveOffer = actorXst_webrtcConnectionStateMachine
  // //   .getSnapshot()
  // //   .context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(webrtcConnectionAnchorLocation_peer_currSel_rst.toString());
  // // must -- otherwise stale
  // const get_actorXst_ProcessSendReceiveOffer = () => {
  //   return actorXst_webrtcConnectionStateMachine.getSnapshot().context.mpp_webrtcConnectionAnchorLocation_peer_vs_actorXst.get(webrtcConnectionAnchorLocation_peer_currSel_rst.toStringId());
  // };
  // // if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
  // // const actorXst_ProcessSendReceiveOffer_state = actorXst_ProcessSendReceiveOffer?.getSnapshot(); // dont ...
  // // if (actorXst_ProcessSendReceiveOffer_state == null) throw new TypeError();

  //   const det__already_connected_with_this_peer =
  //     videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer !== null &&
  //     webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null &&
  //     videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer.equals(webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer);
  //
  //   const detDisable__initiate__offer_Sent__setupBase = !(
  //     !det__already_connected_with_this_peer && (// didnt send offer to this peer
  //   (// didnt receive offer from this peer
  //   videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer !== null && (webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer) === undefined && webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer) === undefined))) // prettier-ignore
  //   );
  //   const detDisable__accept_respond__offer_Accepted_answer_Sent__setupBase = !(
  //     !det__already_connected_with_this_peer &&
  //     videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer !== null &&
  //     // did receive offer from this peer
  //     webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(videoConnectionLinkageDraftCurrSelected_rst.webrtcConnectionAnchorLocation_peer) !== undefined
  //   );

  // SECTION
  const det_HasSentOfferToSomeone        = webrtcConnectionAnchor_self.offerSentList.size_WebrtcConnectionAnchorId !== 0; // prettier-ignore
  const det_AlreadyConnectedToSomeone    = webrtcConnectionAnchor_self.webrtcConnectionAnchorLocation_peer !== null; // prettier-ignore
  const det_HasSentOfferToThisPeer       = webrtcConnectionAnchor_self.offerSentList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined; // prettier-ignore
  const det_HasReceivedOfferFromThisPeer = webrtcConnectionAnchor_self.offerReceivedList.get_OfferSentReceived_NoAggresiveThrow(webrtcConnectionAnchorLocation_peer_currSel_rst) !== undefined; // prettier-ignore
  // !SECTION

  // TODO encapsulate the child machine thing
  return (
    <Box id={styles.cssId_VideoConnectionLinkageDraftControlPanel}>
      {jsx_OnlineOffline}
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
          disabled={
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) || det_HasSentOfferToThisPeer || det_HasReceivedOfferFromThisPeer // prettier-ignore
          }
          className={`${det_HasSentOfferToSomeone || det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline ? styles.css_buttonDisabled_byManualCode : ''} ${
            // !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent)) ? styles.css_buttonDisabled_byXstate : ''
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst) ||
            det_HasSentOfferToThisPeer ||
            det_HasReceivedOfferFromThisPeer
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          // REVIEW disable send multi offer
          onClick={() => {
            // // webrtcConnectionService.sendConnectionOffer(webrtcConnectionAnchorLocation_peer)
            // actorXst_webrtcConnectionStateMachine.send({
            //   type: WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent,
            //   signalserverWebsocketMsg: 'dummy' as unknown as SignalserverWebsocketMsg,
            //   offerNegotiationSessionId: webrtcConnectionAnchorLocation_peer_currSel_rst.toStringId(),
            // }); // @messy
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Sent, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.sendConnectionOffer}
        </Button>
        <br />
        <Button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline} //
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            // !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted)) ? styles.css_buttonDisabled_byXstate : ''
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
            // // webrtcConnectionService.acceptConnectionOffer(webrtcConnectionAnchorLocation_peer)
            // // TODO @messy this is calling the inside child machine .... state update also?...  & shouldnt allow outside check that ... ; mark internal ? dk
            // // actorXst_webrtcConnectionStateMachine.send({
            // //   type: WebrtcConnectionStateMachineEventName.evx_send__offer_Accepted,
            // //   msg: 'dummy' as unknown as SignalserverWebsocketMsg,
            // //   offerNegotiationSessionId: webrtcConnectionAnchorLocation_peer_currSel_rst.toString(),
            // // });
            // const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            // if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            // actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted);
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Accepted, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.acceptConnectionOffer}
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
          disabled={!det_HasSentOfferToThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline} //
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            // !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled)) ? styles.css_buttonDisabled_byXstate : ''
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
            // // webrtcConnectionService.cancelConnectionOffer(webrtcConnectionAnchorLocation_peer)
            // console.log('CA bf', actorXst_webrtcConnectionStateMachine.getSnapshot().value);
            // console.log('CA bf', get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.value);
            // const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            // if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            // actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled);
            // console.log('CA af', get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.value);
            // console.log('CA af', actorXst_webrtcConnectionStateMachine.getSnapshot().value);
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Cancelled, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_cancelConnectionOffer}
        </Button>
        <br />
        <Button
          disabled={!det_HasReceivedOfferFromThisPeer || det_AlreadyConnectedToSomeone || !det_NotOffline} //
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            // !get_actorXst_ProcessSendReceiveOffer()?.getSnapshot()?.can(name2event(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined)) ? styles.css_buttonDisabled_byXstate : ''
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
            // // webrtcConnectionService.declineConnectionOffer(webrtcConnectionAnchorLocation_peer)
            // const actorXst_ProcessSendReceiveOffer = get_actorXst_ProcessSendReceiveOffer();
            // if (actorXst_ProcessSendReceiveOffer == null) throw new TypeError();
            // actorXst_ProcessSendReceiveOffer.send(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined);
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__offer_Declined, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_declineConnectionOffer}
        </Button>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Button
          disabled={!det_AlreadyConnectedToSomeone || !det_NotOffline} //
          className={`${false ? styles.css_buttonDisabled_byManualCode : ''} ${
            // !actorXst_webrtcConnectionStateMachine.getSnapshot().can(name2event(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed)) ? styles.css_buttonDisabled_byXstate : ''
            !webrtcConnectionService.can_send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed, webrtcConnectionAnchorLocation_peer_currSel_rst)
              ? styles.css_buttonDisabled_byXstate
              : ''
          }`}
          onClick={() => {
            // webrtcConnectionService.closeConnection()
            // actorXst_webrtcConnectionStateMachine.send(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed);
            webrtcConnectionService.send_propagator_Xstate_Common_helper(WebrtcConnectionStateMachineEventTypeName.evx_send__connection_Closed, webrtcConnectionAnchorLocation_peer_currSel_rst);
            dispatch(slice_mppWebrtcConnectionAnchor.actions.forceRefreshMpp());
          }}
        >
          {WebrtcButtonName.send_closeConnection}
        </Button>
      </Box>
      <Box>
        <Button onClick={function remove_webrtcConnectionAnchor_self() {}}>remove_webrtcConnectionAnchor_self</Button>
      </Box>
    </Box>
  );
};

// TODO offer accepted list ; remove those picked ones
//TODO
// ban multi offer
// close cleanup
// test yeah test should be big topic & need; cuz not even sure what do now say
// need test to org
// Xstate is needed
// refactor to smaller componennt is needed
// Redux normalze & better design & storage need
