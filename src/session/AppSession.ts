import { WaitTooLongException } from '../exception/WaitTooLongException';
                                        
import { SocketioClientSession_forWebrtcConnection as SocketioClientSession_forWebrtcConnection } from '../webrtcVideoCommunication/service/EventEmitterNested_forWebrtcConnection';
import { ReduxActionType, ReduxStore } from '../webrtcVideoCommunication/redux/ReduxStore';
import { UserAuth0Id, UserWeb, UserWebId } from '../user/UserWeb';
import { MediaStreamSrcFile } from './MediaStreamSrcFile';
import * as auth0React from '@auth0/auth0-react';

  
                                            
     
                                                                                                                                                                                                                                                                                                     
     
                                                                                          
     
                                                                                                       
     
                                                      
                                                                                
                                                                                                                                                                                                                                              

                    
                                                                                                               
                                                     

export const rtcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

export class DebugConfig {
                       
                               
                                
  private readonly mode_dev = true;
  private readonly mode_debug = false;
                        

                       
  public readonly app_T1 = window.location.port === '5173';
  public readonly app_T2 = window.location.port === '5174';
  public readonly app_Jest = window.location.port === '';

                                                                                                                                                                                                                                                                                                                                                          
  public readonly prefix_debug = !this.mode_dev ? '' : this.app_T1 ? '📜' : this.app_T2 ? '⚓' : '🍌';
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
                                                                                                           
        if (error.message === 'The element has no supported sources.') {
          console.error(error);
          break;
        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                            
        console.warn('snTry_ForceAutoPlay', snTry_ForceAutoPlay, error);
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  }

  private async get_MediaStream_fromLocalFile(mediaStreamSrcFile: Exclude<MediaStreamSrcFile, MediaStreamSrcFile.webcam>): Promise<MediaStream> {
                                     
    if (mediaStreamSrcFile === MediaStreamSrcFile.webcam) throw new TypeError();
                                                                                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    const eltVideo = document.createElement('video');
                                      
    eltVideo.crossOrigin = 'anonymous';                                                                   
    eltVideo.src = mediaStreamSrcFile;
    eltVideo.muted = true;
    eltVideo.controls = true;
    eltVideo.loop = true;
    await this.autoplay_ForceTry(eltVideo);
    const localMediaStream = (eltVideo as unknown as HTMLCanvasElement).captureStream();
                                                    
    return localMediaStream;
  }

     
    
                                                  
             
     
  public async getLocalMediaStream(mediaStreamSrcFile: MediaStreamSrcFile | null = null): Promise<MediaStream> {
    if (mediaStreamSrcFile === null) {
      if (this.mode_dev) {
                               
                                      
            
        if (this.app_T1 || this.app_T2) {
          return this.get_MediaStream_fromLocalFile(this.app_T1 ? MediaStreamSrcFile.payday : MediaStreamSrcFile.marvel);
        }
        return navigator.mediaDevices.getUserMedia({ video: true                   });
      } else {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                            
      }
    } else {
      if (mediaStreamSrcFile === MediaStreamSrcFile.webcam) {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } else {
        return this.get_MediaStream_fromLocalFile(mediaStreamSrcFile);
      }
    }
  }
                        

                                 
                                                                                
                                  
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

                                                                   
                                                     
  public synclock_initingSession = false;
     
                                                                                                                   
              
     
  public userAuth0Id_curr_crossSessionData: string | null | undefined = null;
  public userWeb_self: UserWeb | null = null;
  public userWebId_self: UserWebId | null = null;

                                                        
  public async init_NewUserSession(sn_Session: number, timeout: number, userAuth0: auth0React.User | undefined) {
    console.log('>> init_NewUserSession()', sn_Session);
    if (this._reduxStore != null) throw new TypeError('There can only be 1 UserSession exists, destroy the old UserSession first.');
    if (this._socketioClientSession_forWebrtcConnection != null) throw new TypeError('There can only be 1 UserSession exists, destroy the old UserSession first.');

    const timerId_throwIf_initRun_tookTooLong = setTimeout(() => { throw new WaitTooLongException('initRun.run() took too long to complete, is the signalserver running?'); }, timeout);                   
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

                                                             
                                
                                                                                       
                                                                                      
    this._reduxStore.store.dispatch({ type: ReduxActionType.reset });                                                                  
                                                                                                       
                                        
                                                                                       
                                                                                      
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
