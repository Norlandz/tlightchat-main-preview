import * as socketioClient from 'socket.io-client';
import { z } from 'zod';

// is an class instance better for this Util class?...

class SocketioClientUtil {
  // bad static design
  static mpp_RegisteredEvent = new Map<socketioClient.Socket, Set<string>>();

  /**
   * only one event handler can be registered for one event
   * @param socketioClient
   * @param event
   * @param listener
   */
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

  // javascript - How do I send an error packet to a single client in socket io? - Stack Overflow
  // https://stackoverflow.com/questions/32046379/how-do-i-send-an-error-packet-to-a-single-client-in-socket-io
  //
  // javascript - How to pass error object to socket.io callback - Stack Overflow
  // https://stackoverflow.com/questions/20915608/how-to-pass-error-object-to-socket-io-callback
  //
  // Client API | Socket.IO
  // https://socket.io/docs/v4/client-api/#socketemitwithackeventname-args
  //
  // Handling event responses and failures · SocketCluster
  // https://socketcluster.io/docs/14.4.2/handling-failure/
  // ..................
  public static async emitWithAckError<T>(socket: socketioClient.Socket, timeout: number | undefined, msgType: string, ackCallback: ((data: T) => void) | undefined, ...args: unknown[]) {
    let ackData_obj;
    try {
      if (timeout) {
        ackData_obj = await socket.timeout(timeout).emitWithAck(msgType, ...args); // need spread
      } else {
        ackData_obj = await socket.emitWithAck(msgType, ...args);
      }
    } catch (error) {
      throw new Error(`the server did not acknowledge the event in the given delay ${timeout} :: ` + error);
    }
    // ackData = z.object({ error: z.error().optional(), data: z.unknown().optional() }).strict().parse(ackData);
    // const ackData = z
    //   .union([
    //     z.object({ data: z.any() }).strict(),
    //     z.object({ error: z.any() }).strict(),
    //   ])
    //   .parse(ackData_obj);

    const safeParse_Data = z.object({ data: z.any() }).strict().safeParse(ackData_obj);
    if (safeParse_Data.success) {
      if (ackCallback) {
        ackCallback(safeParse_Data.data.data as T); //@todo
      }
      return safeParse_Data.data.data;
    }
    const safeParse_Error = z.object({ error: z.any() }).strict().safeParse(ackData_obj);
    if (safeParse_Error.success) {
      // must wrap with Error, else wont have trace ...
      // why cant just print the error
      // @todo how to get stack trace from server 
      console.error(safeParse_Error.data.error);
      throw new Error(`server provided back an error`);
    }
    console.error(ackData_obj)
    throw new Error(`server provided back an invalid ackData`);
  }
}

export { SocketioClientUtil };

export type AckData<T> = { error?: Error; data?: T };
