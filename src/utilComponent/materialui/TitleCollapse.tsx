import { Box } from '@mui/material';

export const TitleCollapse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
        padding: '0.2em',
        fontFamily: 'Consolas',
        display: 'inline-block',

        // ;M*; border: '3px solid rgba(200, 200, 200, 0.5)',
        // ;M*; borderWidth: '0 0 1px 0',
        //
        // ;M*; css border-left 50% height - Stack Overflow
        // ;M*; https://stackoverflow.com/questions/2837440/css-border-left-50-height
        // ;M*; position: 'relative',
        // ;M*; '&::before': {
        // ;M*;   content: '""',
        // ;M*;   position: 'absolute',
        // ;M*;   left: 0,
        // ;M*;   top: '25%',
        // ;M*;   height: '50%',
        // ;M*;   borderLeft: '1px solid #0000CC',
        // ;M*;   padding: '0 0.8em 0 0',
        // ;M*; },
        //
        // ;M*; // css - How to create linear gradient only on left border and normal border for other 3 sides with content? - Stack Overflow
        // ;M*; // https://stackoverflow.com/questions/66349201/how-to-create-linear-gradient-only-on-left-border-and-normal-border-for-other-3
        // ;M*; //   background: url("starsolid.gif") 150px / 50px no-repeat;
        // ;M*; // https://developer.mozilla.org/en-US/play
        // ;M*; background: 'linear-gradient(180deg, rgba(200, 200, 200, 0.5) 0%, rgba(40, 40, 40, 0.5) 50%, rgba(200, 200, 200, 0.5) 100%) 0 50% / 5px 10px no-repeat',
        // 
        // ;M*good; '&::before': {
        // ;M*good;   // display: 'inline', // must, or use relative // empty space content can but cannot percentage height?...
        // ;M*good;   content: '" "',
        // ;M*good;   display: 'inline-block',
        // ;M*good;   verticalAlign: 'middle',
        // ;M*good;   height: '0.8em',
        // ;M*good;   borderLeft: '1px solid #0000CC',
        // ;M*good;   padding: '0 0.8em 0 0',
        // ;M*good; },
        // 
        // ;; https://stackoverflow.com/questions/21155885/border-left-gradient
        '&::before': {
          content: '" "',
          display: 'inline-block',
          height: '0.8em',
          width: '0.2em',
          verticalAlign: 'middle',
          background: 'linear-gradient(180deg, rgba(200, 200, 200, 0.5) 25%, rgba(150, 150, 150, 0.5) 50%, rgba(200, 200, 200, 0.5) 75%)',
          margin: '0 0.6em 0 0',
        },
      }}
    >
      {children}
    </Box>
  );
};


