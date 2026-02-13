import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const MinimalLoader = () => (
  <Box
    sx={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={28} />
  </Box>
);

export default React.memo(MinimalLoader);
