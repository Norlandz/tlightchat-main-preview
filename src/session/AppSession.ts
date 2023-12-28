import { WaitTooLongException } from '../exception/WaitTooLongException';
// import { enableMapSet } from 'immer';
import { SocketioClientSession_forWebrtcConnection as SocketioClientSession_forWebrtcConnection } from '../webrtcVideoCommunication/service/EventEmitterNested_forWebrtcConnection';
import { ReduxActionType, ReduxStore } from '../webrtcVideoCommunication/redux/ReduxStore';
import { UserAuth0Id, UserWeb, UserWebId } from '../user/UserWeb';
import { MediaStreamSrcFile } from './MediaStreamSrcFile';
import * as auth0React from '@auth0/auth0-react';

//
// FIXME @pb[Map inside state Redux immerjs]
// []
// Having said that, [you should *not* be putting non-serializable objects like `Map`s and `Set`s into the Redux state anyway](https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions), which is why we don't turn on `enableMapSet` in the first place.
// <>
// https://stackoverflow.com/questions/65579282/use-immer-mapset-plugin-with-redux-toolkit
// []
// To resolve this problem, I added `immer` as a dependency, imported it before using `combineReducers`
// <>
// https://github.com/reduxjs/redux-toolkit/issues/466
// ~~~// version must match // "immer": "^9.0.21", "@reduxjs/toolkit": "^1.9.7",
// enableMapSet(); //??????? why has to be here? not the main.tsx? why Jest just sucks on every esm / whatever import thing? // ok indeed the import thing -- its the import time not the line exec (tricked by js, should think more in java)

// @auto-load ... dk
// const localWebcamVideoStream = await navigator.mediaDevices.getUserMedia({ video: true /* audio: true */ });
// const remoteWebcamVideoStream = new MediaStream();

export const rtcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

export class DebugConfig {
  // SECTION debug view
  // readonly mode_dev = false;
  // readonly mode_debug = true;
  private readonly mode_dev = true;
  private readonly mode_debug = false;
  // !SECTION debug view

  // SECTION debug view
  public readonly app_T1 = window.location.port === '5173';
  public readonly app_T2 = window.location.port === '5174';
  public readonly app_Jest = window.location.port === '';

  //   // ;x; process.env.PORT@¦  //   // ;x; const envVite = loadEnv('', process.cwd(), '');@¦  //   // ;x; console.log(import.meta.env.BASE_URL);@¦  //   // ;x; console.log(import.meta.env.PORT);@¦  //   // console.log(window.location); // no_knowlres , seems cant base on expressjs answer. but this has window obj ... dk babel / vite magic ...
  public readonly prefix_debug = !this.mode_dev ? '' : this.app_T1 ? '📜' : this.app_T2 ? '⚓' : '🎲';
  public readonly suffix_debug = !this.mode_dev ? '' : this.app_T1 ? '1' : this.app_T2 ? '2' : '3';
  public connectionAnchorName_debugTest: string | undefined = undefined;

