import * as socketIoClient from 'socket.io-client';

                                                      

class SocketioClientUtil {
                      
  static mpp_RegisteredEvent = new Map<socketIoClient.Socket, Set<string>>();

     
                                                           
                          
                 
                    
     
  static onOnlyOnce(socketioClient: socketIoClient.Socket, event: string, listener: (...args: any[]) => void) {
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
}

export { SocketioClientUtil };
