import React from 'react';
import * as Redux from '@reduxjs/toolkit';
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';

               

                                                                                  
                                                     
                    
                                  
                                                 
                                            
                                                 
                                                  
                
                                                                                                                            
                                                                                       
         
                                                                                                                                                              
                                                                                                      
         
                                                                                                                                                 
                                                              
                                                                                                                                                   
            
                                                                                                                                                              
                                                                                                      
         
                                                            
                                                                             
                                                                                            
                                                                                       
                                                                                            
         
       
      

type VideoConnectionLinkageDraftCurrSelected = {
  mediaStreamLocalSelf: MediaStream | null;
  webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation | null;
                                                                                                                             
                                                                            
  webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null;
};

export const videoConnectionLinkageDraftCurrSelected_ref = {
  mediaStreamLocalSelf: null,
  webrtcConnectionAnchorLocation_self: null,
                                       
  webrtcConnectionAnchorLocation_peer: null,
} as VideoConnectionLinkageDraftCurrSelected;

export const slice_mediaStreamLocalSelf = Redux.createSlice({
  name: 'slice_mediaStreamLocalSelf',
  initialState: null as MediaStream | null,
  reducers: {
    select_mediaStreadLocalSelf: (mediaStreamLocalSelf_prev, action: Redux.PayloadAction<MediaStream>) => {
      videoConnectionLinkageDraftCurrSelected_ref.mediaStreamLocalSelf = action.payload;
      return action.payload;
    },
  },
});
export const slice_webrtcConnectionAnchorLocation_self = Redux.createSlice({
  name: 'slice_webrtcConnectionAnchorLocation_self',
  initialState: null as WebrtcConnectionAnchorLocation | null,
  reducers: {
    select_webrtcConnectionAnchorLocation_self: (webrtcConnectionAnchorLocation_self_prev, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_self = action.payload;
      return action.payload;
    },
  },
});
export const slice_webrtcConnectionAnchorLocation_peer = Redux.createSlice({
  name: 'slice_webrtcConnectionAnchorLocation_peer',
  initialState: null as WebrtcConnectionAnchorLocation | null,
  reducers: {
    select_webrtcConnectionAnchorLocation_peer: (webrtcConnectionAnchorLocation_peer_prev, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer = action.payload;
      return action.payload;
    },
  },
});


export const reducer_videoConnectionLinkageDraftCurrSelected = Redux.combineReducers({
  reducer_mediaStreamLocalSelf: slice_mediaStreamLocalSelf.reducer,
  reducer_webrtcConnectionAnchorLocation_self: slice_webrtcConnectionAnchorLocation_self.reducer,
  reducer_webrtcConnectionAnchorLocation_peer: slice_webrtcConnectionAnchorLocation_peer.reducer,
});
