import { PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
import { ArrPeerChatMsg, MppArrPeerChatMsg } from '../dataStructure/MppWebrtcConnectionAnchor';
import { UserWebId } from '../../user/UserWeb';
import { ChatMessageInfo } from '../messageSchema/ChatMessageInfo';
const { createSlice, combineReducers } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

export const slice_mppArrPeerChatMsg = createSlice({
  name: 'slice_mppArrPeerChatMsg',
  initialState: new MppArrPeerChatMsg(),
  reducers: {
                                                                                                                          
                                                                                                                        
                                                                                                   
                                             
         
                                                                                                          
                                                                                   
                                                                                                    
                                                                                 
                                                                                                                           
                                                                                   
                                                
            
    addMsg: (mppArrPeerChatMsg, action: PayloadAction<{ userWebId: UserWebId; chatMessageInfo: ChatMessageInfo }>) => {
      const mppPeerChatMsgsLocalSelf_new = MppArrPeerChatMsg.init(mppArrPeerChatMsg as unknown as MppArrPeerChatMsg);
      let arrPeerChatMsg = mppPeerChatMsgsLocalSelf_new.get(action.payload.userWebId)
      if (arrPeerChatMsg === undefined) {
        arrPeerChatMsg = new ArrPeerChatMsg();
        mppPeerChatMsgsLocalSelf_new.set(action.payload.userWebId, arrPeerChatMsg);
      }
      arrPeerChatMsg.set(action.payload.chatMessageInfo.creationTime, action.payload.chatMessageInfo);
      return mppPeerChatMsgsLocalSelf_new;
    },

                                                                                            
                               
         
  },
});
