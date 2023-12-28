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
    // addToMpp: (mppArrPeerChatMsg, action: PayloadAction<{ userWebId: UserWebId; arrPeerChatMsg: ArrPeerChatMsg }>) => {
    //   const mppPeerChatMsgsLocalSelf_new = MppArrPeerChatMsg.init(mppArrPeerChatMsg as unknown as MppArrPeerChatMsg);
    //   mppPeerChatMsgsLocalSelf_new.set(action.payload.userWebId, action.payload.arrPeerChatMsg);
    //   return mppPeerChatMsgsLocalSelf_new;
    // },
    // idk name adn design and encapsulate & scattered class placement and stale state & what more ..... f
    // so dont bother the primitive structure? ... the place to encapse daddd em m 
    // @: encapsulate places: 1. in primitive mpp structure 1. in slice 1. in Rcomp check undefined 
    // ;; initUserWeb: (mppArrPeerChatMsg, action: PayloadAction<UserWebId>) => {
    // ;;   const mppPeerChatMsgsLocalSelf_new = MppArrPeerChatMsg.init(mppArrPeerChatMsg as unknown as MppArrPeerChatMsg);
    // ;;   mppPeerChatMsgsLocalSelf_new.set(action.payload, new ArrPeerChatMsg());
    // ;;   return mppPeerChatMsgsLocalSelf_new;
    // ;; },
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

    // overwriteMpp: (mppPeerChatMsgsLocalSelf, action: PayloadAction<MppPeerChatMsgs>) => {
    //   return action.payload;
    // },
  },
});
