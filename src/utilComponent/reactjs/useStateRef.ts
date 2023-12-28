import React, { Dispatch, SetStateAction } from 'react';

   
             
                                                                
                                                                                                                 
                                                                                                               
                                                                                             
                                                                                                                   
                                                                                                      
  
                                                                                                   
                                                                     
                      
           
                                                  
                                                                                             
                                                            
                                                                                                                                            
                                                                   
                                                                                                                                  
                                                                                                                                        
                                                                                                                              
                                                                                                                        
                                                                                                                                                                                                                                                                        
                                           
                                                                         
   
export function useStateRef<S>(initialState: S | (() => S)): readonly [S, Dispatch<SetStateAction<S>>, RefObjectWrapper<S>] {
  const [state, setState] = React.useState<S>(initialState);

  const ref: React.MutableRefObject<S> = React.useRef<S>(state);                                                            

                                                                                                                                                                                                           
  const setStateRef: Dispatch<SetStateAction<S>> = function (newState) {
                                     
    if (typeof newState === 'function') {
      if (typeGuard_S2S<S>(newState)) {
        setState((prevState) => {
          const result = newState(prevState);
          ref.current = result;
          return result;
        });
      } else {
        throw new TypeError(`typeof newState is a function, but not in the structure of ((prevState: S) => S): ${newState}`);
      }
    }
                
    else {
      ref.current = newState;
      setState(newState);
    }
  };

                                   
                                
                          
      

                                                                                                    
  return [state, setStateRef, new RefObjectWrapper(ref)] as const;
}

                                 
export class RefObjectWrapper<S> {
  constructor(
                                                                              
    public readonly ref: React.MutableRefObject<S>
  ) {}

  get current(): S {
    return this.ref.current;
  }
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

   
                                         
                                                                          
                                                                                                                                                
                                                                                                                             
                                                                        
                  
           
   
function typeGuard_S2S<S>(funcTest: SetStateAction<S>): funcTest is (prevState: S) => S {
  if (typeof funcTest === 'function') {
    return true;
  }
  return false;
}
