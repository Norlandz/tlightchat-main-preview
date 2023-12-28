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
                                                
import styles from '../../scss/index.module.css';
import { SocketioClientUtil } from '../../util/socketio/SocketioUtil';

export const TextChatGridPanel: React.FC<{
  signalserverWebsocketClientId_self_sessionReactApp: SignalserverWebsocketClientId;
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  userWeb_self: UserWeb;
}> = ({ signalserverWebsocketClientId_self_sessionReactApp, socketioClientSession_forWebrtcConnection, userWeb_self }) => {
                 
                                                                                

  const dispatch = ReactRedux.useDispatch();

                                                                 
  React.useEffect(() => {
    const socketio_listener = (chatMessageInfo_jsobj: ChatMessageInfo) => {
      const chatMessageInfo = plainToInstance(ChatMessageInfo, chatMessageInfo_jsobj);
                                                                                                                 
                                                  
      dispatch(slice_mppArrPeerChatMsg.actions.addMsg({ userWebId: chatMessageInfo.msgFromId, chatMessageInfo }));
    };

    socketioClientSession_forWebrtcConnection.socket.on(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
    return () => {
                                                                                              
      socketioClientSession_forWebrtcConnection.socket.off(SignalserverWebsocketMsgType.chatMessage, socketio_listener);
    };
  }, [socketioClientSession_forWebrtcConnection.socket]);

  const userWeb_peer_currSel_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_videoConnectionLinkageDraftCurrSelected.reducer_userWeb_peer );                   
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

                                                                                                                                                    

                                                                                    
             
            
                    
                           
                                                                                   
                                                                                   
             
          
                             
                      
              
                                                    
                                                                                                            
              
               
             
       
};

const TextChat: React.FC<{
  socketioClientSession_forWebrtcConnection: SocketioClientSession_forWebrtcConnection;
  userWeb_self: UserWeb;
  userWeb_peer: UserWeb;
}> = ({ socketioClientSession_forWebrtcConnection, userWeb_self, userWeb_peer }) => {
                                                              
                                                                                                          

  const mppArrPeerChatMsg_rst = ReactRedux.useSelector( (state: RootState) => state.reducer_mppArrPeerChatMsg );                   
  const dispatch = ReactRedux.useDispatch();

  const [msgData_rst, set_msgData_rst] = React.useState<string>('');

                                      
                                                                                        
                                                                                                   
                                                                                                                           
                   
            
                                                                                                                                  
                               
                                                                                                                                     
                   
                                                                      
                    
                                                                                                                                                         
                                                                                                                                                                                               
                    
                                                                                                                                         
                                                                                                           

                     
                                                         
                                                                                                                      
                                                                                                            
       
                                                                                 
       
                                                                                        
  const hotkeyRef = useHotkeys<HTMLTextAreaElement>('ctrl+enter', send_clear_Msg, { preventDefault: true, enableOnFormTags: ['input', 'textarea'] });

                 

  const arrPeerChatMsg = mppArrPeerChatMsg_rst.get(userWeb_peer.userWebId);
                                        
                                                                                                                                                          
                                                                                     
               
                                                                                                                     
                                                                                                     
                                                         
                 
         
      

  async function sendMsg() {
    const chatMessageInfo = new ChatMessageInfo(ChatMsgType.text, msgData_rst, userWeb_self.userWebId, userWeb_peer.userWebId);
                                                                                  
    dispatch(slice_mppArrPeerChatMsg.actions.addMsg({ userWebId: userWeb_peer.userWebId, chatMessageInfo }));

    const timeout_WaitForServerDeliverMsgToPeer = 5000;
                                    
            
                           
                                                                                                                                                                                                
                        
                                                                                                                                             
        
                                              
                                         
                                    

                                                                                                                                                                                   
    const serverAckMsg = await SocketioClientUtil.emitWithAckError(socketioClientSession_forWebrtcConnection.socket, timeout_WaitForServerDeliverMsgToPeer, SignalserverWebsocketMsgType.chatMessage, undefined, chatMessageInfo);
  }

  function send_clear_Msg(ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) {
    void sendMsg();
    set_msgData_rst('');
  }

       
                                             
                                              
       
                                                                                                                           
                                                   

  const cssId_dragHandler_TextChat = 'cssId_dragHandler_TextChat';

       
                                          
       
                                     
                                                               
  return (
    <Draggable handle={`#${cssId_dragHandler_TextChat}`}>
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 80, right: 80, margin: '0.2rem', padding: '0.2rem', width: '35vw' }}>
        <Toolbar sx={{ backgroundColor: 'rgba(0, 90, 220, 0.2)' }}>
          {                                                                                                                                  }
          <Avatar
            id={cssId_dragHandler_TextChat}
            sx={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',                                                                                                                                                                     
              transform: 'translate(-2.8em, -1em)',
              width: '3em',
              height: 'auto',
              aspectRatio: '1/1',
              '&:hover': {
                cursor: 'grab',
              },
            }}
                            
          >
            <ChatIcon
              sx={{
                fontSize: '2em',                            
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
          {                                                          
                                                                                                                                                                     
                }
          {arrPeerChatMsg === undefined ? (
            <Box
              component="pre"
              sx={{ padding: '0.5rem', height: '4em', backgroundImage: 'linear-gradient(165deg, rgba(200, 200, 200, 0.5) 25%, rgba(220, 220, 220, 0.5) 50%, rgba(200, 200, 200, 0.5) 75%)' }}
            >
              {                   }
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
          {             
                                                               
                                         
                           
                                   
                                                                   
                   }
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

                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  
                                                                
                                                  
  
                                       
                                    
  
                                                                    
                                     
  
                                                                            
                                                                                           
  
                                                        
                                                                                       
  
                     
                                             

const ChatMessageRcomp: React.FC<{ chatMessageInfo: ChatMessageInfo; userWeb_self: UserWeb; userWeb_peer: UserWeb }> = ({ chatMessageInfo, userWeb_self, userWeb_peer }) => {
                  
  return (
    <Tooltip title={dayjs(chatMessageInfo.creationTime).format('YYYY-MM-DD HH:mm:ss.SSS')}>
      <Paper
        elevation={3}
        component="pre"
        sx={{
          margin: '0.2rem',
          padding: '0.2rem',
          maxWidth: '70%',                                                     
                            
                              
                                                                                                                                       
                                                                                                                        
                                                                      
                                                                                          
            
                                                                  
                                                                                      
                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                
                 
                                                                               
                                                                              
               
                                                                                        
          ...(chatMessageInfo.msgFromId === userWeb_self.userWebId ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }),
        }}
      >
        <Box className={`${styles.MuiMarkdown}`} sx={{ 'code, pre': { fontSize: 'initial' } }}>
          <MuiMarkdown
                                                                                                                                     
            overrides={{
              ...getOverrides(),
              code: {
                component: CodeStyled,
                           
                             
                                                             
                                              
                                                              
                       
                     
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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                                   
                            
                                            
      

                                                 
                                                                        
                                                                                                                   
const CodeStyled = React.forwardRef<typeof Box>((props, ref) => (
  <Box
    ref={ref}
    {...props}
    component="code"
    sx={{
                                      
                             
                                             
                                   
                                         
                                                                          
      [`&:not(.${styles.MuiMarkdown} pre code)`]: {
        padding: '0.1em 0.4em',
        backgroundColor: 'rgba(210, 210, 210, 0.5)',
      },
    }}
  />
));
