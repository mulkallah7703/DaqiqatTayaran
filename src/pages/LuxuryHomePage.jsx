import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import MinimalLoader from '../components/common/MinimalLoader';

const ExecutiveHero = React.lazy(() => import('../components/luxury/ExecutiveHero'));
const PlatformDivisions = React.lazy(() => import('../components/luxury/PlatformDivisions'));
const ExecutiveMetrics = React.lazy(() => import('../components/luxury/ExecutiveMetrics'));

const LuxuryHomePage = () => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Suspense fallback={<MinimalLoader />}>
        <ExecutiveHero />
        <PlatformDivisions />
        <ExecutiveMetrics />
      </Suspense>
    </Box>
  );
};

export default LuxuryHomePage;
