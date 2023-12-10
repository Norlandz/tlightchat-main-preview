import React from 'react';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
  RTCSessionDescriptionInit_plain,
} from '../messageSchema/WebSocketMessage';
import {
  WebrtcConnectionAnchorLocation,
  WebrtcConnectionAnchorId
} from '../dataStructure/WebrtcConnectionAnchor';
import { WebrtcConnectionAnchor, get_webrtcConnectionAnchor_self, get_webrtcConnectionAnchor_withNoPeer } from '../dataStructure/WebrtcConnectionAnchor';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
import { WebrtcConnectionAnchorIdContext } from '../reactContext/WebrtcConnectionAnchorIdContext';
import { useStateRef } from '../../util/reactjs/useStateRef';
import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { LobbyUserStatus } from '../dataStructure/LobbyUserList';
import { AlreadyConnectedWithAPeerException } from '../exception/AlreadyConnectedWithAPeerException';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as ClassTransformer from 'class-transformer';
import { OfferReceivedList } from '../dataStructure/OfferSentReceivedList';

               
               

                            
function publish_localWebcamVideoStream(pc: RTCPeerConnection, localWebcamVideoStream: MediaStream) {
  for (const track of localWebcamVideoStream.getTracks()) {
    const rtcRtpSender = pc.addTrack(track, localWebcamVideoStream);
  }
}
                                
                                                               
                                                         
                                                                                 
function subscribe_RemoteWebcamVideoStreamFromPeer(pc: RTCPeerConnection, remoteWebcamVideoStream: MediaStream) {
  pc.ontrack = (event) => {
    for (const track of event.streams[0].getTracks()) {
      remoteWebcamVideoStream.addTrack(track);
    }
  };
}

                                                                            
export function cancel_publish_localWebcamVideoStream(pc: RTCPeerConnection) {
  for (const rtcRtpSender of pc.getSenders()) {
    pc.removeTrack(rtcRtpSender);
  }
             
                                                                         
                                          
        
}

               


                                         
                                                                                                       
                                                               

async function send_OfferDescription(webrtcConnectionAnchor_self_initiator: WebrtcConnectionAnchor, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
                
                 
  const offerDescription = await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.createOffer();
  await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.setLocalDescription(offerDescription);

                                                         
  const offerDescription_plain: RTCSessionDescriptionInit_plain = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

                                                                                                  
                                                                                                                                                                  
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(offerDescription_plain, webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.offerSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor_self_initiator);
                                                                                  

  webrtcConnectionAnchor_self_initiator.offerSentList.add_OfferSent(webrtcConnectionEvent);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

async function cancel_send_OfferDescription(webrtcConnectionAnchor_self_initiator: WebrtcConnectionAnchor, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
  await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.setLocalDescription(undefined);             

  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.cancelSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor_self_initiator);

  webrtcConnectionAnchor_self_initiator.offerSentList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
   
                                                                       
                                
                                       
                                             
   
async function accept_OfferDescription___send_AnswerDescription(
  webrtcConnectionAnchor_self_acceptor: WebrtcConnectionAnchor,
  webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation,
  offerDescription_plain: RTCSessionDescriptionInit_plain
) {
                 
  await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));

                
  const answerDescription = await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.createAnswer();
  await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.setLocalDescription(answerDescription);

  const answerDescription_plain: RTCSessionDescriptionInit_plain = {
    sdp: answerDescription.sdp,
    type: answerDescription.type,
  };

  if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_peer !== null) throw new TypeError();
  webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_peer = webrtcConnectionAnchorLocation_peer;

                                                                                                   
                                                                                                                                                                  
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg( answerDescription_plain, webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_peer );                   
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.answerSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor_self_acceptor);
                                                                                
                                                                 
                                    
                                                             
                                                                                                                         
         
                 
                     
                   
                                        
}

