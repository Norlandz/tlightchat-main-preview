import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { SignalserverWebsocketClientId, WebrtcConnectionEvent, WebrtcConnectionEventType, WebrtcConnectionPointId, WebrtcConnectionPointLocation } from '../messageSchema/WebSocketMessage';

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

class OfferSentReceivedList {
  protected readonly _mpp_OfferSentReceived: Map<SignalserverWebsocketClientId, Map<WebrtcConnectionPointId, Map<string, WebrtcConnectionEvent>>>;
  get mpp_OfferSentReceived(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionPointId, ReadonlyMap<string, WebrtcConnectionEvent>>> {
    return this._mpp_OfferSentReceived;
  }

             
  constructor(offerSentReceivedList_new?: OfferSentReceivedList) {
    this._mpp_OfferSentReceived = offerSentReceivedList_new
      ? offerSentReceivedList_new._mpp_OfferSentReceived
      : new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionPointId, Map<string, WebrtcConnectionEvent>>>();
  }

                    

                                                                          
  remove_OfferSentReceived(msgToFrom: WebrtcConnectionPointLocation) {
    const mpp_webrtcConnectionPointId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId_peer !== undefined) {
      if (!mpp_webrtcConnectionPointId_peer.delete(msgToFrom.webrtcConnectionPointId)) {
        throw new NoSuchItemException();
      }
    } else {
      throw new NoSuchItemException();
    }
  }

  remove_OfferSentReceived_ifHas(msgToFrom: WebrtcConnectionPointLocation) {
    const mpp_webrtcConnectionPointId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId_peer !== undefined) {
      return mpp_webrtcConnectionPointId_peer.delete(msgToFrom.webrtcConnectionPointId);
    } else {
      return undefined;
    }
  }

  removeAllExcept_OfferSentReceived(msgToFrom: WebrtcConnectionPointLocation) {
    for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionPointId_peer] of this._mpp_OfferSentReceived) {
      if (signalserverWebsocketClientId_peer !== msgToFrom.signalserverWebsocketClientId) {
        this._mpp_OfferSentReceived.delete(signalserverWebsocketClientId_peer);                                                                             
      } else {
        for (const [webrtcConnectionPointId_peer, gp_event_OfferSentReceived] of mpp_webrtcConnectionPointId_peer) {
          if (webrtcConnectionPointId_peer !== msgToFrom.webrtcConnectionPointId) {
            mpp_webrtcConnectionPointId_peer.delete(webrtcConnectionPointId_peer);
          }
        }
      }
    }
  }

  get_OfferSentReceived(msgToFrom: WebrtcConnectionPointLocation) {
    const mpp_webrtcConnectionPointId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId_peer === undefined) throw new TypeError();
    return mpp_webrtcConnectionPointId_peer.get(msgToFrom.webrtcConnectionPointId);
  }

  get size_SignalserverWebsocketClientId(): number {
    return this._mpp_OfferSentReceived.size;
  }

  get size_WebrtcConnectionPointId(): number {
    let size = 0;
    for (const [signalserverWebsocketClientId, mpp_webrtcConnectionPointId_peer] of this._mpp_OfferSentReceived) {
      size += mpp_webrtcConnectionPointId_peer.size;
    }
    return size;
  }
}

export class OfferSentList extends OfferSentReceivedList {
  add_OfferSent(webrtcConnectionEvent: WebrtcConnectionEvent) {
    if (webrtcConnectionEvent.eventType !== WebrtcConnectionEventType.offerSent) throw new TypeError();
    const msgTo = webrtcConnectionEvent.msg.msgTo;
    if (msgTo === null || msgTo === undefined) throw new TypeError();
    let mpp_webrtcConnectionPointId_peer = this._mpp_OfferSentReceived.get(msgTo.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId_peer === undefined) {
      mpp_webrtcConnectionPointId_peer = new Map<WebrtcConnectionPointId, Map<string, WebrtcConnectionEvent>>();
      this._mpp_OfferSentReceived.set(msgTo.signalserverWebsocketClientId, mpp_webrtcConnectionPointId_peer);
    }
    let gp_OfferSent = mpp_webrtcConnectionPointId_peer.get(msgTo.webrtcConnectionPointId);
    if (gp_OfferSent === undefined) {
      gp_OfferSent = new Map<string, WebrtcConnectionEvent>();
      mpp_webrtcConnectionPointId_peer.set(msgTo.webrtcConnectionPointId, gp_OfferSent);
    }
    if (gp_OfferSent.has(webrtcConnectionEvent.uuid)) throw new TypeError();
    gp_OfferSent.set(webrtcConnectionEvent.uuid, webrtcConnectionEvent);                                                                      
  }
}

export class OfferReceivedList extends OfferSentReceivedList {
  add_OfferReceived(webrtcConnectionEvent: WebrtcConnectionEvent) {
                                                                                                              
             
                                                                   
    if (webrtcConnectionEvent.eventType !== WebrtcConnectionEventType.offerSent && webrtcConnectionEvent.eventType !== WebrtcConnectionEventType.offerSentPlain) throw new TypeError();                                                                                          
    const msgFrom = webrtcConnectionEvent.msg.msgFrom;
    let mpp_webrtcConnectionPointId_peer = this._mpp_OfferSentReceived.get(msgFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionPointId_peer === undefined) {
      mpp_webrtcConnectionPointId_peer = new Map<WebrtcConnectionPointId, Map<string, WebrtcConnectionEvent>>();
      this._mpp_OfferSentReceived.set(msgFrom.signalserverWebsocketClientId, mpp_webrtcConnectionPointId_peer);
    }
    let gp_OfferReceived = mpp_webrtcConnectionPointId_peer.get(msgFrom.webrtcConnectionPointId);
    if (gp_OfferReceived === undefined) {
      gp_OfferReceived = new Map<string, WebrtcConnectionEvent>();
      mpp_webrtcConnectionPointId_peer.set(msgFrom.webrtcConnectionPointId, gp_OfferReceived);
    }
    if (gp_OfferReceived.has(webrtcConnectionEvent.uuid)) throw new TypeError();
    gp_OfferReceived.set(webrtcConnectionEvent.uuid, webrtcConnectionEvent);
  }
}
