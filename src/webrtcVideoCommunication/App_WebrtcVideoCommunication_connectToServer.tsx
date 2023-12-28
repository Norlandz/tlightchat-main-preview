                                 
                                                                                                                                           
import { App_WebrtcVideoCommunication_semantic } from '../webrtcVideoCommunication/App_WebrtcVideoCommunication_semantic';

import * as React from 'react';
import { SignalserverWebsocketClientId } from '../webrtcVideoCommunication/messageSchema/WebrtcConnectionAnchorLocation';
import { AppSessionRef } from '../session/AppSession';
import { WaitTooLongException } from '../exception/WaitTooLongException';
import { useAuth0 } from '@auth0/auth0-react';
import { UserAuth0Id, UserWeb } from '../user/UserWeb';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0_debugDomain } from '../utilComponent/auth0/useAuth0_debugDomain';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';

                                              
                                                                                                             
     
                                                                 
                                                                                                       
     
                                                                 
                                                                                                                                                  
                                                                                                                                                                                                                                                     
     
             
                                                                                                                                                                                   
             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
     
                                                         
                                                                                              
                                                                                   
                                                                      
                                                          
                           
                                                                                            
                        
                                                    
                                                                            
                
                                                            
         
     
          
                  
                    
                   
                                       
                   
               
                                
                               
                           
                                       
          
                                                                                          
          
                                                                                                                      
                                                                                                    
                                                                                                                                  
     
                               
                                                                                                                                                                                                                                                                                                          
                                                               
                                               
                                                                                                      
                                                                                                           
                                                                                                      
                  
                                                                               
                                                                                                            
                                           
                                                          
                                                                         
             
                                         
                 
                          
                                     
                                                                   
                      
                                                        
                                                                                                                                                         
                                                                 
                                                               
               
                                                        
     
                                                                                
     
                                                                                                                                   
                                                                                           
                                                                                                                                                                      
                                                                                                    
                                                                                                                                                                    
                                                                                                                                                               
                             
                                                                        
                                   
             
           
                                
                                              
                                                                                                            
                                                                                   
                         
                                                                                            
     
                                                                   
                                                                                     
          
                                                                                                            
                                                                
     
                                                     
                                                     
                                                                     
                                                   
     
                      
                                                                                                                                       
                                                                                                                                                                                                                 
     
                                                       
                  
              
                                                                    
               
            
                
                                                                                                                               
                                                                                       
                                                                                                                                                                  
                                                                                                
                                                                 
                                                        
     
                  
              
                                                   
                                                    
                                                                                                                       
                                                                                                     
                                       
                                                    
                
               
            
         
       

                                                           
                                                             
                                                            
                                                                                
                                                            
                                                        
                                                                         
                                                                        
                                                                    
                                                                                
                                                   
                                                                                                                                   
                                                   
                                                                                                                                                               
                                                                                                                                             
                                                                                                                                                                           

                                                                                                                          
                                                                                                                                                        
                                                         
                                                                                                                                       
                                                         
                                                                                                         
                                                                                                               
                                                         
                                                                           
                                                                                                                  
                                                                                      
                                                         
                                                                                                           
                                                                                                            
                                                                                                                           
                                                               
                                                         
                                                                          
                                                                                     
                                                                                                                   
                                                                      
                                                                                                        
                                                                                                            
                                                                                                                 
                                                                                                               
                                                               
                                                         
                                                                   
                                                                                                                                  
                                                                               
                                                                                                                          
                                                                                     
                                                               
                                                         
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                               
                                                                                           
                                                             
                                                         
                                                                                                           
                                                                                                                              
                                                                                               
                                                                                                                         
                                                                                                  
                                                                      
                                                                  
                                                                                                                 
                                                                                                                                                              
                                                                   
                                                                
                                                             

let sn_Session = 0;
let mode_offline_debug = false;

