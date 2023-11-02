import { Socket } from 'socket.io-client';
import { WebrtcConnectionLinkage } from '../dataStructure/WebrtcConnectionLinkage';
import { WebrtcConnectionEvent, WebrtcConnectionEventType } from '../messageSchema/WebSocketMessage';

export class WebrtcConnectionEventManager {
                                                               
  sendEvent(event: WebrtcConnectionEvent, socket: Socket, webrtcConnectionLinkage: WebrtcConnectionLinkage) {
    socket.emit(event.eventType, event);
    webrtcConnectionLinkage.webrtcConnectionEventHistory.push(event);
  }

  receiveEvent(event: WebrtcConnectionEvent, webrtcConnectionLinkage: WebrtcConnectionLinkage) {
    webrtcConnectionLinkage.webrtcConnectionEventHistory.push(event);
  }

  sendEvent_oneTimeSessionMailbox(webrtcConnectionEvent: WebrtcConnectionEvent, socket: Socket, eventSessionMailboxId: string, webrtcConnectionLinkage_self: WebrtcConnectionLinkage) {
    socket.emit(WebrtcConnectionEventType.oneTimeSessionMailbox, eventSessionMailboxId, webrtcConnectionEvent);
    webrtcConnectionLinkage_self.webrtcConnectionEventHistory.push(webrtcConnectionEvent);
  }
}

export class WebrtcConnectionEventHistory {
  private readonly _history: WebrtcConnectionEvent[] = [];
  get history(): readonly WebrtcConnectionEvent[] {
    return this._history;
  }

  push(event: WebrtcConnectionEvent) {
    this._history.push(event);
  }
}
