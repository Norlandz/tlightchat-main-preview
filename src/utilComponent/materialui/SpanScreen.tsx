import { Box } from '@mui/material';

export const SpanScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
        // margin: '0.4em',
        padding: '0.2em',
        border: '1px solid rgba(200, 200, 200, 0.5)',
        // fontFamily: 'Roboto',
        fontFamily: 'Consolas',
        // fontWeight: '700',
        borderRadius: '0.2em',
        display: 'inline-block',
      }}
    >
      {children}
    </Box>
  );
};
