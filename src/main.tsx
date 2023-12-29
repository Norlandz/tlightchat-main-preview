import './mainPreImport';

import React from 'react';
import ReactDOM from 'react-dom/client';
                                                                                                                  
import App from './App';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { MuiTheme } from './cssTheme/MuiTheme';

                                         
                                               
          
                                                                                                                                                                                          
                                                                                                                                                            
                              
                                                                                                                                    

                                                                                                            
                                                                                                                  
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN as string ?? (() => { throw new TypeError(); })();                   
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID as string ?? (() => { throw new TypeError(); })();                   
const AUTH0_redirect_uri = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={MuiTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: AUTH0_redirect_uri,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>
                       
              
                         
);

                                           
                                                         
                                                                    
                                                         
                                
                                                                                                                                      
                                                             

     
                                                                                                                                                                                                              
     
                                                                                       

                                                       
                                                                                        
  
                                                                             
                                                                                            

                                                   
                                                  
                                     
                        

                  
                                                                               
                                       
