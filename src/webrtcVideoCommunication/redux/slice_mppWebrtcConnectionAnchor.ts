import { MppWebrtcConnectionAnchor } from '../dataStructure/MppWebrtcConnectionAnchor';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
                                                                        

                                                                                                              
                                                                                    
                                                                                         
import { PayloadAction, Draft } from '@reduxjs/toolkit';                                            
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
                                                          

               
   
                                                 
                                                          
  
                                                                                                            
                                                                                           
    
                                                    

                                                                          
                                                                  
                                                                                     
                                                    
   

export const slice_mppWebrtcConnectionAnchor = createSlice({
  name: 'slice_mppWebrtcConnectionAnchor',
           
          
                                                                                                                                                                                               
    
          
                                                                                                                                                                                                                                                                                                                                                                                  
                                                            
                                                                                         
    
                                                                                                          
                                                                                                                               
                                  
                                                                                        
                                  
                                                                                                                                            
                                    
                
                                      
                                                                                                                      
                                                                                       
                                                                           
                
                                                                                                   
                
                                                                      
                                                                     
                
                                                                       
                
                                                                                                                  
                                                             
                                    
                                                      
                                                                                      
                                                                               
                        
  initialState: new MppWebrtcConnectionAnchor(),
                           
                                              
                                              
          
  reducers: {
                                                                                                              
                                   
                                            
                                                             
                                                                                                                                                                                                                                                                                                                                                                                          
    addToMpp: (mppWebrtcConnectionAnchor, action: PayloadAction<WebrtcConnectionAnchor>) => {
                                                           
                                                                                                                                                          
                                                                                                                                                                                   
                                                                                                                                    
                                              
                                                                                                              
                                                                                                                  
                                                                                                                                                        

                                                                                                
                                                                                                 
                                                                                                                                        
                        
      const mppWebrtcConnectionAnchor_new = MppWebrtcConnectionAnchor.init(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
      mppWebrtcConnectionAnchor_new.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload);
      return mppWebrtcConnectionAnchor_new;
    },
                                                                                     
    forceRefreshMpp: (mppWebrtcConnectionAnchor) => {
      console.log('forceRefreshMpp');
                  
                                                                                                                 
      return MppWebrtcConnectionAnchor.init(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
                                                                                                                                                                    
    },
                                                                                                       
                                                           
                               
         
                                                      
                                                                                                                                                                                                
                                                                                                                                             
                                                                                           
                               
                                                
        
  },
});

                                
                                                                                                                                                                                                                                                                                                                                                                                                   
                                
                                                                                                    
                                                                                                                   
                                                                                                                                         
                                                                                                         
                                                                                                                                                                           
                                                                                                                                 

                                                               
                                             
                      
                
                                                                                                
         
                                                        
         
                                                                                                       
         
       
      
