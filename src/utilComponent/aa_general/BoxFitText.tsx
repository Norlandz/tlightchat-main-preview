import React from 'react';
import { Box } from '@mui/material';

export const BoxFitText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ########
  const initFontSize_ToStartReduceFrom = 32;
  const marginBuffer_ToTriggerIncreaseFontSize = 20;
  const stepFactor_ToReduceFontSize = 0.8;

  // ########
  const [rerenderLoop_CheckWidthSmaller, set_rerenderLoop_CheckWidthSmaller] = React.useState<number>(0);
  const [, forceRerender] = React.useReducer((state: number, action: string) => state + 1, 0);
  const [rerenderLoopBreak, set_rerenderLoopBreak] = React.useState(false);

  // ########
  // const [lastOpeWas_ReduceFontSize, set_lastOpeWas_ReduceFontSize] = React.useState(false);
  const lastOpeWas_ReduceFontSize = React.useRef(false);

  // ########
  const [resizeObserver, set_resizeObserver] = React.useState(
    new ResizeObserver(() => {
      // @messy @think: delegate job to useEffect above -- like a loop -- but messed up cuz need React rerender ..
      set_rerenderLoop_CheckWidthSmaller((n) => n + 1);
    })
  );

  // ########
  // const elt_parent_ref = React.useRef<HTMLElement>(null);
  const [elt_parent, set_elt_parent] = React.useState<HTMLElement | null>(null);
  const elt_parent_ref = React.useCallback((node: HTMLElement | null) => {
    if (node === null) console.warn('// why? dk React ref ...');
    set_elt_parent(node);
  }, []);
  const elt_child_ref = React.useRef<HTMLElement>(null);

  // ########
  const [fontSize, setFontSize] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    // after mount cant be null
    if (elt_parent == null) {
      // throw new TypeError();
      console.warn('// why? dk React ref ...');
      return;
    }
    if (elt_child_ref.current == null) throw new TypeError();

    if (rerenderLoopBreak) return;

    const width_parent = elt_parent.offsetWidth;
    const width_child = elt_child_ref.current.offsetWidth;

    console.log({ width_parent, width_child });
    // const css_fontSize = elt_child_ref.current.style.fontSize;
    // console.log(css_fontSize);

    if (width_child > width_parent) {
      setFontSize((fontSize_N) => {
        console.log({ fontSize_N });
        lastOpeWas_ReduceFontSize.current = true;
        if (fontSize_N && fontSize_N < 1) {
          // throw new TypeError(); // @todo inf recursion
          // could be the batch pb where its not even rerendered...
          console.error('fontSize_N < 1');
          set_rerenderLoopBreak(true);
        }
        if (fontSize_N === undefined) {
          return initFontSize_ToStartReduceFrom; // @todo @config
        } else {
          return fontSize_N * stepFactor_ToReduceFontSize;
        }
      });
    } else {
      // lastOpeWas_ReduceFontSize is to prevent a case where MarginBuffer is small, but the jump is big -- cauze inf loop
      // -- only reduced to an ideal size, everything is set tone, no more increasing
      // -- increasing should only be called when parent elt is resized
      // @todo @config
      if (lastOpeWas_ReduceFontSize.current || width_parent - width_child <= marginBuffer_ToTriggerIncreaseFontSize) {
        // @do_nothing
        lastOpeWas_ReduceFontSize.current = false;
      }
      // grow back the size to original -> then repeat the reduce loop again
      else {
        setFontSize((fontSize_N) => {
          lastOpeWas_ReduceFontSize.current = false;
          // if (fontSize_N === undefined) {
          //   return 32; // @todo
          // } else {
          //   return fontSize_N * 1.2;
          // }
          return undefined;
        });
      }
    }
  }, [fontSize, rerenderLoop_CheckWidthSmaller, rerenderLoopBreak, elt_parent, lastOpeWas_ReduceFontSize]);

  React.useEffect(() => {
    // @note-bit: ;moved;;M1? [resizeObserver is always new... disconnect cant cleanup];   const resizeObserver = new ResizeObserver(() => {
    // @note-bit: ;moved;;M1? [resizeObserver is always new... disconnect cant cleanup];     // @messy @think: delegate job to useEffect above -- like a loop -- but messed up cuz need React rerender ..
    // @note-bit: ;moved;;M1? [resizeObserver is always new... disconnect cant cleanup];     set_rerenderLoop_CheckWidthSmaller((n) => n + 1);
    // @note-bit: ;moved;;M1? [resizeObserver is always new... disconnect cant cleanup];   });
    if (elt_parent == null) {
      console.warn('// why? dk React ref ...');
    } else {
      resizeObserver.observe(elt_parent);
    }

    return () => {
      // @:[said ref mess ;.&. r l a] // @: reactjs - Detect element reference height change - Stack Overflow
      // @:[said ref mess ;.&. r l a] // @: https://stackoverflow.com/questions/68175873/detect-element-reference-height-change
      // @:[said ref mess ;.&. r l a] // @: ~~~// aga why no better way direct access to React componnent virtual dom? this now so hard to sync the ref & stale thing
      // @:[said ref mess ;.&. r l a] // @: @thinK: said those freaking stale state .. the React API just dont provide good way to access things.
      // @:[said ref mess ;.&. r l a] // @: resizeObserver.unobserve(elt_parent_ref.current);
      // @:[said ref mess ;.&. r l a] // @: []
      // @:[said ref mess ;.&. r l a] // @: It isn't safe because mutating the reference **won't trigger a render**, therefore, **won't trigger** the `useEffect`.
      // @:[said ref mess ;.&. r l a] // @: <>
      // @:[said ref mess ;.&. r l a] // @: https://stackoverflow.com/questions/60476155/is-it-safe-to-use-ref-current-as-useeffects-dependency-when-ref-points-to-a-dom
      // @:[said ref mess ;.&. r l a] // @: javascript - How do we know when a React ref.current value has changed? - Stack Overflow
      // @:[said ref mess ;.&. r l a] // @: https://stackoverflow.com/questions/55838351/how-do-we-know-when-a-react-ref-current-value-has-changed
      // @:[said ref mess ;.&. r l a] // @: reactjs - Is it safe to use ref.current as useEffect's dependency when ref points to a DOM element? - Stack Overflow
      // @:[said ref mess ;.&. r l a] // @: https://stackoverflow.com/questions/60476155/is-it-safe-to-use-ref-current-as-useeffects-dependency-when-ref-points-to-a-dom
      // @:[said ref mess ;.&. r l a] // []
      // @:[said ref mess ;.&. r l a] //     const [node, setNode] = useState(null);
      // @:[said ref mess ;.&. r l a] //
      // @:[said ref mess ;.&. r l a] //     const measuredRef = useCallback(node => {
      // @:[said ref mess ;.&. r l a] //         if (node !== null) {
      // @:[said ref mess ;.&. r l a] //             setNode(node);
      // @:[said ref mess ;.&. r l a] //         }
      // @:[said ref mess ;.&. r l a] //     }, []);
      // @:[said ref mess ;.&. r l a] // <>
      // @:[said ref mess ;.&. r l a] // https://stackoverflow.com/questions/58483197/measure-react-dom-node-on-resize-with-hooks
      resizeObserver.disconnect();
    };
  }, [elt_parent, resizeObserver]); // though put resizeObserver, it should never be chnaged though

  return (
    <Box
      sx={{
        width: '100%',
        border: '4px solid rgba(0, 255, 0, 0.5)',
      }}
      ref={elt_parent_ref}
    >
      <Box
        sx={{
          width: 'fit-content',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          fontSize: fontSize,
        }}
        ref={elt_child_ref}
      >
        {children}
      </Box>
    </Box>
  );
};

