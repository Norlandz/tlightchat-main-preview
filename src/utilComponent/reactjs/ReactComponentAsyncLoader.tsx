// import React from 'react';
// 
// // []
// // `children` prop was removed from `React.FunctionComponent` (`React.FC`) so you have to declare it explicitly.
// // <>
// // https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc/71800185#71800185
// //
// // that is due to Captial letter detection ......
// 
// // // cuz TypeProp can cover that already emmm
// // // feels passing prop is messy . better just use function ...
// // type TypePromiseResult_TypeProp<TypePromiseResult, TypeProp> = { resultResolved: TypePromiseResult } & TypeProp ;
// //
// // // eslint-disable-next-line @typescript-eslint/ban-types
// // export function generate_ReactComponentAsyncLoader<TypePromiseResult, TypeProp = {}>(
// //   ReactComponent: React.FC<TypePromiseResult_TypeProp<TypePromiseResult, TypeProp>>,
// //   promise: Promise<TypePromiseResult>,
// //   jsx_Loading: React.ReactNode = 'loading...'
// // ): React.FC<TypeProp> {
// 
// 
// // []
// // The component returned by the HOC uses `Subtract` from
// // 
// // [Piotrek Witek](https://medium.com/u/960d9fbe7faf?source=post_page-----42278f7590fb--------------------------------)
// // 
// // ’s [utility-types](https://github.com/piotrwitek/utility-types) package, which will subtract the injected props from the passed in component’s props, meaning that if they are set on the resulting wrapped component you will receive a compilation error:
// // <>
// // https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
// // TODO collision reserved naming is another pb
// // @messy really messy ........ but let me get job done first ... 
// export function generate_ReactComponentAsyncLoader<TypePromiseResult, TypeProps = NonNullable<unknown>>(
//   ReactComponent: React.FC<{ resultResolved: TypePromiseResult } & TypeProps>,
//   promise: Promise<TypePromiseResult>,
//   jsx_Loading: React.ReactNode = 'loading...'
// ): React.FC<TypeProps> {
//   return (props) => {
//     if (Object.prototype.hasOwnProperty.call(props, 'resultResolved')) {
//       throw new TypeError('This is a reserved keyword. Hoc design is bit messy.');
//     }
//     const init = Symbol('init');
//     const [resultResolved, set_resultResolved] = React.useState<TypePromiseResult | symbol>(init);
// 
//     React.useEffect(() => {
//       (async () => {
//         // const localWebcamVideoStream = await navigator.mediaDevices.getUserMedia({ video: true /* audio: true */ });
//         const result = await promise;
//         set_resultResolved(result);
//       })();
//     }, []);
// 
//     if (resultResolved !== init) {
//       return <ReactComponent resultResolved={resultResolved as TypePromiseResult} {...props} />;
//     } else {
//       // return jsx_Loading; // Type '() => string | number | boolean | Iterable<React.ReactNode> | JSX.Element | null' is not assignable to type 'FC<{}>'.
//       // return <ReactComponent resultResolved={resultResolved!} />;
//       return <>{jsx_Loading}</>; // dk is this appropriate , return not FC em
//     }
//   };
// }