function decline_offerDescription(webrtcConnectionAnchor_acceptor: WebrtcConnectionAnchor, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation) {
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionAnchor_acceptor.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.declineSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionAnchor_acceptor);

  webrtcConnectionAnchor_acceptor.offerReceivedList.remove_OfferSentReceived(webrtcConnectionAnchorLocation_peer);                                          
}

function publish_IceCandidates(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation, webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation, pc: RTCPeerConnection) {
                                                                                 
                                                                                                  
                                
                                                     
  pc.onicecandidate = (event) => {
    if (event.candidate === null) return;
                                    
    initRun.socket.emit(SignalserverWebsocketMsgType.iceCandidate, new SignalserverWebsocketMsg(event.candidate.toJSON(), webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer));
  };

                                                                        
                                                                                                                                
                                                                                             
                                                                                 
      
}

               

export const WebrtcConnectionLobbyUserListPanel: React.FC<{ webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation }> = ({ webrtcConnectionAnchorLocation_self }) => {
                                                                                                                     
                                                                                                                                  
                                                  
  const { mpp_webrtcConnectionAnchorId_self_rst, set_mpp_webrtcConnectionAnchorId_self_rst, mpp_webrtcConnectionAnchorId_self_rref, lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref, } = React.useContext(WebrtcConnectionAnchorIdContext);                   
  if (lobbyUserList_rst === null || lobbyUserList_rst === undefined) throw new TypeError();

  const [webrtcConnectionAnchorLocation_peer_OfferSent, set_webrtcConnectionAnchorLocation_peer_OfferSent] = React.useState<WebrtcConnectionAnchorLocation | null>(null);
  const [det_OfferSent, set_det_OfferSent] = React.useState<boolean>(false);
  const [det_OfferAccepted, set_det_OfferAccepted] = React.useState<boolean>(false);

                                                                                                                                                                                                                                                                                        
  const webrtcConnectionAnchor_self = get_webrtcConnectionAnchor_self(mpp_webrtcConnectionAnchorId_self_rst, webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);                                       

                                                                                                                                    
                                                
                                                                                                                
                                   
                                                                          

                                                                              
                         
                                
                                                                                                   
                                                                                       
      

                          
                       
                                  
                              
                                         
                                          
                      
                            
                                                                                                   
                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  function detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(
    webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation,
    webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation
  ) {
                                                          
                                                     
                                                                                                
                                                                                      
                           
                      
        
    try {
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionAnchorLocation_self);
    } catch (e) {
      if (!(e instanceof NoSuchItemException)) throw new TypeError();
      console.error(
        'lobbyUserList_rst must contain this webrtcConnectionAnchorLocation_self, ' +
          '\nif not, that means: the signal server havent update it / have updated it but client doesnt have a time to process it -- cuz you are still inside the process of creating it. ' +
          '\n-- so just wait for the Creation done, the lobbyUserList will be updated & rerendered here. ' +
          '\n-- you can safely ignore this Error if it correctly rerendered & displayed' +
          '\nSeems no good design to avoid this, cuz you are reling on the lobbyUserList that may or may not be stale.'
                                                         
                                                                                                             
                                                    
      );
      return lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionAnchorLocation_peer).lobbyUserStatus === LobbyUserStatus.occupied;
    }
    return (
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionAnchorLocation_self).lobbyUserStatus === LobbyUserStatus.occupied ||
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionAnchorLocation_peer).lobbyUserStatus === LobbyUserStatus.occupied
    );
  }
                                                                                                       

            

                                           
                                           
                                                                         
                                                                                                                                                 
                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                
                                                                                                                                                        

  const webrtcConnectionAnchor_self_initiator = webrtcConnectionAnchor_self;
  const jsx_WebrtcConnectionAvailableList = (
    <div style={{ border: '1px solid black' }}>
      {
                      
                    
                       
                         
                                                                                                                           
                                                             
                           
                                                                                                                                          
                                                                              
                                   
                                                                     
                                                                                                                                                                
                                  
                             
                            
                            
                          
                        
                       
      }
      <div>
        lobbyUserList_rst: (except self)
        <ul>
          {Array.from(lobbyUserList_rst.mpp_signalserverWebsocketClientId, ([signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer]) => {
            if (signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp) return null;                
                                   

                                                                                                              
                                                 
                                                                                                                                                             
                                                                                               
                                                                            
                                                          
                                                                                                                                                   
                                
                              

                    
                                                                                             
            if (det_OfferSent && webrtcConnectionAnchor_self_initiator.offerSentList.size_WebrtcConnectionAnchorId === 0) {
              set_det_OfferSent(false);
              set_webrtcConnectionAnchorLocation_peer_OfferSent(null);
            }

            return (
              <li key={signalserverWebsocketClientId_peer}>
                signalserverWebsocketClientId_peer: <code>{signalserverWebsocketClientId_peer}</code> <br />
                mpp_webrtcConnectionAnchorId_peer:
                <ul>
                  {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, lobbyUserInfo_peer]) => {
                    const webrtcConnectionAnchorLocation_peer = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer, webrtcConnectionAnchorId_peer);
                                                                   
                                           
                                                           
                                                  
                                                                 

                    function detm_AlreadyHaveOffer_ForThisConnectionPoint() {
                                                                                    
                      const mpp_webrtcConnectionAnchorId_peer = mpp_webrtcConnectionAnchorId_self_rst
                        .get(webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId)!
                        .offerReceivedList.mpp_OfferSentReceived.get(signalserverWebsocketClientId_peer);
                      if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
                        const gp_OfferReceived = mpp_webrtcConnectionAnchorId_peer.get(webrtcConnectionAnchorId_peer);
                        if (gp_OfferReceived !== undefined) {
                          for (const [webrtcConnectionEvent_uuid, webrtcConnectionEvent] of gp_OfferReceived) {
                            if (webrtcConnectionEvent.msg.msgTo!.webrtcConnectionAnchorId === webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) {
                              return true;
                            }
                          }
                        }
                      }
                      return false;
                    }

                    async function send_offer() {
                      if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                      publish_localWebcamVideoStream(webrtcConnectionAnchor_self_initiator.rtcPeerConnection, wwebrtcConnectionAnchorself_initiator.mediaStream_self);
                      subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionAnchor_self_initiator.rtcPeerConnection, webrtcConnectionAnchor_self_initiator.mediaStream_peer);
                      if (signalserverWebsocketClientId_self_sessionReactApp === null)
                        throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                      if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self === null) throw new Error();
                      if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                        throw new TypeError();
                      publish_IceCandidates(webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, webrtcConnectionAnchor_self_initiator.rtcPeerConnection);                   
                      await send_OfferDescription(webrtcConnectionAnchor_self_initiator, webrtcConnectionAnchorLocation_peer);                   
                                                                                          
                                                                                                                                     
                                                                                                                  
                                                           
                                                                    
                                               
                                                                                                             
                                                                
                                                                                                                                                                                   
                      set_mpp_webrtcConnectionAnchorId_self_rst!(new Map(mpp_webrtcConnectionAnchorId_self_rst));
                        
                      set_det_OfferSent(true);
                      set_webrtcConnectionAnchorLocation_peer_OfferSent(webrtcConnectionAnchorLocation_peer);
                    }

                                                                                                      
                    return (
                      <li key={JSON.stringify(webrtcConnectionAnchorLocation_peer)}>
                        <code>{webrtcConnectionAnchorId_peer}</code>
                        <button
                          disabled={
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer) ||
                            detm_AlreadyHaveOffer_ForThisConnectionPoint()
                          }
                                                                                                                                                                                                                                                  
                          onClick={async function send_offer_plain() {
                            const eventSessionMailboxId = uuidv4();
                            const eventSessionMailboxLifetimelength = 3 * 60 * 1000;

                            initRun.webrtcConnectionEventManager.sendEvent(
                              new WebrtcConnectionEvent(
                                WebrtcConnectionEventType.offerSentPlain,
                                new SignalserverWebsocketMsg(null, webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer),
                                eventSessionMailboxId,
                                eventSessionMailboxLifetimelength                              
                              ),
                              initRun.socket,
                              webrtcConnectionAnchor_self_initiator
                            );
                                                                                  
                                                                                                                                    
                                                                                                     
                                                                       
                                                                         

                                                                                   

                            async function listener_offerAcceptPlain_sendOfferWebrtcDescription(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                              const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                              if (webrtcConnectionEvent.eventType === WebrtcConnectionEventType.offerAcceptedPlain) {
                                if (JSON.stringify(webrtcConnectionEvent.msg.msgFrom) === JSON.stringify(webrtcConnectionAnchorLocation_peer)) {
                                                        
                                                                                                                                                  

                                                                                                                                                       

                                                                                                                  

                                  const eventSessionMailboxId = uuidv4();
                                  const eventSessionMailboxLifetimelength = 15 * 1000;

                                  if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                  publish_localWebcamVideoStream(webrtcConnectionAnchor_self_initiator.rtcPeerConnection, webrtcConnectionAnchor_self_initiator.mediaStream_self);
                                  subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionAnchor_self_initiator.rtcPeerConnection, webrtcConnectionAnchor_self_initiator.mediaStream_peer);
                                  if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                    throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                  if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self === null) throw new Error();
                                  if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                                    throw new TypeError();
                                  publish_IceCandidates(webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer, webrtcConnectionAnchor_self_initiator.rtcPeerConnection);                   
                                                                                                                                                                
                                                                                                                                
                                  {
                                    const offerDescription = await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.createOffer();
                                    await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.setLocalDescription(offerDescription);

                                    const offerDescription_plain: RTCSessionDescriptionInit_plain = {
                                      sdp: offerDescription.sdp,
                                      type: offerDescription.type,
                                    };

                                    if (webrtcConnectionEvent.eventSessionMailboxId == null) throw new TypeError();                                                                     

                                    initRun.webrtcConnectionEventManager.sendEvent_oneTimeSessionMailbox(
                                      new WebrtcConnectionEvent(
                                        WebrtcConnectionEventType.offerSent,
                                                                                                                                                                                
                                                                                                                                                                 
                                        new SignalserverWebsocketMsg(
                                          offerDescription_plain,
                                          webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_self,
                                          webrtcConnectionAnchorLocation_peer
                                        ),
                                        eventSessionMailboxId,
                                        eventSessionMailboxLifetimelength
                                      ),
                                      initRun.socket,
                                      webrtcConnectionEvent.eventSessionMailboxId,
                                      webrtcConnectionAnchor_self_initiator
                                    );

                                                                                                                                
                                  }

                                                                                                              
                                  async function listener_offerSent_acceptAnswer(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                                    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

                                    await webrtcConnectionAnchor_self_initiator.rtcPeerConnection.setRemoteDescription(
                                      new RTCSessionDescription(webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain)
                                    );
                                    webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_peer = webrtcConnectionEvent.msg.msgFrom;
                                  }

                                  initRun.socket.once(eventSessionMailboxId, listener_offerSent_acceptAnswer);
                                  setTimeout(() => initRun.socket.off(eventSessionMailboxId, listener_offerSent_acceptAnswer), eventSessionMailboxLifetimelength);                            
                                                                                                                       
                                                                                                                               
                                                           
                                } else {
                                                                  
                                  throw new Error('Wrong sender?');
                                }
                              } else {
                                throw new TypeError();
                              }
                            }

                            initRun.socket.once(eventSessionMailboxId, listener_offerAcceptPlain_sendOfferWebrtcDescription);
                            setTimeout(() => initRun.socket.off(eventSessionMailboxId, listener_offerAcceptPlain_sendOfferWebrtcDescription), eventSessionMailboxLifetimelength);                            
                          }}
                        >
                          send offer (multi)
                        </button>
                        <button
                                             
                          disabled={
                            det_OfferSent ||
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer) ||
                            detm_AlreadyHaveOffer_ForThisConnectionPoint()
                          }
                          onClick={send_offer}
                        >
                          send offer
                        </button>
                        <button
                          disabled={
                            !det_OfferSent ||
                            JSON.stringify(webrtcConnectionAnchorLocation_peer) !== JSON.stringify(webrtcConnectionAnchorLocation_peer_OfferSent) ||
                                                   
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer)
                          }
                          onClick={async (event) => {
                            if (webrtcConnectionAnchor_self_initiator.webrtcConnectionAnchorLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                            cancel_publish_localWebcamVideoStream(webrtcConnectionAnchor_self_initiator.rtcPeerConnection);
                            await cancel_send_OfferDescription(webrtcConnectionAnchor_self_initiator, webrtcConnectionAnchorLocation_peer);
                              
                            set_det_OfferSent(false);
                            set_webrtcConnectionAnchorLocation_peer_OfferSent(null);                                                          
                          }}
                        >
                          cancel offer
                        </button>
                        <span>{lobbyUserInfo_peer.lobbyUserStatus}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
             

            
                                                                                                                                

  const webrtcConnectionAnchor_self_acceptor = webrtcConnectionAnchor_self;
  const jsx_WebrtcConnectionRequestList = (
    <div style={{ border: '1px solid black' }}>
      {                                                                                                                                                                                    
                                                                                                   
                  }
      <div>
        offer received:
        <ul>
          {Array.from(
            mpp_webrtcConnectionAnchorId_self_rst.get(webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId)!.offerReceivedList.mpp_OfferSentReceived,
            ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
                                                                                                                                                    
                                                                                                                                                              
                                                                               
              return (
                <li key={signalserverWebsocketClientId_peer_msgFrom}>
                  msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                  <ul>
                    {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, gp_OfferReceived]) => {
                      return (
                        <li key={webrtcConnectionAnchorId_peer}>
                          <code>{webrtcConnectionAnchorId_peer}</code>
                          <ul>
                            {Array.from(gp_OfferReceived, ([webrtcConnectionEvent_uuid, webrtcConnectionEvent]) => {
                              if (gp_OfferReceived.size > 1)
                                console.error('Actually there can only be one offer from each webrtcConnectionAnchorId_peer... but I designed it as a group (Map) anyways ...')
                              if (!webrtcConnectionEvent.msg) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();
                              if (
                                webrtcConnectionAnchor_self_acceptor !==
                                get_webrtcConnectionAnchor_self(mpp_webrtcConnectionAnchorId_self_rst, webrtcConnectionEvent.msg.msgTo.webrtcConnectionAnchorId)
                              )
                                throw new TypeError();
                                                              
                                                                                                                                                                                                         
                                                                                                                       
                                               
                                  

                                                                                                                                             
                                                                                                                                              
                                                                                                                  
                                                                                                 
                                                                                                                                    
                                                                                                                                   
                                                                                          

                              const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);

                              return (
                                <li key={webrtcConnectionEvent_uuid}>
                                  <button
                                                                                                                             
                                    disabled={
                                      det_OfferSent ||
                                      detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(
                                        webrtcConnectionAnchorLocation_self,
                                        webrtcConnectionAnchorLocation_peer_initiator
                                      )
                                    }
                                    onClick={async function accept_offer() {
                                      if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                      publish_localWebcamVideoStream(webrtcConnectionAnchor_self_acceptor.rtcPeerConnection, wwebrtcConnectionAnchorself_acceptor.mediaStream_self);
                                      subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionAnchor_self_acceptor.rtcPeerConnection, wwebrtcConnectionAnchorself_acceptor.mediaStream_peer);
                                      if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                        throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                      if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self === null) throw new Error();
                                      if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                                        throw new TypeError();
                                      publish_IceCandidates(webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer_initiator, wwebrtcConnectionAnchorself_acceptor.rtcPeerConnection);                   
                                      await accept_OfferDescription___send_AnswerDescription(webrtcConnectionAnchor_self_acceptor, webrtcConnectionAnchorLocation_peer_initiator, webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain);                   

                                                                                                                             
                                                                 
                                      {
                                        webrtcConnectionAnchor_self_acceptor.offerReceivedList.removeAllExcept_OfferSentReceived(webrtcConnectionAnchorLocation_peer_initiator);
                                      }
                                                                                
                                                                                                                           

                                      set_mpp_webrtcConnectionAnchorId_self_rst!(new Map(mpp_webrtcConnectionAnchorId_self_rst));
                                      set_det_OfferAccepted(true);
                                    }}
                                  >
                                    accept offer
                                  </button>
                                  <button
                                    disabled={det_OfferAccepted}
                                    onClick={function decline_offer(event) {
                                      decline_offerDescription(webrtcConnectionAnchor_self_acceptor, webrtcConnectionAnchorLocation_peer_initiator);
                                      set_mpp_webrtcConnectionAnchorId_self_rst!(new Map(mpp_webrtcConnectionAnchorId_self_rst));
                                    }}
                                  >
                                    decline offer
                                  </button>
                                  <span>
                                    {
                                                                             
                                      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionEvent.msg.msgFrom).lobbyUserStatus
                                    }
                                  </span>
                                  <pre style={{ overflow: 'scroll' }}>{`msg: ${JSON.stringify(webrtcConnectionEvent)}`}</pre>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
             

                                                                                                                           
  const [offerReceivedList_rst, set_offerReceivedList_rst, offerReceivedList_rref] = useStateRef<OfferReceivedList>(new OfferReceivedList());
  React.useEffect(() => {
                                                                             
                                                                                                                                                
    initRun.socket.on(WebrtcConnectionEventType.offerSentPlain, (webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) => {
      const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
      if (webrtcConnectionEvent.msg.msgTo!.webrtcConnectionAnchorId !== webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) return;
      offerReceivedList_rref.current.add_OfferReceived(webrtcConnectionEvent);
      set_offerReceivedList_rst(new OfferReceivedList(offerReceivedList_rref.current));
    });
  }, []);

  const jsx_WebrtcConnectionRequestList_multi = (
    <div>
      offer received:
      <ul>
        {Array.from(offerReceivedList_rst.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionAnchorId_peer]) => {
          return (
            <li key={signalserverWebsocketClientId_peer_msgFrom}>
              msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
              <ul>
                {Array.from(mpp_webrtcConnectionAnchorId_peer, ([webrtcConnectionAnchorId_peer, gp_OfferReceived]) => {
                  return (
                    <li key={webrtcConnectionAnchorId_peer}>
                      <code>{webrtcConnectionAnchorId_peer}</code>
                      <ul>
                        {Array.from(gp_OfferReceived, ([webrtcConnectionEvent_uuid, webrtcConnectionEvent]) => {
                          if (gp_OfferReceived.size > 1)
                            console.error('Actually there can only be one offer from each webrtcConnectionAnchorId_peer... but I designed it as a group (Map) anyways ...')
                          if (!webrtcConnectionEvent.msg) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.webrtcConnectionAnchorId !== webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId) throw new TypeError();
                          if (webrtcConnectionAnchor_self_acceptor !== get_wwebrtcConnectionAnchorself(mpp_webrtcConnectionAnchorId_self_rst, webrtcConnectionEvent.msg.msgTo.webrtcConnectionAnchorId))
                            throw new TypeError();

                          const webrtcConnectionAnchorLocation_peer_initiator = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionAnchorId_peer);

                          return (
                            <li key={webrtcConnectionEvent_uuid}>
                              <button
                                onClick={async function accept_offer() {
                                  const eventSessionMailboxId = uuidv4();
                                  const eventSessionMailboxLifetimelength = 15 * 1000;

                                  if (webrtcConnectionEvent.eventSessionMailboxId == null) throw new TypeError();
                                  initRun.webrtcConnectionEventManager.sendEvent_oneTimeSessionMailbox(
                                    new WebrtcConnectionEvent(
                                      WebrtcConnectionEventType.offerAcceptedPlain,
                                      new SignalserverWebsocketMsg(null, webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer_initiator),
                                      eventSessionMailboxId,
                                      eventSessionMailboxLifetimelength
                                    ),
                                    initRun.socket,
                                    webrtcConnectionEvent.eventSessionMailboxId,
                                    webrtcConnectionAnchor_self_acceptor
                                  );

                                  async function listener_offerSent_sendAnswerWebrtcDescription(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                                    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                    if (webrtcConnectionEvent.eventType === WebrtcConnectionEventType.offerSent) {
                                      if (JSON.stringify(webrtcConnectionEvent.msg.msgFrom) === JSON.stringify(webrtcConnectionAnchorLocation_peer_initiator)) {
                                        if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                        publish_localWebcamVideoStream(webrtcConnectionAnchor_self_acceptor.rtcPeerConnection, wwebrtcConnectionAnchorself_acceptor.mediaStream_self);
                                        subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionAnchor_self_acceptor.rtcPeerConnection, wwebrtcConnectionAnchorself_acceptor.mediaStream_peer);
                                        if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                          throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                        if (webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self === null) throw new Error();
                                        if (
                                          webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp
                                        )
                                          throw new TypeError();
                                        publish_IceCandidates(webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self, webrtcConnectionAnchorLocation_peer_initiator, wwebrtcConnectionAnchorself_acceptor.rtcPeerConnection);                   

                                                                                                                                                                                                                                                                                                           

                                                                                                                                      
                                        {
                                          const offerDescription_plain = webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain;
                                                         
                                          await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));

                                                        
                                          const answerDescription = await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.createAnswer();
                                          await webrtcConnectionAnchor_self_acceptor.rtcPeerConnection.setLocalDescription(answerDescription);

                                          const answerDescription_plain: RTCSessionDescriptionInit_plain = {
                                            sdp: answerDescription.sdp,
                                            type: answerDescription.type,
                                          };

                                          if (webrtcConnectionEvent.eventSessionMailboxId == null) console.error(webrtcConnectionEvent.eventSessionMailboxId);
                                          if (webrtcConnectionEvent.eventSessionMailboxId == null) throw new TypeError();                                                                     

                                          initRun.webrtcConnectionEventManager.sendEvent_oneTimeSessionMailbox(
                                            new WebrtcConnectionEvent(
                                              WebrtcConnectionEventType.offerSent,
                                              new SignalserverWebsocketMsg(
                                                answerDescription_plain,
                                                webrtcConnectionAnchor_self_acceptor.webrtcConnectionAnchorLocation_self,
                                                webrtcConnectionAnchorLocation_peer_initiator
                                              )
                                                                       
                                                                                  
                                            ),
                                            initRun.socket,
                                            webrtcConnectionEvent.eventSessionMailboxId,
                                            webrtcConnectionAnchor_self_acceptor
                                          );

                                                                                                                                     
                                        }
                                      } else {
                                                                        
                                        throw new Error('Wrong sender?');
                                      }
                                    } else {
                                      throw new TypeError();
                                    }
                                  }

                                  initRun.socket.once(eventSessionMailboxId, listener_offerSent_sendAnswerWebrtcDescription);
                                  setTimeout(() => initRun.socket.off(eventSessionMailboxId, listener_offerSent_sendAnswerWebrtcDescription), eventSessionMailboxLifetimelength);                            

                                                                                                                                
                                }}
                              >
                                accept offer
                              </button>
                              <pre style={{ overflow: 'scroll' }}>{`msg: ${JSON.stringify(webrtcConnectionEvent)}`}</pre>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      {jsx_WebrtcConnectionAvailableList}
      {                                                 }
      {jsx_WebrtcConnectionRequestList_multi}
    </div>
  );
};
