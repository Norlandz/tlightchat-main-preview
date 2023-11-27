import { MppMediaStream } from '../dataStructure/MppWebrtcConnectionAnchor';
import { MediaStreamId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import * as Redux from '@reduxjs/toolkit';

  

export const slice_mppMediaStreamLocalSelf = Redux.createSlice({
  name: 'sliceMppMediaStreamLocalSelf',
  initialState: new MppMediaStream(),
  reducers: {
    overwriteMpp: (mppMediaStreamLocalSelf, action: Redux.PayloadAction<MppMediaStream>) => {
      return action.payload;
    },
    addToMpp: (mppMediaStreamLocalSelf, action: Redux.PayloadAction<MediaStream>) => {
      mppMediaStreamLocalSelf.set(action.payload.id as MediaStreamId, action.payload);
    },
  },
});
