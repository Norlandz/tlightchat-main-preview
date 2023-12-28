import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, combineReducers } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
import { WebrtcConnectionAnchorLocation } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { UserWeb, UserWebId } from '../../user/UserWeb';

// ############

// export const sliceVideoConnectionLinkageDraftCurrSelected = Redux.createSlice({
//   name: 'sliceVideoConnectionLinkageCurrSelected',
//   initialState: {
//     mediaStreamLocalSelf: null,
//     webrtcConnectionAnchorLocation_self: null,
//     // webrtcConnectionAnchor_self: null,
//     webrtcConnectionAnchorLocation_peer: null,
//   } as VideoConnectionLinkageDraftCurrSelected,
//   reducers: {
//     select_mediaStreadLocalSelf: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<MediaStream>) => {
//       videoConnectionLinkageDraftCurrSelected.mediaStreamLocalSelf = action.payload;
//     },
//     select_webrtcConnectionAnchorLocation_self: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
//       videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_self = action.payload;
//     },
//     // select_webrtcConnectionAnchor_self: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<WebrtcConnectionAnchor>) => {
//     //   // @pb[immerjs readonly array assign pb] @not_sure
//     //   videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchor_self = action.payload as unknown as Redux.Draft<WebrtcConnectionAnchor>;
//     // },
//     select_webrtcConnectionAnchorLocation_peer: (videoConnectionLinkageDraftCurrSelected, action: Redux.PayloadAction<WebrtcConnectionAnchorLocation>) => {
//       videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_peer = action.payload;
//     },
//     reset: (videoConnectionLinkageDraftCurrSelected) => {
//       videoConnectionLinkageDraftCurrSelected.mediaStreamLocalSelf = null;
//       videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_self = null;
//       // videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchor_self = null;
//       videoConnectionLinkageDraftCurrSelected.webrtcConnectionAnchorLocation_peer = null;
//     },
//   },
// });

type VideoConnectionLinkageDraftCurrSelected = {
  mediaStreamLocalSelf: MediaStream | null;
  webrtcConnectionAnchorLocation_self: WebrtcConnectionAnchorLocation | null;
  // ;forbidden; <see [the encapsulation of accessing state inside, forbidden the @pb[accessing state without using a hook]]>
  // ;forbidden; webrtcConnectionAnchor_self: WebrtcConnectionAnchor | null;
  webrtcConnectionAnchorLocation_peer: WebrtcConnectionAnchorLocation | null;
};

// glad didnt use in production code.. this useRef .. cannot reset easily ...
/** @deprecated */
export const videoConnectionLinkageDraftCurrSelected_ref = {
  mediaStreamLocalSelf: null,
  webrtcConnectionAnchorLocation_self: null,
  // webrtcConnectionAnchor_self: null,
  webrtcConnectionAnchorLocation_peer: null,
} as VideoConnectionLinkageDraftCurrSelected;

/** @deprecated */
export function reset_videoConnectionLinkageDraftCurrSelected_ref() {
  videoConnectionLinkageDraftCurrSelected_ref.mediaStreamLocalSelf = null;
  videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_self = null;
  videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer = null;
}

export const slice_mediaStreamLocalSelf_currSel = createSlice({
  name: 'slice_mediaStreamLocalSelf_currSel',
  initialState: null as MediaStream | null,
  reducers: {
    select_mediaStreadLocalSelf: (mediaStreamLocalSelf_prev, action: PayloadAction<MediaStream>) => {
      videoConnectionLinkageDraftCurrSelected_ref.mediaStreamLocalSelf = action.payload;
      return action.payload;
    },
  },
});
export const slice_webrtcConnectionAnchorLocation_self_currSel = createSlice({
  name: 'slice_webrtcConnectionAnchorLocation_self_currSel',
  initialState: null as WebrtcConnectionAnchorLocation | null,
  reducers: {
    select_webrtcConnectionAnchorLocation_self: (webrtcConnectionAnchorLocation_self_prev, action: PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_self = action.payload;
      return action.payload;
    },
  },
});
export const slice_webrtcConnectionAnchorLocation_peer_currSel = createSlice({
  name: 'slice_webrtcConnectionAnchorLocation_peer_currSel',
  initialState: null as WebrtcConnectionAnchorLocation | null,
  reducers: {
    select_webrtcConnectionAnchorLocation_peer: (webrtcConnectionAnchorLocation_peer_prev, action: PayloadAction<WebrtcConnectionAnchorLocation>) => {
      videoConnectionLinkageDraftCurrSelected_ref.webrtcConnectionAnchorLocation_peer = action.payload;
      return action.payload;
    },
  },
});
/** @deprecated ? but if need serialization.. this is better ...  */
export const slice_userWebId_peer_currSel = createSlice({
  name: 'slice_userWebId_peer_currSel',
  initialState: null as UserWebId | null,
  reducers: {
    select_userWebId_peer: (userWebId_peer_prev, action: PayloadAction<UserWebId>) => {
      return action.payload;
    },
  },
});
export const slice_userWeb_peer_currSel = createSlice({
  name: 'slice_userWeb_peer_currSel',
  initialState: null as UserWeb | null,
  reducers: {
    select_userWeb_peer: (userWeb_peer_prev, action: PayloadAction<UserWeb>) => {
      return action.payload;
    },
  },
});

export const reducer_videoConnectionLinkageDraftCurrSelected = combineReducers({
  reducer_mediaStreamLocalSelf: slice_mediaStreamLocalSelf_currSel.reducer,
  reducer_webrtcConnectionAnchorLocation_self: slice_webrtcConnectionAnchorLocation_self_currSel.reducer,
  reducer_webrtcConnectionAnchorLocation_peer: slice_webrtcConnectionAnchorLocation_peer_currSel.reducer,
  reducer_userWebId_peer: slice_userWebId_peer_currSel.reducer,
  reducer_userWeb_peer: slice_userWeb_peer_currSel.reducer,
});
