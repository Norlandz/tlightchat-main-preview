import { MppWebrtcConnectionAnchor } from '../dataStructure/MppWebrtcConnectionAnchor';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
// import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';

// import { createSlice } from '@reduxjs/toolkit'; // import { PayloadAction, Draft } from '@reduxjs/toolkit';
// import Redux from '@reduxjs/toolkit'; // idk esm export thing but just sucks Jest
// import * as Redux from '@reduxjs/toolkit'; // idk esm export thing but just sucks Jest
import { PayloadAction, Draft } from '@reduxjs/toolkit'; // idk esm export thing but just sucks Jest
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
// // https://github.com/reduxjs/redux-toolkit/issues/1960

// ############
/**
 * the key is webrtcConnectionAnchorLocation_peer
 * well, each user can have multiple connection points ...
 *
  // well or just use webrtcConnectionAnchorId_self, peer just display as info, but the id get still self ..
  // & that need exclusive webrtcConnectionAnchorId_self too.. not 1 point to multi now ...
  //
  // feels bit breaking the multi player concept ...

  webrtcConnectionAnchorId is unique inside the scope of a local React App
  represents a connection on one side of {@link RTCPeerConnection}
  SignalServer will use webrtcConnectionAnchorLocation as its own level of uniqueness
  (the combine will provide the combined uniqueness)
 */

