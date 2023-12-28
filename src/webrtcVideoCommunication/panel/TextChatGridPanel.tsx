import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { SignalserverWebsocketMsgType } from '../messageSchema/WebSocketMessage';
import { SignalserverWebsocketClientId } from '../messageSchema/WebrtcConnectionAnchorLocation';
import { RootState } from '../redux/ReduxStore';
import { plainToInstance } from 'class-transformer';
import { SocketioClientSession_forWebrtcConnection } from '../service/EventEmitterNested_forWebrtcConnection';
import { Avatar, Box, Chip, IconButton, Paper, TextareaAutosize, Toolbar, Tooltip, hexToRgb, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ChatIcon from '@mui/icons-material/Chat';

import { ChatMessageInfo, ChatMsgType } from '../messageSchema/ChatMessageInfo';
import { UserWeb } from '../../user/UserWeb';
import { useHotkeys } from 'react-hotkeys-hook';
import dayjs from 'dayjs';
import Draggable from 'react-draggable';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { slice_mppArrPeerChatMsg } from '../redux/slice_mppPeerChatMsgs';
import { ArrPeerChatMsg } from '../dataStructure/MppWebrtcConnectionAnchor';
// import { ChatMsgType } from '@prisma/client';
import styles from '../../scss/index.module.css';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';

export const TextChatGridPanel: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  userWeb_self: UserWeb;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection, userWeb_self }) => {
  // @performance
  // const { user, isAuthenticated, isLoading, error } = useAuth0_debugDomain();

  const dispatch = ReactRedux.useDispatch();

  // aga position of this... cuz global not specific to a peer...
  React.useEffect(() => {
    const socketio_listener = (chatMessageInfo_jsobj: ChatMessageInfo) => {
      const chatMessageInfo = plainToInstance(ChatMessageInfo, chatMessageInfo_jsobj);
      // set_arr_chatMessageInfo_P2p((arr_chatMessageInfo_P2p) => [...arr_chatMessageInfo_P2p, chatMessageInfo]);
      // dk no brain @need_check session thing ...
      dispatch(slice_mppArrPeerChatMsg.actions.addMsg({ userWebId: chatMessageInfo.msgFromId, chatMessageInfo }));
    };

    socketioClientSession_forWebrtcConnection.socket.on(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
    return () => {
      // aga are msg volatile within the gap? ... cuz experienced that the init msg didnt sent
      socketioClientSession_forWebrtcConnection.socket.off(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
    };
  }, [socketioClientSession_forWebrtcConnection.socket]);

  const userWeb_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_userWeb_peer ); // prettier-ignore
  if (userWeb_peer_currSel_rst == null) {
    return (
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 80, right: 80, margin: '0.2rem', padding: '0.2rem' }}>
        <Box component="pre">You need to select a Peer -- to show more Operations on it</Box>
      </Paper>
    );
  }

  return (
    <>
      <TextChat socketioClientSession_forWebrtcConnection={socketioClientSession_forWebrtcConnection} userWeb_self={userWeb_self} userWeb_peer={userWeb_peer_currSel_rst} />
    </>
  );

  // <IconButton children={<ChatIcon />} sx={{ position: 'fixed', bottom: 16, right: 150 }} onClick={() => set_show_rst((show_rst) => !show_rst)} />

  // const [arr_userWeb_Peer, set_arr_userWeb_Peer] = React.useState<UserWeb[]>([]);
  // return (
  //   <Box>
  //     <IconButton
  //       onClick={() => {
  //         // emm this take from lobby user list ... // better just curr selected
  //         set_arr_userWeb_Peer([...arr_userWeb_Peer, userWeb_peer_currSel_rst]);
  //       }}
  //     >
  //       <AddCommentIcon />
  //     </IconButton>
  //     <Box>
  //       {arr_userWeb_Peer.map((userWeb_Peer) => {
  //         return <TextChat key={userWeb_Peer} userWeb_self={userWeb_self} userWeb_peer={userWeb_Peer} />;
  //       })}
  //     </Box>
  //   </Box>
  // );
};

