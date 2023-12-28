// reactjs - How to recognize env variables in typescript when using vite? - Stack Overflow
// https://stackoverflow.com/questions/67060543/how-to-recognize-env-variables-in-typescript-when-using-vite
// Define Types for process.env in TypeScript | by Glasshost | Medium
// https://medium.com/@glasshost/define-types-for-process-env-in-typescript-c89b3c8ffbb2

// /// <reference types="vite/client" />
// 
// interface ImportMetaEnv {
//   readonly VITE_YOUR_ENV_VAR_1: string
//   readonly VITE_YOUR_ENV_VAR_2: string
//   // more env variables...
// }
// 
// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }