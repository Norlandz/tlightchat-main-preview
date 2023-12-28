import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
                                          
                                            
                                     

                                                 
  
                               
                                
                                                                                         
  
                                                                                        

                                                   
                                                                                                        
export default defineConfig({
                                                                    
                                                                                    
                                                
             
                
  plugins: [
    react(),
                          
                                                 
                                                             
                        
  ],
              
                                                
       

                     
                                                                 
                 
                                                
                                                         
                            
                                
                                                   
                                   
                     
                                                                                                                
                                  
                                          
                                                   
                                                    
                                                 
                                                             
                                        
                                      
                                    
                                  
                                                                                                                                                    
                     
                                   
                             
                                       
                                 
                                                
                                                        
                           
                                  
                                       
                                                      
                           
                                                          
                        
                      
                    
                     
                                                   
                              
                           
                                     
                                              
                       
                     
                           
                                     
                                        
                       
                     
                                 
                                                                                    
       
                                                                                                                                                                
       
                                                                                            

                                                                                                                                                 
                                                                                                                           
                                                                                              
                                                                                               
                                                                                        
                                           
                                                                                                                                                                       
                                                                                            
  resolve: {
    alias: {
                                                                                 
                                                     
                                                                                                                                                                                             
                                                      
                                                                                   
                                                      
                                                             
                                                
                                                                                             
      '.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js',
    },
  },
});