const TextChat: React.FC<{
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  userWeb_self: UserWeb;
  userWeb_peer: UserWeb;
}> = ({ socketioClientSession_forWebrtcConnection, userWeb_self, userWeb_peer }) => {
  // // const arr_chatMessageInfo_P2p: ChatMessageInfo[] = [];
  // const [arr_chatMessageInfo_P2p, set_arr_chatMessageInfo_P2p] = React.useState<ChatMessageInfo[]>([]);

  const mppArrPeerChatMsg_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_mppArrPeerChatMsg ); // prettier-ignore
  const dispatch = ReactRedux.useDispatch();

  const [msgData_rst, set_msgData_rst] = React.useState<string>('');

  // ;moved;   React.useEffect(() => {
  // ;moved;     const socketio_listener = (chatMessageInfo_jsobj: ChatMessageInfo) => {
  // ;moved;       const chatMessageInfo = plainToInstance(ChatMessageInfo, chatMessageInfo_jsobj);
  // ;moved;       set_arr_chatMessageInfo_P2p((arr_chatMessageInfo_P2p) => [...arr_chatMessageInfo_P2p, chatMessageInfo]);
  // ;moved;     };
  // ;moved;
  // ;moved;     socketioClientSession_forWebrtcConnection.socket.on(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
  // ;moved;     return () => {
  // ;moved;       socketioClientSession_forWebrtcConnection.socket.off(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
  // ;moved;     };
  // ;moved;   }, [socketioClientSession_forWebrtcConnection.socket]);
  // ;moved;   // []
  // ;moved;   // Yes, you are right there is no need to include them. Here is quote from [docs](https://reactjs.org/docs/hooks-reference.html#usestate):
  // ;moved;   // > React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.
  // ;moved;   // <>
  // ;moved;   // https://stackoverflow.com/questions/65941767/should-you-pass-setter-functions-into-the-dependency-array-of-a-react-hook
  // ;moved;   // set_arr_chatMessageInfo_P2p is in closure, so unable to detect the need? // nah no chnage

  // enableOnFormTags
  // https://github.com/JohannesKlauss/react-hotkeys-hook
  // https://react-hotkeys-hook.vercel.app/docs/documentation/useHotkeys/disable-hotkeys#enable-hotkeys-on-form-fields
  // https://react-hotkeys-hook.vercel.app/docs/documentation/useHotkeys/basic-usage#modifiers--special-keys
  // []
  // it will trigger both components. Why is that? Hotkeys are attached globally,
  // <>
  // https://react-hotkeys-hook.vercel.app/docs/documentation/useHotkeys/scoping-hotkeys
  const hotkeyRef = useHotkeys<HTMLTextAreaElement>('ctrl+enter', send_clear_Msg, { preventDefault: true, enableOnFormTags: ['input', 'textarea'] });

  // ############

  const arrPeerChatMsg = mppArrPeerChatMsg_rst.get(userWeb_peer.userWebId);
  // if (arrPeerChatMsg === undefined) {
  //   // TextChatGridPanel.tsx:139 Warning: Cannot update a component (`WebrtcConnectionAnchorRcomp`) while rendering a different component (`TextChat`).
  //   dispatch(slice_mppArrPeerChatMsg.actions.initUserWeb(userWeb_peer.userWebId));
  //   return (
  //     <Paper elevation={3} sx={{ position: 'fixed', bottom: 80, right: 80, margin: '0.2rem', padding: '0.2rem' }}>
  //       <Box component="pre">wait for next rerender -- initializing an empty arrPeerChatMsg </Box>
  //       {/* <Box component="pre">No chat msg</Box> */}
  //     </Paper>
  //   );
  // }

  async function sendMsg() {
    const chatMessageInfo = new ChatMessageInfo(ChatMsgType.text, msgData_rst, userWeb_self.userWebId, userWeb_peer.userWebId);
    // set_arr_chatMessageInfo_P2p([...arr_chatMessageInfo_P2p, chatMessageInfo]);
    dispatch(slice_mppArrPeerChatMsg.actions.addMsg({ userWebId: userWeb_peer.userWebId, chatMessageInfo }));

    const timeout_WaitForServerDeliverMsgToPeer = 5000;
    // let ackData: AckData<string>;
    // try {
    //   // TODO sent check
    //   ackData = await socketioClientSession_forWebrtcConnection.socket.timeout(timeout_WaitForServerDeliverMsgToPeer).emitWithAck(SignalserverWebsocketMsgType.chatMessage, chatMessageInfo);
    // } catch (error) {
    //   throw new Error(`the server did not acknowledge the event in the given delay ${timeout_WaitForServerDeliverMsgToPeer} :: ` + error);
    // }
    // if (ackData.error) throw ackData.error;
    // const serverAckMsg = ackData.data;
    // // console.log(serverAckMsg);

    // this._signalserverWebsocketClientId_self_sessionReactApp = await emitWithAckError(this.socket, 1000, SignalserverWebsocketMsgType.signalserverWebsocketClientId_self, user);
    const serverAckMsg = await SocketioClientUtil.emitWithAckError(socketioClientSession_forWebrtcConnection.socket, timeout_WaitForServerDeliverMsgToPeer, SignalserverWebsocketMsgType.chatMessage, undefined, chatMessageInfo);
  }

  function send_clear_Msg(ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) {
    void sendMsg();
    set_msgData_rst('');
  }

  // []
  //           color: "primary.contrastText",
  //           backgroundColor: "primary.main"
  // <>
  // https://stackoverflow.com/questions/75224092/how-do-you-invert-the-primary-and-background-colors-of-a-material-ui-icon
  // deps which use one linear... but welll t ; & e

  const cssId_dragHandler_TextChat = 'cssId_dragHandler_TextChat';

  // []
  // import { Draggable } from '@mui/lab';
  // <>
  // https://codeium.com/live/general
  // https://mui.com/material-ui/react-dialog/#draggable-dialog
  return (
    <Draggable handle={`#${cssId_dragHandler_TextChat}`}>
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 80, right: 80, margin: '0.2rem', padding: '0.2rem', width: '35vw' }}>
        <Toolbar sx={{ backgroundColor: 'rgba(0, 90, 220, 0.2)' }}>
          {/* <Avatar children={<ChatOutlinedIcon sx={{ position: 'absolute', color: 'primary.contrastText', backgroundColor: '' }} />} /> */}
          <Avatar
            id={cssId_dragHandler_TextChat}
            sx={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // backgroundColor: (theme) => `rgba(${hexToRgb(theme.palette.background.default)}, 0.1)`, // transparentBackground: {    backgroundColor: 'rgba(0, 0, 0, 0.1)',  },
              transform: 'translate(-2.8em, -1em)',
              width: '3em',
              height: 'auto',
              aspectRatio: '1/1',
              '&:hover': {
                cursor: 'grab',
              },
            }}
            // sizes='small'
          >
            <ChatIcon
              sx={{
                fontSize: '2em', // codeium says & works emm
              }}
            />
          </Avatar>
          <Tooltip title={`${userWeb_peer.userWebId}`}>
            <Chip variant="outlined" label={`${userWeb_peer.username}`} />
          </Tooltip>
        </Toolbar>
        <Paper
          variant="outlined"
          sx={{
            minHeight: 30,
            maxHeight: '70vh',
            resize: 'both',
            overflow: 'auto',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* {arr_chatMessageInfo_P2p.map((chatMessageInfo_P2p) => {
            return <ChatMessageRcomp key={chatMessageInfo_P2p.uuid} chatMessageInfo={chatMessageInfo_P2p} userWeb_self={userWeb_self} userWeb_peer={userWeb_peer} />;
          })} */}
          {arrPeerChatMsg === undefined ? (
            <Box
              component="pre"
              sx={{ padding: '0.5rem', height: '4em', backgroundImage: 'linear-gradient(165deg, rgba(200, 200, 200, 0.5) 25%, rgba(220, 220, 220, 0.5) 50%, rgba(200, 200, 200, 0.5) 75%)' }}
            >
              {/* (No chat msg) */}
            </Box>
          ) : (
            <>
              {Array.from(arrPeerChatMsg, ([timestamp, chatMessageInfo]) => {
                return <ChatMessageRcomp key={chatMessageInfo.uuid} chatMessageInfo={chatMessageInfo} userWeb_self={userWeb_self} userWeb_peer={userWeb_peer} />;
              })}
            </>
          )}
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <TextField
                // id={styles.cssId_connectionAnchorName_input}
                label="TextChatInputText"
                type="text"
                value={msgData_rst}
                onChange={(ev) => set_msgData_rst(ev.target.value)}
              /> */}
          <TextareaAutosizeStyled ref={hotkeyRef} minRows={2} value={msgData_rst} onChange={(ev) => set_msgData_rst(ev.target.value)} />
          <IconButton children={<SendIcon />} onClick={send_clear_Msg} />
        </Box>
      </Paper>
    </Draggable>
  );
};