export const slice_mppWebrtcConnectionAnchor = createSlice({
  name: 'slice_mppWebrtcConnectionAnchor',
  // REVIEW
  // FIXME
  // @pb[Map inside state Redux immerjs] // normalize pb + serialization pb + @pb[a map of local state pb -- each dynamically created list item component needs to publish its state to global]
  //
  // FIXME
  // @pb[normalized state & classtransform ref] // >> @conlusion: instanceToPlain doesnt store the ref of the object -- it will be a new object ... // how i didnt notice/thought of this, this is big potential issue // only thought of circular dep ... // flatten,.. so cuz all is just ref to obj -- so normalize is indeed what i want (more than what i thought it was... )
  // @comment-think[normalization & database table access..]
  // unless the pb of ref is solved, the advantge of classtransformer is reduced a lot...
  //
  // @design[create global slice with state with id & use id to access state of each list item component]:
  // @design: @pb[a map of local state pb -- each dynamically created list item component needs to publish its state to global]
  // @design: @knowlres-ref: // []
  // @design: @knowlres-ref: //   const value = useSelector((state) => state.child[id]);
  // @design: @knowlres-ref: // <>
  // @design: @knowlres-ref: // https://stackoverflow.com/questions/76069230/how-to-control-state-of-dynamic-components-with-react-and-redux
  // @design: the design debate is::
  // @design: 1.
  // @design: the linkage is decoupled
  // @design: -- `OfferReceivedList` is moved from inside the ContainingClass `WebrtcConnectionAnchor` to a ReduxSlice
  // @design: -- this is good for an ReduxState -- its so nested & bad designed already
  // @design: -- but also means the logical intuitive relation is broken...
  // @design: 1.
  // @design: the use of id to access is very like database table (-- copes with normalization too)
  // @design: 1.
  // @design: the determination of the state should be in which level?
  // @design: as the Map? as the Linkage? as the `OfferReceivedList`?
  // @design: 1.
  // @design: the aceess to id is intrinsically same meaning as the Map
  // @design: 1.
  // @design: the encapsulation of accessing state inside, forbidden the @pb[accessing state without using a hook]
  // @design: -- or that is the bad design of currSelect? ...
  // @design: other designs talked::
  // @design: 1. old one use the map, refresh the map;
  // @design: 1. create Slices/Context -- global state as dynamically create Component
  // @design: 1. add the useState hook to a list & update all when one changed;
  // @design: 1. dk miss
  initialState: new MppWebrtcConnectionAnchor(),
  // initialState: (() => {
  //   console.log('combined rrrrrrrrrr?????')
  //   return new MppWebrtcConnectionAnchor();
  // })(),
  reducers: {
    // Youtube 20230531 [Redux ｜ #49 - Creating Reducers [By Mosh Hamedani]] 7o64Ge9eLdM .mp4 - PotPlayer 0227
    // 1. immerjs dont need return?
    // 1. is this shallow copy or deep copy?
    // 1. act for each step inside? not the whole map update?
    // 1. Argument of type 'WebrtcConnectionAnchor' is not assignable to parameter of type 'WritableDraft<WebrtcConnectionAnchor>'.   The types of 'webrtcConnectionEventHistory.history' are incompatible between these types.     The type 'readonly WebrtcConnectionEvent[]' is 'readonly' and cannot be assigned to the mutable type 'WritableDraft<WebrtcConnectionEvent>[]'.ts(2345)
    addToMpp: (mppWebrtcConnectionAnchor, action: PayloadAction<WebrtcConnectionAnchor>) => {
      // // @pb[immerjs readonly array assign pb] @not_sure
      // // https://stackoverflow.com/questions/60002846/how-can-you-replace-entire-state-in-redux-toolkit-reducer https://immerjs.github.io/immer/return/
      // // mppWebrtcConnectionAnchor.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload as unknown as Draft<WebrtcConnectionAnchor>);
      // mppWebrtcConnectionAnchor.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload);
      // // return mppWebrtcConnectionAnchor; 
      // // >" case reducer on a non-draftable value must not return undefined // before with map was fine... 
      // return MppWebrtcConnectionAnchor.init(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
      // // not showing, seems custom class instance is no good for Redux (Map just slightly less worse) // seem like need forceUpdate Everytime now .. 

      // @note, @tofix seems due to that Redux just cache the inital version of the reference...
      // so just NEVER modify on the inital state.. (though idk when get in the React Component) 
      // @pb: [passing undefined to combined reducer gives a new state with old fields inside - the ori inital state is cached and used]
      // TODO for others
      const mppWebrtcConnectionAnchor_new = MppWebrtcConnectionAnchor.init(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
      mppWebrtcConnectionAnchor_new.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload);
      return mppWebrtcConnectionAnchor_new;
    },
    // forceRefreshMpp pb is when executed multi times -- without anything changed ..
    forceRefreshMpp: (mppWebrtcConnectionAnchor) => {
      console.log('forceRefreshMpp');
      // @not_sure
      // return new MppWebrtcConnectionAnchor(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
      return MppWebrtcConnectionAnchor.init(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
      // ;not_working; mppWebrtcConnectionAnchor.set('__forceRefreshMpp' as WebrtcConnectionAnchorId, Date.now() as unknown as Redux.Draft<WebrtcConnectionAnchor>);
    },
    // overwriteMpp: (mppWebrtcConnectionAnchor, action: PayloadAction<MppWebrtcConnectionAnchor>) => {
    //   // @pb[immerjs readonly array assign pb] @not_sure
    //   return action.payload;
    // },
    // reset: (mppWebrtcConnectionAnchor, action) => {
    //   console.log('//? Idk why I pass in undefined to combined reducers, it just wont use the inital state, the old fields from prev state are still there; have to maunally handle this.'); 
    //   // the way redux force serialization immutability just stuipd , the performance sucks , the reference sucks ; this bug just no_idea 
    //   // ~~~// seems due to that Redux just cache the inital version of the reference...
    //   throw new TypeError();
    //   return new MppWebrtcConnectionAnchor();
    // }
  },
});

// ;[preact signal (fail)] // []
// ;[preact signal (fail)] // Note: The React integration plugs into some React internals and may break unexpectedly in future versions of React. If you are using Signals with React and encounter errors such as "Rendered more hooks than during previous render", "Should have a queue. This is likely a bug in React." or "Cannot redefine property: createElement" please open an issue here.
// ;[preact signal (fail)] // <>
// ;[preact signal (fail)] // https://github.com/preactjs/signals/blob/main/packages/react/README.md
// ;[preact signal (fail)] export const signal_mppWebrtcConnectionAnchor = signal(new MppWebrtcConnectionAnchor());
// ;[preact signal (fail)] const webrtcConnectionAnchor = new WebrtcConnectionAnchor(signalserverWebsocketClientId_self_sessionReactApp);
// ;[preact signal (fail)] const mppWebrtcConnectionAnchor_prev = signal_mppWebrtcConnectionAnchor.value;
// ;[preact signal (fail)] mppWebrtcConnectionAnchor_prev.set(webrtcConnectionAnchor.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, webrtcConnectionAnchor);
// ;[preact signal (fail)] signal_mppWebrtcConnectionAnchor.value = new MppWebrtcConnectionAnchor(mppWebrtcConnectionAnchor_prev)

// export const slice_mppWebrtcConnectionAnchor = createSlice({
//   name: 'slice_mppWebrtcConnectionAnchor',
//   initialState: {},
//   reducers: {
//     addToMpp: (mppWebrtcConnectionAnchor, action: PayloadAction<WebrtcConnectionAnchor>) => {
//     },
//     forceRefreshMpp: (mppWebrtcConnectionAnchor) => {
//     },
//     overwriteMpp: (mppWebrtcConnectionAnchor, action: PayloadAction<MppWebrtcConnectionAnchor>) => {
//     },
//   },
// });
