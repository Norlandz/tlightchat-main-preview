import { Transform, Type, plainToInstance } from 'class-transformer';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId, WebrtcConnectionAnchorId, WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import 'reflect-metadata';

import { NoSuchItemException } from '../../exception/NoSuchItemException';
import { UserWeb } from '../../user/UserWeb';

// was thinking about set a map of status in perspective for each
// .. or maybe just set essential info & let the local client derive status from that ...
export enum ConnectionAnchorOnlineStatus {
  online = 'online',
  occupied = 'occupied', // connected
  offline = 'offline',
  // closed = 'closed',
  // unavailable = 'unavailable',
  // hidden = 'hidden',
}
// aga said those pending / to from who ... nah ./ may use some derive ; [m b ; ee

// @think // dk just use simple first, that mpp of state for diff user feels
// not how that should be stored / transmitted
// & dont feel much of use
// & conflict redundant ino there ...

//[[ dk the feel of managing duplicate redundant information , ( dk &dk if SFU server will help ...
export class ConnectionAnchorOnlineInfo {
  @Type(() => WebrtcConnectionAnchorLocation)
  public readonly webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation;

  constructor(webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation) {
    this.webrtcConnectionAnchorLocation_self = webrtcConnectionAnchorLocation_self;
  }

  // @Type(() => WebrtcConnectionAnchorLocation)
  // private _webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null = null; // need add later
  // /** @set_only_once */
  // // @ts-ignore
  // public get webrtcConnectionAnchorLocation_peer(): WebrtcConnectionAnchorLocation | null { return this._webrtcConnectionAnchorLocation_peer; } // prettier-ignore
  // public set webrtcConnectionAnchorLocation_peer(value: WebrtcConnectionAnchorLocation) { if (value === null) throw new TypeError(); if (this._webrtcConnectionAnchorLocation_peer !== null) throw new Error('Immutable Value Once Set'); this._webrtcConnectionAnchorLocation_peer = value; } // prettier-ignore

  public connectionAnchorStatus = ConnectionAnchorOnlineStatus.offline;
  public connectionAnchorName: string | null = null; // mapping of user meaning just my damn need fix
}

export class SocketClientOnlineInfo {
  @Type(() => UserWeb)
  public readonly userWeb: UserWeb;
  constructor(userWeb: UserWeb) {
    this.userWeb = userWeb;
  }

  // /**
  //  * Do not modify this map, just read and for loop the info...
  //  */
  // // ; @Type(() => Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, LobbyUserInfo>>)
  // @Transform(
  //   (tinfo) => {
  //     // seems actually nothing much better, cuz still nested ... & need these code .. (internal just cannot change)
  //     // console.log(tinfo);
  //     // why the map inside already know?...
  //     //  cannot use both ... @Type and @Transform // & { toClassOnly: true } is necessary ...
  //     const value = tinfo.value as Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, LobbyUserInfo>>;
  //     if (value === null || value === undefined) throw new TypeError();
  //     return new Map(
  //       Object.entries(value).map(([signalserverWebsocketClientId, mpp_webrtcConnectionAnchorId]) => {
  //         return [
  //           signalserverWebsocketClientId,
  //           new Map(
  //             Object.entries(mpp_webrtcConnectionAnchorId as ArrayLike<unknown>).map(([webrtcConnectionAnchorId, lobbyUserInfo]) => {
  //               return [webrtcConnectionAnchorId, plainToInstance(LobbyUserInfo, lobbyUserInfo as unknown)];
  //             })
  //           ),
  //         ];
  //       })
  //     );
  //   },
  //   { toClassOnly: true }
  // )
  // private readonly _mpp_signalserverWebsocketClientId = new Map<SignalserverWebsocketClientId, Map<WebrtcConnectionAnchorId, LobbyUserInfo>>();
  // public get mpp_signalserverWebsocketClientId(): ReadonlyMap<SignalserverWebsocketClientId, ReadonlyMap<WebrtcConnectionAnchorId, LobbyUserInfo>> {
  //   return this._mpp_signalserverWebsocketClientId;
  // }

  // TODO do i need this
  @Transform(
    (tinfo) => {
      const value = tinfo.value as Record<WebrtcConnectionAnchorId, ConnectionAnchorOnlineInfo> ?? (() => { throw new TypeError(); })(); // prettier-ignore
      return new Map(Object.entries(value).map(([webrtcConnectionAnchorId, lobbyUserInfo]) => [webrtcConnectionAnchorId, plainToInstance(ConnectionAnchorOnlineInfo, lobbyUserInfo)]));
    },
    { toClassOnly: true }
  )
  public readonly mpp_WebrtcConnectionAnchorOnlineInfo = new Map<WebrtcConnectionAnchorId, ConnectionAnchorOnlineInfo>();
}

