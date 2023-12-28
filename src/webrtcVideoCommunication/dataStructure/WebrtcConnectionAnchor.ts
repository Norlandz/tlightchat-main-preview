import { OfferConnectedList, OfferReceivedList, OfferSentList } from './OfferSentReceivedList';
// @: dont randomly import things (-- dont use global var) ... this can hurt other dependencies (eg: signalserver)
// @pb: wont work outside of tsx scope ...
// import { initRun, signalserverWebsocketClientId_self_sessionReactApp } from '../../main';
// import { nanoid } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
// import { initRun } from '../../main'; // aga dont randomly import things ....
// import { AppDispatch } from '../reactContext/WebrtcConnectionAnchorIdContext';
// import { WebrtcConnectionStateMachineContext, WebrtcConnectionStateMachineEvent } from '../../WebrtcConnectionStateMachine';
import { WebrtcConnectionService } from '../service/WebrtcConnectionService';
import { WebrtcConnectionAnchorLocation, SignalserverWebsocketClientId, WebrtcConnectionAnchorId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { MppWebrtcConnectionAnchor } from './MppWebrtcConnectionAnchor';
import { SocketioClientSession_forWebrtcConnection } from '../service/EventEmitterNested_forWebrtcConnection';

// @pb[js hashMap .equals()]
// https://stackoverflow.com/questions/29759480/how-to-customize-object-equality-for-javascript-set

// @think-design: said, though can think finer in smaller scope (separate inside) -- for reuse & performance; but better just modularize
/**
@design-redraft:
- immutability is based on RTCPeerConnection, not WebrtcConnectionAnchor.
  WebrtcConnectionAnchor is designed to be mutable & flexible. 
  WebrtcConnectionAnchor is cope with the UI visualize. 
- dont discard the WebrtcConnectionAnchor on connection close,
  but do discard the RTCPeerConnection on connection close.
  as for _ finer control inside --ie: reuse after close _ RTCPeerConnection, dont wanna bother.
- the only must required & unique unit is based on webrtcConnectionAnchorLocation_self.
- the smallest elementary unit is base on webrtcConnectionAnchorLocation_self & RTCPeerConnection, not just RTCPeerConnection.
- the basic unit is based on webrtcConnectionAnchorLocation_self & RTCPeerConnection.
 */
export class WebrtcConnectionAnchor {
  // ########

  // @think-design,minor: though just WebrtcConnectionAnchorId should be sufficient, cuz this is local inside the SignalserverWebsocketClientId
  public readonly webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation;

  constructor(
    //
    signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId,
    socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection
  ) {
    this.webrtcConnectionAnchorLocation_self = new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_self_sessionReactApp, uuidv4() as WebrtcConnectionAnchorId);
    this.webrtcConnectionService = new WebrtcConnectionService(this, socketioClientSession_forWebrtcConnection);
    // nanoid() as WebrtcConnectionAnchorId
  }

  /**
   * @note: can ref to a group (semantically) (managed by a SfuServer), not just a single user
   * @note: only added until the connection is established -- not when the offer is sent
   * should i manage the currently connected to on the server or just local ?
   */
  public webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null = null;
  public rtcPeerConnection: RTCPeerConnection | null = null;
  public mediaStream_self: MediaStream | null = null;
  public mediaStream_peer: MediaStream | null = null;
  public connectionAnchorName_self: string | null = null;

  // private jsx_WebrtcConnectionAnchorRcomp: JSX.Element | null = null;
  // @not_sure-design // when taken outside of the scope -- must store that ref ... // (just not normal passing prop; but nested inside Redux)
  public set_mediaStreamLocalSelf_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;
  public set_mediaStreamRemotePeer_rst: React.Dispatch<React.SetStateAction<MediaStream | null>> | null = null;

  // ;archived[set_only_once]; // * the mess of dealing with another layer of id... feels bad, trying to encapsulate that detail ... dk if that is the proper way...@¦  // ;archived[set_only_once]; // The return type of a 'get' accessor must be assignable to its 'set' accessor type@¦  // ;archived[set_only_once]; //   Type 'null' is not assignable to type 'WebrtcConnectionAnchorLocation'.ts(2380)@¦  // ;archived[set_only_once]; // ~~~~// only now appears, but @set_only_once is needed@¦  // ;archived[set_only_once]; private _webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null = null; // need add later@¦  // ;archived[set_only_once]; /**@¦  // ;archived[set_only_once];  * @rule:@¦  // ;archived[set_only_once];  * when the peer connection is connected, this will be set.@¦  // ;archived[set_only_once];  * when only an offer is sent, but not yet connected, this will still be null.@¦  // ;archived[set_only_once];  *@¦  // ;archived[set_only_once];  * @set_only_once@¦  // ;archived[set_only_once];  *@¦  // ;archived[set_only_once];  */@¦  // ;archived[set_only_once]; // @ts-ignore@¦  // ;archived[set_only_once]; public get webrtcConnectionAnchorLocation_peer(): WebrtcConnectionAnchorLocation | null { return this._webrtcConnectionAnchorLocation_peer; } // prettier-ignore@¦  // ;archived[set_only_once]; public set webrtcConnectionAnchorLocation_peer(value: WebrtcConnectionAnchorLocation) { if (value === null) throw new TypeError(); if (this._webrtcConnectionAnchorLocation_peer !== null) throw new Error('Immutable Value Once Set'); this._webrtcConnectionAnchorLocation_peer = value; } // prettier-ignore@¦

  // ########
  /**
   * aga, only a list that shows the current state (temporary, in memory) (not the history / or to be persisted in database)
   * // wouldnt it be better if use setState as local state then?...
   */
  readonly offerSentList = new OfferSentList();
  readonly offerReceivedList = new OfferReceivedList();
  readonly offerConnectedList = new OfferConnectedList();

  // ########
  public readonly webrtcConnectionService: WebrtcConnectionService;

  // public unlisten__offer_Sent__plainRequest_NoConnectionSetup: (() => void) | null = null;

  // ########
  // aga the @maintain-delegate  design (& Xstate kinda  edk
  // lobbyUserStatus = LobbyUserStatus.available;
  // TODO sync and merge this

  // ########
  // @pb[immerjs readonly array assign pb] // test_arr: readonly string[] = []; // public history: readonly WebrtcConnectionEvent[] = [];

  // ########

  toString(): string {
    return JSON.stringify(this);
  }
}

// ############

export function get_webrtcConnectionAnchor_self_helper(
  mppWebrtcConnectionAnchor_rst: MppWebrtcConnectionAnchor,
  webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation
): WebrtcConnectionAnchor {
  const webrtcConnectionAnchor_self = mppWebrtcConnectionAnchor_rst.get(webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId);
  if (webrtcConnectionAnchor_self == null) throw new TypeError();
  return webrtcConnectionAnchor_self;
}
