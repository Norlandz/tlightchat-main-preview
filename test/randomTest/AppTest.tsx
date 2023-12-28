import React from 'react';
import { Box } from '@mui/material';
import './index.css';
import { BoxFitText } from '../../src/utilComponent/aa_general/BoxFitText';

function AppTest() {
  const [count, setCount] = React.useState(0);

  return (
    <Box
      sx={{
        width: '200px',
        resize: 'both',
        overflow: 'scroll',

        border: '2px solid rgba(0, 0, 255, 0.5)',
        padding: '2em',
      }}
    >
      <BoxFitText>01234567890123456789012345678901234567890123456789012345678901234567890123456789</BoxFitText>
    </Box>
  );
}

export default AppTest;

//  {/* ~/del/   <Box
// ~/del/         className="global_sidebar"
// ~/del/         sx={{
// ~/del/           width: '200px',
// ~/del/           resize: 'both',
// ~/del/           overflow: 'scroll',
// ~/del/           position: 'relative',
// ~/del/
// ~/del/           border: '2px solid rgba(0, 0, 255, 0.5)',
// ~/del/           padding: '2em',
// ~/del/         }}
// ~/del/       >
// ~/del/         <Box
// ~/del/           className="fixed_width"
// ~/del/           sx={{
// ~/del/             // width: '100%',
// ~/del/             border: '4px solid rgba(0, 255, 0, 0.5)',
// ~/del/             containerType: 'inline-size',
// ~/del/             containerName: 'ct_fixed_width',
// ~/del/
// ~/del/             '@container ct_fixed_width (min-width: 500px)': {
// ~/del/               backgroundColor: 'rgba(0, 255, 255, 0.5)',
// ~/del/             },
// ~/del/           }}
// ~/del/         >
// ~/del/           <Box
// ~/del/             // component={'span'}
// ~/del/             sx={{
// ~/del/               containerType: 'inline-size',
// ~/del/               containerName: 'ct_get_width_from_this',
// ~/del/
// ~/del/               border: '2px dashed rgba(255, 0, 0, 0.5)',
// ~/del/               // display: 'inline-flex',
// ~/del/               display: 'flex',
// ~/del/             }}
// ~/del/           >
// ~/del/             <Box
// ~/del/               // component={'span'}
// ~/del/               className="get_width_from_this"
// ~/del/               sx={{
// ~/del/                 // fontSize: '16px',
// ~/del/                 // width: 'fit-content', // if parent is flex no need ...
// ~/del/                 border: '2px solid rgba(255, 0, 0, 0.5)',
// ~/del/                 // display: 'inline-table',
// ~/del/
// ~/del/                 '@container ct_get_width_from_this (width > 500px)': {
// ~/del/                   backgroundColor: 'rgba(255, 0, 255, 0.5)',
// ~/del/                   // fontFamily: (theme) => {
// ~/del/                   //   console.log('run');
// ~/del/                   //   return 'Consolas'
// ~/del/                   // },
// ~/del/                 },
// ~/del/               }}
// ~/del/             >
// ~/del/               01234567890123456789012345678901234567890123456789012345678901234567890123456789
// ~/del/             </Box>
// ~/del/           </Box>
// ~/del/         </Box>
// ~/del/       </Box> */}
