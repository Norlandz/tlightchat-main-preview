import { MppMediaStream } from '../dataStructure/MppWebrtcConnectionAnchor';
import { MediaStreamId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import {  PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

  

export const slice_mppMediaStreamLocalSelf = createSlice({
  name: 'sliceMppMediaStreamLocalSelf',
  initialState: new MppMediaStream(),
  reducers: {
    addToMpp: (mppMediaStreamLocalSelf, action: PayloadAction<MediaStream>) => {
      mppMediaStreamLocalSelf.set(action.payload.id as MediaStreamId, action.payload);
                                        
      return MppMediaStream.init(mppMediaStreamLocalSelf as unknown as MppMediaStream);
    },
                                                                                          
                               
         
  },
});

                                                             
                                          
                      
                
                                                                                          
         
                                                                                   
         
       
      
