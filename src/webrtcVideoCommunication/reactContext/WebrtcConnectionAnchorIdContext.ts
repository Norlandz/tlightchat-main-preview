import React from 'react';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import {
  WebrtcConnectionAnchorLocation,
  WebrtcConnectionAnchorId,
  SignalserverWebsocketClientId,
  MppWebrtcConnectionAnchor,
  MppMediaStream,
  MediaStreamId,
} from '../dataStructure/WebrtcConnectionAnchor';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import { RefObjectWrapper } from '../../util/reactjs/useStateRef';
import { LobbyUserList } from '../dataStructure/LobbyUserList';
import * as Redux from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { signal } from '@preact/signals-react';

  
                                            
     
                                                                                                                                                                                                                                                                                                     
     
                                                                                          
     
                                                                                                       
     
                                                      
                                                                                
enableMapSet();

  
export const sliceMppMediaStreamLocalSelf = Redux.createSlice({
  name: 'sliceMppMediaStreamLocalSelf',
  initialState: new MppMediaStream(),
  reducers: {
    overwriteMpp: (mppMediaStreamLocalSelf, action: Redux.PayloadAction<MppMediaStream>) => {
      return action.payload;
    },
    addToMpp: (mppMediaStreamLocalSelf, action: Redux.PayloadAction<MediaStream>) => {
      mppMediaStreamLocalSelf.set(action.payload.id as MediaStreamId, action.payload);
    },
  },
});

               

   
                                                 
                                                          
  
                                                                                                            
                                                                                           
    
                                                    

                                                                          
                                                                  
                                                                                     
                                                    
   
export const sliceMppWebrtcConnectionAnchor = Redux.createSlice({
  name: 'sliceMppWebrtcConnectionAnchor',
           
          
                                                                                                                                                                                               
    
          
                                                                                                                                                                                                                                                                                                                                                                                  
                                                            
                                                                                         
    
                                                                                                          
                                                                                                                               
                                  
                                                                                        
                                  
                                                                                                                                            
                                    
                
                                      
                                                                                                                      
                                                                                       
                                                                           
                
                                                                                                   
                
                                                                      
                                                                     
                
                                                                       
                
                                                                                                                  
                                                             
                                    
                                                      
                                                                                      
                                                                               
                        
  initialState: new MppWebrtcConnectionAnchor(),
  reducers: {
                                                                                                              
                                   
                                            
                                                             
                                                                                                                                                                                                                                                                                                                                                                                          
    addToMpp: (mppWebrtcConnectionAnchor, action: Redux.PayloadAction<WebrtcConnectionAnchor>) => {
                                                        
                                                                                                                                                       
      mppWebrtcConnectionAnchor.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload as unknown as Redux.Draft<WebrtcConnectionAnchor>);
    },
                                                                                     
    forceRefreshMpp: (mppWebrtcConnectionAnchor) => {
                  
      return new MppWebrtcConnectionAnchor(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
                                                                                                                                                                    
    },
    overwriteMpp: (mppWebrtcConnectionAnchor, action: Redux.PayloadAction<MppWebrtcConnectionAnchor>) => {
                                                        
      return action.payload;
    },
  },
});

                                
                                                                                                                                                                                                                                                                                                                                                                                                   
                                
                                                                                                    
                                                                                                                   
                                                                                                                                         
                                                                                                         
                                                                                                                                                                           
                                                                                                                                 

               

   
                                                                                          
                       
   
export const sliceLobbyUserList = Redux.createSlice({
  name: 'sliceLobbyUserList',
  initialState: new LobbyUserList(),
  reducers: {
    overwriteList: (lobbyUserList, action: Redux.PayloadAction<LobbyUserList>) => {
      return action.payload;
    },
  },
});

               

type VideoConnectionLinkageDraftCurrSelected = {
  mediaStreamLocalSelf: MediaStream | null;
  webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation | null;
                                                                                                                             
                                                                            
  webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null;
};

export const sliceVideoConnectionLinkageDraftCurrSelected = Redux.createSlice({
  name: 'sliceVideoConnectionLinkageCurrSelected',
  initialState: {
    mediaStreamLocalSelf: null,
    webrtcConnectionAnchorLocation_self: null,
                                         
    webrtcConnectionAnchorLocation_peer: null,
  } as VideoConnectionLinkageDraftCurrSelected,
  reducers: {
    select_mediaStreadLocalSelf: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<MediaStream>) => {
      videoConnectionLinkageDraftCurrSelected.mediaStreamLocalSelf = action.payload;
    },
    select_webrtcConnectionAnchorLocation_self: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_self = action.payload;
    },
                                                                                                                                              
                                                           
                                                                                                                                                
         
    select_webrtcConnectionAnchorLocation_peer: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_peer = action.payload;
    },
    reset: (videoConnectionLinkageDraftCurrSelected) => {
      videoConnectionLinkageDraftCurrSelected.mediaStreamLocalSelf = null;
      videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_self = null;
                                                                                    
      videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_peer = null;
    },
  },
});

                            

const combinedReducer = Redux.combineReducers({
  reducerMppMediaStreamLocalSelf: sliceMppMediaStreamLocalSelf.reducer,
  reducerMppWebrtcConnectionAnchor: sliceMppWebrtcConnectionAnchor.reducer,
  reducerLobbyUserList: sliceLobbyUserList.reducer,
  reducerVideoConnectionLinkageDraftCurrSelected: sliceVideoConnectionLinkageDraftCurrSelected.reducer,
});

export const store = Redux.configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
              
      serializableCheck: false,
    }),
});

                                                                            
                                                                  
                             

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
