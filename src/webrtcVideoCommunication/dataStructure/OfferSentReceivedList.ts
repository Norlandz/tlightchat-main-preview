import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { SignalserverWebsocketMsg, WebrtcConnectionEvent, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';

// ;bad-design; // dk is this proper@¦// ;bad-design; export interface OfferSentReceivedGp_Readonly {@¦// ;bad-design;   readonly gp_OfferSent: ReadonlyMap<string, WebrtcConnectionEvent>;@¦// ;bad-design;   readonly gp_OfferReceived: ReadonlyMap<string, WebrtcConnectionEvent>;@¦// ;bad-design; }@¦// ;bad-design; class OfferSentReceivedGp implements OfferSentReceivedGp_Readonly {@¦// ;bad-design;   readonly gp_OfferSent = new Map<string, WebrtcConnectionEvent>();@¦// ;bad-design;   readonly gp_OfferReceived = new Map<string, WebrtcConnectionEvent>();@¦// ;bad-design; }@¦// ;bad-design;@¦// ;bad-design; // feels that cate inside . , index base . or just info em . well ...@¦// ;bad-design; export class OfferSentReceivedList {@¦// ;bad-design;   private readonly _mpp_OfferSentReceived = new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, OfferSentReceivedGp>>();@¦// ;bad-design;   get mpp_OfferSentReceived(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, OfferSentReceivedGp_Readonly>> {@¦// ;bad-design;     return this._mpp_OfferSentReceived;@¦// ;bad-design;   }@¦// ;bad-design;@¦// ;bad-design;   add_OfferReceived(webrtcConnectionEvent: WebrtcConnectionEvent) {@¦// ;bad-design;     if (webrtcConnectionEvent.eventType !== WebrtcConnectionEventType.offerReceived) throw new TypeError();@¦// ;bad-design;     const msgFrom = webrtcConnectionEvent.msg.msgFrom;@¦// ;bad-design;     let mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgFrom.signalserverWebsocketClientId);@¦// ;bad-design;     if (mpp_webrtcConnectionAnchorId_peer === undefined) {@¦// ;bad-design;       mpp_webrtcConnectionAnchorId_peer = new Map<WebrtcConnectionAnchorId, OfferSentReceivedGp>();@¦// ;bad-design;       this._mpp_OfferSentReceived.set(msgFrom.signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer);@¦// ;bad-design;     }@¦// ;bad-design;     let offerSentReceivedGp = mpp_webrtcConnectionAnchorId_peer.get(msgFrom.webrtcConnectionAnchorId);@¦// ;bad-design;     if (offerSentReceivedGp === undefined) {@¦// ;bad-design;       offerSentReceivedGp = new OfferSentReceivedGp();@¦// ;bad-design;       mpp_webrtcConnectionAnchorId_peer.set(msgFrom.webrtcConnectionAnchorId, offerSentReceivedGp);@¦// ;bad-design;     }@¦// ;bad-design;     if (offerSentReceivedGp.gp_OfferReceived.has(webrtcConnectionEvent.uuid)) throw new TypeError();@¦// ;bad-design;     offerSentReceivedGp.gp_OfferReceived.set(webrtcConnectionEvent.uuid, webrtcConnectionEvent); // aga js dont use .equals ... ; aga cant do things in java just ....@¦// ;bad-design;   }@¦// ;bad-design;@¦// ;bad-design;   add_OfferSent(webrtcConnectionEvent: WebrtcConnectionEvent) {@¦// ;bad-design;     if (webrtcConnectionEvent.eventType !== WebrtcConnectionEventType.offerSent) throw new TypeError();@¦// ;bad-design;     const msgTo = webrtcConnectionEvent.msg.msgTo;@¦// ;bad-design;     if (msgTo === null || msgTo === undefined) throw new TypeError();@¦// ;bad-design;     let mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgTo.signalserverWebsocketClientId);@¦// ;bad-design;     if (mpp_webrtcConnectionAnchorId_peer === undefined) {@¦// ;bad-design;       mpp_webrtcConnectionAnchorId_peer = new Map<WebrtcConnectionAnchorId, OfferSentReceivedGp>();@¦// ;bad-design;       this._mpp_OfferSentReceived.set(msgTo.signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer);@¦// ;bad-design;     }@¦// ;bad-design;     let offerSentReceivedGp = mpp_webrtcConnectionAnchorId_peer.get(msgTo.webrtcConnectionAnchorId);@¦// ;bad-design;     if (offerSentReceivedGp === undefined) {@¦// ;bad-design;       offerSentReceivedGp = new OfferSentReceivedGp();@¦// ;bad-design;       mpp_webrtcConnectionAnchorId_peer.set(msgTo.webrtcConnectionAnchorId, offerSentReceivedGp);@¦// ;bad-design;     }@¦// ;bad-design;     if (offerSentReceivedGp.gp_OfferSent.has(webrtcConnectionEvent.uuid)) throw new TypeError();@¦// ;bad-design;     offerSentReceivedGp.gp_OfferSent.set(webrtcConnectionEvent.uuid, webrtcConnectionEvent);@¦// ;bad-design;   }@¦// ;bad-design;@¦// ;bad-design;   remove_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {@¦// ;bad-design;     const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);@¦// ;bad-design;     if (mpp_webrtcConnectionAnchorId_peer === undefined) throw new TypeError();@¦// ;bad-design;     if (!mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId)) throw new TypeError();@¦// ;bad-design;   }@¦// ;bad-design;@¦// ;bad-design;   get_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {@¦// ;bad-design;     const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);@¦// ;bad-design;     if (mpp_webrtcConnectionAnchorId_peer === undefined) throw new TypeError();@¦// ;bad-design;     return mpp_webrtcConnectionAnchorId_peer.get(msgToFrom.webrtcConnectionAnchorId);@¦// ;bad-design;   }@¦// ;bad-design;@¦// ;bad-design; }@¦// ;bad-design; feels that cate inside . , index base . or just info em . well ...

// del TP class OfferSentReceivedList {
// del TP   protected readonly _mpp_OfferSentReceived: Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, Map<string, SignalserverWebsocketMsg>>>;
// del TP   get mpp_OfferSentReceived(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, ReadonlyMap<string, SignalserverWebsocketMsg>>> {
// del TP     return this._mpp_OfferSentReceived;
// del TP   }
// del TP
// del TP   // .... @TP
// del TP   constructor(offerSentReceivedList_new?: OfferSentReceivedList) {
// del TP     this._mpp_OfferSentReceived = offerSentReceivedList_new
// del TP       ? offerSentReceivedList_new._mpp_OfferSentReceived
// del TP       : new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, Map<string, SignalserverWebsocketMsg>>>();
// del TP   }
// del TP
// del TP   // shallowCopy() {
// del TP
// del TP   // @messy-typeguard
// del TP   protected add_OfferSentReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg, varName_msgToFrom: keyof SignalserverWebsocketMsg & ('msgTo' | 'msgFrom')) {
// del TP     const msgToFrom = signalserverWebsocketMsg[varName_msgToFrom];
// del TP     if (msgToFrom == null) throw new TypeError();
// del TP     if (!(msgToFrom instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
// del TP
// del TP     // that || and && that know detection ... save that time debugg
// del TP     // if (webrtcConnectionEvent.eventType !== SignalserverWebsocketMsgType.offerSent && webrtcConnectionEvent.eventType !== SignalserverWebsocketMsgType.offerSentPlain) throw new TypeError(); // yes offerSent, not offerReceived, Received is deprecated for now. just focus To & From
// del TP     let mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
// del TP     if (mpp_webrtcConnectionAnchorId_peer === undefined) {
// del TP       mpp_webrtcConnectionAnchorId_peer = new Map<WebrtcConnectionAnchorId, Map<string, SignalserverWebsocketMsg>>();
// del TP       this._mpp_OfferSentReceived.set(msgToFrom.signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer);
// del TP     }
// del TP     let gp_OfferSent = mpp_webrtcConnectionAnchorId_peer.get(msgToFrom.webrtcConnectionAnchorId);
// del TP     if (gp_OfferSent === undefined) {
// del TP       gp_OfferSent = new Map<string, SignalserverWebsocketMsg>();
// del TP       mpp_webrtcConnectionAnchorId_peer.set(msgToFrom.webrtcConnectionAnchorId, gp_OfferSent);
// del TP     }
// del TP     if (gp_OfferSent.has(signalserverWebsocketMsg.uuid)) throw new TypeError();
// del TP     gp_OfferSent.set(signalserverWebsocketMsg.uuid, signalserverWebsocketMsg); // aga js dont use .equals ... ; aga cant do things in java just ....
// del TP   }
// del TP
// del TP   // actually.. better throw ... much better for debugging . those think h
// del TP   remove_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP     const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
// del TP     if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
// del TP       if (!mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId)) {
// del TP         throw new NoSuchItemException();
// del TP       }
// del TP     } else {
// del TP       throw new NoSuchItemException();
// del TP     }
// del TP   }
// del TP
// del TP   remove_OfferSentReceived_ifHas(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP     const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
// del TP     if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
// del TP       return mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId);
// del TP     } else {
// del TP       return undefined;
// del TP     }
// del TP   }
// del TP
// del TP   removeAllExcept_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP     for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
// del TP       if (signalserverWebsocketClientId_peer !== msgToFrom.signalserverWebsocketClientId) {
// del TP         this._mpp_OfferSentReceived.delete(signalserverWebsocketClientId_peer); // concurrent modification? // ~~~// seems only DOM / Java has such pb ? ...
// del TP       } else {
// del TP         for (const [webrtcConnectionAnchorId_peer, gp_event_OfferSentReceived] of mpp_webrtcConnectionAnchorId_peer) {
// del TP           if (webrtcConnectionAnchorId_peer !== msgToFrom.webrtcConnectionAnchorId) {
// del TP             mpp_webrtcConnectionAnchorId_peer.delete(webrtcConnectionAnchorId_peer);
// del TP           }
// del TP         }
// del TP       }
// del TP     }
// del TP   }
// del TP
// del TP   get_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP     const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
// del TP     if (mpp_webrtcConnectionAnchorId_peer === undefined) throw new TypeError();
// del TP     return mpp_webrtcConnectionAnchorId_peer.get(msgToFrom.webrtcConnectionAnchorId);
// del TP   }
// del TP   get_OfferSentReceived_NoAggresiveThrow(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP   // has_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
// del TP     return this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId)?.get(msgToFrom.webrtcConnectionAnchorId);
// del TP   }
// del TP
// del TP   get size_SignalserverWebsocketClientId(): number {
// del TP     return this._mpp_OfferSentReceived.size;
// del TP   }
// del TP
// del TP   get size_WebrtcConnectionAnchorId(): number {
// del TP     let size = 0;
// del TP     for (const [signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
// del TP       size += mpp_webrtcConnectionAnchorId_peer.size;
// del TP     }
// del TP     return size;
// del TP   }
// del TP }
// del TP
// del TP export class OfferSentList extends OfferSentReceivedList {
// del TP   add_OfferSent(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
// del TP     this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgTo');
// del TP   }
// del TP }
// del TP
// del TP export class OfferReceivedList extends OfferSentReceivedList {
// del TP   add_OfferReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
// del TP     this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom');
// del TP   }
// del TP }

class OfferSentReceivedList {
  protected readonly _mpp_OfferSentReceived: Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>>;
  get mpp_OfferSentReceived(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>> {
    return this._mpp_OfferSentReceived;
  }

  // .... @TP
  constructor(offerSentReceivedList_new?: OfferSentReceivedList) {
    this._mpp_OfferSentReceived = offerSentReceivedList_new
      ? offerSentReceivedList_new._mpp_OfferSentReceived
      : new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>>();
  }

  // shallowCopy() {

  // @messy-typeguard
  protected add_OfferSentReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg, varName_msgToFrom: keyof SignalserverWebsocketMsg & ('msgTo' | 'msgFrom')) {
    const msgToFrom = signalserverWebsocketMsg[varName_msgToFrom];
    if (msgToFrom == null) throw new TypeError();
    if (!(msgToFrom instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();

    // that || and && that know detection ... save that time debugg
    // if (webrtcConnectionEvent.eventType !== SignalserverWebsocketMsgType.offerSent && webrtcConnectionEvent.eventType !== SignalserverWebsocketMsgType.offerSentPlain) throw new TypeError(); // yes offerSent, not offerReceived, Received is deprecated for now. just focus To & From
    let mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer === undefined) {
      mpp_webrtcConnectionAnchorId_peer = new Map<WebrtcConnectionAnchorId, SignalserverWebsocketMsg>();
      this._mpp_OfferSentReceived.set(msgToFrom.signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer);
    }
    if (mpp_webrtcConnectionAnchorId_peer.has(msgToFrom.webrtcConnectionAnchorId)) throw new TypeError();
    mpp_webrtcConnectionAnchorId_peer.set(msgToFrom.webrtcConnectionAnchorId, signalserverWebsocketMsg);
  }

  // actually.. better throw ... much better for debugging . those think h
  remove_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
      if (!mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId)) {
        throw new NoSuchItemException();
      }
    } else {
      throw new NoSuchItemException();
    }
  }

  remove_OfferSentReceived_ifHas(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer !== undefined) {
      return mpp_webrtcConnectionAnchorId_peer.delete(msgToFrom.webrtcConnectionAnchorId);
    } else {
      return undefined;
    }
  }

  removeAllExcept_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      if (signalserverWebsocketClientId_peer !== msgToFrom.signalserverWebsocketClientId) {
        this._mpp_OfferSentReceived.delete(signalserverWebsocketClientId_peer); // concurrent modification? // ~~~// seems only DOM / Java has such pb ? ...
      } else {
        for (const [webrtcConnectionAnchorId_peer, signalserverWebsocketMsg] of mpp_webrtcConnectionAnchorId_peer) {
          if (webrtcConnectionAnchorId_peer !== msgToFrom.webrtcConnectionAnchorId) {
            mpp_webrtcConnectionAnchorId_peer.delete(webrtcConnectionAnchorId_peer);
          }
        }
      }
    }
  }

  toList(): WebrtcConnectionAnchorLocation[] {
    const list: WebrtcConnectionAnchorLocation[] = [];
    for (const [signalserverWebsocketClientId_peer, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      for (const [webrtcConnectionAnchorId_peer, signalserverWebsocketMsg] of mpp_webrtcConnectionAnchorId_peer) {
        list.push(new WebrtcConnectionAnchorLocation(signalserverWebsocketClientId_peer, webrtcConnectionAnchorId_peer));
      }
    }
    return list;
  }

  clear() {
    this._mpp_OfferSentReceived.clear();
  }

  get_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    const mpp_webrtcConnectionAnchorId_peer = this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId);
    if (mpp_webrtcConnectionAnchorId_peer === undefined) throw new TypeError();
    const signalserverWebsocketMsg_fromPeer = mpp_webrtcConnectionAnchorId_peer.get(msgToFrom.webrtcConnectionAnchorId);
    if (signalserverWebsocketMsg_fromPeer === undefined) throw new TypeError();
    return signalserverWebsocketMsg_fromPeer;
  }
  get_OfferSentReceived_NoAggresiveThrow(msgToFrom: WebrtcConnectionAnchorLocation) {
    // has_OfferSentReceived(msgToFrom: WebrtcConnectionAnchorLocation) {
    return this._mpp_OfferSentReceived.get(msgToFrom.signalserverWebsocketClientId)?.get(msgToFrom.webrtcConnectionAnchorId);
  }

  get size_SignalserverWebsocketClientId(): number {
    return this._mpp_OfferSentReceived.size;
  }

  get size_WebrtcConnectionAnchorId(): number {
    let size = 0;
    for (const [signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId_peer] of this._mpp_OfferSentReceived) {
      size += mpp_webrtcConnectionAnchorId_peer.size;
    }
    return size;
  }
}

