import React from 'react';
import {
  SignalserverWebsocketMsgType,
  SignalserverWebsocketMsg,
  WebrtcConnectionPointLocation,
  WebrtcConnectionPointId,
  WebrtcConnectionEvent,
  WebrtcConnectionEventType,
} from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionLinkage, get_webrtcConnectionLinkage_self, get_webrtcConnectionLinkage_withNoPeer } from '../dataStructure/WebrtcConnectionLinkage';
import { initRun, signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
import { WebrtcConnectionPointIdContext } from '../reactContext/WebrtcConnectionPointIdContext';
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

               

export interface RTCSessionDescriptionInit_plain extends RTCSessionDescriptionInit {
  sdp: string | undefined;
  type: RTCSdpType;
}
                                         
                                                                                                       
                                                               

async function send_OfferDescription(webrtcConnectionLinkage_self_initiator: WebrtcConnectionLinkage, webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation) {
                
                 
  const offerDescription = await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.createOffer();
  await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setLocalDescription(offerDescription);

                                                         
  const offerDescription_plain: RTCSessionDescriptionInit_plain = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

                                                                                                  
                                                                                                                                                                   
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(offerDescription_plain, webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.offerSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage_self_initiator);
                                                                                   

  webrtcConnectionLinkage_self_initiator.offerSentList.add_OfferSent(webrtcConnectionEvent);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

async function cancel_send_OfferDescription(webrtcConnectionLinkage_self_initiator: WebrtcConnectionLinkage, webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation) {
  await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setLocalDescription(undefined);             

  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.cancelSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage_self_initiator);

  webrtcConnectionLinkage_self_initiator.offerSentList.remove_OfferSentReceived(webrtcConnectionPointLocation_peer);
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
   
                                                                       
                                
                                      
                                            
   
async function accept_OfferDescription___send_AnswerDescription(
  webrtcConnectionLinkage_self_acceptor: WebrtcConnectionLinkage,
  webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation,
  offerDescription_plain: RTCSessionDescriptionInit_plain
) {
                 
  await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));

                
  const answerDescription = await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.createAnswer();
  await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.setLocalDescription(answerDescription);

  const answerDescription_plain: RTCSessionDescriptionInit_plain = {
    sdp: answerDescription.sdp,
    type: answerDescription.type,
  };

  if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_peer !== null) throw new TypeError();
  webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_peer = webrtcConnectionPointLocation_peer;

                                                                                                   
                                                                                                                                                                   
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg( answerDescription_plain, webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self, webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_peer );                   
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.answerSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage_self_acceptor);
                                                                                 
                                                                 
                                    
                                                             
                                                                                                                         
         
                 
                     
                   
                                        
}

function decline_offerDescription(webrtcConnectionLinkage_acceptor: WebrtcConnectionLinkage, webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation) {
  const signalserverWebsocketMsg = new SignalserverWebsocketMsg(null, webrtcConnectionLinkage_acceptor.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer);
  const webrtcConnectionEvent = new WebrtcConnectionEvent(WebrtcConnectionEventType.declineSent, signalserverWebsocketMsg);
  initRun.webrtcConnectionEventManager.sendEvent(webrtcConnectionEvent, initRun.socket, webrtcConnectionLinkage_acceptor);

  webrtcConnectionLinkage_acceptor.offerReceivedList.remove_OfferSentReceived(webrtcConnectionPointLocation_peer);                                          
}

function publish_IceCandidates(webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation, webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation, pc: RTCPeerConnection) {
                                                                                 
                                                                                                  
                                
                                                     
  pc.onicecandidate = (event) => {
    if (event.candidate === null) return;
                                    
    initRun.socket.emit(SignalserverWebsocketMsgType.iceCandidate, new SignalserverWebsocketMsg(event.candidate.toJSON(), webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer));
  };

                                                                        
                                                                                                                                
                                                                                             
                                                                                 
      
}

               

