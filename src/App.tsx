import React from 'react';
import { LoginButton } from './user/LoginButton';
import { LogoutButton } from './user/LogoutButton';
import { UserProfileOthers, UserProfileSelf, UserProfileSimple } from './user/UserProfile';
import { App_WebrtcVideoCommunication_connectToServer } from './webrtcVideoCommunication/App_WebrtcVideoCommunication_connectToServer';
import styles from './scss/index.module.css';
import { BrowserRouter, Link, NavLink as RouterLink, Route, Routes } from 'react-router-dom';
import { Home } from './homeViewPage/Home';
import { About } from './homeViewPage/About';
                                                                                   
                                                          
                                                          
                                                                                                                                                                                                                                                                                                    
                                
                                            
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  IconButton,
  Snackbar,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
                                                      
import { CollapseAuto } from './utilComponent/materialui/CollapseAuto';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

                                              
                                          
                                        

                                                                               
import { ViewSidebar } from '@mui/icons-material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DuoIcon from '@mui/icons-material/Duo';
                                           

                                                                 
                                                              
                               
                                                                                    
                                    
                                                     
                                                             

                                                 
                
                           
                                                
                                             
                 
                
                                             
                                                   
                 
                
                                     

                                                           
                                              
                                                                                
                                              
                       
                                                              
                                 
                                                                        

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

                                                                                                                                 
                                           
                       
                                                                                          
                          

                                                              
                                                                                   
                                                                   
                                                                 

                                                                    
                                                                    
  
                                          
                                                                   
  
                                                                                                                                                         
                                            

                                                                                    
                                                                            
  
                                                          
                                                       

                                                                                             
                                                                     
                                                    
                                                                                              
                                                                                                    
                                                                                                                                          
                                                                                                       
                                                                                                       
                                                                                                              
                                                                                                                 
                                                                                                                       
                                                     
                                                                     
                                             
                                                        
                                                                                         
                                                               
                                                                                                        
                                                                                                          
                                                                                                                                                      
                                                                
                                                           
                                                  
                                                
                                             
                                                                                       
                                                        
                                                                   
                                                         
                                                                                       
                                                                                 
                                                            
                                                                                             
                                                                      
                                                            
                                                          
                                                              
                                                  
                                                

                                                                    
                                                  
                                 
                                                                           
                                                                                 
                                                                                                                       
                                                            
                                                                                      
                                                                                      
                                               
                                                                 
                                                                                             
                                                                                                
                                                                                                      
                                               
                                  
                                                  
                          
                                     
                                      
                                          
                                                     
                                                 
                                            
                                                             
                                                            
                                
                                            
                                                                                     
                                                                                                              
                                                                               
                                                                             
                                                    
                                           
                                                     
                                             
                                        
                               
                             

                                             

                                                                                 
                                                                                     
                                                                                                            
                        
                              
                                                   
                           
                                                                                                                                                                                                       
                           
                                                                          
                           
                                                                 
                                                           
                                                
                              
                                                                           
                                                           
                        
                                                             
                                                            
                                                    
                                                                
                                
                              
                        
                                                                      
                                            
                                                
                                                            
                        
                                           
                                                               
                                                                                          
                                                                                                
                                        
                                                                                                                                      
                                        
                                       
                                     
                                                                                         
                                                                                                         
                                                                                                         
                                                
                                      
                                        
                                        
                                                                                                          
                                                                                                             
                                                                                                                   
                                  
                                              

            
                                                                    
         
                                                            
                        
                       
                        
                                               
              
             
            
                                                                                                                              
      
                                               
                                                                                        
                       
                       
                        
                                         
                                     
                                 
                                          
                                                       
                                           
                 
              
             
      
                              
                                                  
                                                                             
                                                                                   
                           
                                                                                                                         
                           
                          
                        
                                                                                                 
                                                                                                  
                                                                                            
                                                                                            
                                   
                         
                           
                           
                                                                                             
                                                                                                
                                                                                                      
                     
                                 

     
                                                                                                                                                                                                                                                                        
     
                                                                         
                                                                 
                                                                                       

     
                                                     
     
                                                                                                
