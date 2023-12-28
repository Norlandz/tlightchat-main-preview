// import synchronizedPrettier from '@prettier/sync';
// import { PrintUtil } from '../../src/util/print/PrintUtil';
//
// let content = synchronizedPrettier.format(undefined, PrintUtil.prettierOption_html);
//
// console.log(content);



// import { io, Socket } from 'socket.io-client';
// 
// const socket_Alpha: Socket = io('http://localhost:3000');
// const socket_Beta: Socket = io('http://localhost:3000');
// 
// async function demo_Alpha() {
//   try {
//     const serverAckMsg = (await socket_Alpha.timeout(2000).emitWithAck('topicAA', 'msg from Alpha')) as string;
//     console.log(serverAckMsg);
//   } catch (error) {
//     throw new Error(`the server did not acknowledge the event in the given delay ${2000} :: ` + error);
//   }
// }
// 
// async function demo_Beta() {
//   try {
//     const serverAckMsg = (await socket_Beta.timeout(2000).emitWithAck('topicAA', 'msg from Beta')) as string;
//     console.log(serverAckMsg);
//   } catch (error) {
//     throw new Error(`the server did not acknowledge the event in the given delay ${2000} :: ` + error);
//   }
// }
// 
// void demo_Alpha();
// void demo_Beta();

// import { MediaStreamSrcFile } from '../../src/session/MediaStreamSrcFile';
// console.log(Object.values(MediaStreamSrcFile))
// console.log(Object.keys(MediaStreamSrcFile))


// import dotenv from 'dotenv';
import dotenvFlow from 'dotenv-flow';
console.log('>---<');
// dotenv.config({ override: true });
dotenvFlow.config({ debug: true });

const ARR_VITE_DOMAIN = JSON.parse(
  // (import.meta.env.VITE_ARR_VITE_DOMAIN as string) ?? (() => { throw new TypeError(); })() // prettier-ignore
  (process.env.ARR_VITE_DOMAIN) ?? (() => { throw new TypeError(); })() // prettier-ignore
) as string[];
console.log('ARR_VITE_DOMAIN', ARR_VITE_DOMAIN);
console.log('TEST_LOCAL_OVERWRITE', process.env.TEST_LOCAL_OVERWRITE);