export const WebrtcConnectionLobbyUserListPanel: React.FC<{ webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation }> = ({ webrtcConnectionPointLocation_self }) => {
                                                                                                                     
                                                                                                                                
                                                  
  const { mpp_webrtcConnectionPointId_self_rst, set_mpp_webrtcConnectionPointId_self_rst, mpp_webrtcConnectionPointId_self_rref, lobbyUserList_rst, set_lobbyUserList_rst, lobbyUserList_rref, } = React.useContext(WebrtcConnectionPointIdContext);                   
  if (lobbyUserList_rst === null || lobbyUserList_rst === undefined) throw new TypeError();

  const [webrtcConnectionPointLocation_peer_OfferSent, set_webrtcConnectionPointLocation_peer_OfferSent] = React.useState<WebrtcConnectionPointLocation | null>(null);
  const [det_OfferSent, set_det_OfferSent] = React.useState<boolean>(false);
  const [det_OfferAccepted, set_det_OfferAccepted] = React.useState<boolean>(false);

                                                                                                                                                                                                                                                                                      
  const webrtcConnectionLinkage_self = get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self_rst, webrtcConnectionPointLocation_self.webrtcConnectionPointId);                                      

                                                                                                                                    
                                                
                                                                                                               
                                   
                                                                          

                                                                              
                         
                                
                                                                                                   
                                                                                       
      

                          
                       
                                  
                              
                                         
                                          
                      
                            
                                                                                                   
                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  function detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(
    webrtcConnectionPointLocation_self: WebrtcConnectionPointLocation,
    webrtcConnectionPointLocation_peer: WebrtcConnectionPointLocation
  ) {
                                                          
                                                     
                                                                                                
                                                                                      
                           
                      
        
    try {
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionPointLocation_self);
    } catch (e) {
      if (!(e instanceof NoSuchItemException)) throw new TypeError();
      console.error(
        'lobbyUserList_rst must contain this webrtcConnectionPointLocation_self, ' +
          '\nif not, that means: the signal server havent update it / have updated it but client doesnt have a time to process it -- cuz you are still inside the process of creating it. ' +
          '\n-- so just wait for the Creation done, the lobbyUserList will be updated & rerendered here. ' +
          '\n-- you can safely ignore this Error if it correctly rerendered & displayed' +
          '\nSeems no good design to avoid this, cuz you are reling on the lobbyUserList that may or may not be stale.'
                                                         
                                                                                                             
                                                    
      );
      return lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionPointLocation_peer).lobbyUserStatus === LobbyUserStatus.occupied;
    }
    return (
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionPointLocation_self).lobbyUserStatus === LobbyUserStatus.occupied ||
      lobbyUserList_rst.get_lobbyUserInfo(webrtcConnectionPointLocation_peer).lobbyUserStatus === LobbyUserStatus.occupied
    );
  }
                                                                                                       

            

                                           
                                           
                                                                         
                                                                                                                                                 
                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                
                                                                                                                                                        

  const webrtcConnectionLinkage_self_initiator = webrtcConnectionLinkage_self;
  const jsx_WebrtcConnectionAvailableList = (
    <div style={{ border: '1px solid black' }}>
      {
                      
                    
                       
                         
                                                                                                                           
                                                            
                           
                                                                                                                                         
                                                                              
                                   
                                                                    
                                                                                                                                                                
                                  
                             
                            
                            
                          
                        
                       
      }
      <div>
        lobbyUserList_rst: (except self)
        <ul>
          {Array.from(lobbyUserList_rst.mpp_signalserverWebsocketClientId, ([signalserverWebsocketClientId_peer, mpp_webrtcConnectionPointId_peer]) => {
            if (signalserverWebsocketClientId_peer === signalserverWebsocketClientId_self_sessionReactApp) return null;                
                                   

                                                                                                              
                                                 
                                                                                                                                                              
                                                                                              
                                                                            
                                                          
                                                                                                                                                  
                                
                              

                    
                                                                                             
            if (det_OfferSent && webrtcConnectionLinkage_self_initiator.offerSentList.size_WebrtcConnectionPointId === 0) {
              set_det_OfferSent(false);
              set_webrtcConnectionPointLocation_peer_OfferSent(null);
            }

            return (
              <li key={signalserverWebsocketClientId_peer}>
                signalserverWebsocketClientId_peer: <code>{signalserverWebsocketClientId_peer}</code> <br />
                mpp_webrtcConnectionPointId_peer:
                <ul>
                  {Array.from(mpp_webrtcConnectionPointId_peer, ([webrtcConnectionPointId_peer, lobbyUserInfo_peer]) => {
                    const webrtcConnectionPointLocation_peer = new WebrtcConnectionPointLocation(signalserverWebsocketClientId_peer, webrtcConnectionPointId_peer);
                                                                   
                                           
                                                           
                                                  
                                                                 

                    function detm_AlreadyHaveOffer_ForThisConnectionPoint() {
                                                                                    
                      const mpp_webrtcConnectionPointId_peer = mpp_webrtcConnectionPointId_self_rst
                        .get(webrtcConnectionPointLocation_self.webrtcConnectionPointId)!
                        .offerReceivedList.mpp_OfferSentReceived.get(signalserverWebsocketClientId_peer);
                      if (mpp_webrtcConnectionPointId_peer !== undefined) {
                        const gp_OfferReceived = mpp_webrtcConnectionPointId_peer.get(webrtcConnectionPointId_peer);
                        if (gp_OfferReceived !== undefined) {
                          for (const [webrtcConnectionEvent_uuid, webrtcConnectionEvent] of gp_OfferReceived) {
                            if (webrtcConnectionEvent.msg.msgTo!.webrtcConnectionPointId === webrtcConnectionPointLocation_self.webrtcConnectionPointId) {
                              return true;
                            }
                          }
                        }
                      }
                      return false;
                    }

                    async function send_offer() {
                      if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                      publish_localWebcamVideoStream(webrtcConnectionLinkage_self_initiator.rtcPeerConnection, webrtcConnectionLinkage_self_initiator.mediaStream_self);
                      subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionLinkage_self_initiator.rtcPeerConnection, webrtcConnectionLinkage_self_initiator.mediaStream_peer);
                      if (signalserverWebsocketClientId_self_sessionReactApp === null)
                        throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                      if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self === null) throw new Error();
                      if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                        throw new TypeError();
                      publish_IceCandidates(webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer, webrtcConnectionLinkage_self_initiator.rtcPeerConnection);                   
                      await send_OfferDescription(webrtcConnectionLinkage_self_initiator, webrtcConnectionPointLocation_peer);                   
                                                                                          
                                                                                                                                     
                                                                                                                  
                                                           
                                                                    
                                               
                                                                                                             
                                                                
                                                                                                                                                                                
                      set_mpp_webrtcConnectionPointId_self_rst!(new Map(mpp_webrtcConnectionPointId_self_rst));
                        
                      set_det_OfferSent(true);
                      set_webrtcConnectionPointLocation_peer_OfferSent(webrtcConnectionPointLocation_peer);
                    }

                                                                                                      
                    return (
                      <li key={JSON.stringify(webrtcConnectionPointLocation_peer)}>
                        <code>{webrtcConnectionPointId_peer}</code>
                        <button
                          disabled={
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer) ||
                            detm_AlreadyHaveOffer_ForThisConnectionPoint()
                          }
                                                                                                                                                                                                                                                  
                          onClick={async function send_offer_plain() {
                            const eventSessionMailboxId = uuidv4();
                            const eventSessionMailboxLifetimelength = 3 * 60 * 1000;

                            initRun.webrtcConnectionEventManager.sendEvent(
                              new WebrtcConnectionEvent(
                                WebrtcConnectionEventType.offerSentPlain,
                                new SignalserverWebsocketMsg(null, webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer),
                                eventSessionMailboxId,
                                eventSessionMailboxLifetimelength                              
                              ),
                              initRun.socket,
                              webrtcConnectionLinkage_self_initiator
                            );
                                                                                  
                                                                                                                                    
                                                                                                     
                                                                       
                                                                         

                                                                                   

                            async function listener_offerAcceptPlain_sendOfferWebrtcDescription(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                              const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                              if (webrtcConnectionEvent.eventType === WebrtcConnectionEventType.offerAcceptedPlain) {
                                if (JSON.stringify(webrtcConnectionEvent.msg.msgFrom) === JSON.stringify(webrtcConnectionPointLocation_peer)) {
                                                        
                                                                                                                                                  

                                                                                                                                                       

                                                                                                                  

                                  const eventSessionMailboxId = uuidv4();
                                  const eventSessionMailboxLifetimelength = 15 * 1000;

                                  if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                  publish_localWebcamVideoStream(webrtcConnectionLinkage_self_initiator.rtcPeerConnection, webrtcConnectionLinkage_self_initiator.mediaStream_self);
                                  subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionLinkage_self_initiator.rtcPeerConnection, webrtcConnectionLinkage_self_initiator.mediaStream_peer);
                                  if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                    throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                  if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self === null) throw new Error();
                                  if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                                    throw new TypeError();
                                  publish_IceCandidates(webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer, webrtcConnectionLinkage_self_initiator.rtcPeerConnection);                   
                                                                                                                                                                
                                                                                                                              
                                  {
                                    const offerDescription = await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.createOffer();
                                    await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setLocalDescription(offerDescription);

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
                                          webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_self,
                                          webrtcConnectionPointLocation_peer
                                        ),
                                        eventSessionMailboxId,
                                        eventSessionMailboxLifetimelength
                                      ),
                                      initRun.socket,
                                      webrtcConnectionEvent.eventSessionMailboxId,
                                      webrtcConnectionLinkage_self_initiator
                                    );

                                                                                                                                 
                                  }

                                                                                                              
                                  async function listener_offerSent_acceptAnswer(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                                    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);

                                    await webrtcConnectionLinkage_self_initiator.rtcPeerConnection.setRemoteDescription(
                                      new RTCSessionDescription(webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain)
                                    );
                                    webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_peer = webrtcConnectionEvent.msg.msgFrom;
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
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer) ||
                            detm_AlreadyHaveOffer_ForThisConnectionPoint()
                          }
                          onClick={send_offer}
                        >
                          send offer
                        </button>
                        <button
                          disabled={
                            !det_OfferSent ||
                            JSON.stringify(webrtcConnectionPointLocation_peer) !== JSON.stringify(webrtcConnectionPointLocation_peer_OfferSent) ||
                                                   
                            detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer)
                          }
                          onClick={async (event) => {
                            if (webrtcConnectionLinkage_self_initiator.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                            cancel_publish_localWebcamVideoStream(webrtcConnectionLinkage_self_initiator.rtcPeerConnection);
                            await cancel_send_OfferDescription(webrtcConnectionLinkage_self_initiator, webrtcConnectionPointLocation_peer);
                              
                            set_det_OfferSent(false);
                            set_webrtcConnectionPointLocation_peer_OfferSent(null);                                                          
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
             

            
                                                                                                                                

  const webrtcConnectionLinkage_self_acceptor = webrtcConnectionLinkage_self;
  const jsx_WebrtcConnectionRequestList = (
    <div style={{ border: '1px solid black' }}>
      {                                                                                                                                                                                    
                                                                                                   
                  }
      <div>
        offer received:
        <ul>
          {Array.from(
            mpp_webrtcConnectionPointId_self_rst.get(webrtcConnectionPointLocation_self.webrtcConnectionPointId)!.offerReceivedList.mpp_OfferSentReceived,
            ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionPointId_peer]) => {
                                                                                                                                                  
                                                                                                                                                            
                                                                               
              return (
                <li key={signalserverWebsocketClientId_peer_msgFrom}>
                  msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
                  <ul>
                    {Array.from(mpp_webrtcConnectionPointId_peer, ([webrtcConnectionPointId_peer, gp_OfferReceived]) => {
                      return (
                        <li key={webrtcConnectionPointId_peer}>
                          <code>{webrtcConnectionPointId_peer}</code>
                          <ul>
                            {Array.from(gp_OfferReceived, ([webrtcConnectionEvent_uuid, webrtcConnectionEvent]) => {
                              if (gp_OfferReceived.size > 1)
                                console.error('Actually there can only be one offer from each webrtcConnectionPointId_peer... but I designed it as a group (Map) anyways ...')
                              if (!webrtcConnectionEvent.msg) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== webrtcConnectionPointLocation_self.signalserverWebsocketClientId) throw new TypeError();
                              if (webrtcConnectionEvent.msg.msgTo.webrtcConnectionPointId !== webrtcConnectionPointLocation_self.webrtcConnectionPointId) throw new TypeError();
                              if (
                                webrtcConnectionLinkage_self_acceptor !==
                                get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self_rst, webrtcConnectionEvent.msg.msgTo.webrtcConnectionPointId)
                              )
                                throw new TypeError();
                                                              
                                                                                                                                                                                                      
                                                                                                                       
                                               
                                  

                                                                                                                                             
                                                                                                                                              
                                                                                                                  
                                                                                                 
                                                                                                                                    
                                                                                                                                   
                                                                                          

                              const webrtcConnectionPointLocation_peer_initiator = new WebrtcConnectionPointLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionPointId_peer);

                              return (
                                <li key={webrtcConnectionEvent_uuid}>
                                  <button
                                                                                                                             
                                    disabled={
                                      det_OfferSent ||
                                      detm_SelfOccupied_or_PeerOccupied_or__unableToDetm_CuzDuringInitCreationStateIsStale(
                                        webrtcConnectionPointLocation_self,
                                        webrtcConnectionPointLocation_peer_initiator
                                      )
                                    }
                                    onClick={async function accept_offer() {
                                      if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                      publish_localWebcamVideoStream(webrtcConnectionLinkage_self_acceptor.rtcPeerConnection, webrtcConnectionLinkage_self_acceptor.mediaStream_self);
                                      subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionLinkage_self_acceptor.rtcPeerConnection, webrtcConnectionLinkage_self_acceptor.mediaStream_peer);
                                      if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                        throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                      if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self === null) throw new Error();
                                      if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp)
                                        throw new TypeError();
                                      publish_IceCandidates(webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer_initiator, webrtcConnectionLinkage_self_acceptor.rtcPeerConnection);                   
                                      await accept_OfferDescription___send_AnswerDescription(webrtcConnectionLinkage_self_acceptor, webrtcConnectionPointLocation_peer_initiator, webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain);                   

                                                                                                                             
                                                                 
                                      {
                                        webrtcConnectionLinkage_self_acceptor.offerReceivedList.removeAllExcept_OfferSentReceived(webrtcConnectionPointLocation_peer_initiator);
                                      }
                                                                                
                                                                                                                           

                                      set_mpp_webrtcConnectionPointId_self_rst!(new Map(mpp_webrtcConnectionPointId_self_rst));
                                      set_det_OfferAccepted(true);
                                    }}
                                  >
                                    accept offer
                                  </button>
                                  <button
                                    disabled={det_OfferAccepted}
                                    onClick={function decline_offer(event) {
                                      decline_offerDescription(webrtcConnectionLinkage_self_acceptor, webrtcConnectionPointLocation_peer_initiator);
                                      set_mpp_webrtcConnectionPointId_self_rst!(new Map(mpp_webrtcConnectionPointId_self_rst));
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
      if (webrtcConnectionEvent.msg.msgTo!.webrtcConnectionPointId !== webrtcConnectionPointLocation_self.webrtcConnectionPointId) return;
      offerReceivedList_rref.current.add_OfferReceived(webrtcConnectionEvent);
      set_offerReceivedList_rst(new OfferReceivedList(offerReceivedList_rref.current));
    });
  }, []);

  const jsx_WebrtcConnectionRequestList_multi = (
    <div>
      offer received:
      <ul>
        {Array.from(offerReceivedList_rst.mpp_OfferSentReceived, ([signalserverWebsocketClientId_peer_msgFrom, mpp_webrtcConnectionPointId_peer]) => {
          return (
            <li key={signalserverWebsocketClientId_peer_msgFrom}>
              msgFrom: <code>{signalserverWebsocketClientId_peer_msgFrom}</code>
              <ul>
                {Array.from(mpp_webrtcConnectionPointId_peer, ([webrtcConnectionPointId_peer, gp_OfferReceived]) => {
                  return (
                    <li key={webrtcConnectionPointId_peer}>
                      <code>{webrtcConnectionPointId_peer}</code>
                      <ul>
                        {Array.from(gp_OfferReceived, ([webrtcConnectionEvent_uuid, webrtcConnectionEvent]) => {
                          if (gp_OfferReceived.size > 1)
                            console.error('Actually there can only be one offer from each webrtcConnectionPointId_peer... but I designed it as a group (Map) anyways ...')
                          if (!webrtcConnectionEvent.msg) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo == null) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.signalserverWebsocketClientId !== webrtcConnectionPointLocation_self.signalserverWebsocketClientId) throw new TypeError();
                          if (webrtcConnectionEvent.msg.msgTo.webrtcConnectionPointId !== webrtcConnectionPointLocation_self.webrtcConnectionPointId) throw new TypeError();
                          if (webrtcConnectionLinkage_self_acceptor !== get_webrtcConnectionLinkage_self(mpp_webrtcConnectionPointId_self_rst, webrtcConnectionEvent.msg.msgTo.webrtcConnectionPointId))
                            throw new TypeError();

                          const webrtcConnectionPointLocation_peer_initiator = new WebrtcConnectionPointLocation(signalserverWebsocketClientId_peer_msgFrom, webrtcConnectionPointId_peer);

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
                                      new SignalserverWebsocketMsg(null, webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer_initiator),
                                      eventSessionMailboxId,
                                      eventSessionMailboxLifetimelength
                                    ),
                                    initRun.socket,
                                    webrtcConnectionEvent.eventSessionMailboxId,
                                    webrtcConnectionLinkage_self_acceptor
                                  );

                                  async function listener_offerSent_sendAnswerWebrtcDescription(webrtcConnectionEvent_jsobj: WebrtcConnectionEvent) {
                                    const webrtcConnectionEvent = ClassTransformer.plainToInstance(WebrtcConnectionEvent, webrtcConnectionEvent_jsobj as unknown);
                                    if (webrtcConnectionEvent.eventType === WebrtcConnectionEventType.offerSent) {
                                      if (JSON.stringify(webrtcConnectionEvent.msg.msgFrom) === JSON.stringify(webrtcConnectionPointLocation_peer_initiator)) {
                                        if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_peer !== null) throw new AlreadyConnectedWithAPeerException();
                                        publish_localWebcamVideoStream(webrtcConnectionLinkage_self_acceptor.rtcPeerConnection, webrtcConnectionLinkage_self_acceptor.mediaStream_self);
                                        subscribe_RemoteWebcamVideoStreamFromPeer(webrtcConnectionLinkage_self_acceptor.rtcPeerConnection, webrtcConnectionLinkage_self_acceptor.mediaStream_peer);
                                        if (signalserverWebsocketClientId_self_sessionReactApp === null)
                                          throw new Error('Should have been assigned from SignalServer already. Is the SignalServer es WebSocket not sending back this unique id?');
                                        if (webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self === null) throw new Error();
                                        if (
                                          webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self.signalserverWebsocketClientId !== signalserverWebsocketClientId_self_sessionReactApp
                                        )
                                          throw new TypeError();
                                        publish_IceCandidates(webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self, webrtcConnectionPointLocation_peer_initiator, webrtcConnectionLinkage_self_acceptor.rtcPeerConnection);                   

                                                                                                                                                                                                                                                                                                           

                                                                                                                                    
                                        {
                                          const offerDescription_plain = webrtcConnectionEvent.msg.msgData as RTCSessionDescriptionInit_plain;
                                                         
                                          await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription_plain));

                                                        
                                          const answerDescription = await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.createAnswer();
                                          await webrtcConnectionLinkage_self_acceptor.rtcPeerConnection.setLocalDescription(answerDescription);

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
                                                webrtcConnectionLinkage_self_acceptor.webrtcConnectionPointLocation_self,
                                                webrtcConnectionPointLocation_peer_initiator
                                              )
                                                                       
                                                                                  
                                            ),
                                            initRun.socket,
                                            webrtcConnectionEvent.eventSessionMailboxId,
                                            webrtcConnectionLinkage_self_acceptor
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
