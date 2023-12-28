import { v4 as uuidv4 } from 'uuid';
import { WebrtcConnectionAnchorId, MediaStreamId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { WebrtcConnectionAnchor } from './WebrtcConnectionAnchor';
import { UserWebId } from '../../user/UserWeb';
import { ChatMessageInfo } from '../messageSchema/ChatMessageInfo';

// export class MppWebrtcConnectionAnchor extends Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor> {
//   uuid = uuidv4(); // REVIEW
//   constructor(mppWebrtcConnectionAnchor?: MppWebrtcConnectionAnchor) {
//     super(mppWebrtcConnectionAnchor);
//   }
// }
//
// export class MppMediaStream extends Map<MediaStreamId, MediaStream> {
//   constructor(mppMediaStream?: MppMediaStream) {
//     super(mppMediaStream);
//   }
// }

function copyMap<K, V>(srcMap: Map<K, V>, destMap: Map<K, V>) {
  destMap.clear();

  for (const item of srcMap) {
    destMap.set(item[0], item[1]);
  }
}

export class MppWebrtcConnectionAnchor implements Iterable<[WebrtcConnectionAnchorId, WebrtcConnectionAnchor]> {
  public readonly uuid = uuidv4(); // REVIEW
  //   private readonly mpp_underlying: Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor>;
  //
  //   constructor(mppWebrtcConnectionAnchor?: MppWebrtcConnectionAnchor) {
  //     if (!mppWebrtcConnectionAnchor) {
  //       this.mpp_underlying = new Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor>();
  //     } else {
  //       this.mpp_underlying = new Map(mppWebrtcConnectionAnchor.mpp_underlying);
  //     }
  //   }

  // /** @deprecated just for testing dont use */
  // constructor() {
  //   console.log('newwwwwwwwwwwwwwww?')
  // }

  private readonly mpp_underlying = new Map<WebrtcConnectionAnchorId, WebrtcConnectionAnchor>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying); // aga bind thing...
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  public get size() {
    return this.mpp_underlying.size;
  }
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }
  public entries = this.mpp_underlying.entries.bind(this.mpp_underlying);
  // https://stackoverflow.com/questions/61565282/how-to-forward-an-iterator
  // entries() {
  //   return Array.from(this.mpp_underlying.entries());
  // }
  // public [Symbol.iterator]: () => Iterator<[WebrtcConnectionAnchorId, WebrtcConnectionAnchor], any, undefined> = this.mpp_underlying[Symbol.iterator];

  public static init(mppWebrtcConnectionAnchor: MppWebrtcConnectionAnchor) {
    const MM = new MppWebrtcConnectionAnchor();
    copyMap(mppWebrtcConnectionAnchor.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}

export class MppMediaStream implements Iterable<[MediaStreamId, MediaStream]> {
  private readonly mpp_underlying = new Map<MediaStreamId, MediaStream>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying);
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  public get size() {
    return this.mpp_underlying.size;
  }
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }

  public static init(mppMediaStream: MppMediaStream) {
    const MM = new MppMediaStream();
    copyMap(mppMediaStream.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}

export class MppArrPeerChatMsg implements Iterable<[UserWebId, ArrPeerChatMsg]> {
  private readonly mpp_underlying = new Map<UserWebId, ArrPeerChatMsg>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying);
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  public get size() {
    return this.mpp_underlying.size;
  }
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }

  public static init(mppPeerChatMsgs: MppArrPeerChatMsg) {
    const MM = new MppArrPeerChatMsg();
    copyMap(mppPeerChatMsgs.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}

export class ArrPeerChatMsg implements Iterable<[Date, ChatMessageInfo]> {
  private readonly mpp_underlying = new Map<Date, ChatMessageInfo>();

  public get = this.mpp_underlying.get.bind(this.mpp_underlying);
  public set = this.mpp_underlying.set.bind(this.mpp_underlying);
  public get size() {
    return this.mpp_underlying.size;
  }
  *[Symbol.iterator]() {
    yield* this.mpp_underlying;
  }

  public static init(arrPeerChatMsg: ArrPeerChatMsg) {
    const MM = new ArrPeerChatMsg();
    copyMap(arrPeerChatMsg.mpp_underlying, MM.mpp_underlying);
    return MM;
  }
}