const TextareaAutosizeStyled = styled(TextareaAutosize)({
  flexGrow: 1,
  margin: '0.2rem',
  padding: '0.2rem',
  borderRadius: '0.6rem',
  backgroundColor: 'rgb(200,200,200,0.2)',
  '&:hover': { backgroundColor: 'rgb(200,200,200,0.3)' },
  '&:focus': { backgroundColor: 'rgb(200,200,200,0.1)' },
});

// how to parse markdown in javascript material ui - Google 搜索
// https://www.google.ca/search?q=how+to+parse+markdown+in+javascript+material+ui&newwindow=1&sca_esv=593384695&sxsrf=AM9HkKnMzdV6uBK8KHNGsnZFcKKo1OwnkA%3A1703405996086&ei=rOmHZYfvBLuYptQPt4CdsAY&ved=0ahUKEwiH9bfq0aeDAxU7jIkEHTdAB2YQ4dUDCBA&uact=5&oq=how+to+parse+markdown+in+javascript+material+ui&gs_lp=Egxnd3Mtd2l6LXNlcnAiL2hvdyB0byBwYXJzZSBtYXJrZG93biBpbiBqYXZhc2NyaXB0IG1hdGVyaWFsIHVpMggQABiABBiiBEi8GFCRBViNFnAAeAKQAQCYAW6gAa4HqgEEMTEuMbgBA8gBAPgBAcICBBAAGEfCAgYQABgeGArCAgUQIRigAeIDBBgAIEGIBgGQBgo&sclient=gws-wiz-serp
//
// Typography Markdown support? · Issue #12290 · mui/material-ui
// https://github.com/mui/material-ui/issues/12290
//
// Top 11 JavaScript Markdown Libraries
// https://byby.dev/js-markdown-libs
//
// markedjs/marked: A markdown parser and compiler. Built for speed.
// https://github.com/markedjs/marked
//
// javascript - Using react-markdown with Material-UI table - Stack Overflow
// https://stackoverflow.com/questions/62923448/using-react-markdown-with-material-ui-table
//
// remarkjs/react-markdown: Markdown component for React
// https://github.com/remarkjs/react-markdown?tab=readme-ov-file#when-should-i-use-this
//
// mui-markdown - npm
// https://www.npmjs.com/package/mui-markdown

