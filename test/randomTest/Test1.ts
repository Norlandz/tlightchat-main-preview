                                                     
                                                              
  
                                                                                       
  
                        



                                                 
   
                                                            
                                                           
   
                                
          
                                                                                                                  
                                 
                      
                                                                                                          
      
    
   
                               
          
                                                                                                                
                                 
                      
                                                                                                          
      
    
   
                     
                    

                                                                             
                                                 
                                               


                               
import dotenvFlow from 'dotenv-flow';
console.log('>---<');
                                     
dotenvFlow.config({ debug: true });

const ARR_VITE_DOMAIN = JSON.parse(
                                                                                                                
  (process.env.ARR_VITE_DOMAIN) ?? (() => { throw new TypeError(); })()                   
) as string[];
console.log('ARR_VITE_DOMAIN', ARR_VITE_DOMAIN);
console.log('TEST_LOCAL_OVERWRITE', process.env.TEST_LOCAL_OVERWRITE);