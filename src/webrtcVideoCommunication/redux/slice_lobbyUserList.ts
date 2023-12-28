import { LobbyUserList } from '../dataStructure/LobbyUserList';
import { PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

// ############
/**
 * @maintain-delegate dont need to maintain this one, this is maintained by signal server;
 * just subscribe to it
 */

export const slice_lobbyUserList = createSlice({
  name: 'slice_LobbyUserList',
  initialState: new LobbyUserList(),
  reducers: {
    overwriteList: (lobbyUserList, action: PayloadAction<LobbyUserList>) => {
      return action.payload;
    },
  },
});
