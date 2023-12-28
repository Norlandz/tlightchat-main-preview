                               

import React from 'react';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers, configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
                                        
import { slice_mppWebrtcConnectionAnchor } from './slice_mppWebrtcConnectionAnchor';
import { reducer_videoConnectionLinkageDraftCurrSelected, reset_videoConnectionLinkageDraftCurrSelected_ref } from './slice_videoConnectionLinkageDraftCurrSelected';
import { slice_mppMediaStreamLocalSelf } from './slice_mppMediaStreamLocalSelf';
import { slice_lobbyUserList } from './slice_lobbyUserList';
import { slice_mppArrPeerChatMsg } from './slice_mppPeerChatMsgs';

                            

export enum ReduxActionType {
  reset = 'reset',
}

                            

                                                                            
                                                                  
                             

const combinedReducer = combineReducers({
  reducer_mppMediaStreamLocalSelf: slice_mppMediaStreamLocalSelf.reducer,
  reducer_mppWebrtcConnectionAnchor: slice_mppWebrtcConnectionAnchor.reducer,
  reducer_lobbyUserList: slice_lobbyUserList.reducer,
  reducer_mppArrPeerChatMsg: slice_mppArrPeerChatMsg.reducer,
  reducer_videoConnectionLinkageDraftCurrSelected,
});

const resetReducer = (state: RootState | undefined, action: toolkitRaw.AnyAction) => {
  if (action.type === ReduxActionType.reset) {
                                                                                                                                                                    
                                                                                                                                                                    
                                                                                                                                                                                                         
                                                                                                                                                                                             
                                                                                                                                                                                                      
                                                                                                                                                                                      
                                                                                                                                                         
                                                                                                                                                                                         
                                                                                                                                                  
                                                                                                                                         
                                                                                                                                                                                        
                                                                                                                                                                                             
                                                                                                                                                                                                        
                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                    
                                                                                                                                                        
                                                                                                                                                                                                                              
                                                                                                                                      
                      
    reset_videoConnectionLinkageDraftCurrSelected_ref();
    return combinedReducer(undefined, { type: undefined });
  }

  return combinedReducer(state, action);
};

const store = configureStore({
                              
  reducer: resetReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
              
      serializableCheck: false,
                  
    }),
});

                                                             
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

                                                      
export class ReduxStore {
  public readonly store = store;
}
