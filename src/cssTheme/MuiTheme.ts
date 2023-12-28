import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
// import { lime } from '@mui/material/colors';

// ;not_suppoerted; createTheme external css file
//no_knowlres `border: `1px solid ${theme.palette.primary.main}`,` how to access to the primary color???

// ~~~~// ok that is why need <CssBaseline />

// const { palette } = createTheme();
const uu_Select_PaddingTop = '0.2em';
const MuiTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#FF5733',
    //   // light: will be calculated from palette.primary.main,
    //   // dark: will be calculated from palette.primary.main,
    //   // contrastText: will be calculated to contrast with palette.primary.main
    // },
    // secondary: {
    //   main: '#E0C2FF',
    //   light: '#F5EBFF',
    //   // dark: will be calculated from palette.secondary.main,
    //   contrastText: '#47008F',
    // },
    // type: 'dark',
    // background: {
    //   dark: 'hsl(230, 17%, 14%)',
    //   light: 'hsl(0, 0%, 100%)',
    // },
    // lime: palette.augmentColor({ color: lime }),
  },
  typography: {
    // fontSize: 14,
    body1: {
      fontFamily: 'Times New Roman',
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: 0,
    },
    // button: {
    //   textTransform: 'none',
    //   // ;not_working; variant: 'contained',
    // },
    h1: {
      margin: 0,
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h4: {
      margin: 0,
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 500,
      fontSize: '1.15rem',
      // lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          // ;not_working; variant: 'contained',
          // border: `1px solid rgba(0, 0, 200, 0.5)`,
          padding: '0.3em',
          lineHeight: 1.25,
          color: 'inherit', // ... idk ..
          fontSize: '0.9em',
        },
      },
      // []
      // @@ -312,4 +313,4 @@ TextField.defaultProps = {
      //   variant: 'standard',
      // };
      // <>
      // How to make TextField defaults to filled variant? · Issue #14373 · mui/material-ui
      // https://github.com/mui/material-ui/issues/14373
      // https://github.com/mui/material-ui/pull/14252
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          // '&.MuiFormControlLabel-root:not(.dummyNotExist)': {
          margin: 0,
          // padding: '0.3em',
          // lineHeight: 1.25,
        },
        label: {
          // margin: 0,
          // padding: '0.3em',
          // lineHeight: 1.25,
          fontFamily: 'Consolas',
          fontSize: '0.8em',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // root: {
        //   fontFamily: 'Consolas',
        //   fontSize: '0.8em',
        // }, // this affects the label & have a strike effect - bad
        input: {
          fontFamily: 'Consolas',
          fontSize: '0.8em',
          // padding: 0,
        },
      },
    },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       padding: 0,
    //     },
    //     input: {
    //       padding: 0,
    //     }
    //   }
    // },
    // // []
    // // The styles injected into the DOM by Material UI rely on class names that all [follow a standard pattern](https://mui.com/system/styles/advanced/#class-names): `[hash]-Mui[Component name]-[name of the slot]`.
    // // <>
    // // https://mui.com/material-ui/customization/how-to-customize/#overriding-nested-component-styles
    // // []
    // // const useStyles = makeStyles({
    // //   root: {
    // //     opacity: 1,
    // //   },
    // // });
    // //
    // // This will generate a class name such as makeStyles-root-123.
    // // <>
    // // https://mui.com/system/styles/advanced/#class-names
    // // .css-1lkr5rz-MuiInputBase-input-MuiOutlinedInput-input
    MuiOutlinedInput: {
      styleOverrides: {
        // root: {
        //   padding: 0,
        // },
        input: {
          padding: '0.5em',
          // padding: uu_0d5em_MuiOutlinedInput_styleOverrides_root_padding,
        },
        // cuz the label is not inside its outside for select ... & seems base on hardcoded padding...
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '0.5em',
          verticalAlign: 'middle',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // @messy
          '&:not(.MuiInputLabel-shrink)': {
            transform: `translate(14px, ${uu_Select_PaddingTop}) scale(1)`,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: '1em',
          padding: `${uu_Select_PaddingTop} 0.5em 0.5em 0.5em`,
        },
      },
    },
    // MuiStepper: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: '0.5em',
    //     },
    //   }
    // },
    MuiStepLabel: {
      styleOverrides: {
        // root: {
        //   fontSize: '0.5em',
        // },
        label: {
          fontSize: '0.8em',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '2em',
          // []
          // In this case, the CSS rule `.myClass` with `color: blue` will only apply when the viewport width is 600 pixels or wider
          // <>
          // https://codeium.com/live/general
          '@media (min-width: 600px)': {
            minHeight: '3em',
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        arrow: true,
        PopperProps: {
          // sx: {
          //   marginBottom: '0.1em',
          // }
          // []
          // we define a `popperProps` object that contains the `popperOptions` property. Inside `popperOptions`, we specify the `modifiers` array with a single modifier called `offset`. The `offset` modifier allows you to adjust the distance between the tooltip and the target element.
          // In the `offset` modifier, you can modify the `offset` property to change the distance. The first value represents the horizontal offset, and the second value represents the vertical offset. Adjust these values to achieve the desired distance.
          // <>
          // https://codeium.com/live/general
          // https://stackoverflow.com/questions/57541127/material-ui-tooltip-distance-from-the-anchor
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10], // Adjust the values to change the distance
              },
            },
          ],
        },
      },
      styleOverrides: {
        // tooltip: {
        //   marginBottom: '0.1em',
        // },
        // popper: {
        //   // ag adk these proper way ... // dk codeium know intellisense..
        //   // '&[data-popper-placement*="top"]': {
        // },
        // tooltipPlacementTop: {
        //   marginBottom: '0.1em',
        // },
      },
    },
  },
});

// MuiTheme = createTheme(MuiTheme, {
export { MuiTheme };
