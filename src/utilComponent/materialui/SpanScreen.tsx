import { Box } from '@mui/material';

export const SpanScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
                           
        padding: '0.2em',
        border: '1px solid rgba(200, 200, 200, 0.5)',
                                
        fontFamily: 'Consolas',
                             
        borderRadius: '0.2em',
        display: 'inline-block',
      }}
    >
      {children}
    </Box>
  );
};
