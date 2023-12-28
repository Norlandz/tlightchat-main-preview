import { Box } from '@mui/material';

export const TitleCollapse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
        padding: '0.2em',
        fontFamily: 'Consolas',
        display: 'inline-block',

                                                             
                                         
          
                                                           
                                                                                     
                                     
                              
                                
                                       
                          
                             
                                
                                                  
                                         
                  
          
                                                                                                                                             
                                                                                                                                               
                                                                             
                                                           
                                                                                                                                                                        
           
                                  
                                                                                                                                
                                     
                                              
                                              
                                      
                                                      
                                             
                      
           
                                                                               
        '&::before': {
          content: '" "',
          display: 'inline-block',
          height: '0.8em',
          width: '0.2em',
          verticalAlign: 'middle',
          background: 'linear-gradient(180deg, rgba(200, 200, 200, 0.5) 25%, rgba(150, 150, 150, 0.5) 50%, rgba(200, 200, 200, 0.5) 75%)',
          margin: '0 0.6em 0 0',
        },
      }}
    >
      {children}
    </Box>
  );
};


