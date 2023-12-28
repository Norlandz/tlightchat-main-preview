import * as socketioClient from 'socket.io-client';
import { z } from 'zod';

                                                      

class SocketioClientUtil {
                      
  static mpp_RegisteredEvent = new Map<socketioClient.Socket, Set<string>>();

     
                                                           
                          
                 
                    
     
  public static onOnlyOnce(socketioClient: socketioClient.Socket, event: string, listener: (...args: any[]) => void) {
    const arr_registeredEvent = this.mpp_RegisteredEvent.get(socketioClient);
    if (arr_registeredEvent === undefined) {
      this.mpp_RegisteredEvent.set(socketioClient, new Set<string>().add(event));
    } else {
      if (arr_registeredEvent.has(event)) {
        throw new Error('Socketio Event already registered.');
      } else {
        arr_registeredEvent.add(event);
      }
    }
    socketioClient.on(event, listener);
  }

                                                                                                 
                                                                                                               
    
                                                                                 
                                                                                                
    
                           
                                                                          
    
                                                          
                                                           
                       
  public static async emitWithAckError<T>(socket: socketioClient.Socket, timeout: number | undefined, msgType: string, ackCallback: ((data: T) => void) | undefined, ...args: unknown[]) {
    let ackData_obj;
    try {
      if (timeout) {
        ackData_obj = await socket.timeout(timeout).emitWithAck(msgType, ...args);               
      } else {
        ackData_obj = await socket.emitWithAck(msgType, ...args);
      }
    } catch (error) {
      throw new Error(`the server did not acknowledge the event in the given delay ${timeout} :: ` + error);
    }
                                                                                                                 
                        
                 
                                                
                                                 
           
                             

    const safeParse_Data = z.object({ data: z.any() }).strict().safeParse(ackData_obj);
    if (safeParse_Data.success) {
      if (ackCallback) {
        ackCallback(safeParse_Data.data.data as T);        
      }
      return safeParse_Data.data.data;
    }
    const safeParse_Error = z.object({ error: z.any() }).strict().safeParse(ackData_obj);
    if (safeParse_Error.success) {
                                                       
                                      
                                                  
      console.error(safeParse_Error.data.error);
      throw new Error(`server provided back an error`);
    }
    console.error(ackData_obj)
    throw new Error(`server provided back an invalid ackData`);
  }
}

export { SocketioClientUtil };

export type AckData<T> = { error?: Error; data?: T };
