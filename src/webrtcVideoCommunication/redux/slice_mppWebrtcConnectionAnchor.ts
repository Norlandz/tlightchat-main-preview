import { MppWebrtcConnectionAnchor } from '../dataStructure/MppWebrtcConnectionAnchor';
import { WebrtcConnectionAnchor } from '../dataStructure/WebrtcConnectionAnchor';
import * as Redux from '@reduxjs/toolkit';

               
   
                                                 
                                                          
  
                                                                                                            
                                                                                           
    
                                                    

                                                                          
                                                                  
                                                                                     
                                                    
   

export const slice_mppWebrtcConnectionAnchor = Redux.createSlice({
  name: 'slice_mppWebrtcConnectionAnchor',
           
          
                                                                                                                                                                                               
    
          
                                                                                                                                                                                                                                                                                                                                                                                  
                                                            
                                                                                         
    
                                                                                                          
                                                                                                                               
                                  
                                                                                        
                                  
                                                                                                                                            
                                    
                
                                      
                                                                                                                      
                                                                                       
                                                                           
                
                                                                                                   
                
                                                                      
                                                                     
                
                                                                       
                
                                                                                                                  
                                                             
                                    
                                                      
                                                                                      
                                                                               
                        
  initialState: new MppWebrtcConnectionAnchor(),
  reducers: {
                                                                                                              
                                   
                                            
                                                             
                                                                                                                                                                                                                                                                                                                                                                                          
    addToMpp: (mppWebrtcConnectionAnchor, action: Redux.PayloadAction<WebrtcConnectionAnchor>) => {
                                                        
                                                                                                                                                       
      mppWebrtcConnectionAnchor.set(action.payload.webrtcConnectionAnchorLocation_self.webrtcConnectionAnchorId, action.payload as unknown as Redux.Draft<WebrtcConnectionAnchor>);
    },
                                                                                     
    forceRefreshMpp: (mppWebrtcConnectionAnchor) => {
                  
      return new MppWebrtcConnectionAnchor(mppWebrtcConnectionAnchor as unknown as MppWebrtcConnectionAnchor);
                                                                                                                                                                    
    },
    overwriteMpp: (mppWebrtcConnectionAnchor, action: Redux.PayloadAction<MppWebrtcConnectionAnchor>) => {
                                                        
      return action.payload;
    },
  },
});


                                
                                                                                                                                                                                                                                                                                                                                                                                                   
                                
                                                                                                    
                                                                                                                   
                                                                                                                                         
                                                                                                         
                                                                                                                                                                           
                                                                                                                                 

