import React, { Dispatch, SetStateAction } from 'react';

/**
 * @purpose::
 * @topic: `state` can go into **`stale state closure problem`**
 * @know: the `state` is designed to be immutable in React -- every time you setState, you pass in a **new copy**
 * @pb: but when the `state` is in a **closure** (eg: `useEffect`), the reference of the state can be **stale**
 * @soln-not_desired: you need to use `dependency array` to update the `state` in `useEffect`
 * @soln-desired: you can use `ref` -- every time you `.current =`, the ref reference will still **stay the same**.
 * (-- @note: the value you pass in to the `.current` can still be a new copy -- but that wont matter)
 *
 * @main-res: https://stackoverflow.com/questions/66603920/combining-usestate-and-useref-in-reactjs
 * @dk still dk is this proper // Dont know if there is a better way.
 * @param initialState
 * @returns
 * state: use this to get the state & for rerender
 * getRefValue(): use this to get the state value  (-- with no `stale state closure problem`)
 * setStateRef(): use this to change state & ref (both sync)
 * - Dont use `ref.current` to change the ref (Only) -- to avoid that, `ref` is not returned (encapsulated), only getRefValue() is provided.
 * // ;encapsulate; @dk if this encapsulate is proper documentation
 * // ;encapsulate; export interface MutableRefObjectOnlyWhenInInternalCode<T> extends React.RefObject<T> { readonly current: T; }
 * // ;encapsulate; // cuz Java.. new Interface, but still, changing from mutable to immutable, feels against the syntax, and confusing.
 * // ;encapsulate; // Maybe should return another object instead?  // dont make copy, that defeat the whole purpose of Ref...
 * // ;encapsulate; // if only return getter for value, or return wrapper ... that if adds extra layer understanding ...
 * // ;encapsulate; // still, once have access, the use case is so unpredictable, not just a documentation can save the day .. better just completely encapsualte it -- cuz for now, dont see usage of accessing the Real Ref... // the Type, need to change code aga ..
 * // potential concurrency pb with Ref? ..
 * // actually the ref is refer to the new copy also... it just not stale
 */
export function useStateRef<S>(initialState: S | (() => S)): readonly [S, Dispatch<SetStateAction<S>>, RefObjectWrapper<S>] {
  const [state, setState] = React.useState<S>(initialState);

  const ref: React.MutableRefObject<S> = React.useRef<S>(state); // dont just passin the initalState -- it can be a Function

  // @note,aga: https://stackoverflow.com/questions/45472944/how-to-define-the-type-of-a-named-function https://stackoverflow.com/questions/70053133/how-to-apply-a-function-type-to-a-function-declaration
  const setStateRef: Dispatch<SetStateAction<S>> = function (newState) {
    // #>> state initializer function
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
    // #>> state
    else {
      ref.current = newState;
      setState(newState);
    }
  };

  /** (for encapsulation on ref) */
  // function getRefValue(): S {
  //   return ref.current;
  // }

  // ;encapsulate; return [state, setStateRef, ref as React.MutableRefObject/RefObject<S>] as const;
  return [state, setStateRef, new RefObjectWrapper(ref)] as const;
}

/** (for encapsulation on ref) */
export class RefObjectWrapper<S> {
  constructor(
    /** @deprecated <see [Dont use `ref.current` to change the ref (Only)]> */
    public readonly ref: React.MutableRefObject<S>
  ) {}

  get current(): S {
    return this.ref.current;
  }
}

// /**@¦//  * @note: `type SetStateAction<S> = S | ((prevState: S) => S);`@¦//  * @param stateFunction___stateResult@¦//  * @returns@¦//  */@¦// function resolve_init_stateFunction_to_stateResult<S>(stateFunction___stateResult: S | (() => S)): S {@¦//   let state_result: S;@¦//   if (typeof stateFunction___stateResult === 'function') {@¦//     state_result = (stateFunction___stateResult as () => S)(); // dk why, seem typeof cause the checking wrong@¦//   } else {@¦//     state_result = stateFunction___stateResult as S;@¦//   }@¦//   return state_result;@¦// }@¦//@¦// function resolve_new_stateFunction_to_stateResult<S>(stateFunction___stateResult: SetStateAction<S>): S {@¦//   let state_result: S;@¦//   if (typeof stateFunction___stateResult === 'function') {@¦//     XXX@¦//   } else {@¦//     state_result = stateFunction___stateResult as S;@¦//   }@¦//   return state_result;@¦// }@¦//@¦// export function useStateRef<S>(initialState: S | (() => S)): readonly [S, Dispatch<SetStateAction<S>>, React.RefObject<S>] {@¦//   const [state, setState] = React.useState<S>(initialState);@¦//@¦//   // that is very wrong .... you execute the function twice then ...@¦//   const ref = React.useRef<S>(resolve_init_stateFunction_to_stateResult<S>(initialState));@¦//@¦//   const setStateRef: Dispatch<SetStateAction<S>> = function (newState) {@¦//     ref.current = resolve_new_stateFunction_to_stateResult<S>(newState);@¦//     setState(newState);@¦//   };@¦//@¦//   return [state, setStateRef, ref as React.RefObject<S>] as const;@¦// }

/**
 * This is actually unsafe & incompleted.
 * There is only limited things you can test with type guard on functions.
 * // ;no_knowlres; aga, I dont know how React in source code checks the function type. (maybe they do the same -- just check for function type)
 * // ;no_knowlres; Im unable to find the source code in Vscode, idk cuz React doesnt publish the source code to npm or what.
 * // ;no_knowlres; Guding through Github source code instead is a pain.
 * @param funcTest
 * @returns
 */
function typeGuard_S2S<S>(funcTest: SetStateAction<S>): funcTest is (prevState: S) => S {
  if (typeof funcTest === 'function') {
    return true;
  }
  return false;
}
