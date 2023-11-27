import { LobbyUserList } from '../dataStructure/LobbyUserList';
import * as Redux from '@reduxjs/toolkit';

               
   
                                                                                          
                       
   

export const slice_lobbyUserList = Redux.createSlice({
  name: 'sliceLobbyUserList',
  initialState: new LobbyUserList(),
  reducers: {
    overwriteList: (lobbyUserList, action: Redux.PayloadAction<LobbyUserList>) => {
      return action.payload;
    },
  },
});
