                                                              
                                              
  
                                                                                     
                                              

                                                            
                                              

                                     
                                                                                   

                         
                                                          

                                                                                       
                                                                                                                         
                  
                                                                             
                                                                                      

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Button
      disabled={isAuthenticated}
      onClick={async () => {
                                
                   
                                                                             
                                                                      
                                                              
            
        await loginWithRedirect();
      }}
    >
      Log In
    </Button>
  );
};