export class OfferSentList extends OfferSentReceivedList {
  add_OfferSent(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgTo');
  }
}

export class OfferReceivedList extends OfferSentReceivedList {
  add_OfferReceived(signalserverWebsocketMsg: SignalserverWebsocketMsg) {
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom');
  }
}

export class OfferConnectedList extends OfferSentReceivedList {
  /**
   * (logic bit unsafe whatever)
   * this is not using the old signalserverWebsocketMsg... -- it doesnt only take offerDescription_Sent ; it takes offerDescription_Sent / offerDescription_Accepted_answerDescription_Sent ;
   * @param signalserverWebsocketMsg the msg received when offer is accepted
   * @param offerSentReceivedList if self is sender then use OfferSentList, if self is receiver then use OfferReceivedList
   */
  moveToSelfWithUpdate_OfferConnected(signalserverWebsocketMsg: SignalserverWebsocketMsg, offerSentReceivedList: OfferSentReceivedList) {
    // if (offerSentReceivedList instanceof OfferSentList) {
    //   if (!(signalserverWebsocketMsg.msgTo instanceof WebrtcConnectionAnchorLocation)) throw new TypeError();
    //   offerSentReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgTo);
    //   this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom'); // only take peer
    // } else if (offerSentReceivedList instanceof OfferReceivedList) {
    //   offerSentReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgFrom);
    //   this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom'); // only take peer
    // }
    offerSentReceivedList.remove_OfferSentReceived(signalserverWebsocketMsg.msgFrom);
    this.add_OfferSentReceived(signalserverWebsocketMsg, 'msgFrom'); // only take peer
  }
}