// Typescript Key-Value relation preserving Object.entries type - Stack Overflow
// https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
//
// type Entries<T> = {
//   [K in keyof T]: [K, T[K]];
// }[keyof T][];
//
// type ExcludeFunctionPropertyNames<T> = Pick<T, {
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   [K in keyof T]: T[K] extends Function ? never : K
// }[keyof T]>;
// still not sure how the Map was converted to this in ClassTransform ... so the Type can be wrong ; seems just objects
// redux - TypeScript: How to create an interface for an object with many keys of the same type and values of the same type? - Stack Overflow
// https://stackoverflow.com/questions/52768308/typescript-how-to-create-an-interface-for-an-object-with-many-keys-of-the-same
// typescript - How to declare a typed object with arbitrary keys? - Stack Overflow
// https://stackoverflow.com/questions/36590284/how-to-declare-a-typed-object-with-arbitrary-keys
// const value = tinfo.value as {[key: WebrtcConnectionAnchorId]: LobbyUserInfo} ?? (() => { throw new TypeError(); })(); // prettier-ignore

export class LobbyUserList {
  @Transform(
    (tinfo) => {
      // const value = tinfo.value as Map<SignalserverWebsocketClientId, SocketClientOnlineInfo> ?? (() => { throw new TypeError(); })(); // prettier-ignore
      // console.log('LobbyUserList @Transform', value); // thats why need object entries not array from -- this is not a map yet...
      // return new Map(Array.from(value, ([signalserverWebsocketClientId, socketClientOnlineInfo]) => [signalserverWebsocketClientId, plainToInstance(SocketClientOnlineInfo, socketClientOnlineInfo)]));
      const value = tinfo.value as Record<SignalserverWebsocketClientId, SocketClientOnlineInfo> ?? (() => { throw new TypeError(); })(); // prettier-ignore
      return new Map(Object.entries(value).map(([signalserverWebsocketClientId, socketClientOnlineInfo]) => [signalserverWebsocketClientId, plainToInstance(SocketClientOnlineInfo, socketClientOnlineInfo)])); // prettier-ignore
    },
    { toClassOnly: true }
  )
  private readonly _mpp_signalserverWebsocketClientId = new Map<SignalserverWebsocketClientId, SocketClientOnlineInfo>();
  public get mpp_signalserverWebsocketClientId(): ReadonlyMap<SignalserverWebsocketClientId, SocketClientOnlineInfo> {
    return this._mpp_signalserverWebsocketClientId;
  }

  add_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId, user: UserWeb) {
    // this._mpp_signalserverWebsocketClientId.set(signalserverWebsocketClientId_self, new Map<WebrtcConnectionAnchorId, LobbyUserInfo>());
    this._mpp_signalserverWebsocketClientId.set(signalserverWebsocketClientId_self, new SocketClientOnlineInfo(user));
  }
  remove_signalserverWebsocketClientId(signalserverWebsocketClientId_self: SignalserverWebsocketClientId) {
    this._mpp_signalserverWebsocketClientId.delete(signalserverWebsocketClientId_self);
  }

  add_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo === undefined) throw new TypeError();
    if (socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.has(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
    const lobbyUserInfo = new ConnectionAnchorOnlineInfo(webrtcConnectionAnchorLocation);
    socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.set(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId, lobbyUserInfo); // @main-line
  }

  remove_webrtcConnectionAnchorId(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo === undefined) throw new TypeError();
    if (!socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.delete(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)) throw new TypeError();
  }

  /**
   *
   * @param webrtcConnectionAnchorLocation
   * @returns
   * // <strike> undefined if not found, this can happen when the Connection is closed // dk messy now
   */
  public get_lobbyUserInfo(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    const socketClientOnlineInfo = this._mpp_signalserverWebsocketClientId.get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId);
    if (socketClientOnlineInfo == null) throw new NoSuchItemException();
    const lobbyUserInfo = socketClientOnlineInfo.mpp_WebrtcConnectionAnchorOnlineInfo.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId)!;
    if (lobbyUserInfo == null) throw new NoSuchItemException();
    return lobbyUserInfo;
    // can let throw; ok ? mark is diff that undefined ...
    // } catch (error) {
    //   // ~~~// so not the lobbyUserList pb... its just that mock error led to other go wrong ?..
    //   // okok only 0 throws 1 passes -- cuz when 1 done it left & 0 wont able to find 1 ... (that fast ...)
    //   // ok there are case when the user leave didnt handle that ...
    //   console.error(webrtcConnectionAnchorLocation);
    //   console.error(this._mpp_signalserverWebsocketClientId);
    //   throw error;
    // }
  }

  // @think: ~~~// that old pb of not yet exist state hum // the pb is the timing order & the expectation (Error throw) // mix with the pb of server side stale state pb
  public get_lobbyUserInfo_NoAggresiveThrow(webrtcConnectionAnchorLocation: WebrtcConnectionAnchorLocation) {
    return this._mpp_signalserverWebsocketClientId
      .get(webrtcConnectionAnchorLocation.signalserverWebsocketClientId)
      ?.mpp_WebrtcConnectionAnchorOnlineInfo.get(webrtcConnectionAnchorLocation.webrtcConnectionAnchorId);
  }
}
