// import '../../mainPreImport'

import React from 'react';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers, configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
// import Redux from '@reduxjs/toolkit';
import { slice_mppWebrtcConnectionAnchor } from './slice_mppWebrtcConnectionAnchor';
import { reducer_videoConnectionLinkageDraftCurrSelected, reset_videoConnectionLinkageDraftCurrSelected_ref } from './slice_videoConnectionLinkageDraftCurrSelected';
import { slice_mppMediaStreamLocalSelf } from './slice_mppMediaStreamLocalSelf';
import { slice_lobbyUserList } from './slice_lobbyUserList';
import { slice_mppArrPeerChatMsg } from './slice_mppPeerChatMsgs';

// ############ ############

export enum ReduxActionType {
  reset = 'reset',
}

// ############ ############

// console.log(store.getState().reducerMppWebrtcConnectionAnchor.get('123'))
// store.dispatch(sliceMppWebrtcConnectionAnchor.actions.set({}));
// store.subscribe(() => {});

const combinedReducer = combineReducers({
  reducer_mppMediaStreamLocalSelf: slice_mppMediaStreamLocalSelf.reducer,
  reducer_mppWebrtcConnectionAnchor: slice_mppWebrtcConnectionAnchor.reducer,
  reducer_lobbyUserList: slice_lobbyUserList.reducer,
  reducer_mppArrPeerChatMsg: slice_mppArrPeerChatMsg.reducer,
  reducer_videoConnectionLinkageDraftCurrSelected,
});

const resetReducer = (state: RootState | undefined, action: toolkitRaw.AnyAction) => {
  if (action.type === ReduxActionType.reset) {
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] // fuck that waste of my time
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] console.log('doublllllllll');
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] // console.log(store.getState().reducer_mppWebrtcConnectionAnchor)
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] console.log(state?.reducer_mppWebrtcConnectionAnchor);
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] // const ccc = combinedReducer(undefined, { type: undefined });
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] const ccc = combinedReducer(undefined, action);
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] console.log('ccc')
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] console.log(ccc.reducer_mppWebrtcConnectionAnchor)
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] return ccc;
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] //
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] const stateComb = combinedReducer(state, action);
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_lobbyUserList = new LobbyUserList();
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_mppMediaStreamLocalSelf = new MppMediaStream();
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_mppWebrtcConnectionAnchor = new MppWebrtcConnectionAnchor();
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_videoConnectionLinkageDraftCurrSelected.reducer_mediaStreamLocalSelf = null;
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_self = null;
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] stateComb.reducer_videoConnectionLinkageDraftCurrSelected.reducer_webrtcConnectionAnchorLocation_peer = null;
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] return stateComb;
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used] so just NEVER modify on the inital state.. (though idk when get in the React Component)
    // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used]
    // TODO for others
    reset_videoConnectionLinkageDraftCurrSelected_ref();
    return combinedReducer(undefined, { type: undefined });
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  // reducer: combinedReducer,
  reducer: resetReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // FIXME
      serializableCheck: false,
      // thunk etc
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

// @pb cant do OOP...., just for forward compatibility
export class ReduxStore {
  public readonly store = store;
}
