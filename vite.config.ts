import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import { createRequire } from 'module';
// import { fileURLToPath } from 'node:url';
// import dts from 'vite-plugin-dts';

// const require = createRequire(import.meta.url)
//
// const prismaClient = require
//    .resolve('@prisma/client')
//    .replace(/@prisma(\/|\\)client(\/|\\)index\.js/, '.prisma/client/index-browser.js')
//
// const prismaIndexBrowser = path.normalize(path.relative(process.cwd(), prismaClient))

// https://vitejs.dev/config/#environment-variables
// export default defineConfig(({ command, mode }) => { // why need import now hwy functio nnot work now
export default defineConfig({
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // envVite = loadEnv(mode, process.cwd(), '');
  // return {
  // vite config
  plugins: [
    react(),
    // ;not_working; dts({
    // ;not_working;   // exclude: ['test/**/*'],
    // ;not_working;   tsconfigPath: './tsconfig.build.json',
    // ;not_working; }),
  ],
  // define: {
  //   __APP_ENV__: JSON.stringify(env.APP_ENV),
  // },

  // ;not_working; []
  // ;not_working; import { configDefaults } from 'vitest/config'
  //;not_working;
  // ;not_working; export default defineConfig({
  // ;not_working;   plugins: [react(), tsconfigPaths()],
  // ;not_working;   test: {
  // ;not_working;     exclude:[
  // ;not_working;       ...configDefaults.exclude,
  // ;not_working;       'shared/*'
  // ;not_working; <>
  // ;not_working; https://stackoverflow.com/questions/74088103/vitest-how-to-exclude-specific-files-and-folders
  // ;not_working; ;misleading; []
  // ;not_working; ;misleading;   build: {
  // ;not_working; ;misleading;     manifest: true,
  // ;not_working; ;misleading;     rollupOptions: {
  // ;not_working; ;misleading;       external: [
  // ;not_working; ;misleading;         ...filesPathToExclude
  // ;not_working; ;misleading;       ],
  // ;not_working; ;misleading;     },
  // ;not_working; ;misleading;   },
  // ;not_working; ;misleading; <>
  // ;not_working; ;misleading; https://stackoverflow.com/questions/75412767/how-to-tell-vite-to-exclude-a-subset-of-files-in-a-directory-from-build
  // ;not_working; []
  // ;not_working; export default {
  // ;not_working;   build: {
  // ;not_working;     rollupOptions: {
  // ;not_working;       input: {
  // ;not_working;         main: './index.html',
  // ;not_working;         nested: './nested/index.html'
  // ;not_working;       },
  // ;not_working;       output: {
  // ;not_working;         dir: 'dist',
  // ;not_working;         entryFileNames: '[name].js'
  // ;not_working;       },
  // ;not_working;       exclude: ['path/to/exclude/*.js']
  // ;not_working;     }
  // ;not_working;   }
  // ;not_working; }
  // ;not_working; <>
  // ;not_working; https://codeium.com/live/general
  // ;not_working; ~~~// e,...
  // ;not_working; build: {
  // ;not_working;   rollupOptions: {
  // ;not_working;     exclude: ['test/**/*'],
  // ;not_working;   },
  // ;not_working; },
  // ;not_working; build: {
  // ;not_working;   rollupOptions: {
  // ;not_working;     external: [/.*/],
  // ;not_working;   },
  // ;not_working; },
  // ;not_working; base: './src',
  // >> ... dk so weak, must exclude from tsconfig.json... why & waste of time .....
  // []
  // I found a way of specifying another tsconfig file through vite-plugin-dts. This is the plugin I'm already using to generate types during the build process.
  // <>
  // https://stackoverflow.com/questions/74359277/running-vite-build-using-tsconfig-build-ts

  //     "// ;not_working; linux? // must double quote...  prisma:inline": "cp ./node_modules/.prisma/client/*.js ./node_modules/@prisma/client",
  //     "// ;not_working; prisma:inline": "copy \"./node_modules/.prisma/client/*.js\" \"./node_modules/@prisma/client\"",
  //     "// ;not_working; prisma:migrate": "prisma migrate deploy && pnpm run prisma:inline",
  //     "// ;not_working; prisma:migrate:dev": "prisma migrate dev && pnpm run prisma:inline",
  //     "// ;not_working; prisma:generate": "prisma generate && pnpm run prisma:inline"
  // vite v5.0.4 building for production...
  // ".prisma/client/index-browser" is imported by ".prisma/client/index-browser?commonjs-external", but could not be resolved – treating it as an external dependency.
  // node_modules/.pnpm/xstate@4.38.3/node_modules/xstate/es/interpreter.js (28:0) A comment
  resolve: {
    alias: {
      // Can not use Prisma from project using Vite · Issue #6491 · prisma/prisma
      // https://github.com/prisma/prisma/issues/6491
      // `Uncaught TypeError: Error resolving module specifier “.prisma/client/index-browser”. Relative module specifiers must start with “./”, “../” or “/”.` · Issue #12504 · prisma/prisma
      // https://github.com/prisma/prisma/issues/12504
      // Qwikcity: Error during build for Vercel Ege · Issue #21094 · prisma/prisma
      // https://github.com/prisma/prisma/issues/21094
      // ;; ".prisma/client": "./node_modules/@prisma/client"
      // ;; ".prisma/client": prismaIndexBrowser
      // ;; '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      '.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js',
    },
  },
});
