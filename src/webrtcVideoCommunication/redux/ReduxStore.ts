                               

import React from 'react';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers, configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
                                        
import { slice_mppWebrtcConnectionAnchor } from './slice_mppWebrtcConnectionAnchor';
import { reducer_videoConnectionLinkageDraftCurrSelected } from './slice_videoConnectionLinkageDraftCurrSelected';
import { slice_mppMediaStreamLocalSelf } from './slice_mppMediaStreamLocalSelf';
import { slice_lobbyUserList } from './slice_lobbyUserList';

                            

const combinedReducer = combineReducers({
  reducer_mppMediaStreamLocalSelf: slice_mppMediaStreamLocalSelf.reducer,
  reducer_mppWebrtcConnectionAnchor: slice_mppWebrtcConnectionAnchor.reducer,
  reducer_lobbyUserList: slice_lobbyUserList.reducer,
  reducer_videoConnectionLinkageDraftCurrSelected,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
              
      serializableCheck: false,
                  
    }),
});

                                                                            
                                                                  
                             

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
