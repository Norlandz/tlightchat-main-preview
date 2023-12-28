import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
                                               

                                                 
                                                                                                        

                                             

                                     
const uu_Select_PaddingTop = '0.2em';
const MuiTheme = createTheme({
  palette: {
    mode: 'light',
                 
                         
                                                                
                                                               
                                                                                  
         
                   
                         
                          
                                                                 
                                 
         
                    
                    
                                    
                                   
         
                                                   
  },
  typography: {
                    
    body1: {
      fontFamily: 'Times New Roman',
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
                
                               
                                               
         
    h1: {
      margin: 0,
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h4: {
      margin: 0,
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 500,
      fontSize: '1.15rem',
                         
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
                                                
                                                      
          padding: '0.3em',
          lineHeight: 1.25,
          color: 'inherit',              
          fontSize: '0.9em',
        },
      },
           
                                                       
                               
           
           
                                                                                           
                                                        
                                                      
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
                                                                
          margin: 0,
                              
                              
        },
        label: {
                       
                              
                              
          fontFamily: 'Consolas',
          fontSize: '0.8em',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
                  
                                    
                               
                                                                    
        input: {
          fontFamily: 'Consolas',
          fontSize: '0.8em',
                        
        },
      },
    },
                  
                          
                  
                        
             
                   
                        
            
          
         
            
                                                                                                                                                                                                                         
            
                                                                                                        
            
                                        
                   
                         
              
             
         
                                                                      
            
                                                             
                                                                
    MuiOutlinedInput: {
      styleOverrides: {
                  
                        
             
        input: {
          padding: '0.5em',
                                                                            
        },
                                                                                                      
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '0.5em',
          verticalAlign: 'middle',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
                   
          '&:not(.MuiInputLabel-shrink)': {
            transform: `translate(14px, ${uu_Select_PaddingTop}) scale(1)`,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: '1em',
          padding: `${uu_Select_PaddingTop} 0.5em 0.5em 0.5em`,
        },
      },
    },
                    
                          
                  
                               
             
          
         
    MuiStepLabel: {
      styleOverrides: {
                  
                               
             
        label: {
          fontSize: '0.8em',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '2em',
               
                                                                                                                                    
               
                                             
          '@media (min-width: 600px)': {
            minHeight: '3em',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        arrow: true,
        PopperProps: {
                  
                                     
              
               
                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                               
               
                                             
                                                                                                      
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10],                                            
              },
            },
          ],
        },
      },
      styleOverrides: {
                     
                                   
             
                    
                                                                             
                                                    
             
                                 
                                   
             
      },
    },
  },
});

                                     
export { MuiTheme };
