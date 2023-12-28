import React from 'react';
import { Collapse, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// those no outofboxconvenient Collapse is f wasting my time ; such simple idea doing is complex & no_knowlres
// 1. rip me that no upvote
// 1. still that reservedkeyword hum been but mem
export const CollapseAuto: React.FC<{ title: React.ReactNode; children: React.ReactNode }> = ({ title, children }) => {
  // @fix stale state // queue
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