const ChatMessageRcomp: React.FC<{ chatMessageInfo: ChatMessageInfo; userWeb_self: UserWeb; userWeb_peer: UserWeb }> = ({ chatMessageInfo, userWeb_self, userWeb_peer }) => {
  // TODO typesafe
  return (
    <Tooltip title={dayjs(chatMessageInfo.creationTime).format('YYYY-MM-DD HH:mm:ss.SSS')}>
      <Paper
        elevation={3}
        component="pre"
        sx={{
          margin: '0.2rem',
          padding: '0.2rem',
          maxWidth: '70%', // there was a hack to unset the maxWidth for resize
          // resize: 'both',
          // overflow: 'auto',
          // direction: 'rtl', // https://stackoverflow.com/questions/35702705/is-there-a-way-to-change-the-css-resize-corners-position
          // position: 'absolute', dont use this... auto inc height not working // grid is a mess no // just padding ...
          // css - How do I right align div elements? - Stack Overflow
          // https://stackoverflow.com/questions/7693224/how-do-i-right-align-div-elements
          //
          // html - How to Right-align flex item? - Stack Overflow
          // https://stackoverflow.com/questions/22429003/how-to-right-align-flex-item
          // how can such simple thing need tricks to work with ... // that static position why couldnt just easy...
          // 1.  Using float property:@¦@¦Copied! ✅📝 Copy Code@¦@¦`.item1  {   float: left;  }@¦.item2  {   float: right;  }`@¦@¦2.  Using CSS positioning:@¦@¦Copied! ✅📝 Copy Code@¦@¦`.container  {   position: relative;  }@¦.item1  {   position: absolute;   left:  0;  }@¦.item2  {   position: absolute;   right:  0;  }`@¦@¦3.  Using CSS flexbox:@¦@¦Copied! ✅📝 Copy Code@¦@¦`.container  {   display: flex;   justify-content: space-between;  }@¦.item1  {   align-self: flex-start;  }@¦.item2  {   align-self: flex-end;  }`@¦@¦4.  Using CSS grid:@¦@¦Copied! ✅📝 Copy Code@¦@¦`.container  {   display: grid;   grid-template-columns:  1fr  1fr;  }@¦.item1  {   justify-self: start;  }@¦.item2  {   justify-self: end;  }`
          // well that repeat ; float is weird, abs talked ; flex dk not work; grid can; // act on each row but that look like col ... rip just that name is bad
          // ...{
          //   right: chatMessageInfo.msgFrom === userWeb_self ? undefined : 0,
          //   left: chatMessageInfo.msgFrom === userWeb_peer ? 0 : undefined,
          // },
          // ...(chatMessageInfo.msgFrom === userWeb_self ? { right: 0 } : { left: 0 }),
          ...(chatMessageInfo.msgFromId === userWeb_self.userWebId ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }),
        }}
      >
        <Box className={`${styles.MuiMarkdown}`} sx={{ 'code, pre': { fontSize: 'initial' } }}>
          <MuiMarkdown
            // codeWrapperStyles={{ borderRadius: '0.5rem', padding: '0.1em 0.4em', overflow: 'auto' }} // only for pre, not for code
            overrides={{
              ...getOverrides(),
              code: {
                component: CodeStyled,
                // props: {
                //   style: {
                //     // ...getOverrides().code.props.style,
                //     padding: '0.1em 0.4em',
                //     backgroundColor: 'rgba(0, 0, 0, 0.05)',
                //   },
                // },
              },
              pre: {
                props: {
                  style: {
                    padding: '0.1em 0.4em',
                    backgroundColor: 'rgba(210, 210, 210, 0.5)',
                  },
                },
              },
            }}
          >
            {chatMessageInfo.msgData as string}
          </MuiMarkdown>
        </Box>
      </Paper>
    </Tooltip>
  );
};

