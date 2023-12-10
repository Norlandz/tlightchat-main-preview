import { LobbyUserList } from '../dataStructure/LobbyUserList';
import { PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

               
   
                                                                                          
                       
   

export const slice_lobbyUserList = createSlice({
  name: 'sliceLobbyUserList',
  initialState: new LobbyUserList(),
  reducers: {
    overwriteList: (lobbyUserList, action: PayloadAction<LobbyUserList>) => {
      return action.payload;
    },
  },
});