//  ;useeffect vs if, flush; React.useEffect(() => {
//  ;useeffect vs if, flush;   // after mount cant be null
//  ;useeffect vs if, flush;   if (elt_parent_ref.current == null) throw new TypeError();
//  ;useeffect vs if, flush;   if (elt_child_ref.current == null) throw new TypeError();
//  ;useeffect vs if, flush;
//  ;useeffect vs if, flush;   forceRerender('forceRerender');
//  ;useeffect vs if, flush; }, []);
//  ;useeffect vs if, flush;
//  ;useeffect vs if, flush; if (!rerenderLoopBreak) {
//  ;useeffect vs if, flush;   // after mount cant be null
//  ;useeffect vs if, flush;   if (elt_parent_ref.current != null && elt_child_ref.current != null) {
//  ;useeffect vs if, flush;     const width_parent = elt_parent_ref.current.offsetWidth;
//  ;useeffect vs if, flush;     const width_child = elt_child_ref.current.offsetWidth;
//  ;useeffect vs if, flush;
//  ;useeffect vs if, flush;     console.log({ width_parent, width_child });
//  ;useeffect vs if, flush;     // const css_fontSize = elt_child_ref.current.style.fontSize;
//  ;useeffect vs if, flush;     // console.log(css_fontSize);
//  ;useeffect vs if, flush;
//  ;useeffect vs if, flush;     if (width_child > width_parent) {
//  ;useeffect vs if, flush;       setFontSize((fontSize_N) => {
//  ;useeffect vs if, flush;         console.log({ fontSize_N });
//  ;useeffect vs if, flush;         if (fontSize_N && fontSize_N < 1) {
//  ;useeffect vs if, flush;           // throw new TypeError(); // @todo inf recursion
//  ;useeffect vs if, flush;           // could be the batch pb where its not even rerendered...
//  ;useeffect vs if, flush;           console.error('fontSize_N < 1');
//  ;useeffect vs if, flush;           set_rerenderLoopBreak(true);
//  ;useeffect vs if, flush;         }
//  ;useeffect vs if, flush;         if (fontSize_N === undefined) {
//  ;useeffect vs if, flush;           return 32; // @todo
//  ;useeffect vs if, flush;         } else {
//  ;useeffect vs if, flush;           return fontSize_N * 0.8;
//  ;useeffect vs if, flush;         }
//  ;useeffect vs if, flush;       });
//  ;useeffect vs if, flush;     }
//  ;useeffect vs if, flush;   }