export function App_WebrtcVideoCommunication_connectToServer() {
  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);
                                                                                                           

  const userId_prev = AppSessionRef.appSession.userAuth0Id_curr_crossSessionData;
  const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();

                                                                                         

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Auth0 Loading ...</div>;

                                                                         
                                                                                                  
  const userId_curr = user?.sub;
  AppSessionRef.appSession.userAuth0Id_curr_crossSessionData = userId_curr;

  async function init_NewUserSession_socketio() {
                                          
                                                          
    let snWait = 0;
    while (AppSessionRef.appSession.synclock_initingSession) {
      snWait++;
      if (snWait >= 40) throw new WaitTooLongException('Wait too long for prev session init to finish ...');
      await new Promise((r) => setTimeout(r, 100));
    }
                                             

    AppSessionRef.appSession.synclock_initingSession = true;
    sn_Session++;
    console.log('>> App_WebrtcVideoCommunication_connectToServer > init_NewUserSession_socketio()', sn_Session, dayjs().format('HH:mm:ss.SSS'));
    if (AppSessionRef.appSession.hasUserSession) {
      await AppSessionRef.appSession.terminate_CurrUserSession(sn_Session);
    }

                                                                  
                                                                             
                                                                                                                                                        
                                                              
                                                                                                
                                                                                                    
                                                                                                         
                                                     
                                                                                                                                                                             
                                                       
                                                                                                      
                                                                                                                  

                                                                         
    if (isAuthenticated) {
      if (user == null) throw new TypeError();
      if (user.sub == null) throw new TypeError();
      if (user.nickname == null) throw new TypeError();
    }

    try {
      await AppSessionRef.appSession.init_NewUserSession(sn_Session, 1000, user);
    } catch (error) {
      if (!(error instanceof WaitTooLongException)) throw error;
      console.error(error);
    }

    const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection ?? (() => { throw new TypeError(); })();                   
    const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp ?? (() => { throw new TypeError(); })();                   
    const userWebId_self = AppSessionRef.appSession.userWebId_self ?? (() => { throw new TypeError(); })();                   
    console.log('>> initRun.run() sussessfully, global signalserverWebsocketClientId_self :: ', signalserverWebsocketClientId_self_sessionReactApp, ' userWebId_self :: ', userWebId_self);
                                              
                                        
    AppSessionRef.appSession.synclock_initingSession = false;
    forceRerender('dummyAction');                           
  }

                 

  if (mode_offline_debug) {
                                                                    
    return (
      <>
        <App_WebrtcVideoCommunication_semantic
                             
          signalserverWebsocketClientId_self_sessionReactApp={'fake_offline_mode_debug'}
                             
          socketioClientSession_forWebrtcConnection={AppSessionRef.appSession.socketioClientSession_forWebrtcConnection}
                             
          reduxStore={AppSessionRef.appSession.reduxStore}
          userWeb_self={new UserWeb(null, 'fake_offline_mode_debug', `fake_offline_mode_debug.${uuidv4()}@example.com`, null, null, true)}
        />
      </>
    );
  }

  const jsx_Initing = (
    <>
      <div>init_NewUserSession_socketio ing ...</div>
      {                                                                                          }
      <button
        onClick={() => {
                                          
          mode_offline_debug = true;
          forceRerender('dummyAction');
        }}
      >
        <pre>{'go offline_mode \n-- if this is a static page, the SignalServer wont be running \n& you must go offline_mode \n-- (debug only)'}</pre>
      </button>
    </>
  );

  if (AppSessionRef.appSession.synclock_initingSession) {
    return jsx_Initing;
  }
  if (userId_prev === null || userId_curr !== userId_prev) {
                                                                    
                                     
                                                               
                                                                                          
    void init_NewUserSession_socketio();
    return jsx_Initing;
  }

                 

  const socketioClientSession_forWebrtcConnection = AppSessionRef.appSession.socketioClientSession_forWebrtcConnection ?? (() => { throw new TypeError(); })();                   
  const signalserverWebsocketClientId_self_sessionReactApp = socketioClientSession_forWebrtcConnection.signalserverWebsocketClientId_self_sessionReactApp ?? (() => { throw new TypeError(); })();                   
  const reduxStore = AppSessionRef.appSession.reduxStore ?? (() => { throw new TypeError(); })();                   
  const userWeb_self = AppSessionRef.appSession.userWeb_self ?? (() => { throw new TypeError(); })();                   

  return (
    <>
      <App_WebrtcVideoCommunication_semantic
        signalserverWebsocketClientId_self_sessionReactApp={signalserverWebsocketClientId_self_sessionReactApp}
        socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection}
        reduxStore={reduxStore}
                                            
        userWeb_self={userWeb_self}
      />
    </>
  );
}

                           
                                                                                                                   
                                                         
