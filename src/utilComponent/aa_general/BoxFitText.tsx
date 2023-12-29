import React from 'react';
import { Box } from '@mui/material';

export const BoxFitText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
             
  const initFontSize_ToStartReduceFrom = 32;
  const marginBuffer_ToTriggerIncreaseFontSize = 20;
  const stepFactor_ToReduceFontSize = 0.8;

             
  const [rerenderLoop_CheckWidthSmaller, set_rerenderLoop_CheckWidthSmaller] = React.useState<number>(0);
  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);
  const [rerenderLoopBreak, set_rerenderLoopBreak] = React.useState(false);

             
                                                                                              
  const lastOpeWas_ReduceFontSize = React.useRef(false);

             
  const [resizeObserver, set_resizeObserver] = React.useState(
    new ResizeObserver(() => {
                                                                                                                  
      set_rerenderLoop_CheckWidthSmaller((n) => n + 1);
    })
  );

             
                                                            
  const [elt_parent, set_elt_parent] = React.useState<HTMLElement | null>(null);
  const elt_parent_ref = React.useCallback((node: HTMLElement | null) => {
    if (node === null) console.warn('// why? dk React ref ...');
    set_elt_parent(node);
  }, []);
  const elt_child_ref = React.useRef<HTMLElement>(null);

             
  const [fontSize, setFontSize] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
                               
    if (elt_parent == null) {
                               
      console.warn('// why? dk React ref ...');
      return;
    }
    if (elt_child_ref.current == null) throw new TypeError();

    if (rerenderLoopBreak) return;

    const width_parent = elt_parent.offsetWidth;
    const width_child = elt_child_ref.current.offsetWidth;

    console.log({ width_parent, width_child });
                                                                 
                                 

    if (width_child > width_parent) {
      setFontSize((fontSize_N) => {
        console.log({ fontSize_N });
        lastOpeWas_ReduceFontSize.current = true;
        if (fontSize_N && fontSize_N < 1) {
                                                          
                                                                   
          console.error('fontSize_N < 1');
          set_rerenderLoopBreak(true);
        }
        if (fontSize_N === undefined) {
          return initFontSize_ToStartReduceFrom;                 
        } else {
          return fontSize_N * stepFactor_ToReduceFontSize;
        }
      });
    } else {
                                                                                                                          
                                                                                     
                                                                       
                      
      if (lastOpeWas_ReduceFontSize.current || width_parent - width_child <= marginBuffer_ToTriggerIncreaseFontSize) {
                      
        lastOpeWas_ReduceFontSize.current = false;
      }
                                                                            
      else {
        setFontSize((fontSize_N) => {
          lastOpeWas_ReduceFontSize.current = false;
                                            
                                  
                     
                                       
              
          return undefined;
        });
      }
    }
  }, [fontSize, rerenderLoop_CheckWidthSmaller, rerenderLoopBreak, elt_parent, lastOpeWas_ReduceFontSize]);

  React.useEffect(() => {
                                                                                                                                            
                                                                                                                                                                                                         
                                                                                                                                              
                                                                                              
    if (elt_parent == null) {
      console.warn('// why? dk React ref ...');
    } else {
      resizeObserver.observe(elt_parent);
    }

    return () => {
                                                                                                             
                                                                                                                               
                                                                                                                                                                     
                                                                                                                                                 
                                                                                             
                                              
                                                                                                                                                                  
                                              
                                                                                                                                                                        
                                                                                                                                    
                                                                                                                                                  
                                                                                                                                                                
                                                                                                                                                                        
                                           
                                                                                    
                                        
                                                                                      
                                                                     
                                                                   
                                                  
                                                    
                                           
                                                                                                                                 
      resizeObserver.disconnect();
    };
  }, [elt_parent, resizeObserver]);                                                                

  return (
    <Box
      sx={{
        width: '100%',
        border: '4px solid rgba(0, 255, 0, 0.5)',
      }}
      ref={elt_parent_ref}
    >
      <Box
        sx={{
          width: 'fit-content',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          fontSize: fontSize,
        }}
        ref={elt_child_ref}
      >
        {children}
      </Box>
    </Box>
  );
};

                                                    
                                                          
                                                                                         
                                                                                        
                            
                                                              
                                    
                            
                                                      
                                                          
                                                                                                     
                                                                                         
                                                                                       
                            
                                                                            
                                                                                              
                                                              
                            
                                                                  
                                                                
                                                                 
                                                                        
                                                                                       
                                                                                                
                                                                       
                                                                   
                                      
                                                                    
                                                          
                                             
                                                               
                                      
                                      
                                  
                                
