import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
                       
import { io, Socket } from 'socket.io-client';
import { SignalserverWebsocketMsgType } from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId } from './webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { SocketioClientUtil } from './util/socketio/SocketioUtil';
import { WaitTooLongException } from './exception/WaitTooLongException';
                                        
import { SocketioClient_forWebrtcConnection } from './webrtcVideoCommunication/service/EventEmitterNested_forWebrtcConnection';
import { WebrtcConnectionAnchor } from './webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';

  
                                            
     
                                                                                                                                                                                                                                                                                                     
     
                                                                                          
     
                                                                                                       
     
                                                      
                                                                                
                                                                                                                                                                                                                                              

                    
                                                                                                               
                                                     

export const rtcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

export class InitRun {
  readonly socketioClient_forWebrtcConnection = new SocketioClient_forWebrtcConnection();

                       
                               
                                
  private readonly mode_dev = true;
  private readonly mode_debug = false;
                        

                       
  public readonly app_T1 = window.location.port === '5173';
  public readonly app_T2 = window.location.port === '5174';
  public readonly app_Jest = window.location.port === '';

                                                                                                                                                                                                                                                                                                                                                          
  public readonly prefix_debug = !this.mode_dev ? '' : this.app_T1 ? '📜' : this.app_T2 ? '⚓' : '🍌';
  public readonly suffix_debug = !this.mode_dev ? '' : this.app_T1 ? '1' : this.app_T2 ? '2' : '3';
  public webrtcConnectionAnchor_customName_debugTest: string | undefined = undefined;

  async getLocalMediaStream(): Promise<MediaStream> {
    if (this.mode_dev) {
                             
                                    
          
      if (this.app_T1 || this.app_T2) {
                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        const eltVideo = document.createElement('video');
                                          
        eltVideo.crossOrigin = 'anonymous';                                                                   
        eltVideo.src = this.app_T1 ? 'http://localhost:3000/payday.mp4' : 'http://localhost:3000/marvel.mp4';
        eltVideo.muted = true;
        eltVideo.controls = true;
        eltVideo.loop = true;
        await eltVideo.play();
        const localMediaStream = (eltVideo as unknown as HTMLCanvasElement).captureStream();
                                                        
        return localMediaStream;
      }
      return navigator.mediaDevices.getUserMedia({ video: true                   });
    } else {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }
  }
                        

                                 
                                                                                
                                  

                
  async run() {
    await this.socketioClient_forWebrtcConnection.init();
  }

  async run_withTimeout(timeLength: number) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    const timerId_throwIf_initRun_tookTooLong = setTimeout(() => { throw new WaitTooLongException('initRun.run() took too long to complete, is the signalserver running?'); }, timeLength);                   
    await this.run();
    clearTimeout(timerId_throwIf_initRun_tookTooLong);
  }
                 
}

                         
const initRun = new InitRun();
export { initRun };
