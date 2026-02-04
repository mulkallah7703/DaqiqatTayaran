import React from 'react';
import { Box } from '@mui/material';
import ExecutiveHero from '../components/luxury/ExecutiveHero';
import PlatformDivisions from '../components/luxury/PlatformDivisions';
import ExecutiveMetrics from '../components/luxury/ExecutiveMetrics';

const LuxuryHomePage = () => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <ExecutiveHero />
      <PlatformDivisions />
      <ExecutiveMetrics />
    </Box>
  );
};

export default LuxuryHomePage;