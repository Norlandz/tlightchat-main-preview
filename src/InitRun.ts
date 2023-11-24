import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
                       
import io, { Socket } from 'socket.io-client';
import { SignalserverWebsocketMsgType } from './webrtcVideoCommunication/messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId } from './webrtcVideoCommunication/dataStructure/WebrtcConnectionAnchor';
import { SocketioClientUtil } from './util/socketio/SocketioUtil';
import { WaitTooLongException } from './exception/WaitTooLongException';

                    
                                                                                                               
                                                     

export const rtcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

export class InitRun {
                     
     
                              
     
                                     
                                             
                                                     
  readonly socket: Socket = io('http://localhost:3000');

  count_signalserverWebsocketClientId_self_shouldOnlyOnce = 0;
                                         
                                                        
                                          
                                                                                         
  readonly promise_signalserverWebsocketClientId_self_sessionReactApp = new Promise<SignalserverWebsocketClientId>((resolve, reject) => {
                                           
                                                                    
                                                                                       
                                      
    SocketioClientUtil.onOnlyOnce(this.socket, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, (signalserverWebsocketClientId_self: SignalserverWebsocketClientId) => {
      this.count_signalserverWebsocketClientId_self_shouldOnlyOnce++;
      console.log('socketio assigned signalserverWebsocketClientId_self :: ' + signalserverWebsocketClientId_self);
      if (this.count_signalserverWebsocketClientId_self_shouldOnlyOnce > 1) throw new TypeError();

      this.socket.auth = {
        signalserverWebsocketClientId_self,
      };

                                                                                                                       
                                                   
                                                                                                                                                                                      
          
                                                                          
                                                                                                    
        
                                                                                  
                                                                 
                                                                           
                                                              
                                                                                        

                                            
                                                      
      resolve(signalserverWebsocketClientId_self);
    });
                           
  });
                                                                                 

  async socketIo_init() {
    SocketioClientUtil.onOnlyOnce(this.socket, 'connect', () => {
      console.log('socketio connected with socket.id :: ' + this.socket.id);
    });

    await this.promise_signalserverWebsocketClientId_self_sessionReactApp;
  }

  socketIo_heartbeat() {
                                   
    let count_heartbeat = 0;
    const scheduler_heartbeat = setInterval(() => {
      count_heartbeat++;
      this.socket.volatile.emit(SignalserverWebsocketMsgType.heartbeat, count_heartbeat);
    }, 2000);
                       
  }
                      

                       
                               
                                
  readonly mode_dev = true;
  readonly mode_debug = false;
                        

                                   
                                         
  count_WebrtcConnection = 0;

  readonly amount_DefaultConnectionPoint_config = this.mode_debug ? 1 : 2;
                                    

                       
  readonly app_T1 = window.location.port === '5173';
  readonly app_T2 = window.location.port === '5174';

                                                                                                                                                                                                                                                                                                                                                          
  readonly prefix_debug = this.mode_dev ? '' : this.app_T1 ? '📜' : this.app_T2 ? '⚓' : '🍌';

  async getLocalMediaStream() {
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
      } else {
        return navigator.mediaDevices.getUserMedia({ video: true                   });
      }
    } else {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }
  }
                        

                                 
                                                                                
                                  

                
  async run() {
    await this.socketIo_init();
                              
    this.socketIo_heartbeat();
  }

  async run_withTimeout(timeLength: number) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    const timerId_throwIf_initRun_tookTooLong = setTimeout(() => { throw new WaitTooLongException('initRun.run() took too long to complete, is the signalserver running?'); }, timeLength);                   
    await this.run();
    clearTimeout(timerId_throwIf_initRun_tookTooLong);
  }
                 
}