// ;; https://github.com/HPouyanmehr/mui-markdown how to add css style to the converted `code` from markdown@¦@¦To add CSS styles to the converted `code` from Markdown in the `mui-markdown` library, you can use the `overrides` prop provided by the `Markdown` component. The `overrides` prop allows you to customize the styling of different elements in the rendered Markdown.@¦@¦Here's an example of how you can add CSS styles to the converted `code`:@¦@¦Copied! ✅📝 Copy Code@¦@¦`import  React  from  'react';  import  {  Markdown  }  from  'mui-markdown';  import  { makeStyles }  from  '@material-ui/core/styles';@¦const useStyles =  makeStyles({   code:  {   // Add your CSS styles for code here   // For example:   backgroundColor:  '#f5f5f5',   padding:  '0.5rem',   fontFamily:  'monospace',   },  });@¦function  MyMarkdown({ content })  {   const classes =  useStyles();@¦  return  <Markdown overrides={{  code:  {  component:  'code',  props:  {  className: classes.code  }  }  }}>{content}</Markdown>;  }`@¦@¦In the above example, we define a custom `MyMarkdown` component that wraps the `Markdown` component from the `mui-markdown` library. We use the `makeStyles` hook from `@material-ui/core/styles` to define a CSS class called `code` with the desired styles. Then, we pass the `overrides` prop to the `Markdown` component, specifying that we want to override the styling for the `code` element using our custom CSS class.@¦@¦const CodeStyled = styled(Box)({  padding: '0.1em 0.4em',  backgroundColor: 'rgba(0, 0, 0, 0.05)', });@¦@¦how can I change the Box with some props added@¦@¦To change the `Box` component with additional props in the `CodeStyled` component, you can modify the `styled` function call to accept a function instead of an object. This function will receive the props as an argument and return the styles object. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeStyled  =  styled(Box)((props)  =>  ({   padding:  '0.1em 0.4em',   backgroundColor:  'rgba(0, 0, 0, 0.05)',   // Add your additional styles using the props here  }));`@¦@¦Now you can access the props inside the function and use them to conditionally apply styles or dynamically calculate values.@¦@¦no I want to use <Box component={'code'}@¦@¦To change the component of `Box` to `'code'` in the `CodeStyled` component, you can pass the `component` prop to the `styled` function. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeStyled  =  styled(Box).attrs((props)  =>  ({   component:  'code',  }))({   padding:  '0.1em 0.4em',   backgroundColor:  'rgba(0, 0, 0, 0.05)',  });`@¦@¦By using the `attrs` method of `styled`, you can pass additional props to the underlying component. In this case, we're passing the `component` prop with the value `'code'` to change the component to be rendered.@¦@¦styled(...).attrs is not a function@¦@¦I apologize for the confusion. The `attrs` method is not available directly on the `styled` function. Instead, you can use the `Box` component as a wrapper and pass the additional props directly to it. Here's an updated example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeStyled  =  styled(Box)((props)  =>  ({   padding:  '0.1em 0.4em',   backgroundColor:  'rgba(0, 0, 0, 0.05)',   // Add your additional styles using the props here  }));@¦// Usage:  <CodeStyled  component="code"  />`@¦@¦By passing the `component` prop directly to the `CodeStyled` component, you can change the underlying component to be rendered. In this case, we're setting it to `'code'`.@¦@¦no i need to use the result of CodeStyled , not warping it with more `<>`@¦@¦I apologize for the confusion. If you want to directly modify the `Box` component inside the `CodeStyled` without wrapping it with additional JSX tags, you can use the `withComponent` method provided by the `styled` function. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeStyled  =  styled(Box).withComponent('code')({   padding:  '0.1em 0.4em',   backgroundColor:  'rgba(0, 0, 0, 0.05)',   // Add your additional styles here  });`@¦@¦By using the `withComponent` method, you can change the underlying component to be rendered without wrapping it with additional JSX tags. In this case, we're setting it to `'code'`. Now you can directly use the `CodeStyled` component and it will render as a `code` element with the specified styles and any additional styles you add.@¦@¦no such method in mui@¦@¦I apologize for the confusion. If you are using Material-UI (Mui), you can use the `sx` prop to style the `Box` component and change its component type to `'code'` without using the `styled` function. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`<Box   component="code"   sx={{   padding:  '0.1em 0.4em',   backgroundColor:  'rgba(0, 0, 0, 0.05)',   // Add your additional styles here   }}  >   {/* Content */}  </Box>`@¦@¦By setting the `component` prop to `'code'` and using the `sx` prop to apply styles, you can achieve the desired result without using the `styled` function.@¦@¦I CANOT initail the component with `<>` I need it as IT is@¦@¦I apologize for the misunderstanding. If you want to use the result of `CodeStyled` component directly without wrapping it in additional JSX tags, you can achieve this by using the `as` prop. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦``const  CodeStyled  =  styled(Box)`   padding:  0.1em  0.4em;   background-color:  rgba(0,  0,  0,  0.05);   /* Add your additional styles here */  `;@¦// Usage:  <CodeStyled  as="code"  />``@¦@¦By using the `as` prop on the `CodeStyled` component and setting it to `'code'`, you can change the underlying component to be rendered without wrapping it with additional JSX tags.@¦@¦STOP using `<CodeStyled as="code" />` I can only passin `CodeStyled` not `<CodeStyled as="code" />`@¦@¦I apologize for the confusion. If you want to use the `CodeStyled` component directly without passing the `as` prop, you can achieve this by defining a new component that extends `CodeStyled` and sets the `component` prop to `'code'`. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeWithComponent  =  (props)  =>  <CodeStyled  component="code"  {...props}  />;@¦// Usage:  <CodeWithComponent  />`@¦@¦By creating a new component `CodeWithComponent` that extends `CodeStyled` and sets the `component` prop to `'code'`, you can use `CodeWithComponent` directly without passing the `as` prop.@¦@¦do i need to use React.forwardRef(??@¦@¦If you intend to use the `ref` prop with the `CodeWithComponent` component, you can wrap it with the `React.forwardRef` function. Here's an example:@¦@¦Copied! ✅📝 Copy Code@¦@¦`const  CodeWithComponent  =  React.forwardRef((props, ref)  =>  (   <CodeStyled  component="code"  ref={ref}  {...props}  />  ));@¦// Usage:  <CodeWithComponent  ref={myRef}  />`@¦@¦By using `React.forwardRef`, you can forward the `ref` from the parent component to the underlying `CodeStyled` component. This allows you to access the `ref` and interact with the `CodeStyled` component programmatically if needed.
// const CodeStyled = styled(Box)({
//   padding: '0.1em 0.4em',
//   backgroundColor: 'rgba(0, 0, 0, 0.05)',
// });

// yeah the props should be self custom props ...
// mui how to scope the css to only a component , not the whole document
// eg: `'&:not(pre code)': {` the `pre` checks for whole doc, no, I want the `pre` check for a scoped compnent only
const CodeStyled = React.forwardRef<typeof Box>((props, ref) => (
  <Box
    ref={ref}
    {...props}
    component="code"
    sx={{
      // said that enclosing okok well
      // '&:not(pre code)': {
      // `@scope (.${styles.MuiMarkdown})`: {
      // '@scope (.MuiMarkdown)': {
      // '&:not(pre.MuiMarkdown code)': {
      // TODO prism prismTheme https://github.com/HPouyanmehr/mui-markdown
      [`&:not(.${styles.MuiMarkdown} pre code)`]: {
        padding: '0.1em 0.4em',
        backgroundColor: 'rgba(210, 210, 210, 0.5)',
      },
    }}
  />
));
