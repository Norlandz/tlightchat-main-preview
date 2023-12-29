import React from 'react';
import { Collapse, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

                                                                                                              
                           
                                                 
export const CollapseAuto: React.FC<{ title: React.ReactNode; children: React.ReactNode }> = ({ title, children }) => {
                              
  const [show, set_show] = React.useState(true);

  return (
    <>
      <Box onClick={() => set_show(!show)}>
        {title} {show ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse in={show}>{children}</Collapse>
    </>
  );
};