type RouterLinkProps = React.ComponentProps<typeof RouterLink>;
                                              
                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
const RouterLinkStyled = (props: RouterLinkProps) => {
                                                                      
                               
  return (
    <Typography noWrap>
      <RouterLink
                    
        {...props}
        style={({ isActive }) => ({
          fontFamily: 'Roboto',
          color: 'inherit',
          textDecoration: 'inherit',
          fontWeight: isActive ? 700 : 'inherit',
                                     
        })}
      />
    </Typography>
  );
};

                                                                         
                                                                                           
                             
                                 
                                          
const theme = createTheme({
  components: {
                                                                                    
                    
                                                                                                                                                           
                                                                                                   
         
                 
    MuiTreeItem: {
      styleOverrides: {
        root: {
          margin: '0.5em',
        },
      },
    },
  },
});

const drawerWidth = 240;

const NavigationPanel: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  let sn_nodeId = 0;
  const iid = () => (++sn_nodeId).toString();

  const jsx_List = (
    <ThemeProvider theme={theme}>
      <TreeView
                                             
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/">Home</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/About">About</RouterLinkStyled>} />
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/WebrtcVideoCommunication">WebrtcVideoCommunication</RouterLinkStyled>} icon={<DuoIcon />} />
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users">Users</RouterLinkStyled>}>
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/self">User_self</RouterLinkStyled>} />
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/1">User_1</RouterLinkStyled>} />
          <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/users/2">User_2</RouterLinkStyled>} />
        </TreeItem>
        <Divider />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities">Activities</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities/played">Played</RouterLinkStyled>} />
        <TreeItem nodeId={iid()} label={<RouterLinkStyled to="/activities/published">Published</RouterLinkStyled>} />
      </TreeView>
    </ThemeProvider>
  );

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
                           
          '& .MuiDrawer-paper': {
            width: drawerWidth,
                                       
            padding: '0.2em',
          },
        }}
                
                                                
                             
                                
                
                                                                         
             
                         
                                                                     
                               
                      
        variant="permanent"                             
        anchor="left"
        style={{ display: open ? undefined : 'none' }}
      >
        {jsx_List}
      </Drawer>
      <IconButton
        sx={{
          zIndex: 1205,
          position: 'fixed',
          bottom: '0',
        }}
        onClick={() => setOpen(!open)}
      >
        <ViewSidebar />
      </IconButton>
    </Box>
  );
};

                                                                                                                          
                            
                                                                               
                                                                
                                                                                                                    

                                                                                 

const LoginPanel: React.FC = () => (
                                              
  <Box>
    <LoginButton />
    <LogoutButton />
    <UserProfileSimple />
  </Box>
);

export default function App() {
                       
                                                                                                               

  let jsx_MenuButton: JSX.Element;
  {
                                                                               
                                                                                            
            

    const [open, setOpen] = React.useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    const action = (
      <IconButton color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    );

    jsx_MenuButton = (
      <>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Snackbar open={open} action={action} autoHideDuration={6000} onClose={handleClose} message="TLightChat version: unknow" />
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavigationPanel />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {                                                                                      }
          <AppBar sx={{ backgroundColor: 'rgb(40,0,86,0.9)' }} position="static">
            <Toolbar>
              {jsx_MenuButton}
              <Typography variant="h1">TLightChat</Typography>
              <span style={{ flexGrow: 5 }} />
              <LoginPanel />
            </Toolbar>
          </AppBar>
          <Box sx={{ margin: '0.4rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/WebrtcVideoCommunication" element={<App_WebrtcVideoCommunication_connectToServer />} />
              <Route path="/users" element={<div>users</div>} />
              <Route path="/users/self" element={<UserProfileSelf />} />
              <Route path="/users/:userId" element={<UserProfileOthers />} />
              <Route path="/activities">
                <Route index element={<div>Activities</div>} />
                <Route path="played" element={<div>Activity Played</div>} />
                <Route path="published" element={<div>Activity Published</div>} />
              </Route>
              <Route path="/n" element={<div>Not Found</div>} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  );
}
