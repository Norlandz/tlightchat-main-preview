// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: ['.eslintrc.{js,cjs}'],
//       parserOptions: {
//         sourceType: 'script',
//       },
//     },
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint', 'react'],
//   rules: {
//   },
// };

/** @type {import('eslint').Linter.Config} */ // https://github.com/typescript-eslint/typescript-eslint/issues/2153
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'], // , 'next/core-web-vitals', 'plugin:@next/next/recommended' , 'react-app', 'react-app/jest'
  ignorePatterns: ['dist', '.eslintrc.cjs', '**/node_modules/**/*', '/coverage', 'config/jest/*.cjs'], // 'vite.config.ts', 'next.config.js', 'jest.config.ts', 'jest.setup.ts', 'Globals.d.ts'
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'], // 'H:/Using/TLightChat/tlightchat-main/tsconfig.json',
    // ecmaFeatures: {
    //   jsx: true,
    // },
    // ecmaVersion: 12,
    // sourceType: 'module',
  },
  plugins: [
    // '@typescript-eslint',
    // 'react',
    'react-refresh',
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn', // error -> then force type cast -- actually no much safer ...
    '@typescript-eslint/no-unsafe-argument': 'error',
    'prefer-const': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    'no-empty': 'warn', // dk ... so many , before didnt install ext / the npm .. dk
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    'no-inner-declarations': 'off',
    'no-constant-condition': 'warn',
    'no-useless-escape': 'warn',

    // https://github.com/vercel/next.js/discussions/24254
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#additional-configurations
    // ~~~// ;not_working; waste my time
    // doc specify multi things but unclear on what was there to take effect
    // default install of plugins are poor
    // '@next/next/no-html-link-for-pages': 'error',
  },
};

// // const config = {
// // export default config;
//
// // Cannot read config file: H:\Using\code_comment_remover-ui-awstest\.eslintrc.js Error: Unexpected token 'export'
// // dk . must cjs? ...
//
// // []
// // I think we could update the `--init` command to read `package.json`, and if it has `"type": "module"` then create `.eslintrc.cjs` instead of `.eslintrc.js`.
// // <>
// // https://github.com/eslint/eslint/issues/14137