  private async autoplay_ForceTry(eltVideo: HTMLVideoElement) {
    let snTry_ForceAutoPlay = 0;
    while (true) {
      snTry_ForceAutoPlay++;
      if (snTry_ForceAutoPlay >= 20) {
        console.error('snTry_ForceAutoPlay >= 20');
        break;
      }
      try {
        await eltVideo.play();
        break;
      } catch (error) {
        if (!(error instanceof DOMException)) throw error;
        // js error do i have to check the error message to handling accordingly isn't that is bad practice
        if (error.message === 'The element has no supported sources.') {
          console.error(error);
          break;
        }
        // javascript - How can I reproduce the error "The play() request was interrupted because video-only background media was paused to save power"? - Stack Overflow@¦        // https://stackoverflow.com/questions/76104246/how-can-i-reproduce-the-error-the-play-request-was-interrupted-because-video@¦        // javascript - How do I maintain a live video stream playing if I change tabs in Chrome? - Stack Overflow@¦        // https://stackoverflow.com/questions/76165949/how-do-i-maintain-a-live-video-stream-playing-if-i-change-tabs-in-chrome@¦        // javascript - How can I autoplay a video without muting? - Stack Overflow@¦        // https://stackoverflow.com/questions/60342545/how-can-i-autoplay-a-video-without-muting@¦        // javascript - HTML5 Video autoplay with sound unmuted - Stack Overflow@¦        // https://stackoverflow.com/questions/70719678/html5-video-autoplay-with-sound-unmuted/76471447#76471447
        // dk why works if catch and log....
        console.warn('snTry_ForceAutoPlay', snTry_ForceAutoPlay, error);
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  private async get_MediaStream_fromLocalFile(mediaStreamSrcFile: Exclude<MediaStreamSrcFile, MediaStreamSrcFile.webcam>): Promise<MediaStream> {
    // @ts-ignore safer runtime check
    if (mediaStreamSrcFile === MediaStreamSrcFile.webcam) throw new TypeError();
    // const localWebcamVideoStream = await navigator.mediaDevices.getUserMedia({ video: true /* audio: true */ });
    // const eltVideo = document.createElement('video');@¦    // eltVideo.src = 'http://localhost:3000/payday.mp4';@¦    // // eltVideo.load();@¦    // void eltVideo.play();@¦    // const localWebcamVideoStream = await navigator.mediaDevices@¦    //   .getUserMedia({ video: true /* audio: true */ })@¦    //   .then((stream) => {@¦    //     preview.srcObject = stream;@¦    //     preview.captureStream = preview.captureStream || preview.mozCaptureStream;@¦    //     return new Promise((resolve) => (preview.onplaying = resolve));@¦    //   }) // <video id="vid_payday" src="http://localhost:3000/payday.mp4" crossOrigin="anonymous" >payday</video>@¦    // <video id="vid_payday" src="http://localhost:3000/payday.mp4" crossOrigin="anonymous" autoplay muted="muted">payday</video>@¦    // const eltVideo = document.getElementById('vid_payday') as HTMLVideoElement;
    const eltVideo = document.createElement('video');
    // document.body.append(eltVideo);
    eltVideo.crossOrigin = 'anonymous'; // TODO cors; stale state knowlres file size debug_config fix more
    eltVideo.src = mediaStreamSrcFile;
    eltVideo.muted = true;
    eltVideo.controls = true;
    eltVideo.loop = true;
    await this.autoplay_ForceTry(eltVideo);
    const localMediaStream = (eltVideo as unknown as HTMLCanvasElement).captureStream();
    // eltVideo.localMediaStream = localMediaStream;
    return localMediaStream;
  }

  /**
   *
   * @param mediaStreamSrcFile undefined mean auto
   * @returns
   */
  public async getLocalMediaStream(mediaStreamSrcFile: MediaStreamSrcFile | null = null): Promise<MediaStream> {
    if (mediaStreamSrcFile === null) {
      if (this.mode_dev) {
        // if (this.app_Jest) {
        //   return new MediaStream();
        // }
        if (this.app_T1 || this.app_T2) {
          return this.get_MediaStream_fromLocalFile(this.app_T1 ? MediaStreamSrcFile.payday : MediaStreamSrcFile.marvel);
        }
        return navigator.mediaDevices.getUserMedia({ video: true /* audio: true */ });
      } else {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // return undefined;
      }
    } else {
      if (mediaStreamSrcFile === MediaStreamSrcFile.webcam) {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } else {
        return this.get_MediaStream_fromLocalFile(mediaStreamSrcFile);
      }
    }
  }
  // !SECTION debug view

  // SECTION @Component & Session
  // readonly webrtcConnectionEventManager = new WebrtcConnectionEventManager();
  // !SECTION @Component & Session
}

export class AppSession {
  public readonly debugConfig = new DebugConfig();
  private _reduxStore: ReduxStore | null = null;
  public get reduxStore(): ReduxStore | null {
    return this._reduxStore;
  }
  private _socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection | null = null;
  public get socketioClientSession_forWebrtcConnection(): SocketioClientSession_forWebrtcConnection | null {
    return this._socketioClientSession_forWebrtcConnection;
  }

  private _hasUserSession = false;
  public get hasUserSession() {
    return this._hasUserSession;
  }

  // idk .. js async ... shouldnt be like multi thread ; but now...
  // public hasUserSession_largerScope_messy = false;
  public synclock_initingSession = false;
  /**
   * crossSessionData so .. dont remove this on session change?.. better make another UserSession inside AppSession
   * // @messy
   */
  public userAuth0Id_curr_crossSessionData: string | null | undefined = null;
  public userWeb_self: UserWeb | null = null;
  public userWebId_self: UserWebId | null = null;

  // .....too manty Session now which I shoould scope in
  public async init_NewUserSession(sn_Session: number, timeout: number, userAuth0: auth0React.User | undefined) {
    console.log('>> init_NewUserSession()', sn_Session);
    if (this._reduxStore != null) throw new TypeError('There can only be 1 UserSession exists, destroy the old UserSession first.');
    if (this._socketioClientSession_forWebrtcConnection != null) throw new TypeError('There can only be 1 UserSession exists, destroy the old UserSession first.');

    const timerId_throwIf_initRun_tookTooLong = setTimeout(() => { throw new WaitTooLongException('initRun.run() took too long to complete, is the signalserver running?'); }, timeout); // prettier-ignore
    {
      this._reduxStore = new ReduxStore();
      this._socketioClientSession_forWebrtcConnection = new SocketioClientSession_forWebrtcConnection();
      const userWeb = await this._socketioClientSession_forWebrtcConnection.init(userAuth0);
      this.userWeb_self = userWeb;
      this.userWebId_self = userWeb.userWebId;
    }
    clearTimeout(timerId_throwIf_initRun_tookTooLong);
    this._hasUserSession = true;
  }

  public async terminate_CurrUserSession(sn_Session: number) {
    console.log('>> terminate_CurrUserSession()', sn_Session);
    if (this._reduxStore == null) throw new TypeError();
    if (this._socketioClientSession_forWebrtcConnection == null) throw new TypeError();

    // this._reduxStore.store.destroy(); // no such thing....
    // console.log('Ressssssss')
    // console.log(this._reduxStore.store.getState().reducer_mppWebrtcConnectionAnchor)
    // console.log(this._reduxStore.store.getState().reducer_mppMediaStreamLocalSelf);
    this._reduxStore.store.dispatch({ type: ReduxActionType.reset }); // this is async, the error will throw once it reach ...  // TODO
    // it doesn execute the function of assign, its only that callback being called at that time hum ok
    // aga that confirm of synchronous h
    // console.log(this._reduxStore.store.getState().reducer_mppWebrtcConnectionAnchor)
    // console.log(this._reduxStore.store.getState().reducer_mppMediaStreamLocalSelf);
    await this._socketioClientSession_forWebrtcConnection.terminate();
    this._reduxStore = null;
    this._socketioClientSession_forWebrtcConnection = null;
    this._hasUserSession = false;
    this.userWeb_self = null;
    this.userWebId_self = null;
  }
}

export class AppSessionRef {
  public static appSession = new AppSession();
}
