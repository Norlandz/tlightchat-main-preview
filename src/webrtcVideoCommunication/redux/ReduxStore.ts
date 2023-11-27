import React from 'react';
import { SignalserverWebsocketMsg } from '../messageSchema/WebSocketMessage';
import { WebrtcConnectionAnchorId, SignalserverWebsocketClientId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { RefObjectWrapper } from '../../util/reactjs/useStateRef';
import * as Redux from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { signal } from '@preact/signals-react';
import { slice_mppWebrtcConnectionAnchor } from './slice_mppWebrtcConnectionAnchor';
import { reducer_videoConnectionLinkageDraftCurrSelected } from './slice_videoConnectionLinkageDraftCurrSelected';
import { slice_mppMediaStreamLocalSelf } from './slice_mppMediaStreamLocalSelf';
import { slice_lobbyUserList } from './slice_lobbyUserList';

                            

const combinedReducer = Redux.combineReducers({
  reducer_mppMediaStreamLocalSelf: slice_mppMediaStreamLocalSelf.reducer,
  reducer_mppWebrtcConnectionAnchor: slice_mppWebrtcConnectionAnchor.reducer,
  reducer_lobbyUserList: slice_lobbyUserList.reducer,
  reducer_videoConnectionLinkageDraftCurrSelected,
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
